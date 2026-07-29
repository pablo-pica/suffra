# Idea Submission — The Turn

## Selected Idea

Private Voting: anonymous ballots with publicly verifiable election integrity.

## Overview

Suffra is a Midnight voting product for groups that need secret ballots and public auditability. The current sealed-ballot MVP proves the privacy core: voters register a local secret, cast a valid choice, and publish only a commitment/nullifier trail instead of the raw vote.

## Alignment With Level 4-6

- **Level 4:** deploy the Suffra contract to Preprod, connect the frontend to the deployed address, publish the product profile, and record the MVP demo.
- **Level 5:** onboard Preprod users, collect feedback in `docs/FEEDBACK.md`, and maintain a user list.
- **Level 6:** add the final tally path, improve from feedback, and prepare a Mainnet or improved Preprod launch.

## Current Implementation Boundary

The implemented contract is a sealed-ballot MVP. It intentionally avoids per-vote public tally deltas because that pattern can reveal individual choices. Final tallying requires an aggregation or reveal design that preserves ballot secrecy.
