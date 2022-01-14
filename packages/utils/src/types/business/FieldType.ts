// 枚举：字段类型
export enum EnumFieldType {
  // 整数
  INTEGER = 'INTEGER',
  // 普通文本
  TEXT = 'TEXT',
  // 长文本
  LONG_TEXT = 'LONG_TEXT',
  // 日期时间
  DATE_TIME = 'DATE_TIME',
  // 时间
  TIME = 'TIME',
  // 年月
  YEAR_MONTH = 'YEAR_MONTH',
  // 年
  YEAR = 'YEAR',
  // 月
  MONTH = 'MONTH',
  // 枚举
  ENUM = 'ENUM',
  // 小数
  DECIMAL = 'DECIMAL',
  // 货币
  CURRENCY = 'CURRENCY',
  // 日期
  DATE = 'DATE',
  // 单选
  MANY_TO_ONE = 'MANY_TO_ONE',
  // 主从
  ONE_TO_MANY = 'ONE_TO_MANY',
  // 多选
  MANY_TO_MANY = 'MANY_TO_MANY',
  // 公式字段
  FORMULA = 'FORMULA',
  // 百分比
  PERCENTAGE = 'PERCENTAGE',
  // 千分比
  PERMILLAGE = 'PERMILLAGE',
};

export const Field_HasProp_ShowType = [
  EnumFieldType.DATE,
  EnumFieldType.DATE_TIME,
  EnumFieldType.TIME,
  EnumFieldType.YEAR,
  EnumFieldType.YEAR_MONTH,
  EnumFieldType.MONTH,
  EnumFieldType.MANY_TO_MANY,
  EnumFieldType.MANY_TO_ONE,
  EnumFieldType.ONE_TO_MANY,
];
export const Field_HasProp_ShowFormat = [
  EnumFieldType.DATE,
  EnumFieldType.DATE_TIME,
  EnumFieldType.TIME,
  EnumFieldType.YEAR,
  EnumFieldType.YEAR_MONTH,
  EnumFieldType.MONTH,
  EnumFieldType.MANY_TO_MANY,
  EnumFieldType.MANY_TO_ONE,
  EnumFieldType.ONE_TO_MANY,
];
// 日期、时间等一类控件的format格式，比如yyyy-mm-dd
export type DATE_TIME_FORMAT = string;

// 整形INTEGER类型的显示格式
export enum EnumIntegerShowType {
  THOUSAND_SEPARATORS = 'THOUSAND_SEPARATORS',
  NORMAL = 'NORMAL',
};

// 枚举：DECIMAL类型的显示格式
export enum EnumDecimalShowType {
  // 正常显示
  NORMAL = 'NORMAL',
  // 千分符，默认逗号[,]分隔
  THOUSAND_SEPARATORS = 'THOUSAND_SEPARATORS',
  // // 百分比,[%]
  // PERCENTAGE = 'PERCENTAGE',
  // // 千分比,[‰]
  // PER_THOUSAND = 'PER_THOUSAND',
};

export const refFields = [
  EnumFieldType.MANY_TO_MANY,
  EnumFieldType.MANY_TO_ONE,
  EnumFieldType.ONE_TO_MANY,
];

// 下拉选的字段类型
export const refSelectFieldType = [EnumFieldType.MANY_TO_MANY, EnumFieldType.MANY_TO_ONE];

export type FieldSelect = FieldManyToOne | FieldManyToMany;

// 枚举：DATE类型的默认值类型
export enum EnumDateDefaultValueType {
  // 系统当前日期
  SYSTEM = 'SYSTEM',
  // 固定日期
  FIXED = 'FIXED',
  // 无默认值
  NONE = 'NONE',
};

// 字段基本格式
export interface BasicField {
  id: number | string;
  name: string;
  fieldType: EnumFieldType;
  fieldStatement?: string;
};

// (可能)字段基本格式
export interface MaybeBasicField {
  unique: boolean;
  // 必填字段全部去除，根据是否设置了默认值来隐含判断是否必填
  // required?: boolean;
  length: number;
  defaultValue?: number | string | boolean;
};

// 基本的日期或时间类字段
export interface BasicDateTimeField {
  defaultType: EnumDateDefaultValueType;
  defaultValue: string;
  showFormat: DATE_TIME_FORMAT;
};

// 关联字段
export interface RefCommonField {
  // 关联表
  refModel: string;
  // 内容显示格式
  showFormat?: string;
  // 关联字段的配置信息
  $REF_MODEL?: any;
};

// 主从关系，删除数据时的处理方式类型
export enum EnumDeleteType {
  DELETE = 'DELETE',
  RESET = 'RESET',
  KEEP = 'KEEP',
};

// 字段INTEGER格式
export interface FieldInteger extends BasicField, MaybeBasicField {
  fieldType: EnumFieldType.INTEGER;
  defaultValue?: number;
  showType: EnumIntegerShowType;
  minValue: number;
  maxValue: number;
};

// 字段FORMULA公式
export interface FieldFormula extends BasicField, MaybeBasicField {
  fieldType: EnumFieldType.FORMULA;
  formula: string;
  resultType: EnumFieldType;
  showType?: string;
};
// 字段TEXT格式
export interface FieldText extends BasicField, MaybeBasicField {
  fieldType: EnumFieldType.TEXT;
  // 默认检索字段
  retrieve: boolean;
  // 数据有效性
  dataValidity?: string;
};
// 字段LONG_TEXT格式
export interface FieldLongText extends BasicField, MaybeBasicField {
  fieldType: EnumFieldType.LONG_TEXT;
  // 默认检索字段
  retrieve: boolean;
  // 数据有效性
  dataValidity?: string;
};

// 字段DATE格式
export interface FieldDate extends BasicField, Omit<MaybeBasicField, 'defaultValue'>, BasicDateTimeField {
  fieldType: EnumFieldType.DATE;
  // 表达式规则
  dataValidity?: string;
};
// 字段DATE_TIME格式
export interface FieldDateTime extends BasicField, Omit<MaybeBasicField, 'defaultValue'>, BasicDateTimeField {
  fieldType: EnumFieldType.DATE_TIME;
};
// 字段TIME格式
export interface FieldTime extends BasicField, Omit<MaybeBasicField, 'defaultValue'>, BasicDateTimeField {
  fieldType: EnumFieldType.TIME;
};
// 字段YEAR格式
export interface FieldYear extends BasicField, Omit<MaybeBasicField, 'defaultValue'>, BasicDateTimeField {
  fieldType: EnumFieldType.YEAR;
};
// 字段MONTH格式
export interface FieldMonth extends BasicField, Omit<MaybeBasicField, 'defaultValue'>, BasicDateTimeField {
  fieldType: EnumFieldType.MONTH;
};
// 字段YEAR_MONTH格式
export interface FieldYearMonth extends BasicField, Omit<MaybeBasicField, 'defaultValue'>, BasicDateTimeField {
  fieldType: EnumFieldType.YEAR_MONTH;
};

// 日期、时间、日期时间等的字段类型
export type FieldContainDateOrTime = FieldDate | FieldDateTime | FieldTime;
export const containDateOrTimeFieldTypes = [
  EnumFieldType.DATE,
  EnumFieldType.DATE_TIME,
  EnumFieldType.TIME,
];

// 年、月等的字段类型
export type FieldContainYearOrMonth = FieldYear | FieldYearMonth | FieldMonth;
export const containYearOrMonthFieldTypes = [
  EnumFieldType.YEAR,
  EnumFieldType.YEAR_MONTH,
  EnumFieldType.MONTH,
];

// 所有时间相关的字段类型
export type FieldTypeForTime = FieldContainDateOrTime | FieldContainYearOrMonth;

// 字段ENUM格式
export interface FieldEnum extends BasicField, MaybeBasicField {
  fieldType: EnumFieldType.ENUM;
  enumConfig: {
    name: string;
    statement: string;
    enumList: Array<{
      value: string;
      name: string;
    }>;
  };
  defaultItem?: string;
};

// 字段DECIMAL格式
export interface FieldDecimal extends BasicField, MaybeBasicField {
  fieldType: EnumFieldType.DECIMAL;
  decimalDigits: number;
  showDigits: number;
  showType: EnumDecimalShowType;
  // 数据有效性规则-最大值
  maxValue?: number;
  // 数据有效性规则-最小值
  minValue?: number;
};

// 暂时货币和小数的配置项保持一致
export interface FieldCurrency extends Omit<FieldDecimal, 'fieldType'> {
  fieldType: EnumFieldType.CURRENCY;
};
// 百分号，暂时和小数的配置保持一致
export interface FieldPercentage extends Omit<FieldDecimal, 'fieldType'> {
  fieldType: EnumFieldType.PERCENTAGE;
};

// 千分号，暂时和小数的配置保持一致
export interface FieldPermillage extends Omit<FieldDecimal, 'fieldType'> {
  fieldType: EnumFieldType.PERMILLAGE;
};

// 小数这一类
export type FieldDecimalSome = FieldDecimal | FieldCurrency | FieldPercentage | FieldPermillage;

// 字段MANY_TO_ONE（单选查找关系）格式
export interface FieldManyToOne extends BasicField, MaybeBasicField, RefCommonField {
  fieldType: EnumFieldType.MANY_TO_ONE;
  // 关联字段
  // TODO:关联字段选项要过滤，一定是实体字段
  refModelField: string;
};
// 字段ONE_TO_MANY（主从关系）格式
export interface FieldOneToMany extends BasicField, MaybeBasicField, RefCommonField {
  fieldType: EnumFieldType.ONE_TO_MANY;
  // 主表关联字段(不填时，后端按id处理)
  refField?: string;
  // 明细表关联字段(不填时，后端按id处理)
  refModelField?: string;
  // 删除数据时的处理类型
  deleteType: EnumDeleteType;
};
// 字段MANY_TO_MANY（多选查找关系）格式
export interface FieldManyToMany extends BasicField, MaybeBasicField, RefCommonField {
  fieldType: EnumFieldType.MANY_TO_MANY;
  // 关联字段(只支持id)
  refModelField?: 'id';
  // 关联分组标志
  // 备注：目标关联表的MANY_TO_MANY字段的多个refGroup作为备选项，也可以手输入.
  refGroup: string;
};

// 字段格式
export type Field = FieldInteger | FieldText | FieldLongText | FieldEnum |
FieldDecimalSome |
FieldTypeForTime |
RefField;

// 关联字段格式
export type RefField = FieldManyToOne | FieldOneToMany | FieldManyToMany;
