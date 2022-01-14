import { Select, Button } from 'antd';
import { useQuery } from '@rc/hooks/basic/useRequest';
import { retrieveModels, retrieveModelForms } from '@/services';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './index.less';

const { Option } = Select;

const filterOption = (inputValue: any, { value, children }: any) => value?.includes(inputValue) || children?.includes(inputValue);

export default () => {
  const modelResult = useQuery('retrieveModels', () => retrieveModels({}));
  const modelList: any[] = modelResult.data?.data?.result?.list ?? [];
  const [modelId, setModelId] = useState('');
  const [formId, setFormIdId] = useState('');
  const formResult = useQuery(['retrieveModelForm', modelId], () => retrieveModelForms(modelId), {
    enabled: !!(modelId),
  });
  console.log('modelId', modelId);
  const formList: any[] = formResult.data?.data?.result?.[0]?.forms ?? [];
  return (
    <div className={styles.selectModel} >
      <div >
        <Select
          placeholder='请选择模型'
          loading={modelResult.isLoading}
          onChange={(val: any) => setModelId(val)}
          filterOption={filterOption}
          showSearch
          allowClear
        >
          {modelList.map(({ id, name }) => (
            <Option key={id} value={id} >{`${id} || ${name}`}</Option>
          ))}
        </Select>
        <Button
          disabled={!modelId}
          type='primary'
        >
          <Link to={`/config/model/${modelId}/create`} >新增</Link>
        </Button>
      </div>
      <div>
        <Select
          disabled={!modelId}
          placeholder='请选择编辑表单'
          loading={formResult.isLoading}
          onChange={(val: any) => setFormIdId(val)}
          filterOption={filterOption}
          showSearch
          allowClear
        >
          {formList.map(({ id, name }) => (
            <Option key={id} value={id} >{`${id} || ${name}`}</Option>
          ))}
        </Select>
        <Button
          disabled={!modelId || !formId}
          type='primary'
        >
          <Link to={`/config/model/${modelId}/form/${formId}`}>编辑</Link>
        </Button>
      </div>
    </div>
  );
};
