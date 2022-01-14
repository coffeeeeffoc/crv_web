import { useCallback } from 'react'
import { Table } from 'antd'
import { useDrop } from 'react-dnd'
import { useDispatch } from 'react-redux'
import update from 'immutability-helper'
import tableStyle from './index.less'
import classNames from 'classnames'
import { viewActions } from '@/redux/actions'
import { SourceTablePropsType, SourceDataType, SortType } from './interfaceViewField'

const SourceTable = ({
  components,
  tableAlign = 'source',
  rowSelection,
  sourceData,
  defaultSort = []
}: SourceTablePropsType) => {
  const dispatch = useDispatch()
  const columns = [
    {
      title: '待选择列',
      dataIndex: 'displayName',
      ellipsis: true
    }
  ]
  // 双击更改数据
  const onDoubleClick = (record: SourceDataType) => {
    // 视图字段待选择列的双击
    dispatch(viewActions.setViewData({
      defaultSort: update(defaultSort, {
        $splice: [
          [defaultSort.length, 0, { [record.id]: SortType.ASC }]
        ]
      })
    }))
  }

  const moveRow = useCallback((item, hoverIndex) => {
    const { index, align } = item
    if (align !== tableAlign) {
      dispatch(viewActions.setViewData({
        defaultSort: update(defaultSort, {
          $splice: [
            [index, 1]
          ]
        })
      }))
    }
  }, [defaultSort, dispatch, tableAlign])

  const [, drop] = useDrop({
    accept: 'dragSortList',
    drop: (item, monitor) => {
      moveRow(item, sourceData.length)
    },
  })

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
          moveRow,
          onDoubleClick: event => {
            onDoubleClick(record)
          },
        })}
        pagination={false}
      />
    </div>
  )
}

export default SourceTable
