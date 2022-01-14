import { ControlType } from './constants'
import InputWithLength from '@rc/ModuleUtils/ControlWithLength/InputWithLength'
import SearchResponse from '@@/ModuleUtils/RewriteControl/SelectResponse'
import TimeNoLimitPicker from './unit/TimePicker'
import EnumSelect from './unit/EnumSelect'
import {
  Checkbox,
  Divider,
  Input,
  InputNumber,
  Select,
  AutoComplete
} from 'antd'
import OwnDatePicker from './unit/DatePicker'

/**
 * 创建控件
 * @param {*} type
 * @param {*} config
 * @param {*} props
 * @returns
 */

export const createControl = (type: any, config: any, props: any) => {
  switch (type) {
    case ControlType.DIVIDER: return <Divider {...props}>{config.title}</Divider>
    case ControlType.INPUT: return <Input {...props} />
    case ControlType.INPUT_WITH_LENGTH: return <InputWithLength {...props} />
    case ControlType.CHECKBOX: return <Checkbox {...props}>{config.title}</Checkbox>
    case ControlType.TEXTAREA: return <Input.TextArea rows={5} {...props} showCount maxLength={140} />
    case ControlType.INPUT_NUMBER: return <InputNumber {...props} />
    case ControlType.DATE_PICKER: return <OwnDatePicker {...props} />
    case ControlType.TIME_NO_LIMIT_PICKER: return <TimeNoLimitPicker {...props} />
    case ControlType.SELECT: return <Select {...props}>
      {
        config?.options?.map(({ value, label, text }: any) => <Select.Option key={value} value={value}>{label ?? text ?? ''}</Select.Option>)
      }
    </Select>
    case ControlType.SELECT_RESPONSE: return <SearchResponse {...props} />
    case ControlType.ENUM_SELECT: return <EnumSelect {...props} />
    case ControlType.AUTOCOMPLETE: return <AutoComplete {...props} options={config.options} />
    default:
      return <span {...props} />
  }
}
