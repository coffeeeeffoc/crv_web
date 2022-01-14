import message from '@utils/browser/message';
import { useThrottle } from '@utils/browser/hooks';
import { FormInstance } from 'antd';
import _ from 'lodash';
import { useRef, useCallback } from 'react';
import { deduplicate } from '@utils/browser/array';
import { getExpressionFields, parseFormulaValue } from '@utils/browser/dynamicValue';
import { EnumTriggerType, FormulaConfigType } from '@@/Panels/PropertyDetail/properties/Field/FrontendFormulaConfig';
import { Field } from '@utils/types';
import { getProxyFieldsValue } from '@rc/RefWidget/utils';

interface AnyDepType {
  [key: string]: {
    dependencies?: string[];
    formula?: FormulaConfigType;
    forceRender?: () => void;
    fieldConfig?: Field;
  };
};
interface DepFormulaType {
  [key: string]: {
    dependencies: string[];
  };
};
interface DepType {
  [key: string]: {
    forceRender?: () => void;
  };
};
interface TriggerType {
  [key: string]: string[];
};

interface CollectDependenceCallback {
  field: string;
  forceRender?: () => void;
  dependencies: string[];
  formula: FormulaConfigType;
  fieldConfig: Field;
};

// 判断是否存在循环依赖（暂时只考虑一层表单，对于嵌套的表单的循环判断，后面再添加逻辑判断）
const checkCircleDeps = (depObj: DepFormulaType): [boolean, string[]] => {
  const visited: { [key: string]: boolean } = {};
  let hasCircleDep = false;
  const deps: string[] = [];
  const loop = (key: string) => {
    if (hasCircleDep) {
      return;
    }
    if (visited[key]) {
      hasCircleDep = true;
      // 删除循环的key前面的key
      deps.splice(0, deps.indexOf(key));
      return;
    }
    visited[key] = true;
    deps.push(key);
    if (depObj[key]) {
      for (const dependenciesKey of depObj[key].dependencies) {
        if (hasCircleDep) {
          return;
        }
        loop(dependenciesKey);
      }
    }
    deps.pop();
    visited[key] = false;
  };
  Object.keys(depObj).forEach(depKey => {
    loop(depKey);
  });
  return [hasCircleDep, deps];
};

// 处理触发函数
const handleTriggerFn = ({
  triggerType,
  triggerActiveFn,
  triggerPassiveFn,
}: any) => {
  switch (triggerType) {
    case EnumTriggerType.active:
      triggerActiveFn();
      break;
    case EnumTriggerType.passive:
      triggerPassiveFn();
      break;
    case EnumTriggerType.activeAndPassive:
      triggerActiveFn();
      triggerPassiveFn();
      break;
    case EnumTriggerType.passiveAndActive:
      triggerPassiveFn();
      triggerActiveFn();
      break;
    case EnumTriggerType.none:
    default:
      break;
  }
};

// 收集本表单所有依赖关系
export const useDependencies = (form: FormInstance) => {
  const anyDependenciesRef = useRef<AnyDepType>({});
  const fieldPropsDependenciesRef = useRef<DepType>({});
  const formulaDependenciesRef = useRef<DepFormulaType>({});
  const fieldTriggerRef = useRef<TriggerType>({});
  const formulaTriggerRef = useRef<TriggerType>({}); // 根据前端公式触发
  const collectDependence = useCallback(({
    field, forceRender, dependencies: initialDependencies, formula, fieldConfig,
  }: CollectDependenceCallback) => {
    const formulaDependencies = getExpressionFields(formula?.formula ?? '');
    const dependencies = deduplicate([...initialDependencies, ...formulaDependencies]);
    // 校验【被动公式的依赖是否存在循环依赖】
    const [hasCircleDep, deps] = checkCircleDeps({
      ...formulaDependenciesRef.current,
      [field]: {
        dependencies: formulaDependencies,
      },
    });
    // 若存在循环依赖则报错提示
    if (hasCircleDep) {
      message.error(`字段[${field}]配置的依赖字段与其他字段[${deps.join('->')}]存在循环依赖`);
      return;
    }
    // 被动公式的依赖发生变化时需要设置表单的值；故将依赖关系、触发关系，分别存储到formulaDependenciesRef、formulaTriggerRef中
    formulaDependenciesRef.current[field] = {
      dependencies: formulaDependencies,
    };
    formulaDependencies.forEach(dep => {
      formulaTriggerRef.current[dep] = formulaTriggerRef.current[dep] ?? [];
      if (!formulaTriggerRef.current[dep].includes(field)) {
        formulaTriggerRef.current[dep].push(field);
      }
    });
    // 属性的依赖发生变化时，不论是否包含被动公式，都需要刷新一下；故将依赖关系、触发关系，分别存储到fieldPropsDependenciesRef、fieldTriggerRef中
    if (dependencies?.length) {
      fieldPropsDependenciesRef.current[field] = {
        forceRender,
      };
      dependencies.forEach(dep => {
        fieldTriggerRef.current[dep] = fieldTriggerRef.current[dep] ?? [];
        if (!fieldTriggerRef.current[dep].includes(field)) {
          fieldTriggerRef.current[dep].push(field);
        }
      });
    }
    anyDependenciesRef.current[field] = {
      dependencies: initialDependencies,
      formula,
      forceRender,
      fieldConfig,
    };
  }, []);
  const triggerFormChange = useThrottle((changedValues: any, values: any) => {
    try {
      /**
        这里不确定深拷贝的必要性，暂列出部分可能（1.在后续执行过程中可能报错，导致直接修改了values的内部的值，而还没来得及调用setFieldsValue。
        而深拷贝则能避免造成这种潜在的不一致的问题）
      */
      const tempValues = _.cloneDeep(values);
      const configBus: any = new Proxy(anyDependenciesRef.current, {
        get: (target, key: string, receiver: any) => {
          return target[key].fieldConfig;
        },
      });
      const tempValuesProxy = getProxyFieldsValue({
        configBus,
        values: tempValues,
      });
      const triggeredRenderSet = new Set();
      const triggerPassive = (k: string, initialValues: any) => {
        // 触发被动公式
        formulaTriggerRef.current?.[k]?.reduce((tempBatchValues: any, depKey) => {
          const { formula, triggerType } = anyDependenciesRef.current[depKey]?.formula ?? {};
          // 被动公式存在，且触发类型中可以触发被动时，会触发
          if (formula && triggerType && [EnumTriggerType.activeAndPassive, EnumTriggerType.passive, EnumTriggerType.passiveAndActive].includes(triggerType)) {
            // 被触发时的基准表单值是触发时的表单值与触发后动态的表单值的叠加值
            const basisValues = {
              ...tempValuesProxy,
              ...tempBatchValues,
            };
            // 修改依赖本字段的表单字段depKey的表单值
            tempBatchValues[depKey] = parseFormulaValue(formula, basisValues);
            // 递归触发被动公式
            triggerPassive(depKey, initialValues);
          }
          return tempBatchValues;
        }, initialValues);
      };
      // Object.keys(changedValues)此处按只有一个键值对来处理，
      const finalBatchValues = Object.keys(changedValues).reduce((batchValues: any, key) => {
        const { active, triggerType = EnumTriggerType.activeAndPassive } = anyDependenciesRef.current[key]?.formula ?? {};
        const triggerActiveFn = () => {
          // 触发主动公式
          if (active) {
            active.forEach?.(({ target, formula }) => {
              // 主动触发时的基准表单值是触发时的表单值
              const basisValues = tempValuesProxy;
              batchValues[target] = parseFormulaValue(formula, basisValues);
            });
          }
        };
        const triggerPassiveFn = () => {
          triggerPassive(key, batchValues);
        };
        handleTriggerFn({
          triggerType,
          triggerActiveFn,
          triggerPassiveFn,
        });
        return batchValues;
      }, {});
      // TODO:嵌套的表单内的值怎么设置？怎么更新？
      // 算出的最终需要更新值的这些字段以及新值，设置到表单中
      form.setFieldsValue(finalBatchValues);
      // 树状深度优先遍历，触发渲染
      const triggerBatchRender = (key: string) => {
        fieldTriggerRef.current[key]?.forEach?.(k => {
          if (triggeredRenderSet.has(k)) {
            return;
          }
          triggeredRenderSet.add(k);
          // 受影响的字段刷新
          fieldPropsDependenciesRef.current[k]?.forceRender?.();
          // 受影响的字段如果会影响自他字段的话，触发其他字段的刷新
          if (k in fieldTriggerRef.current) {
            triggerBatchRender(k);
          }
        });
      };
      // 不论属性或者值，被动受到影响的字段都要重新刷新
      Object.keys(changedValues).forEach(key => {
        triggerBatchRender(key);
      });
    } catch (e) {
      message.error('表单联动时发生错误，详细错误请按F12见Console控制台');
      console.error(e);
    }
  }, 100);
  return {
    collectDependence,
    triggerFormChange,
  };
};
