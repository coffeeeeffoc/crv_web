import { Input } from 'antd';
import { FC } from 'react';

const { TextArea } = Input;

const CurrencyTextArea: FC<any> = ({
  value,
  onChange,
  maxLength,
  ...restProps
}) => {
  return (
    <TextArea {...{
      value,
      onChange,
      maxLength,
      showCount: true,
      ...restProps,
    }} />
  );
};
export default CurrencyTextArea;
