export interface configType {
  filterFields: FilterFieldsType[]
  defaultFilterFields: FilterFieldsType[]
  viewFields: ViewFieldsType[]
  actions: any
  columns: any[]
  showColumns: number
}

export interface ViewIdType {
  id: string
  name: string
  // externalDataApi: string
  supportSelectCal: boolean
  config: configType
}

export interface ViewConfigType {
  [propsName: string]: ViewIdType
}

export interface ViewOptionsType {
  id: string | number
  name: string
  statement?: string
}

enum FieldTypeSt {
  INTEGER = 'INTEGER',
  TEXT ='TEXT',
  DATETIME = 'DATETIME',
  CURRENT = 'CURRENT',
  DATE = 'DATE',
  ONE_TO_MANY = 'ONE_TO_MANY',
  MANY_TO_MANY = 'MANY_TO_MANY',
  MANY_TO_ONE = 'MANY_TO_ONE'
}

export interface FieldType {
  id: string | number
  name: string
  fieldType: FieldTypeSt
  [propsName: string]: any
}

export interface FilterFieldsType {
  id: string | number
  name: string
  [propsName: string]: any
}

export interface OperationIdsType {
  id: string | number
  name: string
}

export interface DataRowType {
  name: string
  /** 按钮类型  */
  type: 'SINGLE' | 'COMBO'
  operationIds: OperationIdsType[]
}

export enum AlignType {
  LEFT = 'LEFT',
  CENTER = 'CENTER',
  RIGHT = 'RIGHT'
}

export interface ViewFieldsType {
  id: string
  columnWidth: number
  summaryFormat: string
  summary: string
  showName: string
  headerAlign: AlignType
  contentAlign: AlignType
}
