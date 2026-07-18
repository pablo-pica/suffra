# Submission Flow — Suffra

## Trigger
Runs after checker passes ALL items in verification-flow.

## Pre-Submission Gate
- [ ] Checker audit: ALL items ✅ confirmed
- [ ] No ❌ items remaining

## Submission Artifacts by Level

### Level 1 — New Moon
- [ ] Screenshot: successful `compact compile` output (circuits listed)
- [ ] Screenshot: contract deployed with address visible
- [ ] README.md has all sections per prompt Step 6
- [ ] Initial Idea paragraph filled in (user does this)
- [ ] 5+ meaningful commits
- [ ] Public GitHub repo

### Level 2 — Waxing Crescent
- [ ] Live demo URL on Vercel (user deploys)
- [ ] Contract address in README (MANDATORY)
- [ ] Demo video showing:
  1. Lace wallet connect — address appears on screen
  2. Circuit call — loading state during proof generation
  3. On-chain result after submission
  4. Privacy label visible ("Proved without revealing")
- [ ] README has Privacy Claim section
- [ ] 8+ meaningful commits

### Level 3 — First Quarter
- [ ] Screenshot: test output (3+ tests passing)
- [ ] CI/CD badge green in README or workflow file with passing runs
- [ ] Demo video (1 minute) showing:
  1. Full dApp flow: wallet connect → circuit call → result
  2. Terminal showing test output (3+ passing)
  3. README showing CI badge as green
- [ ] PROPOSAL.md in project root with correct structure
- [ ] Contract address in README (MANDATORY)
- [ ] Privacy Model section in README
- [ ] `npm run build` passes zero errors
- [ ] 10+ meaningful commits

## Final Steps
1. Final commit: `docs: prepare level N submission`
2. User pushes to GitHub: `git push origin main`
3. User submits on RiseIn platform
4. Update `docs/PROGRESS.md` with submission timestamp

## Manual Steps (User Must Do)
- Fund faucet wallet when terminal pauses (Level 1)
- Fill in Initial Idea section in README (Level 1)
- Paste contract address into README Contract Address table (all levels)
- Take screenshots: compile output + deployed address (Level 1)
- Deploy frontend to Vercel and paste URL (Level 2+)
- Record demo video following checklist (Level 2+)
- Submit on RiseIn platform (all levels)
- Fill in PROPOSAL.md sections (Level 3 — user writes the product idea)
