export const DAPP_NETWORK_IDS = ['undeployed', 'preview', 'preprod'] as const;

export type DappNetworkId = (typeof DAPP_NETWORK_IDS)[number];

const DEFAULT_DAPP_NETWORK: DappNetworkId = 'preprod';

// Browser proofs are deliberately confined to the tester's machine. Sending
// proof preimages to an arbitrary remote endpoint would weaken Suffra's
// private-witness boundary.
export const LOCAL_PROOF_SERVER_URL = 'http://127.0.0.1:6300';

export function resolveDappNetwork(configuredNetwork: string | undefined): DappNetworkId {
  const network = configuredNetwork?.trim().toLowerCase() || DEFAULT_DAPP_NETWORK;

  if ((DAPP_NETWORK_IDS as readonly string[]).includes(network)) {
    return network as DappNetworkId;
  }

  throw new Error(
    `Unsupported Midnight network "${configuredNetwork}". Expected one of: ${DAPP_NETWORK_IDS.join(', ')}.`,
  );
}

export function resolveProofServerUrl(configuredUrl: string | undefined): string {
  const url = configuredUrl?.trim() || LOCAL_PROOF_SERVER_URL;

  let parsed: URL;
  try {
    parsed = new URL(url);
  } catch {
    throw new Error('Proof server URL must be a local loopback HTTP(S) URL.');
  }

  const isLoopback = ['localhost', '127.0.0.1', '[::1]'].includes(parsed.hostname);
  if (!isLoopback || !['http:', 'https:'].includes(parsed.protocol)) {
    throw new Error('Proof server URL must be a local loopback HTTP(S) URL.');
  }

  return url;
}

export function explorerTransactionUrl(network: DappNetworkId, transactionId: string): string | null {
  if (network === 'undeployed') return null;
  return `https://explorer.${network}.midnight.network/transactions/${encodeURIComponent(transactionId)}`;
}
