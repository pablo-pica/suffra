# 🎥 Demo Video Guide — Suffra (Level 2 & Level 3 Unified Demo)

> **Unified Demo Strategy:** This 1-to-2 minute video satisfies submission requirements for both **Level 2 (Waxing Crescent)** and **Level 3 (First Quarter)** by covering wallet connection, local ZK proof generation, circuit execution, and production dApp features.

---

## ⏱️ Video Structure & Script (60–90 Seconds)

### 1. Introduction & Privacy Claim (0:00 - 0:15)
- **Visual:** Show Suffra landing page ([suffra-private-voting.vercel.app](https://suffra-private-voting.vercel.app)).
- **Narration:** *"Welcome to Suffra — private voting on Midnight. Suffra uses zero-knowledge proofs to let users cast secret ballots with publicly verifiable tallies."*
- **Privacy Claim:** Point out the on-chain privacy model (public tallies vs private ballot selection).

### 2. Wallet Connection (Level 2 requirement) (0:15 - 0:30)
- **Visual:** Click **Connect Lace Wallet**, approve popup in Lace (Midnight Edition).
- **Narration:** *"First, we connect our Lace wallet. Suffra detects the Midnight testnet connection, displaying our wallet status and balances."*

### 3. Circuit Execution & Local Proof Generation (Level 2 & 3 core) (0:30 - 0:55)
- **Visual:** 
  1. Input vote choice / increment value.
  2. Click **Execute ZK Transaction**.
  3. Show Framer Motion animation and ZK proof generation status.
- **Narration:** *"Now we execute a ZK circuit transaction. Notice how the proof is generated locally inside the browser. The private witness (our vote choice) never leaves the client or hits any server."*
- **Visual:** Show transaction receipt with TxHash and contract state update.

### 4. Verification, CI/CD & Wrap-up (Level 3 requirement) (0:55 - 1:15)
- **Visual:**
  1. Show contract link on Preview block explorer (`445c735e72a39...`).
  2. Highlight the GitHub Actions CI badge (`.github/workflows/ci.yml`) and test suite (3/3 passing).
- **Narration:** *"The transaction is verified on-chain, and the public counter updates. With passing automated unit tests, a GitHub Actions CI pipeline, and a complete product proposal, Suffra is ready for Level 2 and Level 3 submission."*

---

## 📋 Recording Checklist
- [ ] Screen recording resolution: 1080p (1920x1080)
- [ ] Audio: Clear mic audio without background noise
- [ ] Wallet connected to Midnight Preview/Preprod testnet
- [ ] Proof server running locally (`docker run -p 6300:6300 midnightnetwork/proof-server`)
- [ ] Vercel live dApp loaded in browser
