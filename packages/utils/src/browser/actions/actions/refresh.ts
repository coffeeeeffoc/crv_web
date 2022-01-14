import { ActionHandlerProps, RefreshAction } from '@crv/utils/src/types';

export default ({ config, inData, actionsData, actions, index, context: { history, modelId, refreshCallback } }: ActionHandlerProps<RefreshAction>) => {
  return refreshCallback?.();
};
