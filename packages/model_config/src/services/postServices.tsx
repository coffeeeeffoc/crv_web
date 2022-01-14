import { post } from '@utils/browser/request'
import API_URL from './apiUrlConstants'
import { createAsyncThunk } from '@reduxjs/toolkit'

/**
 * createAsyncThunk传入一个字符串参数以及一个回调函数，应该返回一个包含一些异步逻辑结果的promise
 * @param {*} url
 * @returns 返回一个标准的Redux thunk action creator
 */
const AsyncPost = (url: string, callback?: Function) => createAsyncThunk(url, async (param: any) => {
  // return await post(callback?.() ?? url, param);
  let res
  try {
    const resTry = await post(callback?.() ?? url, param)
    res = {
      data: resTry.data,
      // config: resTry.config,
      status: resTry.status
    }
  } catch (err: any) {
    return await Promise.resolve(err.response)
    // return Promise.reject(err.response?.data)
  }
  return res
})

export const POST_REQUEST = {
  /**
   * ModelListSlice 相关
   */
  // 获取modelList数据
  queryModel: AsyncPost(API_URL.QUERY_SPLIT + 'queryModel', () => API_URL.QUERY_SPLIT),
  // 新建模型保存
  createModel: AsyncPost(API_URL.MODEL_CREATE),
  // 删除模型
  delModel: AsyncPost(API_URL.MODEL_DELETE),
  // 创建表
  createTable: AsyncPost(API_URL.CREATE_TABLES),
  /**
   * ModelEditSlice 相关
   */
  // 获取特定模型的相关数据
  queryOne: AsyncPost(API_URL.QUERY_ONE + 'queryOne', () => API_URL.QUERY_ONE),
  // 编辑模型后保存
  saveBase: AsyncPost(API_URL.MODEL_UPDATE),
  /**
   * FieldSlice 相关
   */
  createFieldSave: AsyncPost(API_URL.FIELD_INSERT),
  editFieldSave: AsyncPost(API_URL.FIELD_UPDATE),
  delField: AsyncPost(API_URL.FIELD_DELETE),
  refModel: AsyncPost(API_URL.ASSOCIATE_TABLE + 'refModel', () => API_URL.ASSOCIATE_TABLE),
  refModelField: AsyncPost(API_URL.ASSOCIATE_FIELD),
  retrieveOptions: AsyncPost(API_URL.RETRIEVE_OPTIONS),
  createOption: AsyncPost(API_URL.CREATE_OPTIONS),
  updateOption: AsyncPost(API_URL.UPDATE_OPTIONS),
  /**
   * ViewSlice 相关
   */
  editViewSave: AsyncPost(API_URL.VIEW_UPDATE),
  deleteView: AsyncPost(API_URL.VIEW_DELETE),
  createDefaultView: AsyncPost(API_URL.CREATE_DEFAULT_VIEW),
  copyView: AsyncPost(API_URL.VIEW_COPY),
  /**
   * Operation 相关
   */
  externalApi: AsyncPost(API_URL.EXTERNAL_API),
  externalPage: AsyncPost(API_URL.EXTERNAL_PAGE),
  updateOperation: AsyncPost(API_URL.OPERATION_UPDATE),
  deleteOperation: AsyncPost(API_URL.OPERATION_DELETE),
  /**
   * Operation 相关
   */
  deleteFormConfig: AsyncPost(API_URL.FORM_CONFIG_DELETE),
  createFormConfig: AsyncPost(API_URL.FORM_CONFIG_CREATE)
};
