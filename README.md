# 🗳️ Suffra

[![Suffra CI](https://github.com/pablo-pica/suffra/actions/workflows/ci.yml/badge.svg)](https://github.com/pablo-pica/suffra/actions/workflows/ci.yml)

> Private elections on Midnight: each registered local secret can cast one sealed ballot while the choice stays off-chain.

## Current Status

- **Idea/The Turn:** approved; approval date is not recorded.
- **Active level:** Level 4 — MVP Goes Live.
- **Internal Level 4 target:** August 24, 2026.
- **Official deadline:** August 31, 2026, with August 25-31 reserved as contingency buffer.
- **Verified Preprod deployments:** V1 was deployed and smoke-tested on 2026-08-13. Candidate-ballot V2 was deployed, configured, and smoke-tested with Lace on 2026-08-20. A fresh open V2 instance now powers the public demo. Product X profile is live; a fresh Level 4 demo video remains pending.

## 🌐 Live Demo

[suffra-pica.vercel.app](https://suffra-pica.vercel.app)

The public demo includes a fictional SK election preview and a live candidate-ballot flow. The live flow is configured for Candidate-ballot V2 on Preprod. Record a fresh video for final Level 4 submission evidence.

### 📌 Submission Resources & Links

| Resource | Value / Link |
| :--- | :--- |
| **Live Demo dApp** | [suffra-pica.vercel.app](https://suffra-pica.vercel.app) |
| **Demo Video** | Pending fresh Level 4 video; earlier Level 2/3 video: [youtu.be/G3Ppbny50tc](https://youtu.be/G3Ppbny50tc) |
| **Product Proposal** | [PROPOSAL.md](PROPOSAL.md) |
| **Usage Guide** | [docs/USAGE.md](docs/USAGE.md) |
| **CI/CD Workflow** | [.github/workflows/ci.yml](.github/workflows/ci.yml) |
| **Level Progress Tracker** | [docs/PROGRESS.md](docs/PROGRESS.md) |
| **X Launch Posts** | [docs/X-LAUNCH-POSTS.md](docs/X-LAUNCH-POSTS.md) |

## 📍 Contract Address

| Network | Contract | Address | Status |
| :--- | :--- | :--- | :--- |
| Preprod | Suffra candidate sealed ballot V2 — current open demo | `eaeadd1e9f6df11ba0e9f1cf48f8e70b21bf7257bf7de2f9a459fc3869205597` | Fresh open instance deployed 2026-08-20; public Vercel demo target |
| Preprod | Suffra candidate sealed ballot V2 — evidence instance | `4bfc66f3473135f01156f7115ad820afad9d08b2b07b8ac0432b1e10ea97441a` | Deployed and Lace smoke-tested 2026-08-20; now closed |
| Preprod | Suffra sealed ballot V1 | `f26ffd59ec7531b96b40b9cb748e7fac12ea7be6fef87e80007bd80e066e2da6` | Historical Level 4 evidence; Lace smoke test verified 2026-08-19 |
| Preview | Legacy counter demo | `445c735e72a3909940076aa3adf0ec86abeff505a7282b9988ac6a77dc4cd748` | Historical Level 1 evidence only; not a Suffra Preprod deployment |

### Verified Candidate-ballot V2 Smoke Test

The deployed V2 flow was exercised with Lace on Preprod using the fictional San Isidro Youth Council slate. The UI selected fictional candidate **Iñigo Valdez**; the public ledger stores only the salted candidate-ballot commitment, not the candidate ID.

| Action | Explorer transaction |
| :--- | :--- |
| Register local voter secret | [12e4b07ff5c25b8a947a53e8ce186eba056c3d906e2a1f0861315fb76bb785db](https://explorer.preprod.midnight.network/transactions/12e4b07ff5c25b8a947a53e8ce186eba056c3d906e2a1f0861315fb76bb785db) |
| Cast sealed candidate ballot | [8f2cb58abc28f5c30d0add15aa4313c7466b5271d4dd9f228fc2c468d73b8070](https://explorer.preprod.midnight.network/transactions/8f2cb58abc28f5c30d0add15aa4313c7466b5271d4dd9f228fc2c468d73b8070) |
| Close ballot box | [5537a11722c05b37f642d9fb1f765907fba5d0a4837a925e385b0b05135f9a34](https://explorer.preprod.midnight.network/transactions/5537a11722c05b37f642d9fb1f765907fba5d0a4837a925e385b0b05135f9a34) |

The evidence instance is now intentionally closed. The transactions demonstrate the complete register, sealed-candidate-ballot, and close lifecycle; no final tally is claimed. The public demo points to the fresh open V2 instance above so judges can run another ballot.

## ✨ What This Product Does

Suffra implements the approved Midnight challenge idea: **Private Voting**, initially focused on Sangguniang Kabataan elections. The product goal is to let an eligible voter cast exactly one ballot without exposing their choice on-chain. Broader governance uses such as DAOs, cooperatives, and community associations remain secondary applications of the same pattern.

Candidate-ballot V2 proves that a local voter secret was registered, the selected candidate ID is one of four valid options, and the voter has not voted before. It records voter commitments, one-use nullifiers, sealed candidate-ballot commitments, and public counts. It does not yet prove real-world eligibility or produce a final tally.

The landing page includes a fictional San Isidro SK election preview with fictional candidates and platforms. The preview is local-only, while the live ballot box below it uses the same four-candidate slate against the V2 Preprod contract.

## 🔒 Privacy Model

- **PUBLIC:** voting status, registered voter commitments, used nullifiers, sealed ballot commitments, registered count, and sealed ballot count.
- **PRIVATE:** voter secret, candidate selection, ballot salt, and the link between a real-world voter and their local voting secret.
- **PROVED without revealing:** the voter registered, the candidate ID is valid, the same voter secret has not voted before, and the ballot commitment came from the private selection plus salt.

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

The frontend validates `VITE_MIDNIGHT_NETWORK` and defaults to `preprod`. The current public demo uses `VITE_SUFFRA_CONTRACT_ADDRESS=eaeadd1e9f6df11ba0e9f1cf48f8e70b21bf7257bf7de2f9a459fc3869205597`. The deployed dApp uses a local proof server at `http://127.0.0.1:6300` by default, so start it with `npm run proof-server:start` before registering or voting. Lace is still responsible for transaction approval and Preprod submission. Every fresh instance starts with empty counts, so register the local voter secret before voting.

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

[SuffraPrivVote](https://x.com/SuffraPrivVote)

Three ready-to-post launch messages are documented in [docs/X-LAUNCH-POSTS.md](docs/X-LAUNCH-POSTS.md).
