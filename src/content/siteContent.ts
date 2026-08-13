export const sourceContext = [
  {
    statistic: '375',
    label: 'complaints received before the 2023 BSKE',
    source: 'Inquirer.net',
    href: 'https://www.inquirer.net/434690/comelec-has-so-far-received-over-30-complaints-for-vote-buying/',
  },
  {
    statistic: '253',
    label: 'winning barangay and SK officials withheld from office over vote-buying cases',
    source: 'GMA News',
    href: 'https://www.gmanetwork.com/news/topstories/nation/924512/253-bske-winning-bets-unproclaimed-due-to-vote-buying-cases-comelec/story/',
  },
  {
    statistic: 'RA 10742',
    label: 'sets SK candidate eligibility restrictions concerning specified incumbent relatives',
    source: 'Lawphil',
    href: 'https://lawphil.net/statutes/repacts/ra2016/ra_10742_2016.html',
  },
] as const;

export const demoElection = {
  title: 'San Isidro Youth Council',
  office: 'SK Chairperson',
  district: 'Barangay San Isidro',
  date: '18 October 2026',
  note: 'Fictional names, place, date, and platforms for product demonstration only.',
  candidates: [
    {
      name: 'Althea Manalo',
      initials: 'AM',
      platform: 'Community learning hubs',
      detail: 'A study space and peer tutoring network after school.',
      accent: 'bg-hope-mint',
    },
    {
      name: 'Iñigo Valdez',
      initials: 'IV',
      platform: 'Safer routes home',
      detail: 'Youth-led lighting and neighborhood safety walks.',
      accent: 'bg-hope-sky/45',
    },
    {
      name: 'Soraya Banzon',
      initials: 'SB',
      platform: 'Greener shared spaces',
      detail: 'Small gardens and shaded places for youth activities.',
      accent: 'bg-hope-coral/25',
    },
    {
      name: 'Tavio Reyes',
      initials: 'TR',
      platform: 'Health and wellbeing',
      detail: 'Accessible sports, arts, and peer support sessions.',
      accent: 'bg-hope-blue/10',
    },
  ],
} as const;

export const developmentMilestones = [
  {
    state: 'Built today',
    title: 'Sealed ballot privacy core',
    detail: 'A voter can self-register a local secret, then use it once to create a sealed ballot commitment. Raw secrets and choices are not published on-chain.',
  },
  {
    state: 'On Preprod',
    title: 'Wallet-connected prototype',
    detail: 'The interface is wired for Lace Wallet on Midnight Preprod. With the local Docker prover, the smoke test verified registration, one sealed vote, and duplicate-vote rejection; eligibility and tally work remain future steps.',
  },
  {
    state: 'Next',
    title: 'Eligibility and verifiable tally',
    detail: 'Eligibility credentials and a final tally are not implemented. They need a safe protocol before Suffra can support a real election.',
  },
] as const;

export const faqs = [
  {
    question: 'Can someone see how I voted?',
    answer: 'Not from the public ledger in this MVP. Suffra stores a sealed ballot commitment, not your raw vote choice. The voter secret and ballot salt also stay private.',
  },
  {
    question: 'Is Suffra ready for an official SK election?',
    answer: 'No. This is a Preprod privacy prototype. It does not yet verify real-world voter eligibility or create a final tally, so it must not be used for an official election.',
  },
  {
    question: 'What can people audit today?',
    answer: 'Observers can inspect public registration and ballot counts, commitments, and one-use nullifiers. This helps show that the same registered secret cannot submit a second ballot.',
  },
  {
    question: 'Why use Midnight?',
    answer: 'Transparent ledgers can expose useful clues when vote choices or per-choice counts change publicly. Midnight lets Suffra prove ballot rules while keeping the raw choice out of public state.',
  },
] as const;
