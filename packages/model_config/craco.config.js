const ModuleScopePlugin = require('react-dev-utils/ModuleScopePlugin');
const {
  loaderByName, getLoaders
} = require('@craco/craco');
const { configure } = require('@testing-library/react');
const CracoLessPlugin = require('craco-less');
// const CracoLessPlugin = required('craco-less');
const slash = require('slash2');
const path = require('path');

const pathResolve = pathUrl => path.join(__dirname, pathUrl)

module.exports = {
  webpack: {
    alias: {
      '@rc': pathResolve('../rc/src'),
      '@utils': pathResolve('../utils/src'),
      '@@': pathResolve('src/components'),
      '@': pathResolve('src'),
      '@redux': pathResolve('src/redux')
    },
    configure:(webpackConfig,{env,paths}) => {
      // 修改build的生成文件名称
      paths.appBuild = 'dist';
      webpackConfig.output ={
        ...webpackConfig.output,
        path:path.resolve(__dirname,'dist'),
        // 编译打包前缀
        publicPath:'/crv_model_config/'
      }
      const { matches } = getLoaders(webpackConfig, loaderByName('babel-loader'));
      const outerFileInclude = [
        "../rc/src",
        "../utils/src",
        "../../project.config.js"
      ];
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
    }
  },
  babel: {
    plugins: [
      ['import', { libraryName: 'antd', style: true }],
      ['@babel/plugin-proposal-decorators', { legacy: true }]
    ]
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
              // 类似.antd-pro-components-global-footer-index-links
              const match = context.resourcePath.match(/src(.*)/);
              if (match && match[1]) {
                const antdProPath = match[1].replace('.less', '');
                const arr = slash(antdProPath)
                  .split('/')
                  .map((a) => a.replace(/([A-Z])/g, '-$1'))
                  .map((a) => a.toLowerCase());
                return `antd-pro${arr.join('-')}-${localName}`.replace(/--/g, '-');
              }
              return localName;
            }
          },
        },
        lessLoaderOptions: {
          lessOptions: {
            // modifyVars: { '@primary-color': '#1DA57A' },
            javascriptEnabled: true
          }
        }
      }
    }
  ],
};


