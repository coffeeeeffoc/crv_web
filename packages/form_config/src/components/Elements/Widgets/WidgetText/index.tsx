import InputWithLength from '@rc/ModuleUtils/ControlWithLength/InputWithLength';
import classNames from 'classnames';
import { useBasicWidgetProps } from '@/hooks/business/useWidget';
import { FieldText } from '@utils/types';
import { forwardRef } from 'react';

export default forwardRef((props: any, ref) => {
  const {
    className,
    value,
    onChange,
  } = props;
  const { fieldConfig, props: basicWidgetProps } = useBasicWidgetProps<FieldText>(props);
  return (
    <InputWithLength {...{
      ref,
      ...basicWidgetProps,
      ...(fieldConfig?.length && { maxLength: fieldConfig.length }),
      // defaultValue: fieldConfig.defaultValue,
      value,
      // onChange,
      onChange: (v: any) => {
        console.log('InputWithLength', v, value, props);
        onChange?.(v);
      },
      className: classNames(className),
      style: {
        ...basicWidgetProps.style,
      },
    }} />
  );
});

// 转换内容
export const convertContent = ({ value }: any) => {
  const displayValue = value;
  const displayContent = String(displayValue ?? '');
  return displayContent;
};

// 展示表格内容
export const DisplayTableContent = (props: any) => {
  const displayContent = convertContent(props);
  return (
    <span title={displayContent} >{displayContent}</span>
  );
};
