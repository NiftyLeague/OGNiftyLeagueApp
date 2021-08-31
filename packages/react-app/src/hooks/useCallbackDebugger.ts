/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-return */

import { useCallback, useEffect, useRef } from 'react';

const usePrevious = (value: React.DependencyList, initialValue: React.DependencyList): React.DependencyList => {
  const ref = useRef(initialValue);
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
};

export default function useCallbackDebugger<T extends (...args: any[]) => any>(
  callback: T,
  deps: React.DependencyList,
): T {
  const previousDeps = usePrevious(deps, []);

  const changedDeps: { [key: number]: { before: unknown; after: unknown } } = deps.reduce(
    (accum, dependency, index) => {
      if (dependency !== previousDeps[index]) {
        const keyName = deps[index] || index;
        return {
          ...accum,
          [keyName]: {
            before: previousDeps[index],
            after: dependency,
          },
        };
      }

      return accum;
    },
    {},
  );

  if (Object.keys(changedDeps).length) {
    console.log('[use-callback-debugger] ', changedDeps);
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  return useCallback(callback, deps);
}
