# Demo Video Guide — Suffra Sealed Ballot MVP

## Purpose

The Level 4 candidate-ballot V2 demo is published at [youtu.be/lxYipwonU5Y-](https://youtu.be/lxYipwonU5Y-). This guide records the flow it demonstrates.

The old Level 2/3 video showed the counter-based learning demo. The Level 4 recording shows the privacy-meaningful candidate sealed-ballot flow.

## Tabs to Prepare

1. Live dApp: `https://suffra-pica.vercel.app`
2. Midnight explorer for the deployed Suffra contract
3. GitHub repository showing the CI badge, README, `PROPOSAL.md`, and `docs/USAGE.md`
4. Terminal with `npm run test` output

## 60-90 Second Structure

### 1. Product Claim

Show the app headline and privacy model.

Narration:

> Suffra is a Midnight private voting MVP. It uses sealed ballot commitments and one-use nullifiers so the public can verify participation without seeing each voter’s choice.

### 2. Wallet Connection

Connect Lace Wallet and show balances.

Narration:

> The voter connects Lace, which provides the Midnight account and proving flow. The dApp does not display the local voter secret.

### 3. Register Voter

Click **Register Local Voter Secret** and approve the transaction.

Narration:

> Registration publishes a commitment to a local voter secret. The secret itself stays off-chain.

### 4. Cast Sealed Vote

Choose a fictional candidate, then click **Cast Sealed Candidate Ballot**.

Narration:

> The ballot choice is committed with fresh salt. The public ledger receives only a sealed ballot commitment and a nullifier that prevents this secret from voting twice.

### 5. Verification

Show the transaction ID, explorer, and refreshed counts. Switch to terminal tests and CI badge.

Narration:

> Tests cover registration, sealed vote casting, private ledger outputs, duplicate-vote rejection, and closed-ballot rejection. CI compiles the Compact contract before tests and build.

## Pre-Recording Checklist

- [x] `npm run compile` completed.
- [x] `npm run test` passes.
- [x] `npm run build` passes.
- [x] Proof server was running for the recorded flow.
- [x] Candidate-ballot V2 is deployed to Preprod.
- [x] Vercel is configured with `VITE_SUFFRA_CONTRACT_ADDRESS=eaeadd1e9f6df11ba0e9f1cf48f8e70b21bf7257bf7de2f9a459fc3869205597`.
- [x] Lace Wallet had sufficient test funds and DUST.
- [x] README contract table identifies the deployed address.
