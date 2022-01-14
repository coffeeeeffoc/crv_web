import { createAsyncThunk } from '@reduxjs/toolkit';
import { post } from './browser/request';
/**
 * createAsyncThunk传入一个字符串参数以及一个回调函数，应该返回一个包含一些异步逻辑结果的promise
 * @param {*} url
 * @returns 返回一个标准的Redux thunk action creator
 */
// export const AsyncPost = (url: string) => createAsyncThunk(url, async (param: any) => {
//   console.info(`AsyncPost=>${url}`, param);
//   return await post(url, param);
// });
// 
export const AsyncPost = (url: string, callback?: Function) => createAsyncThunk(url, async (param: any) => {
  return await post(callback?.() ?? url, param);
})

/** 自定义URL */
export const AsyncPostCustomUrl = (prefix: string) => createAsyncThunk(prefix, async (param: any) => {
  console.info('AsyncPostCustomUrl=>', param);
  const { url, data } = param;
  return await post(url, data);
});
