import { Form, Input, InputNumber } from 'antd';
import FrontendFormulaConfig from '@@/Panels/PropertyDetail/properties/Field/FrontendFormulaConfig';

export default () => {
  const [form] = Form.useForm();
  return (
    <Form form={form} onValuesChange={(changeValues: any, values: any) => {
      console.log('object', changeValues, values);
      if ('count' in changeValues) {
        form.setFieldsValue({
          total: 9,
          input: 'aaa',
        });
      } else if ('total' in changeValues) {
        form.setFieldsValue({
          price: 2,
        });
      } else if ('price' in changeValues) {
        form.setFieldsValue({
          count: 3,
        });
      }
    }} >
      <Form.Item name='price' label='price' >
        <InputNumber />
      </Form.Item>
      <Form.Item name='count' label='count' >
        <InputNumber />
      </Form.Item>
      <Form.Item name='total' label='total' >
        <InputNumber />
      </Form.Item>
      <Form.Item name='input' label='input' >
        <Input />
      </Form.Item>
      <Form.Item name='formula' label='formula' >
        <FrontendFormulaConfig />
      </Form.Item>
    </Form>
  );
};
