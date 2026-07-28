/**
 * CLI for interacting with the Suffra sealed ballot contract.
 */
import { createInterface } from 'node:readline/promises';
import { stdin, stdout } from 'node:process';
import * as fs from 'node:fs';
import * as path from 'node:path';
import * as crypto from 'node:crypto';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { WebSocket } from 'ws';

import { findDeployedContract } from '@midnight-ntwrk/midnight-js-contracts';
import { httpClientProofProvider } from '@midnight-ntwrk/midnight-js-http-client-proof-provider';
import { indexerPublicDataProvider } from '@midnight-ntwrk/midnight-js-indexer-public-data-provider';
import { levelPrivateStateProvider } from '@midnight-ntwrk/midnight-js-level-private-state-provider';
import { NodeZkConfigProvider } from '@midnight-ntwrk/midnight-js-node-zk-config-provider';
import { resolveNetwork, getOrCreateSeed, getDeployment } from './network';
import { createWallet, persistWalletState, unshieldedToken, type WalletContext } from './wallet';
import { CompiledContract } from '@midnight-ntwrk/midnight-js-protocol/compact-js';

// @ts-expect-error Required for wallet sync
globalThis.WebSocket = WebSocket;

const PRIVATE_STATE_ID = 'suffraPrivateState';
const VOTER_SECRET_FILE = '.suffra-voter-secret';

const { network, config: networkConfig } = resolveNetwork();
const SEED = getOrCreateSeed(network);

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const zkConfigPath = path.resolve(__dirname, '..', 'managed', 'suffra');
const contractPath = path.join(zkConfigPath, 'contract', 'index.js');

if (!fs.existsSync(contractPath)) {
  console.error('\nContract not compiled. Run: npm run compile\n');
  process.exit(1);
}

const Suffra = await import(pathToFileURL(contractPath).href);

const compiledContract = CompiledContract.make('suffra', Suffra.Contract).pipe(
  CompiledContract.withVacantWitnesses,
  CompiledContract.withCompiledFileAssets(zkConfigPath),
);

async function createProviders(walletCtx: WalletContext) {
  const privateStatePassword = process.env.PRIVATE_STATE_PASSWORD?.trim() || 'Local-Devnet-Development-Placeholder-1';

  const walletProvider = {
    getCoinPublicKey: () => walletCtx.shieldedSecretKeys.coinPublicKey,
    getEncryptionPublicKey: () => walletCtx.shieldedSecretKeys.encryptionPublicKey,
    async balanceTx(tx: any, ttl?: Date) {
      const recipe = await walletCtx.wallet.balanceUnboundTransaction(
        tx,
        { shieldedSecretKeys: walletCtx.shieldedSecretKeys, dustSecretKey: walletCtx.dustSecretKey },
        { ttl: ttl ?? new Date(Date.now() + 30 * 60 * 1000) },
      );
      return walletCtx.wallet.finalizeRecipe(recipe);
    },
    submitTx: (tx: any) => walletCtx.wallet.submitTransaction(tx) as any,
  };

  const zkConfigProvider = new NodeZkConfigProvider(zkConfigPath);
  const accountId = walletCtx.unshieldedKeystore.getBech32Address().toString();

  return {
    privateStateProvider: levelPrivateStateProvider({
      privateStateStoreName: 'suffra-state',
      accountId,
      privateStoragePasswordProvider: () => privateStatePassword,
    }),
    publicDataProvider: indexerPublicDataProvider(networkConfig.indexer, networkConfig.indexerWS),
    zkConfigProvider,
    proofProvider: httpClientProofProvider(networkConfig.proofServer, zkConfigProvider),
    walletProvider,
    midnightProvider: walletProvider,
  };
}

function getOrCreateVoterSecret(): Uint8Array {
  const secretPath = path.join(process.cwd(), VOTER_SECRET_FILE);
  let hex = fs.existsSync(secretPath) ? fs.readFileSync(secretPath, 'utf8').trim() : '';
  if (!/^[0-9a-fA-F]{64}$/.test(hex)) {
    hex = crypto.randomBytes(32).toString('hex');
    fs.writeFileSync(secretPath, `${hex}\n`, { mode: 0o600 });
  }
  return Uint8Array.from(Buffer.from(hex, 'hex'));
}

async function printBallotBoxState(providers: Awaited<ReturnType<typeof createProviders>>, address: string) {
  const contractState = await providers.publicDataProvider.queryContractState(address);
  if (!contractState) {
    console.log('\nNo contract state found.\n');
    return;
  }

  const ledgerState = Suffra.ledger(contractState.data);
  console.log('\nBallot box state');
  console.log(`  Voting open:       ${ledgerState.votingOpen ? 'yes' : 'no'}`);
  console.log(`  Registered voters: ${ledgerState.registeredCount}`);
  console.log(`  Sealed ballots:    ${ledgerState.ballotCount}`);
  console.log(`  Nullifiers:        ${ledgerState.usedNullifiers.size()}`);
  console.log('');
}

async function main() {
  console.log('\nSuffra CLI\n');

  const rl = createInterface({ input: stdin, output: stdout });
  const deployment = getDeployment(network);
  if (!deployment) {
    console.error(`No deployment recorded for ${network}. Run \`npm run deploy -- --network ${network}\` first.`);
    process.exit(1);
  }

  console.log(`  Contract: ${deployment.address}`);
  console.log(`  Network:  ${network}\n`);

  try {
    console.log('  Connecting to wallet...');
    const walletCtx = await createWallet({ network, networkConfig, seed: SEED });
    const restoredCount = Object.values(walletCtx.restored).filter(Boolean).length;
    if (restoredCount > 0) {
      console.log(`  Restored ${restoredCount}/3 child wallets from .midnight-wallet-state.`);
    }

    console.log('  Syncing with network...');
    const state = await walletCtx.wallet.waitForSyncedState();
    await persistWalletState(network, walletCtx);

    const balance = state.unshielded.balances[unshieldedToken().raw] ?? 0n;
    console.log(`  Balance: ${balance.toLocaleString()} tNight\n`);

    if (balance === 0n && network !== 'undeployed' && networkConfig.faucet) {
      const address = walletCtx.unshieldedKeystore.getBech32Address();
      console.log('  Wallet has no tNight. Fund it before sending transactions:');
      console.log(`  Faucet: ${networkConfig.faucet}`);
      console.log(`  Wallet: ${address}\n`);
    }

    console.log('  Connecting to contract...');
    const providers = await createProviders(walletCtx);
    const deployed: any = await findDeployedContract(providers, {
      compiledContract: compiledContract as any,
      contractAddress: deployment.address,
      privateStateId: PRIVATE_STATE_ID,
      initialPrivateState: {},
    });

    console.log('  Connected.\n');

    let running = true;
    while (running) {
      console.log('Menu');
      console.log('  1. Register local voter secret');
      console.log('  2. Cast sealed vote');
      console.log('  3. Read ballot box state');
      console.log('  4. Check wallet balance');
      console.log('  5. Exit\n');

      const choice = await rl.question('  Your choice: ');

      switch (choice.trim()) {
        case '1': {
          console.log('\n  Registering local voter secret...');
          try {
            const tx = await deployed.callTx.registerVoter(getOrCreateVoterSecret());
            console.log(`  Registered. Transaction ID: ${tx.public.txId}\n`);
          } catch (error) {
            console.error('  Failed:', error instanceof Error ? error.message : error);
          }
          break;
        }

        case '2': {
          const rawVote = await rl.question('  Vote 1 for For, 0 for Against: ');
          const vote = rawVote.trim() === '1' ? 1n : rawVote.trim() === '0' ? 0n : null;
          if (vote === null) {
            console.log('\n  Invalid vote. Enter 1 or 0.\n');
            break;
          }

          console.log('\n  Casting sealed vote...');
          try {
            const tx = await deployed.callTx.castVote(vote, getOrCreateVoterSecret(), crypto.randomBytes(32));
            console.log(`  Vote sealed. Transaction ID: ${tx.public.txId}\n`);
          } catch (error) {
            console.error('  Failed:', error instanceof Error ? error.message : error);
          }
          break;
        }

        case '3':
          await printBallotBoxState(providers, deployment.address);
          break;

        case '4': {
          const currentState = await walletCtx.wallet.waitForSyncedState();
          const currentBalance = currentState.unshielded.balances[unshieldedToken().raw] ?? 0n;
          const dustBalance = currentState.dust.balance(new Date());
          console.log(`\n  tNight: ${currentBalance.toLocaleString()}`);
          console.log(`  DUST:   ${dustBalance.toLocaleString()}\n`);
          break;
        }

        case '5':
          running = false;
          break;

        default:
          console.log('\n  Invalid choice. Please enter 1-5.\n');
      }
    }

    await persistWalletState(network, walletCtx);
    await walletCtx.wallet.stop();
  } catch (error) {
    console.error('\nError:', error instanceof Error ? error.message : error);
  } finally {
    rl.close();
  }
}

main().catch(console.error);
