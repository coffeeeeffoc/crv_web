import { EnumFieldType, Field, RefField } from '@crv/utils/src/types/business/FieldType';

// 特殊的需要构造专用的查询字段的关联类型
export const specialRefQueryFields = [EnumFieldType.MANY_TO_MANY, EnumFieldType.ONE_TO_MANY];
export const formulaQueryFields = [EnumFieldType.FORMULA];

// 表单中无用的字段（暂不支持展示）
export const uselessFields = ['create_time', 'create_user', 'last_update_time', 'last_update_user'];

// 不可编辑的字段（暂不支持展示）
export const notEditableFields = uselessFields.concat(['version']);

// 暂时支持的字段类型
export const supportFieldTypes = Object.keys(EnumFieldType);

// 移除无用的字段
export const removeUselessField = (data: any): any => {
  if (!data) return data;
  if (Array.isArray(data)) return data.map(removeUselessField);
  if (typeof data === 'object') {
    const dataTmp = { ...data };
    uselessFields.forEach(key => delete dataTmp[key]);
    return dataTmp;
  };
  return data;
};

// 关联模型中，是否存在name字段
export const hasNameField = (config: RefField) => config?.$REF_MODEL?.fields?.findIndex((item: any) => item.id === 'name') > -1;

export const getRefTargetFields = (config: RefField) => {
  const { showFormat } = config || {};
  const defaultField = getDefaultQueryField(config);
  // eslint-disable-next-line no-template-curly-in-string,@typescript-eslint/prefer-nullish-coalescing
  const finalShowFormat = showFormat || (hasNameField(config) ? '${name}' : undefined);
  // showFormat中使用的字段属性，排重处理
  const showFormatFields: string[] = [...new Set<string>(
    (finalShowFormat?.match(/\$\{(\w+)\}/g)?.map((item: any) => item.substring(2, item.length - 1)) ?? []).concat([defaultField])
  )];
  // showFormat没设置指定格式时，只显示id
  const refTargetFields = showFormatFields.length > 0 ? showFormatFields : [defaultField];
  return refTargetFields;
};

// 获取默认的查询字段
export const getDefaultQueryField = (config: RefField) => {
  if (config?.fieldType === EnumFieldType.MANY_TO_ONE) {
    return config.refModelField;
  } else if (config?.fieldType === EnumFieldType.MANY_TO_MANY) {
    return 'id';
  }
  return 'id';
};
// 获取默认的显示字段
export const getDefaultDisplayField = (config: RefField) => {
  if (config?.fieldType === EnumFieldType.MANY_TO_ONE) {
    return hasNameField(config) ? 'name' : config.refModelField;
  } else if (config?.fieldType === EnumFieldType.MANY_TO_MANY) {
    return 'id';
  }
  return 'id';
};

// 单个关联字段创建查询
export const createRefQueryField = (field: RefField) => {
  const refTargetFields = getRefTargetFields(field);
  if (!specialRefQueryFields.includes(field.fieldType)) {
    console.error(`单个关联字段创建查询出错,字段类型fieldType:[${field.fieldType}],详细信息:[${JSON.stringify(field)}]`);
  }
  console.log('createNoRefQueryFieldsByStrings(refTargetFields)', field.id, createNoRefQueryFieldsByStrings(refTargetFields));
  return {
    id: field.id,
    // TODO:此处ONE_TO_MANY情况下，字段如何查询，有待重新设置
    fields: createNoRefQueryFieldsByStrings(refTargetFields),
    refType: field.fieldType,
    model: field.refModel,
    join: [
      field.fieldType === EnumFieldType.MANY_TO_MANY
        ? {
            parent: 'id',
            child: 'id',
          }
        : field.fieldType === EnumFieldType.MANY_TO_ONE
          ? {
              parent: 'id',
              child: field.refModelField,
            }
          : {
              parent: field.refField,
              child: field.refModelField,
            }
    ],
  };
};

// 创建公式字段的查询字段
export const createFormulaQueryFields = (fields: any[]) => fields.filter(item => item.fieldType === EnumFieldType.FORMULA)
.map(({ id, formula }) => ({ id, formula }));

// 创建关联字段的查询字段
export const createRefQueryFields = (fields: any[]) => fields.filter(item => specialRefQueryFields.includes(item.fieldType))
  .map(item => createRefQueryField(item));

// 创建【非关联字段/非公式字段】的普通字段的查询字段
export const createGeneralQueryFields = (fields: any[]) => fields.filter(item => ![...specialRefQueryFields, EnumFieldType.FORMULA].includes(item.fieldType))
.map(({ id }) => ({ id }));

// 以字符串数组构造非关联字段的查询字段
export const createNoRefQueryFieldsByStrings = (fields: string[]) => fields?.map(item => ({ id: item })) ?? [];

// 创建删除字段
export const createDeleteFields = (fields: Field[]) => {
  const deleteConfigFields = fields?.map(field => {
    if (field.fieldType === EnumFieldType.MANY_TO_MANY) {
      // 多对多处理
      return {
        id: field.id,
        refType: field.fieldType,
        model: field.refModel,
        join: [{
          parent: 'id',
          child: 'id',
        }],
      };
    } else if (field.fieldType === EnumFieldType.ONE_TO_MANY) {
      // 一对多处理
      return {
        id: field.id,
        delete: field.deleteType,
        refType: field.fieldType,
        model: field.refModel,
        join: [{
          parent: field.refField,
          child: field.refModelField,
        }],
      };
    }
    return null;
  }).filter(Boolean) ?? [];
  return deleteConfigFields.length > 0 && { fields: deleteConfigFields };
};

// 处理后端接口返回的模型，并生成树形的字段
export const getTreeModelFields = (model: any) => {
  if (Array.isArray(model)) {
    if (model.length < 2) {
      return model[0];
    }
    // 将关联模型设置到相应字段的$REF_MODEL属性中
    const restModel = model.slice(1);
    return {
      ...model[0],
      ...(model[0].fields && {
        fields: model[0].fields.map((item: any) =>
          [EnumFieldType.MANY_TO_MANY, EnumFieldType.MANY_TO_ONE, EnumFieldType.ONE_TO_MANY].includes(item.fieldType)
            ? {
                ...item,
                $REF_MODEL: restModel.find(i => i.id === item.refModel),
              }
            : item
        )
      }),
    };
  }
};
