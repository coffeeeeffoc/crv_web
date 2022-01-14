import { ActionHandlerProps, OpenModalAction, EnumContinueType } from '@crv/utils/src/types';
import { getFormSwitchTargetUrl } from './formSwitch';

export default ({
  context: { history, modelId, refreshCallback },
  config,
  inData, actionsData, actions, index,
}: ActionHandlerProps<OpenModalAction>) => {
  const {
    width,
    height,
    title,
    maskClosable,
    continueType = EnumContinueType.WAIT,
  } = config;
  const url = getFormSwitchTargetUrl({
    config,
    modelId,
    inData,
  });
  return new Promise((resolve, reject) => {
    top?.Mainframe?.createModelIframe({
      path: url,
      data: inData.data,
      width,
      height,
      title,
      maskClosable,
      ...(continueType === EnumContinueType.WAIT && {
        // TODO:此处回调处理数据后续可能修改
        callback: (data: any) => {
          console.log('openModal_callback');
          resolve(data);
        },
        onCancel: () => {
          reject(new Error());
        },
      }),
    });
    switch (continueType) {
      case EnumContinueType.CONTINUE:
        resolve('');
        break;
      case EnumContinueType.STOP:
        reject(new Error());
        break;
    }
  });
};
