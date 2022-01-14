import { Select } from 'antd';
import { useQuery } from '@rc/hooks/basic/useRequest';
import { filterOption } from '@rc/RefWidget';
import { modelRetrieveRequireUrl } from '@utils/browser/business/api';
import { post } from '@utils/browser/request';
import { forwardRef, useEffect } from 'react';

export default forwardRef<any, any>(({
  modelId,
  selectProps,
}, ref) => {
  const formResult = useQuery(['retrieveModelForm', modelId], () => post(modelRetrieveRequireUrl, {
    baseInfo: false,
    modelId,
    views: [],
  }), {
    enabled: !!(modelId),
  });
  useEffect(() => {
    console.log('selectView');
  }, []);
  const viewList: any[] = formResult.data?.data?.result?.[0]?.views ?? [];
  const options = viewList.map(({ id, name, statement }: any) => ({
    value: id,
    label: name,
    title: [id, name, statement].join('\n'),
  }));
  if (selectProps?.editing === false) {
    return options.find((item: any) => item.value === selectProps.value)?.label ?? null;
  }
  return (
    <Select {...{
      ref,
      placeholder: '请选择视图',
      filterOption,
      showSearch: true,
      allowClear: true,
      options,
      ...selectProps,
    }} />
  );
});
