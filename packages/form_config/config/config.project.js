const path = require('path');
const {
  readJsonFile,
  convertTsAlias2WebpackAlias,
} = require('@crv/utils/src/node/projectConfigUtils');

// // 别名
// // (本工程现在用的是webpack4，所以暂只支持单个string，webpack5可以支持string[]的多个路径)
// const alias = {
//   '@': 'src',
//   '@@': 'src/components',
//   '@rc': '../rc/src',
// };
// // 包含其他package的目录(外部目录)
// const outerFileInclude = [
//   '../rc/src',
//   '../utils/src'
// ];

// 此处读取ts的配置文件中获取paths和include，就是为了抽象公共部分，减少配置的改动范围
const paths = readJsonFile(path.resolve(__dirname, '../tsconfig.base.json'), json => json.compilerOptions.paths);
const include = readJsonFile(path.resolve(__dirname, '../tsconfig.json'), json => json.include);

const alias = convertTsAlias2WebpackAlias(paths);
const outerFileInclude = include.filter(item => item.replace(/^(.\/)/, '') !== 'src');

module.exports = {
  alias,
  outerFileInclude,
};
