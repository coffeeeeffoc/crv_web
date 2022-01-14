import { DatePicker, TimePicker } from 'antd';
import { forwardRef, useEffect } from 'react';
import classNames from 'classnames';
import { useBasicWidgetProps, useDefaultValue } from '@/hooks/business/useWidget';
import moment from 'moment';
import {
  EnumFieldType,
  FieldTypeForTime,
  EnumDateDefaultValueType,
} from '@utils/types';
import message from '@utils/browser/message';

const fieldTypeProps = {
  [EnumFieldType.DATE]: {
    picker: 'date',
    format: 'YYYY-MM-DD',
  },
  [EnumFieldType.DATE_TIME]: {
    picker: 'date',
    format: 'YYYY-MM-DD HH:mm:ss',
    showTime: true,
  },
  [EnumFieldType.TIME]: {
    format: 'HH:mm:ss',
  },
  [EnumFieldType.YEAR]: {
    picker: 'year',
    format: 'YYYY',
  },
  [EnumFieldType.MONTH]: {
    picker: 'month',
    format: 'MM',
  },
  [EnumFieldType.YEAR_MONTH]: {
    picker: 'month',
    format: 'YYYY-MM',
  },
};

const usePickerDefaultValue = (fieldConfig: FieldTypeForTime, defaultFormat: string, onHandleChange: any) => {
  const {
    defaultValue,
    defaultType = EnumDateDefaultValueType.NONE,
  } = fieldConfig;

  // 处理默认值
  const newDefaultValue = useDefaultValue(
    () => {
      if (defaultType === EnumDateDefaultValueType.SYSTEM) {
        return moment();
      } else if (defaultType === EnumDateDefaultValueType.FIXED) {
        return moment(defaultValue, defaultFormat);
      }
    },
    onHandleChange,
  );
  return newDefaultValue;
};

// 满足使用12小时制的format的正则格式（也就是包含a或A）
const FORMAT_USE_12_HOURS_REG = /a/i;
const FORMAT_USE_24_HOURS_REG = /H/;

export default forwardRef((props: any, ref) => {
  const {
    className,
    value,
    onChange,
    field,
  } = props;
  const { fieldConfig, props: basicWidgetProps } = useBasicWidgetProps<FieldTypeForTime>(props);
  const {
    fieldType,
    showFormat: format,
  } = fieldConfig ?? {};
  const defaultFormat = fieldTypeProps[fieldType].format;
  const onHandleChange = (val: any) => {
    // 哪怕是显示的格式可以任意设置，但存储的格式是每种类型固定的
    onChange?.(!val ? undefined : moment(val, format).format(defaultFormat));
    // onChange?.(!val ? undefined : moment(val, format).format(format));
  };
  const newDefaultValue = usePickerDefaultValue(fieldConfig, defaultFormat, onHandleChange);
  const Picker = fieldType === EnumFieldType.TIME ? TimePicker : DatePicker;
  useEffect(() => {
    if (format?.match(FORMAT_USE_24_HOURS_REG) && format?.match(FORMAT_USE_12_HOURS_REG)) {
      message.warning(`字段[${field}]的showFormat格式[${format}]设置不对。不能同时支持24小时（包含[H]）和12小时（包含[a]或[A]）`);
    }
  }, [field, format]);
  return (
    <Picker {...{
      ref,
      ...basicWidgetProps,
      ...fieldTypeProps[fieldType],
      ...(format && { format }),
      defaultValue: newDefaultValue,
      ...(fieldType === EnumFieldType.TIME && format?.match(FORMAT_USE_12_HOURS_REG) && {
        use12Hours: true,
      }),
      // value不为空则格式化，否则显示空
      value: value ? moment(value, defaultFormat) : undefined,
      onChange: onHandleChange,
      className: classNames(className),
      style: {
        ...basicWidgetProps.style,
      },
    }} />
  );
});

// 转换内容
export const convertContent = ({
  value,
  fieldConfig: {
    fieldType,
    showFormat,
  } = {} as any,
}: any) => {
  const defaultFormat = (fieldTypeProps as any)[fieldType].format;
  const displayValue = value ? moment(value, defaultFormat).format(showFormat) : undefined;
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
