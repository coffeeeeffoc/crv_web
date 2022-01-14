import { useState, useMemo, useEffect, useCallback } from 'react'
import setEditControl from './setEditControl'
import { useDispatch } from 'react-redux'
import { viewActions } from '@/redux/actions'
import { OperationIdType, OperationIdsType, EditTableType } from '../interface'
import EditTable from '@@/TableUnit/EditTable'

export const EditableTable = ({ tableValue, type, viewOperations }: EditTableType) => {
  const editControl = useMemo(() => setEditControl(), [])
  const dispatch = useDispatch()

  const [dataSource, setDataSource] = useState(tableValue)

  useEffect(() => {
    setDataSource(tableValue)
  }, [tableValue])

  const column = [
    {
      dataIndex: 'attribute',
      title: '当前选中列属性',
      width: '50%',
      ellipsis: true,

    },
    {
      dataIndex: 'value',
      title: '值',
      editable: true,
      ellipsis: true,
    }
  ]

  const handleSave = useCallback((row: any) => {
    // 保存
    const updateViewOperations = JSON.parse(JSON.stringify(viewOperations))
    const newData = [...dataSource]
    const index = newData.findIndex((item) => row.key === item.key)
    const item = newData[index]
    newData.splice(index, 1, { ...item, ...row })
    setDataSource(newData)
    const typeIndex = viewOperations[type].findIndex(
      (item: OperationIdType) => item.operationIds.findIndex(
        operation => operation.id === row.id
      ) !== -1
    )
    const operationIdIndex = viewOperations[type][typeIndex].operationIds.findIndex(
      (operation: OperationIdsType) => operation.id === row.id
    )
    updateViewOperations[type][typeIndex].operationIds[operationIdIndex].name = row.value
    dispatch(viewActions.setViewData({ viewOperations: updateViewOperations }))
  }, [viewOperations, dispatch, dataSource, type])

  return (
    <div>
      <EditTable
        bordered
        editControl={editControl}
        rowKey='name'
        dataSource={dataSource}
        columns={column}
        pagination={false}
        handleSave={handleSave}
      />
    </div>
  )
}

export default EditableTable
