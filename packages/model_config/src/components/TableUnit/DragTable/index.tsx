import { useRef } from 'react'
import { useDrag, useDrop } from 'react-dnd'
import classNames from 'classnames'
import GrooveTable from '../GrooveTable'

const type = 'DraggableBodyRow'

const DraggableBodyRow = ({ index, moveRow, className, style, ...restProps }: any) => {
  const ref = useRef()
  const [{ isOver, dropClassName }, drop] = useDrop({
    accept: type,
    collect: (monitor: any) => {
      const { index: dragIndex } = monitor.getItem() || {}
      if (dragIndex === index) {
        return {}
      }
      return {
        isOver: monitor.isOver(),
        dropClassName: dragIndex < index ? ' drop-over-downward' : ' drop-over-upward',
      }
    },
    drop: (item: any) => {
      moveRow(item.index, index)
    },
  })
  const [, drag] = useDrag({
    type,
    item: { index },
    collect: monitor => ({
      isDragging: monitor.isDragging(),
    }),
  })
  drop(drag(ref))

  return (
    <tr
      ref={ref}
      className={`${className}${isOver ? dropClassName : ''}`}
      style={{ cursor: 'move', ...style }}
      {...restProps}
    />
  )
}

interface DragTablePropsType {
  className: string
  columns: any[]
  dataSource: any[]
  [propsName: string]: any
}
const DragTable = ({
  className,
  columns,
  dataSource,
  ...restProps
}: DragTablePropsType) => {
  const components = {
    body: {
      // cell: DraggableBodyRow,
      row: DraggableBodyRow,
    },
  }
  return (
    <GrooveTable
      className={classNames(className)}
      columns={columns}
      bordered
      dataSource={dataSource}
      components={components}
      pagination={false}
      {...restProps}
    />
  )
}

export default DragTable
