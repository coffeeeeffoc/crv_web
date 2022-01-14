import { useCallback, useEffect, useMemo, useState } from 'react'
import { Table } from 'antd'
import { useDrop } from 'react-dnd'
import { useDispatch } from 'react-redux'
import update from 'immutability-helper'
import { viewActions } from '@/redux/actions'
import styles from '../index.less'
import TargetTitle from './TargetTitle'
import { TargetTablePropType, OperationIdType, OperationIdsType } from '../../interface'
import { useAppSelector } from '@/redux'
import { CaretRightOutlined } from '@ant-design/icons'
import isMajority from '../universal/isMajority'

export default function TargetTable ({
  dataSource: data = [],
  components,
  viewOperations,
  type,
  selectedRowKeys,
  setSelectedKeys,
  selectedSourceRowKeys,
  operationSource,
  setTableValue,
  tableValue
}: TargetTablePropType) {
  const { viewOperationSelectKey } = useAppSelector(state => state.view)
  const dispatch = useDispatch()
  const [rowIndex, setRowIndex] = useState(0)

  useEffect(() => {
    if (Object.keys(viewOperationSelectKey).length === 0) {
      setSelectedKeys([])
      setRowIndex(0)
    }
  }, [viewOperationSelectKey, setSelectedKeys])

  const dataSource = useMemo(() => data.map(item => {
    const dataRender = { ...item }
    if (typeof (item.displayName) === 'string' && item.id === tableValue?.[0]?.id) {
      dataRender.displayName = <span><CaretRightOutlined />{dataRender.displayName}</span>
    }
    return { ...dataRender }
  }), [data, tableValue])

  useEffect(() => {
    // selectedRowKeys变化随即更改redux中的viewOperationSelectKey
    dispatch(viewActions.setOperationSelect({ viewOperationSelectKey: selectedRowKeys, type: 'top' }))
  }, [selectedRowKeys, dispatch])

  const columns = [
    {
      title: <TargetTitle type={type} rowIndex={rowIndex} viewOperations={viewOperations} />,
      dataIndex: 'displayName'
    }
  ]

  const onRowOnClick = (record: any) => {
    if (typeof (record.displayName) === 'string') setTableValue([{ attribute: '显示操作名', value: record.name, id: record.id }])
  }

  const updateViewOperations = JSON.parse(JSON.stringify(viewOperations))
  // control the row's
  const setRowClassName = useCallback((record) => {
    if (selectedRowKeys.findIndex(item => item === record?.id) !== -1) return styles.onRowClick
  }, [selectedRowKeys])
  // 双击Row
  const targetTableOnDoubleClick = (index: number) => {
    if (updateViewOperations[type][index].type === 'SINGLE') {
      updateViewOperations[type].splice(index, 1)
      dispatch(viewActions.setViewData({ viewOperations: updateViewOperations }))
    }
  }
  const moveRow = useCallback((item, hoverIndex: number) => {
    const { index, align, record } = item
    // 开始拖拽的当前行的id，不需用到则赋值top
    const hoverId = () => {
      if (align === 'top') {
        if (viewOperations[type][index].type === 'SINGLE') return viewOperations[type][index].operationIds[0].id
        else return 'top'
      }
      if (align === 'source') return 'top'
      if (align !== 'top' && align !== 'source' && align !== undefined) {
        return viewOperations[type][align].operationIds[index].id
      }
    }
    // 判断id是否存在于viewOperationSelectKey
    const judgeDrag = Object.keys(viewOperationSelectKey).map(item => {
      if (viewOperationSelectKey[item].findIndex(list => list === hoverId()) !== -1) return true
      return false
    })
    if (align === 'source') {
      if (selectedSourceRowKeys.length === 0 || selectedSourceRowKeys.findIndex(item => item === record.id) === -1) {
        const updateOperation = {
          name: '',
          type: 'SINGLE',
          operationIds: [{
            id: record.id,
            name: record.displayName
          }]
        }
        updateViewOperations[type] = update(updateViewOperations[type], {
          $splice: [
            [hoverIndex, 0, updateOperation]
          ]
        })
      } else {
        selectedSourceRowKeys.forEach((item, operationIndex: number) => {
          const index = operationSource.findIndex(operation => operation.id === item)
          const updateOperation = {
            name: '',
            type: 'SINGLE',
            operationIds: [{
              id: operationSource[index].id,
              name: operationSource[index].displayName
            }]
          }
          updateViewOperations[type].splice(hoverIndex + operationIndex, 0, updateOperation)
        })
      }
      dispatch(viewActions.setViewData({ viewOperations: updateViewOperations }))
      return
    }
    // selectKey有值且id存在于当中
    if (isMajority(viewOperationSelectKey) && judgeDrag.includes(true)) {
      Object.keys(viewOperationSelectKey).forEach(list => {
        if (list === 'top') {
          viewOperationSelectKey.top.forEach((item, mapIndex: number) => {
            const typeIndex = updateViewOperations[type].findIndex((operation: OperationIdType) => operation.type === 'SINGLE' && operation.operationIds[0]?.id === item)
            const updateOperation = {
              name: '',
              type: 'SINGLE',
              operationIds: [updateViewOperations[type][typeIndex].operationIds[0]]
            }
            updateViewOperations[type].splice(typeIndex, 1)
            updateViewOperations[type].splice(hoverIndex + mapIndex, 0, updateOperation)
          })
        } else {
          const typeIndex = updateViewOperations[type].findIndex((operation: OperationIdType) => JSON.stringify(operation) === JSON.stringify(viewOperations[type][list]))
          viewOperationSelectKey[list].forEach((item, mapIndex: number) => {
            const operationIndex = updateViewOperations[type][typeIndex].operationIds.findIndex((operation: OperationIdsType) => operation.id === item)
            const updateOperation = {
              name: '',
              type: 'SINGLE',
              operationIds: [updateViewOperations[type][typeIndex].operationIds[operationIndex]]
            }
            updateViewOperations[type][typeIndex].operationIds?.splice(operationIndex, 1)
            updateViewOperations[type].splice(hoverIndex + mapIndex, 0, updateOperation)
          })
        }
      })
      dispatch(viewActions.setViewData({ viewOperations: updateViewOperations }))
      return
    }
    if (align === 'top' && hoverIndex !== undefined) {
      const updateOperation = updateViewOperations[type][index]
      updateViewOperations[type] = update(updateViewOperations[type], {
        $splice: [
          [index, 1],
          [hoverIndex, 0, updateOperation]
        ]
      })
      dispatch(viewActions.setViewData({ viewOperations: updateViewOperations }))
    }
    if (align !== 'source' && align !== 'top' && align !== undefined) {
      const updateOperation = { name: '', type: 'SINGLE', operationIds: [updateViewOperations[type][align].operationIds[index]] }
      updateViewOperations[type][align].operationIds.splice(index, 1)
      updateViewOperations[type].splice(hoverIndex, 0, updateOperation)
      dispatch(viewActions.setViewData({ viewOperations: updateViewOperations }))
    }
  }, [viewOperations, dispatch, type, operationSource, selectedSourceRowKeys, viewOperationSelectKey, updateViewOperations])

  const [, drop] = useDrop({
    accept: 'DraggableListRow',
    // collect: monitor => {
    // },
    drop: (item, monitor) => {
      if (monitor.didDrop()) {
        return
      }
      moveRow(item, dataSource.length)
    },
  })

  return (
    <div ref={drop}>
      <Table
        className={styles.table}
        rowClassName={setRowClassName}
        dataSource={dataSource}
        columns={columns}
        components={components}
        rowKey='key'
        pagination={false}
        scroll={{ y: 'xxx' }}
        onRow={(record, index: any) => ({
          align: 'top',
          index,
          record,
          dataType: type,
          moveRow,
          onClick: e => {
            onRowOnClick(record)
            // setSelectRow(record.id)
            const rowIndex = selectedRowKeys.findIndex(item => item === record.id)
            if (rowIndex === -1) {
              if (viewOperations[type][index].type === 'SINGLE') {
                setSelectedKeys(update(selectedRowKeys, {
                  $splice: [
                    [0, 0, record.id]
                  ]
                }))
              }
            } else {
              setSelectedKeys(update(selectedRowKeys, {
                $splice: [
                  [rowIndex, 1]
                ]
              }))
            }
            setRowIndex(index)
          },
          onDoubleClick: event => {
            targetTableOnDoubleClick(index)
          },
        })}
      />
    </div>
  )
}
