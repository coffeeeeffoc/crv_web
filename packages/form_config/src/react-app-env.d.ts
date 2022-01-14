
import {} from 'react';
import { CSSProp } from '@types/styled-components';

// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference types="react-scripts" />
// 解决报错"找不到模块“./index.less”或其相应的类型声明"
declare module '*.less';
declare module 'lodash';
declare module 'uuid';
declare module 'ace-builds/src-noconflict/worker-javascript';
declare module 'ace-builds/src-noconflict/worker-json';
declare module 'ace-builds/src-noconflict/worker-css';
declare module 'ace-builds/src-noconflict/worker-html';
// declare module '*.json';

declare interface Window {
  willLog: boolean;
};

declare module 'react' {
  interface Attributes {
    css?: CSSProp | undefined;
  };
};
