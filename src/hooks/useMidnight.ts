import { useState, useEffect, useCallback } from 'react';
import { type ConnectedAPI } from '@midnight-ntwrk/dapp-connector-api';
import { type MidnightProviders, type WalletProvider, type MidnightProvider, type UnboundTransaction } from '@midnight-ntwrk/midnight-js-types';
import { type FinalizedTransaction, Transaction } from '@midnight-ntwrk/midnight-js-protocol/ledger';
import { FetchZkConfigProvider } from '@midnight-ntwrk/midnight-js-fetch-zk-config-provider';
import { indexerPublicDataProvider } from '@midnight-ntwrk/midnight-js-indexer-public-data-provider';
import { levelPrivateStateProvider } from '@midnight-ntwrk/midnight-js-level-private-state-provider';
import { findDeployedContract } from '@midnight-ntwrk/midnight-js-contracts';
import { createProofProvider } from '@midnight-ntwrk/midnight-js-types';
import { toHex, fromHex, parseCoinPublicKeyToHex, parseEncPublicKeyToHex } from '@midnight-ntwrk/midnight-js-utils';
import { CompiledContract } from '@midnight-ntwrk/midnight-js-protocol/compact-js';
import * as Counter from '../../managed/counter/contract/index.js';

// The deployed contract address on the Preview network (from .midnight-state.json)
const CONTRACT_ADDRESS = '445c735e72a3909940076aa3adf0ec86abeff505a7282b9988ac6a77dc4cd748';
const PRIVATE_STATE_ID = 'counterPrivateState';

export interface UseMidnightResult {
  connected: boolean;
  connecting: boolean;
  walletAddress: string | null;
  shieldedAddress: string | null;
  balance: bigint;
  dustBalance: bigint;
  error: string | null;
  loading: boolean;
  txId: string | null;
  counterValue: bigint | null;
  connect: () => Promise<void>;
  disconnect: () => Promise<void>;
  incrementCounter: (amount: bigint) => Promise<void>;
  refreshCounter: () => Promise<void>;
}

export function useMidnight(): UseMidnightResult {
  const [connected, setConnected] = useState(false);
  const [connecting, setConnecting] = useState(false);
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [shieldedAddress, setShieldedAddress] = useState<string | null>(null);
  const [balance, setBalance] = useState<bigint>(0n);
  const [dustBalance, setDustBalance] = useState<bigint>(0n);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [txId, setTxId] = useState<string | null>(null);
  const [counterValue, setCounterValue] = useState<bigint | null>(null);
  const [walletApi, setWalletApi] = useState<ConnectedAPI | null>(null);
  const [providers, setProviders] = useState<MidnightProviders | null>(null);
  const [contract, setContract] = useState<any>(null);

  // Check if wallet was previously connected
  useEffect(() => {
    const wasConnected = localStorage.getItem('midnight_wallet_connected') === 'true';
    if (wasConnected && window.midnight?.mnLace) {
      connect();
    }
  }, []);

  // Set up auto-refresh for public state (counter value)
  const refreshCounter = useCallback(async () => {
    if (!providers) return;
    try {
      const contractState = await providers.publicDataProvider.queryContractState(CONTRACT_ADDRESS);
      if (contractState) {
        const ledgerState = Counter.ledger(contractState.data);
        setCounterValue(ledgerState.value);
      }
    } catch (err: any) {
      console.error('Failed to query contract state:', err);
    }
  }, [providers]);

  useEffect(() => {
    if (providers) {
      refreshCounter();
      const interval = setInterval(refreshCounter, 10000);
      return () => clearInterval(interval);
    }
  }, [providers, refreshCounter]);

  const connect = async () => {
    setError(null);
    setConnecting(true);

    try {
      const midnightObj = (window as any).midnight;
      console.log('Detected window.midnight keys:', midnightObj ? Object.keys(midnightObj) : 'none');


      const laceWallet = midnightObj?.mnLace || midnightObj?.lace || (midnightObj && Object.values(midnightObj)[0]);
      if (!laceWallet || typeof laceWallet.connect !== 'function') {
        throw new Error('Lace wallet (Midnight edition) was not detected. If installed, please refresh the page or ensure Chrome extension Site Access is enabled for this site.');
      }

      // Check API version
      console.log('Connecting to Lace wallet version:', laceWallet.apiVersion);

      // Connect using network ID 'preview'
      const api = await laceWallet.connect('preview');
      setWalletApi(api);


      // Check connection status
      const status = await api.getConnectionStatus();
      if (status.status !== 'connected') {
        throw new Error('Wallet is not connected to the network.');
      }

      if (status.networkId !== 'preview') {
        throw new Error(`Network mismatch: Wallet is connected to ${status.networkId}, but this dApp requires preview.`);
      }

      // Fetch user addresses
      const shieldedInfo = await api.getShieldedAddresses();
      const unshieldedInfo = await api.getUnshieldedAddress();
      const dustInfo = await api.getDustBalance();
      const unshieldedBalances = await api.getUnshieldedBalances();

      setWalletAddress(unshieldedInfo.unshieldedAddress);
      setShieldedAddress(shieldedInfo.shieldedAddress);
      setBalance(unshieldedBalances['tNight'] || unshieldedBalances['night'] || 0n);
      setDustBalance(dustInfo.balance);

      // Get configuration from the wallet connector
      const config = await api.getConfiguration();
      console.log('Wallet configuration:', config);

      // Initialize FetchZkConfigProvider pointing to /counter (served statically in Vite public/)
      const zkConfigProvider = new FetchZkConfigProvider(`${window.location.origin}/counter`);

      // Initialize Private State Provider
      const privateStateProvider = levelPrivateStateProvider({
        privateStateStoreName: 'counter-state',
        accountId: unshieldedInfo.unshieldedAddress,
        privateStoragePasswordProvider: () => 'Browser-Storage-Counter-Key-Placeholder-1',
      });

      // Initialize Public Data Provider using Indexer URL from wallet config
      const publicDataProvider = indexerPublicDataProvider(config.indexerUri, config.indexerWsUri);

      // Initialize Proof Provider via the wallet's proving provider
      const provingProvider = await api.getProvingProvider(zkConfigProvider);
      const proofProvider = createProofProvider(provingProvider);

      // Build WalletProvider adapter
      const coinPublicKeyHex = parseCoinPublicKeyToHex(shieldedInfo.shieldedCoinPublicKey, 'preview');
      const encryptionPublicKeyHex = parseEncPublicKeyToHex(shieldedInfo.shieldedEncryptionPublicKey, 'preview');

      const walletProvider: WalletProvider = {
        getCoinPublicKey: () => coinPublicKeyHex,
        getEncryptionPublicKey: () => encryptionPublicKeyHex,
        balanceTx: async (tx: UnboundTransaction, ttl?: Date) => {
          const txHex = toHex(tx.serialize());
          const balanced = await api.balanceUnsealedTransaction(txHex);
          return Transaction.deserialize('signature', 'proof', 'binding', fromHex(balanced.tx));
        },
      };

      // Build MidnightProvider adapter
      const midnightProvider: MidnightProvider = {
        submitTx: async (tx: FinalizedTransaction) => {
          const txHex = toHex(tx.serialize());
          await api.submitTransaction(txHex);
          return tx.identifiers()[0];
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

      // Load the contract compiled object
      const compiledContract = CompiledContract.make('counter', Counter.Contract).pipe(
        CompiledContract.withVacantWitnesses,
        CompiledContract.withCompiledFileAssets('./counter')
      );

      console.log('Connecting to contract at:', CONTRACT_ADDRESS);
      const foundContract = await findDeployedContract(customProviders, {
        compiledContract: compiledContract as any,
        contractAddress: CONTRACT_ADDRESS,
        privateStateId: PRIVATE_STATE_ID,
        initialPrivateState: {},
      });

      setContract(foundContract);
      setConnected(true);
      localStorage.setItem('midnight_wallet_connected', 'true');
    } catch (err: any) {
      console.error('Connection failed:', err);
      setError(err.message || 'An unknown error occurred during wallet connection.');
      setConnected(false);
    } finally {
      setConnecting(false);
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
    setCounterValue(null);
    localStorage.removeItem('midnight_wallet_connected');
  };

  const incrementCounter = async (amount: bigint) => {
    if (!contract) {
      setError('Contract is not initialized. Connect your wallet first.');
      return;
    }
    setError(null);
    setLoading(true);
    setTxId(null);

    try {
      console.log('Calling increment circuit with private input amount:', amount);
      // Call the circuit; the ZK proof is generated locally (via the wallet proving provider)
      // and the balanced, signed transaction is submitted on-chain
      const tx = await contract.callTx.increment(amount);
      console.log('Circuit call success. Tx details:', tx);
      setTxId(tx.public.txId);
      
      // Update balances
      if (walletApi) {
        const dustInfo = await walletApi.getDustBalance();
        const unshieldedBalances = await walletApi.getUnshieldedBalances();
        setBalance(unshieldedBalances['tNight'] || unshieldedBalances['night'] || 0n);
        setDustBalance(dustInfo.balance);
      }

      // Refresh counter value
      await refreshCounter();
    } catch (err: any) {
      console.error('Transaction failed:', err);
      setError(err.message || 'Zero-knowledge proof generation or transaction submission failed.');
    } finally {
      setLoading(false);
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
    loading,
    txId,
    counterValue,
    connect,
    disconnect,
    incrementCounter,
    refreshCounter,
  };
}
