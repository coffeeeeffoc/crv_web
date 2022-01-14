import { ActionHandlerProps, CloseModalAction, EnumContinueType } from '@crv/utils/src/types';

export default ({
  context: { history, modelId, refreshCallback },
  config: {
    returnState,
    returnDataEnabled,
    continueType = EnumContinueType.WAIT,
  },
  inData, actionsData, actions, index,
}: ActionHandlerProps<CloseModalAction>) => {
  return new Promise((resolve, reject) => {
    top?.Mainframe?.setModelIframeDatasource({
      state: returnState,
      ...(returnDataEnabled && {
        currentData: inData.data,
      }),
    });
    switch (continueType) {
      case EnumContinueType.CONTINUE:
      case EnumContinueType.WAIT:
        resolve('');
        break;
      case EnumContinueType.STOP:
        reject(new Error());
        break;
    }
  });
  // 此处不返回Promise.reject()，则可以继续执行后续操作步骤
};
