/**
 * 货币
 */
import { ControlType, permillageShowTypeOption } from '../constants'
import { fieldType } from '../interface'
import { FIELD_RULES, NAME_RULES } from '@/common/checkInfo/checkInfo'

const { INPUT_NUMBER, CHECKBOX, SELECT, DIVIDER, TEXTAREA, INPUT_WITH_LENGTH } = ControlType

const currencyType: fieldType = {
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
      name: 'defaultValue',
      title: '默认值：',
      props: { style: { width: '100%' }, placeholder: '请输入默认值' },
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
    }
  ],
  foot: [],
  rows: [
    [
      {
        control: INPUT_NUMBER,
        name: 'length',
        title: '字段长度（最长61）：',
        props: { style: { width: '100%' }, precision: 0, placeholder: '请输入字段长度' },
        itemProps: {
          rules: [
            { required: true, message: '字段长度不能为空' },
            { max: 61, min: 2, type: 'integer', message: '字段长度应为整数且大于等于2,小于等于61' }
          ],
          style: { paddingRight: '50px' }
        },
        config: {}
      },
      {
        control: INPUT_NUMBER,
        name: 'decimalDigits',
        title: '小数位数（最长27）：',
        props: { min: 0, style: { width: '100%' }, placeholder: '请输入小数位数' },
        itemProps: { style: { paddingLeft: '50px' } },
        config: {}
      }
    ],
    [
      {
        control: DIVIDER,
        name: '',
        title: '',
        props: { orientation: 'left', key: 'dividerDecimal1' },
        itemProps: {},
        config: { title: '数据有效性规则' }
      }
    ],
    [
      {
        control: INPUT_NUMBER,
        name: 'minValue',
        title: '最小取值：',
        props: { style: { width: '100%' }, placeholder: '请输入最小取值' },
        itemProps: { style: { paddingRight: '50px' } },
        config: {}
      },
      {
        control: INPUT_NUMBER,
        name: 'maxValue',
        title: '最大取值：',
        props: { style: { width: '100%' }, placeholder: '请输入最大取值' },
        itemProps: { style: { paddingLeft: '50px' } },
        config: {}
      }
    ],
    [
      {
        control: DIVIDER,
        name: '',
        title: '',
        props: { orientation: 'left', key: 'dividerDecimal2' },
        itemProps: {},
        config: { title: '数据显示格式' }
      }
    ],
    [
      {
        control: SELECT,
        name: 'showType',
        title: '数据显示形式：',
        props: { style: { width: '100%' } },
        itemProps: { style: { paddingRight: '50px' }, initialValue: permillageShowTypeOption[0].value },
        config: {
          options: permillageShowTypeOption
        }
      },
      {
        control: INPUT_NUMBER,
        name: 'showDigits',
        title: '小数位数（最长27）：',
        props: { min: 0, style: { width: '100%' }, placeholder: '请输入小数位数' },
        itemProps: { style: { paddingLeft: '50px' } },
        config: {}
      }
    ],
    [
      {
        control: TEXTAREA,
        name: 'fieldStatement',
        title: '字段说明：',
        props: {},
        itemProps: {},
        config: {}
      }
    ]
  ]
}
export default currencyType
