# Deployment Guide — Suffra

## Current Deployment Status

- No verified Suffra Preprod deployment is recorded yet.
- Local `.midnight-state.json` contains only the legacy Preview counter address `445c735e72a3909940076aa3adf0ec86abeff505a7282b9988ac6a77dc4cd748` from 2026-07-18; do not use it as Suffra Preprod evidence.
- `src/hooks/useMidnight.ts` currently reads `VITE_SUFFRA_CONTRACT_ADDRESS` but hardcodes `NETWORK_ID = 'preview'`. The frontend remains Preview-bound until the planned Level 4 network-config change lands.

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

The configured local proof server endpoint in `src/network.ts` is `http://127.0.0.1:6300` for `undeployed`, `preview`, and `preprod`.

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

When the deploy flow prints a wallet address, fund that wallet from the Preprod faucet, then continue the deploy. After a successful deploy, record the exact Suffra Preprod contract address in `README.md` immediately.

## 5. Frontend Environment

`src/hooks/useMidnight.ts` currently consumes this Vite variable:

```bash
VITE_SUFFRA_CONTRACT_ADDRESS=<64-char-contract-address>
```

Do **not** use the stale `VITE_CONTRACT_ADDRESS`; the hook does not read it. The frontend has no environment-based network selector yet.

Local frontend run against a configured address:

```bash
VITE_SUFFRA_CONTRACT_ADDRESS=<64-char-contract-address> npm run dev
```

Current blocker: even with a Preprod address, the hook still calls `setNetworkId('preview')`. Fix network configuration before claiming a working Preprod frontend.

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
- Environment variable: `VITE_SUFFRA_CONTRACT_ADDRESS=<verified Suffra Preprod address>`

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
