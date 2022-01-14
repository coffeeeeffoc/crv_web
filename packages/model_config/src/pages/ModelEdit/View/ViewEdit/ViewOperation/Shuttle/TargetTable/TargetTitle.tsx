import { Row, Space, Col } from 'antd'
import { useDispatch } from 'react-redux'
import { PlusSquareOutlined } from '@ant-design/icons'
import { viewActions } from '@/redux/actions'
import { TargetTitlePropsType } from '../../interface'

const TargetTitle = ({ type, rowIndex, viewOperations }: TargetTitlePropsType) => {
  const dispatch = useDispatch()
  const updateViewOperations = JSON.parse(JSON.stringify(viewOperations))
  const createOperationList = {
    name: '双击修改名称',
    type: 'COMBO',
    operationIds: []
  }

  const creatOperationsList = () => {
    updateViewOperations[type].splice(rowIndex, 0, createOperationList)
    dispatch(viewActions.setViewData({ viewOperations: updateViewOperations }))
  }

  return (
    <div>
      <Row>
        <Col span={12}>
          <Space>{'已选择操作'}</Space>
        </Col>
        <Col span={12} style={{ textAlign: 'right' }}>
          <Space>
            <PlusSquareOutlined onClick={creatOperationsList} />
          </Space>
        </Col>
      </Row>
    </div>
  )
}

export default TargetTitle
