# Suffra X Posts & Updates

Profile: https://x.com/SuffraPrivVote

Suffra maintains 6 published posts on its official X profile ([@SuffraPrivVote](https://x.com/SuffraPrivVote)): three initial MVP launch posts from Level 4, and three fresh product updates published in September 2026 for Level 5.

---

## Level 5 Product Updates (September 2026)

These three posts document ongoing product updates, privacy architecture, and tester feedback improvements implemented for Level 5.

| Post | Focus | Published Permalink |
| :--- | :--- | :--- |
| **Update 1** | Building in public: Preprod prototype & sealed ballot | [x.com/SuffraPrivVote/status/2100603070711480483](https://x.com/SuffraPrivVote/status/2100603070711480483) |
| **Update 2** | Privacy update: Off-chain voter secret & ledger commitments | [x.com/SuffraPrivVote/status/2100603201187917889](https://x.com/SuffraPrivVote/status/2100603201187917889) |
| **Update 3** | Level 5 update: Tester feedback & UX/clarity improvements | [x.com/SuffraPrivVote/status/2100603341441241301](https://x.com/SuffraPrivVote/status/2100603341441241301) |

### Update 1 — Building in public

**Published permalink:** [https://x.com/SuffraPrivVote/status/2100603070711480483](https://x.com/SuffraPrivVote/status/2100603070711480483)

> Building in public: Suffra is a private-voting prototype on Midnight Preprod. A registered local secret can cast one sealed ballot while the choice stays private.
>
> Try the fictional demo: suffra-pica.vercel.app
>
> Prototype only—not an official election.

### Update 2 — Privacy update

**Published permalink:** [https://x.com/SuffraPrivVote/status/2100603201187917889](https://x.com/SuffraPrivVote/status/2100603201187917889)

> Privacy update: Suffra keeps the voter secret, candidate selection, and ballot salt private.
>
> The public ledger receives commitments, nullifiers, and counts—not raw choices.
>
> See the fictional Preprod demo: suffra-pica.vercel.app

### Update 3 — Level 5 update

**Published permalink:** [https://x.com/SuffraPrivVote/status/2100603341441241301](https://x.com/SuffraPrivVote/status/2100603341441241301)

> Level 5 update: tester feedback made Suffra clearer—stronger fictional-demo labels, proof-server guidance, numbered register → vote steps, and a public-vs-private comparison.
>
> Explore the Midnight Preprod prototype: suffra-pica.vercel.app

---

## Level 4 MVP Launch Posts (August 2026)

These three posts formed the initial MVP launch series for the fictional SK election demo on Midnight Preprod.

### Post 1 — Product announcement

> Suffra is live on Midnight Preprod.
>
> A private candidate-ballot MVP for a fictional Sangguniang Kabataan election: four fictional candidates, private selection, one ballot per registered secret, and public commitments instead of raw choices.
>
> Try it: https://suffra-pica.vercel.app
>
> Prototype only—not an official election.

### Post 2 — Privacy model

**Published permalink:** [https://x.com/SuffraPrivVote/status/2090433131593732271](https://x.com/SuffraPrivVote/status/2090433131593732271)

> Suffra's privacy model:
>
> Private: voter secret, candidate ID, ballot salt.
> Public: commitments, nullifiers, and counts.
> Proved: registration, valid candidate ID, and one ballot per secret.
>
> The ledger can verify the process without receiving the raw selection.

### Post 3 — Call to try the demo

**Published permalink:** [https://x.com/SuffraPrivVote/status/2090433243397165287](https://x.com/SuffraPrivVote/status/2090433243397165287)

> Try the fictional SK election demo on Midnight Preprod.
>
> Select one of four fictional candidates, generate the proof locally with Lace, and submit a sealed candidate ballot.
>
> https://suffra-pica.vercel.app
>
> Eligibility and final tally are future work.

### Visual handoff

Use the generated Suffra avatar, header, and launch graphic with Post 1. Keep the visual label “Fictional SK demo” visible and do not show a public candidate tally. The public demo uses the open Candidate-ballot V2 instance documented in `README.md`.
