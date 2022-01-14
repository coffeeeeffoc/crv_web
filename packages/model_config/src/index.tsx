import React from 'react';
import ReactDOM from 'react-dom';
import './index.less';
import zhCN from 'antd/es/locale/zh_CN';
import 'moment/locale/zh-cn';
import App from './App';
import reportWebVitals from './reportWebVitals';
import './mock';
import { ConfigProvider } from 'antd';

ReactDOM.render(
  <React.StrictMode >
    <ConfigProvider locale={zhCN}>
      <App />
    </ConfigProvider>,
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals(console.log);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
