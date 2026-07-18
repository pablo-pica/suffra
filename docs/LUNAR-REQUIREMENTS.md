# Lunar Requirements — Suffra

> Verbatim requirements from the RiseIn dashboard, structured as checkboxes
> for the checker agent. Reference: `docs/midnight_prompts.md` for full prompt steps.

---

## 🌑 Level 1 — New Moon | Setup & First Contract

*No prize — entry level. Complete to unlock the prize track from Level 2 onward.*

### Requirements to Pass
- [ ] Toolchain installed and a contract that compiles via `compact compile`
- [ ] Passing test suite
- [ ] Generated `managed/` directory present (circuits + keys)
- [ ] Contract deployed to Preview or Preprod with a visible contract address
- [ ] An initial product idea (1 short paragraph) drafted in the README
- [ ] Minimum 5 meaningful commits

### Submission Checklist
- [ ] Public GitHub repository with a README.md
- [ ] Setup instructions (how to run locally)
- [ ] Screenshot: successful compile output (circuits listed)
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
- [ ] An observable privacy behavior (something proven without being shown)
- [ ] Contract deployed to Preprod with a verifiable address
- [ ] Minimum 8 meaningful commits

### Submission Checklist
- [ ] Public GitHub repository with README
- [ ] Live demo link (Vercel, Netlify, or similar)
- [ ] Deployed Preprod contract address (verifiable on-chain)
- [ ] Demo video: wallet connect + a successful circuit call
- [ ] README documenting the privacy claim
- [ ] Minimum 8 meaningful commits

---

## 🌓 Level 3 — First Quarter | Production-Grade dApp

*Prize: $30 per winner × 55 winners = $1,650 total*

### Requirements to Pass
- [ ] Fully functional dApp that meaningfully uses Midnight's privacy model
- [ ] Minimum 3 tests passing
- [ ] CI/CD pipeline running (workflow file + passing runs)
- [ ] Approved idea submitted from the provided idea list
- [ ] Minimum 10 meaningful commits

### Submission Checklist
- [ ] Public GitHub repository with complete README
- [ ] Live demo link
- [ ] Screenshot: test output (3+ tests passing)
- [ ] CI/CD badge or workflow file with passing runs
- [ ] Demo video (1 minute) showing full functionality
- [ ] README "privacy model" section: what an observer can and cannot learn
- [ ] Product proposal (from the idea list) submitted for approval
- [ ] Minimum 10 meaningful commits

---

## 💭 Idea Submission — The Turn

*Gate to Level 4+. Must be approved before starting Level 4.*

### Provided Idea List (choose one)
1. **Private Voting** — anonymous ballots with publicly verifiable tallies ← OUR CHOICE
2. Age / Eligibility Gate — prove a threshold without revealing the underlying value
3. Private Allowlist Access — prove membership without revealing identity
4. Confidential Credentials — prove a credential is valid without disclosing it
5. Sealed-Bid Auction — private bids, verifiable winner
6. Private Payroll / Splits — distribute funds without exposing amounts
7. Anonymous Feedback / Survey — verifiable participation, private responses

### Submission Requirements
- [ ] Brief overview of the idea for Level 4
- [ ] Alignment with Level 4-6 scope and expectations
- [ ] PROPOSAL.md in project root with:
  - What is the product, and who uses it?
  - Why Midnight specifically?
  - Data Model (public vs private table)
  - Mainnet Feasibility

---

## 🌔 Level 4 — Waxing Gibbous | MVP Goes Live

*Prize: $60 per winner × 25 winners = $1,500 total*
*(Only after idea approval from The Turn)*

### Requirements to Pass
- [ ] MVP live on Preprod
- [ ] Documentation (docs/USAGE.md)
- [ ] CI/CD pipeline running
- [ ] Public product (X) profile
- [ ] Minimum 15 meaningful commits

---

## 🌕 Level 5 — Full Moon | Users & Feedback

*Prize: $100 per winner × 20 winners = $2,000 total*

### Requirements to Pass
- [ ] Same MVP on Preprod
- [ ] Documentation maintained
- [ ] Living feedback loop (docs/FEEDBACK.md)
- [ ] 50 Preprod users (USERS.md with wallet addresses)
- [ ] Minimum 20 meaningful commits

---

## 🌝 Level 6 — Supermoon | Mainnet Launch

*Prize: $150 per winner × 15 winners = $2,250 total*

### Requirements to Pass
- [ ] Deploy to Mainnet (or redeploy to Preprod with improvements)
- [ ] Iterate on feedback
- [ ] Brand assets (logo, banner)
- [ ] Onboard 20 real users (LAUNCH_USERS.md)
- [ ] Minimum 30 meaningful commits
