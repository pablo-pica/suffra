# 🗳️ Suffra

[![Suffra CI](https://github.com/pablo-pica/suffra/actions/workflows/ci.yml/badge.svg)](https://github.com/pablo-pica/suffra/actions/workflows/ci.yml)

> Private elections on Midnight: each registered local secret can cast one sealed ballot while the choice stays off-chain.

## Current Status

- **Idea/The Turn:** approved; approval date is not recorded.
- **Active level:** Level 5 — Users & Feedback.
- **Verified Preprod deployments:** V1 was deployed and smoke-tested on 2026-08-13. Candidate-ballot V2 was deployed, configured, and smoke-tested with Lace on 2026-08-20. A fresh open V2 instance powers the public demo. The Product X profile and Level 4 demo video are live.

## 🌐 Live Demo

[suffra-pica.vercel.app](https://suffra-pica.vercel.app)

The public demo includes a fictional SK election preview and a live candidate-ballot flow. The live flow is configured for Candidate-ballot V2 on Preprod. The Level 4 demo records this deployed flow.

### 📌 Submission Resources & Links

| Resource | Value / Link |
| :--- | :--- |
| **Live Demo dApp** | [suffra-pica.vercel.app](https://suffra-pica.vercel.app) |
| **Demo Video** | [Level 4 MVP demo](https://youtu.be/lxYipwonU5Y-) · Earlier Level 2/3 video: [youtu.be/G3Ppbny50tc](https://youtu.be/G3Ppbny50tc) |
| **Google Feedback Form** | [forms.gle/QSgaRPbEE1W6UJST9](https://forms.gle/QSgaRPbEE1W6UJST9) |
| **Public Feedback Responses** | [Google Sheets Export](https://docs.google.com/spreadsheets/d/18JxtA0tSGjJ-atJAAvidaJwMlgxYji4VMvruaZOKclc/edit?usp=sharing) |
| **Onboarded Users & Hashes** | [USERS.md](USERS.md) (51 consented Preprod records) |
| **Feedback Log & Synthesis** | [docs/FEEDBACK.md](docs/FEEDBACK.md) |
| **Product Proposal** | [PROPOSAL.md](PROPOSAL.md) |
| **Usage Guide** | [docs/USAGE.md](docs/USAGE.md) |
| **CI/CD Workflow** | [.github/workflows/ci.yml](.github/workflows/ci.yml) |
| **Public Commit History** | [GitHub Commits](https://github.com/pablo-pica/suffra/commits) (96 commits) |
| **Product X Updates** | [@SuffraPrivVote](https://x.com/SuffraPrivVote) · [docs/X-LAUNCH-POSTS.md](docs/X-LAUNCH-POSTS.md) |

## 📊 Level 5 — Submission Evidence

This section summarizes the key evidence for Level 5 submission requirements, including onboarding 50+ Preprod users, gathering tester feedback, implementing feedback-driven product improvements, and publishing regular product updates.

### 🎯 Key Metrics & Verification Evidence

- **Preprod Users Onboarded:** **51 / 50** distinct consented users (target of 50+ achieved).
- **On-Chain Evidence:** 51 unique Midnight Preprod wallet addresses and 51 unique Preprod transaction hashes.
- **Feedback Collection Window:** 2026-09-03 through 2026-09-13 (51 submissions, concluded).
- **Public Feedback Artifacts:**
  - Form: [Google Feedback Form](https://forms.gle/QSgaRPbEE1W6UJST9)
  - Public Response Sheet: [Google Sheets Export](https://docs.google.com/spreadsheets/d/18JxtA0tSGjJ-atJAAvidaJwMlgxYji4VMvruaZOKclc/edit?usp=sharing)
  - Repository Evidence Log: [USERS.md](USERS.md)
  - Detailed Synthesis: [docs/FEEDBACK.md](docs/FEEDBACK.md)
- **Public Git History:** [github.com/pablo-pica/suffra/commits](https://github.com/pablo-pica/suffra/commits) (96 commits, well exceeding the 20+ requirement).

> [!NOTE]
> **Data Minimization & Evidence Authorization Note:**
> In strict accordance with user privacy and participant consent, no real names, email addresses, or private voting choices were requested or collected. Testers are identified exclusively by their self-chosen `Consented alias` alongside their Midnight Preprod wallet address and Preprod transaction hash. Submitted transaction hashes demonstrate active dApp execution on Midnight Preprod; they verify on-chain participation without exposing private voter secrets, candidate selections, or ballot salts.

### 📣 Published Product Updates (X / Twitter)

Suffra maintains 6 published posts on its official X profile ([@SuffraPrivVote](https://x.com/SuffraPrivVote)): three initial MVP launch posts from August 2026, and three fresh product updates published in September 2026 for Level 5 covering public prototype progress, privacy architecture, and tester feedback improvements:

| Update | Focus & Exact Post Summary | Published Post Permalink |
| :--- | :--- | :--- |
| **Update 1** | **Building in Public:** Suffra is a private-voting prototype on Midnight Preprod where a registered local secret casts one sealed ballot while the choice stays private. | [x.com/SuffraPrivVote/status/2100603070711480483](https://x.com/SuffraPrivVote/status/2100603070711480483) |
| **Update 2** | **Privacy Architecture:** Suffra keeps voter secret, candidate selection, and ballot salt private off-chain; public ledger receives only commitments, nullifiers, and counts. | [x.com/SuffraPrivVote/status/2100603201187917889](https://x.com/SuffraPrivVote/status/2100603201187917889) |
| **Update 3** | **Level 5 Feedback Improvements:** Tester feedback made Suffra clearer—stronger fictional-demo labels, proof-server guidance, numbered register → vote steps, and a public-vs-private comparison. | [x.com/SuffraPrivVote/status/2100603341441241301](https://x.com/SuffraPrivVote/status/2100603341441241301) |

*Full documentation of all 6 published posts (3 MVP launch posts + 3 Level 5 product updates) is available in [docs/X-LAUNCH-POSTS.md](docs/X-LAUNCH-POSTS.md).*

### 🛠️ Feedback Implementation Summary

Feedback from the 51 Preprod testers clustered into four primary themes. Four concrete product improvements were implemented, tested, and deployed to address them:

| Feedback Theme & Focus | Implemented Change & Rationale | Affected Consented Aliases | GitHub Commit Permalink |
| :--- | :--- | :--- | :--- |
| **Demo & Fictional Candidate Disclosures**<br>*(Clarity & Decision Context)* | Added prominent Preprod prototype badges and fictional candidate disclosures in the ballot interface and preview cards to clarify that the demo is a test environment rather than an official election. | `kevo`, `imbored`, `cath`, `arjun_r`, `viv`, `kev_r`, `riodv`, `Dei`, `mich`, `poster1`, `pixe` | [`a7d0079`](https://github.com/pablo-pica/suffra/commit/a7d00798e27cb5d441474a7a41820ad53a09af45) `feat: clarify Preprod demo disclosures` |
| **First-Use Preflight & Proof Server Guidance**<br>*(Ease of Use)* | Introduced a 3-step preflight checklist (Lace, Preprod, proof server) and specific error diagnostics referencing `127.0.0.1:6300` and recovery command `npm run proof-server:start` to eliminate local setup friction. | `michelle`, `wande`, `lala`, `bea`, `lovely`, `raj`, `tristan`, `ron`, `123` | [`96a811d`](https://github.com/pablo-pica/suffra/commit/96a811df2c6eafa28bf29d9389559c50154b737b) `feat: guide first-use proof setup` |
| **Step-by-Step Register & Vote Flow Gating**<br>*(Workflow & Safety)* | Numbered the registration and voting workflow steps, visually differentiated action buttons, and gated the cast ballot action until local registration is confirmed. | `sha`, `ash`, `webz`, `plain`, `Raaa!` | [`829d878`](https://github.com/pablo-pica/suffra/commit/829d878eaf265e9b876a6a4458613a1c568f566a) `feat: gate voting on local registration` |
| **Compact Public vs. Private Ledger Comparison**<br>*(Confidence & Transparency)* | Added an adjacent comparison table directly beside the ballot action detailing what data is published on-chain (commitments, nullifiers, counts) vs kept private off-chain (secret key, candidate choice, salt). | `padila`, `ate_ann`, `clicker` | [`b3b2b84`](https://github.com/pablo-pica/suffra/commit/b3b2b8488e6f4176e654ace5140b5a7d7913260b) `feat: explain public and private ballot data` |

### 👥 Users Onboarded (51 Consented Preprod Testers)

The table below lists all 51 consented Preprod testers, their public wallet addresses, and submitted feedback summaries. Complete transaction hashes verifying Preprod dApp execution are documented in [USERS.md](USERS.md) and the public [Google Sheets Export](https://docs.google.com/spreadsheets/d/18JxtA0tSGjJ-atJAAvidaJwMlgxYji4VMvruaZOKclc/edit?usp=sharing).

<details>
<summary><strong>View All 51 Consented Preprod Users (Click to expand)</strong></summary>

| # | Consented alias | Wallet address | Feedback summary |
| :-: | :--- | :--- | :--- |
| 1 | sha | `mn_addr_preprod1cy6rp24ch67njppwjesmnz7qczp9cwl0lq6um9agg304e0mdp0yq7hk28u` | rename register vs vote buttons |
| 2 | user22 | `mn_addr_preprod1dwtyyz5y34xjkndzt57a2h4v33hzn7sxg33dju9kqwgn4lknhasqklwsrl` | show a Preprod network badge |
| 3 | michelle | `mn_addr_preprod154dj6zfyrsz2qzuhv6dezwjrh5r3clc8a2pegspu5wqzajmr7pfs0kuwvh` | add a proof progress indicator |
| 4 | kevo | `mn_addr_preprod15yr7rus66tc3q0jcvq5dwx507s96jdv9lyr50c8xmknw3wnxyrrsvz873n` | As an SK volunteer i'd use this later, but for now label it DEMO clearly |
| 5 | imbored | `mn_addr_preprod1tm9sphn24mpprg90wl06zj8z0w2t3rs0wy6gttm2mem9wy9l6amsqrd358` | Wasn't sure if my vote counted for anything real, so put DEMO in the page title area. |
| 6 | padila | `mn_addr_preprod1prgjc0andpgxwsapw62atrmnnxzlextsutqpwqlm7ff3dlc7akdqxt059n` | Privacy copy is good, but I still don't know what's on-chain vs private, so a tiny table would help. |
| 7 | travelr | `mn_addr_preprod18rq2xug6jz8m6f0p4nse7up3rlec34fdrp0u96tdhzdyv960rh2slrpu9q` | clear enough but make the FAQ link more obvious on mobile |
| 8 | ate_ann | `mn_addr_preprod1cqfp5nfty9e4njxlh4wcvxe6gfy9kdng30r42htqjarn8zxd8ctsq37skg` | privacy messaging is almost there, but a tiny public vs private comparison near the cast button would boost confidence |
| 9 | swaggy | `mn_addr_preprod1nspa4ru6wg406wsec4jezanaer0jxuva5fq7l5x8f0gwxd7h4xwq86ate7` | n/a |
| 10 | clicker | `mn_addr_preprod1qcecjal444cv793q0j6g2w2r2vvj9a3e4agt4d5ppl5xanfanf4quln42s` | still unsure whether others can see my pick so a simple diagram would help |
| 11 | wande | `mn_addr_preprod1hmens3rec0xee2vnw7v38p3h4kqras2matcmfscptg4acsjd4uassgc6xy` | proof step was slow on my laptop, so a "generating proof…" spinner would help. |
| 12 | Pai | `mn_addr_preprod15xq8cq2ka4tyywuq4qr03nvx846lfkx7gs87c0egewd54a8lh24s2hvmey` | connect Lace was fine but it would help to remember the last connection state on reload |
| 13 | cath | `mn_addr_preprod1nrrtzhuryssesw7jq5jwxx8s2nzt2day5jrmn2qmpz2m83aptr7qgv9d5n` | The demo election felt too real, so add "fictional candidates" under the title |
| 14 | jer | `mn_addr_preprod1h2g8jxu4ue55ff6z5lfj5p4hh5hd78tar8nn7q4j9mv326ddpgesa594vc` | nice site |
| 15 | nightowllll | `mn_addr_preprod1eh3zwudemjzyazxa57v5ulg0ceq3c9jxz4jwx0gxj2gffwrsajgs2frzr4` | Wallet chip disappeared on mobile landscape, so keep it visible |
| 16 | arjun_r | `mn_addr_preprod12q6asw8k7jw7q5k7dwmr7kd0jqn6mcrmrstlwct48mpg2drcajmsgsarzq` | SK use case is cool but not obvious, so one sentence on why SK elections fit would help |
| 17 | tin | `mn_addr_preprod12j9evttc07unemfm7upa766rtny75u932m9nawg0wdhygg3xgr9q3hkvhx` | Nothing so far |
| 18 | viv | `mn_addr_preprod1gpddzdn8varddux632h0rcc0qaw6jauxtl45p0me089fsjnqra9szqfcvk` | useful for local community demos but please shorten the prerequisite instructions |
| 19 | nikhilk | `mn_addr_preprod1kd8qx4mvcrku4xd3kxg0akzp0w2aluqgcy7d89arvvjtnreyghkszevak3` | none |
| 20 | kev_r | `mn_addr_preprod1ugh39rpf820fp3mzun3zgzw37qazu8qkesatlceeqqguh2ss0ccqgyf3j8` | landing page is pretty, but put a Try the demo CTA above the fold, |
| 21 | jmari | `mn_addr_preprod1sruhfk4jehcvux3gzscptn64ns0492unhr6pn8985vqaq865rzvqhyqa5m` | docs assume too much Midnight knowledge, so a 3-bullet glossary would help first-timers |
| 22 | dreamz | `mn_addr_preprod18slulcvjm3lykm0ncunhafmmym0ttztxwwxrcwfpxg6dn8wvalasscqkhl` | Lace network is not obvious |
| 23 | anand | `mn_addr_preprod12eueda4ekalzgntm4j5rq80f8830r2yy6hp2a4ru56z2agthpglsapqacm` | nothing much |
| 24 | jhay | `mn_addr_preprod1u9d5ydmv76lazqhkyf5nw0dx009rljx0w0alqc7c8faumrn0zays26pzqt` | overall fine but the Connect Lace button is easy to miss after scrolling so consider a sticky header |
| 25 | lala | `mn_addr_preprod16e466ef9fmqsz5cvtp3p5705ak6fp00djdc7uxw0080ey5f0qetqsuawd3` | overall clear but not knowing i needed a local proof server first was confusing so add a 3-step checklist |
| 26 | bea | `mn_addr_preprod14qd85sypp5z27fqwfuvlzxegh6wahg46fezd3829mhak4289zdqs5487my` | when the proof server is offline the error should specifically say its not running on port 6300 |
| 27 | dee | `mn_addr_preprod1camgd54m385jyxmqeh4pky6mkutxah4te87cs8dk9dyz6h6tqelscupnl4` | error message is too generic so be more specific |
| 28 | chats | `mn_addr_preprod1we7022skkddmeg2chezgtglj65e9580kwlhplwwkqmrq05zuvzps6w3j5m` | N/A |
| 29 | riodv | `mn_addr_preprod1lqjlsdc8h5wqewq5ups48q3xqcmf4yayuevs0p4zrmw5y3jjul2shz39gl` | really liked it, just make the demo badge louder. |
| 30 | lovely | `mn_addr_preprod183x72a2seuskpjkanxx557j6jvr23umnwjdg5l538chah8e7yqvq9ghezk` | the local proof server step is confusing, so add a note to start it before connecting Lace |
| 31 | raj | `mn_addr_preprod1zz2heqczyjmf0qsugkarzsj2psp0fuyexkdhr49rayk5068wlfhs3exwa2` | the proof wait is long so add loading text |
| 32 | tristan | `mn_addr_preprod174kd0w9405vmvdl3vn0evde6sxawcjr924k4ud2pcjrm95qt0scqx6a53j` | Main friction is the proof server setup |
| 33 | quiet | `mn_addr_preprod187upmer8mru3kmfrmfshj6r5n66jywcuqp494akw6ezprksp6e8qme9qaz` | good prooject |
| 34 | Dei | `mn_addr_preprod1x7skfhluxz7dllspzeylz9jqxxm2zdempn7nahj825h9r0vvq2tq3znl58` | candidate list needs a fictional tag. |
| 35 | ash | `mn_addr_preprod1ecdnf4uv4xhx9x54wehme0n59xj309ck6up68w8e8kpal6qnuhaqgjtasg` | ballot steps feel too similar so differentiate them |
| 36 | webz | `mn_addr_preprod1ksx6skuenqx2u2nefhxlks4pnh9q4dms5jukhev9jhupgz3falgqgy9a09` | After connecting, i didn't know whether to register or vote first, so number the steps. |
| 37 | mich | `mn_addr_preprod1lmckhswvwqravgxcwcs0hzkv6q0y6jqwp07cxjvryw6w8pcxqelsfpk0g6` | i kept wondering if San Isidro Youth Council was real, so please label it as a fictional demo. |
| 38 | chill | `mn_addr_preprod14m8yx5hvej0q79l09909pwlvk8jnk5gjl6pu7qe09aahwlcl0las3s33mu` | None. |
| 39 | jomz | `mn_addr_preprod1ndepm2he6a47t50lp0gc73wstfhu42efk9y2fcg7hgg96nyyq4ystkvcs0` | Animations are nice but distracting while waiting, so an optional reduce-motion setting would help |
| 40 | poster1 | `mn_addr_preprod1kg9nsjd6ecgt62zx9rakctkt20eejms8a6x2r782zprttjzqwggsdg8rkt` | I wasn't sure if the San Isidro election was a demo or real, so add a Demo only badge near the candidates |
| 41 | therj | `mn_addr_preprod1dxca4hudgkck9dfxh99tyrrjtf90kfq2nwylfeteaa7y8wtklj3s6nr33v` | on phone, the ballot box section jumps while loading so stabilize the layout |
| 42 | stream | `mn_addr_preprod18tyehxsv0t3q4p2takal0t4az0vj76cxdu7rw27jne92wnal4v8qyfa5qw` | solid |
| 43 | ron | `mn_addr_preprod18ahg74qdfenh2s6kmpgxwu8drnaafyw0kvawwrnuaq0gvgqavs7s3jal49` | add a short before you start blurb covering Lace, Preprod, and the proof server |
| 44 | plain | `mn_addr_preprod15fvq8cmd2z2ulr4mzk2gtylve2zr4hcvyt707g90s4fx460gczxs6wju3d` | the register and cast ballot labels are too similar, so make the vote button more distinct. |
| 45 | priyas | `mn_addr_preprod17g3k0nm7vyc2ra8zzllhpy9k3276r76e7prdnlscvewzde3kffzqg6rkqk` | solid demo, just needs small polish on the error messages. |
| 46 | guest | `mn_addr_preprod12flrypwlpq587xjgaaz99rphd59p92jfsk20lxqzmctya7t2whlsjknqx8` | nothing |
| 47 | Raaa! | `mn_addr_preprod15dfsw5rr395934zteum4gu7tjeapakdshtv3smcnqeghyh25tuzqlwnf45` | Please disable vote until registered, since i got briefly confused. |
| 48 | pixe | `mn_addr_preprod1xp59qgmw30nx35kt2e4cutkpah4sdp449r0g8ut5stcq3yp2f0ysxhlt2x` | Mark the demo election clearly. |
| 49 | gamerz | `mn_addr_preprod18vz26jt6hjznqc0jc99cxzzspckuczued4x8da3nlqm2257rqcgs73z09h` | add a common errors mini section under FAQ |
| 50 | iamnisha | `mn_addr_preprod192h0h29y0gcka76us84m3ksg7gh7r86cxj9wuwgn30j9wxvk7tuqu5krcp` | fine! |
| 51 | 123 | `mn_addr_preprod1r9wvkxsm70e82rm79cg8e9579qme0sn9lzfe80tdyq6a26rxr22s3nt7x0` | smooth after setup but setup itself needs a checklist |

</details>

## 📍 Contract Address

| Network | Contract | Address | Status |
| :--- | :--- | :--- | :--- |
| Preprod | Suffra candidate sealed ballot V2 — current open demo | `eaeadd1e9f6df11ba0e9f1cf48f8e70b21bf7257bf7de2f9a459fc3869205597` | Fresh open instance deployed 2026-08-20; public Vercel demo target |
| Preprod | Suffra candidate sealed ballot V2 — evidence instance | `4bfc66f3473135f01156f7115ad820afad9d08b2b07b8ac0432b1e10ea97441a` | Deployed and Lace smoke-tested 2026-08-20; now closed |
| Preprod | Suffra sealed ballot V1 | `f26ffd59ec7531b96b40b9cb748e7fac12ea7be6fef87e80007bd80e066e2da6` | Historical Level 4 evidence; Lace smoke test verified 2026-08-19 |
| Preview | Legacy counter demo | `445c735e72a3909940076aa3adf0ec86abeff505a7282b9988ac6a77dc4cd748` | Historical Level 1 evidence only; not a Suffra Preprod deployment |

### Verified Candidate-ballot V2 Smoke Test

The deployed V2 flow was exercised with Lace on Preprod using the fictional San Isidro Youth Council slate. The UI selected fictional candidate **Iñigo Valdez**; the public ledger stores only the salted candidate-ballot commitment, not the candidate ID.

| Action | Explorer transaction |
| :--- | :--- |
| Register local voter secret | [12e4b07ff5c25b8a947a53e8ce186eba056c3d906e2a1f0861315fb76bb785db](https://explorer.preprod.midnight.network/transactions/12e4b07ff5c25b8a947a53e8ce186eba056c3d906e2a1f0861315fb76bb785db) |
| Cast sealed candidate ballot | [8f2cb58abc28f5c30d0add15aa4313c7466b5271d4dd9f228fc2c468d73b8070](https://explorer.preprod.midnight.network/transactions/8f2cb58abc28f5c30d0add15aa4313c7466b5271d4dd9f228fc2c468d73b8070) |
| Close ballot box | [5537a11722c05b37f642d9fb1f765907fba5d0a4837a925e385b0b05135f9a34](https://explorer.preprod.midnight.network/transactions/5537a11722c05b37f642d9fb1f765907fba5d0a4837a925e385b0b05135f9a34) |

The evidence instance is now intentionally closed. The transactions demonstrate the complete register, sealed-candidate-ballot, and close lifecycle; no final tally is claimed. The public demo points to the fresh open V2 instance above so judges can run another ballot.

## ✨ What This Product Does

Suffra implements the approved Midnight challenge idea: **Private Voting**, initially focused on Sangguniang Kabataan elections. The product goal is to let an eligible voter cast exactly one ballot without exposing their choice on-chain. Broader governance uses such as DAOs, cooperatives, and community associations remain secondary applications of the same pattern.

Candidate-ballot V2 proves that a local voter secret was registered, the selected candidate ID is one of four valid options, and the voter has not voted before. It records voter commitments, one-use nullifiers, sealed candidate-ballot commitments, and public counts. It does not yet prove real-world eligibility or produce a final tally.

The landing page includes a fictional San Isidro SK election preview with fictional candidates and platforms. The preview is local-only, while the live ballot box below it uses the same four-candidate slate against the V2 Preprod contract.

## 🔒 Privacy Model

- **PUBLIC:** voting status, registered voter commitments, used nullifiers, sealed ballot commitments, registered count, and sealed ballot count.
- **PRIVATE:** voter secret, candidate selection, ballot salt, and the link between a real-world voter and their local voting secret.
- **PROVED without revealing:** the voter registered, the candidate ID is valid, the same voter secret has not voted before, and the ballot commitment came from the private selection plus salt.

## 🗺️ Current Level 5 Status & Next Steps

- **Level 5 Status (Completed):** Onboarded 51 distinct Preprod users with verifiable wallet addresses and transaction hashes (exceeding the 50-user target), collected and synthesized feedback, implemented four feedback-driven UX and clarity improvements with commit permalinks, published product updates on X, and verified public repository evidence across 96 commits.
- **Level 6 (Upcoming):** Expand Preprod testing to 70+ cumulative users, incorporate further community feedback, and prepare for subsequent testing phases as official guidance clarifies.

## 🛠️ Tech Stack

- Midnight Network and Compact smart contracts
- Midnight.js SDK and Lace wallet connector
- Vite, React, and TypeScript
- Tailwind CSS v4 and Framer Motion
- Vitest and GitHub Actions

## ✅ Prerequisites

- Node.js v22+
- Docker for the local proof server
- Lace Wallet, Midnight edition
- Local Midnight proof server reachable on `127.0.0.1:6300` for register/vote proof generation
- Compact compiler installed locally

## ⚡ Setup & Run Locally

```bash
npm ci
npm run compile
npm run proof-server:start
VITE_MIDNIGHT_NETWORK=preprod \
VITE_SUFFRA_CONTRACT_ADDRESS=<64-char-contract-address> \
npm run dev
```

The frontend validates `VITE_MIDNIGHT_NETWORK` and defaults to `preprod`. The current public demo uses `VITE_SUFFRA_CONTRACT_ADDRESS=eaeadd1e9f6df11ba0e9f1cf48f8e70b21bf7257bf7de2f9a459fc3869205597`. The deployed dApp uses a local proof server at `http://127.0.0.1:6300` by default, so start it with `npm run proof-server:start` before registering or voting. Lace is still responsible for transaction approval and Preprod submission. Every fresh instance starts with empty counts, so register the local voter secret before voting.

## 🧪 Run Tests

```bash
npm run test
```

## 🚦 CI/CD

GitHub Actions runs on `push` and `pull_request` through [.github/workflows/ci.yml](.github/workflows/ci.yml).

## 📖 Usage Guide

See [docs/USAGE.md](docs/USAGE.md).

## 💡 Product Proposal

See [PROPOSAL.md](PROPOSAL.md).

## 📣 Product X Profile

[@SuffraPrivVote](https://x.com/SuffraPrivVote)

The Suffra X profile contains 6 published posts: three initial MVP launch posts and three Level 5 product update posts published in the current submission month:

### Level 5 Product Updates (September 2026)
- [Update 1: Building in Public — Preprod Prototype & Sealed Ballot](https://x.com/SuffraPrivVote/status/2100603070711480483)
- [Update 2: Privacy Architecture — Off-Chain Secrets & Ledger Commitments](https://x.com/SuffraPrivVote/status/2100603201187917889)
- [Update 3: Level 5 Feedback Improvements — Preflight Guidance, Gated Flow & Comparison Card](https://x.com/SuffraPrivVote/status/2100603341441241301)

### Initial Launch Posts (August 2026)
- Three launch messages documented in [docs/X-LAUNCH-POSTS.md](docs/X-LAUNCH-POSTS.md).
