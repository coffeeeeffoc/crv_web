import { ActionShowProps } from '../../interfaces/ListConfig'
import { ViewOptionsType, ViewConfigType, FilterFieldsType, FieldType, DataRowType, ViewFieldsType } from './interface'
import { EnumFieldType } from '@/constants/constant'
import { currencyTransform, dateTransform, alignTransform } from '@/utils/utilConvert'
/**
 * 配置数据结构转换
 * 将模型得配置数据结构转换成前端适用得数据结构
 * @param config
 * @returns
 */
export const convert = (config: any): any => {
  const { fields = [], operations = [], views = [] } = config || {}
  const viewOptions: ViewOptionsType[] = []
  const viewConfig: ViewConfigType = {}
  views.forEach((view: any) => {
    viewOptions.push({ id: view.id, name: view.name, statement: view.statement ?? '' })
    const {
      viewOperations = {
        dataRow: [], dataShowCount: 3, headerShowCount: 3, tableHeader: []
      },
      viewFields = []
    } = view

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
      if (['ONE_TO_MANY', 'MANY_TO_ONE', 'MANY_TO_MANY'].includes(field.fieldType) || field.id === 'date') {
        // 需要通过关联模型ID获取对应的字段，为方便测试暂时固定
        temp.children = [{ value: 'create_user', label: 'create_user' }, { value: 'date2', label: 'label2' }]
        temp.refModel = 'test_luoju'// field.refModel
        temp.fieldType = 'ONE_TO_MANY'
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
        className: alignTransform(field.contentAlign)
      }
      // 对货币字段依照其配置中的数据显示格式和小数位数进行展示
      if (field.showType && field.fieldType === EnumFieldType.CURRENCY) {
        col.render = (text: number) => currencyTransform(text, field.showDigits, field.showType)
      }
      // 对日期字段依照其显示格式的展示
      if (field.showType && field.fieldType === EnumFieldType.DATE) {
        col.render = (text: any) => dateTransform(text, field.showType)
      }
      /** render函数渲染 */
      return col
    })

    const showColumns = columns.map((col: any) => ({ id: col.dataIndex, name: col.title }))

    viewConfig[view.id] = {
      id: view.id,
      name: view.name,
      // externalDataApi: view.externalDataApi,
      supportSelectCal: view.supportSelectCal ?? false,
      // loading: true, // 数据加载开关
      config: {
        defaultFilterFields,
        viewFields: mergeField,
        filterFields, // defaultFilterFields,
        actions: { top, row },
        columns,
        showColumns
      }
    }
  })

  return { modelId: config.id, views: viewOptions, viewList: viewConfig, current: views[0].id, configLoading: false }
}
