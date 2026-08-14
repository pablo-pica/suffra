# 🗳️ Suffra

[![Suffra CI](https://github.com/pablo-pica/suffra/actions/workflows/ci.yml/badge.svg)](https://github.com/pablo-pica/suffra/actions/workflows/ci.yml)

> Private elections on Midnight: each registered local secret can cast one sealed ballot while the choice stays off-chain.

## Current Status

- **Idea/The Turn:** approved; approval date is not recorded.
- **Active level:** Level 4 — MVP Goes Live.
- **Internal Level 4 target:** August 24, 2026.
- **Official deadline:** August 31, 2026, with August 25-31 reserved as contingency buffer.
- **Verified Preprod deployment:** Suffra was deployed on 2026-08-13. The Lace smoke test is complete; Product X profile and a fresh Level 4 demo video remain pending.

## 🌐 Live Demo

[suffra-pica.vercel.app](https://suffra-pica.vercel.app)

The public demo includes a fictional SK election preview that shows the intended finished-product experience. The live privacy test below it is wired to the verified Preprod contract. Record a fresh video for final Level 4 submission evidence.

### 📌 Submission Resources & Links

| Resource | Value / Link |
| :--- | :--- |
| **Live Demo dApp** | [suffra-pica.vercel.app](https://suffra-pica.vercel.app) |
| **Demo Video** | Pending fresh Level 4 video; earlier Level 2/3 video: [youtu.be/G3Ppbny50tc](https://youtu.be/G3Ppbny50tc) |
| **Product Proposal** | [PROPOSAL.md](PROPOSAL.md) |
| **Usage Guide** | [docs/USAGE.md](docs/USAGE.md) |
| **CI/CD Workflow** | [.github/workflows/ci.yml](.github/workflows/ci.yml) |
| **Level Progress Tracker** | [docs/PROGRESS.md](docs/PROGRESS.md) |

## 📍 Contract Address

| Network | Contract | Address | Status |
| :--- | :--- | :--- | :--- |
| Preprod | Suffra sealed ballot | `f26ffd59ec7531b96b40b9cb748e7fac12ea7be6fef87e80007bd80e066e2da6` | Deployed 2026-08-13; Lace smoke test verified 2026-08-19 |
| Preview | Legacy counter demo | `445c735e72a3909940076aa3adf0ec86abeff505a7282b9988ac6a77dc4cd748` | Historical Level 1 evidence only; not a Suffra Preprod deployment |

## ✨ What This Product Does

Suffra implements the approved Midnight challenge idea: **Private Voting**, initially focused on Sangguniang Kabataan elections. The product goal is to let an eligible voter cast exactly one ballot without exposing their choice on-chain. Broader governance uses such as DAOs, cooperatives, and community associations remain secondary applications of the same pattern.

The current sealed-ballot contract proves only that a local voter secret was registered and has not voted before. It records voter commitments, one-use nullifiers, sealed ballot commitments, and public counts. It does not yet prove real-world eligibility or produce a final tally.

The landing page also includes a fictional San Isidro SK election preview with fictional candidates and platforms. It is a local interface simulation—no wallet, proof, or transaction is used—and exists to show how a finished Suffra election could feel.

## 🔒 Privacy Model

- **PUBLIC:** voting status, registered voter commitments, used nullifiers, sealed ballot commitments, registered count, and sealed ballot count.
- **PRIVATE:** voter secret, ballot choice, ballot salt, and the link between a real-world voter and their local voting secret.
- **PROVED without revealing:** the voter registered, the choice is valid, the same voter secret has not voted before, and the ballot commitment came from the private choice plus salt.

## 🗺️ Level 4-6 Roadmap

- **Level 4 by Aug 24:** audit baseline, verify privacy core, configure the frontend for Preprod, recheck CI, deploy Suffra to Preprod, update README/usage docs, create Product X profile, record a fresh demo, and submit. The tally gate is complete: the current sealed-ballot design cannot safely produce a final tally, so tally work is deferred to Level 5.
- **Level 5:** same Preprod MVP refined with feedback, 50 Preprod users/wallet addresses, updated docs, demo evidence, and 20 meaningful commits.
- **Level 6:** conservative baseline is 70 cumulative Preprod wallet addresses and 30 meaningful commits. Mainnet scope remains pending official clarification.

## 🛠️ Tech Stack

- Midnight Network and Compact smart contracts
- Midnight.js SDK and Lace wallet connector
- Vite, React, and TypeScript
- Tailwind CSS v4 and Framer Motion
- Vitest and GitHub Actions

## ✅ Prerequisites

- Node.js v22+
- Docker for the local proof server
- Lace Wallet, Midnight edition
- Local Midnight proof server reachable on `127.0.0.1:6300` for register/vote proof generation
- Compact compiler installed locally

## ⚡ Setup & Run Locally

```bash
npm ci
npm run compile
npm run proof-server:start
VITE_MIDNIGHT_NETWORK=preprod \
VITE_SUFFRA_CONTRACT_ADDRESS=<64-char-contract-address> \
npm run dev
```

The frontend validates `VITE_MIDNIGHT_NETWORK` and defaults to `preprod`. The deployed dApp uses a local proof server at `http://127.0.0.1:6300` by default, so start it with `npm run proof-server:start` before registering or voting. Lace is still responsible for transaction approval and Preprod submission. The verified Preprod contract address and Lace smoke-test evidence are recorded above. The browser still needs the local proof server for register/vote proof generation; Lace approves and submits the resulting Preprod transactions.

## 🧪 Run Tests

```bash
npm run test
```

## 🚦 CI/CD

GitHub Actions runs on `push` and `pull_request` through [.github/workflows/ci.yml](.github/workflows/ci.yml).

## 📖 Usage Guide

See [docs/USAGE.md](docs/USAGE.md).

## 💡 Product Proposal

See [PROPOSAL.md](PROPOSAL.md).

## 📣 Product X Profile

Pending. Create the public Suffra product profile during Level 4 and add the link here.
