import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { useState } from 'react';
import { Check, ChevronRight, MapPin, ShieldCheck, Sparkles } from 'lucide-react';
import { demoElection } from '../content/siteContent';

export function ElectionSimulation() {
  const [selectedCandidate, setSelectedCandidate] = useState<string | null>(null);
  const [isSealed, setIsSealed] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  const selectCandidate = (name: string) => {
    setSelectedCandidate(name);
    setIsSealed(false);
  };

  const resetSimulation = () => {
    setSelectedCandidate(null);
    setIsSealed(false);
  };

  return (
    <div className="mx-auto grid max-w-7xl gap-10 px-5 lg:grid-cols-[0.78fr_1.22fr] lg:items-center lg:px-8">
      <motion.div
        initial={shouldReduceMotion ? false : { opacity: 0, x: -18 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
      >
        <p className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-[0.14em] text-hope-blue">
          <Sparkles className="size-4" /> Example experience
        </p>
        <h2 className="mt-3 max-w-lg font-headings text-4xl font-bold leading-tight tracking-tight sm:text-5xl">
          A finished election product could feel this clear.
        </h2>
        <p className="mt-5 max-w-md text-base leading-7 text-hope-ink/65">
          The preview below shows how Suffra could present a complete SK election: a clear office, a small candidate slate, and a private ballot action that never asks a voter to prove their choice.
        </p>
        <div className="mt-7 border-l-2 border-hope-red pl-4 text-sm leading-6 text-hope-ink/65">
          <p className="font-semibold text-hope-ink">A fictional product preview</p>
          <p>{demoElection.note}</p>
        </div>
        <a
          href="#try-suffra"
          className="mt-8 inline-flex items-center gap-2 text-sm font-bold text-hope-blue transition-colors hover:text-hope-red"
        >
          Open the live privacy test <ChevronRight className="size-4" />
        </a>
      </motion.div>

      <motion.div
        initial={shouldReduceMotion ? false : { opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.45, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
        className="overflow-hidden rounded-[2rem] border border-hope-ink/10 bg-white shadow-hope"
      >
        <div className="border-b border-hope-ink/10 bg-hope-blue px-6 py-5 text-white sm:px-8">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <div className="flex flex-wrap items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-hope-mint">
                <span>Demo election</span>
                <span className="size-1 rounded-full bg-hope-coral" />
                <span>Not official</span>
              </div>
              <h3 className="mt-3 font-headings text-2xl font-bold tracking-tight">{demoElection.title}</h3>
              <p className="mt-1 text-sm text-white/65">{demoElection.office}</p>
            </div>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-white/20 px-3 py-1.5 text-xs font-semibold text-white/80">
              <MapPin className="size-3.5" /> {demoElection.district}
            </span>
          </div>
          <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-xs text-white/65">
            <span>Election day: {demoElection.date}</span>
            <span>Choose one candidate</span>
          </div>
        </div>

        <div className="p-5 sm:p-8">
          <div className="mb-5 flex items-center justify-between gap-4">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.14em] text-hope-blue">Candidate slate</p>
              <p className="mt-1 text-sm text-hope-ink/55">Select a platform to preview the voter journey.</p>
            </div>
            <span className="hidden items-center gap-1.5 text-xs font-semibold text-hope-ink/50 sm:inline-flex">
              <ShieldCheck className="size-4 text-hope-red" /> Privacy-first
            </span>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            {demoElection.candidates.map((candidate) => {
              const isSelected = selectedCandidate === candidate.name;
              return (
                <motion.button
                  key={candidate.name}
                  type="button"
                  layout
                  whileHover={shouldReduceMotion ? undefined : { y: -2 }}
                  whileTap={{ scale: 0.985 }}
                  onClick={() => selectCandidate(candidate.name)}
                  className={`group relative rounded-2xl border p-4 text-left transition-colors ${
                    isSelected
                      ? 'border-hope-blue bg-hope-blue text-white shadow-card'
                      : 'border-hope-ink/10 bg-hope-cream/35 text-hope-ink hover:border-hope-blue/40 hover:bg-hope-cream/70'
                  }`}
                  aria-pressed={isSelected}
                >
                  <div className="flex items-start gap-3">
                    <span className={`grid size-11 shrink-0 place-items-center rounded-xl font-headings text-sm font-bold ${isSelected ? 'bg-white/15 text-white' : `${candidate.accent} text-hope-ink`}`}>
                      {candidate.initials}
                    </span>
                    <span className="min-w-0">
                      <span className="flex items-center gap-2 font-headings text-sm font-bold">
                        {candidate.name}
                        {isSelected && <Check className="size-4" />}
                      </span>
                      <span className={`mt-1 block text-xs font-semibold ${isSelected ? 'text-hope-mint' : 'text-hope-red'}`}>
                        {candidate.platform}
                      </span>
                    </span>
                  </div>
                  <span className={`mt-3 block text-xs leading-5 ${isSelected ? 'text-white/70' : 'text-hope-ink/55'}`}>
                    {candidate.detail}
                  </span>
                </motion.button>
              );
            })}
          </div>

          <div className="mt-6 border-t border-hope-ink/10 pt-5">
            <AnimatePresence mode="wait">
              {isSealed ? (
                <motion.div
                  key="sealed"
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  role="status"
                  aria-live="polite"
                  className="flex flex-col gap-4 rounded-2xl bg-hope-mint/60 p-4 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div className="flex items-start gap-3">
                    <span className="grid size-9 shrink-0 place-items-center rounded-full bg-hope-blue text-white">
                      <Check className="size-4" />
                    </span>
                    <div>
                      <p className="text-sm font-bold text-hope-ink">Demo ballot sealed</p>
                      <p className="mt-1 text-xs leading-5 text-hope-ink/60">No wallet, proof, or transaction was used in this simulation.</p>
                    </div>
                  </div>
                  <button type="button" onClick={resetSimulation} className="text-left text-xs font-bold text-hope-blue hover:text-hope-red sm:text-right">
                    Start over
                  </button>
                </motion.div>
              ) : (
                <motion.div key="action" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <p className="text-xs leading-5 text-hope-ink/55">
                    {selectedCandidate ? `Ready to preview ${selectedCandidate}'s ballot.` : 'Choose a candidate to continue.'}
                  </p>
                  <motion.button
                    type="button"
                    whileHover={shouldReduceMotion ? undefined : { y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    disabled={!selectedCandidate}
                    onClick={() => setIsSealed(true)}
                    className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-hope-red px-5 text-sm font-bold text-white transition-colors hover:bg-hope-ink disabled:cursor-not-allowed disabled:bg-hope-ink/15 disabled:text-hope-ink/40"
                  >
                    Seal demo ballot <ChevronRight className="size-4" />
                  </motion.button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
