import { motion, useReducedMotion } from 'framer-motion';
import {
  ArrowDown,
  ArrowRight,
  CheckCircle2,
  ChevronDown,
  ExternalLink,
  Eye,
  Fingerprint,
  Heart,
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

const reveal = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] as const },
};

function HeroArtwork() {
  return (
    <div className="relative isolate min-h-[430px] overflow-hidden rounded-[2rem] bg-hope-blue p-6 text-white shadow-hope sm:min-h-[520px] sm:p-10">
      <div className="absolute -right-20 -top-12 size-72 rounded-full bg-hope-sky" />
      <div className="absolute -bottom-28 -left-24 size-80 rounded-full bg-hope-coral" />
      <div className="absolute bottom-10 right-8 size-24 rounded-full border-[18px] border-white/20" />
      <div className="relative flex h-full min-h-[382px] flex-col justify-between sm:min-h-[440px]">
        <span className="inline-flex w-fit items-center gap-2 rounded-full bg-white/15 px-3 py-1.5 text-xs font-bold backdrop-blur">
          <Heart className="size-3.5 fill-current" /> Para sa kabataang Pilipino
        </span>
        <div className="max-w-sm">
          <p className="font-headings text-4xl font-bold leading-none tracking-tight sm:text-5xl">A vote is a voice.</p>
          <p className="mt-4 max-w-xs text-sm leading-6 text-white/80">Suffra protects the space between a young person and their choice.</p>
        </div>
        <div className="flex w-fit items-center gap-3 rounded-2xl bg-white px-4 py-3 text-hope-ink shadow-card">
          <span className="grid size-9 place-items-center rounded-full bg-hope-mint"><ShieldCheck className="size-5 text-hope-blue" /></span>
          <span><span className="block text-xs font-bold">Sealed ballot</span><span className="block text-[11px] text-slate-500">Private by design</span></span>
        </div>
      </div>
    </div>
  );
}

export function LandingPage({ midnight }: LandingPageProps) {
  const networkName = resolveDappNetwork(import.meta.env.VITE_MIDNIGHT_NETWORK);
  const shouldReduceMotion = useReducedMotion();
  const animation = shouldReduceMotion ? { initial: false, animate: { opacity: 1 } } : reveal;
  const cardAnimation = (index: number) => shouldReduceMotion
    ? animation
    : { ...reveal, transition: { ...reveal.transition, delay: index * 0.08 } };

  return (
    <div className="min-h-screen bg-hope-cream text-hope-ink selection:bg-hope-mint">
      <header className="sticky top-0 z-50 border-b border-hope-ink/10 bg-hope-cream/90 backdrop-blur">
        <div className="mx-auto flex h-[4.5rem] max-w-7xl items-center justify-between px-5 lg:px-8">
          <a className="flex items-center gap-2.5" href="#top" aria-label="Suffra home">
            <span className="grid size-9 place-items-center rounded-full bg-hope-blue text-white"><ShieldCheck className="size-5" /></span>
            <span className="font-headings text-lg font-bold tracking-tight">Suffra</span>
          </a>
          <nav className="hidden items-center gap-7 text-sm font-semibold text-hope-ink/70 md:flex" aria-label="Main navigation">
            <a className="hover:text-hope-blue" href="#how-it-works">How it works</a>
            <a className="hover:text-hope-blue" href="#progress">Our progress</a>
            <a className="hover:text-hope-blue" href="#faqs">FAQs</a>
          </nav>
          <motion.a whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }} className="inline-flex min-h-10 items-center gap-2 rounded-full bg-hope-red px-4 text-sm font-bold text-white transition-colors hover:bg-hope-ink" href="#try-suffra">
            Try the MVP <ArrowRight className="size-4" />
          </motion.a>
        </div>
      </header>

      <main id="top">
        <section className="overflow-hidden">
          <div className="mx-auto grid max-w-7xl gap-10 px-5 pb-16 pt-12 lg:grid-cols-[0.95fr_1.05fr] lg:items-center lg:px-8 lg:pb-24 lg:pt-20">
            <motion.div {...animation}>
              <p className="mb-6 inline-flex items-center gap-2 rounded-full border border-hope-blue/15 bg-white px-3 py-1.5 text-xs font-bold text-hope-blue">
                <Sparkles className="size-3.5" /> Private voting prototype for Filipino youth
              </p>
              <h1 className="max-w-2xl font-headings text-5xl font-bold leading-[0.98] tracking-[-0.055em] text-hope-ink sm:text-6xl lg:text-7xl">
                Your vote should be <span className="text-hope-blue">yours alone.</span>
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-8 text-hope-ink/70">
                <span className="font-semibold text-hope-ink">Boto mo, lihim mo.</span> Suffra is building a safer foundation for SK elections—one sealed ballot, without putting a young voter&apos;s choice on a public ledger.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <motion.a whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-hope-red px-6 text-sm font-bold text-white transition-colors hover:bg-hope-ink" href="#try-suffra">
                  Explore the Preprod MVP <ArrowDown className="size-4" />
                </motion.a>
                <motion.a whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-hope-ink/15 bg-white px-6 text-sm font-bold text-hope-ink transition-colors hover:border-hope-red hover:text-hope-red" href="#how-it-works">
                  How your choice stays private <ArrowRight className="size-4" />
                </motion.a>
              </div>
              <p className="mt-5 text-xs leading-5 text-hope-ink/55">Prototype only—not for an official election. Eligibility verification and final tally are future work.</p>
            </motion.div>
            <motion.div {...animation} transition={shouldReduceMotion ? { duration: 0 } : { ...reveal.transition, delay: 0.12 }}>
              <HeroArtwork />
            </motion.div>
          </div>
        </section>

        <section id="how-it-works" className="bg-white py-20 lg:py-28">
          <div className="mx-auto max-w-7xl px-5 lg:px-8">
            <motion.div {...animation} className="grid gap-5 lg:grid-cols-[0.75fr_1fr] lg:items-end"><div><p className="text-sm font-bold uppercase tracking-[0.14em] text-hope-blue">A safer kind of proof</p><h2 className="mt-3 max-w-md font-headings text-4xl font-bold leading-tight tracking-tight">Your ballot can be private and accountable.</h2></div><p className="max-w-xl text-base leading-7 text-hope-ink/65">Suffra uses privacy-preserving commitments so the public can inspect the process without receiving the raw details that make a voter vulnerable.</p></motion.div>
            <div className="mt-12 grid gap-5 md:grid-cols-3">
              {[
                { icon: LockKeyhole, eyebrow: 'Private', title: 'Your choice stays yours', copy: 'The voter secret, vote choice, and ballot salt are private inputs. They are never written to the public ledger.' },
                { icon: Fingerprint, eyebrow: 'Proved', title: 'One secret, one ballot', copy: 'A one-use nullifier prevents the same registered secret from submitting another sealed vote.' },
                { icon: Eye, eyebrow: 'Visible', title: 'The process stays inspectable', copy: 'Public commitments and counts make activity auditable without revealing a young voter’s raw choice.' },
              ].map(({ icon: Icon, eyebrow, title, copy }, index) => (
                <motion.article {...cardAnimation(index)} whileHover={shouldReduceMotion ? undefined : { y: -4 }} key={title} className={`rounded-3xl p-7 transition-shadow hover:shadow-card ${index === 1 ? 'bg-hope-mint' : 'bg-hope-cream'}`}>
                  <span className="grid size-11 place-items-center rounded-full bg-white text-hope-blue"><Icon className="size-5" /></span><p className="mt-7 text-xs font-bold uppercase tracking-[0.14em] text-hope-blue">{eyebrow}</p><h3 className="mt-2 font-headings text-xl font-bold">{title}</h3><p className="mt-3 text-sm leading-6 text-hope-ink/65">{copy}</p>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        <section id="context" className="bg-hope-blue py-20 text-white lg:py-28">
          <div className="mx-auto max-w-7xl px-5 lg:px-8"><motion.div {...animation} className="max-w-2xl"><p className="text-sm font-bold uppercase tracking-[0.14em] text-hope-mint">Why this matters</p><h2 className="mt-3 font-headings text-4xl font-bold leading-tight tracking-tight">A future where young people can vote without proving their choice to anyone.</h2></motion.div>
            <div className="mt-12 grid gap-px overflow-hidden rounded-3xl bg-white/20 md:grid-cols-3">{sourceContext.map(({ statistic, label, source, href }, index) => <motion.article {...cardAnimation(index)} whileHover={shouldReduceMotion ? undefined : { y: -3 }} key={statistic} className="bg-hope-blue p-7"><p className="font-headings text-4xl font-bold text-hope-coral">{statistic}</p><p className="mt-4 min-h-14 text-sm leading-6 text-white/80">{label}</p><a className="mt-7 inline-flex items-center gap-1 text-xs font-bold text-hope-mint hover:text-white" href={href} target="_blank" rel="noreferrer">Source: {source} <ExternalLink className="size-3" /></a></motion.article>)}</div>
          </div>
        </section>

        <section id="progress" className="py-20 lg:py-28">
          <div className="mx-auto grid max-w-7xl gap-10 px-5 lg:grid-cols-[0.7fr_1fr] lg:px-8"><motion.div {...animation}><p className="text-sm font-bold uppercase tracking-[0.14em] text-hope-blue">Honest progress</p><h2 className="mt-3 font-headings text-4xl font-bold leading-tight tracking-tight">We will not call an MVP an election system.</h2><p className="mt-5 max-w-md leading-7 text-hope-ink/65">Suffra is a development prototype. The work ahead matters because democratic rights deserve more than a polished interface.</p></motion.div>
            <div className="space-y-4">{developmentMilestones.map(({ state, title, detail }, index) => <motion.article {...cardAnimation(index)} whileHover={shouldReduceMotion ? undefined : { y: -3 }} key={title} className="grid gap-4 rounded-2xl bg-white p-6 shadow-card transition-shadow hover:shadow-elevated sm:grid-cols-[7.5rem_1fr]"><span className={`w-fit rounded-full px-3 py-1.5 text-xs font-bold ${index === 2 ? 'bg-hope-coral/45 text-hope-ink' : 'bg-hope-mint text-hope-blue'}`}>{state}</span><div><h3 className="font-headings text-lg font-bold">{title}</h3><p className="mt-1.5 text-sm leading-6 text-hope-ink/65">{detail}</p></div></motion.article>)}</div>
          </div>
        </section>

        <section id="try-suffra" className="bg-hope-mint py-20 lg:py-28">
          <div className="mx-auto max-w-7xl px-5 lg:px-8"><motion.div {...animation} className="max-w-3xl"><p className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-[0.14em] text-hope-blue"><Network className="size-4" /> {networkName} test environment</p><h2 className="mt-3 font-headings text-4xl font-bold leading-tight tracking-tight">Try the sealed-ballot prototype</h2><p className="mt-4 text-hope-ink/65">For testers with Lace Wallet (Midnight edition). This working area is separate from the public product story—and it retains the existing wallet and contract flow.</p></motion.div>
            <div className="mt-10 grid items-start gap-6 lg:grid-cols-12"><div className="lg:col-span-5"><WalletConnect midnight={midnight} /></div><div className="lg:col-span-7"><BallotBox midnight={midnight} /></div></div>
          </div>
        </section>

        <section id="faqs" className="bg-white py-20 lg:py-28">
          <div className="mx-auto max-w-3xl px-5"><motion.div {...animation} className="text-center"><p className="text-sm font-bold uppercase tracking-[0.14em] text-hope-blue">Questions, answered</p><h2 className="mt-3 font-headings text-4xl font-bold tracking-tight">FAQs</h2></motion.div><div className="mt-10 divide-y divide-hope-ink/10 border-y border-hope-ink/10">{faqs.map(({ question, answer }) => <details key={question} className="group py-6"><summary className="flex cursor-pointer list-none items-center justify-between gap-6 font-headings text-base font-bold"><span>{question}</span><ChevronDown className="size-5 shrink-0 text-hope-blue transition-transform group-open:rotate-180" /></summary><p className="mt-3 max-w-2xl text-sm leading-6 text-hope-ink/65">{answer}</p></details>)}</div></div>
        </section>
      </main>

      <footer className="bg-hope-ink text-white"><div className="mx-auto flex max-w-7xl flex-col gap-5 px-5 py-10 sm:flex-row sm:items-center sm:justify-between lg:px-8"><div><p className="font-headings text-lg font-bold">Suffra</p><p className="mt-1 text-sm text-white/60">Private voting infrastructure, built with care.</p></div><div className="flex gap-5 text-sm font-semibold text-white/70"><a className="hover:text-white" href="https://midnight.network" target="_blank" rel="noreferrer">Midnight Network</a><a className="hover:text-white" href="https://lace.io" target="_blank" rel="noreferrer">Lace Wallet</a></div></div></footer>
    </div>
  );
}
