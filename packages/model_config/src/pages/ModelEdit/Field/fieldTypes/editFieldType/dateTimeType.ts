/**
 * 日期时间
 */
import { ControlType, EnumDefaultType, dateTimeShowTypeOption } from '../constants'
import { fieldType } from '../interface'
import { FIELD_RULES, NAME_RULES, STATEMENT_RULES } from '@/common/checkInfo/checkInfo'

const { CHECKBOX, SELECT, DATE_PICKER, TEXTAREA, INPUT_WITH_LENGTH, AUTOCOMPLETE } = ControlType

const dateType: fieldType = {
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
          { value: EnumDefaultType.SYSTEM, text: '系统当前日期时间' },
          { value: EnumDefaultType.FIXED, text: '固定日期时间' },
          { value: EnumDefaultType.NONE, text: '无默认值' }]
      }
    },
    // {
    //   control: SELECT,
    //   name: 'showFormat',
    //   title: '显示格式：',
    //   props: {},
    //   itemProps: { initialValue: DateTimeShowType.HYPHEN_PREFIX_DEFAULT },
    //   config: {
    //     options: [
    //       { value: DateTimeShowType.HYPHEN_PREFIX_DEFAULT, text: 'YYYY-MM-DD 24时制(2021-07-15 23:59:59)' },
    //       { value: DateTimeShowType.HYPHEN_NON_PREFIX_DEFAULT, text: 'YYYY-M-D 24时制(2021-7-5 23:59:59)' },
    //       { value: DateTimeShowType.SLASH_PREFIX_DEFAULT, text: 'YYYY/MM/DD 24时制(2021/07/15 23:59:59)' },
    //       { value: DateTimeShowType.SLASH_NON_PREFIX_DEFAULT, text: 'YYYY/M/D 24时制(2021/7/5 23:59:59)' },
    //       { value: DateTimeShowType.HYPHEN_PREFIX_AM_PM, text: 'YYYY-MM-DD 12时制(2021-07-15 11:59:59PM)' },
    //       { value: DateTimeShowType.HYPHEN_NON_PREFIX_AM_PM, text: 'YYYY-M-D 12时制(2021-7-5 11:59:59PM)' },
    //       { value: DateTimeShowType.SLASH_PREFIX_AM_PM, text: 'YYYY/MM/DD 12时制(2021/07/15 11:59:59PM)' },
    //       { value: DateTimeShowType.SLASH_NON_PREFIX_AM_PM, text: 'YYYY/M/D 12时制(2021/7/5 11:59:59PM)' }
    //     ]
    //   }
    // }
    {
      control: AUTOCOMPLETE,
      name: 'showFormat',
      title: '显示格式：',
      props: {},
      itemProps: { initialValue: dateTimeShowTypeOption[0].value },
      config: { options: dateTimeShowTypeOption }
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
      title: '选择默认日期时间：',
      props: { showTime: true, placeholder: '请选择日期时间' },
      itemProps: {},
      config: {}
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
      itemProps: { rules: STATEMENT_RULES },
      config: {}
    }
  ]
}
export default dateType
