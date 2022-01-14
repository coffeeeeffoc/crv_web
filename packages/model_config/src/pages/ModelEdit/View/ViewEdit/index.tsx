import { useCallback, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Button, Row, Col, Tabs, message, Form } from 'antd'
import { POST_REQUEST } from '@/services/postServices'
import HeadModule from '@@/ModuleUtils/HeadModule'
import { VIEW_ELEMENT } from '@/common/elementName'
import { modelEditActions, viewActions } from '@/redux/actions'
import { useAppSelector } from '@/redux'
import { CurrentTabType } from '@/common/constant'
import ViewBase from './ViewBase'
import ViewField from './ViewField'
import ViewOperation from './ViewOperation'
import ViewDateFilter from './DataFilter'
import ViewInterface from './ViewInterface'
import ViewCollectCount from './SummaryCount'
import DefaultSort from './DefaultSort'
import { useHistory } from 'react-router-dom'

enum OperationType {
  TABLE_HEADER = 'tableHeader',
  DATA_ROW = 'dataRow'
}
const { editViewSave } = POST_REQUEST

const { TabPane } = Tabs

export default function ViewEdit (props: any) {
  const { viewData, loading, editSuccess } = useAppSelector(state => state.view)
  const [form] = Form.useForm()
  const { match: { params: { modelId, viewId } } } = props
  const dispatch = useDispatch()
  const history = useHistory()
  useEffect(() => {
    dispatch(modelEditActions.setCurrentTab({ currentTab: CurrentTabType.VIEW }))
  }, [dispatch])

  // if editSuccess, to page modelEdit
  useEffect(() => {
    if (editSuccess) {
      history.push(`/model/edit/${modelId}`)
      dispatch(viewActions.setViewState({ editSuccess: false }))
    }
  }, [editSuccess, dispatch, history, modelId])

  useEffect(() => {
    // current page update at the same time data empty
    if (Object.keys(viewData).length === 0) {
      history.push(`/model/edit/${modelId}`)
    }
  }, [viewData, modelId, history])

  // legal the viewData is not contain empty value
  const isSaveLegal = useCallback((viewLegalData: typeof viewData): boolean => {
    let legalInfo: boolean = true
    const messageArr: string[] = []
    const typeArr = [OperationType.TABLE_HEADER, OperationType.DATA_ROW]
    typeArr.forEach(type => {
      viewLegalData.viewOperations?.[type]?.forEach(item => {
        if (item.type === 'COMBO' && item.operationIds.length === 0) {
          if (type === OperationType.TABLE_HEADER) {
            legalInfo = false
            messageArr.push('视图操作中存在空的操作集合')
          }
        }
      })
    })
    viewLegalData.viewDataFilter?.conditions.forEach(({ field, operator, valueType, value }) => {
      if (!field || !operator || !valueType || (value !== 0 && !value)) {
        messageArr.push('数据过滤中存在未填项')
        legalInfo = false
      }
    })
    viewLegalData.summaryCalculate?.forEach(({ name, formula }) => {
      if (!name || !formula) {
        messageArr.push('汇总计算存在未填项')
        legalInfo = false
      }
    })
    if (messageArr.length > 0) {
      message.warning(messageArr.join(','))
    }
    return legalInfo
  }, [])
  const onSave = useCallback(async () => {
    const values = await form.validateFields()
    if (isSaveLegal(viewData)) {
      dispatch(modelEditActions.setCurrentTab({ currentTab: CurrentTabType.VIEW }))
      dispatch(editViewSave({ model: { id: modelId, views: [{ ...viewData, ...values }] } }))
    }
  }, [viewData, dispatch, form, modelId, isSaveLegal])

  const viewEditBack = useCallback(() => {
    dispatch(modelEditActions.setUpdate('update'))
    dispatch(modelEditActions.setCurrentTab({ currentTab: CurrentTabType.VIEW }))
    history.push(`/model/edit/${modelId}`)
    // window.location.href = `#/model/edit/${modelId}`
  }, [dispatch, modelId, history])

  const viewTabsList = [
    { key: 'viewBase', title: '基本信息', component: <ViewBase form={form} /> },
    { key: 'viewField', title: '视图字段', component: <ViewField /> },
    { key: 'viewOperation', title: '视图操作', component: <ViewOperation /> },
    { key: 'viewDateFilter', title: '数据过滤', component: <ViewDateFilter /> },
    { key: 'defaultSort', title: '默认排序', component: <DefaultSort /> },
    { key: 'viewCollectCount', title: '汇总计算', component: <ViewCollectCount /> },
    { key: 'viewInterface', title: '外部数据获取接口', component: <ViewInterface /> }
  ]

  const buttonType = [
    <Button type='primary' id={VIEW_ELEMENT.EDIT_SAVE} key={VIEW_ELEMENT.EDIT_SAVE} onClick={onSave} loading={loading}>保存</Button>,
    <Button type='primary' id={VIEW_ELEMENT.EDIT_BACK} key={VIEW_ELEMENT.EDIT_BACK} onClick={viewEditBack}>返回</Button>
  ]

  return (
    <div>
      <div style={{ width: '100%', margin: 'auto', padding: 20 }}>
        <HeadModule textLeft={`视图编辑-${viewId}`} buttonType={buttonType} divider />
        <Row>
          <Col span={24}>
            <Tabs tabPosition='left' type='card' centered={true} defaultActiveKey='viewBase'>
              {
                viewTabsList.map(viewTab => <TabPane tab={viewTab.title} key={viewTab.key}>{viewTab.component}</TabPane>)
              }
            </Tabs>
          </Col>
        </Row>
      </div >
    </div>
  )
}
