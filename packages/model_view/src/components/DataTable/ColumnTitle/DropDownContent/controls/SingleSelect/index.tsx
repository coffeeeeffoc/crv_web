import { FC, useEffect, useState } from 'react';
import styles from './style.less';

export interface SingleSelectProps {
  value?: string | number
  onChange?: (val: string | number | undefined) => void
  options: Array<{ value: string | number, label: any, [key: string]: any }>
}

const SingleSelect: FC<SingleSelectProps> = ({ value, onChange, options }) => {
  const [selected, setSelected] = useState(value)

  useEffect(() => { setSelected(value) }, [value])

  const onClick = (v: string | number) => {
    setSelected(v);
    if (onChange) { onChange(v === selected ? undefined : v) }
  }

  return (
    <ul style={{ paddingInlineStart: 0, margin: 0 }} className={styles.singleSelect}>
      {
        options.map((o: any) => <li key={o.value} style={{ listStyleType: 'none', backgroundColor: (selected === o.value ? '#1890FF' : 'initial') }} onClick={() => onClick(o.value)}>{o.label}</li>)
      }
    </ul>
  )
}

export default SingleSelect;
