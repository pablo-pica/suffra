# Lunar Requirements — Suffra

> Requirements from the RiseIn dashboard and repository source prompts, structured as checker checkboxes. Historical L1-L3 requirements are retained. Source references: `docs/midnight_prompts.md` and `docs/lvl4-lvl6-details.txt`.

---

## 🌑 Level 1 — New Moon | Setup & First Contract

*No prize — entry level. Complete to unlock the prize track from Level 2 onward.*

### Requirements to Pass
- [ ] Toolchain installed and a contract that compiles via `compact compile`
- [ ] Passing test suite
- [ ] Generated `managed/` directory present (circuits + keys)
- [ ] Contract deployed to Preview or Preprod with a visible contract address
- [ ] An initial product idea drafted in the README
- [ ] Minimum 5 meaningful commits

### Submission Checklist
- [ ] Public GitHub repository with a README.md
- [ ] Setup instructions
- [ ] Screenshot: successful compile output
- [ ] Screenshot: contract deployed with address shown
- [ ] README section explaining public state vs private witness
- [ ] Initial product idea paragraph
- [ ] Minimum 5 meaningful commits

---

## 🌒 Level 2 — Waxing Crescent | Frontend Integration

*Prize: $10 per winner × 60 winners = $600 total*

### Requirements to Pass
- [ ] Lace wallet connect / disconnect implemented
- [ ] Circuit called successfully from the frontend
- [ ] Observable privacy behavior
- [ ] Contract deployed to Preprod with a verifiable address
- [ ] Minimum 8 meaningful commits

### Submission Checklist
- [ ] Public GitHub repository with README
- [ ] Live demo link
- [ ] Deployed Preprod contract address
- [ ] Demo video: wallet connect + successful circuit call
- [ ] README documenting the privacy claim
- [ ] Minimum 8 meaningful commits

---

## 🌓 Level 3 — First Quarter | Production-Grade dApp

*Prize: $30 per winner × 55 winners = $1,650 total*

### Requirements to Pass
- [ ] Fully functional dApp meaningfully using Midnight's privacy model
- [ ] Minimum 3 tests passing
- [ ] CI/CD pipeline running
- [ ] Approved idea submitted from the provided idea list
- [ ] Minimum 10 meaningful commits

### Submission Checklist
- [ ] Public GitHub repository with complete README
- [ ] Live demo link
- [ ] Screenshot: test output
- [ ] CI/CD badge or workflow file with passing runs
- [ ] Demo video showing full functionality
- [ ] README privacy model section
- [ ] Product proposal submitted for approval
- [ ] Minimum 10 meaningful commits

---

## 💭 Idea Submission — The Turn

*Gate to Level 4+. Status: approved; approval date not recorded.*

### Provided Idea List
1. **Private Voting** — anonymous ballots with publicly verifiable tallies ← approved program idea; Suffra's current tally is not implemented
2. Age / Eligibility Gate
3. Private Allowlist Access
4. Confidential Credentials
5. Sealed-Bid Auction
6. Private Payroll / Splits
7. Anonymous Feedback / Survey

### Submission Requirements
- [x] Brief overview of the idea for Level 4
- [x] Alignment with Level 4-6 scope and expectations
- [x] `PROPOSAL.md` with product/users, Midnight rationale, data model, and Mainnet feasibility

Do not rewrite `docs/IDEA-SUBMISSION.md`; it is approved submission text.

---

## 🌔 Level 4 — Waxing Gibbous | MVP Goes Live

*Prize: $60 per winner × 25 winners = $1,500 total. Active target: August 24, 2026; August 25-31 contingency buffer.*

### Requirements to Pass
- [x] Working MVP live on Preprod with a verifiable Suffra contract address
- [x] Documentation: README, setup, and `docs/USAGE.md`
- [x] CI/CD pipeline running on the product repo
- [x] Public product X profile created and linked in README: https://x.com/SuffraPrivVote
- [x] Minimum 15 meaningful commits

### Prompt-Step and Project-Gate Checklist
- [x] Step 1 — structure/baseline: verify required paths before new work
- [x] Step 2 — privacy core: compile `contracts/suffra.compact`, run tests, confirm public/private boundary
- [x] Project gate — tally: deferred to Level 5 because the current contract stores commitments only; no safe tally protocol fits the Level 4 deadline
- [x] Step 3 — frontend: wallet connect, circuit calls, loading states, error states, `npm run build` with zero errors
- [x] Step 4 — CI/CD: install, compile, test, build; README badge or workflow file
- [x] Step 5 — deploy to Preprod: stop for deploy address, then update README immediately
- [x] Step 6 — `docs/USAGE.md`: user-facing setup/use/privacy/troubleshooting
- [x] Step 7 — README: live Preprod demo URL, mandatory Preprod address, privacy model, setup, tests, CI/CD, usage guide, X profile placeholder/link
- [x] Step 8 — X launch posts/profile: profile linked; three launch posts documented in `docs/X-LAUNCH-POSTS.md` and published on X (maintainer confirmation)
- [ ] Step 9 — final checklist and submission

### Submission Checklist
- [x] Public GitHub repository with full documentation
- [x] Live Preprod demo link
- [x] Verified Suffra Preprod contract address: current open Candidate-ballot V2 `eaeadd1e9f6df11ba0e9f1cf48f8e70b21bf7257bf7de2f9a459fc3869205597` (deployed 2026-08-20); closed V2 evidence instance and V1 remain documented
- [x] CI/CD badge or workflow file with passing runs
- [x] Link to product X profile: https://x.com/SuffraPrivVote
- [x] Demo video of the MVP: https://youtu.be/lxYipwonU5Y- (maintainer-confirmed Level 4 recording)
- [x] Minimum 15 meaningful commits

### Current Blockers

| Blocker | Verified State |
|:--|:--|
| Suffra Preprod deployment | Open Candidate-ballot V2 `eaeadd1e9f6df11ba0e9f1cf48f8e70b21bf7257bf7de2f9a459fc3869205597` deployed 2026-08-20; prior V2 instance was Lace-smoke-tested with registration, sealed ballot, and closure transactions recorded in README |
| Local deployment state | `.midnight-state.json` records the Suffra Preprod deployment and the legacy Preview counter address `445c735e72a3909940076aa3adf0ec86abeff505a7282b9988ac6a77dc4cd748` (historical only) |
| Product X profile | Live at https://x.com/SuffraPrivVote; README link present |
| Fresh Level 4 demo | Published: https://youtu.be/lxYipwonU5Y- (maintainer confirmation) |
| X launch posts | Three posts in `docs/X-LAUNCH-POSTS.md` have been published (maintainer confirmation) |
| Current V3 deployment documentation | Pending: the repository still identifies V2 as the current open demo contract; record the new V3 Preprod address and update the frontend/README evidence before submission |
| Frontend network | `VITE_MIDNIGHT_NETWORK` accepts `undeployed`, `preview`, or `preprod` and defaults to `preprod`; V2 real-wallet smoke test completed 2026-08-20 |

---

## 🌕 Level 5 — Full Moon | Users & Feedback

*Prize: $100 per winner × 20 winners = $2,000 total.*

### Requirements to Pass
- [ ] Same Level 4 MVP, extended on Preprod
- [ ] 50 Preprod users with verifiable wallet addresses
- [ ] Feedback loop documented
- [ ] Updated documentation
- [ ] Minimum 20 meaningful commits

### Submission Checklist
- [ ] Public GitHub repository with updated documentation
- [ ] Live demo link
- [ ] List of 50 Preprod user wallet addresses
- [ ] Feedback documentation or link to feedback document
- [ ] Demo video showing full MVP functionality
- [ ] Minimum 20 meaningful commits

---

## 🌝 Level 6 — Supermoon

*Prize: $150 per winner × 15 winners = $2,250 total.*

Repository sources conflict: `docs/midnight_prompts.md` frames Level 6 as Mainnet launch, while `docs/lvl4-lvl6-details.txt` repeats Level 5-style Preprod language but lists 70 Preprod wallet addresses and 30 commits. Treat the following as a conservative planning baseline, not a verified dashboard requirement.

### Conservative Planning Baseline
- [ ] Same MVP refined through the Level 5 feedback loop
- [ ] 70 cumulative Preprod wallet addresses
- [ ] Updated feedback/documentation evidence
- [ ] Demo video showing full MVP functionality
- [ ] Minimum 30 meaningful commits
- [ ] Mainnet scope pending official clarification before claiming or submitting
