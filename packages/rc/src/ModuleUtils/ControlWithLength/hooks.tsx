import { useRef, useEffect } from 'react';

export const useSuffixValueLength = ({
  value,
  defaultValue,
  maxLength,
}: any) => {
  // 有值的话，直接用value的值，不用defaultValue的值.故设置认为是dirty的
  const valDirtyRef = useRef(!!value);
  useEffect(() => {
    valDirtyRef.current = true;
  }, [value]);
  const val = valDirtyRef.current ? value : defaultValue;
  const valueLength = String(val ?? '').length ?? 0;
  const suffix: React.ReactNode = <span style={{ opacity: 0.5 }} >{`${valueLength}/${maxLength}`}</span>;

  // 仅当maxLength属性为数字时才显示当前长度和最大长度
  return (typeof maxLength === 'number')
    ? {
        maxLength,
        suffix,
      }
    : {};
};
