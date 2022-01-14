import { useEffect, useMemo, useState } from 'react';
import { createPipeComponent, composeRef } from '../compose';
import { useChangeOrder, useDragDrop } from '@crv/rc/src/hooks/basic';

const type = 'DraggableHeaderCell';

export const DraggableHeaderCell = createPipeComponent(({ index, moveColumn, style, ...restProps }: any, outerRef: any) => {
  const {
    ref,
    style: dragStyle,
  } = useDragDrop({
    index,
    type,
    onDrop: moveColumn,
  });
  return {
    ref: (node: any) => composeRef(node, ref, outerRef),
    style: { ...style, ...dragStyle },
    ...restProps
  };
}, 'th');

export const useDraggableHeaderCell = ({
  columns,
}: any) => {
  const [newColumns, setNewColumns] = useState<any[]>(columns);
  useEffect(() => {
    setNewColumns(columns);
  }, [columns]);
  const moveColumn = useChangeOrder(newColumns, setNewColumns);
  const finalColumns = useMemo(() => newColumns.map(item => ({
    ...item,
    onHeaderCell: (cols: any) => ({
      ...item.onHeaderCell?.(cols),
      index: newColumns.findIndex(i => i.dataIndex === item.dataIndex),
      moveColumn,
    }),
  })), [newColumns, moveColumn]);
  return {
    components: {
      header: {
        cell: DraggableHeaderCell,
      }
    },
    columns: finalColumns,
  };
};
