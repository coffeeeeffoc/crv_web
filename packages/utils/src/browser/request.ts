import crypto from 'crypto';
import axios, { AxiosRequestConfig, AxiosInstance } from 'axios';
import { baseUrl, auth } from '@crv/utils/../../../project.config.js';
import message from './message';

export type { AxiosRequestConfig };
export const ajax = ({
  url,
  method = 'GET',
  async = true,
  onSuccess,
  onError,
  timeout,
  data,
  contentType = 'application/json;charset=UTF-8',
}: any) => {
  const isJSON = contentType.includes('application/json');
  const xhr = new XMLHttpRequest();
  xhr.open(method, url, async);
  xhr.onload = function (e) {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        onSuccess?.(xhr.responseText);
      } else {
        console.error(xhr.statusText);
      }
    }
  };
  xhr.onerror = function (e) {
    onError?.(xhr.statusText);
  };
  xhr.setRequestHeader('Content-Type', contentType);
  xhr.send(
    method === 'POST'
      ? isJSON
        ? JSON.stringify(data)
        : data
      : null
  );
  timeout !== undefined && (xhr.timeout = timeout);
  const result = xhr.responseText;
  if (!async) {
    return isJSON
      ? JSON.parse(result)
      : result;
  }
};

let token = window.top?.Mainframe?.getToken?.();
export const baseURL = window.top?.getAttribute?.('host') ?? baseUrl ?? window.document.body.getAttribute('host');

if (process.env.NODE_ENV === 'development') {
  // 开发环境下，且没和main_frame同时启动联调的情况下，调用login接口获取token
  if (!token) {
    const accessToken = sessionStorage.getItem('access_token');
    if (accessToken) {
      token = accessToken;
    } else {
      const hash = crypto.createHash('sha256');
      hash.update(auth.password);
      const password = hash.digest('hex');
      const loginResult = ajax({
        url: `${baseURL}/security/login`,
        method: 'POST',
        async: false,
        data: {
          ...auth,
          password,
        },
      });
      token = (loginResult?.result?.access_token ?? '') as string;
      sessionStorage.setItem('access_token', token);
    }
  }
}
export const basicConfig: AxiosRequestConfig = {
  baseURL,
  headers: {
    Authorization: `Bearer ${token}`,
  },
  timeout: 15000,
};

export const createPost = (inst: AxiosInstance) => (url: string, data?: any, options?: any) => inst({ url, method: 'POST', data, ...options });
export const createGet = (inst: AxiosInstance) => (url: string, options?: any) => inst({ url, method: 'POST', ...options });

// 一般请求实例
export const axiosInstance = axios.create(basicConfig);
export const post = createPost(axiosInstance);
export const get = createGet(axiosInstance);

// 自动报错的请求实例
export const autoErrorInstance = axios.create(basicConfig);
export const autoErrorPost = createPost(autoErrorInstance);
export const autoErrorGet = createGet(autoErrorInstance);

autoErrorInstance.interceptors.request.use(function (config) {
  if (!config.headers['Content-Type'] && !(config.data instanceof FormData)) {
    config.headers['Content-Type'] = 'application/json; charset=utf-8';
  }
  return config;
}, async function (error) {
  const msg = error?.response?.data?.message ?? '请求发出报错';
  message.error(msg);
  console.error(msg, error);
  return await Promise.reject(error);
});

autoErrorInstance.interceptors.response.use(function (response) {
  if (response.data?.status !== 200) {
    message.error(response.data?.message ?? `url:[${response.config.url}]请求出错`);
  }
  return response;
}, async function (error) {
  if (error.response.status === 401) {
    if (process.env.NODE_ENV === 'development') {
      sessionStorage.removeItem('access_token');
      location.reload();
      return;
    } else {
      top?.Mainframe?.logout();
    }
  }
  const msg = error?.response?.data?.message ?? '请求返回报错';
  message.error(msg);
  console.error(msg, error);
  return await Promise.reject(error);
});

export default axiosInstance;
