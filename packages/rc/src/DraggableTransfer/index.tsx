import { Transfer, Empty } from 'antd';
import TransferListBody from 'antd/es/transfer/ListBody';
import {
  useMemo,
  useState,
  useRef,
  useCallback,
  useEffect,
} from 'react';
import { useDrag, useDrop } from 'react-dnd';
import update from 'immutability-helper';
import styles from './index.less';

const type = 'draggableTransfer';

const DraggableElement = ({
  formatName,
  formatTitle,
  record,
  changeOrder,
}: any) => {
  const ref = useRef<any>();
  const [, drop] = useDrop({
    accept: type,
    drop: (item: any, monitor) => {
      if (monitor.didDrop()) return;
      changeOrder(item.record, record);
    },
  }, [record, changeOrder]);
  const [, drag] = useDrag({
    type,
    item: {
      record,
    },
  }, [record]);
  drop(drag(ref));

  return (
    <div ref={ref} title={formatTitle(record)}>{formatName(record)}</div>
  );
};

export default ({
  value,
  onChange,
  nameKey = 'name',
  titleKey = 'statement',
  formatName = (record: any) => record[nameKey],
  formatTitle = (record: any) => record[titleKey],
  dataIndex = 'key',
  showSearch = true,
  showSelectAll = true,
  titles,
  dataSource: dataSourceOriginal,
  ...rest
}: any) => {
  const [dataSource, setDataSource] = useState<any[]>(dataSourceOriginal ?? []);
  useEffect(() => {
    setDataSource(dataSourceOriginal);
  }, [dataSourceOriginal]);
  const targetKeys: any[] = useMemo(() => value ?? [], [value]);
  const onChangeRef = useRef<Function>(onChange);
  useEffect(() => {
    onChangeRef.current = onChange;
  });
  const changeOrder = useCallback((dragRecord, dropRecord, direction) => {
    const targetKeysDragIndex = targetKeys.findIndex(item => item === dragRecord[dataIndex]);
    const targetKeysDropIndex = direction ? (direction === 'right' ? targetKeys.length : dataSource.length) : targetKeys.findIndex(item => item === dropRecord[dataIndex]);
    let dragIndex = targetKeysDragIndex;
    let dropIndex = targetKeysDropIndex;
    let dragArr = targetKeys;
    let dropArr = direction === 'left' ? dataSource : targetKeys;
    if (targetKeysDragIndex === -1) {
      dragArr = dataSource;
      dragIndex = dragArr.findIndex(item => item[dataIndex] === dragRecord[dataIndex]);
    }
    if (!direction && targetKeysDropIndex === -1) {
      dropArr = dataSource;
      dropIndex = direction === 'right' ? dropArr.length : dropArr.findIndex(item => item[dataIndex] === dropRecord[dataIndex]);
    }
    if (dropArr === dragArr) {
      const newData = update(dragArr, { $splice: [[dragIndex, 1], [dropIndex, 0, dragArr[dragIndex]]] });
      // 源 -> 源
      if (dragArr === dataSource) {
        setDataSource(newData);
      } else {
        // 目 -> 目
        onChangeRef.current?.(newData);
      }
    } else {
      // 源 -> 目
      if (dragArr === dataSource) {
        onChangeRef.current?.(update(dropArr, { $splice: [[dropIndex, 0, dragArr[dragIndex][dataIndex]]] }));
      } else {
        // 目 -> 源
        onChangeRef.current?.(update(dragArr, { $splice: [[dragIndex, 1]] }));
        const newDragIndex = dropArr.findIndex(item => item[dataIndex] === dragRecord[dataIndex]);
        setDataSource(update(dropArr, { $splice: [[newDragIndex, 1], [dropIndex, 0, dropArr[newDragIndex]]] }));
      }
    }
  }, [dataIndex, dataSource, targetKeys]);
  return (
    <Transfer {...{
      className: styles.transfer,
      showSearch,
      showSelectAll,
      titles,
      dataSource,
      targetKeys,
      listStyle: {
        width: 300,
        height: 400,
      },
      filterOption: (inputValue, item) => String(formatName(item)).includes(inputValue),
      locale: {
        itemUnit: '项',
        itemsUnit: '项',
        selectInvert: '反选',
        selectAll: '全选',
        notFoundContent: '无数据',
      },
      onChange: (nextTargetKeys, direction, moveKeys) => {
        onChangeRef.current?.(nextTargetKeys);
      },
      render: (record: any) => (
        <DraggableElement {...{
          formatTitle,
          formatName,
          record,
          changeOrder,
        }} />
      ),
      ...rest,
    }}>
      {listProps => (
        <TransferList
          {...{
            listProps,
            changeOrder,
          }}
        />
      )}
    </Transfer>
  );
};

const TransferList = ({
  listProps,
  changeOrder,
}: any) => {
  const [, drop] = useDrop({
    accept: type,
    drop: (item: any, monitor) => {
      if (monitor.didDrop()) return;
      changeOrder(item.record, undefined, listProps.direction);
    },
  }, [listProps.direction, changeOrder]);
  return (
    <div ref={drop} style={{ width: '100%', height: '100%' }} >
      {
        !listProps.filteredItems.length
          ? <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
          : <TransferListBody<any> {...listProps} />
      }
    </div>
  );
};
