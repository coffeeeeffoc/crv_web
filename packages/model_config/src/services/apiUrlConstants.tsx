
enum API_URL {
  /**
   * ModelListSlice 相关
   */
  // 模型浏览
  QUERY_SPLIT = 'crvserviceconfig/model/retrieveModels',
  // 模型编辑查询
  QUERY_ONE = 'crvserviceconfig/model/retrieveModel',
  // 模型新建
  MODEL_CREATE = 'crvserviceconfig/model/create',
  // 模型编辑保存
  MODEL_UPDATE = 'crvserviceconfig/model/update',
  // 模型删除
  MODEL_DELETE = 'crvserviceconfig/model/delete',
  // 创建数据
  CREATE_TABLES = 'crvserviceconfig/model/createTables',
  /**
   * FieldSlice 相关
   */
  // 新增保存
  FIELD_INSERT = 'crvserviceconfig/field/create',
  // 编辑保存
  FIELD_UPDATE = 'crvserviceconfig/field/update',
  // 字段删除
  FIELD_DELETE = 'crvserviceconfig/field/delete',
  // 关联表查询
  ASSOCIATE_TABLE = 'crvserviceconfig/model/retrieveModels',
  // 关联字段查询
  ASSOCIATE_FIELD = 'crvserviceconfig/model/retrieveRequire',
  // 选项列表查询
  RETRIEVE_OPTIONS = 'crvserviceconfig/option/retrieveOptions',
  // 选项列表新增
  CREATE_OPTIONS = 'crvserviceconfig/option/create',
  // 选项列表编辑
  UPDATE_OPTIONS = 'crvserviceconfig/option/update',
  /**
   * ViewSlice 相关
   */
  // 视图更新
  VIEW_UPDATE = 'crvserviceconfig/view/update',
  // 视图删除
  VIEW_DELETE = 'crvserviceconfig/view/delete',
  // 创建默认视图
  CREATE_DEFAULT_VIEW = 'crvserviceconfig/view/createDefaultView',
  // 复制视图
  VIEW_COPY = 'crvserviceconfig/view/copyView',
  /**
   * Operation 相关
   */
  // 外部Api
  EXTERNAL_API = 'crvserviceconfig/externalApi/retrieveApi',
  // 外部页面
  EXTERNAL_PAGE = 'crvserviceconfig/externalApi/retrievePage',
  // 操作更新保存
  OPERATION_UPDATE = 'crvserviceconfig/operation/save',
  // 操作删除
  OPERATION_DELETE = 'crvserviceconfig/operation/delete',
  /**
  * FormConfig 相关
  */
  FORM_CONFIG_DELETE = 'crvserviceconfig/form/delete',
  FORM_CONFIG_CREATE = 'crvserviceconfig/form/create',
  // 按需查询
  RETRIEVE_REQUIRE = 'crvserviceconfig/model/retrieveRequire',
}

export default API_URL
