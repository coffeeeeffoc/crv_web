import { useEffect, useRef } from 'react';

export const usePrevious = (value: any) => {
  const ref = useRef(value);
  useEffect(() => {
    ref.current = value;
  }, [value]);
  return ref.current;
};
/**
 * 最近一次满足匹配条件的值
 * 初始值若满足匹配条件则作为首次的返回值，不满足则返回默认值.
 */
export const usePreviousMatch = (value: any, match: (val: any) => boolean, defaultValue?: any) => {
  const ref = useRef(match(value) ? value : defaultValue);
  useEffect(() => {
    if (match(value)) {
      ref.current = value;
    }
  }, [value, match]);
  return match(value) ? value : ref.current;
};

// 当且仅当val发现变化时，执行相应的回调callback
export const usePreviousDiff = (val: Exclude<any, Object | any[]>, callback: Function) => {
  const prevVal = usePrevious(val);
  useEffect(() => {
    if (prevVal !== val) {
      callback?.();
    }
  }, [prevVal, val, callback]);
};

// 当val发生变化时，执行callback回调
export const useDiffCallback = <T = any>(val: T, callback: (v: T) => void) => {
  const cbRef = useRef(callback);
  useEffect(() => {
    cbRef.current = callback;
  });
  useEffect(() => {
    cbRef.current?.(val);
  }, [val]);
};
