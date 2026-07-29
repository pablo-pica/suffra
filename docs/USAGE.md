# How to Use Suffra

## What You Need

- Lace Wallet, Midnight edition
- Test network funds and DUST for transaction fees
- A browser pointed at the live Suffra dApp
- A deployed Suffra contract address configured by the frontend

## Step-by-Step Guide

1. Open the Suffra dApp.
2. Connect Lace Wallet.
3. Confirm the wallet is on the expected Midnight test network.
4. Select **Register Local Voter Secret**.
5. Approve the transaction in Lace.
6. Choose **For** or **Against**.
7. Select **Cast Sealed Vote**.
8. Approve the proof and transaction flow in Lace.
9. Wait for the transaction ID and refreshed ballot box counts.

## What Gets Proved

Suffra proves that the local voter secret was registered, the vote choice is valid, and the same voter secret has not already cast a ballot.

In this MVP, the browser generates and stores the local voter secret by wallet account. That is enough to demonstrate the privacy circuit and nullifier flow, but production eligibility should use an approved registry or membership proof.

## What Stays Private

The public ledger does not receive the raw voter secret, raw vote choice, or ballot salt. It receives only commitment/nullifier values and public counts.

## Troubleshooting

- **Lace not detected:** unlock Lace, enable site access for the dApp domain, and refresh.
- **Wrong network:** switch Lace to the network used by the deployed Suffra contract.
- **No DUST:** fund the wallet and wait for DUST generation before submitting transactions.
- **Contract not ready:** deploy `contracts/suffra.compact`, then set `VITE_SUFFRA_CONTRACT_ADDRESS` for the frontend.
- **Already registered or already voted:** the same local voter secret has already been used for that action.
