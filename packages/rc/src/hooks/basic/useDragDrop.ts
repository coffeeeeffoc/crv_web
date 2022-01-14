import { useCallback, useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import update from 'immutability-helper';
import classNames from 'classnames';

// 鼠标样式
const cursor = 'move';

export const useChangeOrder = (arr: any[], setArr: Function) => {
  const changeOrder = useCallback(
    (dragIndex, hoverIndex) => {
      const dragRow = arr[dragIndex];
      if (setArr) {
        setArr(
          update(arr, {
            $splice: [
              [dragIndex, 1],
              [hoverIndex, 0, dragRow]
            ]
          })
        );
      } else {
        console.warn('setArr is invalid, changeOrder will not work.');
      }
    },
    [arr, setArr]
  );

  return changeOrder;
};

export const useDragDrop = ({
  index,
  type,
  onDrop,
  canDrag,
}: any) => {
  const ref = useRef();
  const [{ isDraggingOver }, drop] = useDrop({
    accept: type,
    collect: monitor => {
      const { index: dragIndex } = monitor.getItem<any>() || {};
      if (dragIndex === index) {
        return {};
      }
      return {
        isDraggingOver: monitor.isOver(),
      };
    },
    drop: (item: any) => {
      onDrop?.(item.index, index);
    },
  }, [type, onDrop, index]);
  const [{ isDragging }, drag] = useDrag({
    type,
    // ...(canDrag && {
    //   canDrag,
    // }),
    canDrag: (monitor) => {
      console.log('canDrag_monitor', monitor);
      return typeof canDrag === 'boolean' ? canDrag : typeof canDrag === 'function' ? canDrag(monitor) : true;
    },
    item: { index },
    collect: monitor => ({
      isDragging: monitor.isDragging(),
    }),
  }, [type, canDrag, index]);
  drop(drag(ref));
  return {
    ref,
    isDraggingOver,
    isDragging,
    className: classNames({
      isDraggingOver,
      isDragging,
    }),
    style: {
      cursor,
      ...(isDraggingOver && {
        opacity: 0.5,
      }),
      ...(isDragging && {
        opacity: 0.2,
      }),
    },
  };
};
