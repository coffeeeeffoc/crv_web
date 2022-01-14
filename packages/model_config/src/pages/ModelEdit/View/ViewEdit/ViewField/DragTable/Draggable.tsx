import React, { useRef } from 'react'
import { useDrag, useDrop } from 'react-dnd'

export const type = 'DragTableBodyRow'

const DragTableBodyRow = ({ align, index, record, moveRow, className, style, ...restProps }: any) => {
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
      if (monitor.didDrop()) {
        return;
      }
      const dropResult: any = monitor.getDropResult();
      if (!dropResult || !dropResult.dropped) {
        moveRow(item, index);
        return { dropped: true };
      }
    },
  })
  const [, drag] = useDrag({
    type,
    item: {
      index,
      align,
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

export default DragTableBodyRow
