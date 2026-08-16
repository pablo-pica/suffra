import { useState, useEffect, useCallback, useRef } from 'react';
import { type ConnectedAPI } from '@midnight-ntwrk/dapp-connector-api';
import { type MidnightProviders, type WalletProvider, type MidnightProvider, type UnboundTransaction } from '@midnight-ntwrk/midnight-js-types';
import { type FinalizedTransaction, Transaction } from '@midnight-ntwrk/midnight-js-protocol/ledger';
import { FetchZkConfigProvider } from '@midnight-ntwrk/midnight-js-fetch-zk-config-provider';
import { indexerPublicDataProvider } from '@midnight-ntwrk/midnight-js-indexer-public-data-provider';
import { levelPrivateStateProvider } from '@midnight-ntwrk/midnight-js-level-private-state-provider';
import { findDeployedContract } from '@midnight-ntwrk/midnight-js-contracts';
import { httpClientProofProvider } from '@midnight-ntwrk/midnight-js-http-client-proof-provider';
import { toHex, fromHex, parseCoinPublicKeyToHex, parseEncPublicKeyToHex } from '@midnight-ntwrk/midnight-js-utils';
import { CompiledContract } from '@midnight-ntwrk/midnight-js-protocol/compact-js';
import { setNetworkId } from '@midnight-ntwrk/midnight-js-network-id';
import * as Suffra from '../../managed/suffra/contract/index.js';
import { resolveDappNetwork, resolveProofServerUrl } from '../config/network';
import { type DemoCandidateId } from '../content/siteContent';

const CONTRACT_ADDRESS = (import.meta.env.VITE_SUFFRA_CONTRACT_ADDRESS || '').trim();
const NETWORK_ID = resolveDappNetwork(import.meta.env.VITE_MIDNIGHT_NETWORK);
const PROOF_SERVER_URL = resolveProofServerUrl(import.meta.env.VITE_PROOF_SERVER_URL);
const PRIVATE_STATE_ID = 'suffraPrivateState';

export interface ElectionState {
  votingOpen: boolean;
  registeredCount: bigint;
  ballotCount: bigint;
  registeredVoters: bigint;
  usedNullifiers: bigint;
  sealedBallots: bigint;
}

export interface UseMidnightResult {
  connected: boolean;
  connecting: boolean;
  walletAddress: string | null;
  shieldedAddress: string | null;
  balance: bigint;
  dustBalance: bigint;
  error: string | null;
  deploymentNotice: string | null;
  loading: boolean;
  txId: string | null;
  contractAddress: string | null;
  contractReady: boolean;
  electionState: ElectionState | null;
  connect: () => Promise<void>;
  disconnect: () => Promise<void>;
  registerVoter: () => Promise<void>;
  castVote: (candidateId: DemoCandidateId) => Promise<void>;
  closeVoting: () => Promise<void>;
  refreshElection: () => Promise<void>;
}

function parseTNightBalance(unshieldedBalances: any): bigint {
  if (!unshieldedBalances || typeof unshieldedBalances !== 'object') return 0n;
  for (const [key, value] of Object.entries(unshieldedBalances)) {
    if (key.toLowerCase().includes('night')) {
      return BigInt(value as any);
    }
  }
  const values = Object.values(unshieldedBalances);
  if (values.length > 0) {
    return BigInt(values[0] as any);
  }
  return 0n;
}

function parseDustBalance(dustInfo: any): bigint {
  if (!dustInfo) return 0n;
  if (typeof dustInfo === 'bigint') return dustInfo;
  if (typeof dustInfo === 'number') return BigInt(dustInfo);
  if (typeof dustInfo === 'object' && dustInfo.balance !== undefined) {
    return BigInt(dustInfo.balance);
  }
  return 0n;
}

function randomBytes32(): Uint8Array {
  const bytes = new Uint8Array(32);
  crypto.getRandomValues(bytes);
  return bytes;
}

function bytesToHexString(bytes: Uint8Array): string {
  return Array.from(bytes)
    .map((byte) => byte.toString(16).padStart(2, '0'))
    .join('');
}

function hexStringToBytes(hex: string): Uint8Array {
  if (!/^[0-9a-fA-F]{64}$/.test(hex)) {
    throw new Error('Stored Suffra secret is invalid.');
  }
  const bytes = new Uint8Array(32);
  for (let i = 0; i < bytes.length; i += 1) {
    bytes[i] = Number.parseInt(hex.slice(i * 2, i * 2 + 2), 16);
  }
  return bytes;
}

function getOrCreateLocalHex(key: string): string {
  const existing = localStorage.getItem(key);
  if (existing && /^[0-9a-fA-F]{64}$/.test(existing)) return existing;
  const created = bytesToHexString(randomBytes32());
  localStorage.setItem(key, created);
  return created;
}

export function formatPrivateStoragePassword(secret: string): string {
  // Midnight private state requires upper/lowercase, a digit, and a special
  // character. Prefix the already random local secret without weakening it.
  return `Suffra!${secret}`;
}

function getPrivateStoragePassword(accountId: string): string {
  return formatPrivateStoragePassword(
    getOrCreateLocalHex(`suffra_private_storage_password:${accountId}`),
  );
}

function getVoterSecret(accountId: string): Uint8Array {
  return hexStringToBytes(getOrCreateLocalHex(`suffra_voter_secret:${accountId}`));
}

async function ensureLocalProofServer(): Promise<void> {
  const controller = new AbortController();
  const timeout = window.setTimeout(() => controller.abort(), 5000);

  try {
    const response = await window.fetch(PROOF_SERVER_URL, { signal: controller.signal });
    if (!response.ok) {
      throw new Error(`received HTTP ${response.status}`);
    }
  } catch (error) {
    const detail = error instanceof Error && error.message ? ` (${error.message})` : '';
    throw new Error(
      `Local proof server is unavailable at ${PROOF_SERVER_URL}${detail}. Run \`npm run proof-server:start\`, then retry.`,
    );
  } finally {
    window.clearTimeout(timeout);
  }
}

function contractAddressIsConfigured(): boolean {
  return /^[0-9a-fA-F]{64}$/.test(CONTRACT_ADDRESS);
}

function ledgerToElectionState(ledger: Suffra.Ledger): ElectionState {
  return {
    votingOpen: ledger.votingOpen,
    registeredCount: ledger.registeredCount,
    ballotCount: ledger.ballotCount,
    registeredVoters: ledger.registeredVoters.size(),
    usedNullifiers: ledger.usedNullifiers.size(),
    sealedBallots: ledger.sealedBallots.size(),
  };
}

export function useMidnight(): UseMidnightResult {
  const [connected, setConnected] = useState(false);
  const [connecting, setConnecting] = useState(false);
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [shieldedAddress, setShieldedAddress] = useState<string | null>(null);
  const [balance, setBalance] = useState<bigint>(0n);
  const [dustBalance, setDustBalance] = useState<bigint>(0n);
  const [error, setError] = useState<string | null>(null);
  const [deploymentNotice, setDeploymentNotice] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [txId, setTxId] = useState<string | null>(null);
  const [lastTxHash, setLastTxHash] = useState<string | null>(null);
  const [electionState, setElectionState] = useState<ElectionState | null>(null);
  const [walletApi, setWalletApi] = useState<ConnectedAPI | null>(null);
  const [providers, setProviders] = useState<MidnightProviders | null>(null);
  const [contract, setContract] = useState<any>(null);
  const connectInFlight = useRef(false);

  const contractReady = Boolean(contract && contractAddressIsConfigured());

  const refreshElection = useCallback(async () => {
    if (!providers || !contractAddressIsConfigured()) return;
    try {
      const contractState = await providers.publicDataProvider.queryContractState(CONTRACT_ADDRESS);
      if (contractState) {
        setElectionState(ledgerToElectionState(Suffra.ledger(contractState.data)));
      }
    } catch {
      setDeploymentNotice('Suffra contract state is not available yet. Deploy the new contract and set VITE_SUFFRA_CONTRACT_ADDRESS.');
    }
  }, [providers]);

  useEffect(() => {
    const wasConnected = localStorage.getItem('midnight_wallet_connected') === 'true';
    if (wasConnected && window.midnight?.mnLace) {
      connect();
    }
  }, []);

  useEffect(() => {
    if (providers) {
      refreshElection();
      const interval = setInterval(refreshElection, 10000);
      return () => clearInterval(interval);
    }
  }, [providers, refreshElection]);

  const connect = async () => {
    if (connectInFlight.current) return;
    connectInFlight.current = true;
    setError(null);
    setDeploymentNotice(null);
    setConnecting(true);

    try {
      setNetworkId(NETWORK_ID);

      const midnightObj = (window as any).midnight;
      const laceWallet = midnightObj?.mnLace || midnightObj?.lace || (midnightObj && Object.values(midnightObj)[0]);
      if (!laceWallet || typeof laceWallet.connect !== 'function') {
        throw new Error('Lace wallet (Midnight edition) was not detected. Refresh the page or enable extension site access for this site.');
      }

      const api = await laceWallet.connect(NETWORK_ID);
      setWalletApi(api);

      const status = await api.getConnectionStatus();
      if (status.status !== 'connected') {
        throw new Error('Wallet is not connected to the network.');
      }

      if (status.networkId !== NETWORK_ID) {
        throw new Error(`Network mismatch: wallet is connected to ${status.networkId}, but this dApp requires ${NETWORK_ID}.`);
      }

      const shieldedInfo = await api.getShieldedAddresses();
      const unshieldedInfo = await api.getUnshieldedAddress();
      const dustInfo = await api.getDustBalance();
      const unshieldedBalances = await api.getUnshieldedBalances();
      const config = await api.getConfiguration();

      setWalletAddress(unshieldedInfo.unshieldedAddress);
      setShieldedAddress(shieldedInfo.shieldedAddress);
      setBalance(parseTNightBalance(unshieldedBalances));
      setDustBalance(parseDustBalance(dustInfo));

      const zkConfigProvider = new FetchZkConfigProvider(
        `${window.location.origin}/suffra`,
        (input: RequestInfo | URL, init?: RequestInit) => window.fetch(input, init),
      );

      const privateStateProvider = levelPrivateStateProvider({
        privateStateStoreName: 'suffra-state',
        accountId: unshieldedInfo.unshieldedAddress,
        privateStoragePasswordProvider: () => getPrivateStoragePassword(unshieldedInfo.unshieldedAddress),
      });

      const publicDataProvider = indexerPublicDataProvider(config.indexerUri, config.indexerWsUri);
      const proofProvider = httpClientProofProvider(PROOF_SERVER_URL, zkConfigProvider);

      let lastBalancedTxHex: string | null = null;
      const coinPublicKeyHex = parseCoinPublicKeyToHex(shieldedInfo.shieldedCoinPublicKey, NETWORK_ID);
      const encryptionPublicKeyHex = parseEncPublicKeyToHex(shieldedInfo.shieldedEncryptionPublicKey, NETWORK_ID);

      const walletProvider: WalletProvider = {
        getCoinPublicKey: () => coinPublicKeyHex,
        getEncryptionPublicKey: () => encryptionPublicKeyHex,
        balanceTx: async (tx: UnboundTransaction) => {
          try {
            const txHex = toHex(tx.serialize());
            const balanced = await api.balanceUnsealedTransaction(txHex);
            const rawHex = typeof balanced === 'string' ? balanced : (balanced?.tx || (balanced as any));
            setLastTxHash(rawHex);
            lastBalancedTxHex = rawHex;
            return Transaction.deserialize('signature', 'proof', 'binding', fromHex(rawHex));
          } catch (err: any) {
            const detail = err?.message || err?.cause?.message;
            throw new Error(`Lace balanceTx failed${detail ? `: ${detail}` : ''}. Check DUST gas balance and request faucet funds if needed.`);
          }
        },
      };

      const midnightProvider: MidnightProvider = {
        submitTx: async (tx: FinalizedTransaction) => {
          const txHex = lastBalancedTxHex || (tx ? toHex(tx.serialize()) : '');
          try {
            const res = await api.submitTransaction(txHex);
            if (res && typeof res === 'string') return res;
          } catch {
            // Lace may already have broadcast the balanced transaction.
          }
          const ids = tx ? tx.identifiers() : [];
          return (ids && ids[0]) || ('0x' + (lastBalancedTxHex ? lastBalancedTxHex.slice(0, 32) : ''));
        },
      };

      const customProviders: MidnightProviders = {
        privateStateProvider,
        publicDataProvider,
        zkConfigProvider,
        proofProvider,
        walletProvider,
        midnightProvider,
      };

      setProviders(customProviders);
      setConnected(true);
      localStorage.setItem('midnight_wallet_connected', 'true');

      if (!contractAddressIsConfigured()) {
        setContract(null);
        setDeploymentNotice(`Wallet connected to ${NETWORK_ID}. Deploy the Suffra contract to this network and set VITE_SUFFRA_CONTRACT_ADDRESS to enable registration and voting.`);
        return;
      }

      const compiledContract = CompiledContract.make('suffra', Suffra.Contract).pipe(
        CompiledContract.withVacantWitnesses,
        CompiledContract.withCompiledFileAssets('./suffra'),
      );

      const foundContract = await findDeployedContract(customProviders, {
        compiledContract: compiledContract as any,
        contractAddress: CONTRACT_ADDRESS,
        privateStateId: PRIVATE_STATE_ID,
        initialPrivateState: {},
      });

      setContract(foundContract);
    } catch (err: any) {
      setError(err.message || 'An unknown error occurred during wallet connection.');
      setConnected(false);
      setWalletApi(null);
      setProviders(null);
      setContract(null);
      localStorage.removeItem('midnight_wallet_connected');
    } finally {
      setConnecting(false);
      connectInFlight.current = false;
    }
  };

  const disconnect = async () => {
    setConnected(false);
    setWalletAddress(null);
    setShieldedAddress(null);
    setBalance(0n);
    setDustBalance(0n);
    setWalletApi(null);
    setProviders(null);
    setContract(null);
    setElectionState(null);
    setDeploymentNotice(null);
    localStorage.removeItem('midnight_wallet_connected');
  };

  const refreshBalances = async () => {
    if (!walletApi) return;
    const dustInfo = await walletApi.getDustBalance();
    const unshieldedBalances = await walletApi.getUnshieldedBalances();
    setBalance(parseTNightBalance(unshieldedBalances));
    setDustBalance(parseDustBalance(dustInfo));
  };

  const ensureContract = () => {
    if (!contractReady) {
      throw new Error('Suffra contract is not ready. Deploy the contract and set VITE_SUFFRA_CONTRACT_ADDRESS first.');
    }
    if (dustBalance === 0n) {
      throw new Error('Insufficient DUST balance. Midnight transactions require DUST gas tokens.');
    }
  };

  const runTransaction = async (operation: () => Promise<any>) => {
    setError(null);
    setLoading(true);
    setTxId(null);

    try {
      await ensureLocalProofServer();
      setNetworkId(NETWORK_ID);
      const tx = await operation();
      const resolvedTxHash = (tx?.public as any)?.txHash || tx?.public?.txId || lastTxHash;
      setTxId(resolvedTxHash || null);
      await refreshBalances();
      await refreshElection();
    } catch (err: any) {
      const detailMsg = err?.cause?.message || err?.message || String(err);
      setError(detailMsg);
    } finally {
      setLoading(false);
    }
  };

  const registerVoter = async () => {
    try {
      ensureContract();
      const secret = getVoterSecret(walletAddress || 'anonymous');
      await runTransaction(() => contract.callTx.registerVoter(secret));
    } catch (err: any) {
      setError(err.message || String(err));
    }
  };

  const castVote = async (candidateId: DemoCandidateId) => {
    try {
      ensureContract();
      const secret = getVoterSecret(walletAddress || 'anonymous');
      const ballotSalt = randomBytes32();
      await runTransaction(() => contract.callTx.castVote(BigInt(candidateId), secret, ballotSalt));
    } catch (err: any) {
      setError(err.message || String(err));
    }
  };

  const closeVoting = async () => {
    try {
      ensureContract();
      await runTransaction(() => contract.callTx.closeVoting());
    } catch (err: any) {
      setError(err.message || String(err));
    }
  };

  return {
    connected,
    connecting,
    walletAddress,
    shieldedAddress,
    balance,
    dustBalance,
    error,
    deploymentNotice,
    loading,
    txId,
    contractAddress: CONTRACT_ADDRESS || null,
    contractReady,
    electionState,
    connect,
    disconnect,
    registerVoter,
    castVote,
    closeVoting,
    refreshElection,
  };
}
