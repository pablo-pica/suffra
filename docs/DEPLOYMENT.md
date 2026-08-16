# Deployment Guide — Suffra

## Current Deployment Status

- Candidate-ballot V2 is deployed to Preprod at `4bfc66f3473135f01156f7115ad820afad9d08b2b07b8ac0432b1e10ea97441a` (2026-08-20).
- The original binary Suffra V1 remains deployed at `f26ffd59ec7531b96b40b9cb748e7fac12ea7be6fef87e80007bd80e066e2da6` (2026-08-13) as historical fallback evidence.
- Local `.midnight-state.json` records the latest V2 deployment; the legacy Preview counter address `445c735e72a3909940076aa3adf0ec86abeff505a7282b9988ac6a77dc4cd748` is not Suffra Preprod evidence.
- `src/config/network.ts` validates `VITE_MIDNIGHT_NETWORK` as `undeployed`, `preview`, or `preprod`, and defaults the frontend to `preprod`. The Vercel contract-address variable must be updated to V2 before the candidate-ballot smoke test.

## Prerequisites

- Node.js v22+
- Docker running
- Lace wallet browser extension, Midnight edition
- Compact compiler available for `npm run compile`

## 1. Compile Contracts

Use the repo-defined script from `package.json`:

```bash
npm run compile
```

This compiles `contracts/suffra.compact` into `managed/suffra` and copies generated artifacts to `public/suffra`.

## 2. Start/Stop Proof Server

```bash
npm run proof-server:start
npm run proof-server:stop
```

CLI deployments use the `src/network.ts` local proof server endpoint, `http://127.0.0.1:6300`, for `undeployed`, `preview`, and `preprod`. The browser dApp uses the same loopback endpoint by default and rejects non-loopback proof-server URLs so private proof inputs do not leave the tester's machine.

## 3. Network Commands

```bash
npm run network
npm run network preview
npm run network preprod
```

`src/network.ts` defines these exact network endpoints:

| Network | Indexer | Indexer WS | Node | Faucet |
|:--|:--|:--|:--|:--|
| `undeployed` | `http://127.0.0.1:8088/api/v4/graphql` | `ws://127.0.0.1:8088/api/v4/graphql/ws` | `ws://127.0.0.1:9944` | None |
| `preview` | `https://indexer.preview.midnight.network/api/v4/graphql` | `wss://indexer.preview.midnight.network/api/v4/graphql/ws` | `https://rpc.preview.midnight.network` | `https://midnight-tmnight-preview.nethermind.dev` |
| `preprod` | `https://indexer.preprod.midnight.network/api/v4/graphql` | `wss://indexer.preprod.midnight.network/api/v4/graphql/ws` | `https://rpc.preprod.midnight.network` | `https://midnight-tmnight-preprod.nethermind.dev` |

No explorer URLs are defined in this repo.

## 4. Deploy Suffra to Preprod

Repo command for a Preprod deployment:

```bash
NODE_OPTIONS="--max-old-space-size=12288" npm run deploy -- --network preprod
```

The first Preprod sync can take a long time. The deploy command checkpoints each child wallet every minute in `.midnight-wallet-state/preprod/`; if it is interrupted, rerun the same command and it restores the latest checkpoint. Do **not** run `npm run clean` unless you deliberately intend to discard the deployment wallet and its sync checkpoints.

When the deploy flow prints a wallet address, fund that wallet from the Preprod faucet, then continue the deploy. After a successful deploy, record the exact Suffra Preprod contract address in `README.md` immediately.

## 5. Frontend Environment

`src/config/network.ts` and `src/hooks/useMidnight.ts` consume these Vite variables:

```bash
VITE_MIDNIGHT_NETWORK=preprod
VITE_SUFFRA_CONTRACT_ADDRESS=<64-char-contract-address>
# Optional; defaults to http://127.0.0.1:6300 and must remain loopback.
VITE_PROOF_SERVER_URL=http://127.0.0.1:6300
```

`VITE_MIDNIGHT_NETWORK` accepts `undeployed`, `preview`, or `preprod`; it defaults to `preprod`. Do **not** use the stale `VITE_CONTRACT_ADDRESS`; the hook does not read it.

Local frontend run against a configured address:

```bash
VITE_MIDNIGHT_NETWORK=preprod \
VITE_SUFFRA_CONTRACT_ADDRESS=<64-char-contract-address> \
npm run dev
```

Before claiming a working V2 Preprod frontend, set `VITE_SUFFRA_CONTRACT_ADDRESS` to `4bfc66f3473135f01156f7115ad820afad9d08b2b07b8ac0432b1e10ea97441a`, start the local proof server on the browser's machine, connect Lace on Preprod, and complete the candidate selection smoke test. This is a developer-demo prerequisite; a zero-setup prover is future product infrastructure, not a Level 4 claim.

## 6. Frontend Deployment

Build command and output directory from the repo:

```bash
npm run build
# output: dist/
```

For Vercel, configure:

- Framework: Vite
- Build command: `npm run build`
- Output directory: `dist`
- Environment variables: `VITE_MIDNIGHT_NETWORK=preprod` and `VITE_SUFFRA_CONTRACT_ADDRESS=4bfc66f3473135f01156f7115ad820afad9d08b2b07b8ac0432b1e10ea97441a`; leave `VITE_PROOF_SERVER_URL` unset unless overriding it with another local loopback address.

Keep the Product X profile, fresh Level 4 demo URL, and Preprod address as pending placeholders until verified.

## 7. Local Development

```bash
npm ci
npm run compile
npm run proof-server:start
npm run dev
npm run test
npm run build
```
