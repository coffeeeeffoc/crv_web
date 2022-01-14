/**
 * 选择列表
 */
import { ControlType } from '../constants'
import { fieldType } from '../interface'
import { FIELD_RULES, NAME_RULES } from '@/common/checkInfo/checkInfo'

const { TEXTAREA, INPUT_WITH_LENGTH, ENUM_SELECT, SELECT } = ControlType

const enumType: fieldType = {
  left: [
    {
      control: INPUT_WITH_LENGTH,
      name: 'id',
      title: '名称：',
      props: { maxLength: 32, placeholder: '请输入名称' },
      itemProps: { rules: FIELD_RULES },
      config: {}
    },
    {
      control: INPUT_WITH_LENGTH,
      name: 'name',
      title: '显示名称：',
      props: { maxLength: 20, placeholder: '请输入显示名称' },
      itemProps: { rules: NAME_RULES },
      config: {}
    },
    {
      control: ENUM_SELECT,
      name: 'enumConfig',
      title: '选项：',
      props: { placeholder: '请选择选项内容' },
      itemProps: { rules: [{ required: true, message: '选项不可为空！' }] },
      config: {}
    },
    {
      control: SELECT,
      name: 'defaultItem',
      title: '默认值：',
      props: { placeholder: '请选择默认值', allowClear: true },
      itemProps: {},
      config: {}
    }
  ],
  right: [],
  foot: [
    {
      control: TEXTAREA,
      name: 'fieldStatement',
      title: '字段说明：',
      props: {},
      itemProps: {},
      config: {}
    }
  ]
}

export default enumType
