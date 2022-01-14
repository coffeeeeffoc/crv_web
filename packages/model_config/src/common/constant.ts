// 字段的类型
export enum FieldType {
  TEXT = 'TEXT', // 普通文本
  LONG_TEXT = 'LONG_TEXT', // 长文本
  INTEGER = 'INTEGER', // 整数
  DECIMAL = 'DECIMAL', // 小数
  CURRENCY = 'CURRENCY', // 货币
  TIME = 'TIME', // 时间
  DATE = 'DATE', // 日期
  DATE_TIME = 'DATE_TIME', // 日期时间
  YEAR = 'YEAR', // 年度
  MONTH = 'MONTH', // 月份
  PASSWORD = 'PASSWORD', // 密码
  FILE = 'FILE', // 文件
  ENUM = 'ENUM', // 选项列表
  FORMULA = 'FORMULA', // 公式
  MANY_TO_ONE = 'MANY_TO_ONE', // 单选查找关系
  MANY_TO_MANY = 'MANY_TO_MANY', // 多选查找关系
  ONE_TO_MANY = 'ONE_TO_MANY', // 主从关系
  YEAR_MONTH = 'YEAR_MONTH', // 年月
  PERCENTAGE = 'PERCENTAGE', // 百分比
  PERMILLAGE = 'PERMILLAGE', // 千分比
}

// 六个默认的字段
export const DefaultField = ['id', 'version', 'create_user', 'create_time', 'last_update_user', 'last_update_time']

// showType所属类型
export enum ShowType {
  SELECT = 'SELECT',
  EDIT = 'EDIT',
  CREATE = 'CREATE'
}

// tab类型key
export enum CurrentTabType {
  FIELD = 'FIELD',
  BASE = 'BASE',
  OPERATION = 'OPERATION',
  VIEW = 'VIEW',
  FORM = 'FORM'
}

// 关联字段
export const associateFieldType = [FieldType.MANY_TO_MANY, FieldType.MANY_TO_ONE, FieldType.ONE_TO_MANY]

export const PADDING_STYLE = { padding: '20px', overflow: 'hidden' }
