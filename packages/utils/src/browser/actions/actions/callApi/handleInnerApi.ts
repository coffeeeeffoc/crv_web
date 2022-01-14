import {
  EnumInnerApi,
  EnumQueryType,
} from '@crv/utils/src/types';
import { capitalize } from '@crv/utils/src/browser/string';
import { createDeleteFields } from '@crv/utils/src/browser/business/fields';

// 自定义映射
const typeMap: any = {
  SAVE: ''
};
// 默认转换
const defaultConvertType = (str: string) =>
  str.toLowerCase().split('_').map((item, index) => index === 0 ? item : capitalize(item)).join('');

// 获取自定义API对应的type
const getType = (str: string) => typeMap[str] ?? defaultConvertType(str);

const makeFilter = (data: any[]) => ({ id: { $in: data.map((item: any) => { return item.id; }) } });

// 处理内部API
export default function handleInnerApi ({
  context,
  model,
  data,
  type,
  filter,
}: any) {
  // type = getType(type);
  // type: query/delete/insert/update/mutation
  switch (type) {
    case EnumInnerApi.QUERY:
      return {
        model,
        type: EnumQueryType.query,
      };
    case EnumInnerApi.DELETE: {
      return {
        model,
        type: EnumQueryType.delete,
        filter: filter ?? makeFilter(data),
        ...createDeleteFields(context?.modelContext?.model?.fields),
      };
    }
    case EnumInnerApi.SAVE: {
      // 自动判断
      // 优先从参数中获取，其次从url中获取
      // 其实自动判断是表单整理数据时处理的，不是在发请求时的action里处理的
      const isCreate = context.modelContext?.editType?.toLowerCase() === 'create';
      const $type = isCreate ? EnumQueryType.insert : EnumQueryType.update;
      return {
        model,
        type: 'mutation',
        ...(filter && { filter }),
        ...(!isCreate && {
          filter: makeFilter(data),
        }),
        data: data?.map((item: any) => ({ ...item, $type })),
      };
    }
    case EnumInnerApi.EXPORT_DATA:
      break;
    case EnumInnerApi.IMPORT_DATA:
      break;
    case EnumInnerApi.CREATE_DATA:
      break;
    case EnumInnerApi.UPDATE_MULTIPLE:
      break;
    case EnumInnerApi.UPDATE_SINGLE:
      break;
    default:
      break;
  }
  // 默认返回格式
  return {
    model,
    type: getType(type),
    data,
    filter,
  };
};
