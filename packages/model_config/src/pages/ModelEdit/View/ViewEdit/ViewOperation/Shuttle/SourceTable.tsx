import { useCallback } from 'react'
import { Table } from 'antd'
import { useDispatch } from 'react-redux'
import { useDrop } from 'react-dnd'
import update from 'immutability-helper'
import tableStyle from './index.less'
import { viewActions } from '@/redux/actions'
import { useAppSelector } from '@/redux'
import { SourceTablePropsType, sourceOperationType, OperationIdType, OperationIdsType } from '../interface'
import isMajority from './universal/isMajority'

const SourceTable = ({
  components,
  operationSource,
  viewOperations,
  setSelectedSourceKeys,
  selectedSourceRowKeys,
  tableAlign = 'source',
  type
}: SourceTablePropsType) => {
  const dispatch = useDispatch()
  const { viewOperationSelectKey } = useAppSelector(state => state.view)
  const updateViewOperations = JSON.parse(JSON.stringify(viewOperations))

  // 双击行，将其移到右侧的最后一行
  const onDoubleClick = (record: sourceOperationType) => {
    const updateOperation = { name: '', type: 'SINGLE', operationIds: [{ id: record.id, name: record.displayName }] }
    updateViewOperations[type].splice(updateViewOperations[type].length, 0, updateOperation)
    dispatch(viewActions.setViewData({ viewOperations: updateViewOperations }))
  }

  const columns = [
    {
      title: '待选择操作',
      dataIndex: 'displayName',
    }
  ]

  // 控制行的样式是否为选中状态
  const setRowClassName = (record: sourceOperationType) => {
    if (selectedSourceRowKeys.findIndex(item => item === record.id) !== -1) return tableStyle.onRowClick
  }

  // 拖拽触发数据的移动
  const moveRow = useCallback(item => {
    const { index, align } = item
    const hoverId = () => {
      if (align === 'top') {
        if (viewOperations[type][index].type === 'SINGLE') return viewOperations[type][index].operationIds[0].id
        else return 'top'
      }
      if (align === 'source') return 'source'
      if (align !== 'top' && align !== 'source' && align !== undefined) {
        return viewOperations[type][align].operationIds[index].id
      }
    }
    // 判断id是否存在于viewOperationSelectKey，存在返回true，不存在返回false
    const judgeDrag = Object.keys(viewOperationSelectKey).map(item => {
      if (viewOperationSelectKey[item].findIndex(list => list === hoverId()) !== -1) return true
      return false
    })
    if (isMajority(viewOperationSelectKey) && judgeDrag.includes(true)) {
      Object.keys(viewOperationSelectKey).forEach(list => {
        if (list === 'top') {
          viewOperationSelectKey.top.forEach((item, mapIndex) => {
            const typeIndex = updateViewOperations[type].findIndex((operation: OperationIdType) => operation.type === 'SINGLE' && operation.operationIds[0]?.id === item)
            updateViewOperations[type].splice(typeIndex, 1)
          })
        } else {
          const typeIndex = updateViewOperations[type].findIndex((operation: OperationIdType) => JSON.stringify(operation) === JSON.stringify(viewOperations[type][list]))
          viewOperationSelectKey[list].forEach((item, mapIndex) => {
            const operationIndex = updateViewOperations[type][typeIndex].operationIds.findIndex((operation: OperationIdsType) => operation.id === item)
            updateViewOperations[type][typeIndex].operationIds?.splice(operationIndex, 1)
          })
        }
      })
      dispatch(viewActions.setViewData({ viewOperations: updateViewOperations }))
      return
    }
    // 当targetTable的行移入时
    if (align === 'top') {
      // 只对type为SINGLE时生效，对其他不生效
      if (updateViewOperations[type][index].type === 'SINGLE') {
        updateViewOperations[type].splice(index, 1)
        dispatch(viewActions.setViewData({ viewOperations: updateViewOperations }))
      }
    }
    // 当TargetList的行移入时
    if (align !== tableAlign && align !== 'top' && align !== undefined) {
      updateViewOperations[type][align].operationIds.splice(index, 1)
      dispatch(viewActions.setViewData({ viewOperations: updateViewOperations }))
    }
  }, [type, dispatch, updateViewOperations, tableAlign, viewOperationSelectKey, viewOperations])

  const [, drop] = useDrop({
    accept: 'DraggableListRow',
    collect: monitor => {
    },
    drop: (item, monitor) => {
      if (monitor.didDrop()) {
        return
      }
      moveRow(item)
    },
  })

  return (
    <div ref={drop}>
      <Table
        className={tableStyle.sourceTable}
        columns={columns}
        rowClassName={setRowClassName}
        components={components}
        dataSource={operationSource}
        scroll={{ y: 'xxx' }}
        rowKey='id'
        size='small'
        pagination={false}
        onRow={(record, index) => ({
          align: tableAlign,
          index,
          record,
          moveRow,
          onClick: e => {
            // 判断是否存在当前行的id
            const rowIndex = selectedSourceRowKeys.findIndex(item => item === record.id)
            // 判断行是否为选中状态，为选中状态是单击取消，未选中时单击选中，即更改样式以及setSelectedSourceKeys
            if (rowIndex === -1) {
              setSelectedSourceKeys(update(selectedSourceRowKeys, {
                $splice: [
                  [selectedSourceRowKeys.length, 0, record.id]
                ]
              }))
            } else {
              setSelectedSourceKeys(update(selectedSourceRowKeys, {
                $splice: [
                  [rowIndex, 1]
                ]
              }))
            }
          },
          onDoubleClick: e => {
            // 双击
            onDoubleClick(record)
          }
        })}
      />
    </div>
  )
}

export default SourceTable
