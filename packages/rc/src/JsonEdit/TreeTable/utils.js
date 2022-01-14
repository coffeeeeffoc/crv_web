import { message } from 'antd';
import _ from 'lodash';
import { useRef, useEffect } from 'react';

/**
 * @description 根据path路径，找到对象obj对应的值
 * @param {Object|Array} obj 整体对象
 * @param {String} path 路径
 */
export const getValueByKey = (obj, path = '') => {
  const arr = path.split('.').filter(Boolean);
  let value = obj;
  for (let i = 0; i < arr.length; i++) {
    const key = arr[i];
    value = value[key];
  }
  return value;
};

// 自定义hooks，使用前一个值
export const usePrevious = (value) => {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
};

// 获取新数据中新增的键，返回值为数组格式
export const getNewAddKeys = (oldData, newData, keyPath) => {
  const prevCurrentVal = getValueByKey(oldData, keyPath);
  const newCurrentVal = getValueByKey(newData, keyPath);
  const prevAllKeys = Object.keys(prevCurrentVal);
  const newAllKeys = Object.keys(newCurrentVal);
  const addKeys = newAllKeys.filter((item) => !prevAllKeys.includes(item));
  return addKeys;
};

// 值符合valueType，（相等或者是数组的某个元素）
export const matchValueType = (val, valueType) => {
  const type = getType(val);
  return typeMatchValueType(type, valueType);
};
// 类型符合valueType，（相等或者是数组的某个元素）
export const typeMatchValueType = (type, valueType) => (typeof valueType === 'string' ? valueType === type : Object.keys(valueType).includes(type));

// 是否为undefined或者null
export const isEmpty = (obj) => [undefined, null].includes(obj);

/**
 * @description 根据描述文件，生成符合描述文件相应结构的新数据
 * @param {Object} _desc 描述文件
 */
export const addElement = (_desc, _batch = true, _newKey) => {
  const add = (desc = {}, batch = true, newKey) => {
    let result;
    const {
      valueType,
      objectKeys,
      location,
      childrenProps,
      locationAlias,
      selectOptions,
      defaultValue,
      multiSelect,
    } = desc;

    const setValue = (val) => (defaultValue === undefined ? val : defaultValue);

    if (typeof valueType === 'object') {
      const { valueType: xxx, ...rest } = desc;
      const firstValueType = Object.keys(valueType)[0];
      return add({
        ...rest,
        valueType: firstValueType,
        ...valueType[firstValueType],
      });
    }

    switch (valueType) {
      case 'Object':
        if (locationAlias) {
          const res = add(location[`.${locationAlias}`]);
          const key = newKey || ' ';
          return { [key]: res };
        }
        result = {};
        if (objectKeys) {
          const keys = batch ? (typeof objectKeys === 'function' ? objectKeys({}) : objectKeys) : [newKey];
          keys && keys.length && keys.forEach((key) => {
            result[key] = add(location[`.${key}`]);
          });
        }

        break;
      case 'String':
        result = '';
        result = setValue(result);
        break;
      case 'Array':
        // 多选时，不自动生成子元素内容；其他情况自动生成默认的空值
        result = multiSelect ? [] : [
          add(Array.isArray(childrenProps) ? childrenProps[0] : childrenProps),
        ];
        break;
      case 'Number':
        result = 0;
        result = setValue(result);
        break;
      case 'Boolean':
        result = false;
        result = setValue(result);
        break;
      case 'Null':
        result = null;
        result = setValue(result);
        break;
      default:
        break;
    }
    result = selectOptions ? typeof selectOptions[0] === 'object' ? selectOptions[0].key : (selectOptions[0] || result) : result;
    return result;
  };
  const result = add(_desc, _batch, _newKey);
  return result;
};

export const findTargetDataStep = ({ wholePath, data }) => {
  const arr = wholePath.split('.').slice(1).filter((item) => item !== '');
  const originalData = JSON.parse(JSON.stringify(data));
  let target = originalData;
  const step = [{ key: '', data: target }];
  for (let i = 0; i < arr.length; i++) {
    target = target[arr[i]];
    step.push({
      data: target,
      key: arr[i],
    });
  }
  return step;
};
/**
 * @description 根据包含整个路径的wholePath来确定位置，为目标对象新增一个新值
 * @param {Object} param0 wholePath为包含整个路径信息的字符串，data 为数据对象
 * @param {Object} param1 key为新生成对象的键，默认为空字符串，当对象为数组时默认为push新增一个元素，data为设置的新值
 */
export const addTargetData = ({ wholePath, data }, { key = ' ', data: targetData = null }) => {
  const step = findTargetDataStep({ wholePath, data });
  const target = step[step.length - 1].data;
  if (target) {
    if (Array.isArray(target)) {
      target.push(targetData);
    } else {
      if (step.length < 2) {
        return {
          ...step[step.length - 1].data,
          ...targetData,
        };
      }
      step[step.length - 2].data[step[step.length - 1].key] = {
        ...step[step.length - 2].data[step[step.length - 1].key],
        ...targetData,
      };
    }
  } else {
    step[step.length - 2].data[key] = targetData;
  }
  return step[0].data;
};
/**
 *
 * @param {Object} param0 wholePath为包含整个路径信息的字符串，data 为数据对象
 * @param {Object} param1 data为新值
 */
export const setTargetData = ({ wholePath, data }, { data: targetData = null }) => {
  const step = findTargetDataStep({ wholePath, data });
  if (step.length > 1) {
    step[step.length - 2].data[step[step.length - 1].key] = targetData;
  } else {
    step[step.length - 1].data = targetData;
  }
  return step[0].data;
};

/**
 * @description 删除数据data的指定路径wholePath的最后一个key对应的数据
 * @param {Object} param wholePath为全路径，data为需要删除的数据
 */
export const deleteTargetDataByKey = ({ wholePath, data }) => {
  const step = findTargetDataStep({ wholePath, data });
  const obj = step[step.length - 2].data;
  const { key } = step[step.length - 1];

  if (Array.isArray(obj)) {
    obj.splice(key, 1);
  } else {
    delete obj[key];
  }
  return step[0].data;
};

/**
 * @description 修改数据datga指定路径wholePath的最后一个键，设置为新的键key
 * @param {Object} param0 wholePath为包含整个路径信息的字符串，data为数据对象
 * @param {Object} param1 key为新的key
 */
export const changeKeyOfTargetData = ({ wholePath, data }, { key }) => {
  const step = findTargetDataStep({ wholePath, data });
  step[step.length - 2].data[key] = step[step.length - 1].data;
  delete step[step.length - 2].data[step[step.length - 1].key];
  return step[0].data;
};

/**
 * @description 处理联动
 */
export const callTrigger = ({ trigger, type, args }) => {
  let res = args.data;
  if (!trigger) return res;
  const handle = ({ callback }) => {
    res = callback(args);
  };
  try {
    if (Array.isArray(trigger)) {
      trigger.filter((item) => item.type === type).map(handle);
    } else if (trigger.type === type) {
      handle(trigger);
    }
  } catch (e) {
    message.error('联动发生错误');
  }
  return res;
};

/**
 * @description 传参后执行，返回一个函数，来应对值变化时的处理
 * @returns {Function}
 * @param {Object} param0 必要的参数
 */
export const setHandleValueChange = ({
  setData,
  wholePath,
  trigger,
  executeFuncParam,
}) => (value) => {
  setData((data) => {
    if (trigger) {
      return callTrigger({
        trigger,
        type: 'valueChange',
        args: {
          ...executeFuncParam,
          value,
        },
      });
    }
    return setTargetData({ wholePath, data }, { data: value });
  });
};

export const getType = (param) => {
  const str = Object.prototype.toString.call(param);
  return str.slice(8, str.length - 1);
};

// 比较前后值的变化
export const compareDiff = (data, prevData) => {
  const result = [];
  const loop = (newData, oldData, pos = '') => {
    const config = {
      object: () => {
        if (typeof oldData !== 'object' || isEmpty(oldData)) return;

        const oldDataKey = Object.keys(oldData);
        Object.keys(newData).forEach((k) => {
          if (oldDataKey.includes(k)) {
            loop(newData[k], oldData[k], `${pos}.${k}`);
          }
        });
      },
      string: () => newData === oldData,
      number: () => newData === oldData,
      boolean: () => newData === oldData,
      undefiend: () => newData === oldData,
    };

    !config[typeof (newData)]() && result.push(pos);
  };
  loop(data, prevData);
  return result;
};

export const executeDescFunc = (data, setData, otherParam) => (desc, wholePath) => {
  const stepData = findTargetDataStep({ wholePath, data });
  const executeFuncParam = {
    otherParam,
    data,
    setData,
    getStepByKey: findTargetDataStep,
    wholePath,
    stepData,
    value: stepData[stepData.length - 1].data,
  };
  const newDesc = _.cloneDeep(desc);
  Object.keys(newDesc).forEach((k) => {
    typeof (newDesc[k]) === 'function' && (newDesc[k] = newDesc[k](executeFuncParam));
  });
  return [newDesc, executeFuncParam];
};

export const loopExecuteDescFunc = (desc, otherParam) => {
  const newDesc = _.cloneDeep(desc);
  const params = { ...otherParam };
  const loop = (obj, parent, parentKey) => {
    switch (true) {
      case undefined === obj:
      case obj === null:
      case parentKey === 'trigger':
        // 触发联动的函数，在此时无需执行
        return;
      case typeof obj === 'function':
        parent[parentKey] = obj(params);
        loop(parent[parentKey], parent, parentKey);
        break;
      case Array.isArray(obj):
        obj.forEach((item, index) => loop(item, obj, index));
        break;
      case typeof obj === 'object':
        Object.keys(obj).forEach((key) => loop(obj[key], obj, key));
        break;
      default:
        break;
    }
  };
  loop(newDesc);
  return newDesc;
};
