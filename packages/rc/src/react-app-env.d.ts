// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference types="react-scripts" />

// 解决报错"找不到模块“./index.less”或其相应的类型声明"
declare module '*.less';
declare module 'react-lazyload';
