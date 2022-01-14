import {
  forwardRef,
} from 'react';
import {
  Select,
  Input,
  // Modal,
} from 'antd';
import { BoolSelector, basicTypeConfig } from '@@/Panels/PropertyDetail/Common';

export const EditControl = forwardRef<any, any>(({
  editing,
  record,
  onBlur,
  onPressEnter,
  className,
  onClick,
  value,
  onChange,
  customConfig,
}: any, ref) => {
  const key = record.key;
  const {
    controlType, enumOptions,
    isSelect,
    collapseSettings,
    // initialValue,
    // otherControlType, title,
    // description, collapseSettings,
  } = customConfig.propertiesConfig[key] ?? {};
  const commonProps = {
    ref,
    value,
    onChange: (val: any) => {
      console.log('onHandleSave-1', val);
      onChange(val);
    },
    onBlur,
    onPressEnter,
  };
  const commonSelectProps = {
    ...commonProps,
    defaultOpen: true,
  };
  let content = null;
  const commonEnumOptions = enumOptions?.map((option: any) => typeof option === 'string' ? { value: option } : option);
  if (controlType && typeof controlType !== 'string') {
    console.log('controlType-', typeof controlType, controlType);
    const Comp = controlType;
    content = <Comp {...{
      ...(isSelect ? commonSelectProps : commonProps),
      collapseSettings,
      editing,
    }} />;
  } else {
    if (!editing) {
      const val = value ?? record?.value ?? null;
      console.log('onHandleSave-2', value, val, record?.value);
      switch (controlType) {
        case 'enum': {
          const { value, label } = commonEnumOptions?.find((item: any) => item.value === val) ?? {};
          content = label ?? value ?? null;
          break;
        }
        case 'boolean':
          content = (typeof val === 'boolean' && !val) ? '否' : '是';
          break;
        default:
          content = val;
          break;
      }
    } else {
      switch (controlType) {
        case 'enum':
          content = (
            <Select {...commonSelectProps} options={commonEnumOptions} />
          );
          break;
        case 'boolean':
          content = (
            <BoolSelector
              {...{
                ...commonProps,
                defaultOpen: true,
                defaultValue: typeof value !== 'boolean' ? true : value,
              }}
            />
          );
          break;
        // case 'expression':
        // case 'regExp':
        case 'string':
        case 'json':
        case 'function':
        case 'number':
        {
          const Comp = basicTypeConfig[controlType][1];
          const compProps = basicTypeConfig[controlType][2];
          content = (
            <Comp
              {...commonProps}
              {...compProps}
            />
          );
          break;
        }
        default:
          content = <Input {...commonProps} />;
          break;
      }
    }
  }
  return (
    <div {...{
      'data-td-container': '',
      onClick: (e) => {
        !editing && onClick(e);
        e.stopPropagation();
        e.preventDefault();
      },
      className,
    }} >
      {content}
    </div>
  );
});
