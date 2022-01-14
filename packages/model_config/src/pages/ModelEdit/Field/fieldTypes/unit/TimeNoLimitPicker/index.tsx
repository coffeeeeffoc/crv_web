import { TimePicker, Input } from 'antd'
import { FC, ReactNode, useCallback, useEffect, useState } from 'react'
import style from './index.less'
// import moment from 'moment'
import { DashboardOutlined } from '@ant-design/icons'
import { EnumDefaultType } from '../../constants'

interface TimePickerProps {
  value?: string | undefined
  dateType: EnumDefaultType
  // onChange?: (value: string) => void
  [propsName: string]: any
}
const TimeNoLimitPicker: FC<TimePickerProps> = ({
  value,
  onChange: save,
  dateType
}) => {
  const [inputValue, setInputValue] = useState(value)
  const [visible, setVisible] = useState<boolean>(false)
  useEffect(() => {
    setInputValue(value)
  }, [value])

  useEffect(() => {
    if (dateType === EnumDefaultType.SYSTEM) {
      setInputValue(undefined)
      // setInputValue(new Date().toTimeString().substring(0, 8))
    }
    if (dateType === EnumDefaultType.NONE) {
      setInputValue(undefined)
    }
  }, [dateType, setInputValue])

  const onOpenChange = useCallback((e: boolean) => {
    setVisible(false)
  }, [setVisible])

  const coinOnClick = useCallback(() => {
    if (dateType === EnumDefaultType.FIXED) setVisible(true)
  }, [setVisible, dateType])

  const timeOnChange = useCallback((time: any, timeString: string) => {
    setInputValue(timeString)
  }, [setInputValue])

  const onFinish = useCallback((e: any) => {
    save(inputValue)
  }, [inputValue, save])

  const suffix: ReactNode = <DashboardOutlined onClick={coinOnClick} style={{ marginRight: '5px', fontSize: '20px' }} />
  return (
    <div className={style.timePicker}>
      <Input
        disabled={dateType !== EnumDefaultType.FIXED}
        suffix={suffix}
        value={inputValue}
        onFocus={e => setVisible(true)}
        onChange={e => setInputValue(e.target.value)}
        onBlur={onFinish}
        placeholder='请选择或输入时间'
      />
      {
        visible && <div style={{ height: '0' }}>
          <TimePicker
            bordered={false}
            placeholder=''
            onOpenChange={onOpenChange}
            onChange={timeOnChange}
            style={{ top: '-20px', position: 'relative', height: '0' }}
            open={visible}
          />
        </div>
      }
    </div>
  )
}

export default TimeNoLimitPicker
