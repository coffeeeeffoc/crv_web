import { forwardRef, useCallback, useMemo } from 'react'
import { TimePicker, DatePicker } from 'antd'
import { FieldType } from '@/common/constant'
import moment from 'moment'

const dateMap: any = {
  [FieldType.DATE]: { props: {}, format: 'YYYY-MM-DD' },
  [FieldType.DATE_TIME]: { props: { showTime: true }, format: 'YYYY-MM-DD HH:mm:ss' },
  DATETIME: { props: { showTime: true }, format: 'YYYY-MM-DD HH:mm:ss' },
  [FieldType.TIME]: { props: { picker: 'time' }, format: 'HH:mm:ss', control: TimePicker },
  [FieldType.YEAR]: { props: { picker: 'year' }, format: 'YYYY' },
  [FieldType.YEAR_MONTH]: { props: { picker: 'month' }, format: 'YYYY-MM' },
}
// 期间，期间，公司名称，登录名

export const DateTimePicker = forwardRef((props: any, ref) => {
  const { value, onChange, fieldType, ...restProps } = props

  const triggerChange = useCallback((_: any, val: string) => {
    if (onChange) {
      onChange(val)
    }
  }, [onChange])
  const dateConfig = dateMap[fieldType] ?? {}
  const Control = dateConfig.control ?? DatePicker
  return <Control defaultOpen style={{ width: '100%' }} {...dateConfig.props} {...restProps} value={value && moment(value, dateConfig.format)} onChange={triggerChange} ref={ref} />
})

export const DateRangePicker = forwardRef((props: any, ref) => {
  const { value = '', onChange, onBlur, fieldType, ...restProps } = props
  const dateConfig = dateMap[fieldType] ?? {}
  const arr = useMemo(() => value?.split(',').filter((o: any) => !!o).map((o: any) => moment(o, dateConfig.format)), [value, dateConfig.format])
  const triggerChange = useCallback((_: any, val: string[]) => {
    onChange(val.join(','))
    onBlur()
  }, [onChange, onBlur])
  const onOpenChange = useCallback((val: boolean) => {
    if (!val) {
      onBlur()
    }
  }, [onBlur])
  const Control = dateConfig.control ?? DatePicker
  return <Control.RangePicker defaultOpen style={{ width: '100%' }} onOpenChange={onOpenChange} {...dateConfig.props} {...restProps} value={arr && [arr[0], arr[1]]} onChange={triggerChange} ref={ref} />
})
