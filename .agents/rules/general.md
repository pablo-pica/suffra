# General Agent Rules — Suffra

## Pre-Task Ritual
1. Read `docs/PROGRESS.md` — check current level, active task
2. Read the current level section in `docs/midnight_prompts.md`
3. Follow the prompt steps IN ORDER — do not skip any step

## Midnight Docs MCP
- Use the Midnight Docs MCP at https://midnight.mcp.kapa.ai for all SDK lookups
- NEVER hallucinate Midnight.js or Compact API calls — verify against MCP docs
- If MCP is unavailable, use web search for docs.midnight.network

## Tech Stack
- Contracts: Midnight Compact language
- Frontend: Vite + React + TypeScript (strict)
- Styling: Tailwind CSS v4 + Framer Motion (our differentiator — NOT in official prompts)
- Wallet: Lace browser extension (Midnight edition)
- SDK: Midnight.js SDK + DApp Connector API
- Testing: Vitest (frontend) + Compact test framework (contracts)
- CI/CD: GitHub Actions

## Git Conventions
- Conventional commits: feat|fix|test|ci|docs|style|refactor(scope): message
- Commit as user (git config user.name and user.email are set)
- Pre-commit: scan for secrets (wallet keys, .env values, private keys)
- Minimum meaningful commits per level (cumulative): L1=5, L2=8, L3=10, L4=15, L5=20, L6=30
- Make commits at natural milestones — after completing each prompt step

## Level Progression
- Current level's prompt steps are THE authority
- Add design polish and documentation ON TOP of prompt requirements
- Never deviate from the prompt's expected file structure
- Quality > speed — every requirement must be airtight before level-up
- Sequential: must complete ALL prior level requirements before advancing

## Rate Limit Protocol
- On 429 errors: stop immediately, warn user, wait for instruction

## Cascade Rule
- Builder completion auto-triggers checker audit
- Checker failure blocks submission — builder must fix before re-audit

## File References
- Source of truth for level workflows: `docs/midnight_prompts.md`
- Level requirements checklist: `docs/LUNAR-REQUIREMENTS.md`
- Progress tracking: `docs/PROGRESS.md`
- Design tokens: `docs/STYLE-GUIDE.md`
- Architecture reference: `docs/ARCHITECTURE.md`
