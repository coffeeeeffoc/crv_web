
import { EnumFieldType, formulaField } from '@/constants/constant'
import { refTransform } from '@/utils/utilConvert'

// 关联字段集
const associatedField: EnumFieldType[] = [EnumFieldType.ONE_TO_MANY, EnumFieldType.MANY_TO_ONE, EnumFieldType.MANY_TO_MANY]
interface PaginationType {
  total: number
  current: number
  pageSize: number
}

interface FieldsType {
  id: string | number
  fieldType: EnumFieldType
  summary: string
  [propsName: string]: any
}

interface QueryRequest {
  // 模型
  modelId: string
  // 分页
  pagination: PaginationType
  // 字段
  viewFields: FieldsType[]
  // 过滤
  filter: any
  // 辨别页面查询以及选择
  queryList: boolean
  // 排序
  sort?: {}
  // 关联表信息
  refModelInfo?: any[]
  // 汇总配置
  summaryCalculate?: any[]
}

interface FieldNdType {
  id: string | number
  formula: string
}

export const queryTotalRequest = ({ modelId, filter, summaryCalculate }: any) => {
  const fields: any = [];
  summaryCalculate?.forEach((item: any) => {
    fields.push({ id: item.name, formula: item.formula })
  })

  return [
    {
      model: modelId,
      type: 'query',
      pagination: { current: 1, pageSize: 10, total: 0 },
      fields: fields,
      filter: filter[0],
      sort: []
    }
  ]
}

// 查询接口
export const queryRequest = ({
  queryList,
  modelId,
  pagination,
  viewFields,
  filter,
  sort = [],
  refModelInfo = [],
  summaryCalculate = []
}: QueryRequest): object => {
  // 关联表分页信息，暂定为10
  const refPagination: PaginationType = {
    total: 0,
    current: 1,
    pageSize: 10
  }
  // 字段信息的查询
  const fieldSt: object[] = []
  // 汇总信息的查询
  const fieldNd: FieldNdType[] = []
  let summaryFlag = false;
  viewFields.forEach((viewField: FieldsType) => {
    console.log('queryRequest', viewField)
    // 如果诸多信息没有，就不用填
    const { content, showFormat, fieldType, refModel, id, refModelField, deleteType, summary, refField, formula } = viewField
    // 关联字段
    if (associatedField.includes(fieldType)) {
      // 为关联字段时，查询关联表中是否存在name属性
      const isExistenceName = (refModelInfo[refModelInfo.findIndex(refTable => refTable.id === refModel)]?.fields ?? []).findIndex((refModelFieldId: FieldsType) => refModelFieldId.id === 'name') !== -1
      console.log('viewField.refModelField1', isExistenceName)
      // 优先级 content，showFormat，name(有的情况下)，关联字段(有的情况下)，id
      // eslint-disable-next-line no-template-curly-in-string
      const refFields = (content || showFormat || isExistenceName) ? refTransform(content || showFormat || '${name}') : [{ id: refModelField ?? 'id' }]
      // refFields不为空时
      if (refFields.length > 0) {
        switch (fieldType) {
          // 主从
          case EnumFieldType.ONE_TO_MANY:
          {
            fieldSt.push({
              id: id,
              model: refModel,
              refType: EnumFieldType.ONE_TO_MANY,
              join: [{ parent: refField, child: refModelField }],
              pagination: refPagination,
              fields: [...refFields],
              filter: {},
              delete: deleteType
            })
            return
          }
          // 单选查找
          case EnumFieldType.MANY_TO_MANY:
          {
            fieldSt.push({
              id: id,
              model: refModel,
              refType: EnumFieldType.MANY_TO_MANY,
              join: [{ parent: 'id', child: 'id' }],
              pagination: refPagination,
              fields: [...refFields],
              filter: {}
            })
            return
          }
          // 多选查找
          case EnumFieldType.MANY_TO_ONE:
          {
            fieldSt.push({
              id: id,
              model: refModel,
              refType: EnumFieldType.MANY_TO_ONE,
              join: [{ parent: id, child: refModelField }],
              pagination: refPagination,
              fields: [...refFields],
              filter: {}
            })
          }
        }
      }
    } else {
      const fst: any = { id: id };
      if (fieldType === formulaField) { fst.formula = formula; }
      fieldSt.push(fst)
      if (summary?.length > 0) {
        summaryFlag = true;
        if (viewField.id === 'id') {
          fieldNd.push({ id: 'newId', formula: summary })
          // fieldNd.push({ id: '$summary', formula: 'id' })
        } else {
          fieldNd.push({ id: viewField.id, formula: summary })
        }
      }
    }
  })
  const arrayData: any[] = [
    {
      model: modelId,
      type: 'query',
      pagination: pagination,
      fields: fieldSt,
      filter: filter[0],
      sort: sort
    }
  ]
  if (fieldNd.length > 0) {
    if (summaryFlag) { fieldNd.push({ id: '$summary', formula: 'id' }) }
    arrayData.push(
      {
        model: modelId,
        type: 'query',
        pagination: {
          current: 1,
          pageSize: 1,
          total: 0
        },
        fields: fieldNd,
        filter: queryList ? filter[0] : filter[1]
      }
    )
  }
  if (summaryCalculate.length > 0) {
    const sumFields: any = [];
    summaryCalculate?.forEach((item: any) => {
      sumFields.push({ id: item.name, formula: item.formula })
    })
    arrayData.push({
      model: modelId,
      type: 'query',
      pagination: { current: 1, pageSize: 10, total: 0 },
      fields: sumFields,
      filter: queryList ? filter[0] : filter[1],
      sort: []
    })
  }
  return arrayData
}

interface dataType {
  id: string
  version: number
  [propsName: string]: any
}

interface paramType {
  modelId: string
  data: dataType
}

export const deleteRequest = ({
  modelId,
  data
}: paramType) => {
  return {
    model: modelId,
    type: 'delete',
    data: {
      id: data.id,
      version: data.version
    }
  }
}

export const insertRequest = ({
  modelId,
  data
}: paramType) => {
  return {
    model: modelId,
    type: 'insert',
    data: data
  }
}

export const updateRequest = ({
  modelId,
  data
}: paramType) => {
  return {
    model: modelId,
    type: 'update',
    data: data
  }
}
