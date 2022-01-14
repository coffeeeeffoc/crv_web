import { EnumFieldType } from '@/constants/constant'
/** 通用下拉数据对象定义 */
export interface OptionProps {
  id: string
  name: string
  statement?: string
  fieldType: EnumFieldType
  [propsName: string]: any
}
// export default OptionProps
