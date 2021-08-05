import { useEffect, useRef } from 'react';

// helper hook to call a function regularly in time intervals

export default function usePoller(fn, delay) {
  const savedCallback = useRef();
  // Remember the latest fn.
  useEffect(() => {
    savedCallback.current = fn;
  }, [fn]);
  // Set up the interval.
  // eslint-disable-next-line consistent-return
  useEffect(() => {
    function tick() {
      if (savedCallback.current) savedCallback.current();
    }
    if (delay !== null) {
      const id = setInterval(tick, delay);
      return function cleanup() {
        clearInterval(id);
      };
    }
  }, [delay]);
  // run at start too
  useEffect(() => {
    if (savedCallback.current) savedCallback.current();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [savedCallback.current]);
}
