import { createContext } from 'react';
import { EnumDisplayType, EnumEditType, EnumConfigEditType, EnumWidgetDisplayType } from '@crv/form_config/src/types';
import type { AreaState } from '@crv/form_config/src/types';

// 显示类型，用于区分组件处于: edit编辑配置、preview预览等状态
export const DisplayTypeContext = createContext<EnumDisplayType>(EnumDisplayType.config);

// 控件显示类型
export const WidgetDisplayTypeContext = createContext<EnumWidgetDisplayType>(EnumWidgetDisplayType.form);

export interface ModelContextType {
  modelId: string;
  formId?: string;
  onModelFormChange?: (val: any) => void;
  model: any;
  form?: any;
  editType: EnumEditType;
  id?: number | string;
  // 自增版本号
  increaseVersion?: Function;
};

// 模型相关信息
export const ModelContext = createContext<ModelContextType>({
  modelId: '',
  formId: '',
  model: null,
  form: null,
  editType: EnumEditType.create,
});

// 表单展示的编辑类型
export const EditTypeContext = createContext<EnumEditType>(EnumEditType.create);

// 表单配置的编辑类型
export const ConfigEditTypeContext = createContext<EnumConfigEditType>(EnumConfigEditType.create);

interface InitialPageDataContextType {
  isBatch: boolean;
  data: any;
};

// 初始的页面数据（编辑、详情等带入进来的id对应的数据，以及后续可能的直接携带过来的数据）
export const InitialPageDataContext = createContext<InitialPageDataContextType>({
  isBatch: false,
  data: null,
});

// 展示表单的实际表单数据
export const ViewFormContext = createContext<any>(null);

// 画布区域上下文
export const AreaContext = createContext<Pick<AreaState, 'id'>>({
  id: '',
});
