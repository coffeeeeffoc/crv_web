import { useQuery } from '@rc/hooks/basic/useRequest';
import { retrieveForm } from '@/services';
import { useAppDispatch } from '@/redux/hooks';
import { useEffect } from 'react';
import { canvasActions } from '@/redux/actions';
import { tryParse } from '@utils/browser/utils';

const convert = (result: any) => {
  const config = result?.config;
  return tryParse(config, {});
};

// 获取form表单详情
export const useFetchForm = ({
  match: {
    params: {
      modelId,
      formId,
    },
  },
}: any) => {
  const dispatch = useAppDispatch();
  const res = useQuery(['retrieveForm', modelId, formId], () => retrieveForm(modelId, formId), {
    enabled: !!(modelId && formId)
  });
  console.log('retrieveForm--Result', res);
  const result = res.data?.data?.result;
  // 将表单内容转换格式后设置到redux中
  useEffect(() => {
    if (result) {
      const convertedData = convert(result);
      dispatch(canvasActions.setMultiState({
        ...convertedData,
        currentAreaId: convertedData.areas.id,
      }));
    }
  }, [dispatch, result]);
  return result;
};
