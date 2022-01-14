import { createPipeComponent } from '../compose';
import { Resizable } from 'react-resizable';
import styles from './ResizableHeaderCell.less';
import { useEffect, useState } from 'react';

export const ResizableHeaderCell = createPipeComponent(
  ({ onResize, isLast, ...props }: any) => props,
  'tr',
  // 最后一列，不用加resize功能
  (node, props) => props.isLast
    ? node
    : (
        <Resizable
          className={styles.resizable}
          width={props.width}
          height={80}
          onResizeStart={(event) => {
            console.log('onResizeStart', event);
            /**
             * stopPropagation阻止冒泡不能阻止外层th的drag事件的触发；但是preventDefault可以阻止drag事件触发
             * 原因猜测：drag事件是由于点击和拖拽默认产生的事件，不是有mouseover等事件传播产生的事件
             */
            event.preventDefault();
          }}
          onResize={(event, { node, size, handle }) => {
            props.onResize?.(size.width);
          }}
          draggableOpts={{ enableUserSelectHack: false }}
        >
          {node}
        </Resizable>
      ),
);

// fn参数纯粹是因为初次调用时setNewColumns不能直接访问，所以放在函数中
const convert = (columns: any[], fn: Function) => {
  return columns.map((item, index) => ({
    ...item,
    onHeaderCell: (column: any) => ({
      ...item.onHeaderCell?.(column),
      width: column.width,
      isLast: index === columns.length - 1,
      onResize: (width: any) => {
        fn()((cols: any[]) => {
          const newCols = cols.slice();
          newCols.splice(index, 1, {
            ...newCols[index],
            width,
          });
          return newCols;
        });
      },
    }),
  }));
};

export const useResizableHeaderCell = ({
  columns
}: any) => {
  const [newColumns, setNewColumns] = useState(() => convert(columns, () => setNewColumns));
  useEffect(() => {
    setNewColumns(convert(columns, () => setNewColumns));
  }, [columns]);

  return {
    components: {
      header: {
        cell: ResizableHeaderCell,
      },
    },
    columns: newColumns,
  };
};
