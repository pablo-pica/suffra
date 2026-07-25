import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Shield, RefreshCw, CheckCircle2, AlertTriangle, ExternalLink } from 'lucide-react';
import { type UseMidnightResult } from '../hooks/useMidnight';

interface CircuitCallProps {
  midnight: UseMidnightResult;
}

export const CircuitCall: React.FC<CircuitCallProps> = ({ midnight }) => {
  const {
    connected,
    loading,
    txId,
    counterValue,
    error,
    incrementCounter,
    refreshCounter,
  } = midnight;

  const [inputVal, setInputVal] = useState<string>('1');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!connected || loading) return;

    try {
      const amount = BigInt(inputVal.trim());
      if (amount <= 0n) {
        alert('Amount must be greater than 0.');
        return;
      }
      await incrementCounter(amount);
    } catch (err) {
      alert('Invalid input. Please enter a valid number.');
    }
  };

  const spring = { type: 'spring', stiffness: 400, damping: 25 } as const;

  const buttonVariants = {
    hover: { scale: 1.02 },
    tap: { scale: 0.98 },
  };

  return (
    <div className="w-full rounded-xl shadow-card p-6 bg-white border border-slate-200 hover:shadow-elevated transition-shadow duration-200">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold font-headings text-slate-900 flex items-center gap-2">
          <Shield className="w-5 h-5 text-indigo-500" />
          Call Contract Circuit
        </h2>
        {connected && (
          <button
            onClick={refreshCounter}
            disabled={loading}
            className="p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100 transition-colors"
            title="Refresh state"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          </button>
        )}
      </div>

      {!connected ? (
        <div className="flex flex-col items-center justify-center p-6 text-center border border-dashed border-slate-200 rounded-lg bg-slate-50/50">
          <Shield className="w-8 h-8 text-slate-300 mb-3" />
          <p className="text-sm font-medium text-slate-600 mb-1">Wallet Connection Required</p>
          <p className="text-xs text-slate-400 max-w-[280px]">
            Please connect your Lace wallet to enable contract circuit execution.
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-6">
          {/* Current Ledger State */}
          <div className="flex items-center justify-between p-4 bg-slate-50 border border-slate-200 rounded-lg">
            <div className="flex flex-col">
              <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider">Public Ledger State</span>
              <span className="text-sm font-medium text-slate-700">Counter Value (On-chain)</span>
            </div>
            <motion.div
              key={counterValue !== null ? counterValue.toString() : 'null'}
              initial={{ scale: 1.2, color: '#3b82f6' }}
              animate={{ scale: 1, color: '#0f172a' }}
              transition={{ duration: 0.5 }}
              className="text-2xl font-mono font-bold"
            >
              {counterValue !== null ? counterValue.toString() : '—'}
            </motion.div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <label htmlFor="increment-amount" className="text-xs font-semibold text-slate-700">
                Increment Amount (Secret Input)
              </label>
              <div className="relative">
                <input
                  id="increment-amount"
                  type="number"
                  min="1"
                  disabled={loading}
                  value={inputVal}
                  onChange={(e) => setInputVal(e.target.value)}
                  className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm focus:ring-2 focus:ring-accent-blue focus:border-transparent placeholder:text-slate-400 disabled:bg-slate-50 disabled:cursor-not-allowed font-mono text-slate-900"
                  placeholder="Enter positive integer"
                  required
                />
                <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[10px] font-medium bg-green-50 text-green-700 border border-green-200">
                  <span className="w-1 h-1 rounded-full bg-green-500" />
                  Private Witness
                </div>
              </div>
              <p className="text-[11px] text-slate-500 italic mt-0.5 flex items-center gap-1">
                🔒 Proved without revealing your input (Zero-Knowledge Proof)
              </p>
            </div>

            {error && (
              <motion.div
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-start gap-2.5 rounded-lg bg-red-50 border border-red-200 p-3.5 text-xs text-red-700 leading-relaxed font-mono"
              >
                <AlertTriangle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                <span>{error}</span>
              </motion.div>
            )}

            <motion.button
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
              transition={spring}
              type="submit"
              disabled={loading}
              className="w-full rounded-lg bg-accent-blue hover:bg-indigo-600 text-white font-medium px-4 py-2.5 transition-colors duration-200 min-h-[44px] flex items-center justify-center gap-2 disabled:bg-slate-300 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Generating local proof & submitting...
                </>
              ) : (
                <>
                  <Play className="w-4 h-4" />
                  Execute ZK Transaction
                </>
              )}
            </motion.button>
          </form>

          {/* Transaction Results */}
          <AnimatePresence>
            {txId && (
              <motion.div
                initial={{ opacity: 0, height: 0, y: 15 }}
                animate={{ opacity: 1, height: 'auto', y: 0 }}
                exit={{ opacity: 0, height: 0, y: 15 }}
                transition={{ duration: 0.3 }}
                className="mt-2 rounded-lg border border-indigo-100 bg-indigo-50/20 p-4 flex flex-col gap-3"
              >
                <div className="flex items-center gap-2 text-sm font-semibold text-indigo-900">
                  <CheckCircle2 className="w-5 h-5 text-indigo-500" />
                  <span>Transaction Submitted!</span>
                </div>
                
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider">Transaction ID</span>
                  <span className="text-xs font-mono text-slate-800 break-all select-all leading-tight">
                    {txId}
                  </span>
                </div>

                <div className="text-[11px] text-slate-500 mt-1 flex items-center gap-1.5 flex-wrap">
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-ping" />
                  <span>State updates in ~30–60s once mined in a block on Preview network.</span>
                  <a
                    href={`https://explorer.preview.midnight.network/transactions/${txId}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ml-auto inline-flex items-center gap-0.5 text-accent-blue hover:text-indigo-600 transition-colors font-medium"
                  >
                    Explorer <ExternalLink className="w-3 h-3" />
                  </a>

                </div>

              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
};
