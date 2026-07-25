# 🎥 Demo Video Guide — Suffra (Level 2 & Level 3 Unified Demo)

> **Unified Demo Strategy:** This 60–90 second video satisfies submission requirements for both **Level 2 (Waxing Crescent)** and **Level 3 (First Quarter)** by demonstrating wallet connection, local ZK proof generation, circuit execution, unit test output, CI/CD pipeline, and the product proposal.

---

## 📺 Published Demo Video
- **YouTube Link:** [https://youtu.be/G3Ppbny50tc](https://youtu.be/G3Ppbny50tc)
- **Duration:** 1:15 (covers Level 2 wallet & circuit + Level 3 tests, CI/CD & proposal)

---


## 🖥️ Browser Tabs to Prepare Before Recording
Before starting your screen recording, open the following tabs in order:
1. **Tab 1 — Live dApp:** [https://suffra-pica.vercel.app](https://suffra-pica.vercel.app)
2. **Tab 2 — Midnight Explorer:** [https://explorer.preview.midnight.network](https://explorer.preview.midnight.network) (or contract address `445c735e72a3909940076aa3adf0ec86abeff505a7282b9988ac6a77dc4cd748`)
3. **Tab 3 — GitHub Repository:** [https://github.com/pablo-pica/suffra](https://github.com/pablo-pica/suffra) (showing green CI badge & `PROPOSAL.md`)

---

## ⏱️ Video Structure & Script (60–90 Seconds)

### 1. Introduction & Core Privacy Claim (0:00 - 0:15)
- **Visual:** Show Tab 1 ([suffra-pica.vercel.app](https://suffra-pica.vercel.app)).
- **Narration:** *"Welcome to Suffra — private voting on Midnight. Suffra uses zero-knowledge proofs to enable anonymous ballot casting with publicly verifiable tallies."*
- **Key Point:** Highlight the ZK privacy model card on the screen (private ballot choice vs public ledger tallies & nullifiers).

### 2. Wallet Connection (Level 2 Requirement) (0:15 - 0:30)
- **Visual:** Click **Connect Lace Wallet**, approve popup in Lace (Midnight Edition).
- **Narration:** *"First, we connect our Lace wallet. Suffra detects the Midnight testnet, displaying our unshielded address, shielded keypair, and tNight/DUST balances."*
- **Key Point:** Show connected status badge turning green.

### 3. ZK Circuit Execution & Local Proof Generation (Level 2 & 3 Core) (0:30 - 0:55)
- **Visual:**
  1. Input secret vote increment amount (e.g. `5`).
  2. Point to the green *"Private Witness"* badge.
  3. Click **Execute ZK Transaction**.
  4. Highlight the loading state: *"Generating local proof & submitting..."*
  5. Show transaction receipt card displaying the generated Transaction ID.
- **Narration:** *"Now we execute a ZK circuit transaction. Notice how Suffra outputs the local zero-knowledge proof identifier. Midnight separates private ZK circuit states from unshielded gas fees, settling on-chain in 30 to 60 seconds as the block mines on the Preview testnet."*


### 4. On-Chain Verification, CI/CD & Tests (Level 3 Requirement) (0:55 - 1:20)
- **Visual:**
  1. Click **Explorer** link to view the transaction on Midnight Preview Explorer.
  2. Switch to Tab 3 ([github.com/pablo-pica/suffra](https://github.com/pablo-pica/suffra)).
  3. Point out the passing **Suffra CI** badge (`✓ PASS`), the 3/3 passing Vitest test suite (`tests/counter.test.ts`), and the formal product proposal ([PROPOSAL.md](https://github.com/pablo-pica/suffra/blob/main/PROPOSAL.md)).
- **Narration:** *"The transaction is verified on-chain, and the public counter updates. With 3/3 passing Vitest unit tests, an automated GitHub Actions CI pipeline, and our complete product proposal for Private Voting, Suffra fulfills all Level 2 and Level 3 requirements."*

---

## 📋 Pre-Submission Recording Checklist
- [ ] Screen recording resolution set to 1080p (1920x1080)
- [ ] Clear microphone audio without background noise
- [ ] Local Docker proof server running (`docker run -p 6300:6300 midnightnetwork/proof-server`)
- [ ] Lace wallet extension unlocked and set to Midnight Preview testnet
- [ ] Live dApp loaded on [suffra-pica.vercel.app](https://suffra-pica.vercel.app)
- [ ] GitHub repository showing green CI badge on `github.com/pablo-pica/suffra`
- [ ] Total video duration between 60 seconds and 90 seconds
