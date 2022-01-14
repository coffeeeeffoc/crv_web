type Type = 'SINGLE' | 'COMBO'

export interface OperationIdType {
  name: string
  type: Type
  operationIds: Array<{ id: string | number, name: string, displayName?: string}>
}

interface ViewOperationType {
  headerShowCount: number
  dataShowCount: number
  tableHeader: OperationIdType[]
  dataRow: OperationIdType[]
}

interface ConditionType {
  id: number
  field: string
  operator: string
  valueType: string
  value: any
}
interface ViewDataFilter {
  conditions: ConditionType[]
  conditionCombination: string
}
interface SummaryCalculateType {
  id: number
  name: string
  formula: string
}
interface viewDataType {
  id?: string | number
  name?: string
  version?: number
  viewFields?: any[]
  viewOperations?: ViewOperationType
  viewDataFilter?: ViewDataFilter
  summaryCalculate?: SummaryCalculateType[]
  [propsName: string]: any
}
interface viewOperationSelectKeyType {
  [propsName: string]: string[]
}

export interface viewInitialStateType {
  editSuccess: boolean
  loading: boolean
  viewData: viewDataType
  modelId: string
  viewVersions: number
  viewOperationSelectKey: viewOperationSelectKeyType
}
