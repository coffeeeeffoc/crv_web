// 校验常量
import { LOWER_WORD_NUMBER, NO_SPACE, NO_LIMIT_TIME } from './regular'
// 数据库表名的正则
export const DATABASE_TABLE_REGULAR = {
  pattern: LOWER_WORD_NUMBER,
  message: '由英文小写字母，数字和下划线\'_\'组成，仅可以小写字母开头'
}
// 字段名称正则
export const FIELD_REGULAR = {
  pattern: LOWER_WORD_NUMBER,
  message: '名称格式由英文小写字母，数字和下划线\'_\'组成，仅可以小写字母开头'
}
// 字段名称不可为空
export const FIELD_NOT_EMPTY = {
  required: true,
  message: '名称不能为空'
}
// 显示名称正则
export const NAME_REGULAR = {
  pattern: NO_SPACE,
  message: '显示名称首尾不可为空格'
}
// 显示名称不可为空
export const NAME_NOT_EMPTY = {
  required: true,
  message: '显示名称不能为空'
}
// 时间格式正则
export const IMIT_TIME = {
  pattern: NO_LIMIT_TIME,
  message: '时间格式错误'
}
// 字段名称校验
export const FIELD_RULES = [FIELD_REGULAR, FIELD_NOT_EMPTY]
// 显示名称校验
export const NAME_RULES = [NAME_REGULAR, NAME_NOT_EMPTY]
// 字段说明校验
export const STATEMENT_RULES = [{ max: 140, type: 'string', message: '字段说明应小于140个字符' }]
// 时间格式校验
export const NO_LIMIT_TIME_RULES = [IMIT_TIME]
