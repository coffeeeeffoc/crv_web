const PROTOCOL = location.protocol;

// const HOST = '129.211.114.250';
const HOST = '192.168.0.4';
// const HOST = '192.168.0.121';
// const HOST = '192.168.0.136';
// const HOST = '129.211.143.35';
// const HOST = 'www.taxlab.com.cn';
// const HOST = '1.15.91.60';

const BASE_URL = `${PROTOCOL}//${HOST}/gateway`;
const PORT_CONFIG = {
  login: {
    port: 3000,
    ssoLogin: '',
    serverUrl: HOST,
    Redirect: `${PROTOCOL}//localhost:5000/#`,
  },
  archeivement: 8001,
  main_frame: {
    port: 5000,
    redirect: `${PROTOCOL}//localhost:3000`,
    iframePath: `${PROTOCOL}//localhost:8000`,
  },
  configurable_resource_view: 8000,
  view_config: 3001,
  module_config: 3002,
  authority: 3003,
  demo: 3004,
  function_configuration: 3005,
  importfieldmapcontrol: 3006,
  module_config_extend: 3007,
  preview: 3008,
  progress_socket: 3009,
  report_view: 8888,
  stepeditor: 3011,
  template_config: 3012,
  view_config_extend: 3013,
  work_flow: 3014,
  crv_model_config: 3015,
  crv_form_config: 3016,
  crv_model_view: 3017,
};
const isDev = process && process.env.NODE_ENV === 'development';
const originAndHostname = `${location.protocol}//localhost`;
const getRealUrl = url => {
  if (!isDev || url.match(/^http(s?):\/\//)) {
    return url;
  }
  const realUrl = url.replace(/^\/[^/]+/, slashProjectName => {
    const projectName = slashProjectName.slice(1);
    const value = PORT_CONFIG[projectName];
    const port = typeof value === 'object' ? value.port : value;
    return port ? `${originAndHostname}:${port}${slashProjectName}` : slashProjectName;
  });
  console.log('realUrl', realUrl);
  return realUrl;
};

module.exports = {
  baseUrl: BASE_URL,
  // 开发阶段时使用的配置，为了避免在无登陆的情况下复制token的麻烦
  auth: {
    appid: 'crv2',
    login_type: '0',
    username: 'admin',
    password: 'AAA@111',
  },
  // 是否记录日志
  recordLog: true,
  rewriteConsole: false,
  isDev,
  getRealUrl,
};
