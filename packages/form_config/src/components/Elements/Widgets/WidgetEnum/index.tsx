import { Select } from 'antd';
import classNames from 'classnames';
import { useBasicWidgetProps } from '@/hooks/business/useWidget';
import { FieldEnum } from '@utils/types';
import { forwardRef } from 'react';
import { useFieldConfig } from '@/hooks';

export default forwardRef((props: any, ref) => {
  const {
    className,
    value,
    onChange,
  } = props;
  const { fieldConfig: { enumConfig } = {}, props: basicWidgetProps } = useBasicWidgetProps<FieldEnum>(props);
  return (
    <Select {...{
      ref,
      ...basicWidgetProps,
      value,
      onChange: (val) => {
        onChange(val);
      },
      className: classNames(className),
      style: {
        ...basicWidgetProps.style,
      },
      options: enumConfig?.enumList?.map(({ value, name }) => ({ value, label: name })),
    }} />
  );
});

// 展示表格内容
export const DisplayTableContent = (props: any) => {
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
  const fieldConfig = useFieldConfig(props.field) as FieldEnum;
  const displayContent = fieldConfig?.enumConfig?.enumList?.find(({ value }) => value === props.value)?.name;
  return (
    <span title={displayContent} >{displayContent}</span>
  );
};
