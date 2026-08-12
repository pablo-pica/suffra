import { describe, expect, it } from 'vitest';
import { LOCAL_PROOF_SERVER_URL, resolveProofServerUrl } from '../src/config/network';

describe('resolveProofServerUrl', () => {
  it('defaults browser proofs to the local Docker proof server', () => {
    expect(resolveProofServerUrl(undefined)).toBe(LOCAL_PROOF_SERVER_URL);
  });

  it.each(['http://localhost:6300', 'http://127.0.0.1:6300', 'http://[::1]:6300'])
    ('accepts a loopback proof server URL: %s', (url) => {
      expect(resolveProofServerUrl(url)).toBe(url);
    });

  it.each(['https://proof-server.preprod.midnight.network', 'http://192.168.1.2:6300', 'ftp://localhost:6300'])
    ('rejects a non-loopback or unsupported proof server URL: %s', (url) => {
      expect(() => resolveProofServerUrl(url)).toThrow(/local loopback.*url/i);
    });
});
