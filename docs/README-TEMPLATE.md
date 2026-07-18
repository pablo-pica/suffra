# README Template — Suffra

> This template follows the official prompt's MANDATORY README structure,
> enhanced with our extras. Update it as you progress through each level.

---

## Level 1 README Structure

```markdown
# 🗳️ Suffra
> Private voting on Midnight — anonymous ballots, verifiable tallies.

## Contract Address
| Network  | Address                          |
|----------|----------------------------------|
| Preview  | [PASTE ADDRESS AFTER DEPLOY]     |
| Preprod  | [PASTE ADDRESS AFTER DEPLOY]     |

(This section is MANDATORY. Leave placeholders if not deployed yet.)

## What This Does
Plain English explanation of the contract's purpose.

## Privacy Model
- **What is PUBLIC** (on-chain, visible to anyone):
- **What is PRIVATE** (private witness, never on-chain):
- **What the user PROVES without revealing**:

## Tech Stack
- Midnight network, Compact language, Node.js v22, Docker

## Prerequisites
List everything needed to run locally.

## Setup
Step-by-step commands to clone, install, and run.

## Run Tests
Command to run the test suite.

## Initial Idea
[Your product idea paragraph]

## Screenshots
[Compile output + contract address screenshots]
```

---

## Level 2 Additions

```markdown
## Live Demo
[PASTE LIVE URL AFTER DEPLOYING FRONTEND]

## Privacy Claim
Specific statement: what an on-chain observer sees vs cannot see.

## Demo Video
[PLACEHOLDER — add link after recording]
```

---

## Level 3 Additions

```markdown
# 🗳️ Suffra
![CI](badge-url)
> Private voting on Midnight — anonymous ballots, verifiable tallies.

## CI/CD
Explain what the pipeline does.

## Product Proposal
See PROPOSAL.md
```

---

## Our Extras (Beyond Prompt Requirements)

### Collapsible Submission Evidence (Aethyr Pattern)
```markdown
## Submission Evidence

<details><summary>🌑 Level 1 — New Moon | Setup & First Contract</summary>

### Requirements Met
- ✅ Contract compiles with `compact compile`
- ✅ `managed/` directory present
- ✅ 3+ tests passing
- ✅ Contract deployed to [Network]
- ✅ 5 meaningful commits

### Screenshots
[Compile output]
[Contract address]

</details>

<details><summary>🌒 Level 2 — Waxing Crescent | Frontend Integration</summary>
...
</details>

<details><summary>🌓 Level 3 — First Quarter | Production-Grade dApp</summary>
...
</details>
```

### Architecture Diagram
```markdown
## Architecture
[Mermaid diagram from docs/ARCHITECTURE.md]
```

### Code Navigation
```markdown
## Project Structure
| Path | Description |
|:--|:--|
| `contracts/counter.compact` | Compact smart contract |
| `src/components/WalletConnect.tsx` | Lace wallet integration |
| `src/hooks/useMidnight.ts` | Midnight.js SDK hook |
| `tests/counter.test.ts` | Contract test suite |
```
