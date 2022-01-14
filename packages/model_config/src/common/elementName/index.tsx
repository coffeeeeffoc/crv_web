//  : 对于elementName进行枚举
// ! model
export enum MODEL_ELEMENT {
  UPDATE_ALL = 'MODEL_UPDATE_ALL',
  UPDATE_SELECT = 'MODEL_UPDATE_SELECT',
  CREATE = 'MODEL_CREATE',
  TABLE = 'MODEL_TABLE',
  DELETE = 'MODEL_DELETE',
  EDIT = 'MODEL_EDIT',
  SEARCH = 'MODEL_SEARCH',
  CREATE_BACK = 'MODEL_CREATE_BACK',
  CREATE_SAVE = 'MODEL_CREATE_SAVE'
};
// ! modelEdit
export enum MODEL_EDIT_ELEMENT {
  BACK = 'MODEL_EDIT_BACK'
};
// ! base
export enum BASE_ELEMENT {
  SAVE = 'base_save'
};
// ! field
export enum FIELD_ELEMENT {
  UPDATE_DATA = 'FIELD_UPDATE_DATA',
  AUTH = 'FIELD_AUTH',
  CREATE = 'FIELD_CREATE',
  EDIT = 'FIELD_EDIT',
  DELETE = 'FIELD_DELETE',
  CREATE_BACK = 'FIELD_CREATE_BACK',
  CREATE_SAVE = 'FIELD_CREATE_SAVE',
  SELECT_BACK = 'FIELD_SELECT_BACK',
  SELECT_NEXT = 'FIELD_SELECT_NEXT',
  EDIT_BACK = 'FIELD_EDIT_BACK',
  EDIT_SAVE = 'FIELD_EDIT_SAVE'
};
// ! view
export enum VIEW_ELEMENT {
  CREATE = 'VIEW_CREATE',
  PATH = 'VIEW_PATH',
  EDIT = 'VIEW_EDIT',
  DELETE = 'VIEW_DELETE',
  EDIT_BACK = 'VIEW_EDIT_BACK',
  EDIT_SAVE = 'VIEW_EDIT_SAVE',
  // 视图字段
  VIEW_FIELD_TO_TARGET = 'VIEW_FIELD_TO_TARGET',
  VIEW_FIELD_TO_SOURCE = 'VIEW_FIELD_TO_SOURCE',
  VIEW_FIELD_ALL_TO_TARGET = 'VIEW_FIELD_ALL_TO_TARGET',
  VIEW_FIELD_ALL_TO_SOURCE = 'VIEW_FIELD_ALL_TO_SOURCE',
  // 视图操作
  VIEW_OPERATION_HEARD = 'VIEW_OPERATION_HEARD',
  VIEW_OPERATION_ROW = 'VIEW_OPERATION_ROW',
  VIEW_OPERATION_TO_TARGET = 'VIEW_OPERATION_TO_TARGET',
  VIEW_OPERATION_TO_SOURCE = 'VIEW_OPERATION_TO_SOURCE',
  VIEW_OPERATION_ALL_TO_TARGET = 'VIEW_OPERATION_ALL_TO_TARGET',
  VIEW_OPERATION_ALL_TO_SOURCE = 'VIEW_OPERATION_ALL_TO_SOURCE',

};

// ! operation
export enum OPERATION_ELEMENT {
  CREATE = 'OPERATION_CREATE',
  CREATE_OPERATION = 'OPERATION_CREATE_OPERATION',
  EDIT = 'OPERATION_EDIT',
  DELETE = 'OPERATION_DELETE',
  BACK = 'OPERATION_EDIT_BACK',
  SAVE = 'OPERATION_EDIT_SAVE',
  INCREASE_STEP = 'OPERATION_INCREASE',
  STEP_EDIT = 'OPERATION_STEP_EDIT',
  STEP_DELETE = 'OPERATION_STEP_DELETE',
  STEP_SELECT_BACK = 'OPERATION_STEP_SELECT_BACK',
  STEP_SELECT_NEXT = 'OPERATION_STEP_SELECT_NEXT',
  STEP_CREATE_BACK = 'OPERATION_STEP_CREATE_BACK',
  STEP_CREATE_SAVE = 'OPERATION_STEP_CREATE_SAVE',
  STEP_EDIT_SAVE = 'OPERATION_STEP_EDIT_SAVE',
  STEP_EDIT_BACK = 'OPERATION_STEP_EDIT_BACK',
};

// !formConfig
export enum FORM_CONFIG_ELEMENT {
  CREATE = 'FORM_CONFIG_ELEMENT_CREATE',
  EDIT = 'FORM_CONFIG_ELEMENT_EDIT',
  DELETE = 'FORM_CONFIG_ELEMENT_DELETE'
}