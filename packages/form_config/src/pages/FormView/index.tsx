import ModelContainer from '@/businessComponents/ModelContainer';
import { useFetchOneData, useFetchBatchData } from './hooks';
import { EditTypeContext, InitialPageDataContext, ModelContext } from '@/context';
import { useEffect, useContext } from 'react';
import { EnumEditType, EnumDisplayType } from '@/types';
import { message } from '@utils/browser/message';
import View from '@@/View';
import { decodeMultiString } from '@utils/browser/string';
import Loading from '@rc/Loading';
import { createGeneralQueryFields, createFormulaQueryFields } from '@utils/browser/business/fields';
import { useAppSelector } from '../../redux/hooks';

export const editTypes: EnumEditType[] = [
  EnumEditType.create,
  EnumEditType.edit,
  EnumEditType.detail,
  EnumEditType.batch,
  EnumEditType.copy
];

export const hasIdEditType: EnumEditType[] = [
  EnumEditType.edit,
  EnumEditType.detail,
  EnumEditType.batch,
  EnumEditType.copy
];

const FormView = (props: any) => {
  const { editType, id = '', modelId, formId } = props.match.params;
  const isBatch = editType === EnumEditType.batch;
  const willGetData = editType !== EnumEditType.create;
  const { model, form } = useContext(ModelContext);
  const areaAdditions = useAppSelector(state => state.canvas.areaAdditions);
  const modelFields = model?.fields ?? [];
  const displayFields = areaAdditions && Object.keys(areaAdditions).reduce((res: any, k) => {
    if (areaAdditions[k].field) {
      res.push(modelFields.find((item: any) => item.id === areaAdditions[k].field.field));
    }
    return res;
  }, []);
  const noRefFields = createGeneralQueryFields(displayFields);
  const formulaFields = createFormulaQueryFields(displayFields);
  const fields = [...new Set(noRefFields.map(item => item.id).concat(['id', 'version']))]
    .map(item => ({ id: item }))
    .concat(formulaFields);
  console.log('form--2', form, displayFields, fields, formulaFields);
  const notBatchData = useFetchOneData({ modelId, formId, fields, id }, {
    enabled: !!(willGetData && !isBatch && modelId && formId && fields.length && id),
  });
  const batchData: any[] = useFetchBatchData({ modelId, formId, id: decodeMultiString(id) }, {
    enabled: !!(willGetData && isBatch && modelId && formId && id.length),
  });
  useEffect(() => {
    if (hasIdEditType.includes(editType) && !id) {
      message.error(`url格式不正确：表单类型\${${editType}}对应的数据的id不能为空`);
    }
  }, [editType, id]);
  const data = isBatch ? batchData : notBatchData;
  const isLoading = willGetData && !data;
  return isLoading
    ? <Loading />
    : (
        <EditTypeContext.Provider value={editType} >
          <InitialPageDataContext.Provider
            value={{
              isBatch,
              data,
            }}
          >
            <View displayType={EnumDisplayType.view} />
          </InitialPageDataContext.Provider>
        </EditTypeContext.Provider>
      );
};

export default (props: any) => (
  <ModelContainer {...props} >
    <FormView {...props} />
  </ModelContainer>
);
