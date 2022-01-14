export type SelectedKeyType = string

export interface SourceDataType {
  id: string
  name: string
}

export interface rowSelectionType {
  selectedRowKeys: SelectedKeyType[]
  onChange: any
}

export interface ComponentsType {
  body: any
}

export interface SourceTablePropsType {
  components: ComponentsType
  rowSelection: rowSelectionType
  sourceData: SourceDataType[]
  targetData: SourceDataType[]
  setTargetData: (value: any) => void
  [propsName: string]: any
}

// TargetTable 继承依赖
export interface TargetTablePropsType {
  components: ComponentsType
  rowSelection: rowSelectionType
  targetData: SourceDataType[]
  setTargetData: (value: any) => void
  [propsName: string]: any
}