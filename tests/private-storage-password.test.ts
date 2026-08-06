import { describe, expect, it } from 'vitest';
import { formatPrivateStoragePassword } from '../src/hooks/useMidnight';

describe('formatPrivateStoragePassword', () => {
  it('creates a stable password that meets Midnight private-state policy', () => {
    const formatted = formatPrivateStoragePassword('a'.repeat(64));

    expect(formatted).toBe(`Suffra!${'a'.repeat(64)}`);
    expect(formatted).toHaveLength(71);
    expect(formatted).toMatch(/[A-Z]/);
    expect(formatted).toMatch(/[a-z]/);
    expect(formatted).toMatch(/[!@#$%^&*]/);
  });
});
