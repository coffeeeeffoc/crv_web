import { useEffect } from 'react';
import { listenKeydown } from '@crv/utils/src/browser/keycode';

export const useListenKeydown = (keyMap: any, target: () => HTMLElement | null = () => document.body) => {
  useEffect(() => {
    return listenKeydown(keyMap, target);
  }, [keyMap, target]);
};
