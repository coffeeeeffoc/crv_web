import { CurrentTabType } from '@/common/constant'
import { FieldDataEditType } from './fieldInterfaces'
interface baseInfoType {
  id?: number | string
  version?: number
  module?: string
  type?: string
  fields?: any[]
  operations?: any[]
  forms?: any[]
  views?: any[]
  filterFields?: any[]
  [propsName: string]: any
}

export interface ModelEditInitialStateType {
  loading: boolean
  baseInfo: baseInfoType
  currentTab: CurrentTabType
  update: number
  modelId: string
}
