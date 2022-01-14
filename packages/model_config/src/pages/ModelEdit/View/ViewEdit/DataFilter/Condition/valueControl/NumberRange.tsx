import { forwardRef, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { InputNumber, Input } from 'antd'

export const InputNumberLimit = forwardRef((props: any, ref) => {
  // const { fieldInfo, ...restProps } = props
  // const { fieldType, minValue, maxValue, showDigits } = fieldInfo
  // const controlProps = useMemo(() => ({
  //   ...restProps,
  //   min: minValue,
  //   max: maxValue,
  //   precision: fieldType !== 'INTEGER' ? showDigits : 0
  // }), [restProps, fieldType, minValue, maxValue, showDigits])

  return <InputNumber style={{ width: '100%' }} {...props} ref={ref} />
})

export const NumberRange = forwardRef((props: any, ref: any) => {
  const { value = '', onChange, onBlur, fieldType, ...restProps } = props
  const [focusSt, setFocusSt] = useState<boolean>(true)
  const [focusNd, setFocusNd] = useState<boolean>(false)
  // const inputRefSt = useRef<HTMLInputElement>(null)
  const inputRefNd = useRef<HTMLInputElement>(null)
  const arr = useMemo(() => value?.split(',').map((item: string) => Number(item)), [value])
  const triggerChange = useCallback((index: number, val: number) => {
    arr[index] = val
    if (onChange) {
      if (arr[0] === undefined || Object.is(arr[0], NaN)) { arr[0] = 0 }
      if (arr[1] < arr[0] || Object.is(arr[1], NaN)) {
        arr[1] = arr[0]
      }
      onChange(arr.join(','))
    }
  }, [onChange, arr])

  // 当第一个inputNumber失去焦点后，聚焦到第二个inputNumber
  const onBlurSt = useCallback((val) => {
    triggerChange(0, Number(val.target.value))
    inputRefNd?.current?.focus()
    setFocusNd(true)
    setFocusSt(false)
  }, [triggerChange])

  const onBlurNd = useCallback((val) => {
    triggerChange(1, Number(val.target.value))
    setFocusNd(false)
    // await onBlur()
    // console.log('onBlurNd', ref, ref?.current)
  }, [triggerChange])

  useEffect(() => {
    if (!focusSt && !focusNd) onBlur()
  }, [focusSt, focusNd, onBlur])

  return (
    <Input.Group compact style={{ width: '100%', display: 'inline-block' }} {...restProps}>
      <InputNumber
        className="range-left"
        style={{ textAlign: 'center', borderRight: 0, width: 'calc(50% - 10px)' }}
        placeholder="最小值"
        value={arr?.[0]}
        onBlur={onBlurSt}
        onPressEnter={onBlurSt}
        // onFocus={() => {setFocusSt(true); console.log('onBlur25')}}
        ref={ref}
      />
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
      <InputNumber
        className="range-right"
        style={{
          textAlign: 'center',
          borderLeft: 0,
          width: 'calc(50% - 10px)'
        }}
        placeholder="最大值"
        min={arr?.[0]}
        value={arr?.[1]}
        onBlur={onBlurNd}
        onPressEnter={onBlurNd}
        ref={inputRefNd}
      />
    </Input.Group>
  )
})
