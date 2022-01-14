/**
 * 时间
 */
import { ControlType, EnumDefaultType, timeShowTypeOption } from '../constants'
import { fieldType } from '../interface'
import { FIELD_RULES, NAME_RULES } from '@/common/checkInfo/checkInfo'

const { CHECKBOX, SELECT, TIME_NO_LIMIT_PICKER, TEXTAREA, INPUT_WITH_LENGTH, AUTOCOMPLETE } = ControlType

const timeType: fieldType = {
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
          { value: EnumDefaultType.SYSTEM, text: '系统当前时间' },
          { value: EnumDefaultType.FIXED, text: '固定时间' },
          { value: EnumDefaultType.NONE, text: '无默认值' }]
      }
    },
    // {
    //   control: SELECT,
    //   name: 'showFormat',
    //   title: '显示格式：',
    //   props: {},
    //   itemProps: { initialValue: TimeShowType.DEFAULT },
    //   config: {
    //     options: [
    //       { value: TimeShowType.DEFAULT, text: '24时制 (23:59:59)' },
    //       { value: TimeShowType.AM_PM, text: '12时制 (11:59:59PM)' },
    //     ]
    //   }
    // },
    {
      control: AUTOCOMPLETE,
      name: 'showFormat',
      title: '显示格式：',
      props: {},
      itemProps: { initialValue: timeShowTypeOption[0].value },
      config: { options: timeShowTypeOption }
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
      control: TIME_NO_LIMIT_PICKER,
      name: 'defaultValue',
      title: '选择默认时间：',
      props: {},
      itemProps: {},
      config: {}
    }
  ],
  foot: [
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
export default timeType
