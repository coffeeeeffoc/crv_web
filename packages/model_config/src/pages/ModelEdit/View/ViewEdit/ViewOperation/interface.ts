
export interface PropsShuttle {
  type: string
}

// viewOperation 依赖
export interface viewOperationType {
  headerShowCount: number
  dataShowCount: number
  tableHeader: OperationIdType[]
  dataRow: OperationIdType[]
  [propsName: string]: any
}

export enum OperationSelectType {
  TABLE_HEADER = 'tableHeader',
  DATA_ROW = 'dataRow'
}

// tableHeader或是row的依赖
export interface OperationIdType {
  name: string
  type: 'SINGLE' | 'COMBO'
  operationIds: Array<{ id: string | number, name: string, displayName?: string }>
}

// operationIds 依赖
export interface OperationIdsType {
  id: string | number
  name: string
  displayName?: any
}

// viewOperation 依赖
export interface viewOperationIdsType {
  id: string | number
}

// operation 依赖
export interface OperationType {
  id: string | number
  name: string
  [propsName: string]: any
}

// sourceOperation 依赖
export interface sourceOperationType {
  id: string | number
  displayName: string
}

// updateData 依赖
export interface updateData {
  name: string
}

export interface ComponentsType {
  body: any
  // body: ({}:any) => any
}

// sourceTable 继承依赖
export interface SourceTablePropsType {
  components: ComponentsType
  operationSource: sourceOperationType[]
  viewOperations: viewOperationType
  setSelectedSourceKeys: (_: any) => void
  selectedSourceRowKeys: Array<(number | string)>
  type: string
  [propsName: string]: any
}

// DraggableListRow 继承依赖
export interface DraggableListRowPropsType {
  align: string | number
  // ?
}

// TargetTable 继承依赖
export interface TargetTablePropType {
  dataSource: any[]
  components: ComponentsType
  viewOperations: viewOperationType
  type: string
  selectedRowKeys: Array<(number | string)>
  setSelectedKeys: (_: any) => void
  selectedSourceRowKeys: Array<(number | string)>
  operationSource: sourceOperationType[]
  setTableValue: (_: any) => void
  tableValue: any
}

// TargetTitle 继承依赖
export interface TargetTitlePropsType {
  type: string
  rowIndex: number
  viewOperations: any
}

// TargetList 继承依赖
export interface TargetListPropsType {
  components: ComponentsType
  operationIds: OperationIdsType[]
  name: string | number
  index: number
  viewOperations: viewOperationType
  type: string
  selectedSourceRowKeys: Array<(number | string)>
  setTableValue: (_: any) => void
  operationSource: sourceOperationType[]
  tableValue: any
  [propsName: string]: any
}

export interface TargetListTitleType {
  isEditTitle: boolean
  setIsEditTitle: (value: boolean) => void
  name: string | number
  index: number
  viewOperations: viewOperationType
  type: string
  setIsFold: (value: boolean) => void
  isFold: boolean
}

// EditTable 依赖
export interface EditTableType {
  tableValue: any
  type: string
  viewOperations: viewOperationType
}
