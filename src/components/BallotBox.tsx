import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Vote, Shield, RefreshCw, CheckCircle2, AlertTriangle, ExternalLink, UserPlus, Lock, Ban, Info, Sparkles, Check, Terminal } from 'lucide-react';
import { explorerTransactionUrl, resolveDappNetwork, resolveProofServerUrl } from '../config/network';
import { demoElection, demoDisclosures, type DemoCandidateId } from '../content/siteContent';
import { type UseMidnightResult } from '../hooks/useMidnight';
import { formatProofServerError, getBallotActionState } from '../utils/ballot-flow';

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
    isRegistered,
    registerVoter,
    castVote,
    closeVoting,
    refreshElection,
  } = midnight;

  const [candidateId, setCandidateId] = useState<DemoCandidateId | null>(null);
  const explorerUrl = txId
    ? explorerTransactionUrl(resolveDappNetwork(import.meta.env.VITE_MIDNIGHT_NETWORK), txId)
    : null;

  const spring = { type: 'spring', stiffness: 400, damping: 25 } as const;
  const buttonVariants = {
    hover: { scale: 1.02 },
    tap: { scale: 0.98 },
  };

  const ballotAction = getBallotActionState({
    connected,
    isRegistered: Boolean(isRegistered),
    candidateId,
    votingOpen: electionState?.votingOpen !== false,
    loading,
    contractReady,
  });

  const configuredProofServer = resolveProofServerUrl(import.meta.env.VITE_PROOF_SERVER_URL);
  const proofDiagnostics = error ? formatProofServerError(error, configuredProofServer) : null;

  return (
    <div className="w-full rounded-3xl border border-hope-ink/10 bg-white p-6 shadow-card transition-shadow duration-200 hover:shadow-elevated">
      {/* R3: Prominent Preprod Prototype and Fictional Demo Disclosures */}
      <div className="mb-4 flex flex-wrap items-center gap-2">
        <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-300 bg-amber-50 px-2.5 py-1 text-xs font-semibold text-amber-900">
          <Sparkles className="w-3.5 h-3.5 text-amber-600" />
          {demoDisclosures.prototypeBadge}
        </span>
        <span className="text-xs text-hope-ink/65 font-medium">
          {demoDisclosures.fictionalElectionNotice}
        </span>
      </div>

      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold font-headings text-hope-ink flex items-center gap-2">
          <Vote className="w-5 h-5 text-hope-red" />
          <span>
            <span className="block">Live Candidate Ballot</span>
            <span className="mt-1 block text-xs font-normal text-hope-ink/55">
              {demoElection.title} · {demoElection.office}
            </span>
          </span>
        </h2>
        {connected && (
          <button
            onClick={refreshElection}
            disabled={loading}
            className="p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-hope-cream transition-colors"
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
            Connect Lace to register a local voter secret and cast a sealed Midnight ballot on Preprod.
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            <div className="rounded-lg border border-hope-ink/10 bg-hope-cream/60 p-3">
              <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider">Voting</span>
              <p className="text-sm font-semibold text-slate-900 mt-1">
                {electionState?.votingOpen === false ? 'Closed' : 'Open'}
              </p>
            </div>
            <div className="rounded-lg border border-hope-ink/10 bg-hope-cream/60 p-3">
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

          {/* R4: Error handling with specific proof server guidance */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-lg border p-3.5 text-xs leading-relaxed"
            >
              {proofDiagnostics?.isProofServerError ? (
                <div className="flex items-start gap-2.5 text-red-800">
                  <AlertTriangle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                  <div className="space-y-1.5 flex-1">
                    <p className="font-bold text-red-900">Local Proof Server Offline</p>
                    <p className="text-red-700">
                      Cannot reach proof server at{' '}
                      <code className="bg-red-100 px-1 py-0.5 rounded font-mono font-semibold">
                        {proofDiagnostics.endpoint}
                      </code>.
                    </p>
                    <div className="mt-2 rounded bg-red-100/90 p-2 text-red-950 flex items-center gap-2 font-mono text-[11px]">
                      <Terminal className="w-3.5 h-3.5 shrink-0" />
                      <span>
                        Run: <strong>{proofDiagnostics.recoveryCommand}</strong>
                      </span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex items-start gap-2.5 text-red-700 font-mono">
                  <AlertTriangle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                  <span>{error}</span>
                </div>
              )}
            </motion.div>
          )}

          {/* R5: Step 1 — Register Local Voter Secret */}
          <div className="rounded-xl border border-hope-ink/10 bg-hope-cream/40 p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <span className="grid size-5 place-items-center rounded-full bg-hope-blue text-white text-[10px] font-bold">
                  1
                </span>
                <span className="text-xs font-bold text-hope-ink uppercase tracking-wider">
                  Step 1: Register Local Voter Secret
                </span>
              </div>
              {isRegistered ? (
                <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-full px-2.5 py-0.5">
                  <Check className="w-3 h-3" /> Registered Locally
                </span>
              ) : (
                <span className="text-xs font-medium text-amber-800 bg-amber-50 border border-amber-200 rounded-full px-2.5 py-0.5">
                  Required First
                </span>
              )}
            </div>
            <p className="text-xs text-slate-500 mb-3 leading-relaxed">
              Generates a local 32-byte voter secret on your machine and registers its cryptographic commitment on-chain. The raw secret remains on your local device and is never published on-chain.
            </p>
            <motion.button
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
              transition={spring}
              type="button"
              onClick={registerVoter}
              disabled={loading || !contractReady || electionState?.votingOpen === false || isRegistered}
              className={`w-full rounded-lg font-medium px-4 py-2.5 transition-colors duration-200 min-h-[44px] flex items-center justify-center gap-2 ${
                isRegistered
                  ? 'bg-emerald-50 text-emerald-800 border border-emerald-200 cursor-default'
                  : 'bg-hope-blue hover:bg-hope-ink text-white disabled:bg-slate-300 disabled:cursor-not-allowed'
              }`}
            >
              <UserPlus className="w-4 h-4" />
              {isRegistered ? 'Voter Secret Registered on This Device' : 'Register Local Voter Secret'}
            </motion.button>
          </div>

          {/* R5: Step 2 — Choose Candidate and Cast Sealed Ballot */}
          <div className="rounded-xl border border-hope-ink/10 bg-hope-cream/40 p-4 flex flex-col gap-3">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <span className="grid size-5 place-items-center rounded-full bg-hope-blue text-white text-[10px] font-bold">
                  2
                </span>
                <span className="text-xs font-bold text-hope-ink uppercase tracking-wider">
                  Step 2: Choose Candidate & Cast Ballot
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="rounded bg-amber-100/90 px-2 py-0.5 text-[10px] font-bold text-amber-900 uppercase tracking-wider">
                  {demoDisclosures.candidatesBadge}
                </span>
                <span className="text-[10px] font-semibold uppercase tracking-wider text-hope-red">
                  Private selection
                </span>
              </div>
            </div>

            <div className="grid gap-2 sm:grid-cols-2 mt-1">
              {demoElection.candidates.map((candidate) => {
                const selected = candidateId === candidate.id;
                return (
                  <button
                    key={candidate.id}
                    type="button"
                    onClick={() => setCandidateId(candidate.id)}
                    disabled={loading}
                    aria-pressed={selected}
                    className={`rounded-xl border p-3 text-left transition-colors ${
                      selected
                        ? 'border-hope-blue bg-hope-blue text-white shadow-card'
                        : 'border-hope-ink/10 bg-white text-hope-ink hover:border-hope-blue/40 hover:bg-hope-cream/70'
                    } disabled:cursor-not-allowed disabled:opacity-60`}
                  >
                    <span className="flex items-center gap-2.5">
                      <span
                        className={`grid size-9 shrink-0 place-items-center rounded-lg text-xs font-bold ${
                          selected ? 'bg-white/15 text-white' : `${candidate.accent} text-hope-ink`
                        }`}
                      >
                        {candidate.initials}
                      </span>
                      <span className="min-w-0">
                        <span className="block truncate text-sm font-semibold">{candidate.name}</span>
                        <span
                          className={`mt-0.5 block truncate text-[11px] ${
                            selected ? 'text-hope-mint' : 'text-hope-red'
                          }`}
                        >
                          {candidate.platform}
                        </span>
                      </span>
                    </span>
                  </button>
                );
              })}
            </div>

            <motion.button
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
              transition={spring}
              type="button"
              onClick={() => {
                if (candidateId !== null && ballotAction.canVote) castVote(candidateId);
              }}
              disabled={!ballotAction.canVote}
              className="w-full mt-2 rounded-lg bg-hope-red hover:bg-hope-ink text-white font-medium px-4 py-2.5 transition-colors duration-200 min-h-[44px] flex items-center justify-center gap-2 disabled:bg-slate-300 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
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

            {/* R5: Gating explanation / precise reason if vote is disabled */}
            {ballotAction.voteDisabledReason && !loading && (
              <p className="text-xs text-slate-500 text-center flex items-center justify-center gap-1.5 mt-0.5">
                <Info className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                <span>{ballotAction.voteDisabledReason}</span>
              </p>
            )}
          </div>

            <button
              type="button"
              onClick={closeVoting}
              disabled={loading || !contractReady || electionState?.votingOpen === false}
              className="w-full rounded-lg border border-hope-ink/15 bg-white hover:bg-hope-cream text-hope-ink font-medium px-4 py-2.5 transition-colors duration-200 min-h-[44px] flex items-center justify-center gap-2 disabled:bg-slate-50 disabled:text-slate-300 disabled:cursor-not-allowed"
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
                  <CheckCircle2 className="w-5 h-5 text-hope-red" />
                  <span>Transaction Submitted</span>
                </div>
                <span className="text-xs font-mono text-slate-800 break-all select-all leading-tight">
                  {txId}
                </span>
                {explorerUrl && (
                  <a
                    href={explorerUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs text-hope-red hover:text-indigo-600 transition-colors font-medium"
                  >
                    Open in Explorer <ExternalLink className="w-3 h-3" />
                  </a>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
};
