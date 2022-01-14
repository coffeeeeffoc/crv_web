import axios from 'axios';
// const domain = document.body.getAttribute("domain") || "";
// import { message } from 'antd';

const service = axios.create({
  // baseURL: 'http://192.168.0.222/gateway',
  // baseURL: window.top.getAttribute ? window.top.getAttribute('host') : window.document.body.host,
  headers: {
    // 'Authorization': 'Bearer 21ba8a26-33ee-4d08-b278-009e1c257b13'
    // 'Authorization': window.top.Mainframe?.getToken !== undefined ? `Bearer ${window.top.Mainframe.getToken('accessToken')}`
    // : 'Bearer 21ba8a26-33ee-4d08-b278-009e1c257b13'
    // authorization: 'Bearer 7443b5b5-386b-43d3-a5d8-1730bdfc99c5'
    authorization: 'Bearer d22fe891-515c-408d-8de2-07f1896888ad' // model_view
  },
  timeout: 5000
});

// 发送拦截
service.interceptors.request.use(
  config => {
    return config;
  },
  async error => {
    console.log(error);
    return await Promise.reject(error);
  }
);

// 接收拦截
service.interceptors.response.use(response => {
  return response.data;
  // if (res.status !== 200) {
  //   message.error(res.message);
  //   return res
  // }
  // else {
  //   return res
  // }
}, err => {
  return err.response.data;
  // if (err?.response) {
  //   switch (err.response.status) {
  //     case 400:
  //       console.log('请求错误');
  //       break;
  //     case 401:
  //       console.log('未授权访问');
  //       break;
  //     default:
  //       console.log('其他错误信息');
  //   }
  // }
  // return err;
});

export const post = async (url: string, data: any) => await service({ url, method: 'POST', data });
export const get = async (url: string, data: any) => await service({ url, method: 'GET' });
export default service;
