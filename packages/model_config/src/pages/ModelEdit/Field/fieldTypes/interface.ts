import { FieldType } from '@/common/constant'
// 对创建字段的类型做约束
interface ObjectType {
  control: string
  name: string
  title: string
  props: { [propsName: string]: any }
  itemProps: { [propsName: string]: any }
  config: { [propsName: string]: any }
}

// 对应字段的fieldType
export interface fieldType {
  left: ObjectType[]
  right: ObjectType[]
  foot: ObjectType[]
  rows?: ObjectType[][]
}

// 字段的属性
export interface FieldItemType {
  id: string
  name: string
  fieldType: FieldType
  refModel: string
  refModelField: string
  [propsName: string]: any
}
// export interface PropsValueType {
//   fields: fieldType
//   save: any
// }

// export interface FieldCreateProp {
//   propsValue: PropsValueType
// }
