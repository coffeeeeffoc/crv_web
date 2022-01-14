import WidgetButton from './WidgetButton';
import WidgetInteger, { DisplayTableContent as WidgetIntegerList } from './WidgetInteger';
import WidgetText, { DisplayTableContent as WidgetTextList } from './WidgetText';
import WidgetLongText, { DisplayTableContent as WidgetLongTextList } from './WidgetLongText';
import WidgetDate, { DisplayTableContent as WidgetDateList } from './WidgetDate';
import WidgetEnum, { DisplayTableContent as WidgetEnumList } from './WidgetEnum';
import WidgetCurrency, { DisplayTableContent as WidgetCurrencyList } from './WidgetCurrency';
import WidgetSingleSelect, { DisplayTableContent as WidgetSingleSelectList } from './WidgetSingleSelect';
import WidgetMultiSelect, { DisplayTableContent as WidgetMultiSelectList } from './WidgetMultiSelect';
import WidgetFormTable, { DisplayTableContent as WidgetFormTableList } from './WidgetFormTable';
import WidgetFormula, { DisplayTableContent as WidgetFormulaList } from './WidgetFormula';
import type { EnumFieldType } from '@/types';

// 字段类型默认的控件id
export const fieldTypeDefaultWidgetIDConfig = {
  TEXT: 'text',
  INTEGER: 'integer',
  LONG_TEXT: 'longText',
  DATE: 'date',
  DATE_TIME: 'dateTime',
  TIME: 'time',
  YEAR: 'year',
  MONTH: 'month',
  YEAR_MONTH: 'yearMonth',
  ENUM: 'enum',
  DECIMAL: 'decimal', // 暂时小数与货币保持一致
  CURRENCY: 'currency',
  MANY_TO_ONE: 'singleSelect',
  MANY_TO_MANY: 'multiSelect',
  ONE_TO_MANY: 'formTable',
  PERCENTAGE: 'percentage', // 百分比
  PERMILLAGE: 'permillage', // 千分比
  FORMULA: 'formula',
};

// 根据字段信息，查找该字段默认的控件
export const getDefaultWidgetByFieldType = (fieldType: EnumFieldType) => {
  return fieldTypeDefaultWidgetIDConfig[fieldType] ?? 'text';
};

// 所有的控件
export const allWidgets = [
  { id: 'button', name: '按钮', icon: '', form: WidgetButton },
  { id: 'integer', name: '普通文本', icon: '', form: WidgetInteger, list: WidgetIntegerList },
  { id: 'text', name: '普通文本', icon: '', form: WidgetText, list: WidgetTextList },
  { id: 'longText', name: '长文本', icon: '', form: WidgetLongText, list: WidgetLongTextList },
  { id: 'date', name: '日期', icon: '', form: WidgetDate, list: WidgetDateList },
  { id: 'currency', name: '货币', icon: '', form: WidgetCurrency, list: WidgetCurrencyList },
  { id: 'enum', name: '枚举', icon: '', form: WidgetEnum, list: WidgetEnumList },
  { id: 'singleSelect', name: '单选下拉', icon: '', form: WidgetSingleSelect, list: WidgetSingleSelectList },
  { id: 'multiSelect', name: '多选下拉', icon: '', form: WidgetMultiSelect, list: WidgetMultiSelectList },
  { id: 'formTable', name: '主从', icon: '', form: WidgetFormTable, list: WidgetFormTableList },
  { id: 'formula', name: '公式', icon: '', form: WidgetFormula, list: WidgetFormulaList },
];

// 自身类型没有相关控件，而复用其他类型的控件
const commonWidgetConfig: any = {
  dateTime: 'date',
  time: 'date',
  year: 'date',
  month: 'date',
  yearMonth: 'date',
  decimal: 'currency',
  percentage: 'currency',
  permillage: 'currency',
};

export enum EnumRenderType {
  form = 'form',
  list = 'list',
};

export const getWidgetById = (id: any, renderType: EnumRenderType = EnumRenderType.form) =>
  allWidgets.find((item) => item.id === (commonWidgetConfig[id] ?? id))?.[renderType];

export const getWidgetByFieldType = (fieldType: EnumFieldType, renderType: EnumRenderType = EnumRenderType.form) =>
  getWidgetById(getDefaultWidgetByFieldType(fieldType), renderType);
