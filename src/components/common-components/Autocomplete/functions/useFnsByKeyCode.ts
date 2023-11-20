import { useState, useEffect, useCallback } from 'react';

import { calNewIndex } from './index';

export const KEYCODE = {
  ENTER: 13 as 13,
  ESCAPE: 27 as 27,

  ARROW_UP: 38 as 38,
  ARROW_RIGHT: 39 as 39,
  ARROW_DOWN: 40 as 40,
  ARROW_LEFT: 37 as 37,
};

type PlusOrMinusKeyCode = typeof KEYCODE.ARROW_UP | typeof KEYCODE.ARROW_DOWN;

export class HandleFnsByKeyCode {
  static plusOrMinusIndex = (keyCode: PlusOrMinusKeyCode) => {
    return keyCode === KEYCODE.ARROW_UP ? calNewIndex('-') : calNewIndex('+');
  };
}

interface UseFnsByKeyCodeOptions {
  inUse: boolean;
  lastIndex: number;
  confirmFn: (index: number) => any;
  escapeFn: (index?: number) => any;
}

const useFnsByKeyCode = ({ inUse, lastIndex, confirmFn, escapeFn }: UseFnsByKeyCodeOptions) => {
  const [index, setIndex] = useState(0);

  const handleFnsByKeyCodeEvent = useCallback(
    (e: KeyboardEvent) => {
      if (!inUse) {
        return;
      }
      // RenNote https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/keyCode
      const { keyCode } = e;
      switch (keyCode) {
        case KEYCODE.ENTER:
          confirmFn(index);
          break;
        case KEYCODE.ESCAPE:
          escapeFn(index);
          break;
        case KEYCODE.ARROW_UP:
        case KEYCODE.ARROW_DOWN: {
          const calculatedIndex = HandleFnsByKeyCode.plusOrMinusIndex(keyCode)({
            lastIndex,
            indexNow: index,
          });
          setIndex(calculatedIndex);
          break;
        }
        default:
          break;
      }
    },
    [inUse, index, confirmFn, escapeFn, lastIndex]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleFnsByKeyCodeEvent);
    return () => {
      window.removeEventListener('keydown', handleFnsByKeyCodeEvent);
    };
  }, [handleFnsByKeyCodeEvent]);

  return {
    index,
    setIndex,
  };
};

export default useFnsByKeyCode;
