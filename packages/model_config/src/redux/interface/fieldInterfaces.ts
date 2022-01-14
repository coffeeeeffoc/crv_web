import { ShowType, FieldType } from '@/common/constant'
export interface FieldDataEditType {
  id?: string
  name?: string
  version?: number
  fieldType?: FieldType
  [propsName: string]: any
}
interface AssociateModelType {
  list: any[]
  loading: boolean
  total: number
}
interface AssociateFieldType {
  list: []
  loading: boolean
}
interface EnumOptionType {
  list: []
  loading: boolean
  show: ShowType
}
export interface FieldInitialStateType {
  editSuccess: boolean
  loading: boolean
  isDefaultFieldShow: boolean
  show: ShowType | undefined
  newControl: FieldType
  editData: FieldDataEditType
  modelId: string
  fieldVersions: number
  // 关联字段
  refModel: AssociateModelType
  refModelField: AssociateFieldType
  // 选项查询数据
  enumOption: EnumOptionType
}
