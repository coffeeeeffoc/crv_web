import _ from 'lodash';
import { getType } from './utils';

/**
 *
 * 给json描述文件添加keySelectOptions和selectOptions
 * @param obj 遍历的对象
 * @param when 满足的条件的时机控制
 * @param args 传递给函数的参数
 */
export function executeFunc (obj, when, ...args) {
  const recursive = (data, parent, key) => {
    if (!data) return;

    switch (getType(data)) {
      case 'Object':
        Object.keys(data).map((k) => recursive(data[k], data, k));
        break;
      case 'Array':
        data.map((item, index) => recursive(item, data, index));
        break;
      case 'Function':
        if (!when || (when && when(parent, key))) {
          parent[key] = data(...args);
        }
        break;
      default:
        break;
    }
  };
  recursive(obj);
}
// selfModelFields, refModelFields
/**
 *
 * @description 遍历json描述文件，对配置的函数满足某种条件时执行，并传参
 * @param jsonDesc  json描述文件
 * @param args  执行函数时传递给函数的参数
 */
export default function preHandleDesc (jsonDesc, ...args) {
  const newJsonDesc = _.cloneDeep(jsonDesc);
  executeFunc(newJsonDesc, (obj, key) => ['keySelectOptions', 'selectOptions'].includes(key), ...args);
  return newJsonDesc;
}
