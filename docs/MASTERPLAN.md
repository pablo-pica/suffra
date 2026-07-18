# Masterplan — Suffra

## Program: New Moon to Full: Monthly Moonshots on Midnight
- **Platform**: RiseIn
- **Monthly Prize Pool**: $8,000
- **Structure**: 6 lunar levels (New Moon → Supermoon)
- **Our Target**: Level 3 + Idea Submission by end of July 2026
- **Approach**: AI-assisted vibe coding with human supervision

---

## Strategy

### Core Philosophy
Follow the official `midnight_prompts.md` EXACTLY for each level. Layer our design
system, documentation depth, and automated quality gates ON TOP for differentiation.

### Competitive Insights (from Aethyr experience)
1. **README IS your pitch** — judges evaluate primarily through your README
2. **Exceed minimum requirements** — minimums are the floor, not the ceiling
3. **Design polish differentiates** — most builders use default styles; we use Tailwind + Framer Motion
4. **Documentation depth shows production thinking** — our 8-doc system is rare among competitors
5. **Commit frequency shows active development** — target 15+ by L3 (minimums: 5/8/10)
6. **Checker agent prevents non-compliant submissions** — catch issues before judges do

### Level Progression Strategy
- L1-L2 are **learning levels** — use generic `counter.compact` as prompts specify
- L3 is where we **evolve into our real product** (Private Voting)
- L3 + Idea Submission unlocks the prize track from L4 onward
- Only highest level reached per month is rewarded → sprint to L3

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

**Key rules:**
- Sequential progression required — can't skip levels
- Only highest level reached per month is rewarded
- Once rewarded for a level, must advance to stay eligible
- Chain rule: if L2 fails, only L1 credit even if L3 was attempted
- Prizes per project, not per person (team submissions)

---

## Tech Stack

| Layer | Technology |
|:--|:--|
| Smart Contracts | Midnight Compact language |
| Frontend | Vite + React + TypeScript |
| Styling | Tailwind CSS v4 + Framer Motion |
| Wallet | Lace browser extension (Midnight edition) |
| SDK | Midnight.js SDK + DApp Connector API |
| Testing | Vitest (frontend) + Compact test framework |
| CI/CD | GitHub Actions |
| Deployment | Vercel (frontend) + Midnight Preprod (contracts) |
| Docs MCP | https://midnight.mcp.kapa.ai |

---

## Risk Register

| Risk | Likelihood | Impact | Mitigation |
|:--|:--|:--|:--|
| Compact toolchain installation issues | High | High | Follow prompt Steps 1-2 exactly, Docker for proof server, join Midnight Discord |
| Compact language learning curve | Medium | High | Study Compact by Example, start with hello-world, use Midnight Docs MCP |
| Proof server slow/unstable on Preprod | Medium | Medium | Test locally with devnet first, deploy to Preprod only when contract is stable |
| Lace wallet compatibility issues | Medium | Medium | Test with latest Lace version, check Midnight Discord for known issues |
| CI/CD can't run Compact compiler | Medium | Medium | May need custom Docker image or conditional compile step |
| Not enough meaningful commits | Low | High | Commit after each prompt step — natural 5-8+ per level |
| Vercel deployment issues with Midnight SDK | Low | Medium | Test build locally first, check client-side vs server-side SDK usage |
| Level 2 reviewed before Level 1 approved | Low | High | Submit L1 first, wait for confirmation before L2 submission |

---

## Pace Targets (Flexible)

| Milestone | Target | Notes |
|:--|:--|:--|
| Level 1 complete | ~Day 3 | Toolchain + contract + deploy |
| Level 2 complete | ~Day 6 | Frontend + wallet + circuit call |
| Level 3 complete | ~Day 11 | Tests + CI/CD + polish + proposal |
| Idea submitted | ~Day 11 | PROPOSAL.md + The Turn submission |
| Buffer | Days 12-13 | Polish, fix checker failures |

These are targets, not deadlines. We sprint when we can, pause when blocked.

---

## Networks

| Network | Purpose | Used In |
|:--|:--|:--|
| Preview | Early testing, faster iteration | L1 (optional) |
| Preprod | Required deployment target | L1-L5 |
| Mainnet | Production launch | L6 only |
