import { useCallback, useState } from 'react';

export const useForceUpdate = () => {
  const [, forceUpdate] = useState({});
  const callback = useCallback(() => {
    forceUpdate({});
  }, []);
  return callback;
};
