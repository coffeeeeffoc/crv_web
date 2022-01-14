import { useAppSelector, useAppDispatch } from '@/redux/hooks';
import { canvasActions } from '@/redux/actions';
import { useContext, useRef, useCallback } from 'react';
import produce from 'immer';
import { useDrag, useDrop } from 'react-dnd';
import { AreaContext } from '@/context';

const acceptType = 'operationChange';

export const useDragDropOperation = ({
  id,
  index,
}: any) => {
  const dispatch = useAppDispatch();
  const area = useContext(AreaContext);
  const areaAdditions = useAppSelector(state => state.canvas.areaAdditions);
  const findById = useCallback((id) => {
    const operations = areaAdditions[area.id].operationBar.operations;
    const operationIndex = operations.findIndex((op: any) => op.id === id);
    return {
      operation: operations[operationIndex],
      index: operationIndex,
    };
  }, [area.id, areaAdditions]);
  const onTransPosition = useCallback((dragId: string, targetIndex: number) => {
    const { index: dragIndex } = findById(dragId);
    console.log('onTransPosition', dragIndex, targetIndex);
    dispatch(canvasActions.setMultiState({
      areaAdditions: produce(areaAdditions, (draft: any) => {
        const arr = draft[area.id].operationBar.operations;
        if (dragIndex === -1) {
          // 刚从左侧拖拽最新的操作进来，插队到本操作前面
          arr.splice(targetIndex, 0, { id: dragId });
        // } else if (arr[dragIndex]?.id !== dragId) {
        //   // 当所拖拽的序号跟所拖拽的项目的id不一致时，不处理；正常不会出现这种情况
        } else {
          // operationBar内部拖拽排序
          const tmp = arr[dragIndex];
          arr[dragIndex] = arr[targetIndex];
          arr[targetIndex] = tmp;
        }
      }),
    }));
  }, [area.id, areaAdditions, dispatch, findById]);
  const ref = useRef<any>();
  const [{ isDragging }, drag] = useDrag(() => ({
    type: acceptType,
    collect: monitor => ({
      isDragging: monitor.isDragging() // css样式需要
    }),
    end: (item, monitor) => {
      const { operation: { id: dragId }, index: originalIndex } = item;
      const didDrop = monitor.didDrop();
      if (!didDrop) {
        onTransPosition(dragId, originalIndex);
      }
    },
    item: {
      type: acceptType,
      index,
      operation: {
        id,
      },
    },
    // VIP：此处非常重要,useDrag的第二个参数一定要精确到每一个使用的变量，否则拖拽过程中会发生莫名其妙的异常
  }), [index, id, onTransPosition]);
  const [, drop] = useDrop(() => ({
    accept: [acceptType, 'operation'],
    hover: (item: any, monitor) => {
      // 如果已经放置，则不再执行放置动作
      if (monitor.didDrop()) {
        return;
      }
      const dragId = item.operation.id;
      if (dragId !== id) {
        const { index: overIndex } = findById(id);
        onTransPosition(dragId, overIndex);
      }
    },
    // VIP：此处非常重要,useDrop的第二个参数一定要精确到每一个使用的变量，否则拖拽过程中会发生莫名其妙的异常
  }), [onTransPosition, id, findById]);
  drag(drop(ref));
  return {
    ref,
    isDragging,
  };
};
