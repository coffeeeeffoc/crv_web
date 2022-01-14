import filterStringFun from '@/utils/conditionCombin';

/**
 * 处理关联字段
 * @param filters
 * @returns
 */
const dealFilterRefField = (filters: any, viewFields: any) => {
  const tempFilters = JSON.parse(JSON.stringify(filters));
  // 获取模型的所有引用字段
  const refFields = viewFields.filter((f: any) => ['ONE_TO_MANY', 'MANY_TO_ONE', 'MANY_TO_MANY'].includes(f.fieldType))
  tempFilters?.conditions?.forEach((c: any) => {
    const current = refFields.find((t: any) => t.id === c.field);
    if (current) {
      c.field = `${c.field}.id`
    }
  })
  return tempFilters;
}

/**
 * 多条件合并
 * @param temp
 * @param viewFields
 * @param viewDataFilter
 * @returns
 */
export const conditionCombin = (temp: any, viewFields: any, viewDataFilter: any) => {
  const { filters: { quickSearch, complexSearch, columnSearch } } = temp ?? { filters: {} };

  // 复杂筛选
  const complex = complexSearch ? dealFilterRefField(complexSearch, viewFields) : []
  const clientFilters = filterStringFun({ filterFields: quickSearch?.fields, filterContent: quickSearch?.content, filterCondition: complex })

  // filter处理
  let tempFilters = []
  if (viewDataFilter && Array.isArray(viewDataFilter.conditions) && viewDataFilter.conditions.length > 0) {
    const sysFilters = filterStringFun({ filterFields: [], filterContent: '', filterCondition: viewDataFilter });
    tempFilters.push(sysFilters)
  }
  // 简单过滤
  if (Object.keys(clientFilters).length > 0) {
    tempFilters.push(clientFilters)
  }
  // 列头过滤
  if (columnSearch) {
    const conditions = Object.keys(columnSearch).map((key: string, index: number) => ({ ...columnSearch[key], no: index + 1 }))
    if (conditions.length > 0) {
      const colFilters = filterStringFun({ filterFields: [], filterContent: '', filterCondition: { conditions, conditionCombin: '' } });
      tempFilters.push(colFilters)
    }
  }
  if (tempFilters.length > 0) {
    tempFilters = [{ $and: tempFilters }]
  }
  return tempFilters;
}

/**
 * 请求数据预处理
 * @param modelId
 * @param pagination
 * @param viewFields
 * @param temp
 * @param viewDataFilter
 * @returns
 */
export const queryDataPreProcessing = (modelId: string, pagination: any, viewFields: any, defaultSort: any, temp: any, viewDataFilter: any, summaryCalculate?: any[]) => {
  // filter处理
  const tempFilters = conditionCombin(temp, viewFields, viewDataFilter);
  // sort处理
  const tempSort = temp?.columnSorter ? [{ [temp.columnSorter.field]: temp.columnSorter.sort }] : defaultSort;
  return {
    modelId,
    pagination,
    viewFields: viewFields,
    filter: tempFilters,
    sort: tempSort,
    queryList: true,
    summaryCalculate
  }
}
