import { useEffect, useRef } from 'react';
import { setIntervalAsync, clearIntervalAsync } from 'set-interval-async/dynamic';

export default function useInterval(
  callback: () => Promise<void>,
  delay: number,
  leading = true,
  refreshKey = '',
): void {
  const savedCallback = useRef(callback);

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    const tick = async () => {
      const { current } = savedCallback;
      if (current) await current();
    };

    const handleInterval = async () => {
      if (leading) await tick();
      const id = setIntervalAsync(tick, delay);
      return async () => {
        await clearIntervalAsync(id);
      };
    };

    if (delay !== null) {
      void handleInterval();
    }
    return undefined;
  }, [delay, leading]);

  // Optional manual refresh keys
  useEffect(() => {
    const handleCallback = async () => {
      const { current } = savedCallback;
      if (current) await current();
    };
    if (refreshKey) void handleCallback();
  }, [refreshKey]);
}
