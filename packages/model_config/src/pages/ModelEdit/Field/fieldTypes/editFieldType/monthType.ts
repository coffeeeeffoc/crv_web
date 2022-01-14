/**
 * 月份
 */
import { ControlType, EnumDefaultType, monthShowType } from '../constants'
import { fieldType } from '../interface'
import { FIELD_RULES, NAME_RULES } from '@/common/checkInfo/checkInfo'

const { CHECKBOX, SELECT, TEXTAREA, INPUT_WITH_LENGTH, AUTOCOMPLETE } = ControlType

const monthType: fieldType = {
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
      control: SELECT,
      name: 'defaultType',
      title: '默认值类型：',
      props: {},
      itemProps: {},
      config: {
        options: [
          { value: EnumDefaultType.SYSTEM, text: '系统当前月份' },
          { value: EnumDefaultType.FIXED, text: '固定月份' },
          { value: EnumDefaultType.NONE, text: '无默认值' }]
      }
    },
    // {
    //   control: SELECT,
    //   name: 'showFormat',
    //   title: '显示格式：',
    //   props: {},
    //   itemProps: { initialValue: MonthShowType.NORMAL },
    //   config: {
    //     options: [
    //       { value: MonthShowType.NORMAL, text: 'M(7)' },
    //       { value: MonthShowType.ZERO_FILL, text: 'MM(07)' },
    //     ]
    //   }
    // }
    {
      control: AUTOCOMPLETE,
      name: 'showFormat',
      title: '显示格式：',
      props: {},
      itemProps: { initialValue: monthShowType[0].value },
      config: { options: monthShowType }
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
      control: SELECT,
      name: 'defaultValue',
      title: '选择默认月份：',
      props: { placeholder: '请选择月份' },
      itemProps: {},
      config: {
        options: [
          { value: 1, text: 1 },
          { value: 2, text: 2 },
          { value: 3, text: 3 },
          { value: 4, text: 4 },
          { value: 5, text: 5 },
          { value: 6, text: 6 },
          { value: 7, text: 7 },
          { value: 8, text: 8 },
          { value: 9, text: 9 },
          { value: 10, text: 10 },
          { value: 11, text: 11 },
          { value: 12, text: 12 }
        ]
      }
    }
  ],
  foot: [
    // {
    //   control: DIVIDER,
    //   name: '',
    //   title: '',
    //   props: {  orientation: 'left', key: 'dividerDate'},
    //   itemProps: {},
    //   config: { title: '数据有效性规则' }
    // },
    // {
    //   control: INPUT,
    //   name: 'dataValidity',
    //   title: '表达式规则：',
    //   props: {},
    //   itemProps: {},
    //   config: {}
    // },
    {
      control: TEXTAREA,
      name: 'fieldStatement',
      title: '字段说明：',
      props: { rows: 5 },
      itemProps: {},
      config: {}
    }
  ]
}
export default monthType
