import { useQuery } from '@rc/hooks/basic/useRequest';
import { getBatchData } from '@/services';

export const useFetchBatchData = (params: any, options?: any) => {
  const { data: { data } = {} } = useQuery('fetchBatchData', () => getBatchData(params), options);
  return data;
};
