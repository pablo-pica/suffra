import React from 'react';
import { motion } from 'framer-motion';
import { ShieldAlert, ShieldCheck, HeartHandshake, FileText, Compass, ExternalLink } from 'lucide-react';
import { useMidnight } from './hooks/useMidnight';
import { WalletConnect } from './components/WalletConnect';
import { CircuitCall } from './components/CircuitCall';

export const App: React.FC = () => {
  const midnight = useMidnight();

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5, ease: 'easeOut' } as const,
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans selection:bg-indigo-100 selection:text-indigo-900">
      {/* Header */}
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-1.5 bg-navy-950 text-white rounded-lg">
              <ShieldCheck className="w-6 h-6 text-indigo-400" />
            </div>
            <div>
              <span className="font-headings font-bold text-lg text-slate-900 tracking-tight">Suffra</span>
              <span className="text-[10px] ml-1.5 font-mono px-1.5 py-0.5 rounded-md bg-indigo-50 text-indigo-600 border border-indigo-100 uppercase tracking-wider font-semibold">Preview</span>
            </div>
          </div>
          <div className="flex items-center gap-4 text-xs font-semibold text-slate-500">
            <a href="https://docs.midnight.network" target="_blank" rel="noopener noreferrer" className="hover:text-slate-800 flex items-center gap-1 transition-colors">
              Docs <ExternalLink className="w-3.5 h-3.5" />
            </a>
            <span className="text-slate-300">|</span>
            <span className="flex items-center gap-1.5 text-green-700 bg-green-50 px-2 py-1 rounded-full border border-green-200">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
              Proof Server Active
            </span>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10 flex flex-col gap-8">
        {/* Hero Section */}
        <motion.div
          initial={fadeInUp.initial}
          animate={fadeInUp.animate}
          transition={fadeInUp.transition}
          className="text-center md:text-left max-w-3xl flex flex-col gap-3"
        >
          <h1 className="text-3xl sm:text-4xl font-bold font-headings text-slate-900 leading-tight tracking-tight">
            Private Voting on Midnight Network
          </h1>
          <p className="text-sm sm:text-base text-slate-500 leading-relaxed max-w-2xl">
            Suffra provides anonymous ballot casting with cryptographically verifiable and publicly auditable tallies. Using zero-knowledge proofs, voters prove their eligibility and ballot validity without exposing their choice or identity.
          </p>
        </motion.div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column - Wallet Connector */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-5 flex flex-col gap-6"
          >
            <WalletConnect midnight={midnight} />
            
            {/* ZK Info Card */}
            <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-card flex flex-col gap-3">
              <h3 className="text-xs font-semibold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                <Compass className="w-4 h-4 text-indigo-500" /> ZK Privacy Model
              </h3>
              <div className="flex flex-col gap-2 text-xs text-slate-500 leading-relaxed">
                <div className="flex items-start gap-2">
                  <span className="text-green-500 font-bold">✓</span>
                  <p><strong>Private choices:</strong> Choice of ballot option and voter identity are encrypted in browser and never hit the ledger.</p>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-indigo-500 font-bold">✓</span>
                  <p><strong>Public Verification:</strong> The final tally updates and double-voting nullifier are published to the public ledger.</p>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-indigo-500 font-bold">✓</span>
                  <p><strong>The Proof:</strong> A ZK proof is generated locally in your browser. Validator verifies it on-chain without knowing who you are or what you voted for.</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column - Circuit Interaction */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-7"
          >
            <CircuitCall midnight={midnight} />
          </motion.div>
        </div>

        {/* Bottom Feature Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="rounded-xl border border-indigo-100 bg-gradient-to-r from-indigo-50/40 via-slate-50 to-indigo-50/20 p-6 flex flex-col sm:flex-row gap-5 items-start sm:items-center justify-between shadow-card"
        >
          <div className="flex items-start gap-4">
            <div className="p-3 bg-indigo-100 text-indigo-700 rounded-full shrink-0">
              <HeartHandshake className="w-6 h-6" />
            </div>
            <div className="flex flex-col gap-1">
              <h4 className="text-sm font-semibold text-slate-900">Level 3 Completed — Production-Grade Private Voting</h4>
              <p className="text-xs text-slate-500 max-w-xl leading-relaxed">
                Suffra combines zero-knowledge circuit execution, local proof generation, automated CI/CD testing, and the formal Idea Proposal for private governance elections. Next stop: Level 4 MVP on Preprod!
              </p>
            </div>
          </div>
          <div className="text-xs font-semibold text-indigo-700 bg-indigo-100/80 px-3 py-1.5 rounded-full border border-indigo-200 flex items-center gap-1 shrink-0">
            Level 3 First Quarter Certified ✨
          </div>
        </motion.div>

      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white py-6">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>© 2026 Suffra. Built on Midnight Network.</p>
          <div className="flex gap-4">
            <a href="https://midnight.network" target="_blank" rel="noopener noreferrer" className="hover:text-slate-600 flex items-center gap-0.5">
              Midnight Network <ExternalLink className="w-3 h-3" />
            </a>
            <span>•</span>
            <a href="https://lace.io" target="_blank" rel="noopener noreferrer" className="hover:text-slate-600 flex items-center gap-0.5">
              Lace Wallet <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};
export default App;
