import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Vote, Shield, RefreshCw, CheckCircle2, AlertTriangle, ExternalLink, UserPlus, Lock, Ban } from 'lucide-react';
import { type UseMidnightResult } from '../hooks/useMidnight';

interface BallotBoxProps {
  midnight: UseMidnightResult;
}

export const BallotBox: React.FC<BallotBoxProps> = ({ midnight }) => {
  const {
    connected,
    loading,
    txId,
    electionState,
    error,
    deploymentNotice,
    contractReady,
    registerVoter,
    castVote,
    closeVoting,
    refreshElection,
  } = midnight;

  const [choice, setChoice] = useState<0 | 1>(1);

  const spring = { type: 'spring', stiffness: 400, damping: 25 } as const;
  const buttonVariants = {
    hover: { scale: 1.02 },
    tap: { scale: 0.98 },
  };

  const disabled = loading || !contractReady || electionState?.votingOpen === false;

  return (
    <div className="w-full rounded-xl shadow-card p-6 bg-white border border-slate-200 hover:shadow-elevated transition-shadow duration-200">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold font-headings text-slate-900 flex items-center gap-2">
          <Vote className="w-5 h-5 text-indigo-500" />
          Sealed Ballot Box
        </h2>
        {connected && (
          <button
            onClick={refreshElection}
            disabled={loading}
            className="p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100 transition-colors"
            title="Refresh election state"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          </button>
        )}
      </div>

      {!connected ? (
        <div className="flex flex-col items-center justify-center p-6 text-center border border-dashed border-slate-200 rounded-lg bg-slate-50/50">
          <Shield className="w-8 h-8 text-slate-300 mb-3" />
          <p className="text-sm font-medium text-slate-600 mb-1">Wallet Connection Required</p>
          <p className="text-xs text-slate-400 max-w-[300px]">
            Connect Lace to register a local voter secret and cast a sealed Midnight ballot.
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            <div className="rounded-lg border border-slate-200 bg-slate-50 p-3">
              <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider">Voting</span>
              <p className="text-sm font-semibold text-slate-900 mt-1">
                {electionState?.votingOpen === false ? 'Closed' : 'Open'}
              </p>
            </div>
            <div className="rounded-lg border border-slate-200 bg-slate-50 p-3">
              <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider">Registered</span>
              <p className="text-sm font-mono font-bold text-slate-900 mt-1">
                {electionState?.registeredCount?.toString() ?? '0'}
              </p>
            </div>
            <div className="rounded-lg border border-indigo-100 bg-indigo-50/50 p-3">
              <span className="text-[10px] font-semibold text-indigo-600 uppercase tracking-wider">Sealed Votes</span>
              <p className="text-sm font-mono font-bold text-indigo-950 mt-1">
                {electionState?.ballotCount?.toString() ?? '0'}
              </p>
            </div>
            <div className="rounded-lg border border-indigo-100 bg-indigo-50/50 p-3">
              <span className="text-[10px] font-semibold text-indigo-600 uppercase tracking-wider">Nullifiers</span>
              <p className="text-sm font-mono font-bold text-indigo-950 mt-1">
                {electionState?.usedNullifiers?.toString() ?? '0'}
              </p>
            </div>
          </div>

          {deploymentNotice && (
            <motion.div
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-start gap-2.5 rounded-lg bg-amber-50 border border-amber-200 p-3.5 text-xs text-amber-800 leading-relaxed"
            >
              <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
              <span>{deploymentNotice}</span>
            </motion.div>
          )}

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

          <div className="rounded-lg border border-slate-200 bg-slate-50 p-4 flex flex-col gap-3">
            <div className="flex items-start gap-2">
              <Lock className="w-4 h-4 text-indigo-500 mt-0.5 shrink-0" />
              <div>
                <p className="text-xs font-semibold text-slate-800">What the public ledger receives</p>
                <p className="text-xs text-slate-500 leading-relaxed mt-1">
                  A voter commitment, a one-use nullifier, and a salted ballot commitment. It does not receive your raw voter secret, choice, or ballot salt.
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <motion.button
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
              transition={spring}
              type="button"
              onClick={registerVoter}
              disabled={loading || !contractReady}
              className="w-full rounded-lg bg-slate-900 hover:bg-slate-800 text-white font-medium px-4 py-2.5 transition-colors duration-200 min-h-[44px] flex items-center justify-center gap-2 disabled:bg-slate-300 disabled:cursor-not-allowed"
            >
              <UserPlus className="w-4 h-4" />
              Register Local Voter Secret
            </motion.button>

            <div className="grid grid-cols-2 gap-2 rounded-lg bg-slate-100 p-1">
              <button
                type="button"
                onClick={() => setChoice(1)}
                disabled={loading}
                className={`rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                  choice === 1 ? 'bg-white text-slate-950 shadow-xs' : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                For
              </button>
              <button
                type="button"
                onClick={() => setChoice(0)}
                disabled={loading}
                className={`rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                  choice === 0 ? 'bg-white text-slate-950 shadow-xs' : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                Against
              </button>
            </div>

            <motion.button
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
              transition={spring}
              type="button"
              onClick={() => castVote(choice)}
              disabled={disabled}
              className="w-full rounded-lg bg-accent-blue hover:bg-indigo-600 text-white font-medium px-4 py-2.5 transition-colors duration-200 min-h-[44px] flex items-center justify-center gap-2 disabled:bg-slate-300 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Generating proof and sealing ballot...
                </>
              ) : (
                <>
                  <Shield className="w-4 h-4" />
                  Cast Sealed Vote
                </>
              )}
            </motion.button>

            <button
              type="button"
              onClick={closeVoting}
              disabled={loading || !contractReady || electionState?.votingOpen === false}
              className="w-full rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-medium px-4 py-2.5 transition-colors duration-200 min-h-[44px] flex items-center justify-center gap-2 disabled:bg-slate-50 disabled:text-slate-300 disabled:cursor-not-allowed"
            >
              <Ban className="w-4 h-4" />
              Close Ballot Box
            </button>
          </div>

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
                  <span>Transaction Submitted</span>
                </div>
                <span className="text-xs font-mono text-slate-800 break-all select-all leading-tight">
                  {txId}
                </span>
                <a
                  href={`https://explorer.preview.midnight.network/transactions/${txId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs text-accent-blue hover:text-indigo-600 transition-colors font-medium"
                >
                  Open in Explorer <ExternalLink className="w-3 h-3" />
                </a>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
};
