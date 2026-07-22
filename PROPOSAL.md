# 🗳️ Proposal: Suffra — Private Voting on Midnight

> **Chosen Idea:** Option 1 — Private Voting (anonymous ballots with publicly verifiable tallies)

---

## 1. Executive Summary & Product Overview

### What is Suffra?
Suffra is a zero-knowledge private voting dApp built on the Midnight network. It enables voters to cast anonymous ballots on governance proposals, municipal initiatives, and organizational elections while maintaining 100% publicly auditable and cryptographically verifiable election tallies.

### Who Uses It?
- **DAO Governance:** Decentralized autonomous organizations seeking plutocracy-resistant or voter-coercion-resistant voting where individual choices remain confidential.
- **Academic & Educational Institutions:** Student government elections, faculty board votes, and departmental polls.
- **Corporate & Executive Boards:** Confidential proxy voting and strategic board resolutions requiring secret ballots.
- **Community & Civic Groups:** Public sentiment polling where privacy is mandatory to prevent retaliation or peer pressure.

---

## 2. Why Midnight Specifically?

Traditional blockchains (e.g. Ethereum, Solana) enforce total transparency: every transaction, caller address, and state payload is publicly readable. This renders secret ballot voting impossible without relying on centralized trusted execution environments (TEEs) or complex off-chain commit-reveal schemes vulnerable to frontrunning and collusion.

Midnight uniquely solves this through its dual-state ledger model powered by zero-knowledge proofs (zk-SNARKs):

1. **Client-Side Proof Generation:** ZK proofs are generated entirely locally on the user's device (via the Midnight Proving Server and Lace wallet). The voter's actual ballot choice and private key never cross the wire or touch any server.
2. **Private Witness Execution:** Compact smart contracts allow function arguments to be treated as private witnesses. The proof verifies that the voter is eligible and hasn't voted before without exposing *who* they are or *what* option they selected.
3. **On-Chain Verifiability:** Midnight validators verify the ZK proof on-chain before accepting the state transition. Anyone in the public can independently verify the final tally without ever being able to decrypt individual votes.

---

## 3. Data Model & Architecture

Suffra divides all application data into a strict dual-state table:

| Data Attribute | State Type | Storage Location | Visibility | Purpose |
| :--- | :--- | :--- | :--- | :--- |
| **Proposal ID & Metadata** | Public | On-Chain Ledger | Anyone | Defines election parameters (title, description, choices, duration) |
| **Vote Option Tallies** | Public | On-Chain Ledger | Anyone | Aggregate count of valid votes cast per option |
| **Nullifiers / Commitment Set** | Public | On-Chain Ledger | Anyone | Prevents double-voting without linking to voter identity |
| **Contract Status** | Public | On-Chain Ledger | Anyone | Active, Paused, or Finalized |
| **Individual Ballot Selection** | Private | Local Witness | User Only | The specific choice made by the voter (never leaves client) |
| **Voter Identity / Keypair** | Private | Local Witness | User Only | User's wallet key used for signing eligibility proofs |
| **Nullifier Secret** | Private | Local Witness | User Only | Deterministic secret generating unique one-time nullifiers |

---

## 4. Smart Contract Mechanics (Compact)

Suffra leverages Compact smart contracts to enforce the following zero-knowledge circuit rules:

```compact
// High-level conceptual compact circuit model for Suffra
export circuit castVote(choice: Field, voterSecret: Bytes[32]): Void {
    // 1. Verify voter secret generates a valid nullifier
    const nullifier = hash(voterSecret, proposalId);
    assert(!nullifiers.contains(nullifier), "Double voting detected");
    
    // 2. Add nullifier to public state (prevents future votes)
    nullifiers.insert(nullifier);
    
    // 3. Increment public tally for the selected choice
    tallies.increment(choice, 1);
}
```

- **Nullifier Invariant:** Each voter generates a deterministic nullifier per proposal. The contract asserts the nullifier has not been spent, then adds it to the public nullifier set.
- **Tally Invariant:** The aggregate tally increments by 1 for the chosen option, but the input `choice` remains a private witness hidden inside the ZK proof.

---

## 5. Mainnet Feasibility & Roadmap

### Feasibility Assessment: **High**
Suffra is designed from the ground up to operate seamlessly on Midnight Mainnet:
- **Low Proof Overhead:** Ballot proofs are lightweight single-statement ZK proofs (nullifier insertion + counter increment), ensuring fast local proof generation (< 3 seconds) even on mobile devices.
- **Minimal State Footprint:** Storing aggregate counters and 32-byte nullifiers minimizes on-chain storage costs and ledger bloat.

### Development Roadmap
- **Phase 1 (Current — Level 2/3):** Single-proposal voting prototype with Lace wallet integration, proof server local proving, and Preprod deployment.
- **Phase 2 (Level 4 MVP):** Multi-proposal voting dashboard, voter eligibility whitelist verification via ZK membership proofs (`PROPOSAL.md` + MVP launch).
- **Phase 3 (Level 5 Users):** Community pilot with 50+ Preprod voters, UX feedback collection, and performance monitoring.
- **Phase 4 (Level 6 Mainnet):** Audit, Mainnet deployment, brand assets, and 20+ live governance elections hosted.

---

## 6. Alignment with Lunar Hackathon Goals

Suffra embodies Midnight's core mission: **protecting sensitive data while enabling public trust**. By making vote choices completely private and vote tallies completely public, Suffra delivers a real-world utility that demonstrates the necessity of ZK privacy in Web3 governance.
