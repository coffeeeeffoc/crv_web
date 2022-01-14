import { useState, useCallback, useEffect, useMemo } from 'react'
import { Row, Col, Button } from 'antd'
import { useDispatch } from 'react-redux'
import { RightOutlined, LeftOutlined, DoubleLeftOutlined, DoubleRightOutlined } from '@ant-design/icons'
import DraggableListRow from './DraggableListRow'
import SourceTable from './SourceTable'
import { viewActions } from '@/redux/actions'
import styles from './index.less'
import TargetList from './TargetList'
import TargetTable from './TargetTable'
import { EditableTable } from '../EditTable'
import { useAppSelector } from '@redux/index'
import { deepCopy } from '@utils/utilFunc/utilTransform'
import { PropsShuttle, viewOperationIdsType, OperationIdType, viewOperationType, OperationType, sourceOperationType, OperationIdsType } from '../interface'

const DragSortingTable = (props: PropsShuttle) => {
  // type为选的表头还是数据行
  const { type } = props
  // 右侧表格里面的数据
  const [tableValue, setTableValue] = useState([])
  const { baseInfo: { operations = [] } } = useAppSelector(state => state.modelEdit)
  const { viewData, viewOperationSelectKey = {} } = useAppSelector(state => state.view)
  // 里面的数据
  const viewOperations: viewOperationType = useMemo(() => viewData.viewOperations ?? { headerShowCount: 3, dataShowCount: 3, tableHeader: [], dataRow: [] }, [
    viewData.viewOperations
  ])
  const dispatch = useDispatch()
  // 格式化後的視圖操作數據
  const [formatViewOp, setFormatViewOp] = useState<any>({})

  useEffect(() => {
    const updateViewOperations = deepCopy(viewOperations, {})
    viewOperations[type].forEach((item: OperationIdType, typeIndex: number) => {
      item.operationIds?.forEach((operation, index) => {
        // 查询在operations中对应的索引，再次初始化数据
        const operationIndex = operations.findIndex((item: OperationType) => item.id === operation.id)
        // 增加displayName以便于展示
        updateViewOperations[type][typeIndex].operationIds[index] = {
          id: operation.id,
          name: operation.name,
          displayName: operations[operationIndex]?.name,
        }
      })
    })
    setFormatViewOp(updateViewOperations)
  }, [viewOperations, type, operations])

  // 获取viewOperation的id总和
  const getViewOperationIds = useCallback((): viewOperationIdsType[] => {
    const viewOperationIds: viewOperationIdsType[] = []
    viewOperations[type].forEach((item: OperationIdType) => {
      item.operationIds?.forEach(operation => {
        viewOperationIds.push(
          {
            id: operation.id,
          }
        )
      })
    })
    return viewOperationIds
  }, [viewOperations, type])

  const viewOperationMap: viewOperationIdsType[] = useMemo(() => getViewOperationIds(), [getViewOperationIds])

  // operations的
  const sourceOperations: sourceOperationType[] = useMemo(() => operations?.map((item: OperationType) => {
    return {
      id: item.id,
      displayName: item.name
    }
  }), [operations])

  // 过滤将operation中的viewOperations处理掉
  const filterData = useCallback((sourceOperations) => {
    return sourceOperations.filter((item: sourceOperationType) => {
      return viewOperationMap.findIndex(({ id }) => id === item.id) === -1
    })
  }, [viewOperationMap])

  // 源数据
  const [operationSource, setOperationSource] = useState((): sourceOperationType[] => filterData(sourceOperations))

  useEffect(() => {
    setOperationSource(filterData(sourceOperations))
  }, [sourceOperations, filterData])

  const [selectedRowKeys, setSelectedKeys] = useState([])
  const [selectedSourceRowKeys, setSelectedSourceKeys] = useState([])

  useEffect(() => {
    // 所选已选择操作的所有id几何，为一个对象，存在redux中
    // 当viewOperations变化的时候将viewOperation恢复至初始的空数组
    dispatch(viewActions.setOperationSelect(null))
    // 将source的key恢复至空数组
    setSelectedSourceKeys([])
  }, [viewOperationMap, type, dispatch])

  const DragListComponents = useMemo(() => {
    return {
      body: {
        row: DraggableListRow,
      }
    }
  }, [])

  // 视图操作已选择操作框的数据
  const operationTarget = useMemo(() => (formatViewOp[type]?.map((item: OperationIdType, index: number) => {
    // type为SINGLE返回对象
    if (item.type === 'SINGLE') {
      return {
        id: item.operationIds[0].id,
        index: index,
        key: index,
        displayName: item.operationIds[0].displayName,
        name: item.operationIds[0].name
      }
      // type为COMBO返回组件
    } else {
      return {
        displayName: <TargetList
          setTableValue={setTableValue}
          tableValue={tableValue}
          operationSource={operationSource}
          name={item.name}
          selectedSourceRowKeys={selectedSourceRowKeys}
          viewOperations={viewOperations}
          components={DragListComponents}
          index={index}
          type={type}
          operationIds={item.operationIds?.map(operationId => {
            return {
              id: operationId.id,
              displayName: operationId.displayName,
              name: operationId.name
            }
          })}
        />,
        index: index,
        key: index
      }
    }
  })), [formatViewOp, type, operationSource, tableValue, DragListComponents, selectedSourceRowKeys, viewOperations])

  // 选择source数据，> 按钮处于解禁状态，点击按钮触发数据更改，将source移动到target
  const toTargetData = () => {
    const updateViewOperations = JSON.parse(JSON.stringify(viewOperations))
    selectedSourceRowKeys.forEach(item => {
      const index = operationSource.findIndex((list: sourceOperationType) => list.id === item)
      const updateData: OperationIdType = {
        name: '',
        type: 'SINGLE',
        operationIds: [{
          id: operationSource[index].id,
          name: operationSource[index].displayName
        }]
      }
      updateViewOperations[type].splice(updateViewOperations[type].length, 0, updateData)
    })
    dispatch(viewActions.setViewData({ viewOperations: updateViewOperations }))
  }

  // 选择target复选框，< target按钮可用，将数据移到左边
  const toSourceData = () => {
    // 深拷贝
    const updateViewOperations = JSON.parse(JSON.stringify(viewOperations))
    // 对viewOperationSelectKey进行遍历，以确保能将所有的值传递
    Object.keys(viewOperationSelectKey).forEach(list => {
      if (list === 'top') {
        // top即代表单行数据
        viewOperationSelectKey.top.forEach((item, mapIndex) => {
          const typeIndex = updateViewOperations[type].findIndex((operation: OperationIdType) => operation.operationIds[0]?.id === item)
          if (typeIndex !== -1) {
            updateViewOperations[type].splice(typeIndex, 1)
          }
        })
      } else {
        // 其他代表的是组数据
        const typeIndex = updateViewOperations[type].findIndex((operation: OperationIdType) => JSON.stringify(operation) === JSON.stringify(viewOperations[type][list]))
        viewOperationSelectKey[list].forEach((item, mapIndex) => {
          const operationIndex = updateViewOperations[type][typeIndex].operationIds.findIndex((operation: OperationIdsType) => operation.id === item)
          updateViewOperations[type][typeIndex].operationIds?.splice(operationIndex, 1)
        })
      }
    })
    dispatch(viewActions.setViewData({ viewOperations: updateViewOperations }))
  }

  // >>按钮事件
  const toAllTargetData = useCallback(() => {
    const updateViewOperations = JSON.parse(JSON.stringify(viewOperations))
    operationSource.forEach(item => {
      const updateData = {
        name: '',
        type: 'SINGLE',
        operationIds: [{ id: item.id, name: item.displayName }]
      }
      updateViewOperations[type].splice(updateViewOperations[type].length, 0, updateData)
    })
    dispatch(viewActions.setViewData({ viewOperations: updateViewOperations }))
  }, [type, operationSource, viewOperations, dispatch])

  // <<按钮事件
  const toAllSourceData = useCallback(() => {
    const updateViewOperations = JSON.parse(JSON.stringify(viewOperations))
    viewOperations[type].forEach((list: OperationIdType, index: number) => {
      const typeIndex = updateViewOperations[type].findIndex((operation: OperationIdsType) =>
        JSON.stringify(operation) === JSON.stringify(list)
      )
      if (list.type === 'SINGLE') {
        updateViewOperations[type].splice(typeIndex, 1)
      } else {
        viewOperations[type][index].operationIds.forEach((list: OperationIdsType) => {
          const operationIndex = updateViewOperations[type][typeIndex].operationIds.findIndex((operation: OperationIdsType) => operation?.id === list?.id)
          updateViewOperations[type][typeIndex].operationIds.splice(operationIndex, 1)
        })
      }
    })
    dispatch(viewActions.setViewData({ viewOperations: updateViewOperations }))
  }, [type, viewOperations, dispatch])

  // 判断viewOperationSelectKey对象中是否有值
  const toSourceButtonDisable = useCallback(() => {
    const buttonDisable = Object.keys(viewOperationSelectKey).map(item => {
      if (viewOperationSelectKey[item].length > 0) return true
      return false
    })
    return !buttonDisable.includes(true)
  }, [viewOperationSelectKey])

  return (
    <div>
      <Row>
        <Col span={7} style={{ border: '1px solid rgba(0, 0, 0, 0.06)', padding: 'auto', display: 'inline-block', boxSizing: 'content-box' }}>
          <SourceTable
            type={type}
            selectedSourceRowKeys={selectedSourceRowKeys}
            setSelectedSourceKeys={setSelectedSourceKeys}
            operationSource={operationSource}
            components={DragListComponents}
            viewOperations={viewOperations}
          // formatViewOp={formatViewOp}
          />
        </Col>
        <Col span={2}>
          <ul className={styles.buttonStyle}>
            <li>
              <Button type='primary' disabled={selectedSourceRowKeys.length <= 0} onClick={toTargetData} ><RightOutlined /></Button>
            </li>
            <li>
              <Button type='primary' disabled={toSourceButtonDisable()} onClick={toSourceData} ><LeftOutlined /></Button>
            </li>
            <li>
              <Button type='primary' disabled={operationSource.length <= 0} onClick={toAllTargetData} ><DoubleRightOutlined /></Button>
            </li>
            <li>
              <Button type='primary' disabled={operationTarget?.length <= 0} onClick={toAllSourceData} ><DoubleLeftOutlined /></Button>
            </li>
          </ul>
        </Col>
        <Col span={7} style={{ border: '1px solid rgba(0, 0, 0, 0.06)', boxSizing: 'content-box' }}>
          <TargetTable
            dataSource={operationTarget}
            selectedRowKeys={selectedRowKeys}
            setSelectedKeys={setSelectedKeys}
            selectedSourceRowKeys={selectedSourceRowKeys}
            operationSource={operationSource}
            components={DragListComponents}
            viewOperations={viewOperations}
            type={type}
            setTableValue={setTableValue}
            tableValue={tableValue}
          />
        </Col>
        <Col span={7} style={{ paddingLeft: '40px' }}>
          <EditableTable
            tableValue={tableValue}
            type={type}
            viewOperations={viewOperations}
          />
        </Col>
      </Row>
    </div>
  )
}

export default DragSortingTable
