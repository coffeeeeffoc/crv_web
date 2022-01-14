/**
 * 年度
 */
import { ControlType, EnumDefaultType, yearShowTypeOption } from '../constants'
import { fieldType } from '../interface'
import { FIELD_RULES, NAME_RULES, STATEMENT_RULES } from '@/common/checkInfo/checkInfo'

const { CHECKBOX, SELECT, DATE_PICKER, DIVIDER, TEXTAREA, INPUT_WITH_LENGTH, AUTOCOMPLETE } = ControlType

const yearType: fieldType = {
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
          { value: EnumDefaultType.SYSTEM, text: '系统当前年度' },
          { value: EnumDefaultType.FIXED, text: '固定年度' },
          { value: EnumDefaultType.NONE, text: '无默认值' }]
      }
    },
    // {
    //   control: SELECT,
    //   name: 'showFormat',
    //   title: '显示格式：',
    //   props: {},
    //   itemProps: { initialValue: YearShowType.FULL },
    //   config: {
    //     options: [
    //       { value: YearShowType.FULL, text: 'YYYY(2021)' },
    //       { value: YearShowType.HALF, text: 'YY(21)' },
    //     ]
    //   }
    // }
    {
      control: AUTOCOMPLETE,
      name: 'showFormat',
      title: '显示格式：',
      props: {},
      itemProps: { initialValue: yearShowTypeOption[0].value },
      config: { options: yearShowTypeOption }
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
      title: '选择默认年度：',
      props: { picker: 'year', placeholder: '请选择年度' },
      itemProps: {},
      config: {}
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
        control: DATE_PICKER,
        name: 'minValue',
        title: '最小取值：',
        props: { picker: 'year', placeholder: '请选择最小年度', dateType: EnumDefaultType.FIXED },
        itemProps: { style: { paddingRight: '50px' } },
        config: {}
      },
      {
        control: DATE_PICKER,
        name: 'maxValue',
        title: '最大取值：',
        props: { picker: 'year', placeholder: '请选择最大年度', dateType: EnumDefaultType.FIXED },
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
    // [
    //   {
    //     control: SELECT,
    //     name: 'showFormat',
    //     title: '数据显示形式：',
    //     props: { placeholder: '请选择数据显示形式' },
    //     itemProps: { initialValue: IntegerShowType.NORMAL, style: { paddingRight: '50px' } },
    //     config: {
    //       options: [
    //         { value: IntegerShowType.NORMAL, text: '按普通形式显示' },
    //         { value: IntegerShowType.THOUSAND_SEPARATORS, text: '按千分符形式显示' }
    //       ]
    //     }
    //   },
    //   {
    //     control: '',
    //     name: '',
    //     title: '',
    //     props: {},
    //     itemProps: {},
    //     config: {}
    //   },
    // ],
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
export default yearType
