// import { OPERATIONTYPE } from '@crv/model_config/src/pages/ModelEdit/tabs/Operation/CustomOperation/OperationStep/constants';
import type { Action, ActionsContext, ActionsDataType } from '@crv/utils/src/types';
import CALL_API from './actions/callApi';
import FORM_SWITCH from './actions/formSwitch';
import REFRESH from './actions/refresh';
import CLOSE_MODAL from './actions/closeModal';
import OPEN_MODAL from './actions/openModal';
import OPEN_TOP_TAB from './actions/openTopTab';
import POP_CONFIRM from './actions/popConfirm';
import { recursiveParseDynamicValue } from '@crv/utils/src/browser/dynamicValue';

const actionConfig = {
  FORM_SWITCH,
  CALL_API,
  REFRESH,
  CLOSE_MODAL,
  OPEN_MODAL,
  OPEN_TOP_TAB,
  POP_CONFIRM,
  // DATA_VALIDATION,
  // BULK_EDIT,
  // SAVE,
  // DELETE,
  // SOURCE_EXPORT,
  // SOURCE_IMPORT,
  // OPEN_CONFIRM,
  // CUSTOM_API,
  // CUSTOM_OPERATION,
};

export interface runActionsProps {
  actions: Action[];
  index?: number;
  actionsData?: ActionsDataType;
  context: ActionsContext;
  data: any;
  // 完成当前系列操作
  complete: Function;
  [propsName: string]: any;
};

export default async function runActions ({
  actions, index = 0, actionsData = [], data, context, filters: filter, complete,
}: runActionsProps) {
  // 空的action，不继续执行
  if (!actions || actions.length === 0) {
    return;
  }
  console.log('filters', filter);
  const currentAction = recursiveParseDynamicValue<Action>(actions[index]);
  const inData = {
    data,
    filter,
  };
  let result;
  try {
    result = await actionConfig[currentAction.stepType]({
      config: currentAction,
      context,
      inData,
      actionsData,
      actions,
      index,
    } as any);
  } catch (e) {
    // 当前action报错，异常结束
    complete();
    // 不执行后续操作
    return;
  }
  // 当运行到最后一个action时，终止
  if (index === actions.length - 1) {
    // 完成当前当前一系列操作，正常结束
    complete();
    return;
  }
  await runActions({
    actions,
    index: ++index,
    actionsData: [...actionsData, {
      in: inData,
      out: result,
    }],
    data,
    context,
    complete,
  });
};
