# 🗳️ Suffra

[![Suffra CI](https://github.com/pablo-pica/suffra/actions/workflows/ci.yml/badge.svg)](https://github.com/pablo-pica/suffra/actions/workflows/ci.yml)

> Private voting on Midnight, beginning with a sealed-ballot MVP that proves registration and one-ballot-per-registered-secret without exposing the vote choice on-chain.

## 🌐 Live Demo

[suffra-pica.vercel.app](https://suffra-pica.vercel.app)

The live app is the public showcase for Suffra’s sealed-ballot experience. After the new Suffra contract is deployed, set `VITE_SUFFRA_CONTRACT_ADDRESS` in the frontend environment so the demo connects directly to the deployed contract.

### 📌 Submission Resources & Links

| Resource | Value / Link |
| :--- | :--- |
| **Live Demo dApp** | [suffra-pica.vercel.app](https://suffra-pica.vercel.app) |
| **Demo Video** | [youtu.be/G3Ppbny50tc](https://youtu.be/G3Ppbny50tc) |
| **Product Proposal** | [PROPOSAL.md](PROPOSAL.md) |
| **Usage Guide** | [docs/USAGE.md](docs/USAGE.md) |
| **CI/CD Workflow** | [.github/workflows/ci.yml](.github/workflows/ci.yml) |
| **Level Progress Tracker** | [docs/PROGRESS.md](docs/PROGRESS.md) |
| **Architecture Notes** | [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) |
| **Demo Script** | [docs/DEMO-VIDEO.md](docs/DEMO-VIDEO.md) |

### 🎬 Demo Video

Watch the existing walkthrough here: [youtu.be/G3Ppbny50tc](https://youtu.be/G3Ppbny50tc).

This video was recorded for the earlier Level 2/3 flow. A fresh Level 4 video should be recorded after the Suffra sealed-ballot contract is deployed and the live frontend is wired to the new contract address.

## 📍 Contract Address

| Network | Contract | Address |
| :--- | :--- | :--- |
| Preview / Preprod | Suffra sealed ballot | Pending redeploy with `contracts/suffra.compact` |
| Preview | Legacy counter demo | `445c735e72a3909940076aa3adf0ec86abeff505a7282b9988ac6a77dc4cd748` |

## ✨ What This Product Does

Suffra is a private governance voting MVP for communities, DAOs, schools, cooperatives, and organizations that need secret ballots without surrendering public trust. It is designed for votes where the result should be verifiable, but individual voter choices should not become public information.

The current implementation replaces the earlier counter demo with a real sealed-ballot Compact contract. Voters register a local voter secret, cast a choice, and submit a zero-knowledge transaction. The public ledger receives only a voter commitment, a one-use nullifier, and a salted ballot commitment.

That design gives judges something concrete to inspect: the contract proves that the voter registered first, used a valid choice, and has not reused the same voting secret. It also avoids the common privacy mistake where a public per-choice tally changes after every vote and leaks each voter’s selection by subtraction.

## 🔒 Privacy Model

- **PUBLIC:** voting status, registered voter commitments, used nullifiers, sealed ballot commitments, registered count, and sealed ballot count.
- **PRIVATE:** voter secret, ballot choice, ballot salt, and the link between a real-world voter and their local voting secret.
- **PROVED without revealing:** the voter has registered, the choice is valid, the same voter secret has not voted before, and the submitted ballot commitment was derived from a private choice plus fresh salt.

## 🛡️ Privacy Claim

An on-chain observer can see that a registered voting secret cast one sealed ballot and that a nullifier was spent. They cannot read the raw vote choice, voter secret, or ballot salt from the ledger.

In the browser demo, the local voter secret is generated client-side and stored by wallet account in browser storage. A production eligibility layer should move beyond self-registration and use an approved registry or membership proof.

This is a sealed-ballot MVP, not a finished election tally protocol. Final public tallying belongs in the next product step: aggregate reveal or another tally protocol that preserves ballot secrecy.

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
- Midnight proof server reachable on port `6300`
- Compact compiler installed locally: `npm install -g @midnight-ntwrk/compact-compiler`

## ⚡ Setup & Run Locally

```bash
npm ci
npm run compile
npm run proof-server:start
npm run dev
```

To connect the frontend to a deployed Suffra contract:

```bash
VITE_SUFFRA_CONTRACT_ADDRESS=<64-char-contract-address> npm run dev
```

## 🧪 Run Tests

```bash
npm run test
```

Current local result:

```text
Test Files  2 passed (2)
Tests       8 passed (8)
```

The Suffra tests cover initialization, voter registration, sealed vote casting, privacy of ledger outputs, duplicate-vote rejection, and closed-ballot rejection.

## 🚦 CI/CD

GitHub Actions runs on `push` and `pull_request`. The pipeline installs dependencies, installs the Compact compiler, compiles `contracts/suffra.compact`, typechecks, runs Vitest, and builds the production frontend.

## 📖 Usage Guide

See [docs/USAGE.md](docs/USAGE.md).

## 💡 Product Proposal

See [PROPOSAL.md](PROPOSAL.md). Suffra is aligned with the Midnight challenge idea “Private Voting: anonymous ballots with publicly verifiable tallies.” The current contract implements the sealed-ballot privacy core; the Level 4 MVP should add the approved deployment, public profile, and final tally path.

## 📣 Product X Profile

Pending. Create the public Suffra product profile during Level 4 and add the link here.
