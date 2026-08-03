import { afterEach, describe, expect, it, vi } from 'vitest';
import { startPeriodicCheckpoint, SyncInterruptedError, waitForSyncWithCheckpoint } from '../src/wallet-sync-checkpoint';

describe('startPeriodicCheckpoint', () => {
  afterEach(() => vi.useRealTimers());

  it('persists on its configured interval and once more when stopped', async () => {
    vi.useFakeTimers();
    const checkpoint = vi.fn().mockResolvedValue(undefined);
    const controller = startPeriodicCheckpoint(checkpoint, { intervalMs: 30_000 });

    await vi.advanceTimersByTimeAsync(30_000);
    expect(checkpoint).toHaveBeenCalledTimes(1);

    await controller.stop();
    expect(checkpoint).toHaveBeenCalledTimes(2);
  });

  it('does not overlap a slow checkpoint and completes it before stopping', async () => {
    vi.useFakeTimers();
    let release!: () => void;
    const slowCheckpoint = new Promise<void>((resolve) => { release = resolve; });
    const checkpoint = vi.fn().mockReturnValueOnce(slowCheckpoint).mockResolvedValue(undefined);
    const controller = startPeriodicCheckpoint(checkpoint, { intervalMs: 30_000 });

    await vi.advanceTimersByTimeAsync(90_000);
    expect(checkpoint).toHaveBeenCalledTimes(1);

    const stopped = controller.stop();
    release();
    await stopped;
    expect(checkpoint).toHaveBeenCalledTimes(2);
  });

  it('reports checkpoint errors and continues scheduling later checkpoints', async () => {
    vi.useFakeTimers();
    const onError = vi.fn();
    const error = new Error('disk unavailable');
    const checkpoint = vi.fn().mockRejectedValueOnce(error).mockResolvedValue(undefined);
    const controller = startPeriodicCheckpoint(checkpoint, { intervalMs: 30_000, onError });

    await vi.advanceTimersByTimeAsync(30_000);
    expect(onError).toHaveBeenCalledWith(error);

    await vi.advanceTimersByTimeAsync(30_000);
    expect(checkpoint).toHaveBeenCalledTimes(2);
    await controller.stop();
  });

  it('flushes a final checkpoint before rejecting an interrupted sync', async () => {
    const stop = vi.fn().mockResolvedValue(undefined);
    const waitForSync = vi.fn(() => new Promise<never>(() => undefined));
    let onSigint!: () => void;
    const once = vi.spyOn(process, 'once').mockImplementation((_event, listener) => {
      onSigint = listener as () => void;
      return process;
    });
    const off = vi.spyOn(process, 'off').mockReturnValue(process);

    const syncing = waitForSyncWithCheckpoint(waitForSync, { stop });
    onSigint();

    await expect(syncing).rejects.toBeInstanceOf(SyncInterruptedError);
    expect(stop).toHaveBeenCalledTimes(1);
    once.mockRestore();
    off.mockRestore();
  });
});
