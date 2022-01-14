import { DatePicker, TimePicker } from 'antd';
import moment from 'moment';

// DATE/DATETIME/TIME/YEAR/MONTH
const map: any = {
  DATE: { props: {}, format: 'YYYY-MM-DD' },
  DATE_TIME: { props: { showTime: true }, format: 'YYYY-MM-DD HH:mm:ss' },
  TIME: { props: { picker: 'time' }, format: 'HH:mm:ss', control: TimePicker },
  YEAR: { props: { picker: 'year' }, format: 'YYYY' },
  YEAR_MONTH: { props: { picker: 'month' }, format: 'YYYY-MM' },
}

export default ({ value, onChange, config, ...props }: any) => {
  const { fieldType } = config;

  const triggerChange = (_: any, val: string) => {
    if (onChange) {
      onChange(val)
    }
  }

  const op = map[fieldType] ?? {}
  const Control = op.control ?? DatePicker;
  return (
    <Control {...op.props} {...props} value={value && moment(value, op.format)} onChange={triggerChange} />
  )
}

export const DateRangePicker = ({ value, onChange, config, ...props }: any) => {
  const { fieldType } = config;
  const op = map[fieldType] ?? {}
  const arr = value?.split(',').filter((o: any) => !!o).map((o: any) => moment(o, op.format));
  if (arr?.length === 1) { arr[1] = arr[0] }

  const triggerChange = (_: any, val: string[]) => {
    if (onChange) {
      onChange(_ ? val.join(',') : undefined)
    }
  }
  const Control = op.control ?? DatePicker;
  return (
    <Control.RangePicker format={op.format} {...op.props} {...props} value={arr && [arr[0], arr[1]]} onChange={triggerChange} />
  )
}
