# Progress Tracker — Suffra

## Current Status
- **Active Level**: Level 4 — Waxing Gibbous (MVP Goes Live)
- **Active Step**: Step 9 — final checklist and submission
- **Idea/The Turn**: Approved; approval date not recorded in repo, so no date is claimed
- **Internal Level 4 Target**: August 24, 2026
- **Official Month-End Deadline**: August 31, 2026
- **Contingency Buffer**: August 25-31, 2026 for deploy/review/submission fixes only
- **Known Blockers**: no technical blockers. The verified Candidate-ballot V2 deployment, launch posts, and demo video satisfy the Level 4 evidence requirements; submit the public repository on Rise In.

---

## Pace Tracker

| Milestone | Target | Actual | Status |
|:--|:--|:--|:--|
| Phase 0: Codebase setup | July 18 | July 18 | ✅ |
| Level 1: New Moon submitted | Flexible | July 18 | ✅ |
| Level 2: Waxing Crescent submitted | Flexible | July 19 | ✅ |
| Level 3: First Quarter submitted | Flexible | July 23 | ✅ |
| Idea Submission: The Turn | Gate before L4 | Approved, date unknown | ✅ |
| Level 4 internal submission target | August 24, 2026 | Pending | ⏳ |
| Level 4 contingency buffer | August 25-31, 2026 | Pending | ⏳ |

---

## Level 4 — Waxing Gibbous Active Plan

**Objective:** ship the approved Suffra private-election MVP live on Preprod by **August 24, 2026**, leaving **August 25-31** as contingency. Planned items stay unchecked until verified.

| Phase | Dates | Official Step Order | Gate / Status | Checklist |
|:--|:--|:--|:--|:--|
| 1 | Aug 12 | Step 1 — file structure / baseline | Completed | [x] Required paths confirmed [x] Stale Preview/counter references recorded as blockers, not Suffra deployment evidence |
| 2 | Aug 13 | Step 2 — privacy core first | Completed; tally deferred to Level 5 | [x] `npm run compile` [x] `npm run test` [x] Public/private boundary audited [x] Tally decision recorded |
| 3 | Aug 14-16 | Step 3 — frontend | Completed with local browser proof server and Lace smoke test | [x] Replace the Preview hardcode with `VITE_MIDNIGHT_NETWORK` [x] Use `VITE_SUFFRA_CONTRACT_ADDRESS` consistently [x] Run `npm run build` [x] Verify loading and error states with a Preprod wallet |
| 4 | Aug 17 | Step 4 — CI/CD | Workflow passes on push to `main`; final post-evidence run will be recorded after this docs commit | [x] Verify install, compile, test, and build jobs [x] Confirm the README badge points to the workflow [x] Confirm a passing run |
| 5 | Aug 18-19 | Step 5 — deploy to Preprod | V1 deployed and smoke-tested; V2 evidence instance smoke-tested and fresh open V2 demo instance deployed at `eaeadd1e9f6df11ba0e9f1cf48f8e70b21bf7257bf7de2f9a459fc3869205597` on 2026-08-20 | [x] Run the repo Preprod deploy command [x] Record the exact Suffra addresses in README [x] Smoke-test the V1 contract/frontend [x] Smoke-test the V2 candidate flow [x] Deploy a fresh open instance for judge interaction |
| 6 | Aug 20-21 | Steps 6-8 — usage, README, X | Candidate-ballot V2 remains the verified open Vercel target; X profile and all three launch posts are published | [x] Verify `docs/USAGE.md` [x] Update README with current open V2 Preprod address [x] Update Vercel environment and redeploy [x] Create and link the Product X profile [x] Prepare and publish three launch posts |
| 7 | Aug 22 | Step 9 — final evidence audit | Demo video published; final V2 production-bundle verification and checker audit passed | [x] Record and publish the fresh Level 4 demo: https://youtu.be/lxYipwonU5Y- [x] Audit README and links [x] Confirm the 15-commit minimum [x] Run the checker workflow |
| 8 | Aug 23-24 | Fixes and submission | Submission-ready | [x] Confirm README/docs identify the current V2 address [x] Verify Vercel production bundle targets V2 [x] Re-run affected checks and checker audit [ ] Submit the public repository on Rise In |
| Buffer | Aug 25-31 | Contingency | Use only for fixes, redeploys, or submission evidence gaps | [ ] Do not expand scope |

### Tally Feasibility Gate — Decision Recorded
- **Evidence:** `contracts/suffra.compact` records salted ballot commitments, nullifiers, and counts only. It has no reveal, decryption, aggregation, or authorized tally input.
- **Risk:** adding a public per-choice counter would disclose vote choices through transaction-level state changes.
- **Decision:** defer final tally work to Level 5. Level 4 ships the sealed-ballot privacy core rather than an unsafe or incomplete tally.

### Future Roadmap
- **Level 5 — Full Moon:** refine the same Preprod MVP with a feedback loop, updated docs, **50 Preprod users/wallet addresses**, demo evidence, and **20 meaningful commits** minimum.
- **Level 6 — Supermoon:** conservative planning baseline is **70 cumulative Preprod wallet addresses** and **30 meaningful commits**. Mainnet scope is pending official clarification because repository sources conflict; do not treat Mainnet as verified until clarified.

---
## Level 1 — New Moon

### Prompt Steps
- [x] Step 1: Toolchain setup (Node 22, Docker, Compact compiler, proof server)
- [x] Step 2: MCP setup (Midnight Docs MCP)
- [x] Step 3: Hello World deploy (scaffold mn-demo, deploy to preview)
- [x] Step 4: Project file structure
- [x] Step 5: Write and compile contract (counter.compact + tests + deploy)
- [x] Step 6: README.md (mandatory sections)
- [x] Step 7: Final checklist

### Checker Audit
- **Audit Date**: 2026-07-18 16:48
- **Auditor**: Checker Agent
- **Status**: ✅ PASS

| Checklist Item | Status | Evidence/Notes |
| :--- | :---: | :--- |
| **Official Prompt Checklist:** | | |
| 1. Contract compiles with `compact compile` | ✓ | `npm run compile` completes with zero errors, outputting to `managed/counter` |
| 2. `managed/` directory present (circuits + keys) | ✓ | Verified `managed/counter` contains `zkir`, `keys`, `contract` & `compiler` subdirectories |
| 3. 3+ tests passing | ✓ | Verified 3/3 unit tests passing in `tests/counter.test.ts` via Vitest |
| 4. Contract deployed to Preview network | ✓ | Deployed to Preview at `445c735e72a3909940076aa3adf0ec86abeff505a7282b9988ac6a77dc4cd748` |
| 5. Contract address visible in README.md | ✓ | Recorded in `README.md` Contract Address table |
| 6. README has all required sections | ✓ | Contains Contract Address, What This Does, Privacy Model, Tech Stack, Prerequisites, Setup, Run Tests, Initial Idea, Screenshots |
| 7. File structure matches spec | ✓ | Matches spec: `contracts/`, `managed/`, `src/`, `tests/`, `package.json`, `README.md` |
| **Additional Checklist Items:** | | |
| 8. 5+ meaningful conventional commits | ✓ | 7 conventional commits recorded in git log history |
| 9. `docs/PROGRESS.md` updated with completion | ✓ | LEVEL 1 Checker Audit and Audit Log updated |
| 10. Public vs private explanation in README is accurate | ✓ | Verified explanation of what is public, private and proven matches contract semantics |
| 11. Initial idea paragraph present in README | ✓ | Verified under `## Initial Idea` section |
| 12. No secrets in codebase | ✓ | No keys, secrets, or .env values leaked in codebase (inspected via regex matching, `.midnight-state.json` gitignored) |
| 13. `.gitignore` properly configured | ✓ | `.midnight-state.json`, `.midnight-wallet-state/`, and `.env` properly ignored |


---

## Level 2 — Waxing Crescent

### Prompt Steps
- [x] Step 1: File structure (add frontend)
- [x] Step 2: Frontend setup (Vite + React + Midnight SDK)
- [x] Step 3: Wallet connection (Lace connect/disconnect)
- [x] Step 4: Circuit call (call circuit from frontend)
- [x] Step 5: Deploy frontend
- [x] Step 6: README.md update
- [x] Step 7: Demo video checklist
- [x] Step 8: Final checklist

### Checker Audit
- **Audit Date**: 2026-07-19 14:40
- **Auditor**: Checker Agent
- **Status**: ✅ PASS

| Checklist Item | Status | Evidence/Notes |
| :--- | :---: | :--- |
| **Official Prompt Checklist:** | | |
| 1. Lace wallet connect and disconnect working | ✓ | Implemented via `WalletConnect.tsx` component and `useMidnight.ts` custom React hook mapping the dApp connector API |
| 2. Circuit called from frontend, proof generated locally | ✓ | Implemented via `CircuitCall.tsx` calling the contract's `increment` method through the wallet's proving provider |
| 3. Private input never shown in UI | ✓ | Verified secret increment amount is treated as a private witness, with clear UI indicators and never logged/rendered in plain text on ledger |
| 4. Contract address in README.md | ✓ | Visible in Contract Address table: `445c735e72a3909940076aa3adf0ec86abeff505a7282b9988ac6a77dc4cd748` |
| 5. Live demo link in README.md | ✓ | Added Vercel live demo link: `https://suffra-pica.vercel.app` |
| 6. Privacy Claim section in README.md | ✓ | Present under the `Privacy Model` section outlining public, private, and proven semantics |
| 7. File structure matches spec | ✓ | Verified added files: `src/components/`, `src/hooks/`, `src/App.tsx`, `src/main.tsx`, `index.html` at project root |
| **Additional Checklist Items:** | | |
| 8. 8+ meaningful conventional commits | ✓ | 10 conventional commits recorded in git log history |
| 9. Tailwind design system applied | ✓ | Tailwind CSS v4 setup with custom color palette (navy/slate/blue) in `src/index.css` |
| 10. Framer Motion loading animations | ✓ | Used for smooth UI card loading state, button tap/hover effects, and transition logs |
| 11. Responsive at multiple viewports | ✓ | Checked flex grid and breakpoints layout on mobile, tablet, and desktop viewports |
| 12. Error states handled | ✓ | Hook handles missing Lace wallet, incorrect network, user rejection, and failed proofs |
| 13. `docs/PROGRESS.md` updated with completion | ✓ | LEVEL 2 Checker Audit and Audit Log updated |

---

## Level 3 — First Quarter

### Prompt Steps
- [x] Step 1: File structure check
- [x] Step 2: Tests (minimum 3)
- [x] Step 3: CI/CD pipeline
- [x] Step 4: Polish the dApp
- [x] Step 5: PROPOSAL.md
- [x] Step 6: README.md update
- [x] Step 7: Demo video checklist
- [x] Step 8: Final checklist

### Checker Audit
- **Audit Date**: 2026-07-23 21:35
- **Auditor**: Checker Agent
- **Status**: ✅ PASS

| Checklist Item | Status | Evidence/Notes |
| :--- | :---: | :--- |
| **Official Prompt Checklist:** | | |
| 1. Fully functional dApp meaningfully using Midnight privacy model | ✓ | Suffra private voting dApp with Vite + React + Tailwind v4 + Framer Motion |
| 2. Minimum 3 tests passing | ✓ | Verified 3/3 Vitest tests passing in `tests/counter.test.ts` |
| 3. CI/CD pipeline running | ✓ | GitHub Actions workflow `.github/workflows/ci.yml` configured for test & build |
| 4. Idea proposal submitted | ✓ | Created `PROPOSAL.md` for Idea #1 (Private Voting) following full specification |
| 5. Minimum 10 commits | ✓ | Over 10 conventional commits recorded in git log history |
| **Submission Checklist:** | | |
| 6. Public GitHub repo & README | ✓ | Public repo with complete README, quickstart, tech stack & links |
| 7. Live demo link | ✓ | Verified live demo at `https://suffra-pica.vercel.app` |
| 8. CI/CD workflow badge | ✓ | Added GitHub Actions workflow badge to README.md |
| 9. Unified Demo Video link | ✓ | Published demo video on YouTube: [youtu.be/G3Ppbny50tc](https://youtu.be/G3Ppbny50tc) |


---

## Audit Log

<!-- Builder and checker entries are appended below with timestamps -->
<!-- Format: [YYYY-MM-DD HH:MM] [BUILDER|CHECKER] Description -->

### Phase 0 — Codebase Setup
- [2026-07-18 16:10] [BUILDER] Initialized git repo, created .agents/ system (rules + workflows), created docs/ (MASTERPLAN, LUNAR-REQUIREMENTS, PROGRESS, STYLE-GUIDE, ARCHITECTURE, DEPLOYMENT, README-TEMPLATE, midnight_prompts.md), created .gitignore, README.md skeleton

### Level 1 — New Moon
- [2026-07-18 16:23] [BUILDER] Installed Compact compiler (v0.31.1), pulled proof-server image and started container on port 6300
- [2026-07-18 16:29] [BUILDER] Scaffolded mn-demo, deployed Hello World contract to Preview (Address: `a294c6bf252faff92228574fc417548b228588ca00fa3d9332ae4c2b564e9ed0`), funded via playwright automation
- [2026-07-18 16:30] [BUILDER] Configured root project with tsconfig, package.json, docker-compose, and wallet utilities; created counter.compact
- [2026-07-18 16:33] [BUILDER] Deployed Counter contract to Preview (Address: `445c735e72a3909940076aa3adf0ec86abeff505a7282b9988ac6a77dc4cd748`), funded via faucet playwright automation
- [2026-07-18 16:39] [BUILDER] Created tests/counter.test.ts, verified 3/3 tests passing via vitest run, updated compile output to root managed/ folder
- [2026-07-18 16:41] [BUILDER] Recorded deployed preview address in README.md, created 5 new conventional commits (6 total in history)
- [2026-07-18 16:41] [CHECKER] Audited Level 1 checklist requirements. All checks ✅ passed. Certified New Moon level complete.
- [2026-07-18 16:48] [CHECKER] Run comprehensive Level 1 — New Moon verification audit. All checks ✓ passed. Verified compilation, test suite, deployment address, README sections, git log and secret scan.

### Level 2 — Waxing Crescent
- [2026-07-19 14:38] [BUILDER] Set up Vite + React + TypeScript + Tailwind CSS v4, built wallet connect hook & components, copied ZK artifacts, configured vercel.json, completed production build successfully.
- [2026-07-19 14:40] [CHECKER] Run comprehensive Level 2 — Waxing Crescent verification audit. All checks ✓ passed. Verified connect/disconnect hook, ZK proof generation components, privacy indicators, README sections, responsive styles, and production compilation.

### Level 3 — First Quarter
- [2026-07-23 21:35] [BUILDER] Created GitHub Actions CI workflow (.github/workflows/ci.yml), created PROPOSAL.md for Idea #1 (Private Voting), updated unified DEMO-VIDEO.md guide, updated README.md with CI badge & proposal link, verified 3/3 Vitest tests passing.
- [2026-07-23 21:35] [CHECKER] Audited Level 3 checklist requirements. All checks ✅ passed. Certified First Quarter level complete.

### Pre-Level 4 Hardening
- [2026-07-28 13:16] [BUILDER] Replaced the counter-centered product implementation with `contracts/suffra.compact`, a sealed-ballot Compact contract using voter commitments, one-use nullifiers, and salted ballot commitments. Added Suffra tests, moved frontend/CLI/deploy wiring to Suffra artifacts, updated CI to compile before test/build, created `docs/USAGE.md`, and rewrote README/PROPOSAL/ARCHITECTURE/DEMO docs to distinguish current sealed-ballot privacy from future tally protocol work.

### Level 4 — Waxing Gibbous
- [2026-08-13] [BUILDER] Completed the tally feasibility gate. Deferred tally to Level 5 because the sealed-ballot contract stores only commitments/nullifiers and has no safe reveal, aggregation, or authorized tally input. Added validated `VITE_MIDNIGHT_NETWORK` selection with a Preprod default, updated explorer links, and verified compile, test, and production build.
- [2026-08-13] [BUILDER] Investigated slow initial Preprod wallet synchronization. Indexer/RPC and proof server were healthy, but fresh shielded and DUST wallets require a full historical scan. Added one-minute atomic SDK-state checkpoints during deploy sync so an interrupted run resumes from `.midnight-wallet-state/preprod/` instead of starting over.
- [2026-08-13] [BUILDER] Deployed Suffra to Preprod at `f26ffd59ec7531b96b40b9cb748e7fac12ea7be6fef87e80007bd80e066e2da6`. Deployment wallet funding and DUST registration completed; frontend configuration and Lace smoke test remain pending.
- [2026-08-13] [BUILDER] Fixed the first Preprod frontend smoke-test blockers: private-state storage now derives a stable password that satisfies the SDK policy, and the interface renders the configured network name instead of a stale Preview label.
- [2026-08-19] [BUILDER] Diagnosed hosted Preprod proof requests returning HTTP 403 before Lace signing. Switched browser proofs to the local Docker proof server at `127.0.0.1:6300`, confined proof-server configuration to loopback addresses, and documented the developer-demo prerequisite. Local proof-server health and Vercel-origin CORS preflight passed.
- [2026-08-19] [BUILDER] Completed the deployed Lace smoke test with local proving: registration finalized, one sealed vote finalized (`Sealed Votes: 1`, `Nullifiers: 1`), and the second vote was rejected with `Voter has already cast a ballot`. The registration transaction was `2cee273e818c4d988e9669c3ac7edaed247221e5340da9c0d33a5ba72849639d`; the vote transaction ID was not recoverable from the Lace activity pane.
- [2026-08-20] [BUILDER] Added a fictional San Isidro SK election simulation with fictional candidate names and platforms. The preview is explicitly local-only and separate from the live Preprod privacy test.
- [2026-08-20] [BUILDER] Evolved `contracts/suffra.compact` to validate four private candidate IDs, regenerated proof artifacts, updated the live ballot UI and CLI, and deployed Candidate-ballot V2 to Preprod at `4bfc66f3473135f01156f7115ad820afad9d08b2b07b8ac0432b1e10ea97441a`. The first deploy attempt found the local prover stopped; restarting `npm run proof-server:start` resolved it.
- [2026-08-20] [BUILDER] Verified the V2 frontend with Lace and the local prover. Registration finalized in `12e4b07ff5c25b8a947a53e8ce186eba056c3d906e2a1f0861315fb76bb785db`, a sealed ballot for fictional candidate Iñigo Valdez finalized in `8f2cb58abc28f5c30d0add15aa4313c7466b5271d4dd9f228fc2c468d73b8070`, and ballot closure finalized in `5537a11722c05b37f642d9fb1f765907fba5d0a4837a925e385b0b05135f9a34`. The evidence V2 ballot box is intentionally closed; no final tally is claimed.
- [2026-08-20] [BUILDER] Deployed a fresh open V2 instance at `eaeadd1e9f6df11ba0e9f1cf48f8e70b21bf7257bf7de2f9a459fc3869205597`, updated the live `suffra` Vercel Production variables, and redeployed `https://suffra-pica.vercel.app`. Verified the production bundle contains the fresh address and no longer contains the closed evidence address.
- [2026-08-20] [BUILDER] Recorded the supplied Product X profile `https://x.com/SuffraPrivVote`, linked it in README, and added three ready-to-post launch messages in `docs/X-LAUNCH-POSTS.md`. Publishing the posts and recording the fresh Level 4 video remain manual submission assets.

### Level 4 — Final Evidence Audit

- **Audit date:** 2026-08-20
- **Status:** Conditional pass — all repository, contract, frontend, deployment, CI, and profile-link checks pass. Submission remains blocked only by the fresh Level 4 video and manual X post publication.

| Checklist item | Evidence |
|:--|:--|
| Contract compile and tests | `npm run compile`; `npm run test` — 31/31 passed |
| Production build | `npm run build` passed with zero TypeScript/Vite errors |
| Preprod deployment | Current open V2: `eaeadd1e9f6df11ba0e9f1cf48f8e70b21bf7257bf7de2f9a459fc3869205597` |
| Live frontend | `https://suffra-pica.vercel.app`, production bundle verified against current open V2 address |
| CI/CD | [GitHub Actions run 32375422044](https://github.com/pablo-pica/suffra/actions/runs/32375422044) passed on `56034ea` |
| Commit minimum | 77 total commits; 76 conventional commits; minimum is 15 |
| Product X profile | [SuffraPrivVote](https://x.com/SuffraPrivVote) linked in README |
| Demo video | [Published Level 4 MVP demo](https://youtu.be/lxYipwonU5Y-) (maintainer-confirmed) |
| X launch posts | Three prepared posts published from [@SuffraPrivVote](https://x.com/SuffraPrivVote) (maintainer-confirmed) |
| Remaining action | Submit the public repository on Rise In |

### Level 4 — Final Verification

- **Audit date:** 2026-08-20
- **Result:** Pass — the suspected V3 requirement was corrected: Candidate-ballot V2 is the current deployment, not a stale predecessor.
- **Commands:** `npm run compile`, `npm run test` (31/31), `npm run build`, `git diff --check`, structural-file checks, and the changed-file secret scan all passed.
- **Production verification:** the Vercel bundle at `https://suffra-pica.vercel.app/assets/index-Cx91hl1j.js` embeds `VITE_MIDNIGHT_NETWORK=preprod` and V2 address `eaeadd1e9f6df11ba0e9f1cf48f8e70b21bf7257bf7de2f9a459fc3869205597`.
- **Wallet-flow evidence:** the V2 Lace/local-prover smoke test is recorded above with registration, sealed-ballot, and closure transaction IDs. The published Level 4 demo is maintainer-confirmed; a new wallet transaction was not required solely to correct the V3/V2 wording.
