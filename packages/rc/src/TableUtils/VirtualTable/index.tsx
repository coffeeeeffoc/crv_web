import { FC } from 'react'
import { Table } from 'antd'
import LazyLoad from 'react-lazyload'

export const b = 1

const VirtualTable: FC = (props) => {
  const VirtualRow = ({ className, style, ...virtualRowProps }: any) => {
  // const VirtualRow = ({ className, style, ...restProps}: any) => {
    return <LazyLoad>
      <tr
        className={className}
        style={{ ...style }}
        {...virtualRowProps}></tr>
    </LazyLoad> 
  }
  
  const components = {
    body: {
      row: VirtualRow
    }
  }
  return (
    <Table
      {...props}
      components={components}
      />
  )
}
export default VirtualTable