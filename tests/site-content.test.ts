import { describe, expect, it } from 'vitest';
import { developmentMilestones, faqs, sourceContext } from '../src/content/siteContent';

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
});
