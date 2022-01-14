import { Select } from 'antd';

export interface EnumSelectProps {
  value?: string
  fieldList: any[]
  onChange?: (value: string) => void
  [key: string]: any
}

export default ({ value, onChange, config, ...props }: EnumSelectProps) => {
  const triggerChange = (vals: any[]) => {
    if (onChange) {
      onChange(vals.join(','))
    }
  }

  return (
    <Select mode="multiple" placeholder="请选择" value={value ? value?.split(',') : undefined} onChange={triggerChange} {...props}>
      {
        config.enumConfig?.enumList?.map((o: any) => <Select.Option key={o.value} value={o.value}>{o.name}</Select.Option>)
      }
    </Select>
  )
}
