import { useState, useEffect } from 'react';
import {
  Radio, Space, Slider, InputNumber,
} from 'antd';
import { toPercentage, isNumber } from '@utils/browser/number';
import type { BasicFormItemProps } from '@/types';
import { SpaceAlignType } from '@/types/layout';

const defaultFieldWidgetWidthRatio = ['fixedField', 90, 10];
const defaultFieldWidgetAlign: AlignFormat = {
  type: SpaceAlignType.horizontal,
  value: defaultFieldWidgetWidthRatio,
};

type AlignFormat = {
  type: SpaceAlignType.vertical;
} | {
  type: SpaceAlignType.horizontal;
  value: WidthRatioFormat;
};

enum FieldWidgetRatioType {
  ratio = 'ratio',
  fixedField = 'fixedField',
  fixedWidget = 'fixedWidget',
  fixedTwo = 'fixedTwo',
};

// 对下面FieldWidgetWidthRatio组件生成的宽度比例值转换为样式
export const convertFieldWidgetWidthStyle = ([type, value, gap = 0]: [FieldWidgetRatioType, any, number]) => {
  gap = isNumber(gap) ? gap : 0;
  const config = {
    // ratio: () => [{ width: toPercentage(value) }, { width: toPercentage(100 - value) }],
    // fixedField: () => [{ width: value }, { width: `calc(100% - ${value}px)` }],
    // fixedWidget: () => [{ width: `calc(100% - ${value}px)` }, { width: value }],
    // fixedTwo: () => [{ width: value[0] }, { width: value[1] }],
    ratio: () => [{ width: `calc((100% - ${gap}px)*${toPercentage(value)})` }, { width: `calc((100% - ${gap}px)*${toPercentage(100 - value)})` }],
    fixedField: () => [{ width: value }, { width: `calc(100% - ${gap}px - ${value}px)` }],
    fixedWidget: () => [{ width: `calc(100% - ${gap}px - ${value}px)` }, { width: value }],
    fixedTwo: () => [{ width: value[0] }, { width: value[1] }],
  };
  return config[type]?.();
};

// 对下面FieldWidgetAlign组件生成的值转换为Space容器的属性和Space.Item的样式
export const convertFieldWidgetStyle = (value: AlignFormat) => {
  return {
    SpaceProps: {
      direction: value.type,
      gap: value.type === SpaceAlignType.vertical ? 0 : (value.value ?? defaultFieldWidgetWidthRatio)?.[2],
    },
    SpaceItemStyle: value.type === SpaceAlignType.vertical
      ? undefined
      : convertFieldWidgetWidthStyle(value.value),
  };
};

type WidthRatioFormat = any;

interface FieldWidgetWidthRatioProps extends BasicFormItemProps<WidthRatioFormat> {
  disabled?: boolean;
};

// 字段控件水平方向宽度比例设置组件
export function FieldWidgetWidthRatio ({
  value = defaultFieldWidgetWidthRatio,
  onChange,
  disabled = false,
}: FieldWidgetWidthRatioProps) {
  const [gap, setGap] = useState(value[2] ?? 0);
  const [ratio, setRatio] = useState(() => value[0] === 'ratio' ? value[1] : 50);
  const [fixedField, setFixedField] = useState(() => value[0] === 'fixedField' ? value[1] : undefined);
  const [fixedWidget, setFixedWidget] = useState(() => value[0] === 'fixedWidget' ? value[1] : undefined);
  const [fixedTwo, setFixedTwo] = useState(() => value[0] === 'fixedTwo' ? value[1] : [undefined, undefined]);

  // value发生变化时，调用相应的函数设置其值
  useEffect(() => {
    const config: any = {
      ratio: setRatio,
      fixedField: setFixedField,
      fixedWidget: setFixedWidget,
      fixedTwo: setFixedTwo,
    };
    config[value[0]]?.(value[1]);
    value[2] !== undefined && setGap(value[2]);
  }, [value]);

  return (
    <Radio.Group
      disabled={disabled}
      defaultValue={value[0]}
      value={value[0]}
      onChange={e => {
        const type = e.target.value;
        const config: any = {
          ratio,
          fixedField,
          fixedWidget,
          fixedTwo,
        };
        onChange([type, config[type], gap]);
      }}
    >
      <Space direction='vertical'>
        <InputNumber
          placeholder='水平间距'
          disabled={disabled}
          value={gap}
          onChange={val => onChange([value[0], value[1], val, gap])}
        />
        <Radio value='ratio' >
          宽度比例
          <Slider
            defaultValue={50}
            value={ratio}
            disabled={disabled || value[0] !== 'ratio'}
            style={{
              width: '180px',
            }}
            onChange={val => onChange(['ratio', val, gap])}
          />
        </Radio>
        <Radio value='fixedField' >
          固定字段
          <InputNumber
            disabled={disabled || value[0] !== 'fixedField'}
            placeholder='字段宽度'
            value={fixedField}
            onChange={val => onChange(['fixedField', val, gap])}
          />
        </Radio>
        <Radio value='fixedWidget' >
          固定控件
          <InputNumber
            disabled={disabled || value[0] !== 'fixedWidget'}
            placeholder='控件宽度'
            value={fixedWidget}
            onChange={val => onChange(['fixedWidget', val, gap])}
          />
        </Radio>
        <Radio value='fixedTwo' >
          固定字段和控件
          <InputNumber
            disabled={disabled || value[0] !== 'fixedTwo'}
            placeholder='字段宽度'
            value={fixedTwo[0]}
            onChange={val => onChange(['fixedTwo', val, gap])}
          />
          <InputNumber
            disabled={disabled || value[0] !== 'fixedTwo'}
            placeholder='控件宽度'
            value={fixedTwo[1]}
            onChange={val => onChange(['fixedTwo', val, gap])}
          />
        </Radio>
      </Space>
    </Radio.Group>
  );
};

// 字段、控件布局组件
export default function FieldWidgetAlign ({
  value = defaultFieldWidgetAlign,
  onChange,
}: BasicFormItemProps<AlignFormat>) {
  const [widthRatio, setWidthRatio] = useState(value.type === SpaceAlignType.horizontal ? value.value : defaultFieldWidgetWidthRatio);
  return (
    <Radio.Group
      value={value.type}
      onChange={e => {
        const type = e.target.value;
        onChange(
          type === SpaceAlignType.vertical
            ? {
                type: SpaceAlignType.vertical,
              }
            : {
                type: SpaceAlignType.horizontal,
                value: widthRatio,
              }
        );
      }}
    >
      <Space direction='vertical'>
        <Radio value='vertical' >
          垂直
        </Radio>
        <Radio value='horizontal' >
          水平
          <FieldWidgetWidthRatio
            disabled={value.type !== SpaceAlignType.horizontal}
            value={widthRatio}
            onChange={(val: any) => {
              setWidthRatio(val);
              onChange({
                type: SpaceAlignType.horizontal,
                value: val,
              });
            }}
          />
        </Radio>
      </Space>
    </Radio.Group>
  );
};
