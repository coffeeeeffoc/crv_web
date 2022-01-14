import { ActionHandlerProps, OpenTopTabAction, EnumContinueType } from '@crv/utils/src/types';
import { getFormSwitchTargetUrl } from './formSwitch';

export default ({
  config, inData, actionsData, actions, index,
  context: { history, modelId, refreshCallback }
}: ActionHandlerProps<OpenTopTabAction>) => {
  const { continueType = EnumContinueType.WAIT, title } = config;
  const url = getFormSwitchTargetUrl({
    config,
    modelId,
    inData,
  });
  return new Promise((resolve, reject) => {
    top?.Mainframe?.openAsMenuApi({
      path: url,
      data: inData.data,
      title: title ?? 'new tab',
      ...(continueType === EnumContinueType.WAIT && {
        onDestroy: (data: any) => {
          resolve(data);
          // TODO:返回时，是否应该刷新，还是继续下一个action？待确定，再试既刷新又执行下一个action。至于会不会有冲突，则未可知。
          refreshCallback?.();
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
