# Commit Flow — Suffra

## When to Commit
Commit at natural milestones — after completing each prompt step.
Each level has 7-8 steps, giving natural commit points.

## Procedure
1. Code changes complete for current step/milestone
2. Run tests (if applicable): `npm run test`
3. Run contract compile (if changed): `compact compile`
4. Stage changed files: `git add -A`
5. Commit with conventional format (see examples below)
6. Pre-commit hook runs automatically (secret scan)
7. Continue to next step

## Commit Message Examples
```
feat(toolchain): set up midnight compiler and proof server
feat(contract): add counter with public ledger and private witness
test(contract): add circuit logic and state transition tests
feat(contract): deploy counter to preview network
docs: create README with privacy model and setup instructions

feat(ui): scaffold vite react frontend with tailwind
feat(ui): implement wallet connect with lace
feat(ui): add circuit call component with loading states
feat(ui): deploy frontend to vercel
docs: update README with live demo and privacy claim

test: add 3 contract tests for circuit, state, and privacy
ci: add github actions workflow for build and test
feat(ui): polish dApp with error handling and responsive layout
feat(contract): evolve counter to voting logic
docs: create PROPOSAL.md with product idea
docs: update README with CI badge and proposal reference
```

## Minimum Targets
- Level 1: 5 commits
- Level 2: 8 commits (cumulative)
- Level 3: 10 commits (cumulative)
- Level 4: 15 commits (cumulative)
- Level 5: 20 commits (cumulative)
- Level 6: 30 commits (cumulative)

## Rules
- Never batch all work into one giant commit
- Each commit must be meaningful (no "fix typo" spam)
- Conventional format is mandatory: type(scope): description
- Pre-commit hook blocks commits with detected secrets
