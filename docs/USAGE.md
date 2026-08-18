# How to Use Suffra

## What You Need

- Lace Wallet, Midnight edition
- Test network funds and DUST for transaction fees
- Docker, with the local Midnight proof server started using `npm run proof-server:start`
- A browser pointed at the live Suffra dApp
- A deployed Suffra contract address configured by the frontend

## Fictional election preview

The landing page includes a **San Isidro Youth Council** SK election preview with fictional candidates Althea Manalo, Iñigo Valdez, Soraya Banzon, and Tavio Reyes. Selecting a candidate and sealing the demo ballot only exercises local interface state: it does not connect Lace, generate a proof, submit a transaction, or change the Preprod contract.

The real privacy test below the preview uses Candidate-ballot V2 on Preprod. It accepts one private selection from the four fictional candidates and proves that the selection is valid without writing the candidate ID to the ledger. A safe final tally remains future protocol work, not a feature of the current contract.

## Step-by-Step Guide

1. On the same machine as your browser, run `npm run proof-server:start` and wait for Docker to report the proof server is healthy on `127.0.0.1:6300`.
2. Open the Suffra dApp.
3. Connect Lace Wallet.
4. Confirm Lace is on Midnight Preprod, the network configured through `VITE_MIDNIGHT_NETWORK` for the Level 4 deployment.
5. Select **Register Local Voter Secret**. The local proof server constructs the proof; this keeps proof inputs on your machine.
6. Approve the transaction in Lace when it appears.
7. Choose one fictional candidate in the live candidate ballot.
8. Select **Cast Sealed Candidate Ballot** and approve in Lace.
9. Wait for the transaction ID and refreshed ballot box counts.

## Verified V2 demo lifecycle

The live V2 demo completed registration, selected fictional candidate **Iñigo Valdez**, cast a sealed candidate ballot, and closed the ballot box on Preprod. Explorer evidence:

- Registration: `12e4b07ff5c25b8a947a53e8ce186eba056c3d906e2a1f0861315fb76bb785db`
- Sealed candidate ballot: `8f2cb58abc28f5c30d0add15aa4313c7466b5271d4dd9f228fc2c468d73b8070`
- Close ballot box: `5537a11722c05b37f642d9fb1f765907fba5d0a4837a925e385b0b05135f9a34`

The evidence V2 ballot box is now closed. These transactions prove the lifecycle, not a final candidate tally. The public demo now targets a fresh open V2 instance at `eaeadd1e9f6df11ba0e9f1cf48f8e70b21bf7257bf7de2f9a459fc3869205597` so judges can run the flow.

## What Gets Proved

Suffra proves that the local voter secret was registered, the candidate ID is one of the four valid options, and the same voter secret has not already cast a ballot.

In this MVP, the browser generates and stores the local voter secret by wallet account. That is enough to demonstrate the privacy circuit and nullifier flow, but production eligibility should use an approved registry or membership proof.

## What Stays Private

The public ledger does not receive the raw voter secret, candidate selection, or ballot salt. It receives only commitment/nullifier values and public counts.

## Troubleshooting

- **Lace not detected:** unlock Lace, enable site access for the dApp domain, and refresh.
- **Wrong network:** switch Lace to the network used by the deployed Suffra contract.
- **No DUST:** fund the wallet and wait for DUST generation before submitting transactions.
- **Local proof server unavailable:** run `npm run proof-server:start` on the browser's machine. The hosted Preprod proof server is not used by Suffra's browser flow.
- **Contract not ready:** set Vercel or local `VITE_SUFFRA_CONTRACT_ADDRESS` to the current open Candidate-ballot V2 instance (`eaeadd1e9f6df11ba0e9f1cf48f8e70b21bf7257bf7de2f9a459fc3869205597`) and reload the frontend.
- **Already registered or already voted:** the same local voter secret has already been used for that action.
