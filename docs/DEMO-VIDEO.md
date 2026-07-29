# Demo Video Guide — Suffra Sealed Ballot MVP

## Purpose

Use this guide for the next recorded demo after the Suffra contract is deployed and the frontend has `VITE_SUFFRA_CONTRACT_ADDRESS` configured.

The old Level 2/3 video showed the counter-based learning demo. The new demo should show the privacy-meaningful sealed ballot flow.

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

Choose For or Against, then click **Cast Sealed Vote**.

Narration:

> The ballot choice is committed with fresh salt. The public ledger receives only a sealed ballot commitment and a nullifier that prevents this secret from voting twice.

### 5. Verification

Show the transaction ID, explorer, and refreshed counts. Switch to terminal tests and CI badge.

Narration:

> Tests cover registration, sealed vote casting, private ledger outputs, duplicate-vote rejection, and closed-ballot rejection. CI compiles the Compact contract before tests and build.

## Pre-Recording Checklist

- [ ] `npm run compile` completed.
- [ ] `npm run test` passes.
- [ ] `npm run build` passes.
- [ ] Proof server is running.
- [ ] Suffra contract is deployed.
- [ ] `VITE_SUFFRA_CONTRACT_ADDRESS` is configured in the frontend deployment.
- [ ] Lace Wallet has enough test funds and DUST.
- [ ] README contract table has the deployed Suffra address.
