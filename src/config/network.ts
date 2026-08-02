export const DAPP_NETWORK_IDS = ['undeployed', 'preview', 'preprod'] as const;

export type DappNetworkId = (typeof DAPP_NETWORK_IDS)[number];

const DEFAULT_DAPP_NETWORK: DappNetworkId = 'preprod';

export function resolveDappNetwork(configuredNetwork: string | undefined): DappNetworkId {
  const network = configuredNetwork?.trim().toLowerCase() || DEFAULT_DAPP_NETWORK;

  if ((DAPP_NETWORK_IDS as readonly string[]).includes(network)) {
    return network as DappNetworkId;
  }

  throw new Error(
    `Unsupported Midnight network "${configuredNetwork}". Expected one of: ${DAPP_NETWORK_IDS.join(', ')}.`,
  );
}

export function explorerTransactionUrl(network: DappNetworkId, transactionId: string): string | null {
  if (network === 'undeployed') return null;
  return `https://explorer.${network}.midnight.network/transactions/${encodeURIComponent(transactionId)}`;
}
