// 对日期组件TimePicker进行一层封装
import { FC, useCallback } from 'react'
import { TimePicker } from 'antd'
import moment from 'moment'
import 'moment/locale/zh-cn'
import { EnumDefaultType } from '../../constants'
interface OwnDatePickerProp {
  value?: string
  // onChange?: (val: string) => void
  dateType: EnumDefaultType
  [propsName: string]: any
}
const OwnTimePicker: FC<OwnDatePickerProp> = ({
  value,
  onChange,
  dateType,
  ...restProps
}) => {
  const timeOnChange = useCallback((time: any, timeString: string) => {
    onChange(timeString)
  }, [onChange])

  return (
    <TimePicker
      {...restProps}
      style={{ width: '100%' }}
      value={dateType === EnumDefaultType.FIXED ? (value === '' || value === undefined) ? null : moment(value, 'HH:mm:ss') : undefined}
      onChange={timeOnChange}
    />
  )
}

export default OwnTimePicker
