import { useCallback, useEffect, useRef } from 'react';
import { Callback } from 'types';

interface UseDelayCallbackOptions {
  delayTime?: number;
}

const useDelayCallback = (options: UseDelayCallbackOptions) => {
  const { delayTime = 100 } = options;

  const timeoutRef = useRef<NodeJS.Timeout>();

  const handleClearTimeout = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = undefined;
    }
  }, []);

  const handleDelayedCallback = useCallback(
    (callback?: Callback) => {
      //clear prev timeout first
      handleClearTimeout();

      if (!timeoutRef.current) {
        timeoutRef.current = setTimeout(() => {
          callback?.();
        }, delayTime) as any;
      }
    },
    [delayTime, handleClearTimeout]
  );

  useEffect(() => {
    return () => handleClearTimeout();
  }, [handleClearTimeout]);

  return {
    handleDelayedCallback,
  };
};

export default useDelayCallback;
