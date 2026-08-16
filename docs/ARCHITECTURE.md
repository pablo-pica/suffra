# Architecture — Suffra

## System Overview

Suffra is a private voting MVP built on Midnight. Candidate-ballot V2 is a four-option sealed ballot box: voters register a local secret, select a fictional candidate, and publish only commitment/nullifier data needed for public verification. The original binary V1 deployment remains as historical fallback evidence.

```text
Suffra React dApp
  WalletConnect     -> Lace wallet connection and balances
  BallotBox         -> register voter, select candidate, cast sealed ballot, close ballot box
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
- `candidateId`
- `ballotSalt`

Public disclosures:

- voter commitment derived from `voterSecret`
- vote nullifier derived from `voterSecret`
- candidate-ballot commitment derived from `candidateId` and `ballotSalt`

## Data Flow

1. User connects Lace wallet.
2. User registers a local voter secret.
3. Contract stores only a public commitment to that secret.
4. User selects one of the four fictional candidates.
5. Frontend calls `castVote(candidateId, voterSecret, ballotSalt)`.
6. Contract proves registration, a candidate ID from 0 through 3, and an unused nullifier.
7. Contract stores the public nullifier and sealed ballot commitment.
8. Frontend refreshes public counts from the Midnight indexer.

## Privacy Boundary

An observer can see registrations, nullifier spends, sealed ballot commitments, and counts. An observer cannot read the candidate selection, voter secret, or ballot salt from the ledger.

Suffra deliberately avoids public per-candidate tally increments during vote casting. A tally that changes by one for a visible transaction can leak the voter’s selection. Final public tallying needs an aggregation/reveal step that preserves ballot secrecy.

## Generated Artifacts

`npm run compile` compiles `contracts/suffra.compact` into `managed/suffra` and copies browser proof assets into `public/suffra`.

The legacy `contracts/counter.compact` and `managed/counter` artifacts remain only as Level 1/2 learning history.
