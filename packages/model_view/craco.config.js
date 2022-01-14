const ModuleScopePlugin = require('react-dev-utils/ModuleScopePlugin');
const {
  loaderByName, getLoaders
} = require('@craco/craco');
const path = require('path');
const slash = require('slash2');
const CracoLessPlugin = require('craco-less');

// 别名
const alias = {
  '@': 'src',
  '@@': 'src/components',
  '@rc': '../rc/src',
  '@utils': '../utils/src',
};
// 其他package的目录
const outerFileInclude = [
  '../rc/src',
  '../utils/src',
  // '../form_config/src'
];

module.exports = {
  webpack: {
    alias: Object.keys(alias).reduce((obj, key) => {
      obj[key] = path.resolve(__dirname, alias[key]);
      return obj;
    }, {}),
    configure: (webpackConfig, { env, paths }) => {
      const { matches } = getLoaders(webpackConfig, loaderByName('babel-loader'));
      // 重写babel-loader的include属性，添加outerFileInclude目录
      matches
        .filter(item => item.loader.test.toString().match(/ts/))
        .forEach(({ loader }, index) => {
          const { include } = loader;
          const babelLoaderInclude = outerFileInclude.map(filePath => path.resolve(__dirname, filePath));
          if (include) {
            loader.include = Array.isArray(include) ? [...include, ...babelLoaderInclude] : [include, ...babelLoaderInclude];
          }
        });
      // 移除ModuleScopePlugin插件，允许导入工程外的目录的文件
      webpackConfig.resolve.plugins = webpackConfig.resolve.plugins.filter(plugin => !(plugin instanceof ModuleScopePlugin));

      return webpackConfig;
    },
  },
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        cssLoaderOptions: {
          modules: {
            getLocalIdent: (context, localIdentName, localName) => {
              if (
                context.resourcePath.includes('node_modules') ||
                context.resourcePath.includes('ant.design.pro.less') ||
                // umi 的 global.less 约定不使用 css-module
                context.resourcePath.includes('global.less')
              ) {
                return localName;
              }
              // 将 uuid 的类名转化为 antd-pro-文件路径的样式。
              // 类似components-global-footer-index-links
              const match = context.resourcePath.match(/src(.*)/);
              if (match && match[1]) {
                const antdProPath = match[1].replace('.less', '');
                const arr = slash(antdProPath)
                  .split('/')
                  .map((a) => a.replace(/([A-Z])/g, '-$1'))
                  .map((a) => a.toLowerCase());
                return `${arr.join('-')}-${localName}`.replace(/--/g, '-');
              }
              return localName;
            }
          },
        },
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: { '@primary-color': '#1890FF' },
            javascriptEnabled: true,
          },
        },
      }
    }
  ]
};
