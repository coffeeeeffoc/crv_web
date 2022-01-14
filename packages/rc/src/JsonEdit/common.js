export const OPERATOR = [
  { key: 'EQUAL', value: '相等' },
  { key: 'NOT_EQUAL', value: '不等于' },
  { key: 'GREATER_THAN', value: '大于' },
  { key: 'GREATER_THAN_OR_EQUALTO', value: '大于等于' },
  { key: 'LESS_THAN', value: '小于' },
  { key: 'LESS_THAN_OR_EQUALTO', value: '小于等于' },
  { key: 'LIKE', value: '模糊' },
  { key: 'BETWEEN', value: '两者之间' },
  { key: 'IN', value: '包含多个' },
  // { key: 'NOT_IN', value: '不包含' },
  // { key: 'ISNULL', value: '空值' },
  // { key: 'ISNOTNULL', value: '非空值' },
];
export const ALL_TYPES = {
  Array: '数组',
  String: '字符串',
  Number: '数字',
  Boolean: '布尔',
  Object: '对象',
};

export const BOOLEAN = [
  { key: true, value: '是' },
  { key: false, value: '否' },
];

export const BOOLEAN_STRING = [
  { key: 'true', value: '是' },
  { key: 'false', value: '否' },
];

export const FORMTYPE = [
  { key: 'list', value: '列表' },
  { key: 'edit', value: '编辑' },
  { key: 'detail', value: '详情' },
  { key: 'create', value: '创建' },
];

// json基础类型
export const JSON_BASIC_TYPE = [
  { key: 'String', value: '字符串' },
  { key: 'Number', value: '数字' },
  { key: 'Boolean', value: '布尔值' },
  // { key: 'Null', value: 'NULL' }, //暂不支持Null，后期可能会支持
];

export const CONTROL_OPTIONS = [
  { key: 'password', value: '密码' },
  { key: 'icon', value: '图标' },
  { key: 'table', value: '表单表格' },
  // 下面三类应该没使用，暂不支持
  // {key: 'inputSelectTableRow', value: '密码'},
  // {key: 'inputSelectTableRows', value: '密码'},
  // {key: 'formCard', value: 'form'},
  { key: 'datePicker', value: '时间选择' },
  { key: 'fileEdit', value: '文件管理' },
  { key: 'filePreview', value: '文件预览' },
  { key: 'treeGridEdit', value: 'treegrid' },
  { key: 'richtext', value: '富文本' },
  { key: 'workFlowDefinition', value: '流程定义' },
  { key: 'customFrameControl', value: '自定义页面' },
];

// 模型配置的data_type
export const DATA_TYPE = [
  { key: 'varchar', value: '字符串（默认）' },
  { key: 'int', value: '整形' },
  { key: 'timestamp', value: '时间' },
  { key: 'decimal', value: '小数' },
  { key: 'text', value: '文本' },
  { key: 'longtext', value: '长文本' },
  { key: 'enumeration', value: '枚举' },
  { key: 'many2one', value: '多对一' },
  { key: 'one2many', value: '一对多' },
  { key: 'many2many', value: '多对多' },
];

// 模型配置的type
export const FIELD_TYPE = [
  { key: 'data', value: '数据字段' },
  { key: 'calc', value: '计算字段' },
  { key: 'ref', value: '关联字段' },
];

export const BASIC_DESC_OBJECT = {
  valueType: 'Object',
  deletable: true,
};
export const BASIC_DESC_OBJECT_ALLOW_ADD = {
  ...BASIC_DESC_OBJECT,
  allowAdd: true,
  locationAlias: '*',
};

export const BASIC_DESC_ARRAY = {
  deletable: true,
  locationAlias: '#',
  allowAdd: true,
};
export const BASIC_DESC_STRING = {
  deletable: true,
  valueType: 'String',
  controlType: 'input',
  editable: true,
};
export const BASIC_DESC_NUMBER = {
  deletable: true,
  valueType: 'Number',
  controlType: 'input',
  editable: true,
};
export const BASIC_DESC_BOOLEAN = {
  deletable: true,
  valueType: 'Boolean',
  controlType: 'select',
  editable: true,
  selectOptions: BOOLEAN,
};

export const BASIC_DESC_PRIMARY = {
  String: BASIC_DESC_STRING,
  Number: BASIC_DESC_NUMBER,
  Boolean: BASIC_DESC_BOOLEAN,
};

export const BASIC_DESC_PRIMARY_CHILDREN_PROPS = Object.keys(BASIC_DESC_PRIMARY)
  .map((key) => BASIC_DESC_PRIMARY[key]);

export const ALL_VALUE_TYPE_NO_ARRAY = {
  ...BASIC_DESC_PRIMARY,
  Object: {
    ...BASIC_DESC_OBJECT_ALLOW_ADD,
    location: {
      '.*': {
        keySelectOptions: [],
        selectModeTags: true,
      },
    },
  },
};

export const BASIC_OBJECT_DESC_PRIMARY_CHILDREN_PROPS = Object.keys(ALL_VALUE_TYPE_NO_ARRAY)
  .map((key) => ALL_VALUE_TYPE_NO_ARRAY[key]);

export const ANY_TYPE_DESC = {
  valueType: {
    ...ALL_VALUE_TYPE_NO_ARRAY,
    Array: {
      ...ALL_VALUE_TYPE_NO_ARRAY,
      childrenProps: BASIC_OBJECT_DESC_PRIMARY_CHILDREN_PROPS,
    },
  },
};

// 为了支持各种类型互相调用，这里要相互引用。而定义的时候不能直接相互引用，需要先定义两个对象之后再设置引用
ALL_VALUE_TYPE_NO_ARRAY.Object.location['.*'] = {
  ...ALL_VALUE_TYPE_NO_ARRAY.Object.location['.*'],
  ...ANY_TYPE_DESC,
};
