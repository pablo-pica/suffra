import { describe, expect, it } from 'vitest';
import { demoDisclosures } from '../src/content/siteContent';
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

});
