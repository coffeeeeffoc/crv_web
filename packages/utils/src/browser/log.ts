import { isDev, getTop } from './utils';
import { recordLog } from '../../../../project.config';

const defaultWillLog = (isDev ? recordLog : undefined) ?? [undefined, true].includes((getTop() as any).willLog);

window.willLog = defaultWillLog;

// 对console对象的所有函数，都加了一层判断
// Object.keys(console).forEach(key => {
//   const origin = (console as any)[key];
//   (console as any)[key] = (...args: any) => {
//     if (window.willLog) {
//       origin(...args);
//     }
//   };
// });
