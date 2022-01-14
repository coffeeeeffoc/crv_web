import { getTreeModelFields } from '@crv/utils/src/browser/business/fields';
import { useMemo } from 'react';

// 使用树形的模型
export const useTreeModel = (modelResult: any[]) => useMemo(() => getTreeModelFields(modelResult), [modelResult]);
