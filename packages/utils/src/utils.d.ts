// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference types="react-scripts" />

// 解决报错"找不到模块“./index.less”或其相应的类型声明"
declare module '*.less';
declare module 'lodash';
declare module 'uuid';
// declare module '*.json';

interface systemSettingsType {
  id: string;
  value: string;
};

declare interface Object {
  hasOwn: (obj: any, key: string) => boolean;
};

declare interface Window {
  willLog: boolean;
  rewriteConsole: boolean;
  getAttribute: (propName: string) => string;
  Mainframe: {
    getSystemSetting: () => systemSettingsType[];
    getShowHelp: () => any;
    getToken: () => string;
    getOrgnization: () => string;
    getRange: () => string;
    getRangeNew: () => string;
    getDuration: () => string;
    getDurationObj: () => any;
    getmenuGroupId: () => string;
    getAppId: () => string;
    getlanguageSetting: () => string;
    getUserInfo: () => any;
    formatMessage: () => any;
    getprompt: (param: any, props?: any, divStyles?: any, divOption?: any) => void;
    createModelIframe: (payload: any) => void;
    setModelIframeDatasource: (payload?: any) => void;
    removeTabSelf: (payload?: any) => void;
    removeTabIframe: (payload?: any) => void;
    getTabIframeData: (payload?: any) => void;
    logout: () => void;
    showHelp: () => void;
    getDefaultFromMainframe: () => { current: any; currentArr: any[] };
    openAsMenuApi: (param: any) => void;
    listen: () => Function;
    getIframeHeight: () => number;
    refreshOrgnizations: () => void;
  };
}
