
export enum EditType {
  FIELD = '字段',
  FUNCTION = '函数',
  GLOBAL = '全局参数',
  OPERATION = '操作符',
  FIELD_FORMULA = '生成字段公式',
  FORMULA_TRANSLATION = '翻译字段公式'
}

export enum Type {
  FUNCTION = 'FUNCTION',
  GLOBALPARAM = 'GLOBALPARAM',
  OPERATESIGN = 'OPERATESIGN',
  FIELD = 'FIELD'
}

export interface ItemType {
  value: string
  type: Type
  description: string
  name: string
}

// 全局参数的默认配置
export const globalItem: ItemType[] = [
  { value: 'company', type: Type.GLOBALPARAM, description: '公司', name: '公司' },
  { value: 'duration', type: Type.GLOBALPARAM, description: '期间', name: '期间' },
  { value: 'user', type: Type.GLOBALPARAM, description: '用户', name: '用户' }
]

// 操作符的默认配置
export const operationItem: ItemType[] = [
  { value: '+', type: Type.OPERATESIGN, name: '加', description: '加' },
  { value: '-', type: Type.OPERATESIGN, name: '减', description: '减' },
  { value: '*', type: Type.OPERATESIGN, name: '乘', description: '乘' },
  { value: '/', type: Type.OPERATESIGN, name: '除', description: '除' },
  { value: '(', type: Type.OPERATESIGN, name: '左括号', description: '左括号' },
  { value: ')', type: Type.OPERATESIGN, name: '右括号', description: '右括号' },
  { value: '()', type: Type.OPERATESIGN, name: '括号', description: '括号' }
]

// 函数列表默认配置
export const functionItem: ItemType[] = [
  { value: 'SUM()', type: Type.FUNCTION, description: '说明：求和 示例：SUM(Field1)', name: '求和' },
  { value: 'AVG()', type: Type.FUNCTION, description: '说明：平均数 示例：AVG(Field1)', name: '平均' },
  { value: 'COUNT()', type: Type.FUNCTION, description: '计数', name: '计数' },
  { value: 'MAX()', type: Type.FUNCTION, description: '说明：求数字中最大值 示例：MAX(Field1, Field2)', name: '最大值' },
  { value: 'CONCAT()', type: Type.FUNCTION, description: '说明：连接多个字符串 示例：CONCAT(Field1, Field2)', name: '连接字符串' },
  { value: 'CURDATE()', type: Type.FUNCTION, description: '说明：当前日期 示例：CURDATE()', name: '当前日期' },
  { value: 'CURTIME()', type: Type.FUNCTION, description: '说明：当前时间 示例：CURTIME()', name: '当前时间' },
  {
    value: 'DATE_FORMAT()',
    type: Type.FUNCTION,
    description: '说明：转换日期格式 示例：DATE_FORMAT(Field1, %W %M %Y)',
    name: '转换日期格式'
  }
  // {
  //   value: 'DATEDIFF()',
  //   type: Type.FUNCTION,
  //   description: '说明： 两'
  // }
]
