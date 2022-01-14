import { throttle } from '../optimize';
import { useEffect, useCallback, useRef } from 'react';

export default function useThrottle (cb: Function, delay: number = 20) {
  const options = { leading: true, trailing: false }; // add custom lodash options
  const cbRef = useRef<Function>(cb);
  // use mutable ref to make useCallback/throttle not depend on `cb` dep
  useEffect(() => { cbRef.current = cb; });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  return useCallback(
    throttle((...args: any[]) => cbRef.current(...args), delay, options),
    [delay]
  );
};
