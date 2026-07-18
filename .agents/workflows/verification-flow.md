# Verification Flow — Suffra

## Trigger
Runs after builder completes ALL prompt steps for the current level.

## Procedure

### 1. Load Checklist
Load the current level's full checklist from `.agents/rules/checker.md`.
This includes both official prompt items and our additions.

### 2. File & Config Audit
For each expected file in the prompt's file structure:
```bash
# Check file exists
ls -la contracts/counter.compact
ls -la managed/
ls -la README.md
ls -la tests/counter.test.ts
ls -la .github/workflows/ci.yml  # Level 3 only
ls -la PROPOSAL.md               # Level 3 only
```

### 3. Compilation Check
```bash
compact compile
# Verify managed/ directory has circuits and keys
ls managed/
```

### 4. Test Suite
```bash
npm run test
# Verify 3+ tests pass
# Capture output for submission screenshot
```

### 5. Build Check (Level 2+)
```bash
npm run build
# Must complete with zero errors
```

### 6. Git Audit
```bash
git log --oneline | head -20
# Count: minimum 5 (L1), 8 (L2), 10 (L3) commits
# Format: all must be conventional commits
git log --oneline | wc -l
```

### 7. README Completeness
Check README.md has ALL required sections per the current level's prompt:
- Contract address table (MANDATORY at every level)
- Privacy Model section
- Setup instructions
- Live demo link (Level 2+)
- CI badge (Level 3+)

### 8. Secret Scan
```bash
# Scan for any leaked secrets
grep -r "PRIVATE_KEY\|SECRET\|PASSWORD\|sk_\|0x[a-fA-F0-9]{64}" --include="*.ts" --include="*.tsx" --include="*.js" --include="*.json" src/ contracts/ || echo "No secrets found"
```

### 9. Report Generation
For each checklist item, record:
- ✅ PASS — with evidence (file path, command output)
- ❌ FAIL — with specific failure description and fix instruction

### 10. Update Progress
Append audit results to `docs/PROGRESS.md` with timestamp.

### 11. Decision
- ALL items ✅ → Signal submission-ready, trigger submission-flow
- ANY item ❌ → List failures, builder must fix, re-run verification
