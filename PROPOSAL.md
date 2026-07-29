# Product Proposal

## What is the product, and who uses it?

Suffra is a private voting product for governance groups that need credible secret ballots: DAOs, community associations, student councils, working groups, cooperatives, and small civic organizations.

The product goal is simple: let a voter prove they are allowed to participate and cast exactly one ballot, while keeping the ballot choice private from observers. The public should be able to audit the election process without learning how any individual voted.

The current implementation is a sealed-ballot MVP. It provides the privacy core: registration commitments, sealed ballot commitments, and one-use nullifiers. This creates a real Midnight privacy workflow before Level 4 instead of relying on the earlier counter demo.

## Why Midnight specifically?

Transparent chains are a poor fit for secret ballots. If each vote updates a visible tally in real time, observers can often infer the voter’s choice from the public state delta. If the app hides the choice only in the UI, the privacy claim is weak.

Midnight gives Suffra the right primitives for the job:

- Compact treats circuit inputs as private unless they are deliberately disclosed.
- Public ledger state can store commitments and nullifiers instead of raw sensitive values.
- Zero-knowledge proofs let the contract enforce valid registration, valid ballot choice, and one-use voting without publishing the voter secret or vote choice.
- The public state remains auditable while sensitive voter data stays local.

## Data Model

| Data Point | Type | Disclosed To |
| :--- | :--- | :--- |
| Voting status | Public ledger | Everyone |
| Registered voter commitment | Public ledger | Everyone |
| Used vote nullifier | Public ledger | Everyone |
| Sealed ballot commitment | Public ledger | Everyone |
| Registered count | Public ledger | Everyone |
| Sealed ballot count | Public ledger | Everyone |
| Voter secret | Private circuit input | User only |
| Vote choice | Private circuit input | User only |
| Ballot salt | Private circuit input | User only |

## Smart Contract Model

```compact
export circuit registerVoter(voterSecret: Bytes<32>): [] {
  const commitment = voterCommitment(voterSecret);
  assert(!registeredVoters.member(commitment), "already registered");
  registeredVoters.insert(disclose(commitment));
  registeredCount.increment(1);
}

export circuit castVote(choice: Field, voterSecret: Bytes<32>, ballotSalt: Bytes<32>): [] {
  assert(choice == 0 || choice == 1, "invalid choice");
  assert(registeredVoters.member(voterCommitment(voterSecret)), "not registered");

  const nul = voteNullifier(voterSecret);
  assert(!usedNullifiers.member(nul), "already voted");

  usedNullifiers.insert(disclose(nul));
  sealedBallots.insert(disclose(ballotCommitment(choice, ballotSalt)));
  ballotCount.increment(1);
}
```

The key design choice is that Suffra does not increment a public option tally during each vote. That would leak the choice through public state changes. Instead, the current MVP records sealed ballot commitments and leaves final tally reveal/aggregation for the next milestone.

## Mainnet Feasibility

Suffra is feasible on Mainnet because the core transaction is compact: one registration commitment, one nullifier, one sealed ballot commitment, and small public counters. The design avoids storing raw voter data or full ballots on-chain.

The next implementation step is a Level 4 Preprod MVP with an approved election flow:

- deploy `contracts/suffra.compact` to Preprod;
- wire the frontend to the deployed Suffra address;
- document the user flow in `docs/USAGE.md`;
- publish the product X profile;
- add a tally protocol that avoids per-vote choice leakage.
