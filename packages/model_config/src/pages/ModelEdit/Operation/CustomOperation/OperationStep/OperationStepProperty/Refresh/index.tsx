import { Input, Form, Row, Col } from 'antd'

const Refresh = ({ form, ...props }: any) => {
  return (
    <>
      <Row>
        <Col span={24}>
          <Form.Item label='步骤说明:' name='statement' key='statement'>
            <Input.TextArea rows={5} showCount maxLength={140} />
          </Form.Item>
        </Col>
      </Row>
    </>
  )
}

export default Refresh
