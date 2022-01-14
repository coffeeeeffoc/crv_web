// 对日期组件DatePicker进行一层封装
import { DatePicker, ConfigProvider } from 'antd'
import zhCN from 'antd/es/locale/zh_CN'
import moment from 'moment'
import 'moment/locale/zh-cn'
import { FC, useMemo } from 'react'
import { EnumDefaultType } from '../../constants'
interface OwnDatePickerProp {
  value?: string
  onChange?: (val: string) => void
  dateType: EnumDefaultType
  [propsName: string]: any
}
const OwnDatePicker: FC<OwnDatePickerProp> = ({
  value,
  onChange,
  dateType,
  ...restProps
}) => {
  const curValue = useMemo(() => {
    if (value && typeof value !== 'string') {
      try {
        return String(value)
      } catch (err) {
        console.log(err)
        return value
      }
    } else {
      return value
    }
  }, [value])

  return (
    <ConfigProvider locale={zhCN}>
      <DatePicker
        {...restProps}
        style={{ width: '100%' }}
        value={dateType === EnumDefaultType.SYSTEM ? null : dateType === EnumDefaultType.FIXED ? (value === '' || value === undefined) ? null : moment(curValue) : null}
        // value={dateType === EnumDefaultType.SYSTEM ? moment() : dateType === EnumDefaultType.FIXED ? (value === '' || value === undefined) ? null : moment(value) : null}
        onChange={(_, dataString: string) => {
          if (onChange) onChange(dataString)
        }}
      />
    </ConfigProvider>
  )
}

export default OwnDatePicker
