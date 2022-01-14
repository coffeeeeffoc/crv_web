import { forwardRef } from 'react'
import InputWithLength from '@rc/ModuleUtils/ControlWithLength/InputWithLength'

export default () => {
  return forwardRef((propsType: any, ref: any): any => {
    const {
      onPressEnter,
      onBlur,
      dataIndex,
      value,
      record,
      onChange,
      ...rest
    } = propsType
    const result = {
      value,
      onChange,
      ...rest,
    }
    return <InputWithLength maxLength={20} onPressEnter={onPressEnter} onBlur={onBlur} ref={ref} {...result}></InputWithLength>
  })
}
