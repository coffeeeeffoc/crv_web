import { useEffect, useMemo, useState, cloneElement, useCallback } from 'react';
import {
  iconNames,
} from './config/icon';
import {
  InputNumber,
  Select,
} from 'antd';
import { languageTransform } from '@utils/browser/languages';
import type { Language } from '@utils/browser/languages';
import {
  parseValue, noValueUnit, basicUnit, unitsInitValue,
  DEFAULT_MIN_MAX_VALUE,
  DEFAULT_MIN,
  DEFAULT_MAX,
  basicFormatValue,
  unitDefaultValueMap,
} from './generateGroups';
import styles from './Groups.less';
import panelStyles from '@@/Panel/TogglePanel/index.less';
import type { defaultFieldsValueType } from '@/redux/slices/gridProps';
import classNames from 'classnames';
import DynamicSVGImport from '@rc/DynamicSVGImport';
import { usePreviousDiff } from '@rc/hooks/basic/usePrevious';

const { Option } = Select;

export type optionItemType = string | {
  name: string;
  title: Language;
  icon: string;
};
export const setOptions = (arr: optionItemType[]) => arr.map(item => {
  const name = typeof item === 'string' ? item : item?.name;
  const title = typeof item === 'string' ? item : item?.title;
  // TODO:icon功能暂时隐藏，后续再做优化
  // const icon = typeof item !== 'string' && item?.icon;
  // const importSvg = useCallback(async () => await import(`!!@svgr/webpack?-svgo,+titleProp,+ref!@/../public/assets/icons/${icon}.svg`), [icon]);
  return (
    <Option key={name} value={name} >
      {/* {icon && (
        <DynamicSVGImport
          importSvg={importSvg}
          svgProps={{ className: classNames(styles.optionIcon, styles.svg) }}
        />
      )} */}
      {languageTransform(title)}
    </Option>
  );
});
type CustomContentType = (label: React.ReactNode, value: React.ReactNode, unit: React.ReactNode) => React.ReactNode;
interface PropItemProps {
  value?: string | number;
  field?: string;
  fieldsValue?: defaultFieldsValueType;
  title?: string | React.ReactNode;
  itemLabel?: Language;
  // TODO:定义函数的类型
  initValue?: (value: number|string) => { value?: any; unit?: number|string };
  units?: optionItemType[];
  // TODO:定义函数的类型
  inputDisabledFn?: (val: any, unit: any, fieldsValue: any) => any;
  setFieldsValue?: (obj: Object) => void;
  // 是否基本属性
  isBasic?: boolean;
  formatValue?: (obj: { val: any; unit: any;minVal?: any; minUnit?: any; maxVal?: any; maxUnit?: any }) => any;
  customContent?: CustomContentType;
  // 单位是否可多选
  unitMultiple?: boolean;
  filterOptions?: (options: optionItemType[]) => optionItemType[];
  // 最大最小的单位
  minmaxUnit?: string[];
};

export const minMaxReg = /^minmax\([^,]+,[\s]*[^,]+\)$/;
export const minMaxValReg = /^minmax\(([^,]+),[\s]*([^,]+)\)$/;
export const isMinMax = (str: string) => !!str?.match?.(minMaxReg);

const defaultCustomContent: CustomContentType = (label, value, unit) => <>{label}{value}{unit}</>;

const voidFunction = () => {};
const setValueFallback = (val: any, unit: any): any => {
  return val ?? ((unitDefaultValueMap as any)[unit] ?? '');
};

export default function PropItem ({
  value: originalValue,
  field = '',
  itemLabel,
  initValue,
  units,
  inputDisabledFn,
  fieldsValue = {},
  setFieldsValue = voidFunction,
  formatValue = basicFormatValue,
  isBasic = true,
  customContent = defaultCustomContent,
  unitMultiple = false,
  filterOptions = options => options,
  minmaxUnit = basicUnit,
}: PropItemProps) {
  const value = originalValue ?? fieldsValue[field];
  const minMaxVisible = useMemo(() => typeof value === 'string' && value.match(minMaxReg), [value]);
  const minMaxVal: any = (typeof value === 'string' ? value : DEFAULT_MIN_MAX_VALUE).match(minMaxValReg);
  const initialValueResult = initValue?.(value);
  const initialUnit = initialValueResult?.unit ?? (typeof (units?.[0]) === 'object' ? units[0].name : units?.[0]);
  const initialValue = setValueFallback(initialValueResult?.value ?? value, initialUnit);
  const [unit, setUnit] = useState(initialUnit);
  const [val, setVal] = useState(initialValue);
  const [minVal, minUnit] = parseValue(minMaxVal?.[1] ?? DEFAULT_MIN);
  const [maxVal, maxUnit] = parseValue(minMaxVal?.[2] ?? DEFAULT_MAX);

  const callback = useCallback(() => {
    const newVal = setValueFallback('', unit);
    setFieldsValue({ [field]: formatValue({ val: newVal, unit, minVal, minUnit, maxVal, maxUnit }) });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [field, maxUnit, maxVal, minUnit, minVal, unit]);
  usePreviousDiff(unit, callback);
  useEffect(() => {
    const res = initValue?.(value);
    if (res?.value !== undefined) {
      setVal(setValueFallback(res.value, res?.unit));
    }
    res?.unit && setUnit(res.unit);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, initValue]);
  const thisIconName = (iconNames as any)[field];
  const minMaxCommonProps: PropItemProps = {
    customContent: (label, value, unit) => {
      return (
        <>{label && cloneElement(label as React.ReactElement, {
          style: {
            textAlign: 'right',
          },
        })}{value}{unit}</>
      );
    },
    units: minmaxUnit,
    inputDisabledFn: (val: any, unit: any, fieldsValue: any) => noValueUnit.includes(unit),
    initValue: unitsInitValue,
    formatValue: ({ val, unit }: any) => noValueUnit.includes(unit) ? unit : `${val}${unit}`,
  };
  return (
    <>
      {customContent(
        (itemLabel && <label htmlFor={field} >
          {isBasic && thisIconName && <DynamicSVGImport
            importSvg={async () => await import(`!!@svgr/webpack?-svgo,+titleProp,+ref!@/../public/assets/icons/${thisIconName}.svg`)}
            svgProps={{ className: classNames(styles.optionIcon) }}
          />}
          <span>{languageTransform(itemLabel)}</span>
        </label>),
        (isBasic && <div className='value' >
          <InputNumber
            value={val}
            disabled={inputDisabledFn?.(val, unit, fieldsValue)}
            onChange={v => setFieldsValue({ [field]: formatValue({ val: v, unit, minVal, minUnit, maxVal, maxUnit }) })}
          />
        </div>),
        (!units
          ? null
          : <div className={classNames('unit', { noValue: !isBasic })} >
            <Select
              mode={unitMultiple ? 'multiple' : undefined}
              value={unit}
              dropdownClassName={panelStyles.dropdown}
              onChange={v => setFieldsValue({ [field]: formatValue({ val, unit: v, minVal, minUnit, maxVal, maxUnit }) })}
            >
              {setOptions((unitMultiple && filterOptions) ? filterOptions(units) : units)}
            </Select>
          </div>)
      )}
      {minMaxVisible && (
        <>
          <PropItem {...{
            ...minMaxCommonProps,
            itemLabel: { zh: '最小', en: 'min' },
            value: `${minVal}${minUnit}`,
            field: 'min',
            setFieldsValue: (obj: any) => {
              setFieldsValue({ [field]: `minmax(${obj.min}, ${maxVal}${maxUnit})` });
            },
          }}/>
          <PropItem {...{
            ...minMaxCommonProps,
            itemLabel: { zh: '最大', en: 'max' },
            value: `${maxVal}${maxUnit}`,
            field: 'max',
            setFieldsValue: (obj: any) => {
              setFieldsValue({ [field]: `minmax(${minVal}${minUnit}, ${obj.max})` });
            },
          }}/>
        </>
      )}
    </>
  );
};
