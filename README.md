[[_TOC_]]
[toc]


<h1 style="text-align:center">crv_web project</h1>
# 工程目录结构
## 组织方式
  采用工具lerna.
  关于lerna的资料详见 [./md/lerna](./md/lerna/lerna.md).
## 目录

```
├── lerna.json
├── md
├── node_modules
├── package.json
├── packages
|  ├── config
|  ├── form
|  ├── rc
|  └── utils
├── README.md
├── tsconfig.setting.json
├── workspace.code-workspace
└── yarn.lock
```

其中packages下放置工程代码、共用组件、共用工具库等内容，均放置在@crv命名区间。

```
$ lerna ls

@crv/model_config
@crv/model_view
@crv/form_config
@crv/form_view
@crv/rc
@crv/utils
```

## 环境要求
  全局安装`yarn`, `lerna`, `git`
## 项目起步
  执行`yarn boot`，脚本会执行安装node_modules依赖，且各个工程建立连接，以供互相引用
## 引用另一个packages包
  假设在`form_config`中引用`rc`的代码，可以有以下几种方式：
  - `import from '@crv/rc/src/Test';` 直接通过pacakges子工程名（也就是pacakge.json中的name）来访问
    - 纯js函数的话可以直接这么使用
    - 若引用的目标代码为`ts`或者`tsx`，则会报错，可参考下面方式设置
  - `import from '@rc/Test';`
    - 为了编辑器能友好提示，以及实现代码跳转，需要在`tsconfig.json`中配置
      - `compilerOptions.baseUrl` paths的基准位置，一般是当前`tsconfig.json所处位置`
      - `compilerOptions.paths` 也就是别名
      - `include` 引用的外部文件以及内容文件的路径
    - 为了babel编译能识别别名，需要在[craco.config.js](./packages/form_config/craco.config.js)中设置alias
    - 为了babel编译能识别本子工程外部的代码，需要在`craco.config.js`中重新设置babel-loader实例的include属性
    - 为了react不报错引用本子工程外部的代码，需要移除`ModuleScopePlugin`插件实例
## 添加packages子工程
  假设工程名为`xxx`，命名空间为`@crv`
  `lerna create @crv/xxx`
## 项目启动
- 整体启动
  - `yarn dev`
    - 缺点：在根目录下执行 `yarn dev`时，每个工程启动打印的日志都会在控制台打印出来，单无法区分各个工程。
    - 优点：`Ctrl + C` 关闭终端时，可把所有自工程一起关闭，不需手动关闭node服务。相当于无副作用。
  - `yarn dev:log`
    - 优点：可区分每个工程的日志，不同颜色表示
    - 缺点：`Ctrl + C` 关闭终端时，各个工程需手动关闭。或者调用`yarn stop`关闭所有指定端口号的工程。另外，直接启动单个工程时，script脚本中会关闭本工程对应的端口号的node进程。
- 单个启动
  - `yarn mc`   启动工程`model_config`，启动前会关闭本工程对应的端口号对应的node进程
  - `yarn mv`   启动工程`model_view`，启动前会关闭本工程对应的端口号对应的node进程
  - `yarn fm`   启动工程`form_config`，启动前会关闭本工程对应的端口号对应的node进程
