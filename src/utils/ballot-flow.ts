import { type DemoCandidateId } from '../content/siteContent';
import { LOCAL_PROOF_SERVER_URL } from '../config/network';

export interface ProofServerDiagnostics {
  isProofServerError: boolean;
  endpoint: string;
  recoveryCommand: string;
  formattedMessage: string;
}

export function isProofServerErrorMessage(message: string): boolean {
  const normalized = message.toLowerCase();
  return (
    normalized.includes('proof server') ||
    normalized.includes('failed to fetch') ||
    normalized.includes('connection refused') ||
    normalized.includes(':6300') ||
    normalized.includes('networkerror')
  );
}

export function formatProofServerError(error: unknown, proofServerUrl?: string): ProofServerDiagnostics {
  const endpoint = proofServerUrl || LOCAL_PROOF_SERVER_URL;
  const rawMsg = error instanceof Error ? error.message : String(error || '');
  const isProofError = isProofServerErrorMessage(rawMsg);

  const recoveryCommand = 'npm run proof-server:start';
  const formattedMessage = isProofError
    ? `Local proof server is offline or unreachable at ${endpoint}. Start it using \`${recoveryCommand}\` before generating proofs.`
    : rawMsg;

  return {
    isProofServerError: isProofError,
    endpoint,
    recoveryCommand,
    formattedMessage,
  };
}
