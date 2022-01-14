// import FormConfigLayout from '@/components/FormConfigLayout';
// import { ConfigEditTypeContext } from '@/context';
// import { EnumConfigEditType } from '@utils/types';
import ModelContainer from '@/businessComponents/ModelContainer';
import { Input, Button, Form, InputNumber } from 'antd';
// import { SimpleForm } from '@/components/Panels/PropertyDetail/Common';
import CurrencyInput from '@rc/ModuleUtils/ControlWithLength/InputWithLength';
import HeadModule from '@rc/ModuleUtils/HeadModule';
import { useContext, useState } from 'react';
import { ModelContext } from '@/context';
import message from '@utils/browser/message';
import { post } from '@utils/browser/request';
import { useHistory } from 'react-router-dom';

export const CreateForm = (props: any) => {
  const [form] = Form.useForm();
  const history = useHistory();
  const { modelId } = useContext(ModelContext);
  const onBack = () => {
    top?.Mainframe?.removeTabSelf();
  };
  const onSave = async () => {
    const values = await form.validateFields();
    post('/crvserviceconfig/form/create', {
      model: {
        id: modelId,
        forms: [{
          ...values,
        }],
      },
    }).then((res: any) => {
      const success = res?.data?.status === 200;
      const formId = res?.data?.result;
      const fn = success ? message.success : message.error;
      const defaultMsg = `保存${success ? '成功' : '失败'}`;
      fn(res.data?.message ?? defaultMsg);
      success && history.push(`/config/model/${modelId}/form/${formId}`);
    }).catch((e: Error) => {
      message.error('保存失败');
    }).finally(() => {
    });
  };
  const buttonType: any[] = [
    <Button
      onClick={onSave}
      type='primary'
      key ='customOperation'
    >
      保存
    </Button>,
    <Button
      onClick={onBack}
      type='primary'
      key ='customOperation'
    >
      返回
    </Button>
  ];
  return (
    <div style={{ padding: '20px' }}>
      <HeadModule textLeft = '创建模型表单' buttonType={buttonType} divider />
      <Form
        name="basic"
        initialValues={{
          remember: true,
        }}
        form={form}
        style={{ width: '100%', padding: '0 50px' }}
        autoComplete="off"
        layout='vertical'
      >
        <Form.Item
          label="名称:"
          name="name"
          rules={[
            {
              required: true,
              message: '请输入名称!',
            },
          ]}
        >
          <CurrencyInput maxLength={20}/>
        </Form.Item>

        <Form.Item
          label="说明:"
          name="statement"
        >
          <Input.TextArea rows={5} showCount maxLength={140}/>
        </Form.Item>
      </Form>
    </div>
  );
};
export const Test = () => {
  const [val, setVal] = useState<any>(0);
  return (
    <div>
      <InputNumber
        precision={1}
        onChange={setVal}
      />
      <button
        onClick={() => alert(val)}
      >click</button>
    </div>
  );
};
export default (props: any) => {
  return (
    <ModelContainer {...props} >
      <CreateForm />
      {/* <Test /> */}
    </ModelContainer>
  );
};
