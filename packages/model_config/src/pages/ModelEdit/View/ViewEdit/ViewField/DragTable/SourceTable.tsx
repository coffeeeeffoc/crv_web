import { useCallback } from 'react'
import { Table } from 'antd'
import { useDrop } from 'react-dnd'
import { useDispatch } from 'react-redux'
import update from 'immutability-helper'
import tableStyle from './index.less'
import classNames from 'classnames'
import { type as dragType } from './Draggable'
import { viewActions } from '@/redux/actions'
import { SourceTablePropsType, SourceDataType, viewFieldsType } from '../interfaceViewField'

const SourceTable = ({
  components,
  tableAlign = 'source',
  rowSelection,
  sourceData,
  viewFields = []
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
    const updateData: viewFieldsType = {
      id: record.id,
      columnWidth: 200,
      summaryFormat: '',
      showName: '',
      summary: '',
      headerAlign: 'LEFT',
      contentAlign: 'LEFT',
      content: '',
      contentFormat: ''
    }
    dispatch(viewActions.setViewData({
      viewFields: update(viewFields, {
        $splice: [
          [viewFields.length, 0, updateData]
        ]
      })
    }))
  }

  const moveRow = useCallback((item, hoverIndex) => {
    const { index, align } = item
    if (align !== tableAlign) {
      dispatch(viewActions.setViewData({
        viewFields: update(viewFields, {
          $splice: [
            [index, 1]
          ]
        })
      }))
    }
  }, [viewFields, dispatch, tableAlign])

  const [, drop] = useDrop({
    accept: dragType,
    // collect: monitor => {
    // },
    drop: (item, monitor) => {
      if (monitor.didDrop()) {
        return
      }
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
          }
        })}
        pagination={false}
      />
    </div>
  )
}

export default SourceTable
