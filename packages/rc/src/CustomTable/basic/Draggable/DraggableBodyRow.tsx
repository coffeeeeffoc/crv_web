import { composeRef, createPipeComponent } from '../compose';
import { useChangeOrder, useDragDrop } from '@crv/rc/src/hooks/basic';

const type = 'DraggableBodyRow';

export const DraggableBodyRow = createPipeComponent(({ index, moveRow, style, ...restProps }: any, outerRef: any) => {
  const {
    ref,
    style: dragStyle,
  } = useDragDrop({
    index,
    type,
    onDrop: moveRow,
  });
  return {
    ref: (node: any) => composeRef(node, ref, outerRef),
    style: { ...style, ...dragStyle },
    ...restProps,
  };
}, 'tr');

export const useDraggableBodyRow = ({
  dataSource,
  onRow,
  setDataSource,
}: any) => {
  const moveRow = useChangeOrder(dataSource, setDataSource);

  return {
    components: {
      body: {
        row: DraggableBodyRow,
      },
    },
    onRow: (record: any, index?: number) => ({
      ...onRow?.(record, index),
      index,
      moveRow,
    }),
  };
};
