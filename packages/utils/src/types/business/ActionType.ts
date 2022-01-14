import type { AxiosRequestConfig } from 'axios';
import { EnumEditType } from './business';
import { History } from 'history';
import { ModelContextType } from './contextType';

export enum OPERATION_TYPE {
  REFRESH = 'REFRESH',
  FORM_SWITCH = 'FORM_SWITCH',
  DATA_VALIDATION = 'DATA_VALIDATION',
  CALL_API = 'CALL_API',
  BULK_EDIT = 'BULK_EDIT',
  SAVE = 'SAVE',
  DELETE = 'DELETE',
  SOURCE_EXPORT = 'SOURCE_EXPORT',
  SOURCE_IMPORT = 'SOURCE_IMPORT',
  OPEN_CONFIRM = 'OPEN_CONFIRM',
  CUSTOM_API = 'CUSTOM_API',
  CUSTOM_OPERATION = 'CUSTOM_OPERATION',
  OPEN_MODAL = 'OPEN_MODAL',
  CLOSE_MODAL = 'CLOSE_MODAL',
  OPEN_TOP_TAB = 'OPEN_TOP_TAB',
  POP_CONFIRM = 'POP_CONFIRM',
};

// ==========================================================
// =================Action start=============================
// 基本action
export interface BasicAction {
  stepType: OPERATION_TYPE;
  statement?: string;
};

// CALL_API
export enum EnumCallApiType {
  EXTERNAL_API = 'EXTERNAL_API',
  INNER_API = 'INNER_API',
};
export enum EnumInnerApi {
  QUERY = 'QUERY',
  DELETE = 'DELETE',
  EXPORT_DATA = 'EXPORT_DATA',
  IMPORT_DATA = 'IMPORT_DATA',
  CREATE_DATA = 'CREATE_DATA',
  UPDATE_SINGLE = 'UPDATE_SINGLE',
  UPDATE_MULTIPLE = 'UPDATE_MULTIPLE',
  SAVE = 'SAVE',
};

export interface CallApiOptions extends Pick<AxiosRequestConfig,
'method' | 'baseURL' | 'responseType' |
'timeout' | 'transformRequest' | 'transformResponse' | 'headers'
> {
  // method: 'POST', // default
  // baseURL,
  // responseType: 'json', // default
  // timeout: 1000,
  // transformRequest: (data: any, headers: any) => data, // 对 data 进行任意转换处理
  // transformResponse: (data: any, headers: any) => data, // 对 data 进行任意转换处理
  // headers: {},
};

export interface CallApiAction extends BasicAction {
  // 操作步骤类型
  stepType: OPERATION_TYPE.CALL_API;
  // 调用API类型
  callApiType: EnumCallApiType;
  // 自定义参数（不知道怎么用，暂不使用）
  customParam?: string;
  // 内部API
  innerApi?: EnumInnerApi;
  // 是否合并数据
  mergeData?: boolean;
  // 接口附加惨呼
  setFieldValue?: { [key: string]: any };
  // 是否显示失败信息
  showError?: boolean;
  // 是否显示成功信息
  showSuccess?: boolean;
  // 外部网址
  externalPage?: string;
  // 请求的axios选项
  options?: CallApiOptions;
  // 成功继续
  successContinue?: boolean;
  // 失败继续
  errorContinue?: boolean;
  // 是否不论成功和失败都继续，优先级高于successContinue和errorContinue
  alwaysContinue?: boolean;
};

// FORM_SWITCH
export enum EnumPageType {
  INNER_PAGE = 'INNER_PAGE',
  EXTERNAL_PAGE = 'EXTERNAL_PAGE',
  GO_BACK = 'GO_BACK',
  GO_BACK_TO_LIST = 'GO_BACK_TO_LIST',
};

export enum EnumInnerPageType {
  FORM = 'FORM',
  VIEW = 'VIEW',
};

// 继续执行类型
export enum EnumContinueType {
  CONTINUE = 'CONTINUE',
  STOP = 'STOP',
  WAIT = 'WAIT',
};

// 切换模式
export enum EnumFormSwitchMode {
  // 在mainFrame新建iframe遮盖当前页面，返回时销毁iframe
  IFRAME = 'IFRAME',
  // 直接在当前页面切换路由，返回时切换路由
  REPLACE = 'REPLACE',
  // 在mainFrame新建modal弹窗形式的iframe，返回时销毁modal弹窗
  MODAL = 'MODAL',
};

interface CommonAction {
  // 步骤说明
  statement?: string;
};
interface CommonSwitchFormAction {
  // 切换类型
  pageType: EnumPageType;
  innerPageType: EnumInnerPageType;
  // pageType为EXTERNAL_PAGE时使用，外部页面URL地址
  externalPage?: string;
  // pageType为INNER_PAGE且innerPageType为LIST时使用，视图id
  viewId?: string;
  // pageType为INNER_PAGE且innerPageType为FORM时使用，模型id
  modelId?: string;
  // pageType为INNER_PAGE且innerPageType为FORM时使用，表单id
  formId?: string;
  // pageType为INNER_PAGE且innerPageType为FORM时使用，表单类型
  formType?: EnumEditType;
};
// 是否可以设置【继续类型】的操作
interface CommonContinueTypeAction {
  continueType?: EnumContinueType;
};

export interface FormSwitchAction extends CommonSwitchFormAction, CommonAction {
  stepType: OPERATION_TYPE.FORM_SWITCH;
  // 切换模式
  switchMode?: EnumFormSwitchMode;
  /*
    携带入表单的数据，暂时设想不论单个表单还是批量表单，都采用数组形式存储；可以采用动态值DynamicValue设置；
    任何表单切换时，都会把当前表单的所有数据传递给下一个表单。此处可以通过DynamicValue动态设置固定的值或者
    函数在传入值的基础上进行修改后，再把生成的新的值作为records传入当前表单
  **/
  records?: any[];
};
// REFRESH
export interface RefreshAction extends CommonAction {
  stepType: OPERATION_TYPE.REFRESH;
};
export interface OpenModalAction extends CommonSwitchFormAction, CommonAction, CommonContinueTypeAction {
  stepType: OPERATION_TYPE.OPEN_MODAL;
  width: string;
  height: string;
  title: string;
  maskClosable: boolean;
};
export interface CloseModalAction extends CommonAction, CommonContinueTypeAction {
  stepType: OPERATION_TYPE.CLOSE_MODAL;
  // 关闭弹窗返回的状态
  returnState: boolean;
  // 关闭弹窗时返回表单数据
  returnDataEnabled: boolean;
};
export interface OpenTopTabAction extends CommonSwitchFormAction, CommonAction, CommonContinueTypeAction {
  stepType: OPERATION_TYPE.OPEN_TOP_TAB;
  // tab标题
  title: string;
};
export interface PopConfirmAction extends CommonAction, CommonContinueTypeAction {
  stepType: OPERATION_TYPE.POP_CONFIRM;
  content?: string;
  title?: string;
  okText?: string;
  cancelText?: string;
  cancelBtnVisible?: boolean;
};

// final
export type Action = CallApiAction | FormSwitchAction | RefreshAction |
OpenModalAction | CloseModalAction | OpenTopTabAction | PopConfirmAction;
// =================Action end=============================
// ========================================================
export interface inDataType {
  data: any[];
  [key: string]: any;
};
export interface OneActionDataType {
  in: inDataType;
  out?: any;
};
export type ActionsDataType = OneActionDataType[];

// 必要的上下文参数
export interface ActionsContext {
  // 模型id
  modelId: string;
  modelContext?: ModelContextType;
  // history，可能是hashHistory或browserHistory
  history: History;
  // 返回本页面时的刷新操作，data为返回给本页面的数据(data暂时可能用不到，为后续使用提供可能)
  // 且可以为promise
  refreshCallback?: (data?: any) => void;
};

export interface ActionHandlerProps<T extends Action = Action> {
  context: ActionsContext;
  // 本action的配置
  config: T;
  // 传入本action的参数
  inData: inDataType;
  // 所有action的数据
  actionsData: ActionsDataType;
  // 所有的action的配置
  actions: Action[];
  // 当前action的index
  index: number;
};
export type ActionHandlerType = (param: ActionHandlerProps) => any;
