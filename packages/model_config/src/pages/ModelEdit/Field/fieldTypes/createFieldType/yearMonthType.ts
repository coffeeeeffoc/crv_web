/**
 * 年度
 */
import { ControlType, EnumDefaultType } from '../constants'
import { fieldType } from '../interface'
import { FIELD_RULES, NAME_RULES, STATEMENT_RULES } from '@/common/checkInfo/checkInfo'

const { CHECKBOX, TEXTAREA, SELECT, DATE_PICKER, INPUT_WITH_LENGTH } = ControlType

const yearMonthType: fieldType = {
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
      control: SELECT,
      name: 'defaultType',
      title: '默认值类型：',
      props: {},
      itemProps: { initialValue: EnumDefaultType.NONE },
      config: {
        options: [
          { value: EnumDefaultType.SYSTEM, key: EnumDefaultType.SYSTEM, text: '系统当前年月' },
          { value: EnumDefaultType.FIXED, key: EnumDefaultType.FIXED, text: '固定年月' },
          { value: EnumDefaultType.NONE, key: EnumDefaultType.NONE, text: '无默认值' }
        ]
      }
    }
  ],
  right: [
    {
      control: CHECKBOX,
      name: 'unique',
      title: ' ',
      props: {},
      itemProps: { valuePropName: 'checked' },
      config: { title: '取值唯一' }
    },
    {
      control: ' ',
      name: ' ',
      title: ' ',
      props: {},
      itemProps: {},
      config: {}
    },
    {
      control: DATE_PICKER,
      name: 'defaultValue',
      title: '选择默认年月：',
      props: { picker: 'month', placeholder: '请选择年月' },
      itemProps: {},
      config: {}
    }
  ],
  foot: [
    {
      control: TEXTAREA,
      name: 'fieldStatement',
      title: '字段说明：',
      props: { rows: 5 },
      itemProps: { rules: STATEMENT_RULES },
      config: {}
    }
  ]
}

export default yearMonthType
