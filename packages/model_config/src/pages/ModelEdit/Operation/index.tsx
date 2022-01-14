
import { useSelector, useDispatch } from 'react-redux'
import { Button } from 'antd'
import { sortData } from '@/utils/sortData'
import TableListShow from '@@/TableListShow'
import { modelEditActions, operationActions } from '@/redux/actions'
import { POST_REQUEST } from '@/services/postServices'
import EditText from '@@/ModuleUtils/EditText'
import { OPERATION_ELEMENT } from '@/common/elementName'
// import { TabPropsType } from '@/interfaces/Common'
import { FC, useState, useMemo, useCallback } from 'react'
import GeneralOperation from './GeneralOperation'
import { CurrentTabType } from '@/common/constant'
import { useHistory } from 'react-router-dom'

const { deleteOperation } = POST_REQUEST

interface TabPropsType {
  modelId: string | number
  [propsName: string]: any
}

const Operation: FC<TabPropsType> = (props) => {
  const { modelId } = props
  const history = useHistory()
  const [visible, setVisible] = useState(false)

  const dispatch = useDispatch()
  const { baseInfo } = useSelector((state: any) => state.modelEdit)

  const operations = useMemo(() => baseInfo.operations ?? [], [baseInfo.operations])

  const buttonType = [
    <Button
      type='primary'
      key='generalOperation'
      id={OPERATION_ELEMENT.CREATE_OPERATION}
      onClick={() => {
        dispatch(operationActions.setOperationState({ show: 'select' }))
        setVisible(true)
      }}>添加通用操作</Button>,
    <Button
      onClick={() => {
        dispatch(operationActions.setOperationState({ operationData: {} }))
        dispatch(modelEditActions.setCurrentTab({ currentTab: CurrentTabType.OPERATION }))
        dispatch(operationActions.setOperationState({ show: 'create' }))
        // window.location.href = `#/model/edit/${modelId}/operation`
        history.push(`/model/edit/${modelId}/operation`)
      }}
      id={OPERATION_ELEMENT.CREATE}
      type='primary' key='customOperation'>新建</Button>
  ]

  const operationDelete = (record: any) => {
    dispatch(deleteOperation({ model: { id: modelId, operations: [{ id: record.id }] } }))
    dispatch(modelEditActions.setCurrentTab({ currentTab: CurrentTabType.OPERATION }))
  }

  const columns = [
    {
      title: '操作',
      width: 100,
      ellipsis: true,
      align: 'center',
      render: (val: string, record: any) => (
        <EditText
          editClick={() => {
            dispatch(operationActions.setOperationState({ operationData: record }))
            dispatch(operationActions.setOperationState({ show: 'edit' }))
            // window.location.href = `#/model/edit/${record.id}/operation`
            history.push(`/model/edit/${modelId}/operation`)
          }}
          deleteClick={() => operationDelete(record)}
          editElementName={`${OPERATION_ELEMENT.EDIT}_${record.id}`}
          deleteElementName={`${OPERATION_ELEMENT.DELETE}_${record.id}`} />
      )
    },
    {
      dataIndex: 'id',
      title: 'ID',
      ellipsis: true,
      width: '15%'
    },
    {
      dataIndex: 'name',
      title: '名称',
      ellipsis: true,
      width: '25%'
    },
    {
      dataIndex: 'statement',
      title: '说明',
      ellipsis: true,
    }
  ]

  const onCancel = useCallback(() => {
    setVisible(false)
    dispatch(modelEditActions.setCurrentTab({ currentTab: CurrentTabType.OPERATION }))
  }, [dispatch])

  return (
    <>
      <TableListShow
        // modelId={modelId}
        tabType='operation'
        dataSource={sortData(operations)}
        filterCondition={['id', 'name', 'statement']}
        buttonType={buttonType}
        columns={columns}
        rowSelection={false}
      />
      {visible && <GeneralOperation visible={visible} onCancel={onCancel} />}
    </>
  )
}

export default Operation
