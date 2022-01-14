import { ActionHandlerProps, PopConfirmAction, EnumContinueType } from '@crv/utils/src/types';

export default ({
  config: {
    cancelBtnVisible,
    content,
    title,
    cancelText,
    okText,
    continueType = EnumContinueType.WAIT,
  }, inData, actionsData, actions, index,
  context: { history, modelId, refreshCallback }
}: ActionHandlerProps<PopConfirmAction>) => {
  return new Promise((resolve, reject) => {
    top?.Mainframe?.getprompt(
      {
        type: 'Modal',
        ok: true,
        cancel: cancelBtnVisible,
        message: content,
        title: title ?? '提示',
        ...(continueType === EnumContinueType.WAIT && {
          callback: ({ state }: any) => state ? resolve('') : reject(new Error()),
        }),
      },
      {
        okText,
        cancelText,
      }
    );
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
