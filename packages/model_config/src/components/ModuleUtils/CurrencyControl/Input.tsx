import { Input } from 'antd';
import React, { FC } from 'react';

import style from './index.less';

const InputWithLength: FC<any> = ({
  value = '',
  onChange,
  maxLength,
  ...restProps
}) => {
  const suffix: React.ReactNode = <span>{`${value.length}/${maxLength}`}</span>

  return (
    <Input
      value={value}
      onChange={onChange}
      maxLength={maxLength}
      suffix={suffix}
      className={style}
      autoComplete='off'
      {...restProps}
    />
  )
}

export default InputWithLength;
