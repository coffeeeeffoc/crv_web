// 正则

// 由英文小写字母，数字和下划线'_'组成，仅可以小写字母开头
export const LOWER_WORD_NUMBER = /^[a-z][0-9a-z_]*$/

// 首尾不可为空格
export const NO_SPACE = /^\S.*\S$|(^\S{0,1}\S$)/

// 不限制时的时分秒格式
// export const NO_LIMIT_TIME = /^\S.*\S$|(^\S{0,1}\S$)/
export const NO_LIMIT_TIME = /^([0-9]{0,}\d):[0-5]\d:[0-5]\d$/
