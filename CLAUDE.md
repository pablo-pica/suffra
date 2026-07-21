# Agent Guidelines — Suffra

## Critical Instructions
- **Auto-Loading Rules**: At the start of any task, you **MUST** read the rules in `.agents/rules/general.md` and the appropriate role-specific rules (`builder.md` or `checker.md`), and follow the workflows in `.agents/workflows/`.
- **Midnight Docs**: Always use the Midnight Docs MCP at https://midnight.mcp.kapa.ai for SDK lookups. NEVER hallucinate Midnight.js or Compact calls.

## Package Manager & Commands
Use **npm** for package management.
- Compile contracts: `npm run compile`
- Run dev server: `npm run dev`
- Build frontend: `npm run build`
- Run tests: `npm run test` (uses Vitest)
- Start proof server: `npm run proof-server:start`
- Stop proof server: `npm run proof-server:stop`

## Workflows
- **Builder Flow**: See `.agents/rules/builder.md` and `.agents/workflows/commit-flow.md`
- **Checker Flow**: See `.agents/rules/checker.md` and `.agents/workflows/verification-flow.md`
