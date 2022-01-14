import { FieldType, associateFieldType } from '@/common/constant'

export interface OptionType {
  value: string
  label: string
}
// 控件的名称
export enum ControlType {
  INPUT = 'Input',
  INPUT_NUMBER = 'InputNumber',
  CHECKBOX = 'Checkbox',
  TEXTAREA = 'TextArea',
  SELECT = 'Select',
  DATE_PICKER = 'DatePicker',
  LANGUAGE_INPUT = 'LanguageInput',
  LANGUAGE_TEXTAREA = 'LanguageTextArea',
  EFFECTIVE_RULE = 'EffectiveRule',
  DIVIDER = 'Divider',
  INPUT_WITH_LENGTH = 'InputWithLength',
  SELECT_RESPONSE = 'selectResponse',
  TIME_NO_LIMIT_PICKER = 'TimeNoLimitPicker',
  ENUM_SELECT = 'EnumSelect',
  AUTOCOMPLETE = 'AutoComplete'
}

// 显示对应的文本内容
export const DisplayField: any = {
  [FieldType.TEXT]: '普通文本',
  [FieldType.LONG_TEXT]: '长文本',
  [FieldType.INTEGER]: '整数',
  [FieldType.DECIMAL]: '小数',
  [FieldType.CURRENCY]: '货币',
  [FieldType.TIME]: '时间',
  [FieldType.DATE]: '日期',
  [FieldType.DATE_TIME]: '日期时间',
  [FieldType.YEAR]: '年度',
  [FieldType.MONTH]: '月份',
  [FieldType.PASSWORD]: '密码',
  [FieldType.FILE]: '文件',
  [FieldType.ENUM]: '选项列表',
  [FieldType.FORMULA]: '公式',
  [FieldType.MANY_TO_ONE]: '单选查找关系',
  [FieldType.MANY_TO_MANY]: '多选查找关系',
  [FieldType.ONE_TO_MANY]: '主从关系',
  [FieldType.YEAR_MONTH]: '年月',
  [FieldType.PERCENTAGE]: '百分比',
  [FieldType.PERMILLAGE]: '千分比'
}
// 模型类型
export const displayModelType: any = {
  ENTITY: '实体'
}
// date related fields, direct use format
export const dateRelatedFields: FieldType[] = [FieldType.DATE, FieldType.DATE_TIME, FieldType.MONTH, FieldType.TIME, FieldType.YEAR, FieldType.YEAR_MONTH]
// 货币的显示格式
export enum CurrencyShowType {
  THOUSAND_SEPARATORS = 'THOUSAND_SEPARATORS',
  NORMAL = 'NORMAL'
}
export const currencyShowTypeOption: OptionType[] = [
  { value: CurrencyShowType.NORMAL, label: '普通形式显示(123456.789)' },
  { value: CurrencyShowType.THOUSAND_SEPARATORS, label: '千分符显示(123,456.789)' }
]
// 小数的显示格式
export enum DecimalShowType {
  THOUSAND_SEPARATORS = 'THOUSAND_SEPARATORS',
  NORMAL = 'NORMAL'
}
export const decimalShowTypeOption: OptionType[] = [
  { value: CurrencyShowType.NORMAL, label: '普通形式显示(123456.789)' },
  { value: CurrencyShowType.THOUSAND_SEPARATORS, label: '千分符显示(123,456.789)' }
]
// 整数的显示格式
export enum IntegerShowType {
  THOUSAND_SEPARATORS = 'THOUSAND_SEPARATORS',
  NORMAL = 'NORMAL'
}
export const integerShowTypeOption: OptionType[] = [
  { value: IntegerShowType.NORMAL, label: '普通形式显示(123456)' },
  { value: IntegerShowType.THOUSAND_SEPARATORS, label: '千分符显示(123,456)' }
]
// 百分符的显示格式
export enum PercentageShowType {
  THOUSAND_SEPARATORS = 'THOUSAND_SEPARATORS',
  NORMAL = 'NORMAL'
}
export const percentageShowTypeOption: OptionType[] = [
  { value: PercentageShowType.NORMAL, label: '普通形式显示(123456.789%)' },
  { value: PercentageShowType.THOUSAND_SEPARATORS, label: '千分符显示(123,456.789%)' }
]
// 千分符的显示格式
export enum PermillageShowType {
  THOUSAND_SEPARATORS = 'THOUSAND_SEPARATORS',
  NORMAL = 'NORMAL'
}
export const permillageShowTypeOption: OptionType[] = [
  { value: PermillageShowType.NORMAL, label: '普通形式显示(123456.789‰)' },
  { value: PermillageShowType.THOUSAND_SEPARATORS, label: '千分符显示(123,456.789‰)' }
]

// 日期的显示格式
export const dateShowTypeOption: OptionType[] = [
  { value: 'YYYY-MM-DD', label: 'YYYY-MM-DD（2021-01-01）' },
  { value: 'YYYY-M-D', label: 'YYYY-M-D（2021-1-1）' },
  { value: 'YYYY/MM/DD', label: 'YYYY/MM/DD（2021/01/01）' },
  { value: 'YYYY/M/D', label: 'YYYY/M/D（2021/1/1）' }
]
// 默认值类型
export enum EnumDefaultType {
  SYSTEM = 'SYSTEM',
  FIXED = 'FIXED',
  NONE = 'NONE'
}
export const timeShowTypeOption: OptionType[] = [
  { value: 'hh:mm:ss a', label: '12时制（11.59.59 am）' },
  { value: 'HH:mm:ss', label: '24时制（23.59.59）' }
]
// 时间日期的显示格式 dateTime's showType
export const dateTimeShowTypeOption: OptionType[] = [
  { value: 'YYYY-MM-DD HH:mm:ss', label: 'YYYY-MM-DD HH:mm:ss(2121-01-01 23.59.59)' },
  { value: 'YYYY-MM-DD hh:mm:ss A', label: 'YYYY-MM-DD hh:mm:ss A(2121-01-01 11.59.59 P)' },
  { value: 'YYYY-M-D HH:mm:ss', label: 'YYYY-M-D HH:mm:ss(2121-1-1 23.59.59)' },
  { value: 'YYYY-M-D hh:mm:ss A', label: 'YYYY-M-D hh:mm:ss A(2121-1-1 11.59.59 P)' },
  { value: 'YYYY/MM/DD HH:mm:ss', label: 'YYYY/MM/DD HH:mm:ss(2121/01/01 23.59.59)' },
  { value: 'YYYY/MM/DD hh:mm:ss A', label: 'YYYY/MM/DD hh:mm:ss A(2121/1/1 11.59.59 P)' },
  { value: 'YYYY/M/D HH:mm:ss', label: 'YYYY/M/D HH:mm:ss(2121/01/01 23.59.59)' },
  { value: 'YYYY/M/D hh:mm:ss A', label: 'YYYY/M/D hh:mm:ss A(2121/1/1 11.59.59 P)' }
]
// 年度的显示格式 year's showType
export const yearShowTypeOption: OptionType[] = [
  { value: 'YYYY', label: 'YYYY(2021)' },
  { value: 'YY', label: 'YY(21)' }
]
// 月份的显示格式 month's showType
export const monthShowType: OptionType[] = [
  { value: 'MM', label: 'MM(01)' },
  { value: 'M', label: 'M(1)' }
]
// 年月的显示格式 yearMonth's showType
export const yearMonthTypeOption: OptionType[] = [
  { value: 'YYYY/MM', label: 'YYYY/MM(2021/01)' },
  { value: 'YYYY/M', label: 'YYYY/M(2021/1)' },
  { value: 'YY/M', label: 'YY/M(21/1)' },
  { value: 'YY/MM', label: 'YY/MM(21/01)' },
  { value: 'YY-M', label: 'YY-M(21-1)' },
  { value: 'YY-MM', label: 'YY-MM(21-01)' },
  { value: 'YYYY-M', label: 'YYYY-M(2021-1)' },
  { value: 'YYYY-MM', label: 'YYYY-MM(2021-01)' }
]

// 字段的选择
export const SelectField = [
  { value: FieldType.TEXT, label: '普通文本，最长允许65535个英文字符，超过请使用长文本字段。' },
  { value: FieldType.LONG_TEXT, label: '长文本，注意长文本字段对查询速度会有明显的影响，导致查询变慢。' },
  { value: FieldType.INTEGER, label: '整数，用于不带小数的数字。' },
  { value: FieldType.DECIMAL, label: '小数，用于带小数的数字。' },
  { value: FieldType.PERCENTAGE, label: '百分比，用于需百分比展示的数字。' },
  { value: FieldType.PERMILLAGE, label: '千分比，用于需千分比展示的数字。' },
  { value: FieldType.CURRENCY, label: '货币，用于带小数的数字，比如费用、金额等。' },
  { value: FieldType.TIME, label: '时间，仅包含时间，默认格式为：hh:mm:ss。' },
  { value: FieldType.DATE, label: '日期，仅包含日期，默认格式为：YYYY-MM-DD。' },
  { value: FieldType.DATE_TIME, label: '日期时间，包含日期和时间，默认格式为：YYYY-MM-DD hh:mm:ss。' },
  { value: FieldType.YEAR_MONTH, label: '年月，包含年度和月份，默认格式为：YYYY-MM。' },
  { value: FieldType.YEAR, label: '年度，仅包含年份，默认格式为：YYYY。' },
  { value: FieldType.MONTH, label: '月份，默认格式为：MM。' },
  { value: FieldType.ENUM, label: '选项列表，用于在固定的候选值中选择。' },
  { value: FieldType.FORMULA, label: '公式，允许通过指定计算公式，从其它字段计算获得显示的值。' },
  { value: FieldType.MANY_TO_ONE, label: '单选查找关系，本表中的字段值需要从另一个表中选取，选择时仅允许单选。' },
  { value: FieldType.MANY_TO_MANY, label: '多选查找关系，本表中的字段值需要从另一个表中选取，选择时允许多选。' },
  { value: FieldType.ONE_TO_MANY, label: '主从关系，本表为主表，允许通过这个字段关联到一个子表，主表中的一个记录对应子表中多条记录，当主表记录删除时，子表中的相关记录将同时删除。' }
]

// 主从的deleteType
export enum OneToManyDeleteType {
  DELETE = 'DELETE',
  RESET = 'RESET',
  KEEP = 'KEEP'
}

// style constant
export const FIELD_CONFIG_COL_STYLE = { paddingLeft: 50, paddingRight: 50 }
export const FIELD_FORM_STYLE = { width: '100%', margin: 'auto', padding: 20 }
export const FIELD_FORM_DIV_AUTO = { overflow: 'auto', height: 'calc(100vh - 115px)' }

// edit field data, empty following fieldType's field content turn null into ''
export const emptyTurn: any = {
  [FieldType.CURRENCY]: ['showDigits', 'maxValue', 'minValue', 'defaultValue'],
  [FieldType.INTEGER]: ['showDigits', 'maxValue', 'minValue', 'defaultValue'],
  [FieldType.DECIMAL]: ['showDigits', 'maxValue', 'minValue', 'defaultValue'],
  [FieldType.PERCENTAGE]: ['showDigits', 'maxValue', 'minValue', 'defaultValue'],
  [FieldType.PERMILLAGE]: ['showDigits', 'maxValue', 'minValue', 'defaultValue'],
}

export const fieldShowTypeOption: any = {
  [FieldType.TEXT]: [],
  [FieldType.LONG_TEXT]: [],
  [FieldType.INTEGER]: integerShowTypeOption,
  [FieldType.DECIMAL]: decimalShowTypeOption,
  [FieldType.CURRENCY]: currencyShowTypeOption,
  [FieldType.TIME]: timeShowTypeOption,
  [FieldType.DATE]: dateShowTypeOption,
  [FieldType.DATE_TIME]: dateTimeShowTypeOption,
  [FieldType.YEAR]: yearShowTypeOption,
  [FieldType.MONTH]: monthShowType,
  [FieldType.PASSWORD]: [],
  [FieldType.FILE]: [],
  [FieldType.ENUM]: [],
  [FieldType.FORMULA]: [],
  [FieldType.MANY_TO_ONE]: [],
  [FieldType.MANY_TO_MANY]: [],
  [FieldType.ONE_TO_MANY]: [],
  [FieldType.YEAR_MONTH]: yearMonthTypeOption,
  [FieldType.PERCENTAGE]: percentageShowTypeOption,
  [FieldType.PERMILLAGE]: permillageShowTypeOption
}

// not yet built fieldType
export const notYetFieldType: FieldType[] = [FieldType.FILE, FieldType.PASSWORD, FieldType.FORMULA]

// formula 's settlement result type
export const formulaResultType: OptionType[] = Object.keys(DisplayField).filter((item: any) => !associateFieldType.includes(item) && !notYetFieldType.includes(item)).map(item => ({
  value: item,
  label: DisplayField[item]
}))
