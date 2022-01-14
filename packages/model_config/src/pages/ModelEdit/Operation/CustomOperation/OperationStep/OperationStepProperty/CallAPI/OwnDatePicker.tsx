import { useEffect, useRef } from 'react'
import { DatePicker } from 'antd'
import moment from 'moment'

const OwnDatePicker = ({
  value,
  onChange,
  ref,
  save,
  ...restProps
}: any) => {
  const inputRef: any = useRef(null)
  useEffect(() => {
    setTimeout(() => {
      inputRef.current.focus()
    }, 0)
  }, [value])
  return (
    <DatePicker
      // onChange={save}
      value={value ? moment(value) : null}
      // onBlur={save}
      {...restProps}
      ref={inputRef}
      style={{ width: '100%' }}
      open='true'
      onChange={(_, dataString) => {
        onChange(dataString)
      }}
    />
  )
}

export default OwnDatePicker
