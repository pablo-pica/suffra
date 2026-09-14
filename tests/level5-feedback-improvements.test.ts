import { describe, expect, it, vi } from 'vitest';
import { demoDisclosures, preflightChecklist } from '../src/content/siteContent';
import {
  executeRegistration,
  formatProofServerError,
  getBallotActionState,
} from '../src/utils/ballot-flow';
describe('Level 5 Feedback Improvements (R3–R6)', () => {
  describe('R3: Demo and Fictional Status Disclosures', () => {
    it('provides prominent Preprod prototype and fictional demo disclosures for the ballot area', () => {
      expect(demoDisclosures.prototypeBadge.toLowerCase()).toContain('preprod prototype');
      expect(demoDisclosures.fictionalElectionNotice.toLowerCase()).toContain('fictional');
      expect(demoDisclosures.fictionalElectionNotice.toLowerCase()).toContain('demo');
      expect(demoDisclosures.candidatesBadge.toLowerCase()).toContain('fictional candidates');
      expect(demoDisclosures.ballotActionNote.toLowerCase()).toContain('preprod');
    });
  });

  describe('R4: Preflight Checklist and Proof Server Guidance', () => {
    it('exposes a 3-step preflight naming Lace Midnight edition, Preprod, and the local proof server', () => {
      expect(preflightChecklist).toHaveLength(3);

      const itemsText = preflightChecklist.map((item) => `${item.title} ${item.description}`).join(' ');

      expect(itemsText).toContain('Lace');
      expect(itemsText).toContain('Midnight');
      expect(itemsText).toContain('Preprod');
      expect(itemsText).toContain('proof server');
      expect(itemsText).toContain('6300');
      expect(itemsText).toContain('npm run proof-server:start');
    });

    it('formats proof-server offline errors with the configured endpoint and recovery command', () => {
      const err = new Error('Failed to fetch');
      const diagnostics = formatProofServerError(err, 'http://127.0.0.1:6300');

      expect(diagnostics.isProofServerError).toBe(true);
      expect(diagnostics.endpoint).toBe('http://127.0.0.1:6300');
      expect(diagnostics.recoveryCommand).toBe('npm run proof-server:start');
      expect(diagnostics.formattedMessage).toContain('127.0.0.1:6300');
      expect(diagnostics.formattedMessage).toContain('npm run proof-server:start');
    });
  });

  describe('R5: Register-then-Vote Sequence and Local Registration Gating', () => {
    it('holds the vote action until local registration is confirmed and provides a precise reason', () => {
      // 1. Connected, but not registered -> cannot vote, must register first
      const unregisteredState = getBallotActionState({
        connected: true,
        isRegistered: false,
        candidateId: 1,
        votingOpen: true,
        loading: false,
        contractReady: true,
      });

      expect(unregisteredState.canRegister).toBe(true);
      expect(unregisteredState.canVote).toBe(false);
      expect(unregisteredState.currentStep).toBe(1);
      expect(unregisteredState.voteDisabledReason).toMatch(/register.*secret/i);

      // 2. Registered, but no candidate selected -> cannot vote, must pick candidate
      const noCandidateState = getBallotActionState({
        connected: true,
        isRegistered: true,
        candidateId: null,
        votingOpen: true,
        loading: false,
        contractReady: true,
      });

      expect(noCandidateState.canVote).toBe(false);
      expect(noCandidateState.currentStep).toBe(2);
      expect(noCandidateState.voteDisabledReason).toMatch(/choose|select.*candidate/i);

      // 3. Registered and candidate selected -> can vote
      const readyState = getBallotActionState({
        connected: true,
        isRegistered: true,
        candidateId: 2,
        votingOpen: true,
        loading: false,
        contractReady: true,
      });

      expect(readyState.canVote).toBe(true);
      expect(readyState.currentStep).toBe(2);
      expect(readyState.voteDisabledReason).toBeNull();

      // 4. Voting closed -> cannot vote or register
      const closedState = getBallotActionState({
        connected: true,
        isRegistered: true,
        candidateId: 2,
        votingOpen: false,
        loading: false,
        contractReady: true,
      });

      expect(closedState.canVote).toBe(false);
      expect(closedState.canRegister).toBe(false);
      expect(closedState.voteDisabledReason).toMatch(/closed/i);
    });

    it('regression: does not mark registration as successful if transaction fails or is rejected', async () => {
      const onSuccess = vi.fn();
      const mockEnsureContract = vi.fn();
      const mockGetSecret = vi.fn(() => new Uint8Array(32));
      const mockCallRegister = vi.fn().mockResolvedValue({ tx: 'dummy' });

      // Case A: runTransaction returns false (failure/rejection/offline)
      const mockRunTxFailure = vi.fn().mockResolvedValue(false);
      const resultA = await executeRegistration({
        ensureContract: mockEnsureContract,
        getSecret: mockGetSecret,
        runTransaction: mockRunTxFailure,
        callRegister: mockCallRegister,
        onSuccess,
      });

      expect(resultA).toBe(false);
      expect(onSuccess).not.toHaveBeenCalled();

      // Verify that in this failed registration state, voting remains blocked
      const stateAfterFailure = getBallotActionState({
        connected: true,
        isRegistered: false,
        candidateId: 0,
        votingOpen: true,
        loading: false,
        contractReady: true,
      });
      expect(stateAfterFailure.canVote).toBe(false);
      expect(stateAfterFailure.voteDisabledReason).toMatch(/register.*secret/i);

      // Case B: ensureContract throws (e.g. no DUST or not ready)
      const mockEnsureThrows = vi.fn(() => {
        throw new Error('Insufficient DUST balance');
      });
      await expect(
        executeRegistration({
          ensureContract: mockEnsureThrows,
          getSecret: mockGetSecret,
          runTransaction: mockRunTxFailure,
          callRegister: mockCallRegister,
          onSuccess,
        }),
      ).rejects.toThrow('Insufficient DUST balance');
      expect(onSuccess).not.toHaveBeenCalled();

      // Case C: runTransaction succeeds (returns true)
      const mockRunTxSuccess = vi.fn().mockResolvedValue(true);
      const resultC = await executeRegistration({
        ensureContract: mockEnsureContract,
        getSecret: mockGetSecret,
        runTransaction: mockRunTxSuccess,
        callRegister: mockCallRegister,
        onSuccess,
      });

      expect(resultC).toBe(true);
      expect(onSuccess).toHaveBeenCalledTimes(1);

      // Verify that after genuine registration, voting becomes enabled once candidate chosen
      const stateAfterSuccess = getBallotActionState({
        connected: true,
        isRegistered: true,
        candidateId: 0,
        votingOpen: true,
        loading: false,
        contractReady: true,
      });
      expect(stateAfterSuccess.canVote).toBe(true);
      expect(stateAfterSuccess.voteDisabledReason).toBeNull();
    });
  });

});
