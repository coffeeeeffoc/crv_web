import { useQuery } from '@rc/hooks/basic/useRequest';
import { getOneData } from '@/services';

export const useFetchOneData = (params: any, options?: any) => {
  const res = useQuery(['fetchOneData', ...Object.values(params)], () => getOneData(params), options);
  console.log('fetchOneData-result', res);
  return res.data?.data?.result?.[0]?.data;
};
