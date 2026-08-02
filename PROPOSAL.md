# Product Proposal

## What is the product, and who uses it?

Suffra is the approved **Private Voting** idea applied first to Sangguniang Kabataan elections. The product goal is to let an eligible voter cast one ballot while keeping the individual choice private. The same design can later serve student councils, DAOs, cooperatives, associations, and working groups, but the Level 4 story is an SK election MVP rather than a generic governance toolkit.

The current implementation is a sealed-ballot MVP. It provides registration commitments, sealed ballot commitments, one-use nullifiers, and public counts. This is the privacy core for a real Midnight voting workflow.

Boundary: the current contract does **not** include eligibility credentials beyond self-registration, and it does **not** produce a final tally. Those are planned product gates, not completed capabilities.

## Why Midnight specifically?

Transparent chains are a poor fit for secret ballots. If each vote updates a visible per-option tally in real time, observers can infer choices from public state deltas. Suffra uses Midnight circuits to check private inputs while writing only the commitments and nullifiers needed by the current contract.

- Public ledger state stores commitments and nullifiers instead of raw voter secrets or raw choices.
- Zero-knowledge proofs let the current contract enforce prior self-registration, a valid ballot choice, and one-use voting without publishing the voter secret or vote choice.
- Observers can audit registration and ballot counts, commitments, and spent nullifiers. Public eligibility verification and final result verification are not implemented yet.

## Data Model

| Data Point | Type | Current Status |
| :--- | :--- | :--- |
| Voting status | Public ledger | Implemented |
| Registered voter commitment | Public ledger | Implemented |
| Used vote nullifier | Public ledger | Implemented |
| Sealed ballot commitment | Public ledger | Implemented |
| Registered count | Public ledger | Implemented |
| Sealed ballot count | Public ledger | Implemented |
| Voter secret | Private circuit input | Implemented |
| Vote choice | Private circuit input | Implemented |
| Ballot salt | Private circuit input | Implemented |
| Eligibility credential | Planned | Not implemented |
| Final tally | Feasibility gate | Not implemented |

## Smart Contract Model

`contracts/suffra.compact` registers a voter commitment, rejects duplicate registration, accepts a private vote choice plus salt, spends one nullifier per voter secret, and stores only a sealed ballot commitment. It deliberately avoids a public per-choice tally during voting because that would leak choices by observing state changes.

The Level 4 feasibility gate is complete: a tally cannot be added safely to the current contract because it stores only salted ballot commitments, with no reveal, decryption, aggregation, or authorized tally input. Tally work is explicitly deferred to Level 5 rather than adding a public per-choice counter that would leak choices.

## Level 4-6 Delivery Path

- **Level 4 — by August 24, 2026:** audit structure/baseline, verify privacy core, fix frontend network config, recheck CI, deploy Suffra to Preprod, update README/usage docs, create Product X profile, record a fresh demo, and submit. August 25-31 is contingency buffer.
- **Level 5:** refine the same Preprod MVP through feedback, document the loop, collect 50 Preprod user wallet addresses, update docs, record full MVP demo evidence, and maintain at least 20 meaningful commits.
- **Level 6:** conservative planning baseline is 70 cumulative Preprod wallet addresses and 30 meaningful commits. Mainnet scope remains pending official clarification because repository sources conflict.

## Mainnet Feasibility

The current data model limits each registration or vote to a small set of public commitments, nullifiers, and counters. Mainnet feasibility still requires a completed tally/eligibility design plus deployment, cost, and performance validation. Mainnet launch is not claimed for the current MVP and should not be treated as a verified Level 6 dashboard requirement until the source conflict is resolved.
