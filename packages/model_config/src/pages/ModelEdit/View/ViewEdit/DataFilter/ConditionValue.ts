import { FieldType } from '@/common/constant'

export enum WordArrType {
  AND = 'and',
  OR = 'or',
  NOT = 'not',
  AND_NOT = 'andnot',
  OR_NOT = 'ornot'
}

// 条件组合逻辑允许出现的相连字母
export const wordArrContext: string[] = [WordArrType.AND, WordArrType.AND_NOT, WordArrType.NOT, WordArrType.OR, WordArrType.OR_NOT]

export enum EnumParamType {
  GLOBAL = 'GLOBAL',
  VALUE = 'VALUE',
  FIELD = 'FIELD'
}

export enum EnumGlobalType {
  DURATION_VALUE = 'DURATION_VALUE',
  DURATION_START_DATE = 'DURATION_START_DATE',
  DURATION_END_DATE = 'DURATION_END_DATE',
  COMPANY_NAME = 'COMPANY_NAME',
  COMPANY_CODE = 'COMPANY_CODE',
  USER_ID = 'USER_ID',
  // 期间值 期间起始日期 期间终止日期 公司名称 公司代码 账户id
}

export enum EnumOperateType {
  EQUAL = '=',
  NOT_EQUAL = '≠',
  IN = 'IN',
  NOT_IN = 'NOT IN',
  GREATER = '>',
  GREATER_EQUAL = '>=',
  LESS = '<',
  LESS_EQUAL = '<=',
  LIKE = 'LIKE',
  BETWEEN = 'BETWEEN'
}

export const operationType = [
  { value: EnumOperateType.IN, text: '包含', apply: [FieldType.ENUM] },
  { value: EnumOperateType.NOT_IN, text: '不包含', apply: [FieldType.ENUM] },
  { value: EnumOperateType.BETWEEN, text: '区间', apply: [FieldType.CURRENCY, FieldType.MONTH, FieldType.YEAR, FieldType.TIME, FieldType.DATE, FieldType.DATE_TIME, FieldType.YEAR_MONTH] },
  { value: EnumOperateType.EQUAL, text: '等于', apply: [FieldType.TEXT, FieldType.LONG_TEXT, FieldType.INTEGER, FieldType.CURRENCY, FieldType.MONTH, FieldType.YEAR, FieldType.TIME, FieldType.DATE, FieldType.DATE_TIME, FieldType.YEAR_MONTH] },
  { value: EnumOperateType.NOT_EQUAL, text: '不等于', apply: [FieldType.TEXT, FieldType.LONG_TEXT, FieldType.INTEGER, FieldType.CURRENCY, FieldType.MONTH, FieldType.YEAR, FieldType.TIME, FieldType.DATE, FieldType.DATE_TIME, FieldType.YEAR_MONTH] },
  { value: EnumOperateType.LESS, text: '小于', apply: [FieldType.CURRENCY, FieldType.INTEGER, FieldType.MONTH, FieldType.YEAR, FieldType.TIME, FieldType.DATE, FieldType.DATE_TIME, FieldType.YEAR_MONTH] },
  { value: EnumOperateType.GREATER, text: '大于', apply: [FieldType.CURRENCY, FieldType.INTEGER, FieldType.MONTH, FieldType.YEAR, FieldType.TIME, FieldType.DATE, FieldType.DATE_TIME, FieldType.YEAR_MONTH] },
  { value: EnumOperateType.GREATER_EQUAL, text: '大于等于', apply: [FieldType.CURRENCY, FieldType.INTEGER, FieldType.MONTH, FieldType.YEAR, FieldType.TIME, FieldType.DATE, FieldType.DATE_TIME, FieldType.YEAR_MONTH] },
  { value: EnumOperateType.LESS_EQUAL, text: '小于等于', apply: [FieldType.CURRENCY, FieldType.INTEGER, FieldType.MONTH, FieldType.YEAR, FieldType.TIME, FieldType.DATE, FieldType.DATE_TIME, FieldType.YEAR_MONTH] },
  { value: EnumOperateType.LIKE, text: '模糊查询', apply: [FieldType.TEXT, FieldType.LONG_TEXT, FieldType.TIME, FieldType.DATE, FieldType.DATE_TIME, FieldType.YEAR_MONTH] }
]

export enum EnumControlType {
  NumberInput = 'NumberInput',
  NumberRange = 'NumberRange',
  Input = 'Input',
  DateTimePicker = 'DateTimePicker',
  RangePicker = 'RangePicker ',
  EnumSelect = 'EnumSelect',
  MonthSelect = 'MonthSelect',
  MonthDoubleSelect = 'MonthDoubleSelect'
}

export const fieldTypeOperateMap: any = {
  [FieldType.INTEGER]: { operate: [EnumOperateType.EQUAL, EnumOperateType.NOT_EQUAL, EnumOperateType.GREATER, EnumOperateType.GREATER_EQUAL, EnumOperateType.LESS, EnumOperateType.LESS_EQUAL, EnumOperateType.BETWEEN], control: { normal: EnumControlType.NumberInput, [EnumOperateType.BETWEEN]: EnumControlType.NumberRange } },
  [FieldType.CURRENCY]: { operate: [EnumOperateType.EQUAL, EnumOperateType.NOT_EQUAL, EnumOperateType.GREATER, EnumOperateType.GREATER_EQUAL, EnumOperateType.LESS, EnumOperateType.LESS_EQUAL, EnumOperateType.BETWEEN], control: { normal: EnumControlType.NumberInput, [EnumOperateType.BETWEEN]: EnumControlType.NumberRange } },
  [FieldType.MONTH]: { operate: [EnumOperateType.EQUAL, EnumOperateType.NOT_EQUAL, EnumOperateType.GREATER, EnumOperateType.GREATER_EQUAL, EnumOperateType.LESS, EnumOperateType.LESS_EQUAL, EnumOperateType.BETWEEN], control: { normal: EnumControlType.MonthSelect, [EnumOperateType.BETWEEN]: EnumControlType.MonthDoubleSelect } },
  [FieldType.DATE]: { operate: [EnumOperateType.EQUAL, EnumOperateType.NOT_EQUAL, EnumOperateType.BETWEEN], control: { normal: EnumControlType.DateTimePicker, [EnumOperateType.BETWEEN]: EnumControlType.RangePicker } },
  [FieldType.YEAR]: { operate: [EnumOperateType.EQUAL, EnumOperateType.NOT_EQUAL, EnumOperateType.GREATER, EnumOperateType.GREATER_EQUAL, EnumOperateType.LESS, EnumOperateType.LESS_EQUAL, EnumOperateType.BETWEEN], control: { normal: EnumControlType.DateTimePicker, [EnumOperateType.BETWEEN]: EnumControlType.RangePicker } },
  [FieldType.TEXT]: { operate: [EnumOperateType.EQUAL, EnumOperateType.NOT_EQUAL, EnumOperateType.LIKE], control: { normal: EnumControlType.Input } },
  [FieldType.ENUM]: { operate: [EnumOperateType.IN, EnumOperateType.NOT_IN], control: { normal: EnumControlType.EnumSelect } }
}
fieldTypeOperateMap[FieldType.LONG_TEXT] = fieldTypeOperateMap[FieldType.TEXT]
fieldTypeOperateMap[FieldType.DECIMAL] = fieldTypeOperateMap[FieldType.CURRENCY]
fieldTypeOperateMap[FieldType.PERCENTAGE] = fieldTypeOperateMap[FieldType.CURRENCY]
fieldTypeOperateMap[FieldType.PERMILLAGE] = fieldTypeOperateMap[FieldType.CURRENCY]
fieldTypeOperateMap[FieldType.DATE_TIME] = fieldTypeOperateMap[FieldType.DATE]
fieldTypeOperateMap[FieldType.YEAR_MONTH] = fieldTypeOperateMap[FieldType.DATE]
fieldTypeOperateMap[FieldType.TIME] = fieldTypeOperateMap[FieldType.DATE]

export const paramType = [
  { value: EnumParamType.VALUE, text: '常量' },
  { value: EnumParamType.FIELD, text: '字段' }, // variables
  { value: EnumParamType.GLOBAL, text: '全局' }
]

export const globalType = [
  { value: EnumGlobalType.DURATION_VALUE, text: '期间值' },
  { value: EnumGlobalType.DURATION_START_DATE, text: '期间起始日期' },
  { value: EnumGlobalType.DURATION_END_DATE, text: '期间终止日期' },
  { value: EnumGlobalType.COMPANY_NAME, text: '公司名称' },
  { value: EnumGlobalType.COMPANY_CODE, text: '公司代码' },
  { value: EnumGlobalType.USER_ID, text: '当前登录ID' }
]

export const monthSelectValue = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
