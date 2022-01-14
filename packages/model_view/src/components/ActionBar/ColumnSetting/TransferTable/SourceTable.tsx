import { FC, useCallback, useMemo } from 'react'
import { Table } from 'antd'
import { useDrop } from 'react-dnd'
import update from 'immutability-helper'
import classNames from 'classnames'
import { SourceTablePropsType } from './interface'
import tableStyle from './index.less'

const SourceTable: FC<SourceTablePropsType> = ({
  components,
  tableAlign = 'source',
  rowSelection,
  sourceData,
  targetData,
  setTargetData
}) => {
  const columns = useMemo(() => [
    {
      title: '全选',
      dataIndex: 'name',
      ellipsis: true,
    }
  ], [])

  const moveRow = useCallback((item) => {
    const { index, align } = item
    if (align !== tableAlign) {
      setTargetData(update(targetData, { $splice: [[index, 1]] }))
    }
  }, [setTargetData, targetData, tableAlign])

  const [, drop] = useDrop({
    accept: 'DraggableBodyRow',
    drop: (item, monitor) => {
      moveRow(item)
    },
  })
  console.log('sourceData', sourceData)

  return (
    <div ref={drop} >
      <Table
        className={classNames(tableStyle.sourceTable)}
        columns={columns}
        rowSelection={rowSelection}
        dataSource={sourceData}
        components={components}
        scroll={{ y: 'xxx' }}
        rowKey='id'
        onRow={(record, index) => ({
          align: tableAlign,
          index,
          record,
          moveRow
        }) as any}
        pagination={false}
      />
    </div>
  )
}

export default SourceTable
