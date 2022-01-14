const fs = require('fs');
const { parse } = require('jsonc-parser');

const removeLastSlashStar = str => str.replace(/(\/\*|\/)$/, '');

const convertTsAlias2WebpackAlias = paths =>
  Object.keys(paths).reduce((obj, key) => {
    const newKey = removeLastSlashStar(key);
    // 此处取paths[key]的第一个值，是因为本工程现在用的是webpack4，所以暂只支持单个string，webpack5可以支持string[]的多个路径
    const value = paths[key][0];
    obj[newKey] = removeLastSlashStar(value);
    return obj;
  }, {});

const readJsonFile = (filepath, getData) => {
  const buffer = fs.readFileSync(filepath);
  const json = buffer.toString();
  const obj = parse(json);
  if (getData) {
    return getData(obj);
  }
  return obj;
}
module.exports = {
  convertTsAlias2WebpackAlias,
  readJsonFile,
};
