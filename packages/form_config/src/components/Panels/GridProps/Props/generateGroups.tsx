import { languageTransform } from '@utils/browser/languages';
import { iconNames } from './config/icon';
import PropItem, { isMinMax } from './PropItem';
import type { defaultFieldsValueType } from '@/redux/slices/gridProps';
import { Radio } from 'antd';
import GridTemplate from './GridTemplate';
import { DEFAULT_ROW_UNIT } from '@/utils/store/grid';

export const DEFAULT_MIN = '20px';
export const DEFAULT_MAX = '60px';

export const unitDefaultValueMap = {
  fr: 1,
  px: 300,
  em: 4,
  vw: 20,
  vh: 20,
  '%': 50,
  minmax: '',
  auto: '',
  'min-content': '',
  'max-content': '',
  'auto-fill': '',
  'auto-fit': '',
  number: 3,
};
export const rowColumnUnit = ['number', 'auto-fill', 'auto-fit'];
export const widthHeightUnit = ['auto', 'fr', 'minmax', 'px', 'vh', 'vw', '%'];
export const basicUnit = ['px', 'vh', 'vw', '%'];
export const gapUnit = basicUnit;
export const justifyContent = Object.keys(iconNames.align.justifyContent);
export const alignContent = Object.keys(iconNames.align.alignContent);
export const justifyItems = Object.keys(iconNames.items.justifyItems);
export const alignItems = Object.keys(iconNames.items.alignItems);
export const justifySelf = Object.keys(iconNames.self.justifySelf);
export const alignSelf = Object.keys(iconNames.self.alignSelf);
export const DEFAULT_MIN_MAX_VALUE = `minmax(${DEFAULT_MIN}, ${DEFAULT_MAX})`;

export const noValueUnit = ['auto', 'min-content', 'max-content'];
export const minMaxUnit = ['minmax'];

export const basicFormatValue = ({ val, unit }: any) => `${val}${unit}`;

const rowColumnCountInitValue = (val: any) => {
  return typeof val === 'number' ? { value: val, unit: 'number' } : { unit: val };
};

const rowColumnCountFormatValue = ({ val, unit }: any) => {
  return unit === 'number' ? val : unit;
};

export const basicInitValue = (val: any) => {
  const res = parseValue(val);
  return { value: res[0], unit: res[1] };
};

export const unitsInitValue = (val: any) => {
  if (noValueUnit.includes(val)) {
    return { unit: val, value: '' };
  }
  if (isMinMax(val)) {
    return { unit: 'minmax', value: '' };
  }
  return basicInitValue(val);
};
const widthHeightUnitFormatValue = ({ val, unit, minVal, minUnit, maxVal, maxUnit }: any) => {
  if (unit === 'auto') {
    return unit;
  }
  if (unit === 'minmax') {
    return `minmax(${minVal}${minUnit}, ${maxVal}${maxUnit})`;
  }
  return basicFormatValue({ val, unit });
};

export const parseValue = (val: any) => {
  if (typeof val === 'number') {
    return [val, ''];
  } else if (typeof val === 'string') {
    const num = parseFloat(val);
    if (Number.isNaN(num)) {
      return ['', val];
    }
    return [num, val.replace(new RegExp(`^${num}`), '')];
  }
  return [];
};

export interface GroupsProps {
  fieldsValue: defaultFieldsValueType;
  setFieldsValue: (obj: Object) => void;
  isGridNull: boolean;
};

export const generateGroups = ({
  fieldsValue,
  setFieldsValue,
  isGridNull = true,
}: GroupsProps) => {
  const basicProps = {
    fieldsValue,
    setFieldsValue,
  };

  const extendProps = {
    ...basicProps,
    isBasic: false,
    initValue: (value: any) => ({ unit: value }),
    formatValue: ({ val, unit }: any) => unit,
  };
  const gridNullGroups = [
    {
      id: 'selfAlignment',
      title: languageTransform({ zh: '自身排列', en: 'Items Alignment' }),
      items: (
        <>
          <PropItem
            field='justifySelf'
            itemLabel={{ zh: '水平', en: 'justify-self' }}
            units={justifySelf.map(key => ({
              name: key,
              icon: (iconNames.self.justifySelf as any)[key],
              title: key,
            }))}
            {...extendProps}
          />
          <PropItem
            field='alignSelf'
            itemLabel={{ zh: '垂直', en: 'align-self' }}
            units={alignSelf.map(key => ({
              name: key,
              icon: (iconNames.self.alignSelf as any)[key],
              title: key,
            }))}
            {...extendProps}
          />
        </>
      ),
    },
  ];
  const groups = isGridNull
    ? gridNullGroups
    : [
        {
          id: 'basicProps',
          title: languageTransform({ zh: '基本属性', en: 'Basic Props' }),
          items: <BasicPropsItems basicProps={basicProps} />,
        },
        {
          id: 'autoFlow',
          title: languageTransform({ zh: '自动排列', en: 'Auto Flow' }),
          items: (
        <>
          <PropItem
            field='direction'
            itemLabel={{ zh: '优先排列方向', en: 'direction' }}
            units={[{
              name: 'row',
              icon: iconNames.direction.row,
              title: { zh: '行优先', en: 'row' },
            }, {
              name: 'column',
              icon: iconNames.direction.column,
              title: { zh: '列优先', en: 'column' },
            }]}
            {...extendProps}
            initValue={(val) => ({ unit: (fieldsValue.autoFlow as string).includes('row') ? 'row' : 'column' })}
            setFieldsValue={obj => {
              setFieldsValue({
                autoFlow: (fieldsValue.autoFlow as string).replace(/^(column|row)/, (obj as any).direction),
              });
            }}
          />
          <PropItem
            field='emptySpace'
            itemLabel={{ zh: '填充空隙方式', en: 'empty space' }}
            units={[{
              name: 'dontFill',
              icon: iconNames.emptySpace.dontFill,
              title: { zh: '不填充', en: 'don\'t fill' },
            }, {
              name: 'fill',
              icon: iconNames.emptySpace.fill,
              title: { zh: '填充', en: 'fill' },
            }]}
            {...extendProps}
            initValue={(val) => ({ unit: (fieldsValue.autoFlow as string).includes('dense') ? 'fill' : 'dontFill' })}
            setFieldsValue={obj => {
              setFieldsValue({
                autoFlow: (obj as any).emptySpace === 'fill'
                  ? `${fieldsValue.autoFlow} dense`
                  : (fieldsValue.autoFlow as string).replace(/\s+dense$/, ''),
              });
            }}
          />
        </>
          ),
        },
        {
          id: 'gridAlignment',
          title: languageTransform({ zh: '网格排列', en: 'Grid Alignment' }),
          items: (
        <>
          <PropItem
            field='justifyContent'
            itemLabel={{ zh: '水平', en: 'justify-content' }}
            units={justifyContent.map(key => ({
              name: key,
              icon: (iconNames.align.justifyContent as any)[key],
              title: key,
            }))}
            {...extendProps}
          />
          <PropItem
            field='alignContent'
            itemLabel={{ zh: '垂直', en: 'align-content' }}
            units={alignContent.map(key => ({
              name: key,
              icon: (iconNames.align.alignContent as any)[key],
              title: key,
            }))}
            {...extendProps}
          />
        </>
          ),
        },
        {
          id: 'itemsAlignment',
          title: languageTransform({ zh: '子项目排列', en: 'Items Alignment' }),
          items: (
        <>
          <PropItem
            field='justifyItems'
            itemLabel={{ zh: '水平', en: 'justify-items' }}
            units={justifyItems.map(key => ({
              name: key,
              icon: (iconNames.items.justifyItems as any)[key],
              title: key,
            }))}
            {...extendProps}
          />
          <PropItem
            field='alignItems'
            itemLabel={{ zh: '垂直', en: 'align-items' }}
            units={alignItems.map(key => ({
              name: key,
              icon: (iconNames.items.alignItems as any)[key],
              title: key,
            }))}
            {...extendProps}
          />
        </>
          ),
        },
        ...gridNullGroups,
      ];
  return groups;
};

const BasicPropsItems = ({
  basicProps,
}: any) => {
  const rowColumnCountProps = {
    ...basicProps,
    setFieldsValue: (obj: any) => {
      const key = Object.keys(obj)[0];
      const value = obj[key];
      const map: any = {
        rowCount: 'rowHeight',
        columnCount: 'columnWidth',
      };
      basicProps.setFieldsValue({
        ...obj,
        ...(typeof value === 'string' && ({
          [map[key]]: DEFAULT_MIN_MAX_VALUE,
        }))
      });
    },
    initValue: rowColumnCountInitValue,
    inputDisabledFn: (val: any, unit: any, fieldsValue: any) => unit !== 'number',
    units: rowColumnUnit,
    formatValue: rowColumnCountFormatValue,
  };
  const rowColumnHeightProps = {
    ...basicProps,
    initValue: unitsInitValue,
    inputDisabledFn: (val: any, unit: any, fieldsValue: any) => ['minmax', 'auto'].includes(unit),
    units: widthHeightUnit,
    formatValue: widthHeightUnitFormatValue,
  };
  const rowColumnGapProps = {
    ...basicProps,
    initValue: basicInitValue,
    units: gapUnit,
    formatValue: basicFormatValue,
  };
  const { explicitType } = basicProps.fieldsValue;
  return (
    <>
      <Radio.Group
        style={{
          gridColumn: 'heading / -1'
        }}
        value={explicitType}
        onChange={e => {
          basicProps.setFieldsValue({
            explicitType: e.target.value,
          });
        }}
      >
        <Radio key='explicit' value='explicit' >{languageTransform({ zh: '显式', en: 'explicit' })}</Radio>
        <Radio key='implicit' value='implicit' >{languageTransform({ zh: '隐式', en: 'implicit' })}</Radio>
      </Radio.Group>
      {
        explicitType === 'implicit'
          ? (
            <>
              <PropItem
                field='childrenCount'
                title='单元格个数'
                itemLabel={{ zh: '个数', en: 'children' }}
                initValue={(val: any) => ({ value: val })}
                formatValue={({ val, unit }) => val}
                {...basicProps}
              />
              <PropItem
                field='rowCount'
                itemLabel={{ zh: '行数', en: 'row count' }}
                {...rowColumnCountProps}
              />
              <PropItem
                field='columnCount'
                itemLabel={{ zh: '列数', en: 'column count' }}
                {...rowColumnCountProps}
              />
              <PropItem
                field='rowHeight'
                itemLabel={{ zh: '行高', en: 'row height' }}
                {...rowColumnHeightProps}
              />
              <PropItem
                field='columnWidth'
                itemLabel={{ zh: '列宽', en: 'column width' }}
                {...rowColumnHeightProps}
              />
            </>
            )
          : (
            <>
              <GridTemplate
                type='col'
              />
              <GridTemplate
                type='row'
                defaultItem={DEFAULT_ROW_UNIT}
              />
            </>
            )
      }
      <PropItem
        field='rowGap'
        itemLabel={{ zh: '行距', en: 'row gap' }}
        {...rowColumnGapProps}
      />
      <PropItem
        field='columnGap'
        itemLabel={{ zh: '列距', en: 'column gap' }}
        {...rowColumnGapProps}
      />
    </>
  );
};
