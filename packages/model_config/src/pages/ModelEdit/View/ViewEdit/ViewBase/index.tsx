import { FC } from 'react'
import {
  Row,
  Col,
  Form,
  Input,
  Checkbox
} from 'antd'
import { useAppSelector } from '@/redux'

const { TextArea } = Input

const ViewBase: FC<any> = (props) => {
  const { form } = props
  const { viewData } = useAppSelector(state => state.view)

  return (
    <div >
      <Form
        layout='vertical'
        form={form}
        initialValues={viewData}
        // onFinish={onFinish}
        style={{ paddingBottom: '40px' }}
      >
        <Row>
          <Col span={24}>
            <Form.Item key='name' name='name' label='名称：'
              rules={[{ required: true, message: '名称为必填项' }, { pattern: /^\S.*\S$|(^\S{0,1}\S$)/, message: '名称首尾不可为空格' }]}>
              <TextArea rows={1} maxLength={100} showCount />
            </Form.Item>
            <Form.Item key='supportSelectCal' name='supportSelectCal' label='' valuePropName="checked" >
              <Checkbox >支持数据勾选汇总，当用户勾选数据记录时，汇总字段将仅汇总勾选记录的数据，默认为汇总所有符合条件的数据</Checkbox>
            </Form.Item>
            <Form.Item key='statement' name='statement' label='字段说明'>
              <TextArea rows={5} maxLength={140} showCount />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </div>
  )
}
export default ViewBase
