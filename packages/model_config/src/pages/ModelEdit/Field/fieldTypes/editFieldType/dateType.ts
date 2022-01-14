/**
 * 日期
 */
import { ControlType, EnumDefaultType, dateShowTypeOption } from '../constants'
import { fieldType } from '../interface'
import { FIELD_RULES, NAME_RULES, STATEMENT_RULES } from '@/common/checkInfo/checkInfo'

const { INPUT, CHECKBOX, SELECT, DATE_PICKER, DIVIDER, TEXTAREA, INPUT_WITH_LENGTH, AUTOCOMPLETE } = ControlType

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
          { value: EnumDefaultType.SYSTEM, text: '系统当前日期' },
          { value: EnumDefaultType.FIXED, text: '固定日期' },
          { value: EnumDefaultType.NONE, text: '无默认值' }]
      }// ?
    },
    // {
    //   control: SELECT,
    //   name: 'showFormat',
    //   title: '显示格式：',
    //   props: {},
    //   itemProps: { initialValue: DateShowType.HYPHEN_PREFIX },
    //   config: {
    //     options: [
    //       { value: DateShowType.HYPHEN_PREFIX, text: 'YYYY-MM-DD(2021-07-15)' },
    //       { value: DateShowType.HYPHEN_NON_PREFIX, text: 'YYYY-M-D(2021-7-5)' },
    //       { value: DateShowType.SLASH_PREFIX, text: 'YYYY/MM/DD(2021/07/15)' },
    //       { value: DateShowType.SLASH_NON_PREFIX, text: 'YYYY/M/D(2021/7/5)' }
    //     ]
    //   }
    // }
    {
      control: AUTOCOMPLETE,
      name: 'showFormat',
      title: '显示格式：',
      props: {},
      itemProps: { initialValue: dateShowTypeOption[0].value },
      config: { options: dateShowTypeOption }
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
      title: '选择默认日期：',
      props: {},
      itemProps: {},
      config: {}
    }
  ],
  foot: [
    {
      control: DIVIDER,
      name: '',
      title: '',
      props: { orientation: 'left', key: 'dividerDate' },
      itemProps: {},
      config: { title: '数据有效性规则' }
    },
    {
      control: INPUT,
      name: 'dataValidity',
      title: '表达式规则：',
      props: {},
      itemProps: {},
      config: {}
    },
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
