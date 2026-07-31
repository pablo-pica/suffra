# Idea Submission - Suffra for SK Elections

> **Status:** Approved at The Turn. This file preserves the submitted answers. Product intent here is not a statement that every capability is implemented; current boundaries are documented in [`PROPOSAL.md`](../PROPOSAL.md) and [`README.md`](../README.md).

## Question 1: What is your idea?

Growing up in Valenzuela City, I watched Sangguniang Kabataan elections play out the same way every cycle. A few days before the vote, envelopes would start going around. P300, P500 tucked inside, sometimes with a sample ballot. Everyone in the barangay knew who was handing them out. Nobody talked about it openly because the people running for SK chair were often the sons, daughters, or nephews of the sitting barangay captain. You don't complain about the family that runs the barangay you live in.

This isn't just my neighborhood. COMELEC later reported receiving 375 complaints in the period leading to the 2023 BSKE, and 253 winning barangay and SK officials were subsequently withheld from taking office over vote-buying cases. In Navotas, near Valenzuela in the CAMANAVA area, a Malabon resident was reportedly caught in a warehouse distributing envelopes containing P300 to P500 to around 200 registered Malabon voters; reports said any connection to candidates or officials was still under investigation. Then there's the dynasty side. RA 10742 bars SK candidates related within the second civil degree of consanguinity or affinity to specified incumbent elected officials in the locality where they seek election.

Both problems come down to one thing: votes are traceable. When your barangay is small enough that your precinct captain knows your family, your vote isn't really secret. And when a political family controls the election machinery, there's no way for ordinary Katipunan ng Kabataan members to prove the final count wasn't tampered with.

Suffra is a private voting app I'm building on the Midnight Network. Instead of recording who voted for whom, the current prototype stores cryptographic commitments on the public ledger. A registered local secret can cast one sealed ballot without publishing the raw choice. Anyone can audit registration and ballot counts, commitments, and nullifier use on-chain; real-world eligibility proofs and a final verifiable tally are not implemented yet.

The intended outcome is that an on-chain observer cannot trace a sealed ballot choice back to a voter or confirm that someone voted "correctly." The current one-use nullifier prevents the same registered secret from voting twice, while stronger eligibility and tally controls remain future work.

I already have a working prototype of that privacy core: commitment-based registration, sealed ballot commitments, and one-ballot-per-registered-secret enforcement. For Level 4, I plan to take this MVP live on Preprod, document the full user flow, verify CI/CD, and launch the product's public profile.

Long term, I want this to be something Filipino youth councils could actually use for a cleaner SK election. But for now, the goal is proving the privacy layer works and making it real enough that people outside of crypto can see how a secret ballot should actually work.

## Question 2: Choose a category

Identity/credentials

## Sources

- [COMELEC received 375 complaints leading to the 2023 BSKE](https://www.inquirer.net/434690/comelec-has-so-far-received-over-30-complaints-for-vote-buying/)
- [253 winning BSKE officials were withheld from taking office](https://www.gmanetwork.com/news/topstories/nation/924512/253-bske-winning-bets-unproclaimed-due-to-vote-buying-cases-comelec/story/)
- [Navotas warehouse report: P300-P500 envelopes and about 200 registered Malabon voters](https://www.sunstar.com.ph/manila/city-barangay-officials-tagged-in-navotas-vote-buying-act)
- [Republic Act No. 10742, Section 10](https://lawphil.net/statutes/repacts/ra2016/ra_10742_2016.html)
