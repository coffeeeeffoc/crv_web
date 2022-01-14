import { forwardRef, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Input, Select } from 'antd'
import { monthSelectValue } from '../../ConditionValue'

export default forwardRef((props: any, ref: any) => {
  const { value, onChange, onBlur, fieldType, ...restProps } = props
  const [focusSt, setFocusSt] = useState<boolean>(true)
  const [focusNd, setFocusNd] = useState<boolean>(false)
  const inputRefNd = useRef<HTMLInputElement>(null)
  const arr = useMemo(() => value?.split(',') ?? [], [value])
  const triggerChange = useCallback((index: number, val: number) => {
    arr[index] = val
    if (onChange) {
      if (arr[0] === undefined) { arr[0] = 0 }
      if (arr[1] === undefined || arr[1] < arr[0]) {
        arr[1] = arr[0]
      }
      onChange(arr.join(','))
    }
  }, [onChange, arr])

  // 当第一个inputNumber失去焦点后，聚焦到第二个inputNumber
  const onBlurSt = useCallback((val: number) => {
    console.log('month', val)
    triggerChange(0, val)
    inputRefNd?.current?.focus()
    setFocusNd(true)
    setFocusSt(false)
  }, [triggerChange])

  const onBlurNd = useCallback((val) => {
    triggerChange(1, val)
    setFocusNd(false)
  }, [triggerChange])

  useEffect(() => {
    if (!focusSt && !focusNd) onBlur()
  }, [focusSt, focusNd, onBlur])
  return (
    <Input.Group compact style={{ width: '100%', display: 'inline-block' }} {...restProps}>
      <Select
        className="range-left"
        style={{ textAlign: 'center', borderRight: 0, width: 'calc(50% - 10px)' }}
        placeholder="Minimum"
        value={arr[0]}
        onChange={onBlurSt}
        ref={ref}
      >
        {monthSelectValue.map(item => <Select.Option value={item} key={item}>{item}</Select.Option>)}
      </Select>
      <Input
        style={{
          width: 20,
          borderRight: 0,
          borderLeft: 0,
          textAlign: 'center',
          paddingLeft: 0,
          paddingRight: 0
        }}
        placeholder="~"
        disabled
      />
      <Select
        className="range-right"
        style={{
          textAlign: 'center',
          borderLeft: 0,
          width: 'calc(50% - 10px)'
        }}
        placeholder="Maximum"
        // min={arr[0]}
        value={arr[1]}
        onBlur={onBlur}
        onChange={onBlurNd}
        ref={inputRefNd}
      >
        {monthSelectValue.map(item => <Select.Option value={item} key={item}>{item}</Select.Option>)}
      </Select>
    </Input.Group>
  )
})
