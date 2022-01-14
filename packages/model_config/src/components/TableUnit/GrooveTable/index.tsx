import { FC } from 'react'
import { Table } from 'antd'
import style from './index.less'
import classNames from 'classnames'

interface GrooveTablePropsType {
  dataSource?: Array<{}>
  columns?: Array<{}>
  className?: string
  [propsName: string]: any
}
const GrooveTable: FC<GrooveTablePropsType> = ({
  dataSource,
  columns,
  className,
  ...restProps
}) => {
  return (
    <Table
      dataSource={dataSource}
      columns={columns}
      className={classNames(style.table, className)}
      {...restProps}
    />
  )
}

export default GrooveTable
