import { InputNumber, Input } from 'antd'
// import styles from './index.less';

export default ({ value, onChange, config, ...props }: any) => {
  const { fieldType, minValue, maxValue, showDigits } = config;

  const tempProps: any = { ...props };
  if (minValue !== undefined) { tempProps.min = minValue }
  if (maxValue !== undefined) { tempProps.max = maxValue }
  if (fieldType !== 'INTEGER' && showDigits !== undefined) { tempProps.precision = showDigits }

  return (
    <InputNumber {...tempProps} value={value} onChange={onChange} />
  )
}

export const NumberRange = ({ value = '', onChange, config, ...props }: any) => {
  const arr = value.split(',').filter((o: any) => !!o);

  const triggerChange = (index: number, val: number) => {
    arr[index] = val;
    if (onChange) {
      if (arr[0] === undefined) { arr[0] = 0 }
      if (arr[1] === undefined || arr[1] < arr[0]) {
        arr[1] = arr[0]
      }
      let result = arr.join(',');
      if (result === ',') { result = '' }
      onChange(result)
    }
  }

  const tempProps = { ...props };
  if (!tempProps.style) { tempProps.style = {} }
  tempProps.style.display = 'inline-block';
  tempProps.style.lineHeight = 1.7;

  return (
    <Input.Group compact style={{ display: 'inline-block' }} {...tempProps}>
      <InputNumber
        className="range-left"
        style={{ textAlign: 'center', borderRight: 0, width: 'calc(50% - 5px)' }}
        placeholder="最小"
        value={arr[0]}
        onChange={(val) => triggerChange(0, val)}
      />
      <Input
        style={{
          width: 10,
          borderRight: 0,
          borderLeft: 0,
          padding: 0
        }}
        placeholder="~"
        disabled
      />
      <InputNumber
        className="range-right"
        style={{
          textAlign: 'center',
          borderLeft: 0,
          width: 'calc(50% - 5px)'
        }}
        placeholder="最大"
        min={arr[0] ?? 0}
        value={arr[1]}
        onChange={(val) => triggerChange(1, val)}
      />
    </Input.Group>
  )
}
