import { useEffect, useRef } from 'react';

// 点击后延迟执行某个事件；并且在事件执行前若某个条件触发，则取消执行该事件
export const useDelayClick = ({
  cancelCondition,
  delay = 0,
  execute,
  alwaysCancel = true,
}: any) => {
  const timerRef = useRef<any>(null);
  useEffect(() => {
    if (alwaysCancel || cancelCondition) {
      clearTimeout(timerRef.current);
    }
  });

  return () => {
    timerRef.current = setTimeout(() => {
      execute?.();
    }, delay);
  };
};
