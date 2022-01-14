// 操作步骤目标数据
export enum ActionTargetDataType {
  // 不需要选择数据
  NO_SEL_DATA = 'NO_SEL_DATA',
  // 仅选择呢一行数据
  ONLY_ONE = 'ONLY_ONE',
  // 选择多行数据
  MULTIPLE = 'MULTIPLE'
}

// 选择字符
export enum OperateType {
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

export const OperateTypeMap: any = {
  [OperateType.EQUAL]: '$eq',
  [OperateType.NOT_EQUAL]: '$neq',
  [OperateType.GREATER]: '$gt',
  [OperateType.LESS]: '$lt',
  [OperateType.GREATER_EQUAL]: '$gte',
  [OperateType.LESS_EQUAL]: '$lte',
  [OperateType.IN]: '$in',
  [OperateType.NOT_IN]: '$nin',
  [OperateType.BETWEEN]: '$gte,$lte',
  [OperateType.LIKE]: '$like'
}

export const OperateTypeValue: any = {
  [OperateType.EQUAL]: '等于',
  [OperateType.NOT_EQUAL]: '不等于',
  [OperateType.IN]: '包含多个',
  [OperateType.NOT_IN]: '排除多个',
  [OperateType.GREATER]: '大于',
  [OperateType.GREATER_EQUAL]: '大于等于',
  [OperateType.LESS]: '小于',
  [OperateType.LESS_EQUAL]: '小于等于',
  [OperateType.LIKE]: '包含',
  [OperateType.BETWEEN]: '两者之间',
}

export enum DateShowType {
  // YYYY-MM-DD
  HYPHEN_PREFIX = 'HYPHEN_PREFIX',
  // YYYY-M-DD
  HYPHEN_NON_PREFIX = 'HYPHEN_NON_PREFIX',
  // YYYY/MM/DD
  SLASH_PREFIX = 'SLASH_PREFIX',
  // YYYY/M/DD
  SLASH_NON_PREFIX = 'SLASH_NON_PREFIX'
}

export const DateShowTypeValue: any = {
  [DateShowType.HYPHEN_PREFIX]: 'YYYY-MM-DD',
  [DateShowType.HYPHEN_NON_PREFIX]: 'YYYY-M-DD',
  [DateShowType.SLASH_PREFIX]: 'YYYY/MM/DD',
  [DateShowType.SLASH_NON_PREFIX]: 'YYYY/M/DD',
}

export enum DateTimeShowType {
  HYPHEN_PREFIX_DEFAULT = 'HYPHEN_PREFIX_DEFAULT', // (yyyy-MM-dd HH:mm:ss [2020-11-04 15:06:01]),   日期通过-分隔，不足两位补零，时间为24小时制
  HYPHEN_NON_PREFIX_DEFAULT = 'HYPHEN_NON_PREFIX_DEFAULT', // (yyyy-MM-dd HH:mm:ss [2020-11-4 15:6:1]),      日期通过-分隔，不补零，时间为24小时制
  SLASH_PREFIX_DEFAULT = 'SLASH_PREFIX_DEFAULT', // (yyyy/MM/dd HH:mm:ss [2020/11/04 15:06:01]),   日期通过/分隔，不足两位补零，时间为24小时制
  SLASH_NON_PREFIX_DEFAULT = 'SLASH_NON_PREFIX_DEFAULT', // (yyyy/MM/dd HH:mm:ss [2020/11/4 15:6:1]),      日期通过/分隔，不补零，时间为24小时制
  HYPHEN_PREFIX_AM_PM = 'HYPHEN_PREFIX_AM_PM', // (yyyy-MM-dd HH:mm:ss [2020-11-04 03:56:31 PM]),日期通过-分隔，不足两位补零，时间为12小时制
  HYPHEN_NON_PREFIX_AM_PM = 'HYPHEN_NON_PREFIX_AM_PM', // (yyyy-MM-dd HH:mm:ss [2020-11-4 3:56:31 PM]),  日期通过-分隔，不补零，时间为12小时制
  SLASH_PREFIX_AM_PM = 'SLASH_PREFIX_AM_PM', // (yyyy/MM/dd HH:mm:ss [2020/11/04 03:56:31 PM]),日期通过/分隔，不足两位补零，时间为12小时制
  SLASH_NON_PREFIX_AM_PM = 'SLASH_NON_PREFIX_AM_PM' // (yyyy/MM/dd HH:mm:ss [2020/11/4 3:56:31 PM]),  日期通过/分隔，不补零，时间为12小时制
}

export const DateTimeShowTypeValue: any = {
  [DateTimeShowType.HYPHEN_PREFIX_DEFAULT]: 'YYYY-MM-DD HH:mm:ss',
  [DateTimeShowType.HYPHEN_NON_PREFIX_DEFAULT]: 'YYYY-M-D H:m:s',
  [DateTimeShowType.SLASH_PREFIX_DEFAULT]: 'YYYY/MM/DD HH:mm:ss',
  [DateTimeShowType.SLASH_NON_PREFIX_DEFAULT]: 'YYYY/M/D H:m:s',
  [DateTimeShowType.HYPHEN_PREFIX_AM_PM]: 'YYYY-MM-DD hh:mm:ss A',
  [DateTimeShowType.HYPHEN_NON_PREFIX_AM_PM]: 'YYYY-M-D h:m:s A',
  [DateTimeShowType.SLASH_PREFIX_AM_PM]: 'YYYY/MM/DD hh:mm:ss A',
  [DateTimeShowType.SLASH_NON_PREFIX_AM_PM]: 'YYYY/M/D h:m:s A',
}

export enum YearShowType {
  // YYYY
  FULL = 'FULL',
  // YY
  HALF = 'HALF',
}

export const YearShowTypeValue: any = {
  // YYYY
  [YearShowType.FULL]: 'YYYY',
  // YY
  [YearShowType.HALF]: 'YY'
}

export enum MonthShowType {
  // YYYY
  NORMAL = 'NORMAL',
  // YY
  ZERO_FILL = 'ZERO_FILL',
}

export enum TimeShowType {
  // YYYY
  DEFAULT = 'DEFAULT',
  // YY
  AM_PM = 'AM_PM',
}

export const TimeShowTypeValue: any = {
  // YYYY
  [TimeShowType.DEFAULT]: 'HH:mm:ss',
  // YY
  [TimeShowType.AM_PM]: 'Ah:m:s',
}

export enum YearMonthShowType {
  // YYYY-M
  FULL_NORMAL = 'FULL_NORMAL',
  // YYYY-MM
  FULL_ZERO_FILL = 'FULL_ZERO_FILL',
  // YY-M
  HALF_NORMAL = 'HALF_NORMAL',
  // YY-MM
  HALF_ZERO_FILL = 'HALF_ZERO_FILL'
}

export const YearMonthShowTypeValue: any = {
  [YearMonthShowType.FULL_NORMAL]: 'YYYY-M',
  [YearMonthShowType.FULL_ZERO_FILL]: 'YYYY-MM',
  [YearMonthShowType.HALF_NORMAL]: 'YY-M',
  [YearMonthShowType.HALF_ZERO_FILL]: 'YY-MM',
}

// DATE默认值类型
export enum DefaultTypeStyle {
  // 系统当前日期
  SYSTEM_DATE = 'SYSTEM_DATE',
  // 固定日期
  FIXED_DATE = 'FIXED_DATE',
  // 无默认值
  NON_DATE = 'NON_DATE'
}

// CURRENCY显示格式
export enum CurrencyShowType {
  THOUSAND_SEPARATORS = 'THOUSAND_SEPARATORS',
  NORMAL = 'NORMAL'
}

// 字段的类型
export enum EnumFieldType {
  DATE_TIME = 'DATE_TIME',
  TEXT = 'TEXT',
  INTEGER = 'INTEGER',
  CURRENCY = 'CURRENCY',
  DATE = 'DATE',
  LONG_TEXT = 'LONG_TEXT',
  DECIMAL = 'DECIMAL',
  DOUBLE = 'DOUBLE',
  TIME = 'TIME',
  YEAR = 'YEAR',
  YEAR_MONTH = 'YEAR_MONTH',
  MONTH = 'MONTH',
  PASSWORD = 'PASSWORD',
  FILE = 'FILE',
  ENUM = 'ENUM',
  PERCENTAGE = 'PERCENTAGE',
  PERMILLAGE = 'PERMILLAGE',
  FORMULA = 'FORMULA',
  CALCULATION = 'CALCULATION',
  ONE_TO_MANY = 'ONE_TO_MANY',
  MANY_TO_ONE = 'MANY_TO_ONE',
  MANY_TO_MANY = 'MANY_TO_MANY'
}

// 位置显示格式
export enum AlignType {
  LEFT = 'LEFT',
  CENTER = 'CENTER',
  RIGHT = 'RIGHT'
}

// 位置显示格式对应样式
export enum AlignColumnType {
  COLUMN_LEFT = 'column-left',
  COLUMN_CENTER = 'column-center',
  COLUMN_RIGHT = 'column-right'
}

// 排序转换
export enum EnumSorterType {
  ASCEND = 'ascend',
  ASC = 'asc',
  DESCEND = 'descend',
  DESC = 'desc'
}

// 关联字段集
export const associatedField: EnumFieldType[] = [EnumFieldType.ONE_TO_MANY, EnumFieldType.MANY_TO_ONE, EnumFieldType.MANY_TO_MANY]
// 计算字段
export const formulaField: EnumFieldType = EnumFieldType.FORMULA;
