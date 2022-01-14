import { InputNumber } from 'antd';
import classNames from 'classnames';
import { useBasicWidgetProps } from '@/hooks/business/useWidget';
import { EnumIntegerShowType, FieldInteger } from '@utils/types';
import { forwardRef } from 'react';
import { thousandSeparatorHandler } from '../WidgetCurrency';

export default forwardRef((props: any, ref) => {
  const {
    className,
    value,
    onChange,
  } = props;
  const {
    fieldConfig: {
      minValue, maxValue, showType,
    } = {},
    props: basicWidgetProps
  } = useBasicWidgetProps<FieldInteger>(props);
  return (
    <InputNumber {...{
      ref,
      ...basicWidgetProps,
      value,
      onChange,
      min: minValue,
      max: maxValue,
      ...(showType === EnumIntegerShowType.THOUSAND_SEPARATORS && thousandSeparatorHandler),
      className: classNames(className),
      style: {
        ...basicWidgetProps.style,
      },
    }} />
  );
});

// 转换内容
export const convertContent = ({ value }: any) => {
  // const displayValue = value;
  // const displayContent = String(displayValue ?? '');
  const displayContent = value;
  return displayContent;
};

// 展示表格内容
export const DisplayTableContent = (props: any) => {
  const displayContent = convertContent(props);
  return (
    <span title={displayContent} >{displayContent}</span>
  );
};
