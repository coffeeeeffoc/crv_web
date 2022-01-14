import { Select, Divider, Button } from 'antd'
import { SaveOutlined } from '@ant-design/icons'
import { useSelector, useDispatch } from 'react-redux'
import { configActions, dataActions } from '@/redux/actions'
import { ListConfigProps } from '@/interfaces/ListConfig'
import { useCallback, useEffect } from 'react';
import { ListService } from '@/services/listService';

const { queryConfigSt, queryConfigNd } = ListService;

/**
 * 视图选择器
 */
export interface ViewSelectorProps {
  // 将当前页面保存为视图
  onSaveToView?: () => void
  // 数据源
  // dataSource: Array<{ value: string | number, text: string }>
  // 值
  // value?: string
  [key: string]: any
}
const { Option } = Select

export default ({ ...rest }: ViewSelectorProps) => {
  const dispatch = useDispatch()
  const { modelId, configLoading, current, unChangeable, views }: ListConfigProps = useSelector((state: any) => state.config)

  /** 查询所有视图 */
  useEffect(() => {
    if (modelId && configLoading) { dispatch(queryConfigSt({ modelId, views: [] })) }
  }, [configLoading, dispatch, modelId])

  // 查询视图详细配置
  useEffect(() => {
    if (current) {
      dispatch(queryConfigNd({ modelId, fields: [], operations: [], views: [current], requireRefModel: true }));
      dispatch(dataActions.setView({ viewId: current }));
    }
  }, [current, dispatch, modelId])

  /** 视图改变 */
  const onChange = useCallback((val) => {
    dispatch(configActions.setView({ viewId: val }));
  }, [dispatch])

  return (
    <Select
      loading={configLoading}
      style={{ maxWidth: '100%', minWidth: 250, height: 32 }}
      id='VIEW_SELECT'
      onChange={onChange}
      value={`${current}`}
      disabled={unChangeable}
      dropdownRender={menu => (
        <div>
          {menu}
          <Divider style={{ margin: '4px 0' }} />
          <Button type="link" icon={<SaveOutlined />}>将当前页面保存为视图</Button>
        </div>
      )}
      {...rest}
    >
      {
        views.map((item) => <Option key={item.id} value={`${item.id}`} title={item.statement}>{item.name}</Option>)
      }
    </Select>
  )
}
