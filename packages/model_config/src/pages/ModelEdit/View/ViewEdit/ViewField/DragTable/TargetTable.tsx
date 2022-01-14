import { useCallback, useState } from 'react'
import { Table } from 'antd'
import { useDrop } from 'react-dnd'
import { useDispatch } from 'react-redux'
import update from 'immutability-helper'
import tableStyle from './index.less'
import classNames from 'classnames'
import { viewActions } from '@/redux/actions'
import { useAppSelector } from '@/redux'
import { TargetTablePropsType, SourceDataType, SelectedKeyType, viewFieldsType } from '../interfaceViewField'
import { associateFieldType } from '@/common/constant'
import { type as dragType } from './Draggable'

const TargetTable = ({
  components,
  tableAlign = 'target',
  targetData,
  rowSelection,
  setTableValue,
  viewFields = []
}: TargetTablePropsType) => {
  const [selectRow, setSelectRow] = useState('' as SelectedKeyType)
  const { baseInfo: { fields = [] } } = useAppSelector(state => state.modelEdit)
  const dispatch = useDispatch()
  const onRowOnClick = (val: SourceDataType) => {
    setTableValue(val.id)
  }
  const setRowClassName = (record: SourceDataType) => {
    return record.id === selectRow ? tableStyle.onRowClick : ''
  }
  const columns = [
    {
      title: '已选择列',
      dataIndex: 'displayName',
      ellipsis: true,
    }
  ]
  const moveRow = useCallback(
    (item, hoverIndex) => {
      const { index, align, record } = item
      if (align !== tableAlign) {
        const currentFieldType = fields[fields.findIndex((item: any) => item.id === record.id)].fieldType
        let updateData: viewFieldsType = {
          id: record.id,
          columnWidth: 200,
          summaryFormat: '',
          showName: '',
          summary: '',
          headerAlign: 'LEFT',
          contentAlign: 'LEFT'
        }
        if (associateFieldType.includes(currentFieldType)) {
          updateData = {
            id: record.id,
            columnWidth: 200,
            contentFormat: '',
            showName: '',
            content: '',
            headerAlign: 'LEFT',
            contentAlign: 'LEFT'
          }
        }
        dispatch(viewActions.setViewData({
          viewFields: update(viewFields, {
            $splice: [
              [hoverIndex, 0, updateData]
            ],
          })
        }))
      } else {
        const dragRow = viewFields[index]
        dispatch(viewActions.setViewData({
          viewFields: update(viewFields, {
            $splice: [
              [index, 1],
              [hoverIndex, 0, dragRow]
            ],
          })
        }))
      }
    }, [viewFields, dispatch, fields, tableAlign])

  // 双击更改数据
  const onDoubleClick = (index: any) => {
    dispatch(viewActions.setViewData({
      viewFields: update(viewFields, {
        $splice: [
          [index, 1]
        ],
      })
    }))
  }

  const [, drop] = useDrop({
    accept: dragType,
    // collect: monitor => {
    // },
    drop: (item, monitor) => {
      if (monitor.didDrop()) {
        return
      }
      moveRow(item, targetData.length)
    },
  })

  return (
    <div ref={drop} >
      <Table
        className={classNames(tableStyle.sourceTable)}
        rowClassName={setRowClassName}
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
          moveRow,
          onClick: e => {
            onRowOnClick(record)
            setSelectRow(record.id)
          },
          onDoubleClick: event => {
            onDoubleClick(index)
          },
        })}
        pagination={false}
      />
    </div>
  )
}

export default TargetTable
