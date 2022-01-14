import { FC, useCallback, useMemo } from 'react';
import { Menu, Dropdown, Divider, Tooltip } from 'antd';
import { DownOutlined, CloseOutlined, DeleteOutlined } from '@ant-design/icons';
import { useSelector, useDispatch } from 'react-redux'
import { dataActions } from '@/redux/actions'

const map: any = {
  LIKE: '包含',
  BETWEEN: '两者之间',
  IN: '包含'
}

const ColumnStatusBar: FC = () => {
  const dispatch = useDispatch()
  const viewId = useSelector((state: any) => state.config.current);
  const sorter = useSelector((state: any) => state.data.viewDataList[viewId]?.temp?.columnSorter);
  const filters = useSelector((state: any) => state.data.viewDataList[viewId]?.temp?.filters?.columnSearch);

  const onRemoveSorter = useCallback(() => {
    dispatch(dataActions.setColumnStatus({ viewId, sorter: null, filters }))
  }, [dispatch, filters, viewId])

  const onRemoveFilter = useCallback((key: string) => {
    const temp = { ...filters };
    if (temp[key]) {
      // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
      delete temp[key]
    }
    dispatch(dataActions.setColumnStatus({ viewId, sorter, filters: Object.keys(temp).length > 0 ? temp : undefined }))
  }, [dispatch, filters, sorter, viewId])

  const onClearColumnStatus = useCallback(() => {
    dispatch(dataActions.setColumnStatus({ viewId, sorter: null, filters: undefined }))
  }, [dispatch, viewId])

  const dropMenu = useMemo(() => {
    const items: any = [(<div style={{ padding: '5px 12px', borderBottom: '1px solid #909090' }} key='toolbar'>列状态<Tooltip title="清除"><DeleteOutlined onClick={onClearColumnStatus} style={{ float: 'right', marginTop: 4 }} /></Tooltip></div>)]
    if (sorter) {
      items.push(<Menu.Item>{sorter.title}：{sorter.sort === 'asc' ? '升序' : '降序'}<CloseOutlined style={{ float: 'right', marginTop: 4 }} onClick={onRemoveSorter} /></Menu.Item>)
    }
    if (filters && Object.keys(filters).length > 0) {
      items.push(<Divider style={{ margin: 2 }} />)
      const temp = Object.keys(filters).map((key: string) => filters[key]).sort((a: any, b: any) => a.t - b.t)
      temp.forEach((f: any) => items.push(<Menu.Item key={f.field}>{f.title}：{map[f.operate]}[{f.value}]<CloseOutlined style={{ float: 'right', marginTop: 4 }} onClick={() => onRemoveFilter(f.field)} /></Menu.Item>))
    }
    return <Menu>{items.map((m: any) => m)}</Menu>
  }, [filters, onClearColumnStatus, onRemoveFilter, onRemoveSorter, sorter])

  return (
    (sorter || filters)
      ? (<Dropdown overlay={dropMenu} trigger={['click']}>
        <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
          列状态 <DownOutlined />
        </a>
      </Dropdown>)
      : null
  )
}

export default ColumnStatusBar;
