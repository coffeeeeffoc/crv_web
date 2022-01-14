import { FC, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Button, Space, Row, Col, Select } from 'antd'
import { viewActions } from '@/redux/actions'
import DragSortingTable from './Shuttle'
import { useAppSelector } from '@/redux'
import { OperationSelectType } from './interface'

const { Option } = Select

const ViewOperation: FC = () => {
  const [isHeaderShow, setIsHeaderShow] = useState(true)
  const [type, setType] = useState<OperationSelectType>(OperationSelectType.TABLE_HEADER)
  const dispatch = useDispatch()
  const { viewData } = useAppSelector(state => state.view)

  const { viewOperations = { headerShowCount: 3, dataShowCount: 3, tableHeader: [], dataRow: [] } } = viewData

  const { headerShowCount, dataShowCount } = viewOperations
  const headerOnClick = () => {
    setIsHeaderShow(true)
    setType(OperationSelectType.TABLE_HEADER)
  }
  const dataOnClick = () => {
    setIsHeaderShow(false)
    setType(OperationSelectType.DATA_ROW)
  }
  const countOnChange = (val: number) => {
    const updateViewOperations = JSON.parse(JSON.stringify(viewOperations))
    isHeaderShow
      ? updateViewOperations.headerShowCount = val
      : updateViewOperations.dataShowCount = val
    dispatch(viewActions.setViewData({ viewOperations: updateViewOperations }))
  }

  return (
    <div>
      <Row>
        <Col span={24} style={{ marginBottom: '10px' }}>
          <Space>
            <Button
              type='primary'
              onClick={headerOnClick}
              style={isHeaderShow ? { borderWidth: 0, paddingLeft: '24px', paddingRight: '24px' } : { background: 'rgba(0, 0, 0, 0.06)', border: '0', paddingLeft: '24px', paddingRight: '24px' }}
            >表头</Button>
            <Button
              type='primary'
              onClick={dataOnClick}
              style={!isHeaderShow ? { borderWidth: 0, paddingLeft: '24px', paddingRight: '24px' } : { background: 'rgba(0, 0, 0, 0.06)', border: '0', paddingLeft: '24px', paddingRight: '24px' }}
            >数据行</Button>
          </Space>
        </Col>
        <Col span={24} style={{ paddingLeft: '20px', marginBottom: '10px' }}>
          <span style={{ paddingRight: '24px', fontSize: 'large' }}>前面</span>
          <Select
            onChange={countOnChange}
            style={{ width: '100px' }} value={isHeaderShow ? headerShowCount : dataShowCount}
          >
            {
              [3, 4, 5, 6, 7, 8, 9, 10].map(item => <Option value={item} key={item}>{item}</Option>)
            }
          </Select>
          <span style={{ paddingLeft: '24px', fontSize: 'large' }}>个按钮显示，其他按钮将收缩到更多操作菜单中</span>
        </Col>
        <Col span={24} style={{ paddingLeft: '20px' }}>
          <DragSortingTable type={type} />
        </Col>
      </Row>
    </div>
  )
}

export default ViewOperation
