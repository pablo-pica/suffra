# 🎥 Demo Video Checklist — Suffra

This checklist outlines the precise sequence of steps to follow when recording the 2-minute demo video for the Midnight Builder Challenge (Level 2).

## ⏱️ Video Structure (Total: 2 Minutes)

### 1. Introduction & Context (0:00 - 0:20)
- **Goal:** Introduce the project and state the core privacy claims.
- **Action:** Show the landing page of the application.
- **Talking Points:**
  - Introduce Suffra: A private voting application built on the Midnight network.
  - Explain the core value proposition: Secure, anonymous voting where individual choices are private, but the final tallies are cryptographically verifiable.

### 2. Wallet Connection (0:20 - 0:45)
- **Goal:** Demonstrate connecting to the Lace Wallet (Midnight Edition).
- **Action:**
  - Click the **Connect Lace Wallet** button.
  - Show the Lace wallet connection popup and approve it.
  - Point out the unshielded address (public identity) and the shielded address (private keys).
  - Verify the tNight and DUST balances are populated.

### 3. Executing a Private ZK Transaction (0:45 - 1:30)
- **Goal:** Show a circuit call being proven locally in the browser.
- **Action:**
  - Input a secret increment value (e.g., `5`).
  - Click **Execute ZK Transaction**.
  - Highlight the loading state: *"Generating local proof & submitting..."*
  - Explain what is happening under the hood: The ZK proof is computed locally inside the browser using the wallet's proving provider without sending the secret input to any central server.
  - Show the success state: Display the generated Transaction ID.

### 4. Verification & Explorer Link (1:30 - 2:00)
- **Goal:** Confirm the transaction on-chain and conclude.
- **Action:**
  - Click the **Explorer** link to show the transaction status on the Preview Block Explorer.
  - Show that the public ledger state (Counter Value) has updated.
  - Conclude the demo by summarizing the privacy model: *The voter proved they submitted a valid increment without revealing the value of the increment itself.*
