/**
 * 整数
 */
import { ControlType, integerShowTypeOption } from '../constants'
import { fieldType } from '../interface'
import { FIELD_RULES, NAME_RULES, STATEMENT_RULES } from '@/common/checkInfo/checkInfo'

const { INPUT_NUMBER, CHECKBOX, DIVIDER, TEXTAREA, INPUT_WITH_LENGTH, SELECT } = ControlType

const integerType: fieldType = {
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
      props: { precision: 0, style: { width: '100%' }, placeholder: '请输入默认值' },
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
        props: { min: -2147483648, max: 2147483647, precision: 0, style: { width: '100%' }, placeholder: '请输入最小取值' },
        itemProps: { style: { paddingRight: '50px' } },
        config: {}
      },
      {
        control: INPUT_NUMBER,
        name: 'maxValue',
        title: '最大取值：',
        props: { min: -2147483648, max: 2147483647, precision: 0, style: { width: '100%' }, placeholder: '请输入最大取值' },
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
        props: { placeholder: '请选择数据显示形式' },
        itemProps: { initialValue: integerShowTypeOption[0].value, style: { paddingRight: '50px' } },
        config: {
          options: integerShowTypeOption
        }
      },
      {
        control: '',
        name: '',
        title: '',
        props: {},
        itemProps: {},
        config: {}
      }
    ],
    [
      {
        control: TEXTAREA,
        name: 'fieldStatement',
        title: '字段说明：',
        props: {},
        itemProps: { rules: STATEMENT_RULES },
        config: {}
      }
    ]
  ]
}
export default integerType
