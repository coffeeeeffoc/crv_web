import { useAppSelector } from '@/redux/hooks';
import { useFieldConfig } from '@/hooks';

// 获取当前区域的currentAddition
export const useCurrentAddition = () => {
  const currentAddition = useAppSelector(state => state.canvas.areaAdditions[state.canvas.currentAreaId]);
  return currentAddition;
};

// 获取当前区域的currentAddition对应的字段配置
export const useAdditionFieldConfig = () => {
  const currentAddition = useCurrentAddition();
  const fieldConfig = useFieldConfig(currentAddition?.field?.field);
  return fieldConfig;
};
