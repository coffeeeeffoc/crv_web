/**
 * 货币
 */
import { ControlType } from '../constants'
import { fieldType } from '../interface'
import { FIELD_RULES, NAME_RULES } from '@/common/checkInfo/checkInfo'

const { INPUT_NUMBER, CHECKBOX, TEXTAREA, INPUT_WITH_LENGTH } = ControlType

const permillageType: fieldType = {
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
      control: INPUT_NUMBER,
      name: 'length',
      title: '字段长度（最长61）：',
      props: { min: 0, style: { width: '100%' }, precision: 0, placeholder: '请输入字段长度' },
      itemProps: {
        rules: [
          { required: true, message: '字段长度不能为空' },
          { min: 2, max: 61, type: 'integer', message: '字段长度应为整数且大于等于2,小于等于61' }
        ]
      },
      config: {}
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
      control: INPUT_NUMBER,
      name: 'defaultValue',
      title: '默认值：',
      props: { style: { width: '100%' }, placeholder: '请输入默认值' },
      itemProps: {},
      config: {}
    },
    {
      control: INPUT_NUMBER,
      name: 'decimalDigits',
      title: '小数位数（最长27）：',
      props: { min: 0, precision: 0, style: { width: '100%' }, placeholder: '请输入小数位数' },
      itemProps: {},
      config: {}
    }
  ],
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

export default permillageType
