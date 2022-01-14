import { forwardRef } from 'react'
import { InputNumber, Select } from 'antd'

export interface CssWidthHeightInputProps {
  value?: string
  onChange?: (data: string) => void
  [key: string]: any
}

const CssWidthHeightInput = forwardRef(({ value = '', onChange, ...props }: CssWidthHeightInputProps, ref: any) => {
  const numberChange = (val: number) => {
    let newVal = value;
    if (value.match(/\d+/)) {
      newVal = value.replace(/\d+/, `${val}`);
    } else {
      newVal = `${val}${value}`;
    }
    if (onChange) { onChange(newVal); }
  }

  const unitChange = (val: string) => {
    let newVal = value;
    if (value.match(/[a-z%]+/)) {
      newVal = value.replace(/[a-z%]+/, val);
    } else {
      newVal = `${value}${val}`
    }
    if (onChange) { onChange(newVal); }
  }

  const valArr = value.match(/(\d*)([^\d]*)/) ?? ['', '', ''];

  const selectAfter: any = (
    <Select style={{ minWidth: 50 }} value={valArr[2]} onChange={unitChange}>
      <Select.Option value="px">px</Select.Option>
      <Select.Option value="em">em</Select.Option>
      <Select.Option value="ex">ex</Select.Option>
      <Select.Option value="cm">cm</Select.Option>
      <Select.Option value="mm">mm</Select.Option>
      <Select.Option value="in">in</Select.Option>
      <Select.Option value="pt">pt</Select.Option>
      <Select.Option value="pc">pc</Select.Option>
      <Select.Option value="vw">vw</Select.Option>
      <Select.Option value="vh">vh</Select.Option>
      <Select.Option value="%">%</Select.Option>
    </Select>
  )

  return (
    <InputNumber
      ref={ref}
      min={0}
      value={valArr[1] === '' ? undefined : parseFloat(valArr[1])}
      addonAfter={selectAfter}
      onChange={numberChange}
      {...props}
    />
  )
})

export default CssWidthHeightInput;
