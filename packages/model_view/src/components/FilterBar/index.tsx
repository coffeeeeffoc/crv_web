import { FC, useState, useEffect, useCallback } from 'react'
import { Select, Button, Input, Space } from 'antd'
import { useSelector, useDispatch } from 'react-redux'
import { StopOutlined, FilterFilled, SyncOutlined } from '@ant-design/icons'
import ComplexFilter from './ComplexFilter'
import { ListConfigProps, ViewProps } from '@/interfaces/ListConfig'
import { emptyConfig } from '@/constants/dataSliceConstant'
import styles from './styles.less'
import { dataActions } from '@/redux/actions'

const { Option } = Select

/**
 * 列表页面筛选工具条
 */
const FilterBar: FC = () => {
  const dispatch = useDispatch()

  const [visible, setVisible] = useState<boolean>(false)
  // 配置
  const { current, viewList }: ListConfigProps = useSelector((state: any) => state.config)
  const { config: { defaultFilterFields: fieldList = [] } }: ViewProps = viewList[current] ?? emptyConfig

  const { quickSearch: { fields, content } = {}, complexSearch }: { quickSearch: any, complexSearch: any } = useSelector((state: any) => state.data.viewDataList[current]?.temp?.filters ?? { quickSearch: {}, complexSearch: null })

  const [quickFields, setQuickFields] = useState<string[]>(fields ?? [])
  const [quickContent, setQuickContent] = useState<string>(content ?? '')

  useEffect(() => setQuickFields(fields ?? []), [fields])

  useEffect(() => setQuickContent(content ?? ''), [content])

  const filterChange = useCallback((val: any) => {
    dispatch(dataActions.setFilter({ viewId: current, filters: val }))
    dispatch(dataActions.setSelectAll({ viewId: current, selectAll: false }))
  }, [dispatch, current])

  const onSearch = useCallback(() => {
    filterChange({ quickSearch: { fields: quickFields, content: quickContent } })
    dispatch(dataActions.setSelectRows({ viewId: current, selectedRows: [], selectedRowKeys: [] }))
  }, [filterChange, quickFields, quickContent, dispatch, current])

  const onReset = useCallback(() => {
    setQuickFields([])
    setQuickContent('')
    filterChange({ quickSearch: undefined, complexSearch: undefined, columnSearch: undefined })
    dispatch(dataActions.setSelectRows({ viewId: current, selectedRows: [], selectedRowKeys: [] }))
  }, [setQuickFields, setQuickContent, filterChange, dispatch, current])

  const onRefresh = () => {
    filterChange({})
  }

  const color = !complexSearch ? '#1890FF' : '#6cef7c'

  const onCancel = useCallback(() => {
    setVisible(false)
  }, [setVisible])

  const InputAddonBefore = <Select
    value={quickFields}
    id='FILTER_FIELD'
    allowClear
    className="filterField"
    bordered={false}
    maxTagCount={2}
    mode="multiple"
    maxTagPlaceholder='More...'
    placeholder="检索字段选择"
    style={{ minWidth: 200, maxWidth: 250 }}
    onChange={(val) => setQuickFields(val)}
  >
    {
      fieldList.map((item: { id: string | number, name: string }) => <Option key={item.id} value={item.id}>{item.name}</Option>)
    }
  </Select>

  const InputAddonAfter = <Space>
    <Button title='高级过滤' id='SENIOR_FILTER' key='SENIOR_FILTER' style={{ backgroundColor: color, borderColor: color }} type="primary" icon={<FilterFilled />} size="small" onClick={() => setVisible(true)} />
    <Button title='刷新' id='REFRESH' key='REFRESH' type="primary" icon={<SyncOutlined />} size="small" onClick={onRefresh} />
    <Button title='重置状态' id='RESET' key='RESET' type="primary" icon={<StopOutlined />} size="small" onClick={onReset} />
  </Space>

  return (
    <>
      <Input
        className={styles.FilterBar}
        autoComplete='off'
        id='FUZZY_SCREEN'
        onPressEnter={onSearch}
        addonBefore={InputAddonBefore}
        addonAfter={InputAddonAfter}
        onChange={(e) => setQuickContent(e.target.value)}
        value={quickContent}
        placeholder='模糊筛选'
      />
      {visible &&
        <ComplexFilter
          visible={visible}
          onCancel={onCancel}
        />}
    </>
  )
}

export default FilterBar
