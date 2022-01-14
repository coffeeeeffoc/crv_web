import { Input } from 'antd';
import { forwardRef } from 'react';
import style from './index.less';
import { useSuffixValueLength } from './hooks';
import classNames from 'classnames';

interface InputWithLengthType {
  value?: string
  onChange?: any
  maxLength: number
  [propsName: string]: any
}

const InputWithLength = forwardRef<any, InputWithLengthType>(({
  value,
  onChange,
  maxLength,
  ...restProps
}, ref) => {
  const suffixProps = useSuffixValueLength({
    value,
    defaultValue: restProps.defaultValue,
    maxLength,
  });

  return (
    <Input 
    {...{
      ref,
      value,
      onChange,
      ...suffixProps,
      className: classNames(style.style, restProps.className),
      autoComplete: 'off',
      ...restProps,
    }} />
  );
});
export default InputWithLength;
