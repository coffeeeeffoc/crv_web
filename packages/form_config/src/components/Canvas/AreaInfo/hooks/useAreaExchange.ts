
import { canvasActions } from '@/redux/actions';
import {
  useAppSelector,
  useAppDispatch,
} from '@/redux/hooks';
import {
  useDrag,
  useDrop,
} from 'react-dnd';
import { useRef } from 'react';
import { exchangeAreaAdditions } from '@@/Canvas/GridCell';

// 区域交换
export const areaExchangeType = 'areaExchange';

// 交换区域
export const useAreaExchange = ({
  area,
}: any) => {
  const dispatch = useAppDispatch();
  const areaAdditions = useAppSelector(state => state.canvas.areaAdditions);
  const ref = useRef<any>();
  const [{ isDragging }, drag] = useDrag(() => ({
    type: areaExchangeType,
    collect: monitor => ({
      isDragging: monitor.isDragging() // css样式需要
    }),
    item: {
      type: areaExchangeType,
      areaId: area.id
    },
  }), [area]);
  const [, drop] = useDrop(() => ({
    accept: [areaExchangeType],
    drop: (item: any, monitor) => {
      // 如果已经放置，则不再执行放置动作
      if (monitor.didDrop()) {
        return;
      }
      const distAreaAdditions = exchangeAreaAdditions({
        areaAdditions,
        sourceId: item.areaId,
        targetId: area.id,
      });
      // 交换两个区域的内容
      dispatch(canvasActions.setMultiState({
        areaAdditions: distAreaAdditions,
      }));
    },
    // VIP：此处非常重要,useDrop的第二个参数一定要精确到每一个使用的变量，否则拖拽过程中会发生莫名其妙的异常
  }), [areaAdditions, area]);
  drag(drop(ref));
  return {
    ref,
    isDragging,
  };
};
