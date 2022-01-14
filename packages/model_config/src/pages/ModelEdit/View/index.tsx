import { useCallback, useEffect, useState } from 'react'
import type { FC } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Button } from 'antd'
import EditText from '@@/ModuleUtils/EditText'
import { sortData } from '@/utils/sortData'
import TableListShow from '@/components/TableListShow'
import { viewActions, modelEditActions } from '@/redux/actions'
import { POST_REQUEST } from '@/services/postServices'
import { VIEW_ELEMENT } from '@/common/elementName'
// import { TabPropsType } from '@/interfaces/Common'
import { CurrentTabType } from '@/common/constant'
import { useHistory } from 'react-router-dom'

const { createDefaultView, deleteView, copyView } = POST_REQUEST

interface TabPropsType {
  modelId: string | number
  [propsName: string]: any
}

const View: FC<TabPropsType> = (props) => {
  const { modelId } = props

  const dispatch = useDispatch()
  const { baseInfo: { views = [] } } = useSelector((state: any) => state.modelEdit)
  const { loading, editSuccess } = useSelector((state: any) => state.view)
  const history = useHistory()
  const [selectedRowKeys, setSelectedRowKeys] = useState([])

  useEffect(() => {
    if (editSuccess) {
      history.push(`/model/edit/${modelId}`)
      dispatch(viewActions.setViewState({ editSuccess: true }))
    }
  }, [editSuccess, dispatch, modelId, history])

  useEffect(() => {
    setSelectedRowKeys([])
    dispatch(modelEditActions.setCurrentTab({ currentTab: CurrentTabType.VIEW }))
  }, [views, dispatch])

  const viewCreateOnClick = useCallback(() => {
    // 创建默认视图
    dispatch(createDefaultView({ model: { id: modelId } }))
    dispatch(modelEditActions.setCurrentTab({ currentTab: CurrentTabType.VIEW }))
  }, [dispatch, modelId])

  const viewPathOnClick = useCallback(() => {
    // 复制选中视图
    const copyViews: Array<{ id: string }> = []
    selectedRowKeys?.forEach?.(item => {
      copyViews.push({ id: item })
    })
    dispatch(copyView({ model: { id: modelId, views: copyViews } }))
    dispatch(modelEditActions.setCurrentTab({ currentTab: CurrentTabType.VIEW }))
  }, [dispatch, modelId, selectedRowKeys])

  const buttonType = [
    <Button type='primary' onClick={viewCreateOnClick} loading={loading} id={VIEW_ELEMENT.CREATE} key={VIEW_ELEMENT.CREATE}>创建默认视图</Button>,
    <Button type='primary' onClick={viewPathOnClick} loading={loading} id={VIEW_ELEMENT.PATH} key={VIEW_ELEMENT.PATH} disabled={selectedRowKeys.length !== 1}>复制选中视图</Button>
  ]

  interface recordType {
    id: string
    [propsName: string]: any
  }

  const viewDelete = useCallback((record: recordType) => {
    dispatch(deleteView({ model: { id: modelId, views: [{ id: record.id }] } }))
    dispatch(modelEditActions.setCurrentTab({ currentTab: CurrentTabType.VIEW }))
  }, [dispatch, modelId])

  const columns = [
    {
      title: '操作',
      width: 100,
      align: 'center',
      ellipsis: true,
      render: (val: string, record: recordType, index: number) => (
        <EditText
          editClick={() => {
            dispatch(viewActions.setViewState({ viewData: record }))
            history.push(`/model/edit/${modelId}/view/${record.id}`)
            // window.location.href = `#/model/edit/${modelId}/view/${record.id}`
          }}
          deleteClick={() => viewDelete(record)}
          editElementName={`${VIEW_ELEMENT.EDIT}_${record.id}`}
          deleteElementName={`${VIEW_ELEMENT.DELETE}_${record.id}`} />
      )
    },
    {
      dataIndex: 'id',
      title: 'ID',
      width: '15%',
      ellipsis: true,
    },
    {
      dataIndex: 'name',
      title: '名称',
      width: '25%',
      ellipsis: true,
    },
    {
      dataIndex: 'statement',
      title: '说明',
      ellipsis: true,
    }
  ]

  const rowSelection = {
    selectedRowKeys,
    onChange: (selectedRowKeys: []) => setSelectedRowKeys(selectedRowKeys)
  }

  return (
    <TableListShow
      tabType='view'
      dataSource={sortData(views)}
      buttonType={buttonType}
      columns={columns}
      filterCondition={['name', 'id', 'statement']}
      rowSelection={rowSelection}
    />
  )
}

export default View
