# Architecture — Suffra

## System Overview

Suffra is a private voting dApp built on Midnight. It uses Compact smart contracts
for zero-knowledge ballot casting and the Midnight.js SDK for frontend integration.

```
┌─────────────────────────────────────────────────────┐
│                    Suffra Frontend                   │
│              Vite + React + TypeScript               │
│         Tailwind CSS v4 + Framer Motion              │
├─────────────────────────────────────────────────────┤
│                                                     │
│  ┌──────────────┐  ┌──────────────┐  ┌───────────┐ │
│  │ WalletConnect│  │  CircuitCall │  │  Results   │ │
│  │  (Lace DApp  │  │  (ZK proof   │  │  (Public   │ │
│  │  Connector)  │  │  generation) │  │  tallies)  │ │
│  └──────┬───────┘  └──────┬───────┘  └─────┬─────┘ │
│         │                 │                │        │
│  ┌──────┴─────────────────┴────────────────┴──────┐ │
│  │            useMidnight.ts Hook                  │ │
│  │  - Midnight.js SDK providers                    │ │
│  │  - httpClientProofProvider (proof generation)   │ │
│  │  - indexerPublicDataProvider (read chain state) │ │
│  │  - privateStateProvider (local encrypted state) │ │
│  └──────────────────────┬──────────────────────────┘ │
└─────────────────────────┼───────────────────────────┘
                          │
              ┌───────────┼───────────┐
              │           │           │
     ┌────────▼──┐  ┌─────▼─────┐  ┌─▼──────────┐
     │   Lace    │  │  Proof    │  │  Midnight   │
     │  Wallet   │  │  Server   │  │  Indexer    │
     │ (browser) │  │ (Docker   │  │  (network)  │
     │           │  │  :6300)   │  │             │
     └───────────┘  └───────────┘  └─────────────┘
                          │
                 ┌────────▼────────┐
                 │ Midnight Network│
                 │ (Preview/Preprod)│
                 │                 │
                 │ counter.compact │
                 │ (L1-L2: generic)│
                 │ voting.compact  │
                 │ (L3+: product)  │
                 └─────────────────┘
```

## Contract Architecture

### Level 1-2: counter.compact (Learning Phase)
```
ledger {
  counter: Counter    // PUBLIC — visible to anyone on-chain
}

circuit increment(
  secret_value        // PRIVATE — never leaves the user's browser
)
  → disclose(result)  // DELIBERATELY disclosed — developer chose to expose
```

### Level 3+: voting.compact (Product Phase)
```
ledger {
  proposals           // PUBLIC — proposal metadata, options
  tallies             // PUBLIC — vote counts per option
  nullifiers          // PUBLIC — prevents double-voting (no identity linkage)
  voting_status       // PUBLIC — open/closed
}

circuit cast_vote(
  voter_identity      // PRIVATE — never disclosed
  ballot_choice       // PRIVATE — never disclosed
  eligibility_proof   // PRIVATE — proves right to vote
)
  → disclose(nullifier)      // Disclosed: prevents re-voting
  → disclose(tally_update)   // Disclosed: increments correct option
```

## Privacy Model

### What an Observer CAN See (Public)
- Total vote count per option
- That a valid vote was cast (proof verified)
- Proposal metadata (title, options, description)
- Voting period status (open/closed)
- Nullifier (prevents double-voting, but not linkable to identity)

### What an Observer CANNOT See (Private)
- Who voted for what
- Whether a specific person voted
- Individual ballot contents
- Voter identity or wallet linkage to vote

### How Midnight Makes This Possible
- Circuit inputs are **private by default** in Compact
- `disclose()` is a deliberate developer choice, not automatic exposure
- ZK proofs verify vote validity without revealing vote content
- Nullifiers prevent double-voting without revealing voter identity

## SDK Provider Architecture

```
Midnight.js SDK Providers:
├── networkProvider          → connects to Midnight network (Preview/Preprod)
├── httpClientProofProvider  → sends circuit inputs to proof server (Docker :6300)
│                              generates ZK proof locally
├── indexerPublicDataProvider → reads public ledger state from chain
├── privateStateProvider     → manages encrypted local state
└── walletProvider           → Lace DApp Connector (window.midnight.mnLace)
```

## Data Flow: Casting a Vote

```
1. User selects option in UI
2. Frontend calls cast_vote circuit via Midnight.js SDK
3. Circuit inputs (voter_id, choice) sent to local proof server
4. Proof server generates ZK proof (may take 10-30 seconds)
5. Proof + disclosed values submitted on-chain
6. Compact contract verifies proof, updates ledger:
   - Increments tally for chosen option
   - Records nullifier (prevents re-vote)
7. Indexer detects ledger change
8. Frontend reads updated tallies, displays results
9. At NO point does the chain, indexer, or UI reveal the voter's choice
```
