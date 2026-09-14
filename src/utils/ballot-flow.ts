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

export interface BallotActionStateParams {
  connected: boolean;
  isRegistered: boolean;
  candidateId: DemoCandidateId | null;
  votingOpen?: boolean;
  loading: boolean;
  contractReady: boolean;
}

export interface BallotActionState {
  currentStep: 1 | 2;
  canRegister: boolean;
  canVote: boolean;
  voteDisabledReason: string | null;
}

export function getBallotActionState({
  connected,
  isRegistered,
  candidateId,
  votingOpen = true,
  loading,
  contractReady,
}: BallotActionStateParams): BallotActionState {
  if (!connected) {
    return {
      currentStep: 1,
      canRegister: false,
      canVote: false,
      voteDisabledReason: 'Connect Lace wallet to register and vote.',
    };
  }

  if (!contractReady) {
    return {
      currentStep: 1,
      canRegister: false,
      canVote: false,
      voteDisabledReason: 'Contract is not ready or configured.',
    };
  }

  if (!votingOpen) {
    return {
      currentStep: isRegistered ? 2 : 1,
      canRegister: false,
      canVote: false,
      voteDisabledReason: 'The ballot box is closed.',
    };
  }

  if (loading) {
    return {
      currentStep: isRegistered ? 2 : 1,
      canRegister: false,
      canVote: false,
      voteDisabledReason: 'Generating zero-knowledge proof and submitting transaction...',
    };
  }

  if (!isRegistered) {
    return {
      currentStep: 1,
      canRegister: true,
      canVote: false,
      voteDisabledReason: 'Complete Step 1 (register local voter secret) before casting a ballot.',
    };
  }

  // Already registered: ready for Step 2
  if (candidateId === null) {
    return {
      currentStep: 2,
      canRegister: false,
      canVote: false,
      voteDisabledReason: 'Select a fictional candidate above to cast your ballot.',
    };
  }

  return {
    currentStep: 2,
    canRegister: false,
    canVote: true,
    voteDisabledReason: null,
  };
}
export interface ExecuteRegistrationParams {
  ensureContract: () => void;
  getSecret: () => Uint8Array;
  runTransaction: (operation: () => Promise<any>) => Promise<boolean>;
  callRegister: (secret: Uint8Array) => Promise<any>;
  onSuccess: () => void;
}

export async function executeRegistration({
  ensureContract,
  getSecret,
  runTransaction,
  callRegister,
  onSuccess,
}: ExecuteRegistrationParams): Promise<boolean> {
  ensureContract();
  const secret = getSecret();
  const ok = await runTransaction(() => callRegister(secret));
  if (ok) {
    onSuccess();
    return true;
  }
  return false;
}
