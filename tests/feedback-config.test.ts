import { describe, expect, it } from 'vitest';
import { resolveFeedbackFormUrl } from '../src/config/feedback';

describe('resolveFeedbackFormUrl', () => {
  it('returns null when URL is unset, empty, or whitespace', () => {
    expect(resolveFeedbackFormUrl()).toBeNull();
    expect(resolveFeedbackFormUrl(undefined)).toBeNull();
    expect(resolveFeedbackFormUrl('')).toBeNull();
    expect(resolveFeedbackFormUrl('   ')).toBeNull();
  });

  it('accepts valid HTTPS forms.gle URLs', () => {
    const url = 'https://forms.gle/QSgaRPbEE1W6UJST9';
    expect(resolveFeedbackFormUrl(url)).toBe(url);
    expect(resolveFeedbackFormUrl(`  ${url}  `)).toBe(url);
  });

  it('accepts valid HTTPS docs.google.com/forms URLs', () => {
    const url = 'https://docs.google.com/forms/d/e/1FAIpQLSc_test_123/viewform';
    expect(resolveFeedbackFormUrl(url)).toBe(url);
  });

  it('rejects non-HTTPS URLs', () => {
    expect(resolveFeedbackFormUrl('http://forms.gle/QSgaRPbEE1W6UJST9')).toBeNull();
    expect(resolveFeedbackFormUrl('http://docs.google.com/forms/d/e/test')).toBeNull();
  });

  it('rejects malformed URLs', () => {
    expect(resolveFeedbackFormUrl('not-a-valid-url')).toBeNull();
    expect(resolveFeedbackFormUrl('forms.gle/QSgaRPbEE1W6UJST9')).toBeNull();
    expect(resolveFeedbackFormUrl('javascript:alert(1)')).toBeNull();
  });

  it('rejects unapproved hosts and spoofed domains', () => {
    expect(resolveFeedbackFormUrl('https://example.com/feedback')).toBeNull();
    expect(resolveFeedbackFormUrl('https://forms.gle.attacker.com/QSgaRPbEE1W6UJST9')).toBeNull();
    expect(resolveFeedbackFormUrl('https://docs.google.com.attacker.com/forms/d/e/test')).toBeNull();
  });

  it('rejects non-form Google Docs URLs', () => {
    expect(resolveFeedbackFormUrl('https://docs.google.com/spreadsheets/d/123')).toBeNull();
    expect(resolveFeedbackFormUrl('https://docs.google.com/document/d/123')).toBeNull();
  });

  it('rejects URLs containing embedded user credentials', () => {
    expect(resolveFeedbackFormUrl('https://user:pass@forms.gle/QSgaRPbEE1W6UJST9')).toBeNull();
  });
});
