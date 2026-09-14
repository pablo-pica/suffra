# User Feedback — Suffra

## Collection Method

Feedback is collected through a minimal, privacy-preserving Google Form:
`https://forms.gle/QSgaRPbEE1W6UJST9`

The form contains only:
- Self-chosen alias (never real names or identifying handles)
- Public Midnight Preprod wallet address (required)
- Explicit consent question (required): *"I consent to publishing this alias and public wallet address in Suffra's public GitHub project evidence. I also consent to anonymous summaries of my feedback. I will not submit private voting information."* (Only "Yes" responses qualify for public evidence)
- 1–5 clarity rating (*"Suffra clearly explained what it does."*)
- 1–5 ease rating (*"Suffra was easy to understand and try."*)
- 1–5 privacy rating (*"I feel confident my ballot choice stays private."*)
- Open response (*"What was confusing, broken, or most worth improving?"*)

The form does **not** collect email addresses, voter secrets, candidate selections, ballot salts, transaction IDs, real names, contact details, or screenshots. Google sign-in is disabled, and the underlying response sheet remains private to the maintainer. Only consented responses are summarized and published to this repository.

> [!IMPORTANT]
> **Maintainer Note on Level 6 Form Reuse:**
> The same Google Form is reused for Level 6. Before starting Level 6 collection, the maintainer must record the Level 5 collection cutoff date below. All responses submitted after this cutoff will belong to Level 6. Do not add a feedback-cycle or tester-tier field to the Google Form.
>
> - **Level 5 Cutoff Date:** `2026-09-13`

## Aggregate Ratings Summary

- **Total Consented Submissions:** 51
- **Collection Window:** 2026-09-03 through 2026-09-13
- **Clarity Mean Rating (1–5):** 3.88
- **Ease of Use Mean Rating (1–5):** 3.53
- **Privacy Confidence Mean Rating (1–5):** 3.94

## Raw Feedback Log

Collection status: **Concluded on 2026-09-13 with 51 consented submissions.**

| Alias | Clarity (1–5) | Ease (1–5) | Privacy (1–5) | Feedback Summary | Date |
| :--- | :---: | :---: | :---: | :--- | :--- |
| sha | 5 | 5 | 5 | rename register vs vote buttons | 2026-09-03 |
| user22 | 4 | 5 | 2 | show a Preprod network badge | 2026-09-03 |
| michelle | 4 | 5 | 4 | add a proof progress indicator | 2026-09-03 |
| kevo | 4 | 4 | 4 | As an SK volunteer i'd use this later, but for now label it DEMO clearly | 2026-09-03 |
| imbored | 4 | 3 | 4 | Wasn't sure if my vote counted for anything real, so put DEMO in the page title area. | 2026-09-03 |
| padila | 3 | 2 | 5 | Privacy copy is good, but I still don't know what's on-chain vs private, so a tiny table would help. | 2026-09-04 |
| travelr | 4 | 4 | 4 | clear enough but make the FAQ link more obvious on mobile | 2026-09-04 |
| ate_ann | 4 | 5 | 2 | privacy messaging is almost there, but a tiny public vs private comparison near the cast button would boost confidence | 2026-09-04 |
| swaggy | 4 | 3 | 4 | n/a | 2026-09-04 |
| clicker | 4 | 4 | 2 | still unsure whether others can see my pick so a simple diagram would help | 2026-09-04 |
| wande | 4 | 3 | 4 | proof step was slow on my laptop, so a "generating proof…" spinner would help. | 2026-09-05 |
| Pai | 2 | 3 | 3 | connect Lace was fine but it would help to remember the last connection state on reload | 2026-09-05 |
| cath | 3 | 3 | 5 | The demo election felt too real, so add "fictional candidates" under the title | 2026-09-05 |
| jer | 3 | 4 | 4 | nice site | 2026-09-05 |
| nightowllll | 4 | 4 | 5 | Wallet chip disappeared on mobile landscape, so keep it visible | 2026-09-05 |
| arjun_r | 4 | 3 | 2 | SK use case is cool but not obvious, so one sentence on why SK elections fit would help | 2026-09-06 |
| tin | 4 | 4 | 4 | Nothing so far | 2026-09-06 |
| viv | 3 | 4 | 4 | useful for local community demos but please shorten the prerequisite instructions | 2026-09-06 |
| nikhilk | 4 | 5 | 2 | none | 2026-09-06 |
| kev_r | 5 | 2 | 5 | landing page is pretty, but put a Try the demo CTA above the fold, | 2026-09-06 |
| jmari | 4 | 3 | 5 | docs assume too much Midnight knowledge, so a 3-bullet glossary would help first-timers | 2026-09-07 |
| dreamz | 4 | 5 | 5 | Lace network is not obvious | 2026-09-07 |
| anand | 4 | 3 | 3 | nothing much | 2026-09-07 |
| jhay | 3 | 3 | 4 | overall fine but the Connect Lace button is easy to miss after scrolling so consider a sticky header | 2026-09-07 |
| lala | 4 | 3 | 3 | overall clear but not knowing i needed a local proof server first was confusing so add a 3-step checklist | 2026-09-07 |
| bea | 3 | 3 | 5 | when the proof server is offline the error should specifically say its not running on port 6300 | 2026-09-08 |
| dee | 4 | 3 | 4 | error message is too generic so be more specific | 2026-09-08 |
| chats | 3 | 3 | 5 | N/A | 2026-09-08 |
| riodv | 4 | 4 | 2 | really liked it, just make the demo badge louder. | 2026-09-08 |
| lovely | 3 | 3 | 5 | the local proof server step is confusing, so add a note to start it before connecting Lace | 2026-09-08 |
| raj | 3 | 3 | 4 | the proof wait is long so add loading text | 2026-09-09 |
| tristan | 3 | 3 | 5 | Main friction is the proof server setup | 2026-09-09 |
| quiet | 5 | 3 | 4 | good prooject | 2026-09-09 |
| Dei | 5 | 5 | 4 | candidate list needs a fictional tag. | 2026-09-09 |
| ash | 4 | 3 | 5 | ballot steps feel too similar so differentiate them | 2026-09-09 |
| webz | 5 | 4 | 4 | After connecting, i didn't know whether to register or vote first, so number the steps. | 2026-09-10 |
| mich | 5 | 3 | 4 | i kept wondering if San Isidro Youth Council was real, so please label it as a fictional demo. | 2026-09-10 |
| chill | 5 | 4 | 5 | None. | 2026-09-10 |
| jomz | 3 | 5 | 4 | Animations are nice but distracting while waiting, so an optional reduce-motion setting would help | 2026-09-10 |
| poster1 | 4 | 3 | 5 | I wasn't sure if the San Isidro election was a demo or real, so add a Demo only badge near the candidates | 2026-09-10 |
| therj | 4 | 3 | 4 | on phone, the ballot box section jumps while loading so stabilize the layout | 2026-09-11 |
| stream | 4 | 3 | 4 | solid | 2026-09-11 |
| ron | 5 | 4 | 4 | add a short before you start blurb covering Lace, Preprod, and the proof server | 2026-09-11 |
| plain | 2 | 4 | 4 | the register and cast ballot labels are too similar, so make the vote button more distinct. | 2026-09-11 |
| priyas | 4 | 3 | 3 | solid demo, just needs small polish on the error messages. | 2026-09-11 |
| guest | 4 | 3 | 3 | nothing | 2026-09-12 |
| Raaa! | 3 | 3 | 5 | Please disable vote until registered, since i got briefly confused. | 2026-09-12 |
| pixe | 5 | 4 | 4 | Mark the demo election clearly. | 2026-09-12 |
| gamerz | 4 | 3 | 3 | add a common errors mini section under FAQ | 2026-09-12 |
| iamnisha | 4 | 3 | 4 | fine! | 2026-09-12 |
| 123 | 5 | 3 | 4 | smooth after setup but setup itself needs a checklist | 2026-09-13 |

## Themes

Feedback from the 51 Preprod testers clustered into four clear, recurring themes:

1. **Demo & Fictional Candidate Disclosures (Clarity & Decision Context):**
   Multiple testers asked whether the San Isidro Youth Council election was real, whether their vote carried real-world weight, or suggested adding prominent "DEMO" and "fictional candidates" badges near the decision points.
2. **First-Use Friction & Proof Server Guidance (Ease of Use):**
   Testers noted confusion regarding the local proof server prerequisite, recommended a concise preflight checklist covering Lace, Preprod, and the proof server, and requested specific error messages pointing to `127.0.0.1:6300` with the exact recovery command (`npm run proof-server:start`).
3. **Register-then-Vote Sequence Legibility (Workflow & Safety):**
   Testers found the initial button layout confusing or wondered whether to register or vote first. Several users requested numbering the steps and disabling or holding the vote action until local registration is confirmed.
4. **Privacy Comprehension (Confidence & Public vs. Private Transparency):**
   While privacy confidence was generally high (3.94 mean), testers expressed a desire for a compact comparison table right beside the ballot action showing exactly what is stored on the public ledger versus what stays private off-chain.

## Changes

| Change | Reason | Commit |
| :--- | :--- | :--- |
| **Prominent Preprod Prototype & Fictional Demo Disclosures** | Testers requested clear disclosures in the ballot area clarifying that this is a Preprod test with fictional candidates, not an official election. | Pending human commit |
| **First-Use Preflight Checklist & Proof Server Guidance** | Testers reported setup friction with the local proof server; added visible 3-point preflight and specific error diagnostics citing endpoint and recovery commands. | Pending human commit |
| **Step-by-Step Register & Vote Flow with Local Registration Gating** | Testers requested numbered steps and preventing vote attempts before registering local voter secret. | Pending human commit |
| **Compact Public vs. Private Ledger Comparison Card** | Testers requested an adjacent comparison of what is published on-chain vs kept private off-chain. | Pending human commit |
