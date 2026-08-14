# How to Use Suffra

## What You Need

- Lace Wallet, Midnight edition
- Test network funds and DUST for transaction fees
- Docker, with the local Midnight proof server started using `npm run proof-server:start`
- A browser pointed at the live Suffra dApp
- A deployed Suffra contract address configured by the frontend

## Fictional election preview

The landing page includes a **San Isidro Youth Council** SK election preview with fictional candidates Althea Manalo, Iñigo Valdez, Soraya Banzon, and Tavio Reyes. Selecting a candidate and sealing the demo ballot only exercises local interface state: it does not connect Lace, generate a proof, submit a transaction, or change the Preprod contract.

The real privacy test below the preview currently uses the contract's binary **For/Against** choice. Multiple candidates and a safe final tally are future protocol work, not features of the current contract.

## Step-by-Step Guide

1. On the same machine as your browser, run `npm run proof-server:start` and wait for Docker to report the proof server is healthy on `127.0.0.1:6300`.
2. Open the Suffra dApp.
3. Connect Lace Wallet.
4. Confirm Lace is on Midnight Preprod, the network configured through `VITE_MIDNIGHT_NETWORK` for the Level 4 deployment.
5. Select **Register Local Voter Secret**. The local proof server constructs the proof; this keeps proof inputs on your machine.
6. Approve the transaction in Lace when it appears.
7. Choose **For** or **Against**.
8. Select **Cast Sealed Vote** and approve in Lace.
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
- **Local proof server unavailable:** run `npm run proof-server:start` on the browser's machine. The hosted Preprod proof server is not used by Suffra's browser flow.
- **Contract not ready:** deploy `contracts/suffra.compact`, then set `VITE_SUFFRA_CONTRACT_ADDRESS` for the frontend.
- **Already registered or already voted:** the same local voter secret has already been used for that action.
