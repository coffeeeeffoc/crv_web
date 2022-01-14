import Loading from '@rc/Loading';
import { useQuery } from '@rc/hooks/basic/useRequest';
import { retrieveModelForm } from '@/services';
import { useAppDispatch } from '@/redux/hooks';
import { canvasActions, layoutConfigSettingActions } from '@/redux/actions';
import { useEffect, useState, useCallback } from 'react';
import { ModelContext } from '@/context';
import message from '@utils/browser/message';
import { batch } from 'react-redux';
import produce from 'immer';
import { getDefaultWidgetByFieldType } from '@@/Elements/Widgets';
import { useTreeModel } from '@rc/hooks/business';

export const convertInitialAreaAdditions = (areaAdditions: any, model: any) => produce(areaAdditions, (draft: any) => {
  Object.keys(draft).forEach(k => {
    // 字段处理
    if (draft[k]?.field) {
      // 已被删除的字段不显示
      if (model.fields.findIndex(({ id }: any) => id === draft[k].field.field) === -1) {
        delete draft[k];
      } else {
        // 同字段的widget需要根据最新的字段格式重新设置，（因为有可能修改）
        draft[k].widget.id = getDefaultWidgetByFieldType(model.fields.find(({ id }: any) => id === draft[k].field.field)?.fieldType);
      }
    }
    // 操作处理
    if (draft[k]?.operationBar?.operations) {
      // 已被删除的操作不显示
      draft[k].operationBar.operations = draft[k]?.operationBar.operations.filter((operation: any) =>
        model.operations?.findIndex?.(({ id }: any) => id === operation.id) > -1
      )
        // 针对现有的operation，只取id
        .map(({ id }: any) => ({ id }));
    }
  });
});
export default (props: any) => {
  let {
    match: {
      params: {
        modelId,
        formId,
        editType,
        id,
      },
    },
    children,
  } = props;
  // 表单id为int，故需转换为Number
  formId = Number(formId);
  const dispatch = useAppDispatch();
  const modelResult = useQuery(['retrieveModelForm', modelId, formId], () => retrieveModelForm(modelId, formId), {
    enabled: !!(modelId && formId),
  });
  // 是表单展示而不是表单配置
  const isDisplayTypeView = !!editType;
  const modelRes = modelResult.data?.data?.result;
  const model = useTreeModel(modelRes);
  const formConfig = model?.forms?.find?.(({ id }: any) => id === formId);
  const [modelFormConfig, setModelFormConfig] = useState();
  const increaseVersion = useCallback(() => setModelFormConfig((v: any) => ({ ...v, version: ++v.version })), []);
  const isLoading = isDisplayTypeView &&
    (modelResult.isLoading || !modelFormConfig || modelFormConfig !== formConfig);
  useEffect(() => {
    setModelFormConfig(formConfig);
    if (formConfig) {
      if (formConfig.config && model) {
        const { layoutConfigSetting, areas, areaAdditions } = formConfig.config;
        batch(() => {
          dispatch(canvasActions.setMultiState({
            areas,
            areaAdditions: convertInitialAreaAdditions(areaAdditions, model),
            currentAreaId: areas.id,
          }));
          dispatch(layoutConfigSettingActions.setMultiState({
            ...(layoutConfigSetting?.additions && {
              additions: layoutConfigSetting.additions,
            }),
          }));
        });
      } else if (isDisplayTypeView) { // 表单展示时，表单配置为空需提醒
        message.warning('当前表单配置为空');
      }
    }
  }, [dispatch, isDisplayTypeView, formConfig, model]);
  console.log('ModalContainer',
    model,
    modelId,
    formId,
    modelFormConfig,
    formConfig,
    modelResult.isLoading,
    isLoading,
  );
  return isLoading
    ? <Loading/>
    : (
        <ModelContext.Provider value={{
          modelId,
          formId,
          model,
          increaseVersion,
          form: modelFormConfig,
          onModelFormChange: (val: any) => setModelFormConfig((v: any) => ({
            ...v,
            ...val,
          })),
          editType,
          id,
        }} >
          {children}
        </ModelContext.Provider>
      );
};
