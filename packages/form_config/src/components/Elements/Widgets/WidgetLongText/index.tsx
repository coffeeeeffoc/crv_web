import TextAreaWithLength from '@rc/ModuleUtils/ControlWithLength/TextAreaWithLength';
import classNames from 'classnames';
import { useBasicWidgetProps } from '@/hooks/business/useWidget';
import { FieldLongText } from '@utils/types';
import { forwardRef } from 'react';
import styles from './index.less';

export default forwardRef((props: any, ref) => {
  const {
    className,
    value,
    onChange,
  } = props;
  const { fieldConfig, props: basicWidgetProps } = useBasicWidgetProps<FieldLongText>(props);
  return (
    <TextAreaWithLength {...{
      ref,
      ...basicWidgetProps,
      ...(fieldConfig?.length && { maxLength: fieldConfig.length }),
      value,
      onChange,
      className: classNames(className, styles.textarea),
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
