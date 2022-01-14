/**
 * 年度
 */
import { ControlType, EnumDefaultType, yearMonthTypeOption } from '../constants'
import { fieldType } from '../interface'
import { FIELD_RULES, NAME_RULES } from '@/common/checkInfo/checkInfo'

const { AUTOCOMPLETE, CHECKBOX, SELECT, DATE_PICKER, TEXTAREA, INPUT_WITH_LENGTH } = ControlType

const yearMonthType: fieldType = {
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
      itemProps: { initialValue: EnumDefaultType.NONE },
      config: {
        options: [
          { value: EnumDefaultType.SYSTEM, text: '系统当前年月' },
          { value: EnumDefaultType.FIXED, text: '固定年月' },
          { value: EnumDefaultType.NONE, text: '无默认值' }]
      }
    },
    // {
    //   control: SELECT,
    //   name: 'showFormat',
    //   title: '显示格式：',
    //   props: {},
    //   itemProps: { initialValue: YearMonthShowType.FULL_NORMAL },
    //   config: {
    //     options: [
    //       { value: YearMonthShowType.FULL_NORMAL, text: 'YYYY/M(2021/7)' },
    //       { value: YearMonthShowType.FULL_ZERO_FILL, text: 'YYYY/MM(2021/07)' },
    //       { value: YearMonthShowType.HALE_NORMAL, text: 'YY/M(21/7)' },
    //       { value: YearMonthShowType.HALF_ZERO_FILL, text: 'YY/MM(21/07)' }
    //     ]
    //   }
    // },
    {
      control: AUTOCOMPLETE,
      name: 'showFormat',
      title: '显示格式：',
      props: {},
      itemProps: { initialValue: yearMonthTypeOption[0].value },
      config: { options: yearMonthTypeOption }
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
    // {
    //   control: DIVIDER,
    //   name: '',
    //   title: '',
    //   props: {  orientation: 'left', key: 'dividerDate' },
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
export default yearMonthType
