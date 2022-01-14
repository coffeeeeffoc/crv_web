import { InputNumber } from 'antd';
import classNames from 'classnames';
import { useBasicWidgetProps, useDefaultValue } from '@/hooks/business/useWidget';
import { FieldDecimalSome, EnumDecimalShowType } from '@utils/types';
import { toFixedNumber } from '@utils/browser/number';
import { useState, forwardRef } from 'react';
import { EnumFieldType } from '@utils/types/business/FieldType';

type ValueType = undefined | number;

// 千分符的解析格式化处理函数
export const thousandSeparatorHandler = {
  formatter: (val: number) => {
    const DIGIT_PATTERN = /(^|\s)\d+(?=\.?\d*($|\s))/g;
    const MICRO_PATTERN = /(?=(?!\b)(\d{3})+$)/g;
    return `${val}`.replace(DIGIT_PATTERN, s => s.replace(MICRO_PATTERN, ','));
  },
  parser: (displayVal: string) => {
    const val = displayVal.replace(/,/g, '');
    return parseFloat(val);
  },
};
// 默认的精度为2
const DEFAULT_PRECISION = 2;
const addonAfterConfig: any = {
  PERCENTAGE: '%',
  PERMILLAGE: '‰',
};
const divideValueConfig: any = {
  PERCENTAGE: (val: number) => val / 100,
  PERMILLAGE: (val: number) => val / 1000,
};
const divideValue = (fieldType: Pick<FieldDecimalSome, 'fieldType'>['fieldType'], val: ValueType): ValueType =>
  val === undefined ? val : divideValueConfig[fieldType] ? divideValueConfig[fieldType](val) : val;
const multiplyValueConfig: any = {
  PERCENTAGE: (val: number) => val * 100,
  PERMILLAGE: (val: number) => val * 1000,
};
const multiplyValue = (fieldType: Pick<FieldDecimalSome, 'fieldType'>['fieldType'], val: ValueType): ValueType =>
  val === undefined ? val : multiplyValueConfig[fieldType] ? multiplyValueConfig[fieldType](val) : val;

const showValue = (val: ValueType, precision?: number) => {
  if (val === undefined || precision === undefined) return val;
  return parseFloat(toFixedNumber(val, precision) as string);
};
// WidgetDecimal控件
export default forwardRef((props: any, ref) => {
  const {
    className,
    value,
    onChange,
    // 是否是公式字段类型（为true时，showDigits不设置默认值，也就是输入啥数值就显示啥数值）
    isFormulaFieldType,
  } = props;
  // 当前是否聚焦
  const [focused, setFocused] = useState(false);
  const { fieldConfig, props: basicWidgetProps } = useBasicWidgetProps<FieldDecimalSome>(props);
  const { fieldType, showType, showDigits = isFormulaFieldType ? undefined : DEFAULT_PRECISION, decimalDigits } = fieldConfig;
  const precisionDiff: number = fieldType === EnumFieldType.PERCENTAGE
    ? 2
    : fieldType === EnumFieldType.PERMILLAGE
      ? 3
      : 0;
  const precisionTmp = decimalDigits - precisionDiff;
  // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
  const displayPrecision = showDigits === undefined ? undefined : (showDigits + precisionDiff);
  const precision = showDigits === undefined ? undefined : (focused ? Math.max(precisionTmp, 0) : showDigits);
  const isThousandSeparators = showType === EnumDecimalShowType.THOUSAND_SEPARATORS;
  const willUsePercentage = [EnumFieldType.PERCENTAGE, EnumFieldType.PERMILLAGE].includes(fieldType);
  const onHandleChange = (val?: number) => {
    if (val === undefined) return onChange?.(val);
    const dividedValue = divideValue(fieldType, val) as number;
    const fixedValue = parseFloat(toFixedNumber(dividedValue, decimalDigits) as string);
    onChange?.(fixedValue);
  };
  const multipliedDefaultValue = useDefaultValue(
    () => multiplyValue(fieldType, fieldConfig.defaultValue as ValueType),
    onHandleChange
  );
  console.log(multipliedDefaultValue);
  const multipliedValue = multiplyValue(fieldType, value as ValueType);
  const onFocus = (e: any) => {
    props.onFocus?.(e);
    setFocused(true);
  };
  const onBlur = (e: any) => {
    basicWidgetProps.onBlur?.(e);
    setFocused(false);
  };
  return (
    <InputNumber {...{
      ref,
      ...basicWidgetProps,
      // defaultValue: multipliedDefaultValue,
      ...(willUsePercentage && {
        addonAfter: addonAfterConfig[fieldType],
      }),
      // value: multipliedValue,
      value: focused ? multipliedValue : showValue(multipliedValue, displayPrecision),
      onFocus,
      onBlur,
      precision,
      onChange: onHandleChange,
      className: classNames(className),
      style: {
        ...basicWidgetProps.style,
      },
      ...(isThousandSeparators && thousandSeparatorHandler)
    }} />
  );
});

// 转换内容
export const convertContent = (props: any) => {
  const { fieldType, showType, showDigits = DEFAULT_PRECISION } = props.fieldConfig ?? {};
  const isThousandSeparators = showType === EnumDecimalShowType.THOUSAND_SEPARATORS;
  const precisionDiff: number = fieldType === EnumFieldType.PERCENTAGE
    ? 2
    : fieldType === EnumFieldType.PERMILLAGE
      ? 3
      : 0;
  // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
  const displayPrecision = showDigits + precisionDiff;
  const multipliedValue = multiplyValue(fieldType, props.value as ValueType);
  const displayValue = showValue(multipliedValue, displayPrecision);
  const displayContent = String(
    displayValue === undefined
      ? ''
      : (isThousandSeparators ? thousandSeparatorHandler.formatter(displayValue) : displayValue)
  );
  return displayContent;
};

// 展示表格内容
export const DisplayTableContent = (props: any) => {
  const displayContent = convertContent(props);
  return (
    <span title={displayContent} >{displayContent}</span>
  );
};
