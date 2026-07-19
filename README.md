# 🗳️ Suffra

> Private voting on Midnight — anonymous ballots, verifiable tallies.

## Contract Address

| Network  | Address                                                          |
|----------|------------------------------------------------------------------|
| Preview  | 445c735e72a3909940076aa3adf0ec86abeff505a7282b9988ac6a77dc4cd748 |
| Preprod  | [PENDING DEPLOY]                                                 |

## What This Does

Suffra is a private voting application built on Midnight that enables anonymous ballot casting with publicly verifiable tallies. Using Midnight's zero-knowledge proof system, voters can cast ballots without revealing their identity or their choice to anyone — yet the final tally is cryptographically verified and publicly auditable.

## Privacy Model

- **What is PUBLIC** (on-chain, visible to anyone): Vote tallies per option, proposal metadata, voting period status, nullifiers (prevent double-voting)
- **What is PRIVATE** (private witness, never on-chain): Individual ballot choice, voter identity, eligibility proof details
- **What the user PROVES without revealing**: That their vote is valid, that they are eligible to vote, and that they haven't voted before — all without exposing who they are or what they voted for

## Tech Stack

- Midnight network, Compact language, Node.js v22, Docker
- Vite + React + TypeScript
- Tailwind CSS v4 + Framer Motion
- Lace wallet (Midnight edition)
- Midnight.js SDK

## Prerequisites

- Node.js v22+
- Docker
- Lace wallet browser extension (Midnight edition)
- Git

## Setup

```bash
# Clone the repo
git clone https://github.com/[username]/suffra.git
cd suffra

# Install dependencies
npm install

# Start proof server
docker run -p 6300:6300 midnightnetwork/proof-server

# Compile contracts
compact compile

# Start dev server
npm run dev
```

## Run Tests

```bash
npm run test
```

## Initial Idea

Suffra is a private voting application built on Midnight that enables anonymous ballot casting with publicly verifiable tallies. Using Midnight's zero-knowledge proof system, voters can cast ballots without revealing their identity or their vote to anyone — yet the final tally is cryptographically verified and publicly auditable. Ideal for DAO governance, student elections, board votes, and any scenario where vote integrity matters but voter privacy is paramount.

## Screenshots

[PENDING — will be added after compile and deploy]
