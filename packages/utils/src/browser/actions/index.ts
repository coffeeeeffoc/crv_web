import { throttle } from '@crv/utils/src/browser/optimize';
import type { runActionsProps } from './runActions';
import runActions from './runActions';

export {
  runActions,
};

// 对每个操作进行节流，本应在每个操作的onClick进行节流处理。为提供统一的节流处理，每处操作应创建一个本类的示例
export default class Action {
  completed = true;
  // 当一系列操作正常结束，或者异常结束时，都应执行complete函数
  complete = () => {
    this.completed = true;
  };

  run = throttle((args: Exclude<runActionsProps, 'complete'>) => {
    // 设置实例状态，若当前实例的前一系列操作尚未完成，则不执行下一系列操作
    if (this.completed) {
      this.completed = false;
      runActions({
        ...args,
        complete: this.complete,
      });
    }
  }, 1000);
};
