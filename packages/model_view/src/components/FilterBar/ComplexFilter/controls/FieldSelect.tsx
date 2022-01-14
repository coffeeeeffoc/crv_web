import { Cascader } from 'antd';
import styles from './index.less';

export interface FieldSelectProps {
  value?: string
  fieldList: any[]
  onChange: (value: string) => void
  [key: string]: any
}

export default ({ value = '', onChange, fieldList, ...props }: FieldSelectProps) => {
  const triggerChange = (value: any[]) => {
    if (onChange) {
      onChange(value.join('.'))
    }
  }

  function filter (inputValue: any, path: any) {
    return path.some((option: any) => option.label.toLowerCase().indexOf(inputValue.toLowerCase()) > -1);
  }

  return (
    <Cascader dropdownRender={(menu) => <div className={styles.refFields}>{menu}</div>} changeOnSelect showSearch={{ filter }} {...props} value={value.split('.')} onChange={triggerChange} />
  )
}
