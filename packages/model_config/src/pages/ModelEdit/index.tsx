import { useCallback, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Button, Row, Col, Tabs, Spin } from 'antd'
import { Link } from 'react-router-dom'
// import { DndProvider } from 'react-dnd'
// import { HTML5Backend } from 'react-dnd-html5-backend'
import { CurrentTabType, PADDING_STYLE } from '@/common/constant'
import Base from './Base'
import Field from './Field'
import Operation from './Operation'
import View from './View'
import FormConfig from './FormConfig'
// import DataFilterRule from './DataFilterRule'
import UniqueRule from './UniqueRule'
// import RolePermission from './RolePermission'
import { fieldActions, modelListActions, modelEditActions } from '@/redux/actions'
import { POST_REQUEST } from '@/services/postServices'
import HeadModule from '@@/ModuleUtils/HeadModule'
import { MODEL_EDIT_ELEMENT } from '@/common/elementName'

const { queryOne } = POST_REQUEST

const { TabPane } = Tabs

interface tabListType {
  key: string
  title: string
  component: React.ReactNode
}

/**
 * 模型编辑
 * @param {*} props
 */
export default function ModelEdit (props: any) {
  // : 获取地址参数 model id
  const { match: { params: { modelId } } } = props
  const { baseInfo, currentTab, loading, update } = useSelector((state: any) => state.modelEdit)
  const { fieldVersions } = useSelector((state: any) => state.field)
  const { viewVersions } = useSelector((state: any) => state.view)
  const { operationVersion } = useSelector((state: any) => state.operation)
  const { formVersion } = useSelector((state: any) => state.formConfig)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(queryOne({ model: { id: modelId } }))
  }, [modelId, fieldVersions, viewVersions, update, operationVersion, dispatch, formVersion])

  const tabsList: tabListType[] = [
    { key: CurrentTabType.BASE, title: '基本信息', component: <Base modelId={modelId} /> },
    { key: CurrentTabType.FIELD, title: '字段信息', component: <Field modelId={modelId} /> },
    { key: CurrentTabType.OPERATION, title: '操作', component: <Operation modelId={modelId} /> },
    { key: CurrentTabType.VIEW, title: '视图', component: <View modelId={modelId} /> },
    { key: CurrentTabType.FORM, title: '表单配置', component: <FormConfig modelId={modelId} /> },
    // { key: 'datafilterrule', title: '数据过滤规则', component: <DataFilterRule modelId={id} elementname={`${id}_base`} /> },
    { key: 'uniquerule', title: '唯一性规则', component: <UniqueRule modelId={modelId} /> }
    // { key: 'rolepermission', title: '角色权限', component: <RolePermission /> }
  ]

  const backOnClick = useCallback(() => {
    dispatch(modelListActions.setModelState({ loading: true }))
    dispatch(modelEditActions.setBaseInfo({ baseInfo: {} }))
    dispatch(fieldActions.setDefaultFieldShow({ isDefaultFieldShow: false }))
  }, [dispatch])

  const buttonType: any[] = [
    <Link to='/model/list' key='modelEditLink'><Button type='primary' onClick={backOnClick} id={MODEL_EDIT_ELEMENT.BACK} key={MODEL_EDIT_ELEMENT.BACK}>返回</Button></Link>
  ]

  return (
    <div>
      <Spin spinning={loading}>
        <div style={PADDING_STYLE}>
          <HeadModule textLeft={`模型编辑-${modelId}`} buttonType={buttonType} divider />
          <Row>
            <Col span={24}>
              <Tabs
                key={JSON.stringify(baseInfo)}
                tabPosition='left'
                defaultActiveKey={currentTab}
                size='small'
                type='card'>
                {
                  tabsList.map(tab => <TabPane tab={tab.title} key={tab.key}>{tab.component} </TabPane>)
                }
              </Tabs>
            </Col>
          </Row>
        </div >
      </Spin>
    </div>
  )
}
