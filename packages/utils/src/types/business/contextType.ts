import {
  // EnumDisplayType,
  EnumEditType,
  // EnumConfigEditType,
  // EnumWidgetDisplayType,
} from './business';

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
