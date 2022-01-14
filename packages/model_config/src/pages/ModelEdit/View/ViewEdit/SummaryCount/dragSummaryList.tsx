import { useRef } from 'react'
import { useDrag, useDrop } from 'react-dnd'

const type = 'dragSummaryList'

const DragSummaryList = ({ index, record, moveRow, className, style, ...restProps }: any) => {
  console.log('DragSummaryList', index, record)
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
    canDrop: (item, monitor) => {
      return undefined !== index
    },
    drop: (item, monitor) => {
      moveRow(item, index)
    },
  })
  const [, drag] = useDrag({
    type,
    item: {
      index,
      record
    },
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

export default DragSummaryList
