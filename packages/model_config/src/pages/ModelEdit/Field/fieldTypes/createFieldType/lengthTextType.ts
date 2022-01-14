/**
 * 长文本
 */
import { ControlType } from '../constants'
import { fieldType } from '../interface'
import { FIELD_RULES, NAME_RULES, STATEMENT_RULES } from '@/common/checkInfo/checkInfo'

const { CHECKBOX, TEXTAREA, INPUT_WITH_LENGTH, INPUT_NUMBER } = ControlType

const lengthTextType: fieldType = {
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
      title: '文本内容的最大长度：',
      props: { min: 0, style: { width: '100%' }, precision: 0, placeholder: '请输入文本内容的最大长度' },
      itemProps: {
        rules: [
          {
            required: true, message: '文本内容的最大长度不可为空'
          }
        ]
      },
      config: {}
    }
  ],
  right: [
    // {
    //   control: CHECKBOX,
    //   name: 'unique',
    //   title: ' ',
    //   props: {},
    //   itemProps: { valuePropName: 'checked' },
    //   config: { title: '取值唯一' }
    // },
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
    // {
    //   control: INPUT,
    //   name: 'defaultValue',
    //   title: '默认值：',
    //   props: { autoComplete: 'off' },
    //   itemProps: {},
    //   config: {}
    // },
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

export default lengthTextType
