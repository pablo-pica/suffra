import { motion, useReducedMotion } from 'framer-motion';
import {
  ArrowDown,
  ArrowUpRight,
  CheckCircle2,
  ChevronDown,
  ExternalLink,
  Eye,
  Fingerprint,
  LockKeyhole,
  Network,
  ShieldCheck,
  Sparkles,
  Vote,
} from 'lucide-react';
import { type UseMidnightResult } from '../hooks/useMidnight';
import { resolveDappNetwork } from '../config/network';
import { developmentMilestones, faqs, sourceContext } from '../content/siteContent';
import { BallotBox } from './BallotBox';
import { WalletConnect } from './WalletConnect';

interface LandingPageProps {
  midnight: UseMidnightResult;
}

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] as const },
};

export function LandingPage({ midnight }: LandingPageProps) {
  const networkName = resolveDappNetwork(import.meta.env.VITE_MIDNIGHT_NETWORK);
  const shouldReduceMotion = useReducedMotion();
  const reveal = shouldReduceMotion ? { initial: false, animate: { opacity: 1 } } : fadeInUp;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 selection:bg-blue-100">
      <header className="sticky top-0 z-50 border-b border-slate-200 bg-slate-50/90 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <a className="flex items-center gap-2.5" href="#top" aria-label="Suffra home">
            <span className="grid size-9 place-items-center rounded-lg bg-navy-950 text-white"><ShieldCheck className="size-5" /></span>
            <span className="font-headings text-lg font-bold tracking-tight">Suffra</span>
          </a>
          <nav className="hidden items-center gap-6 text-sm font-medium text-slate-600 md:flex" aria-label="Main navigation">
            <a className="hover:text-slate-950" href="#how-it-works">How it works</a>
            <a className="hover:text-slate-950" href="#progress">Development</a>
            <a className="hover:text-slate-950" href="#faqs">FAQs</a>
          </nav>
          <a className="inline-flex min-h-10 items-center gap-1.5 rounded-lg bg-navy-950 px-3 text-sm font-semibold text-white hover:bg-navy-800" href="#try-suffra">
            Try the MVP <ArrowDown className="size-4" />
          </a>
        </div>
      </header>

      <main id="top">
        <section className="border-b border-slate-200 bg-white">
          <div className="mx-auto grid max-w-6xl gap-12 px-4 py-16 sm:px-6 lg:grid-cols-[1.15fr_0.85fr] lg:px-8 lg:py-24">
            <motion.div {...reveal}>
              <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-3 py-1.5 text-xs font-semibold text-blue-800">
                <Sparkles className="size-3.5" /> Private voting prototype for Filipino youth
              </p>
              <h1 className="max-w-3xl font-headings text-4xl font-bold leading-tight tracking-tight text-navy-950 sm:text-5xl">
                Your vote should be yours alone. <span className="text-accent-blue">Boto mo, lihim mo.</span>
              </h1>
              <p className="mt-6 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">
                Suffra is building a safer foundation for SK elections: a way to prove one sealed ballot was cast without placing a young voter&apos;s choice on a public ledger.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-accent-blue px-5 text-sm font-semibold text-white hover:bg-indigo-600" href="#try-suffra">
                  Explore the Preprod MVP <ArrowDown className="size-4" />
                </a>
                <a className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg border border-slate-300 bg-white px-5 text-sm font-semibold text-slate-700 hover:bg-slate-50" href="#how-it-works">
                  See how privacy works <ArrowDown className="size-4" />
                </a>
              </div>
              <p className="mt-4 text-xs leading-5 text-slate-500">Prototype only — not for an official election. Eligibility verification and final tally are still future work.</p>
            </motion.div>
            <motion.aside {...reveal} transition={shouldReduceMotion ? { duration: 0 } : { ...fadeInUp.transition, delay: 0.12 }} className="border-l-4 border-accent-blue bg-slate-50 p-6 sm:p-8">
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-slate-500">A civic problem, not a crypto gimmick</p>
              <p className="mt-4 font-headings text-xl font-semibold leading-8 text-navy-950">When a community is small, pressure around a ballot can feel very personal.</p>
              <p className="mt-4 text-sm leading-6 text-slate-600">Suffra explores whether privacy-preserving technology can give Katipunan ng Kabataan members more confidence that their choice stays theirs.</p>
              <a href="#context" className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-accent-blue hover:text-indigo-700">Read the context <ArrowDown className="size-4" /></a>
            </motion.aside>
          </div>
        </section>

        <section id="how-it-works" className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
          <motion.div {...reveal} className="max-w-2xl">
            <p className="text-sm font-bold uppercase tracking-[0.14em] text-accent-blue">Privacy by design</p>
            <h2 className="mt-3 font-headings text-3xl font-bold tracking-tight text-navy-950">What Suffra protects — and what it proves</h2>
          </motion.div>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {[
              { icon: LockKeyhole, title: 'Keep your choice private', copy: 'Your voter secret, vote choice, and ballot salt are private inputs. They are not written to the public ledger.' },
              { icon: Fingerprint, title: 'Prevent duplicate ballots', copy: 'A one-use nullifier lets the prototype prove that the same registered secret cannot vote twice.' },
              { icon: Eye, title: 'Make the process inspectable', copy: 'Public commitments and counts allow observers to audit activity without learning a voter’s raw choice.' },
            ].map(({ icon: Icon, title, copy }) => (
              <motion.article {...reveal} key={title} className="border border-slate-200 bg-white p-6 shadow-card">
                <span className="grid size-10 place-items-center rounded-lg bg-blue-50 text-accent-blue"><Icon className="size-5" /></span>
                <h3 className="mt-5 font-headings text-lg font-bold">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">{copy}</p>
              </motion.article>
            ))}
          </div>
        </section>

        <section id="context" className="border-y border-slate-200 bg-navy-950 text-white">
          <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
            <motion.div {...reveal} className="max-w-2xl"><p className="text-sm font-bold uppercase tracking-[0.14em] text-blue-300">Why this matters</p><h2 className="mt-3 font-headings text-3xl font-bold tracking-tight">A future where a young person can vote without needing to prove their choice to anyone.</h2></motion.div>
            <div className="mt-10 grid gap-4 md:grid-cols-3">
              {sourceContext.map(({ statistic, label, source, href }) => (
                <article key={statistic} className="border border-navy-700 bg-navy-900 p-6">
                  <p className="font-headings text-3xl font-bold text-blue-300">{statistic}</p><p className="mt-3 text-sm leading-6 text-slate-200">{label}</p>
                  <a className="mt-5 inline-flex items-center gap-1 text-xs font-semibold text-blue-300 hover:text-white" href={href} target="_blank" rel="noreferrer">Source: {source} <ExternalLink className="size-3" /></a>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="progress" className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
          <motion.div {...reveal} className="flex max-w-3xl flex-col gap-3"><p className="text-sm font-bold uppercase tracking-[0.14em] text-accent-blue">Honest progress</p><h2 className="font-headings text-3xl font-bold tracking-tight text-navy-950">We will not call an MVP an election system.</h2><p className="text-slate-600">Suffra is a development prototype. Here is what is available now and what needs more work before it can support people&apos;s democratic rights.</p></motion.div>
          <div className="mt-8 space-y-4">{developmentMilestones.map(({ state, title, detail }, index) => <motion.article {...reveal} key={title} className="grid gap-4 border border-slate-200 bg-white p-5 sm:grid-cols-[9rem_1fr] sm:items-start"><span className={`w-fit rounded-full px-3 py-1 text-xs font-bold ${index === 2 ? 'bg-amber-50 text-amber-800' : 'bg-green-50 text-green-800'}`}>{state}</span><div><h3 className="font-headings text-lg font-bold">{title}</h3><p className="mt-1 text-sm leading-6 text-slate-600">{detail}</p></div></motion.article>)}</div>
        </section>

        <section id="try-suffra" className="border-y border-blue-100 bg-blue-50/60">
          <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
            <motion.div {...reveal} className="max-w-3xl"><p className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-[0.14em] text-accent-blue"><Network className="size-4" /> {networkName} test environment</p><h2 className="mt-3 font-headings text-3xl font-bold tracking-tight text-navy-950">Try the sealed-ballot prototype</h2><p className="mt-3 text-slate-600">For testers with Lace Wallet (Midnight edition). This area keeps the existing wallet and contract flow intact; it is clearly separated from Suffra&apos;s public product story.</p></motion.div>
            <div className="mt-8 grid items-start gap-6 lg:grid-cols-12"><div className="lg:col-span-5"><WalletConnect midnight={midnight} /></div><div className="lg:col-span-7"><BallotBox midnight={midnight} /></div></div>
          </div>
        </section>

        <section id="faqs" className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
          <motion.div {...reveal} className="text-center"><p className="text-sm font-bold uppercase tracking-[0.14em] text-accent-blue">Questions, answered</p><h2 className="mt-3 font-headings text-3xl font-bold tracking-tight text-navy-950">FAQs</h2></motion.div>
          <div className="mt-8 divide-y divide-slate-200 border-y border-slate-200">{faqs.map(({ question, answer }) => <details key={question} className="group py-5"><summary className="flex cursor-pointer list-none items-center justify-between gap-6 font-headings text-base font-bold text-slate-900">{question}<ChevronDown className="size-5 shrink-0 text-slate-500 transition-transform group-open:rotate-180" /></summary><p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600">{answer}</p></details>)}</div>
        </section>
      </main>

      <footer className="border-t border-navy-800 bg-navy-950 text-slate-300"><div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-8 text-sm sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8"><p>© 2026 Suffra · Building private voting infrastructure with care.</p><div className="flex gap-5"><a className="hover:text-white" href="https://midnight.network" target="_blank" rel="noreferrer">Midnight Network</a><a className="hover:text-white" href="https://lace.io" target="_blank" rel="noreferrer">Lace Wallet</a></div></div></footer>
    </div>
  );
}
