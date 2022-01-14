// 显示类型，分别为配置界面，预览界面和展示界面
export enum EnumDisplayType {
  config = 'config',
  preview = 'preview',
  view = 'view',
};
// 控件显示类型，分别为表单展示，列表展示、明细表展示
export enum EnumWidgetDisplayType {
  form = 'form',
  list = 'list',
  formTable = 'formTable',
};
// 表单配置界面的编辑类型
export enum EnumConfigEditType {
  create = 'create',
  update = 'update',
};

// 编辑类型，表单展示界面中的编辑类型
export enum EnumEditType {
  create = 'create',
  edit = 'edit',
  detail = 'detail',
  batch = 'batch',
  copy = 'copy', // 视选择的数据个数而定，进create或者batchCreate界面
  list = 'list', // 列表页面
};

// 查询接口的type格式
export enum EnumQueryType {
  query = 'query',
  delete = 'delete',
  insert = 'insert',
  update = 'update',
  mutation = 'mutation',
};

// 关联字段的类型
export enum EnumRefType {
  oneToMany = 'oneToMany',
  manyToOne = 'manyToOne',
  manyToMany = 'manyToMany',
};
