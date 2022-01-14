import { OptionProps } from './Common'

/**
 * 模型列表配置
 */
export interface ListConfigProps {
  /** 接口查询过来的模型数据 */
  model: any
  /** 当前模型ID */
  modelId: string
  /** 当前视图 */
  current: string
  /** 能否切换视图 */
  unChangeable?: boolean
  /** 视图配置集合 */
  viewList: { [key: string]: ViewProps }
  /** 视图数据下拉集合 */
  views: OptionProps[]
  /** 配置数据加载状态 */
  // 控制查询所有的视图
  configLoading: boolean
  // 控制查询确定的视图
  viewLoading: boolean
  // 展示的相关列
  showColumnsList: { [key: string]: OptionProps[] }
}
/**
 * 视图配置信息
 */
export interface ViewProps {
  /** 自定义数据请求接口 */
  externalDataApi: string | undefined
  /** 视图配置 */
  config: ViewConfigProps
  supportSelectCal: boolean
  // 关联表信息
  refModelInfo: any[]
}

export interface RefModelInfoType {
  id?: string
  name?: string
  fields?: any[]
  [propsName: string]: any
}
/**
 * 视图配置信息
*/
export interface ViewConfigProps {
  /** 过滤字段集合 */
  filterFields: OptionProps[]
  // 视图字段
  viewFields: any[]
  /** 按钮配置信息 */
  actions: ActionPosition
  /** 列配置集合 */
  columns: any[]
  /** 显示列集合 */
  showColumns: OptionProps[]
  /** 默认过滤字段集合 */
  defaultFilterFields: any[]
  /** 默认数据过滤 */
  viewDataFilter: any
  /** 默认排序 */
  defaultSort: any[]
  /** 合计配置 */
  summaryCalculate: any[]
}
/**
 * 按钮位置信息
*/
export interface ActionPosition {
  /** 顶部按钮 */
  top: ActionShowProps
  /** 行按钮 */
  row: ActionShowProps
}
/**
 * 按钮集合
*/
export interface ActionShowProps {
  /** 显示个数 */
  showCount: number
  /** 按钮集合 */
  buttons: ActionProps[]
}
export interface OperationsType {
  /** 编号 */
  id: string | number
  /** 按钮名称 */
  name: string
  /** 选择记录数量 */
  selectCount: number
  displayName: string
  statement: String
}
/**
 * 按钮配置信息
*/

export type StepsType = any

export interface OperationType {
  id: string | number
  name: string
  statement: string
  operationType: string
  steps: StepsType[]
  selectAll: boolean
  targetData: TargetDataType
}

export interface ActionProps {
  /** 组数据名 */
  name: string
  /** 按钮类型  */
  type: 'SINGLE' | 'COMBO'
  operations: OperationType[]
}
// export interface ActionProps {
//   /** 编号 */
//   id: string | number
//   /** 按钮名称 */
//   name: string
//   /** 选择记录数量 */
//   selectCount: number
//   displayName: string
//   statement: String
//   operations: OperationsType[]
//   type: 'SINGLE' | 'COMBO'
// }
/**
 * 列表数据
*/
export interface ListDataProps {
  /** 数据加载状态 */
  loading: boolean
  /** 数据信息 */
  data: ListPageProps
  /** 视图列表临时数据 */
  temp?: ListTempProps
}

export interface ViewDataListType {
  modelId: string
  viewDataList: any
  viewDataTotal: any
  current: string
}
/**
 * 分页信息
*/
export interface ListPageProps {
  /** 数据集合 */
  list: any[]
  /** 分页信息 */
  pagination: any
  /** 汇总信息 */
  summary: any
  // 排序
  sorter: any[]
  // 合计
  total: any
}
/**
 * 临时数据信息
*/
export interface ListTempProps {
  /** 列表选择数据集合 */
  selectedRows?: any[]
  /** 列表选择数据id集合 */
  selectedRowKeys?: any[]
  selectAll?: boolean
  /** 过滤添加信息 */
  filters?: any
  colsWidth?: number[]
  /** 列筛选 */
  columnFilter?: any
  /** 列排序 */
  columnSorter?: any
}
/**
 * 按钮的目标数据
 */
// export interface operationType {
//   TargetData: TargetDataType
//   selectAll: boolean
//   [propsName: string]: any
// }
export type TargetDataType = 'NO_SEL_DATA' | 'ONLY_ONE' | 'MULTIPLE'

export default ListConfigProps
