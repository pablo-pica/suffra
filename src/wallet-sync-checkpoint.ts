/**
 * Periodically persist an in-progress wallet sync without overlapping state
 * serializations. A checkpoint is intentionally best-effort: the existing
 * per-child atomic writes make the last complete child state safe to restore.
 */
export interface PeriodicCheckpointOptions {
  intervalMs: number;
  onError?: (error: unknown) => void;
}

export interface PeriodicCheckpoint {
  stop(): Promise<void>;
}

export class SyncInterruptedError extends Error {
  constructor() {
    super('Wallet sync interrupted by SIGINT');
    this.name = 'SyncInterruptedError';
  }
}

/**
 * Wait for synchronization while making the first Ctrl-C graceful. Node's
 * default SIGINT exit skips finally blocks, so intercept it long enough to
 * flush the final checkpoint before returning a conventional 130 exit code.
 */
export async function waitForSyncWithCheckpoint<T>(
  waitForSync: () => Promise<T>,
  checkpoints: PeriodicCheckpoint,
): Promise<T> {
  let interrupt!: () => void;
  const interrupted = new Promise<never>((_resolve, reject) => {
    interrupt = () => reject(new SyncInterruptedError());
  });
  const onSigint = () => interrupt();

  process.once('SIGINT', onSigint);
  try {
    return await Promise.race([waitForSync(), interrupted]);
  } finally {
    process.off('SIGINT', onSigint);
    await checkpoints.stop();
  }
}

export function startPeriodicCheckpoint(
  checkpoint: () => Promise<void>,
  { intervalMs, onError = () => undefined }: PeriodicCheckpointOptions,
): PeriodicCheckpoint {
  let stopped = false;
  let timer: ReturnType<typeof setTimeout> | undefined;
  let running: Promise<void> | undefined;

  const run = (): Promise<void> => {
    if (running) return running;
    running = checkpoint()
      .catch((error: unknown) => onError(error))
      .finally(() => {
        running = undefined;
        if (!stopped) schedule();
      });
    return running;
  };

  const schedule = (): void => {
    timer = setTimeout(() => { void run(); }, intervalMs);
  };

  schedule();

  return {
    async stop(): Promise<void> {
      stopped = true;
      if (timer) clearTimeout(timer);
      await running;
      await run();
    },
  };
}
