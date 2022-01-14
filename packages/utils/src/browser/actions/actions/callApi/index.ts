/* eslint-disable @typescript-eslint/restrict-plus-operands */
import request from '@crv/utils/src/browser/request';
import message from '@crv/utils/src/browser/message';
import {
  EnumCallApiType,
  CallApiAction,
  ActionHandlerProps,
} from '@crv/utils/src/types';
import handleInnerApi from './handleInnerApi';
import setData from './setData';

export const COMMON_REQUEST_URL = '/crvserviceview/data';

export default ({ config, inData, actionsData, actions, index, context }: ActionHandlerProps<CallApiAction>) => {
  let url;
  const {
    mergeData,
    callApiType,
    showError,
    innerApi,
    showSuccess,
    setFieldValue,
    externalPage,
    options,
    successContinue = true,
    errorContinue = false,
    alwaysContinue = false,
  } = config;
  let data: any = setData({
    data: inData.data,
    mergeData,
    updateData: setFieldValue,
  });
  if (callApiType === EnumCallApiType.INNER_API) {
    if (!innerApi) {
      message.error('内部API的type为空，无法发请求');
      return Promise.reject(new Error());
    }
    // 固定的一个接口
    url = COMMON_REQUEST_URL;
    data = handleInnerApi({ context, model: context.modelId, type: innerApi, data, filter: inData.filter });
  } else if (callApiType === EnumCallApiType.EXTERNAL_API) {
    url = externalPage;
  }
  if (!url) {
    message.error(`callaApi操作[第${actionsData.length + 2}个操作]的url为空`);
    return Promise.reject(new Error());
  }
  return request({
    url,
    method: 'POST',
    data,
    ...options,
  }).then(res => {
    // 状态码status为200，按成功处理
    if (res.data?.status === 200) {
      showSuccess && message.success(res.data?.message ?? '请求成功');
      // 若接口返回action，则续接入原action
      if (res.data?.actions) actions.splice(index + 1, 0, res.data?.actions);
      // 根据参数，控制是否继续下一个action
      if (!alwaysContinue && !successContinue) {
        return new Promise(() => {});
      }
      // 默认继续下一个action
      return res;
    }
    // 状态码不对，按错误处理
    return Promise.reject(res);
  }).catch(res => {
    showError && message.error(res?.data?.message ?? '请求失败');
    // 根据参数，控制是否继续下一个action
    if (alwaysContinue ?? errorContinue) {
      return Promise.resolve(res);
    }
    // 默认拒绝下一个action
    return Promise.reject(res);
  });
};
