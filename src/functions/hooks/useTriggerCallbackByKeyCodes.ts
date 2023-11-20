import { useCallback, useEffect, useRef, KeyboardEvent } from 'react';
import { Callback, KEY_CODES } from 'types';

export interface KeyCodeCombinerInit {
  keyCodes: number[][];
  callback?: Callback;
}

class KeyCodeCombiner {
  protected keyCodes: number[][];
  private keyCodesNow: number[][];
  private callback: Callback | undefined;

  constructor(init: KeyCodeCombinerInit) {
    this.keyCodesNow = init.keyCodes.map((k) => []);
    this.keyCodes = init.keyCodes;
  }

  private stringifyArr(arr: any[]) {
    const res = arr.sort().join();
    return res;
  }

  private compareKeyCodesNowFulFilled(): boolean {
    let res = false;
    let index = 0;

    while (index < this.keyCodes.length) {
      const checkRes = this.stringifyArr(this.keyCodes[index]) === this.stringifyArr(this.keyCodesNow[index]);
      if (checkRes) {
        res = true;
        break;
      }
      index += 1;
    }

    return res;
  }

  private setKeyCode(index: number, keyCode: number) {
    const isNotInKeyCodes = !this.keyCodes[index].includes(keyCode);
    if (isNotInKeyCodes) {
      return;
    }

    const isInKeycodesNow = this.keyCodesNow[index].includes(keyCode);
    if (!isInKeycodesNow) {
      this.keyCodesNow[index] = [...this.keyCodesNow[index], keyCode];
    }
  }

  private resetKeyCodes() {
    this.keyCodesNow = this.keyCodes.map(() => []);
  }

  removeKeyCode(keyCode: number) {
    const index = this.keyCodesNow.findIndex((k) => k.includes(keyCode));
    if (index !== -1) {
      const res = this.keyCodesNow[index].filter((k) => k !== keyCode);
      this.keyCodesNow[index] = res;
    }
  }

  triggerCallbackByKeyCode(keyCode: number, callback?: Callback) {
    // console.log(keyCode);
    if (callback) {
      this.callback = callback;
    }
    for (let i = 0; i < this.keyCodes.length; i++) {
      this.setKeyCode(i, keyCode);
    }

    const isFulfilled = this.compareKeyCodesNowFulFilled();
    if (isFulfilled) {
      this.callback?.();
      this.resetKeyCodes();
    }
  }
}

export const getDefaultKeyCodes = () => {
  const osPlatform = navigator.appVersion;
  const isMacOS = osPlatform.indexOf('Mac') !== -1;
  const isWinOS = osPlatform.indexOf('Win') !== -1;

  if (isMacOS) {
    return [KEY_CODES.CMD, KEY_CODES.ENTER];
  }
  return [KEY_CODES.CTRL, KEY_CODES.ENTER];
};
export const defaultKeyCodes = getDefaultKeyCodes();

export interface TriggerCallbackByKeyCodesOptions {
  callback: Callback;
  /**預設為CTRL(CMD)+ENTER */
  keyCodes?: KEY_CODES[][];
  isAutoDetectKeyCode?: boolean;
}

function useTriggerCallbackByKeyCodes({ callback, keyCodes = [defaultKeyCodes], isAutoDetectKeyCode }: TriggerCallbackByKeyCodesOptions) {
  const keyCodeCompinerRef = useRef(
    new KeyCodeCombiner({
      keyCodes,
      callback,
    })
  );

  const handleTriggerCallback = useCallback(
    (e: KeyboardEvent<any>) => {
      const { keyCode } = e;
      keyCodeCompinerRef.current.triggerCallbackByKeyCode(keyCode, callback);
    },
    [callback]
  );

  const handleRemoveKKeycode = useCallback((e: KeyboardEvent<any>) => {
    const { keyCode } = e;
    keyCodeCompinerRef.current.removeKeyCode(keyCode);
  }, []);

  useEffect(() => {
    if (isAutoDetectKeyCode) {
      window.addEventListener('keydown', handleTriggerCallback as any);
      window.addEventListener('keyup', handleRemoveKKeycode as any);
    }
    return () => {
      window.removeEventListener('keydown', handleTriggerCallback as any);
      window.removeEventListener('keyup', handleRemoveKKeycode as any);
    };
  }, [handleRemoveKKeycode, handleTriggerCallback, isAutoDetectKeyCode]);

  return {
    handleTriggerCallback,
    handleRemoveKKeycode,
  };
}

export default useTriggerCallbackByKeyCodes;
