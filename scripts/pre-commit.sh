#!/bin/bash
# Pre-commit hook — Suffra
# Scans staged files for secrets before allowing commits

echo "🔒 Running pre-commit secret scan..."

FOUND=0

# Check .env files aren't being committed
ENV_FILES=$(git diff --cached --name-only | grep -E "^\.env$|^\.env\.local$|^\.env\.\w+\.local$")
if [ -n "$ENV_FILES" ]; then
  echo "⚠️  Environment file being committed:"
  echo "$ENV_FILES"
  FOUND=1
fi

# Check for actual secret values in staged content (not pattern definitions)
# Only scan source files, not scripts or agent configs
STAGED_SRC=$(git diff --cached --name-only | grep -E "\.(ts|tsx|js|jsx|json|compact)$" | grep -v "node_modules")
if [ -n "$STAGED_SRC" ]; then
  for file in $STAGED_SRC; do
    # Check for hardcoded hex private keys (64+ hex chars after 0x)
    if git diff --cached -- "$file" | grep -qP '^\+.*0x[a-fA-F0-9]{64}'; then
      echo "⚠️  Possible private key in: $file"
      FOUND=1
    fi
  done
fi

if [ $FOUND -eq 1 ]; then
  echo ""
  echo "❌ Pre-commit check FAILED — potential secrets detected."
  echo "   Remove sensitive values before committing."
  exit 1
fi

echo "✅ No secrets detected. Proceeding with commit."
exit 0
