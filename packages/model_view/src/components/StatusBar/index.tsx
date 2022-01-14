import { FC, useCallback } from 'react'
import { Space, Checkbox } from 'antd'
import { dataActions } from '@/redux/actions'
import { useDispatch } from 'react-redux'
import ColumnStatusBar from './ColumnStatusBar';
import { useAppSelector } from '@/redux'

/**
 * 列表页面筛选工具条
 */
const StatusBar: FC = () => {
  const viewId = useAppSelector((state: any) => state.config.current)
  // 数据
  const { selectAll = false, selectedRowKeys = [] } = useAppSelector((state: any) => state.data.viewDataList[viewId]?.temp ?? {})

  // 配置
  const dispatch = useDispatch()
  const onChange = useCallback((e) => {
    dispatch(dataActions.setSelectAll({ viewId: viewId, selectAll: e.target.checked }))
  }, [viewId, dispatch])
  return (
    <Space align='start' style={{ lineHeight: '32px' }} wrap>
      <span id='SELECT_COUNT'>已选：{selectedRowKeys.length}</span>
      <Checkbox id='SELECTALL' checked={selectAll} key='selectAll' onChange={onChange}>选择全部数据</Checkbox>
      <ColumnStatusBar />
    </Space>
  )
}

export default StatusBar
