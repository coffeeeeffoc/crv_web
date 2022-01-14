import { hasOwn } from './utils';

/**
 * 深度判断两个对象是否相同,相同时，返回true
 */

export const isSameObj = (obj1: any, obj2: any, path = '', cacheSet = new Set()) => {
  if (!obj1 || !obj2) return obj1 === obj2;
  if (typeof obj1 !== typeof obj2) return false;
  if (typeof obj1 === 'object') {
    if (cacheSet.has(obj1)) {
      // 循环引用，不往下遍历
      return true;
    }
    cacheSet.add(obj1);
    const keys1 = Object.keys(obj1);
    const keys2 = Object.keys(obj2);
    if (keys1.length !== keys2.length) {
      return false;
    } else {
      for (const key in obj1) {
        if (!hasOwn(obj2, key)) {
          return false;
        }
        const compareKey = `${path}.${key}`;
        const equal = isSameObj(obj1[key], obj2[key], compareKey, cacheSet);
        if (!equal) {
          console.log('diff结果不同的键值的路径:', compareKey);
          return false;
        }
      }
      return true;
    }
  }
  return obj1 === obj2;
};
