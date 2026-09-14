import { describe, expect, it } from 'vitest';
import { demoDisclosures, preflightChecklist } from '../src/content/siteContent';
import { formatProofServerError } from '../src/utils/ballot-flow';
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

});
