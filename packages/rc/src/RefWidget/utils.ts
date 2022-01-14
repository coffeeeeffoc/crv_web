import { EnumFieldType, Field } from '@crv/utils/src/types/business/FieldType';
// import { createRefQueryField } from '@crv/utils/src/browser/business/fields';
import { isSameObj } from '@crv/utils/src/browser/diff';

interface ConfigBusType {
  [k: string]: Field;
};
interface ValuesType {
  [k: string]: any;
};
interface ProxyFieldsValueProps {
  configBus: ConfigBusType;
  values: ValuesType;
};

// 代理表单值的get和set（暂时只考虑一层表单，若要嵌套则需要构造递归）
export const getProxyFieldsValue = ({
  configBus,
  values,
}: ProxyFieldsValueProps) => {
  const proxy = new Proxy(values, {
    get: (target: ValuesType, key: string, receiver: any) => {
      // 若当前key对应的config配置没被收集，则认为是普通字段，不需要转换
      return configBus[key]
        ? transformRefData(configBus[key]).parseValue(target[key])
        : target[key];
    },
    set: (target: ValuesType, key: string, value: any, receiver: any) => {
      // 若当前key对应的config配置没被收集，则认为是普通字段，不需要转换
      target[key] = configBus[key]
        ? transformRefData(configBus[key]).parseValue(value)
        : value;
      return true;
    },
  });
  return proxy;
};

export const transformRefData = (field: Field) => {
  return {
    parseValue: (val: any) => {
      if (field.fieldType === EnumFieldType.MANY_TO_MANY) {
        return val?.data?.map(({ id }: any) => id);
      } else if (field.fieldType === EnumFieldType.ONE_TO_MANY) {
        return val?.data?.map(({ id }: any) => id);
      } else if (field.fieldType === EnumFieldType.MANY_TO_ONE) {
        return val;
      }
      return val;
    },
    wrapValue: (val: any, originalVal: any[] = []) => {
      const existSet = new Set();
      const currentValSet = new Set();
      originalVal?.forEach(val => existSet.add(val.id));

      if (field.fieldType === EnumFieldType.MANY_TO_MANY) {
        // 多对多处理
        return {
          refType: field.fieldType,
          model: field.refModel,
          join: [{
            parent: 'id',
            child: 'id',
          }],
          data: val.map((id: any) => ({ id, $type: 'insert' }))
        };
      } else if (field.fieldType === EnumFieldType.ONE_TO_MANY) {
        // 一对多处理
        return {
          delete: field.deleteType,
          refType: field.fieldType,
          model: field.refModel,
          join: [{
            parent: field.refField,
            child: field.refModelField,
          }],
          data: val.map((item: any) => {
            currentValSet.add(item.id);
            const exist = existSet.has(item.id);
            // 原有id
            if (exist) {
              // 更新
              if (!isSameObj(item, originalVal.find(({ id }) => id === item.id))) {
                return {
                  ...item,
                  $type: 'update',
                };
              }
              // 没更新
              return null;
            }
            // 新增，包含两种情况：1.没id，肯定是新增；2.有id，可能是新增时添加的id
            return {
              ...item,
              $type: 'insert',
            };
          }).concat(
            originalVal?.filter(item => !currentValSet.has(item.id)).map(item => ({ ...item, $type: 'delete' })) ?? []
          ).filter(Boolean),
        };
      }
      return val;
    },
  };
};
