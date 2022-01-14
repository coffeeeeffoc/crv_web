/**
 * 整数
 */
import { ControlType } from '../constants'
import { fieldType } from '../interface'
import { FIELD_RULES, NAME_RULES, STATEMENT_RULES } from '@/common/checkInfo/checkInfo'

const { INPUT_NUMBER, CHECKBOX, TEXTAREA, INPUT_WITH_LENGTH } = ControlType

const integerType: fieldType = {
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
      name: 'defaultValue',
      title: '默认值：',
      props: { precision: 0, style: { width: '100%' }, placeholder: '请输入默认值' },
      itemProps: {},
      // itemProps: { help: '必填字段，如果不填写默认值，则默认值为0。' },
      config: {}
    }
  ],
  right: [
    // {
    //   control: CHECKBOX,
    //   name: 'require',
    //   title: ' ',
    //   props: {},
    //   itemProps: { valuePropName: 'checked' },
    //   config: { title: '必须填写字段' }
    // },
    {
      control: CHECKBOX,
      name: 'unique',
      title: ' ',
      props: {},
      itemProps: { valuePropName: 'checked' },
      config: { title: '取值唯一' }
    }
  ],
  foot: [
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

export default integerType
