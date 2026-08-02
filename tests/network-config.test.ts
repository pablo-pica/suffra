import { describe, expect, it } from 'vitest';
import { explorerTransactionUrl, resolveDappNetwork } from '../src/config/network';

describe('resolveDappNetwork', () => {
  it('defaults the Level 4 frontend to Preprod', () => {
    expect(resolveDappNetwork(undefined)).toBe('preprod');
  });

  it.each(['undeployed', 'preview', 'preprod'])('accepts the supported %s network', (network) => {
    expect(resolveDappNetwork(network)).toBe(network);
  });

  it('rejects an unsupported configured network', () => {
    expect(() => resolveDappNetwork('mainnet')).toThrow(/unsupported Midnight network/i);
  });

  it('uses the selected public-network explorer and skips local-network links', () => {
    expect(explorerTransactionUrl('preprod', 'tx id')).toBe(
      'https://explorer.preprod.midnight.network/transactions/tx%20id',
    );
    expect(explorerTransactionUrl('undeployed', 'tx-id')).toBeNull();
  });
});
