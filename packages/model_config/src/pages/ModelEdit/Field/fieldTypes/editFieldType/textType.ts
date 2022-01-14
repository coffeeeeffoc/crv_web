/**
 * 文本
 */
import { ControlType } from '../constants'
import { fieldType } from '../interface'
import { FIELD_RULES, NAME_RULES, STATEMENT_RULES } from '@/common/checkInfo/checkInfo'

const { INPUT, INPUT_NUMBER, CHECKBOX, TEXTAREA, INPUT_WITH_LENGTH } = ControlType

const textType: fieldType = {
  left: [
    {
      control: INPUT_WITH_LENGTH,
      name: 'id',
      title: '名称：',
      props: { disabled: true, maxLength: 32 },
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
      title: '文本内容的最大长度：',
      props: { min: 0, style: { width: '100%' }, precision: 0, placeholder: '请输入文本内容的最大长度' },
      itemProps: {},
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
      control: CHECKBOX,
      name: 'retrieve',
      title: ' ',
      props: {},
      itemProps: { valuePropName: 'checked' },
      config: { title: '默认检索字段' }
    }
  ],
  foot: [
    {
      control: INPUT,
      name: 'defaultValue',
      title: '默认值：',
      props: { autoComplete: 'off' },
      itemProps: {
      },
      config: {}
    },
    {
      control: INPUT,
      name: 'dataValidity',
      title: '数据有效性规则(正则表达式)：',
      props: {},
      itemProps: {},
      config: {}
    },
    {
      control: TEXTAREA,
      name: 'fieldStatement',
      title: '字段说明：',
      props: {},
      itemProps: { rules: STATEMENT_RULES },
      config: {}
    }
  ]
}
export default textType
