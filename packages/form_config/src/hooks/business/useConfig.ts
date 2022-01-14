import { useContext } from 'react';
import { ModelContext } from '@/context';
import type { Field, Operation } from '@/types';

// 所有字段配置
export const useFieldsConfig = (): Field[] => {
  const { model } = useContext(ModelContext);
  return model?.fields ?? ([] as Field[]);
};

// 根据id查找某个指定字段的配置
export const useFieldConfig = (id: string | number) => {
  const fields: Field[] = useFieldsConfig();
  return fields.find(item => item.id === id) as Field;
};

// 所有字段配置
export const useOperationsConfig = (): Operation[] => {
  const { model } = useContext(ModelContext);
  return model?.operations ?? ([] as Operation[]);
};

// 根据id查找某个指定字段的配置
export const useOperationConfig = (id: string | number) => {
  const operations: Operation[] = useOperationsConfig();
  return operations.find(item => item.id === id) as Operation;
};
