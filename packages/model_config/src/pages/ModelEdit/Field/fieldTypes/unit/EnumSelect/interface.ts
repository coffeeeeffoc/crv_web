import { ReactNode } from 'react'

// 行信息
export interface RecordType {
  // 名称
  id: string
  name: string
  // 说明
  statement: string
  // 配置信息
  enumLists: ConfigureType[]
}

export interface ColumnsType {
  title: ReactNode
  dataIndex: string
  key: string
  width?: number | string
  [propsName: string]: any
  // render?: (text: any, record: RecordType, index: number) => void
}

export interface ConfigureType {
  value: string
  name: string
  _rowIndex?: number
}
