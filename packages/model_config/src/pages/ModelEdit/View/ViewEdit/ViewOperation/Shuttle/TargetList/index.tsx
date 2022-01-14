import { useCallback, useEffect, useState, useMemo } from 'react'
import { Table } from 'antd'
import { useDrop } from 'react-dnd'
import { useDispatch } from 'react-redux'
import update from 'immutability-helper'
import tableStyle from '../index.less'
import { viewActions } from '@/redux/actions'
import ListTitle from './ListTitle'
import { TargetListPropsType, OperationIdsType, OperationIdType } from '../../interface'
import { useAppSelector } from '@/redux'
import { CaretRightOutlined } from '@ant-design/icons'
import isMajority from '../universal/isMajority'

const TargetList = ({
  components,
  operationIds = [],
  name,
  index,
  tableAlign = index,
  viewOperations,
  type,
  selectedSourceRowKeys,
  setTableValue,
  tableValue,
  operationSource,
}: TargetListPropsType) => {
  const { viewOperationSelectKey } = useAppSelector(state => state.view)
  const [isEditTitle, setIsEditTitle] = useState(false)
  const [isFold, setIsFold] = useState(false)
  const [selectedListRowKeys, setSelectedListKeys] = useState<Array<string | number>>([])
  const dispatch = useDispatch()

  const dataSource = useMemo(() => operationIds.map(item => {
    const dataRender = { ...item }
    if (item.id === tableValue?.[0]?.id) {
      dataRender.displayName = <span><CaretRightOutlined />{dataRender.displayName}</span>
    }
    return { ...dataRender }
  }), [operationIds, tableValue])

  // viewOperationSelectKey为空时，重置selectedListRowKeys
  useEffect(() => {
    if (Object.keys(viewOperationSelectKey).length === 0) {
      setSelectedListKeys([])
    }
  }, [viewOperationSelectKey])

  // selectedRowKeys变化随即更改redux中的viewOperationSelectKey
  useEffect(() => {
    dispatch(viewActions.setOperationSelect({ viewOperationSelectKey: selectedListRowKeys, type: index }))
  }, [selectedListRowKeys, dispatch, index])

  // 深拷贝
  const updateViewOperations = JSON.parse(JSON.stringify(viewOperations))
  const setRowClassName = (record: OperationIdsType) => {
    if (selectedListRowKeys.findIndex(item => item === record?.id) !== -1) return tableStyle.onRowClick
  }

  const columns = [
    {
      title: <ListTitle
        viewOperations={viewOperations}
        name={name}
        index={index}
        type={type}
        isEditTitle={isEditTitle}
        setIsEditTitle={setIsEditTitle}
        setIsFold={setIsFold}
        isFold={isFold}
      />,
      dataIndex: 'displayName',
    }
  ]

  // 点击行时触发的事件
  const onRowOnClick = useCallback((record: OperationIdsType) => {
    setTableValue([{ attribute: '显示操作名', value: record.name, id: record.id }])
  }, [setTableValue])

  // 拖拽的数据流变化
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
    // 判断id是否存在于viewOperationSelectKey，存在返回true，不存在返回false
    const judgeDrag = Object.keys(viewOperationSelectKey).map(item => {
      if (viewOperationSelectKey[item].findIndex(list => list === hoverId()) !== -1) return true
      return false
    })
    // 由source数据拖过来
    if (align === 'source') {
      // 无高亮行或当前拖拽的行不在所选择的行里，则只处理当前行
      if (selectedSourceRowKeys.findIndex(item => item === record.id) === -1) {
        const updateOperation = {
          id: record.id,
          // displayName: record.displayName,
          name: record.displayName
        }
        updateViewOperations[type][tableAlign].operationIds.splice(hoverIndex, 0, updateOperation)
      } else {
        // 处理多行
        selectedSourceRowKeys.forEach((item, operationIndex: number) => {
          const index = operationSource.findIndex(operation => operation.id === item)
          const updateOperation = {
            id: operationSource[index].id,
            // displayName: operationSource[index].displayName,
            name: operationSource[index].displayName
          }
          updateViewOperations[type][tableAlign].operationIds.splice(hoverIndex + operationIndex, 0, updateOperation)
        })
      }
      dispatch(viewActions.setViewData({ viewOperations: updateViewOperations }))
      return
    }
    // viewOperationSelectKey有值且初始拖拽的行的id在viewOperationSelectKey中，则多行数据移动
    if (isMajority(viewOperationSelectKey) && judgeDrag.includes(true)) {
      Object.keys(viewOperationSelectKey).forEach(list => {
        if (list === 'top') {
          viewOperationSelectKey.top.forEach((item, mapIndex) => {
            const typeIndex = updateViewOperations[type].findIndex((operation: OperationIdType) => operation.type === 'SINGLE' && operation.operationIds[0]?.id === item)
            // 更新的数据
            const updateOperation = updateViewOperations[type][typeIndex].operationIds[0]
            updateViewOperations[type][tableAlign].operationIds.splice(hoverIndex + mapIndex, 0, updateOperation)
            updateViewOperations[type].splice(typeIndex, 1)
          })
        } else {
          const typeIndex = updateViewOperations[type].findIndex((operation: OperationIdType) => JSON.stringify(operation) === JSON.stringify(viewOperations[type][list]))
          viewOperationSelectKey[list].forEach((item, mapIndex) => {
            const operationIndex = updateViewOperations[type][typeIndex].operationIds.findIndex((operation: OperationIdsType) => operation.id === item)
            const updateOperation = updateViewOperations[type][typeIndex].operationIds[operationIndex]
            // const updateOperation = {
            //   id: updateViewOperations[type][typeIndex].operationIds[operationIndex].id, displayName:  updateViewOperations[type][typeIndex].operationIds[operationIndex].displayName
            // }
            updateViewOperations[type][typeIndex].operationIds?.splice(operationIndex, 1)
            updateViewOperations[type][tableAlign].operationIds.splice(hoverIndex + mapIndex, 0, updateOperation)
          })
        }
      })
      dispatch(viewActions.setViewData({ viewOperations: updateViewOperations }))
      return
    }
    if (align === 'top') {
      if (viewOperations[type][index].type === 'COMBO') {
        const updateOperation = updateViewOperations[type][index]
        updateViewOperations[type].splice(index, 1)
        updateViewOperations[type].splice(tableAlign, 0, updateOperation)
      } else {
        const updateOperation = { id: record.id, name: record.name }
        console.log('operation', record)
        updateViewOperations[type][tableAlign].operationIds.splice(hoverIndex, 0, updateOperation)
        updateViewOperations[type].splice(index, 1)
        dispatch(viewActions.setViewData({ viewOperations: updateViewOperations }))
        return
      }
    }
    if (align === tableAlign) {
      const updateOperation = updateViewOperations[type][align].operationIds[index]
      updateViewOperations[type][align].operationIds.splice(index, 1)
      updateViewOperations[type][align].operationIds.splice(hoverIndex, 0, updateOperation)
      dispatch(viewActions.setViewData({ viewOperations: updateViewOperations }))
      return
    }
    if (align !== tableAlign && align !== 'top' && align !== undefined) {
      const updateOperation = updateViewOperations[type][align].operationIds[index]
      updateViewOperations[type][tableAlign].operationIds.splice(hoverIndex, 0, updateOperation)
      updateViewOperations[type][align].operationIds.splice(index, 1)
      dispatch(viewActions.setViewData({ viewOperations: updateViewOperations }))
    }
  }, [dispatch, tableAlign, type, viewOperations, operationSource, selectedSourceRowKeys, viewOperationSelectKey, updateViewOperations])

  // 表格样式的变换控制
  const updateTableStyle = useCallback(() => {
    if (isFold) return tableStyle.targetListUp
    return tableStyle.targetList
  }, [isFold])

  // 双击
  const targetListOnDoubleClick = (index: number) => {
    updateViewOperations[type][tableAlign].operationIds.splice(index, 1)
    dispatch(viewActions.setViewData({ viewOperations: updateViewOperations }))
  }

  const [, drop] = useDrop({
    accept: 'DraggableListRow',
    collect: monitor => {
    },
    canDrop: (item, monitor) => {
      return operationIds.length === 0
    },
    drop: (item, monitor) => {
      moveRow(item, index)
    },
  })

  const scroll: any = !isFold && { y: '100px' }

  return (
    <div ref={drop}>
      <Table
        className={updateTableStyle()}
        rowClassName={setRowClassName}
        columns={columns}
        dataSource={dataSource}
        components={components}
        rowKey='id'
        onHeaderRow={(record) => ({
          onDoubleClick: e => {
            setIsEditTitle(true)
          }
        })}
        scroll={scroll}
        onRow={(record, index: any) => ({
          align: tableAlign,
          index,
          record,
          dataType: type,
          moveRow,
          onClick: e => {
            onRowOnClick(record)
            const rowIndex = selectedListRowKeys.findIndex(item => item === record.id)
            if (rowIndex > -1) {
              setSelectedListKeys(update(selectedListRowKeys, {
                $splice: [
                  [rowIndex, 1]
                ]
              }))
            } else {
              setSelectedListKeys(update(selectedListRowKeys, {
                $splice: [
                  [0, 0, record.id]
                ]
              }))
            }
          },
          onDoubleClick: event => {
            targetListOnDoubleClick(index)
          },
        })}
        pagination={false}
      />
    </div>
  )
}

export default TargetList
