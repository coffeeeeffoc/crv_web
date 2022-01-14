import { FC, useEffect } from 'react';
import { Select, Button, Space, Form, Input, Modal } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';

const { Option } = Select;

export interface ComplexFilterModalProps {
  visible: boolean
  fieldList: { text: string, value: string | number }[]
  value: any
  onCancel: (...arg: any) => any
  onChange: (...arg: any) => any
}

/**
 * 列表页面高级筛选
 */
const ComplexFilterModal: FC<ComplexFilterModalProps> = ({ visible, onCancel, fieldList, value = {}, onChange }) => {

  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue(value)
  }, [])

  const onFinish = (values: any) => {
    console.log('ComplexFilterModal Received values of form:', values);
    if (onChange) {
      onChange({ ...values, type: 'COMBIN' });
    }
    onCancel();
  }

  return (
    <Modal
      title="表单高级过滤"
      visible={visible}
      onCancel={onCancel}
      onOk={() => document.getElementById('ComplexFilterModalSubmit')?.click()}
    >
      <Form name="dynamic_form_nest_item" form={form} onFinish={onFinish} autoComplete="off">
        <Form.List name="conditions">
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name, fieldKey, ...restField }, index) => (
                <Space key={key} style={{ display: 'flex', marginBottom: -15 }} align="baseline">
                  <Form.Item
                    {...restField}
                    name={[name, 'no']}
                    fieldKey={[fieldKey, 'no']}
                    initialValue={index}
                    rules={[{ required: true }]}
                  >
                    <Input value={`${index}`} readOnly style={{ width: 32, textAlign: 'center', paddingLeft: 0, paddingRight: 0, borderRadius: 15 }} />
                  </Form.Item>
                  <Form.Item
                    {...restField}
                    name={[name, 'field']}
                    fieldKey={[fieldKey, 'field']}
                    rules={[{ required: true, message: ' ' }]}
                  >
                    <Select placeholder="请选择字段" style={{ minWidth: 130, maxWidth: 200 }}>
                      {
                        fieldList.map((item: any) => <Option key={item.value} value={item.value}>{item.text}</Option>)
                      }
                      <Option value='='>该发动机和官方给答复股份大股东</Option>
                    </Select>
                  </Form.Item>
                  <Form.Item
                    {...restField}
                    name={[name, 'operator']}
                    fieldKey={[fieldKey, 'operator']}
                    rules={[{ required: true, message: ' ' }]}
                  >
                    <Select placeholder="请选择操作符" style={{ width: 100 }}>
                      <Option value='='>=</Option>
                      <Option value='<>'>{'<>'}</Option>
                      <Option value='in'>IN</Option>
                      <Option value='like'>LIKE</Option>
                      <Option value='>'>{'>'}</Option>
                      <Option value='>='>{'>='}</Option>
                      <Option value='<'>{'<'}</Option>
                      <Option value='<='>{'<='}</Option>
                      <Option value='BETWEEN'>BETWEEN</Option>
                    </Select>
                  </Form.Item>
                  <Form.Item
                    {...restField}
                    name={[name, 'value']}
                    fieldKey={[fieldKey, 'value']}
                    rules={[{ required: true, message: ' ' }]}
                  >
                    <Input placeholder="值" />
                  </Form.Item>
                  <MinusCircleOutlined onClick={() => remove(name)} />
                </Space>
              ))}
              <Form.Item>
                <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                  Add New Condition
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>
        <Form.Item
          label="条件组合逻辑"
          labelCol={{ span: 24 }}
          name='combin_logic'
          initialValue={''}
          rules={[{ required: true, message: '条件组合逻辑不能为空' }]}
        >
          <Input placeholder="请输入条件组合逻辑" />
        </Form.Item>
        <Form.Item style={{ display: 'none' }}>
          <Button id="ComplexFilterModalSubmit" type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default ComplexFilterModal
