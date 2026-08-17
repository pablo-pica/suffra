import { describe, expect, it } from 'vitest';
import { demoElection, developmentMilestones, faqs, sourceContext } from '../src/content/siteContent';

describe('public site content', () => {
  it('describes the MVP without claiming unimplemented eligibility or tally features', () => {
    const allCopy = [
      ...developmentMilestones.map(({ detail }) => detail),
      ...faqs.flatMap(({ answer }) => answer),
    ].join(' ').toLowerCase();

    expect(allCopy).toContain('not implemented');
    expect(allCopy).not.toContain('final tally is live');
    expect(allCopy).not.toContain('eligibility verification is live');
  });

  it('keeps the documented election context attributable', () => {
    expect(sourceContext).toHaveLength(3);
    expect(sourceContext.every(({ href, source }) => href.startsWith('https://') && source.length > 0)).toBe(true);
  });

  it('labels the SK election preview as fictional and keeps candidate data local to the demo', () => {
    expect(demoElection.office).toBe('SK Chairperson');
    expect(demoElection.note.toLowerCase()).toContain('fictional');
    expect(demoElection.candidates).toHaveLength(4);
    expect(demoElection.candidates.map(({ id }) => id)).toEqual([0, 1, 2, 3]);
    expect(demoElection.candidates.every(({ name, platform }) => name.length > 0 && platform.length > 0)).toBe(true);
  });

  it('keeps the public Preprod status aligned with the verified smoke test', () => {
    const preprodMilestone = developmentMilestones.find(({ state }) => state === 'On Preprod');
    expect(preprodMilestone?.detail).toContain('smoke-tested with Lace on Preprod');
    expect(preprodMilestone?.detail).toContain('ballot closure all finalized');
    expect(preprodMilestone?.detail).not.toContain('pending');
  });
});
