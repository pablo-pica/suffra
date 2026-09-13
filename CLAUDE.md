# Agent Guidelines — Suffra

## Critical Instructions

- **Auto-Loading Rules**: Follow the workflow in `.agent-workflow/README.md`.
- **Midnight Docs**: Always use the Midnight Docs MCP at [https://midnight.mcp.kapa.ai](https://midnight.mcp.kapa.ai) for SDK lookups. NEVER hallucinate Midnight.js or Compact calls.
- **Requirements source**: `docs/midnight_prompts.md` defines level-specific acceptance requirements. Apply them only through an approved `.agent-workflow/plan.md`; it does not authorize direct execution, commits, pushes, or deployments.

## Package Manager &amp; Commands

Use **npm** for package management.

- Compile contracts: `npm run compile`
- Run dev server: `npm run dev`
- Build frontend: `npm run build`
- Run tests: `npm run test` (uses Vitest)
- Start proof server: `npm run proof-server:start`
- Stop proof server: `npm run proof-server:stop`
