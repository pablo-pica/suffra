# Architecture — Suffra

## System Overview

Suffra is a private voting MVP built on Midnight. The current product contract is a sealed ballot box: voters register a local secret, cast a vote as a salted commitment, and publish only commitment/nullifier data needed for public verification.

```text
Suffra React dApp
  WalletConnect     -> Lace wallet connection and balances
  BallotBox         -> register voter, cast sealed vote, close ballot box
  useMidnight       -> Midnight providers, Suffra contract calls, public state reads

Midnight services
  Lace wallet       -> account keys, transaction balancing, proving provider
  Proof server      -> local proof generation
  Indexer           -> public contract state reads
  Suffra contract   -> Compact sealed-ballot logic
```

## Contract

Primary contract: `contracts/suffra.compact`

Public ledger state:

- `votingOpen`
- `registeredVoters`
- `usedNullifiers`
- `sealedBallots`
- `registeredCount`
- `ballotCount`

Private circuit inputs:

- `voterSecret`
- `choice`
- `ballotSalt`

Public disclosures:

- voter commitment derived from `voterSecret`
- vote nullifier derived from `voterSecret`
- ballot commitment derived from `choice` and `ballotSalt`

## Data Flow

1. User connects Lace wallet.
2. User registers a local voter secret.
3. Contract stores only a public commitment to that secret.
4. User chooses For or Against.
5. Frontend calls `castVote(choice, voterSecret, ballotSalt)`.
6. Contract proves registration, valid choice, and unused nullifier.
7. Contract stores the public nullifier and sealed ballot commitment.
8. Frontend refreshes public counts from the Midnight indexer.

## Privacy Boundary

An observer can see registrations, nullifier spends, sealed ballot commitments, and counts. An observer cannot read the raw vote choice, voter secret, or ballot salt from the ledger.

Suffra deliberately avoids public per-choice tally increments during vote casting. A tally that changes by one for a visible transaction can leak the voter’s choice. Final public tallying needs an aggregation/reveal step that preserves ballot secrecy.

## Generated Artifacts

`npm run compile` compiles `contracts/suffra.compact` into `managed/suffra` and copies browser proof assets into `public/suffra`.

The legacy `contracts/counter.compact` and `managed/counter` artifacts remain only as Level 1/2 learning history.
