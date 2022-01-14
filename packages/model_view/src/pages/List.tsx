/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, FC } from 'react'
import { useDispatch } from 'react-redux'
import { Row, Col, Spin } from 'antd'
import { ListConfigProps } from '@/interfaces/ListConfig'
import { configActions } from '@/redux/actions'
import FilterBar from '@/components/FilterBar'
import StatusBar from '@@/StatusBar'
import ViewSelector from '@@/ViewSelector'
import ActionBar from '@@/ActionBar'
import TableList from '@@/TableList'
import styles from './styles.less'
import { useAppSelector } from '@/redux'

// const { query } = ListService

const getUrlParams = (url: string) => url.slice(2).replace(/\?.+/, '').split('/');

const List: FC = (props: any) => {
  const { location: { hash } } = props
  const [modelId, viewId] = getUrlParams(hash)
  /**
   * 列设置弹层标志
   * 作用：弹出窗口选择需要显示得列
   */
  const dispatch = useDispatch()

  // 配置
  const { configLoading, viewLoading }: ListConfigProps = useAppSelector((state: any) => state.config)
  // 初始化modelId,viewId
  useEffect(() => {
    dispatch(configActions.setModelId({ modelId: modelId }))
    // 设置默认视图
    if (viewId) { dispatch(configActions.setView({ viewId: viewId, unChangeable: true })); }
  }, [modelId, dispatch])

  return (
    <div className={styles.crvList}>
      <Spin spinning={configLoading} size='large' tip={configLoading ? '配置加载中...' : ''} >
        <Row style={{ margin: 5 }}>
          <Col span={9}><ViewSelector /></Col>
          <Col span={15}><FilterBar /></Col>
        </Row>
        <Row style={{ margin: 5 }}>
          <Col span={12}>
            <StatusBar />
          </Col>
          <Col span={12} style={{ textAlign: 'right' }}>
            <ActionBar />
          </Col>
        </Row>
        <Row style={{ padding: 5 }}>
          <Col span={24} id='dataTable'>
            {
              // 在查询到具体的视图配置后去渲染界面
              !viewLoading && (<TableList />)
            }
          </Col>
        </Row>
      </Spin>
    </div>
  )
}

export default List
