import { ActionShowProps } from '../../interfaces/ListConfig'
import { getGlobalValue } from '../utilConvert'
import { FilterFieldsType, FieldType, DataRowType, ViewFieldsType } from './interface'
/**
 * 配置数据结构转换
 * 将模型得配置数据结构转换成前端适用得数据结构
 * @param config
 * @returns
 */
export const viewConvert = (config: any): any => {
  const { fields = [], operations = [], views = [] } = config[0] || {}
  // const viewConfig: ViewConfigType = {}
  const view = views[0] ?? {}
  const {
    viewOperations = {
      dataRow: [], dataShowCount: 3, headerShowCount: 3, tableHeader: []
    },
    viewFields = [],
    viewDataFilter = {},
    defaultSort = [],
    summaryCalculate
  } = view ?? {}

  /** 1.获取过滤字段信息 */
  // 合并字段对象和视图字段对象
  const mergeField = viewFields.map((viewField: ViewFieldsType) => {
    // 找到在field对应的id索引
    const fieldIndex = fields.findIndex((field: FieldType) => viewField.id === field.id)
    // 合并
    return Object.assign(viewField, fields[fieldIndex])
  })
  // 获取视图字段
  const filterFields: FilterFieldsType[] = mergeField.map((field: FieldType) => {
    const showName = (field.showName && field.showName !== '' ? field.showName : field.name)
    const temp: any = { ...field, value: field.id, label: showName, id: field.id, name: showName, fieldType: field.fieldType }
    if (['ONE_TO_MANY', 'MANY_TO_ONE', 'MANY_TO_MANY'].includes(field.fieldType)) {
      // 需要通过关联模型ID获取对应的字段，为方便测试暂时固定
      const refModal = config.find((c: any) => c.id === field.refModel);
      if (refModal) {
        temp.childrens = refModal.fields?.map((r: any) => ({ ...r, value: r.id, label: r.name }))
      }
    }
    return temp
  })
  // 默认的检索字段
  const defaultFilterFields: FilterFieldsType[] = mergeField.filter((field: FieldType) => field?.retrieve === true).map((field: FieldType) => ({ id: field.id, name: field.showName && field.showName !== '' ? field.showName : field.name }))

  /** 2.获取按钮信息 */
  const top: ActionShowProps = { showCount: viewOperations.headerShowCount, buttons: [] }
  const row: ActionShowProps = { showCount: viewOperations.dataShowCount, buttons: [] }
  const type: string[] = ['tableHeader', 'dataRow']
  type.forEach(t => {
    viewOperations[t].forEach((btn: DataRowType) => {
      const opMap: any = {}
      btn.operationIds.forEach(o => { opMap[o.id] = o.name })
      const temp = operations.filter((op: any) => Object.keys(opMap).includes(`${op.id}`)).map((op: any) => {
        // 返回按钮配置信息
        return {
          id: op.id,
          name: opMap[op.id] ?? op.name,
          statement: op.statement,
          operationType: op.operationType,
          targetData: op.targetData,
          steps: op.operationSteps,
          selectAll: op.supportSelectAll
        }
      })
      if (t === 'tableHeader') top.buttons.push({ name: btn.name, type: btn.type, operations: temp })
      else row.buttons.push({ name: btn.name, type: btn.type, operations: temp })
    })
  })
  /** 3.获取列信息 */
  const columns = mergeField.map((field: any) => {
    const col: any = {
      dataIndex: field.id,
      key: field.id,
      title: field.showName || field.name,
      width: field.columnWidth,
      align: field.headerAlign,
    }
    /** render函数渲染 */
    return col
  })

  const showColumns = columns.map((col: any) => ({ id: col.dataIndex, name: col.title }))
  // console.info('=====mergeField=====', mergeField, summaryCalculate)

  let tempFilter: any = null;
  if (viewDataFilter && viewDataFilter.conditions?.length > 0) {
    tempFilter = {
      conditionCombin: viewDataFilter.conditionCombination,
      conditions: viewDataFilter.conditions.map((con: any) => {
        let val = con.value;
        if (con.valueType === 'GLOBAL') { val = getGlobalValue(con.valueType) }
        return { no: con.id, field: con.field, value: val, operate: con.operator, valueType: con.valueType }
      })
    }
  }

  const viewConfig = {
    id: view.id,
    name: view.name,
    // 支持汇总选择列
    supportSelectCal: view.supportSelectCal ?? false,
    // loading: true, // 数据加载开关
    config: {
      // 默认检索字段
      defaultFilterFields,
      // 视图字段
      viewFields: mergeField,
      // 用于高级筛选的字段信息
      filterFields, // defaultFilterFields,
      // 操作
      actions: { top, row },
      // 列信息
      columns,
      // 展示列信息
      showColumns,
      // 数据过滤
      viewDataFilter: tempFilter,
      // 默认排序
      defaultSort,
      // 合计计算
      summaryCalculate// : [{ name: '人口', calculateFormula: 'sum(country_population)' }, { name: '编号', calculateFormula: 'sum(id)' }]
    },
    // 关联表信息
    refModelInfo: config.slice(1)
  }

  return viewConfig
}
