import { describe, expect, it } from 'vitest';
import * as compactRuntime from '@midnight-ntwrk/compact-runtime';
import * as suffraContract from '../managed/suffra/contract/index.js';

const dummyCoinPublicKey = () => new Uint8Array(32);

const bytes32 = (seed: number) => {
  const bytes = new Uint8Array(32);
  bytes.fill(seed);
  return bytes;
};

const sameBytes = (a: Uint8Array, b: Uint8Array) =>
  a.length === b.length && a.every((value, index) => value === b[index]);

const createInitialState = () => {
  const contract = new suffraContract.Contract({});
  const constructorContext = compactRuntime.createConstructorContext({}, dummyCoinPublicKey());
  const constructorResult = contract.initialState(constructorContext);
  return { contract, state: constructorResult.currentContractState };
};

const createContext = (state: compactRuntime.ContractState) =>
  compactRuntime.createCircuitContext(
    compactRuntime.dummyContractAddress(),
    dummyCoinPublicKey(),
    state,
    {},
  );

describe('Suffra sealed ballot contract', () => {
  it('initializes an open sealed ballot box with empty public state', () => {
    const { state } = createInitialState();
    const ledger = suffraContract.ledger(state.data);

    expect(ledger.votingOpen).toBe(true);
    expect(ledger.registeredCount).toBe(0n);
    expect(ledger.ballotCount).toBe(0n);
    expect(ledger.registeredVoters.isEmpty()).toBe(true);
    expect(ledger.usedNullifiers.isEmpty()).toBe(true);
    expect(ledger.sealedBallots.isEmpty()).toBe(true);
  });

  it('registers a private voter secret as a public commitment', () => {
    const { contract, state } = createInitialState();
    const voterSecret = bytes32(7);
    const results = contract.circuits.registerVoter(createContext(state), voterSecret);
    const ledger = suffraContract.ledger(results.context.currentQueryContext.state);
    const registeredCommitments = [...ledger.registeredVoters];

    expect(ledger.registeredCount).toBe(1n);
    expect(ledger.registeredVoters.size()).toBe(1n);
    expect(registeredCommitments).toHaveLength(1);
    expect(sameBytes(registeredCommitments[0], voterSecret)).toBe(false);
  });

  it('casts one sealed vote without writing the choice, secret, or salt to public ledger state', () => {
    const { contract, state } = createInitialState();
    const voterSecret = bytes32(11);
    const ballotSalt = bytes32(23);

    const registered = contract.circuits.registerVoter(createContext(state), voterSecret);
    const cast = contract.circuits.castVote(
      createContext(registered.context.currentQueryContext.state),
      1n,
      voterSecret,
      ballotSalt,
    );

    const ledger = suffraContract.ledger(cast.context.currentQueryContext.state);
    const sealedBallots = [...ledger.sealedBallots];
    const usedNullifiers = [...ledger.usedNullifiers];

    expect(ledger.ballotCount).toBe(1n);
    expect(ledger.usedNullifiers.size()).toBe(1n);
    expect(ledger.sealedBallots.size()).toBe(1n);
    expect(sealedBallots).toHaveLength(1);
    expect(usedNullifiers).toHaveLength(1);
    expect(sameBytes(sealedBallots[0], ballotSalt)).toBe(false);
    expect(sameBytes(sealedBallots[0], voterSecret)).toBe(false);
    expect(sameBytes(usedNullifiers[0], voterSecret)).toBe(false);
    expect(Object.keys(ledger)).not.toContain('choice');
    expect(Object.keys(ledger)).not.toContain('voterSecret');
    expect(Object.keys(ledger)).not.toContain('ballotSalt');
  });

  it('rejects duplicate voting with the same voter secret', () => {
    const { contract, state } = createInitialState();
    const voterSecret = bytes32(19);

    const registered = contract.circuits.registerVoter(createContext(state), voterSecret);
    const firstVote = contract.circuits.castVote(
      createContext(registered.context.currentQueryContext.state),
      0n,
      voterSecret,
      bytes32(31),
    );

    expect(() =>
      contract.circuits.castVote(
        createContext(firstVote.context.currentQueryContext.state),
        1n,
        voterSecret,
        bytes32(37),
      ),
    ).toThrow(/already cast/i);
  });

  it('rejects votes after the ballot box closes', () => {
    const { contract, state } = createInitialState();
    const voterSecret = bytes32(41);

    const registered = contract.circuits.registerVoter(createContext(state), voterSecret);
    const closed = contract.circuits.closeVoting(createContext(registered.context.currentQueryContext.state));

    expect(() =>
      contract.circuits.castVote(
        createContext(closed.context.currentQueryContext.state),
        1n,
        voterSecret,
        bytes32(43),
      ),
    ).toThrow(/closed/i);
  });
});
