import { FieldType } from '@/common/constant'
export interface DragTablePropsType {
  setTableValue: (value: any) => void
}
export type ALIGNTYPE = 'LEFT' | 'RIGHT' | 'CENTER'

export interface viewFieldsType {
  id: string
  columnWidth: number
  summaryFormat?: string
  summary?: string
  showName: string
  headerAlign: ALIGNTYPE
  contentAlign: ALIGNTYPE
  content?: string
  contentFormat?: string
  [propsName: string]: any
}

export interface fieldsType {
  id: string
  name: string
  fieldType: FieldType
  [propsName: string]: any
}

export interface SourceDataType {
  id: string
  displayName: string
  columnWidth: number
  summaryFormat?: string
  summary?: string
  showName: string
  headerAlign: ALIGNTYPE
  contentAlign: ALIGNTYPE
  content?: string
  contentFormat?: string
  [propsName: string]: any
}

export type SelectedKeyType = string

export interface rowSelectionType {
  selectedRowKeys: SelectedKeyType[]
  onChange: (value: any) => void
}

export interface ComponentsType {
  body: any
}

// SourceTable 继承依赖
export interface SourceTablePropsType {
  components: ComponentsType
  rowSelection: rowSelectionType
  sourceData: SourceDataType[]
  viewFields: viewFieldsType[]
  [propsName: string]: any
}

// TargetTable 继承依赖
export interface TargetTablePropsType {
  components: ComponentsType
  rowSelection: rowSelectionType
  targetData: SourceDataType[]
  viewFields: viewFieldsType[]
  setTableValue: (value: any) => void
  [propsName: string]: any
}

// EditTable 继承依赖
export interface EditTableType {
  tableValue: string
}

export interface EditTableDataSourceType {
  key: string
  attribute: string
  value: number | string
}
