import { useCallback, useEffect } from 'react'
import { Button, Row, Col, Form } from 'antd'
import { selectOperationTypeMap } from '../constants'
import HeadModule from '@@/ModuleUtils/HeadModule'
import { ShowType } from '@/common/constant'

interface propsType {
  setTitle: any
  setVisible: any
  setShow: (value: ShowType) => void
  setStepType: any
}
const OperationStepSelect = ({
  setTitle,
  setVisible,
  setShow,
  setStepType
}: propsType) => {
  const handleCancel = () => {
    setVisible(false)
  }
  const [form] = Form.useForm()

  const onFinish = useCallback((values: any) => {
    setStepType(values.stepType)
    setShow(ShowType.CREATE)
  }, [setStepType, setShow])

  const buttonType = [
    <Button key='cancel' size='small' type='primary' className='cancelBtn' onClick={handleCancel}>返回</Button>
  ]

  useEffect(() => {
    setTitle(<HeadModule textLeft='操作步骤类型选择' buttonType={buttonType} />)
    // eslint-disable-next-line
  }, [])

  return (
    <>
      <Form
        style={{ width: '100%', margin: '0 auto' }}
        layout='vertical'
        form={form}
        initialValues={{}}
        onFinish={onFinish}
      >
        <Row style={{ paddingLeft: 100, paddingRight: 100 }}>
          <Col span={24}>
            <Form.Item
              key={selectOperationTypeMap.name}
              label={selectOperationTypeMap.title}
              name='stepType'
              rules={[
                { required: true, message: '请选择类型' }
              ]}
            >{selectOperationTypeMap.control}</Form.Item>
          </Col>
          <Col span={24} style={{ textAlign: 'center' }}>
            <Button style={{ padding: '0 25px' }} type='primary' size='small' htmlType='submit' id='operation_select_next'>下一步</Button>
          </Col>
        </Row>
      </Form>
    </>
  )
}

export default OperationStepSelect
