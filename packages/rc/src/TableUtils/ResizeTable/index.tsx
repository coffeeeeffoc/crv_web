import { FC, useState, useEffect } from 'react';
import { Table } from 'antd';
import ResizableTitle from './ResizableTitle';
import styles from './ResizableTitle.less';
// import VirtualTable from '@rc/TableUtils/VirtualTable';

const ResizeTable: FC<any> = (props) => {
  const [columns, setColumns] = useState(props.columns || [])
  console.log('scroll', props)
  const scroll: any = { scroll: {...props.scroll} }

  useEffect(() => {
    setColumns(props.columns);
  }, [props.columns]);

  const handleResize = (index: number) => (e: any, { size }: { size: any }) => {
    const nextColumns = [...columns];
    nextColumns[index] = {
      ...nextColumns[index],
      width: size.width,
    };
    setColumns(nextColumns);
  };

  let width: number = 0;
  const tbWidth = document.getElementById(props.parentDomId)?.clientWidth;
  console.info('tbWidth', tbWidth, width);
  const cols = columns.map((col: any, index: number) => {
    // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
    width += col.width;
    return {
      ...col,
      ellipsis: true,
      onHeaderCell: (column: any) => ({
        width: column.width,
        onResize: handleResize(index),
      })
    }
  });
  // cols.push({ width: 10 })

  // const scroll: any = { scroll: { y: 'x' } };
  if (width <= (tbWidth ?? 0) && cols.length > 1) {
    delete cols[cols.length - 2].width;
  } else {
    scroll.scroll.x = width;
  }

  return (
    <Table
      {...props}
      components={{ header: { cell: ResizableTitle } }}
      className={props.className ? `${props.className} ${styles.crvResizable}` : styles.crvResizable}
      columns={cols}
      {...scroll}
      // scroll={{ y:'800px'}}

    />
  )
}

export default ResizeTable
