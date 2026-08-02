# Masterplan — Suffra

## Program: New Moon to Full: Monthly Moonshots on Midnight
- **Platform**: RiseIn
- **Monthly Prize Pool**: $8,000
- **Structure**: 6 lunar levels (New Moon → Supermoon)
- **Current Target**: Level 4 MVP live on Preprod by August 24, 2026
- **Official Deadline**: August 31, 2026; August 25-31 is contingency buffer
- **Approach**: follow official prompts in order, with documentation and verification discipline

---

## Strategy

### Core Philosophy
Follow `docs/midnight_prompts.md` in order for each level. Layer the Suffra design system, documentation depth, and quality gates on top without widening scope.

### Competitive Insights
1. README is the pitch and must distinguish current, planned, and unknown evidence.
2. Preprod address, live demo, X profile, and fresh video are Level 4 launch assets; none should be claimed before verified.
3. Design polish differentiates, but privacy correctness and submission evidence come first.
4. Commit frequency shows active development; Level 4 minimum is 15 meaningful commits.
5. Checker audits prevent non-compliant submissions.

### Level Progression Strategy
- L1-L3 historical audits remain the baseline.
- The Turn / idea submission is approved; approval date is unknown.
- L4 is active: ship the approved Suffra private-election MVP on Preprod.
- Tally gate decision: defer tally to L5. The current contract stores salted commitments only; adding a public per-choice counter would leak choices, while a reveal/aggregation design is out of the L4 deadline scope.
- L5 focuses on feedback and 50 Preprod users.
- L6 uses a conservative planning baseline of 70 cumulative Preprod wallet addresses and 30 meaningful commits while Mainnet scope remains pending clarification.

### Level 4 Pacing
| Window | Focus | Exit Criteria |
|:--|:--|:--|
| Aug 12 | Structure/baseline audit | Required repo paths and stale blockers documented |
| Aug 13 | Privacy core and tally gate | Compile/tests re-run; tally deferred to Level 5 |
| Aug 14-16 | Frontend | Preprod configuration is validated; build passes |
| Aug 17 | CI/CD | Workflow compiles, tests, builds, and has a passing run |
| Aug 18-19 | Preprod deploy | Verified Suffra Preprod address recorded and smoke-tested |
| Aug 20-21 | README/usage/X | Usage docs, README evidence, X profile, and launch posts ready |
| Aug 22 | Evidence audit | Fresh demo and checker review complete |
| Aug 23-24 | Fixes/submission | Findings resolved and Rise In submission completed |
| Aug 25-31 | Buffer | Fix blockers only; no scope expansion |

---

## Prize Structure

| Level | Phase | Prize/Winner | Winners | Total |
|:--|:--|:--|:--|:--|
| 🌑 L1 | New Moon | $0 | N/A | Entry level |
| 🌒 L2 | Waxing Crescent | $10 | 60 | $600 |
| 🌓 L3 | First Quarter | $30 | 55 | $1,650 |
| 💭 Idea | The Turn | — | Gate | Must pass for L4+ |
| 🌔 L4 | Waxing Gibbous | $60 | 25 | $1,500 |
| 🌕 L5 | Full Moon | $100 | 20 | $2,000 |
| 🌝 L6 | Supermoon | $150 | 15 | $2,250 |

**Key rules:** sequential progression required; only the highest level reached per month is rewarded; once rewarded for a level, the project must advance to stay eligible; prizes are per project, not per person.

---

## Tech Stack

| Layer | Technology |
|:--|:--|
| Smart Contracts | Midnight Compact language |
| Frontend | Vite + React + TypeScript |
| Styling | Tailwind CSS v4 + Framer Motion |
| Wallet | Lace browser extension (Midnight edition) |
| SDK | Midnight.js SDK + DApp Connector API |
| Testing | Vitest |
| CI/CD | GitHub Actions |
| Deployment target | Vercel frontend + Midnight Preprod contract (contract pending) |
| Docs MCP | https://midnight.mcp.kapa.ai |

---

## Risk Register

| Risk | Likelihood | Impact | Mitigation |
|:--|:--|:--|:--|
| No verified Suffra Preprod deployment yet | High | High | Schedule deploy phase Aug 18-19; record only the verified address |
| Preprod configuration not proven with a real wallet | High | High | Validate configured `preprod` selection in a wallet smoke test before demo claims |
| Tally implementation leaks choices or delays submission | Medium | High | Decision made: defer reveal/aggregation work to Level 5 |
| Product X profile/demo not ready | Medium | High | Reserve Aug 19-24 for launch assets |
| Proof server or Preprod instability | Medium | Medium | Keep Aug 25-31 contingency for redeploy/fixes |
| Not enough meaningful commits | Low | High | Commit at prompt-step milestones; no commits in this planning update |

---

## Networks

| Network | Purpose | Used In |
|:--|:--|:--|
| Preview | Historical early testing | Legacy Level 1 counter evidence |
| Preprod | Required Level 4/5 deployment target | Active Suffra target |
| Mainnet | Possible future production scope | Pending official Level 6 clarification |
