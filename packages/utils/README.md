[[_TOC_]]
[toc]

## 目录结构

```
├─node_modules
│  └─.bin
└─src
    ├─browser
    └─node
```
- node
  - 开发阶段使用，主要执行于node环境，处理编译时的内容。
- ├─browser
  - 生产阶段使用，主要执行于浏览器环境，代码会被编译，故可使用TS、ES6等语法。