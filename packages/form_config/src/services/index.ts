import {
  retrieveModelsUrl,
  retrieveModelUrl,
  retrieveModelFormUrl,
  retrieveFormUrl,
  saveFormUrl,
  getBatchDataUrl,
  commonRequestUrl,
} from './apis';
import { autoErrorPost as post } from '@utils/browser/request';

export const retrieveModels = (param?: any) => post(retrieveModelsUrl, param);

export const retrieveModel = (id: string) => post(retrieveModelUrl, {
  model: {
    id,
  },
});

// 查询指定模型、指定表单的相关配置信息
export const retrieveModelForm = (id: string, formId: string) => post(retrieveModelFormUrl, {
  baseInfo: false,
  requireRefModel: true,
  modelId: id,
  fields: [],
  operations: [],
  forms: [formId],
});

// 查询模型有哪些表单
export const retrieveModelForms = (id: string) => post(retrieveModelFormUrl, {
  baseInfo: true,
  modelId: id,
  forms: [],
});

export const retrieveForm = (id: string, formId: string) => post(retrieveFormUrl, {
  model: {
    id,
  },
  formId,
});
export const saveForm = ({ id, formId, data }: { id: string; formId: string; data: any }) => post(saveFormUrl, {
  model: {
    id,
  },
  formId,
  data,
});

export const getOneData = ({ modelId, id, fields }: any = {}) => post(commonRequestUrl, [{
  model: modelId,
  type: 'query',
  fields: fields ?? [],
  filter: {
    id: {
      $eq: id,
    },
  },
}]);
export const getBatchData = (params: any = {}) => post(getBatchDataUrl, params);
