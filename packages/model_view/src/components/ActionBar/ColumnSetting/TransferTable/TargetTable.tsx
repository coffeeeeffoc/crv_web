import { FC, useCallback, useMemo } from 'react'
import { Table } from 'antd'
import { useDrop } from 'react-dnd'
import update from 'immutability-helper'
import tableStyle from './index.less'
import classNames from 'classnames'
import { TargetTablePropsType } from './interface'

const TargetTable: FC<TargetTablePropsType> = ({
  components,
  tableAlign = 'target',
  targetData,
  rowSelection,
  setTargetData
}) => {
  const columns = useMemo(() => [
    {
      title: '全选',
      dataIndex: 'name',
      ellipsis: true,
    }
  ], [])
  const moveRow = useCallback((item, hoverIndex) => {
    const { index, align, record } = item
    if (align !== tableAlign) {
      setTargetData(update(targetData, { $splice: [[hoverIndex, 0, record]] }))
    } else {
      setTargetData(update(targetData, { $splice: [[index, 1], [hoverIndex, 0, record]] }))
    }
  }, [setTargetData, targetData, tableAlign])

  const [, drop] = useDrop({
    accept: 'DraggableBodyRow',
    collect: monitor => {
    },
    drop: (item, monitor) => {
      if (monitor.didDrop()) {
        return
      }
      moveRow(item, targetData.length)
    },
  })

  console.log('targetData', targetData)
  return (
    <div ref={drop} >
      <Table
        className={classNames(tableStyle.sourceTable)}
        columns={columns}
        rowSelection={rowSelection}
        dataSource={targetData}
        components={components}
        scroll={{ y: 'xxx' }}
        rowKey='id'
        onRow={(record, index) => ({
          align: tableAlign,
          index,
          record,
          moveRow
          // onClick: e => {
          //   onRowOnClick(record)
          //   setSelectRow(record.id)
          // },
          // onDoubleClick: event => {
          //   onDoubleClick(index)
          // },
        }) as any}
        pagination={false}
      />
    </div>
  )
}

export default TargetTable
