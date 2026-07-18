# Deployment Guide — Suffra

## Prerequisites

- Node.js v22+ (`node --version`)
- Docker running (`docker --version`)
- Lace wallet browser extension (Midnight edition)
- Git configured (`git config user.name` / `git config user.email`)

---

## 1. Midnight Toolchain Setup

### Install Compact Compiler
```bash
npm install -g @midnight-ntwrk/compact-compiler
compact --version   # Verify installation
```

### Pull & Run Proof Server
```bash
docker pull midnightnetwork/proof-server
docker run -p 6300:6300 midnightnetwork/proof-server
```
The proof server runs on `http://localhost:6300` and generates ZK proofs.

### Midnight Docs MCP
For AI-assisted development, connect to Midnight documentation:
```
MCP endpoint: https://midnight.mcp.kapa.ai
```

---

## 2. Hello World Deploy (Level 1 Step 3)

```bash
# Scaffold hello-world starter
npx -y create-mn-app mn-demo --template hello-world --use-npm
cd mn-demo

# Deploy to Preview network
NODE_OPTIONS="--max-old-space-size=12288" npm run deploy -- --network preview
```

⚠️ **STOP** when the wallet address prints.
→ Fund the wallet at the Preview faucet (URL provided in terminal output).
→ Wait for funding confirmation before continuing.

```bash
# After funding, verify deployment
npm run network preview
# Record the deployed contract address
```

---

## 3. Contract Compilation

```bash
# From project root
compact compile

# Verify output
ls managed/
# Should show circuit files and keys
```

---

## 4. Contract Deployment to Preprod

```bash
# Deploy custom contract to Preprod
NODE_OPTIONS="--max-old-space-size=12288" npm run deploy -- --network preprod
```

⚠️ The deploy command will:
1. Print a wallet address → fund it at Preprod faucet
2. Compile the contract
3. Generate proof
4. Submit transaction
5. Print the contract address

**Record the contract address** — it goes in README.md (MANDATORY).

---

## 5. Frontend Deployment (Vercel)

### First-time Setup
```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel

# Follow prompts:
# - Link to existing project? No
# - Project name: suffra
# - Framework: Vite
# - Build command: npm run build
# - Output directory: dist
```

### Subsequent Deploys
```bash
vercel --prod
```

### Environment Variables on Vercel
Set in Vercel dashboard → Settings → Environment Variables:
```
VITE_MIDNIGHT_NETWORK=preprod
VITE_CONTRACT_ADDRESS=[your-contract-address]
```

### vercel.json
```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

---

## 6. Lace Wallet Setup

1. Install Lace browser extension from the Chrome Web Store
2. Create or import a wallet
3. Switch to Midnight Preprod network in wallet settings
4. Get Preprod test tokens from faucet
5. The DApp connector is available at `window.midnight.mnLace`

---

## 7. Local Development

```bash
# Clone and install
git clone https://github.com/[username]/suffra.git
cd suffra
npm install

# Start proof server (Docker must be running)
docker run -p 6300:6300 midnightnetwork/proof-server

# Compile contracts
compact compile

# Start dev server
npm run dev
# Opens at http://localhost:5173

# Run tests
npm run test

# Production build
npm run build
```

---

## Network Reference

| Network | Purpose | Faucet | Explorer |
|:--|:--|:--|:--|
| Preview | Early testing | [Preview faucet URL] | [Preview explorer URL] |
| Preprod | Required for submissions | [Preprod faucet URL] | [Preprod explorer URL] |
| Mainnet | Level 6 only | N/A | [Mainnet explorer URL] |

*Exact URLs will be filled in during Level 1 setup from Midnight docs.*
