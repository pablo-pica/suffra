# Checker Agent Rules — Suffra

## Audit Source
The PRIMARY checklist comes from the current level's "FINAL CHECKLIST"
section in `docs/midnight_prompts.md`. Our checks ADD to it — never subtract.

---

## Level 1 — New Moon Checklist

### From Official Prompt (Step 7):
- [ ] Contract compiles with `compact compile`
- [ ] `managed/` directory present (circuits + keys)
- [ ] 3+ tests passing
- [ ] Contract deployed to Preview or Preprod
- [ ] Contract address visible in README.md
- [ ] README has all required sections (per prompt Step 6 template)
- [ ] File structure matches spec (per prompt Step 4)

### Our Additions:
- [ ] 5+ meaningful conventional commits
- [ ] `docs/PROGRESS.md` updated with Level 1 completion
- [ ] Public vs private explanation in README is technically accurate
- [ ] Initial idea paragraph present in README
- [ ] No secrets in codebase (no .env values, no private keys committed)
- [ ] `.gitignore` properly configured

---

## Level 2 — Waxing Crescent Checklist

### From Official Prompt (Step 8):
- [ ] Lace wallet connect and disconnect working
- [ ] Circuit called from frontend, proof generated locally
- [ ] Private input never shown in UI
- [ ] Contract address in README.md (MANDATORY)
- [ ] Live demo link in README.md
- [ ] Privacy Claim section in README.md
- [ ] File structure matches spec

### Our Additions:
- [ ] 8+ meaningful conventional commits (cumulative)
- [ ] Tailwind design system applied (not default browser styles)
- [ ] Framer Motion loading animations present
- [ ] Responsive at 1440px, 1024px, 768px viewports
- [ ] Error states handled (wallet not installed, user rejected, network mismatch)
- [ ] `docs/PROGRESS.md` updated with Level 2 completion
- [ ] Live demo on Vercel is accessible and functional

---

## Level 3 — First Quarter Checklist

### From Official Prompt (Step 8):
- [ ] 3+ tests passing
- [ ] CI/CD pipeline running on push to main
- [ ] CI badge in README.md
- [ ] Contract address in README.md (MANDATORY)
- [ ] Privacy Model section in README.md
- [ ] PROPOSAL.md created in project root with correct structure
- [ ] dApp builds with zero errors (`npm run build`)
- [ ] File structure matches spec

### Our Additions:
- [ ] 10+ meaningful conventional commits (cumulative)
- [ ] Demo video covers: wallet connect → circuit call → result + test output + CI badge
- [ ] Mobile-responsive layout verified
- [ ] All error states handled with clear user messages
- [ ] Loading indicators during proof generation
- [ ] Privacy behavior clearly labeled in UI
- [ ] `docs/PROGRESS.md` updated with Level 3 completion
- [ ] `docs/IDEA-SUBMISSION.md` drafted (for The Turn submission)
- [ ] No console errors in production build
- [ ] Contract has evolved to include voting/privacy-meaningful logic

---

## Level 4 — Waxing Gibbous Checklist

### From Official Prompt (Step 9):
- [ ] Contract compiles and tests pass
- [ ] Suffra contract deployed to Preprod
- [ ] Verified Suffra Preprod address in README.md
- [ ] Live Preprod demo link in README.md
- [ ] CI/CD has a passing run and the badge/workflow is linked
- [ ] `docs/USAGE.md` exists and matches the live flow
- [ ] File structure matches the Level 4 prompt
- [ ] `npm run build` passes with zero errors

### Our Additions:
- [ ] Product X profile exists and is linked in README.md
- [ ] Fresh Level 4 demo video covers the deployed Suffra flow
- [ ] Minimum 15 meaningful commits (cumulative)
- [ ] Frontend is configured for Preprod rather than the legacy Preview hardcode
- [ ] Tally capability is described accurately as implemented or deferred
- [ ] `docs/PROGRESS.md` contains current evidence and blockers

---

## Level 5 — Full Moon Checklist

- [ ] Same Level 4 MVP remains live on Preprod
- [ ] `docs/FEEDBACK.md` documents collection method, raw feedback, themes, and changes
- [ ] `USERS.md` contains 50 verifiable Preprod wallet addresses
- [ ] README.md links the contract, user list, and feedback evidence
- [ ] Documentation reflects implemented feedback changes
- [ ] Demo video shows the full refined MVP
- [ ] Minimum 20 meaningful commits (cumulative)

---

## Level 6 — Supermoon Planning Checklist

`docs/midnight_prompts.md` and `docs/lvl4-lvl6-details.txt` conflict on Level 6 user and Mainnet scope. Until clarified, audit against the conservative planning baseline without claiming it is a verified dashboard requirement.

- [ ] Level 5 feedback improvements are implemented and documented
- [ ] 70 cumulative Preprod wallet addresses are recorded
- [ ] Updated usage and launch documentation matches current behavior
- [ ] Demo video shows the final current MVP flow
- [ ] Minimum 30 meaningful commits (cumulative)
- [ ] Mainnet versus improved Preprod scope is confirmed before submission claims

---

## Audit Workflow

1. Load the current level's checklist (above)
2. For each item:
   a. Check file existence, run command, or verify visually
   b. Record ✅ (pass) or ❌ (fail) with specific evidence
3. Run test suite: `npm run test` (if tests exist)
4. Run contract compilation: `npm run compile` (if contract exists)
5. Run production build: `npm run build` (Level 2+)
6. Verify git log: `git log --oneline | head -20`
   - Count commits, check conventional format
7. Check README.md completeness against prompt template
8. Check contract address presence in README (MANDATORY)
9. Generate report → append to `docs/PROGRESS.md`
10. If ALL items ✅: signal submission-ready
11. If ANY item ❌: list failures with fix instructions, builder must fix before re-audit

## Static File Checks
- `package.json` has correct scripts (test, build, dev)
- `.github/workflows/ci.yml` exists and is valid YAML (Level 3+)
- `.env.example` exists (no real secrets)
- `PROPOSAL.md` exists in root (Level 3+)
- `docs/USAGE.md` exists (Level 4+)
- `managed/suffra/` exists with generated artifacts after compile (Level 4+)
- No hardcoded secrets in any source file
