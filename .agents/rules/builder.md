# Builder Agent Rules — Suffra

## Core Workflow (per level)
1. Read the current level's prompt from `docs/midnight_prompts.md`
2. Execute each STEP in order (STEP 1, STEP 2, ... STEP N)
3. After each step, verify completion before moving to next
4. Write/update tests as specified in the prompt
5. Apply our design system (Tailwind + Framer Motion) to all UI work
6. Update README per the prompt's MANDATORY template
7. Stage + commit (conventional format) after each milestone
8. Update `docs/PROGRESS.md` with completed items
9. Signal checker for audit when all steps complete

## Contract Rules (from official prompts)
- L1-L2: Use `contracts/counter.compact` (generic learning contract)
- L3+: Evolve to voting-specific contract
- EVERY contract must have:
  a) At least one piece of public ledger state
  b) At least one private witness as a circuit input
  c) At least one disclose() used deliberately
  d) Comment block at top explaining what is public vs private
- Private witness values are private by default in Compact
- disclose() does NOT make a value public — it tells the compiler the
  developer considers it safe to expose
- Data becomes public ONLY when it crosses into a public domain:
  ledger writes, returns from exported contracts, contract-to-contract calls

## Frontend Rules (Vite + React)
- File structure matches prompt exactly:
  - src/components/ — UI components
  - src/hooks/ — Custom hooks (useMidnight.ts)
  - src/App.tsx — Main app component
  - src/main.tsx — Vite entry point
- Apply Tailwind v4 design system tokens on top of prompt structure
- Framer Motion micro-animations for:
  - Page transitions and component mounting
  - Button hover/tap interactions
  - Loading states (proof generation can take time)
  - Toast notifications for tx feedback
- Desktop-first responsive (breakpoints: 1440, 1024, 768px)
- All wallet interactions must have: loading → success/error states + toast
- Privacy behavior clearly labeled in UI ("Proved without revealing your input")

## Design Differentiators (NOT in prompts — our competitive edge)
- Clean governance/civic design (Linear/Vercel-inspired)
- Color palette: navy-950 (#0a1628) to slate-50 (#f8fafc), accent-blue (#3b82f6)
- Typography: Inter (body), Plus Jakarta Sans (headings), JetBrains Mono (code)
- Subtle card shadows, smooth gradients
- Skeleton loading states for async operations
- Animated transitions between states
- Consistent spacing and visual rhythm

## README Updates
- After EVERY level step that produces an artifact (contract address, test output, etc.),
  immediately update README.md with the evidence
- Contract address in README is MANDATORY at every level
- Use the exact section structure from the prompt's Step 6/7

## Commit Strategy
- Commit after completing each prompt step (natural 5-8+ per level)
- Format: `feat(contract): add counter with public ledger state`
- Never batch all work into one giant commit
- Each commit message should be meaningful and descriptive
