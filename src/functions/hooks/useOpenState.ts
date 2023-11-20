import { useCallback, useState } from 'react';

export function useOpenState(init: boolean) {
  const [isOpen, _setOpen] = useState(init);
  const setOpen = useCallback(() => _setOpen(true), []);
  const setClose = useCallback(() => _setOpen(false), []);
  return {
    isOpen,
    setOpen,
    setClose,
  };
}
