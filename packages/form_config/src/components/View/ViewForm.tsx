import { Form } from 'antd';
import { useContext, useEffect } from 'react';
import { useDependencies } from './hooks';
import { InitialPageDataContext, ViewFormContext } from '@/context';

function ViewForm (props: any) {
  const [form] = Form.useForm();
  // const [formSnapshotId, setFormSnapshotId] = useState(generateId);
  const {
    isBatch,
    data,
  } = useContext(InitialPageDataContext);
  const initialValues = isBatch ? data : data?.[0];
  // const [formValues, setFormValues] = useState(initialValues);
  const FormComponent = Form;
  const {
    collectDependence,
    triggerFormChange,
  } = useDependencies(form);
  useEffect(() => {
    form.setFieldsValue(initialValues);
    // setFormValues(initialValues);
  }, [initialValues, form]);
  return (
    // <ViewFormContext.Provider value={{ form, formValues, collectDependence }} >
    <ViewFormContext.Provider value={{ form, collectDependence }} >
      <FormComponent
        /*
          注意：此处一定要使用component={false}，否则会出现问题
          【form表单内的input事件的enter事件触发时，浏览器会默认随机触发form表单内设置了button的click事件。
          (根据评论，或许可以通过设置button的type='button'来解决，因为浏览器默认button的type是submit。不过此法没去验证)】，详见下面链接：
          https://github.com/facebook/react/issues/3907
        */
        component={false}
        form={form}
        initialValues={initialValues}
        onValuesChange={(changedValues: any, values: any) => {
          console.log('changedValues', changedValues, values);
          triggerFormChange(changedValues, values);
          // setFormValues(values);
        }}
        {...props}
      />
    </ViewFormContext.Provider>
  );
};

function ViewFormItem (props: any) {
  const FormItemComponent = Form.Item;
  return <FormItemComponent {...props} />;
};

ViewForm.Item = ViewFormItem;

export default ViewForm;
