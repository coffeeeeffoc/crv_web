import { parseInt } from 'lodash';
import { wordArrContext } from './ConditionValue';

const legalCondition = async (value: string, fieldArr: string[]) => {
  const valueSt = value.replace(/ {1,}/g, '').toLowerCase()
  // 首尾不能出先字母除not外
  if ((valueSt[0].charCodeAt(0) > 57 && valueSt[0].charCodeAt(0) !== 110) ||
    (valueSt[0].charCodeAt(0) < 48 && valueSt[0].charCodeAt(0) !== 40) ||
    valueSt[valueSt.length - 1].charCodeAt(0) > 57 ||
    (valueSt[valueSt.length - 1].charCodeAt(0) < 48 && valueSt[valueSt.length - 1].charCodeAt(0) !== 41)) {
    return await Promise.reject(new Error('首尾应为过滤条件或括号'))
  }
  // 找到所有字母
  const wordArr: string[] = valueSt.match(/[a-z]{1,}/g) ?? []
  // 判断字母是不是or 或者 and
  if (wordArr.filter(conditionElement => wordArrContext.includes(conditionElement)).length !== wordArr.length) {
    return Promise.reject(new Error('组合方式应为 and 或 or 或 not'))
  }
  // 找到所有的数字
  const mathArr: string[] = valueSt.match(/[0-9]{1,}/g) ?? []
  // 判断数字是否来源于过滤条件的序号
  if (mathArr.map(mathElement => {
    return fieldArr.includes(mathElement)
  }).findIndex(mathElement => !mathElement) !== -1) {
    return Promise.reject(new Error('应由过滤条件的序号匹配或过滤条件不能连续出现'))
  }
  // not左边应该是and or not (
  if (valueSt.match(/[0-9)]+not/g)) return Promise.reject(new Error('not左边应该是and,or,not,( ...'));
  if (valueSt.match(/[\u4e00-\u9fa5]+/g)) return Promise.reject(new Error('不应该出现中文'));
  let iSt = 0
  // 左括号
  const leftArr: number[] = []
  // 右括号
  const rightArr: number[] = []
  // 对应的括号对象存放
  const stringObj: { [propsName: string]: { left: number, right: number } } = {}
  // 查询括号
  valueSt.split('').forEach((element: string, index: number) => {
    if (element === '(') leftArr.push(index)
    if (element === ')') rightArr.push(index)
  })
  leftArr.reverse()
  // 括号数量不匹配
  if (leftArr.length !== rightArr.length) {
    return Promise.reject(new Error('括号不匹配'))
  } else {
    // 找出相互匹配的左右括号的对应索引
    leftArr.forEach(element => {
      stringObj[iSt] = { left: element, right: element }
      const rightIndex = rightArr.findIndex(rightElement => rightElement > element)
      stringObj[iSt].right = rightArr[rightIndex]
      rightArr.splice(rightIndex, 1)
      iSt++
    })
  }
  const objMap = Object.keys(stringObj).map(objElement => {
    // 左括号左边的字符应该不为数字
    if (parseInt(valueSt[stringObj[objElement].left - 1]) <= 9) {
      return { required: false, message: '左括号左边的字符不应为序号' }
    }
    // 左括号右边的字符应该是数字
    if (valueSt[stringObj[objElement].left + 1].charCodeAt(0) > 57 && valueSt[stringObj[objElement].left + 1].charCodeAt(0) !== 110) {
      return { required: false, message: '左括号右边的字符应为序号或非语句' }
    }
    // 右括号左边的应该为数字
    if (valueSt.match(/\D+\)/g)) {
      return { required: false, message: '右括号左边的字符应为序号' }
    }
    // if (valueSt[stringObj[objElement].right - 1].charCodeAt(0) > 57) {
    //   return { required: false, message: '右括号左边的字符应为序号' }
    // }
    // 右括号右边的应该不为数字
    if (valueSt.match(/\)\d+/g)) {
      return { required: false, message: '右括号右边的字符不应为序号' }
    }
    // if (parseInt(valueSt[stringObj[objElement].right + 1]) <= 9 || parseInt(valueSt[stringObj[objElement].right + 1]) === 110) {
    //   return { required: false, message: '右括号右边的字符不应为序号或非语句' }
    // }
    // 去掉没必要的空格
    if (!valueSt.slice(stringObj[objElement].left + 1, stringObj[objElement].right - 1).includes('or') &&
      !valueSt.slice(stringObj[objElement].left + 1, stringObj[objElement].right - 1).includes('and') &&
      !valueSt.slice(stringObj[objElement].left + 1, stringObj[objElement].right - 1).includes('not')
    ) {
      return { required: false, message: '去除没必要的括号' }
    }
    return { required: true }
  })
  if (objMap.findIndex(obj => !obj.required) !== -1) {
    return Promise.reject(new Error(objMap[objMap.findIndex(obj => !obj.required)].message))
  }
  return await Promise.resolve()
}

export default legalCondition
