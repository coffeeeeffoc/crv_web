/* eslint-disable no-template-curly-in-string */
import { associatedField, EnumFieldType, formulaField } from '@/constants/constant';
import { refFormatTransform } from '@/utils/utilConvert';
import {
  // textRender,
  dateRender,
  timeRender,
  dateTimeRender,
  currencyRender,
  enumRender,
  intRender,
  yearRender,
  yearMonthRender,
  monthRender,
  decimalRender,
  percentageRender,
  permillageRender
  // formulaRender
} from './actions';

const fieldTypeRenderMap: any = {
  // [EnumFieldType.TEXT]: textRender,
  [EnumFieldType.DATE]: dateRender,
  [EnumFieldType.CURRENCY]: currencyRender,
  [EnumFieldType.TIME]: timeRender,
  [EnumFieldType.DATE_TIME]: dateTimeRender,
  [EnumFieldType.ENUM]: enumRender,
  [EnumFieldType.INTEGER]: intRender,
  [EnumFieldType.YEAR]: yearRender,
  [EnumFieldType.YEAR_MONTH]: yearMonthRender,
  [EnumFieldType.MONTH]: monthRender,
  [EnumFieldType.DECIMAL]: decimalRender,
  [EnumFieldType.PERCENTAGE]: percentageRender,
  [EnumFieldType.PERMILLAGE]: permillageRender,
  // [EnumFieldType.FORMULA]: formulaRender
}

const renderAction = (value: any, record: any, config: any, refModelInfo: any): string | number => {
  // console.info('RenderAction:val, record, config', value, record, config);
  const func = fieldTypeRenderMap[config.fieldType];
  if (func) {
    return func(value, record, config);
  } else if (config.fieldType === formulaField) {
    // 计算字段
    const formulaFunc = fieldTypeRenderMap[config.resultType];
    if (formulaFunc) {
      return formulaFunc(value, record, config);
    }
  } else if (associatedField.includes(config.fieldType)) {
    // 关联字段
    return refFieldRenderAction(value, refModelInfo, config)
  }
  console.info(`未获取到类型[${config.fieldType}]的渲染函数`, value)
  return value;
}

export const refFieldRenderAction = (text: any, refModelInfo: any, config: any) => {
  const { refModel, refModelField, fieldType, content, showFormat } = config;
  const index = refModelInfo.findIndex((refTable: any) => refTable.id === refModel)
  const model = refModelInfo[index]
  const isExistenceName = (model?.fields ?? []).findIndex((refModelFieldId: any) => refModelFieldId.id === 'name') !== -1
  // one2many,many2many优先级 content，showFormat，name(有的情况下)，id，关联字段(有的情况下)
  // many2one content，showFormat，name(有的情况下)，关联字段(有的情况下)，id
  if (fieldType === EnumFieldType.MANY_TO_ONE) {
    return refFormatTransform(content || showFormat || (isExistenceName && '${name}') || (refModelField && `\${${refModelField}}`) || '${id}', text?.data ?? [])
  } else {
    return refFormatTransform(content || showFormat || (isExistenceName && '${name}') || '${id}' || (refModelField && `\${${refModelField}}`), text?.data ?? [])
  }
}

export default renderAction;
