import { produce } from 'immer';

// 是否开发环境
export const isDev: boolean = process.env.NODE_ENV === 'development';

// 获取顶级页面的window对象
export const getTop = () => {
  try {
    // 防止跨域时报错
    return window.top;
  } catch (e) {
    return window;
  }
};

// 当前页面是否是顶级页面
export const isTop = getTop() === window;

/**
 *
 * @param {string} str 待解析的字符串
 * @param {any} defaultValue 解析出错时的返回值
 * @returns object | any
 */
export const tryParse = (str: string, defaultValue: any = null) => {
  try {
    return JSON.parse(str);
  } catch (e) {
    console.log(`解析字符串出错：[${str}]`);
    return defaultValue;
  }
};

// 执行脚本字符串
export const tryEval = (str: string, defaultValue: any = null) => {
  try {
    // eslint-disable-next-line no-eval
    return eval(str);
  } catch (e) {
    console.log(`eval执行字符串出错：[${str}]`);
    return defaultValue;
  }
};

// 获取一个变量的类型
export const getType = (obj: any): string => (Object as any).prototype.toString.call(obj).match(/^\[object (.+)\]$/)[1];

// 是否是基本的对象（字面量对象，不包括null/function/类的实例等对象）
export const isObject = (obj: any) => getType(obj) === 'Object';

// 是否是数组
export const isArray = (obj: any) => getType(obj) === 'Array';

// 一个对象，是否拥有指定的某些key作为属性
export const hasKeys = (target: object, keys: string[] = []) => keys.every(key => key in target);

// 是否是事件对象实例
export const isEventInstance = (e: any): boolean => {
  if (getType(e) === 'Object' && hasKeys(e, 'bubbles cancelable eventPhase isTrusted nativeEvent target timeStamp type currentTarget defaultPrevented'.split(' '))) {
    return true;
  }
  return false;
};

// 解析事件对象
export const parseEventParam = (e: any): any => isEventInstance(e) ? e.target?.value : e;

// 获取当前激活的dom元素
export const getActiveElement = () => {
  let { activeElement } = document;
  while (activeElement?.shadowRoot) {
    activeElement = activeElement.shadowRoot.activeElement;
  }
  return activeElement;
};

// 获取特殊的设置类型的值的类型
export const getSpecialValueType = (val: string) => val.match(/^([a-zA-Z]+)\(\w*\)$/)?.[1];

// 解析特殊的设置类型的值
export const parseTypeValue = (val: any): any => {
  if (getType(val) === 'String') {
    const type = getSpecialValueType(val);
    switch (type) {
      case 'Boolean':
      case 'Number':
        return tryEval(val);
      case 'NULL':
        return null;
      case 'Function':
        return tryEval(val)?.();
    }
    return val;
  } else if (Array.isArray(val)) {
    return val.map(parseTypeValue);
  }
  return val;
};

// 数组每项之间添加同样的一项
export const joinArr = (arr: any[], item: any): any[] =>
  arr.map(i => [item, i]).flat().slice(1);

// 根据映射maps，设置目标对象target中字段field的值value，并返回新的target。主要针对不能直接修改state的场景
export const setValueByPath = <T>({
  target,
  field,
  value,
  maps,
}: {
  target: T;
  field: any;
  value: any;
  maps: {
    [key: string]: string;
  };
}): T => {
  const path: string | undefined = (maps as any)[field];
  if (path) {
    let validPath = true;
    const newTarget = produce(target, (draft) => {
      const arr = path.split('.');
      const lastKeyParent = arr.slice(0, arr.length - 1).reduce((obj: any, key) => {
        if (obj[key]) {
          return obj[key];
        } else {
          validPath = false;
          return {};
        }
      }, draft);
      lastKeyParent[arr[arr.length - 1]] = value;
    });
    // 若路径有效则返回新值，否则返回原始值
    return validPath ? newTarget : target;
  }
  return target;
};

// 是否拥有某一级属性
export const hasOwn = (obj: any, key: string) => {
  if (!obj) {
    return false;
  }
  if (Object.hasOwn) {
    return Object.hasOwn(obj, key);
  } else {
    return Object.keys(obj).includes(key);
  }
};

interface GetDescendantPropOptions {
  separator?: string;
  // 返回最终结果，还是返回一个数组（数组元素1表示路径是否有错，元素2表示最终结果）
  finalResult?: boolean;
};

// 获取级联属性的值，比如obj = {a: {b: {c: 0}}}; desc = "a.b.c";获取到的值为0
// 分隔符默认为.符号，可以通过separator指定
// 为了避免返回null时无法区分null是合理值还是出错值，返回值格式改为数组，第一个元素表示成功与否，第二个元素表示返回结果
export const getDescendantProp = (obj: any, desc: string, options?: GetDescendantPropOptions) => {
  const { separator = '.', finalResult = false } = options ?? {};
  let result;
  if (!obj) {
    result = [false, null];
  } else {
    let hasInvalidPath = false;
    const arr = desc.split(separator);
    while (arr.length) {
      const key = arr.shift() as string;
      if (!hasOwn(obj, key)) {
        hasInvalidPath = true;
        break;
      }
      obj = obj[key];
    }
    result = hasInvalidPath ? [false, null] : [true, obj];
  }
  return finalResult ? result[1] : result;
};

interface SetDescendantPropOptions {
  autoGenerateProp?: boolean;
};
// 设置级联属性的值，比如obj = {a: {b: {c: 0}}}; desc = "a.b.c"; value = 1; 则obj => {a: {b: {c: 1}}};
export const setDescendantProp = (obj: any, desc: string, value: any, options?: SetDescendantPropOptions) => {
  const { autoGenerateProp = true } = options ?? {};
  const arr = desc.split('.');
  let hasInvalidPath = false;
  while (arr.length > 1) {
    const key = arr.shift() as string;
    if (!hasOwn(obj, key)) {
      if (autoGenerateProp) {
        obj[key] = {};
      } else {
        hasInvalidPath = true;
        break;
      }
    }
    obj = obj[key];
  }
  return hasInvalidPath ? [false, obj] : [true, (obj[arr[0]] = value)];
};

export const isFunctionStr = (str: string) => !!str.match(/\s*function\s*\([\s\S]*\)\s*\{([\s\S]*)\}|\s*\([\s\S]*\)\s*=>\s*[\s\S]*/);

type MapType = string | string[] | {
  [key: string]: string;
};

// 选取对象中指定的属性，若不存在该属性则不选取
// 其中map既可为字符串数组['a', 'b', 'c'],也可为对象{a: 'obj.q.a', b: 'obj.b', c: 'c'}等格式
export const pickProps = (obj: any, map: MapType, options?: any): any => {
  if (getType(obj) === 'Object') {
    const { separator = '.', ignoreInvalid = false } = options ?? {};
    // 数组转化为对象格式来处理
    const mapConfig = typeof map === 'string'
      ? { [map]: map }
      : Array.isArray(map)
        ? map.reduce((res, k) => ({ ...res, [k]: k }), {})
        : map;
    return Object.keys(mapConfig).reduce((res, key) => {
      const [success, val] = getDescendantProp(obj, mapConfig[key], { separator });
      const addKey = !ignoreInvalid || (ignoreInvalid && success);
      const resultKey = key.split(separator).reverse()[0];
      return addKey
        ? {
            ...res,
            [resultKey]: val,
          }
        : res;
    }, {});
  }
  return {};
};

// 移除对象中的undefined
export const removeUndefined = (obj: any) => obj ? tryParse(JSON.stringify(obj), obj) : obj;
