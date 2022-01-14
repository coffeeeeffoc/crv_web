import { Input } from 'antd';
import React, { FC } from 'react';

const { TextArea } = Input;

interface CurrencyTextAreaType {
  value: string
  onChange: any
  maxLength: number
  [propsName: string]: any
}

const suffixStyle: any = {
  position: 'relative',
  top: '-50px',
  userSelect: 'none',
  color: 'rgb(118 111 111 / 85%)'
}

const CurrencyTextArea: FC<any> = ({
  value = '',
  onChange,
  maxLength,
  ...restProps
}) => {
  const suffix: React.ReactNode = <span>{`${value.length}25/${maxLength}`}</span>

  return (
    <>
      <TextArea value={value} onChange={onChange} maxLength={maxLength} {...restProps} suffix={suffix} />
      <span style={suffixStyle}> {`${value.length}/${maxLength}`}</span>
    </>
  )
};
export default CurrencyTextArea;
