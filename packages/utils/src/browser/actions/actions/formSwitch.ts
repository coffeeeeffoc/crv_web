import { ActionHandlerProps, FormSwitchAction, EnumPageType, EnumInnerPageType, EnumFormSwitchMode, EnumEditType } from '@crv/utils/src/types';
import message from '@crv/utils/src/browser/message';
import { encodeMultiString } from '@crv/utils/src/browser/string';
import { getRealUrl } from '@crv/utils/../../../project.config.js';
// import { EnumProjectPublicUrl } from '@crv/utils/src/browser/projects';

// switch (process.env.PUBLIC_URL) {
//   case EnumProjectPublicUrl.crv_form_config:
//     break;
//   case EnumProjectPublicUrl.crv_model_view:

//     break;
// }

export const getFormSwitchTargetUrl = ({
  config,
  modelId,
  inData,
}: any) => {
  const dataIds = encodeMultiString(inData.data.map((item: any) => item.id));
  let url = '';
  if (config.pageType === EnumPageType.INNER_PAGE) {
    if (config.innerPageType === EnumInnerPageType.FORM) {
      url = `/crv_form_config/view/model/${config.modelId ?? modelId}/form/${config.formId ?? ''}/${(config.formType ?? EnumEditType.create).toLowerCase()}/${dataIds}`;
    } else if (config.innerPageType === EnumInnerPageType.VIEW) {
      url = `/crv_model_view/${config.modelId}/${config.viewId}`;
    }
  } else {
    url = config.externalPage ?? '';
  }
  url = getRealUrl(url);
  return url;
};

// 当前页面时iframe
const isPageHideTabIframe = location.search.includes('&hideTab=true');
const isPageModalIframe = location.search.includes('&modalIframe=true');

export default ({
  config, inData, actionsData, actions, index,
  context: { history, modelId, refreshCallback }
}: ActionHandlerProps<FormSwitchAction>) => {
  const currentFormData = inData.data;
  if (config.pageType === EnumPageType.GO_BACK) {
    if (isPageModalIframe) {
      top?.Mainframe?.setModelIframeDatasource(currentFormData);
    } else if (isPageHideTabIframe) {
      top?.Mainframe?.removeTabIframe({
        data: currentFormData,
      });
    } else {
      top?.Mainframe?.removeTabSelf(currentFormData);
    }
  } else {
    const url = getFormSwitchTargetUrl({
      config,
      modelId,
      inData,
    });
    let createModelIframeParams: any;
    if (config.switchMode === EnumFormSwitchMode.REPLACE) {
      url ? history.push(url) : message.warning('URL为空，无法切换跳转');
    } else {
      if (config.switchMode === EnumFormSwitchMode.MODAL) {
        createModelIframeParams = {
          visibleType: true,
        };
      } else {
        createModelIframeParams = {
          visibleType: false,
          openAsMenuApi: true,
          hideTab: {
            // 本页面的输入数据
            data: currentFormData,
            // 下面两个转换操作的函数，后续应该在界面提供配置方式
            // 对输入数据的转换，从而生成传递给新表单的数据
            newDataTransformer: (data: any) => data,
            // 对输出数据的转换，生成本表单对外返回的数据
            returnDataTransformer: (data: any) => data,
            // 再次返回本页面时，需要执行的刷新操作回调函数
            refreshCallback: refreshCallback,
            // refreshCallback: refreshCallback ?? ((newData: any[]) => { alert('returnback' + JSON.stringify(newData)); }),
          },
        };
      }
      (top?.Mainframe?.createModelIframe as any)({
        path: url,
        width: '80vw',
        height: '80vh',
        ...createModelIframeParams,
        data: {},
        callback: (data: any) => {
          console.log('refresh' + JSON.stringify(data));
        },
      });
    }
  }
};
