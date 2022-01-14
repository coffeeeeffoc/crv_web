/**
 * 解析条件表达式
 * @param stringValue
 * @returns
 */
// import { message } from 'antd';
import { OperateType, OperateTypeMap } from '@/constants/constant';

interface FilterConditionType {
  conditionCombin: string
  conditions: any
}

interface filterParamType {
  filterCondition: FilterConditionType
  filterFields: string[]
  filterContent: string
}

const filterStringFun = ({
  filterFields = [],
  filterContent = '',
  filterCondition
}: filterParamType) => {
  // 判断是否出现非法值
  const { conditionCombin = '', conditions = [] } = filterCondition
  let stringValue = conditionCombin
  // 若没有输入则默认所有的为and
  if (stringValue === '') {
    let stringSt: any = '1'
    for (let i = 2; i <= conditions.length; i++) {
      stringSt = stringSt.split('')
      stringSt.push(`and${i}`)
      stringSt = stringSt.join('')
    }
    stringValue = stringSt
  }
  // if (string)
  const quickFind = filterFields.map(field => {
    return {
      [field]: { $like: filterContent }
    }
  })
  if (Object.keys(filterCondition).length === 0 && quickFind.length === 0) {
    return {}
  }
  if (Object.keys(filterCondition).length === 0 && quickFind.length !== 0) {
    return { $or: quickFind }
  }
  const conditionFun = (element: any) => {
    const { operate, value, valueType } = conditions[element];
    const op = OperateTypeMap[operate];
    if (operate === OperateType.BETWEEN) {
      return { $gte: value.split(',')[0], $lte: value.split(',')[1], valueType }
    }
    return { [op]: [OperateType.IN, OperateType.NOT_IN].includes(operate) ? value.split(',') : value, valueType }
    /*
    switch (operate) {
      case OperateType.EQUAL:
        return { $eq: value, valueType }
      case OperateType.NOT_EQUAL:
        return { $neq: value, valueType }
      case OperateType.GREATER:
        return { $gt: value }
      case OperateType.LESS:
        return { $lt: value }
      case OperateType.GREATER_EQUAL:
        return { $gte: value }
      case OperateType.LESS_EQUAL:
        return { $lte: value }
      case OperateType.IN:
        return { $in: value.split(',') }
      case OperateType.NOT_IN:
        return { $nin: value.split(',') }
      case OperateType.BETWEEN:
        return { $gte: value.split(',')[0], $lte: value.split(',')[1] }
      case OperateType.LIKE:
        return { $like: value }
      default:
        // message.warn('携带参数存在未知项')
        return ''
    }
    */
  }

  // 去空格转小写首尾加括号
  let stringSt: any = stringValue.replace(/ {1,}/g, '').toLowerCase().split('')
  // if (stringSt[0] !== '(' || stringSt[stringSt.length - 1] !== ')') {
  stringSt.unshift('(')
  stringSt.push(')')
  // }
  stringSt = stringSt.join('')
  // 转数组
  const arrSt: string[] = stringSt.split('')
  let iSt = 0
  const leftArr: number[] = []
  const rightArr: number[] = []
  // const stringObj: any = {}
  const stringObj: { [propsName: string]: { left: number, right: number, [propsName: string]: any } } = {}
  // 找出相互匹配的左右括号的对应索引
  arrSt.forEach((element, index) => {
    if (element === '(') leftArr.push(index)
    if (element === ')') rightArr.push(index)
  })
  leftArr.reverse()
  leftArr.forEach(element => {
    stringObj[iSt] = { left: element, right: element }
    const rightIndex = rightArr.findIndex(rightElement => rightElement > element)
    stringObj[iSt].right = rightArr[rightIndex]
    rightArr.splice(rightIndex, 1)
    iSt++
  })
  // }
  // 处理数据
  Object.keys(stringObj).forEach((objElement: any) => {
    let conditionStringSt = stringSt
    for (let i = 0; i < objElement; i++) {
      // 替换先前出现过的子括号内容
      // 初始值
      const replaceSt = conditionStringSt.slice(stringObj[i].left, stringObj[i].right + 1)
      // 末尾值，保证其长度一致
      if (stringObj[i].replaceEnd) {
        conditionStringSt = conditionStringSt.replace(replaceSt, stringObj[i].replaceEnd)
      } else {
        const replaceArr: any[] = []
        for (let j = 0; j < stringObj[i].right + 1 - stringObj[i].left; j++) {
          replaceArr.push('X')
          if (j > stringObj[i].right - stringObj[i].left - i) {
            replaceArr[j] = 'L'
          }
        }
        const replaceEnd = replaceArr.join('')
        // 将替换的字符存进对应的地方
        conditionStringSt = conditionStringSt.replace(replaceSt, replaceEnd)
        stringObj[i].replaceEnd = replaceEnd
      }
    }
    const conditionSt: string = conditionStringSt.slice(stringObj[objElement].left + 1, stringObj[objElement].right)

    // 按照or拆分数组
    const conditionEnd = conditionSt.split('or').map(orElement => {
      // 若orElement为(...)
      const orIndex = Object.keys(stringObj).findIndex((objKey: any) => stringObj[objKey].replaceEnd === orElement)
      if (orIndex > -1) {
        return stringObj[orIndex].condition
      } else {
        // 按照and拆分数组
        const andCondition = orElement.split('and').map(andElement => {
          // 若andElement为(...)
          const andNoIndex = Object.keys(stringObj).findIndex((objKey: any) => stringObj[objKey].replaceEnd === andElement)
          if (andNoIndex > -1) {
            // 返回stringObj对应的condition
            return stringObj[andNoIndex].condition
            // 不为(...)时
          } else {
            // 若包含not
            // const notConditionArr = andElement.split('not')
            if (andElement.includes('not')) {
              const notConditionArr = andElement.split('not')
              if (notConditionArr.length > 2) return false
              else {
                const notElement = notConditionArr[1]
                // 若notConditionArr[1]为(...)
                const notIndex = Object.keys(stringObj).findIndex((objKey: any) => stringObj[objKey].replaceEnd === notElement)
                if (notIndex > -1) {
                  // 返回stringObj中与之匹配的条件组合
                  return { $not: stringObj[notIndex].condition }
                } else {
                  const notNoIndex = conditions.findIndex((condition: any) => String(condition.no) === notElement)
                  // 当not后字符为为序号时
                  if (conditions[notNoIndex]) {
                    // 返回{$not}
                    return { $not: { [conditions[notNoIndex].field]: conditionFun(notNoIndex) } }
                  } else {
                    // 查询不到返回false
                    return false
                  }
                }
              }
            } else {
              // 依据no来查询索引
              const andNoIndex = conditions.findIndex((condition: any) => String(condition.no) === andElement)
              if (conditions[andNoIndex]) {
                return { [conditions[andNoIndex].field]: conditionFun(andNoIndex) }
              } else {
                return false
              }
            }
          }
        })
        if (andCondition.length > 1) {
          return { $and: andCondition }
        } else {
          return andCondition[0]
        }
      }
    })
    if (conditionEnd.length > 1) {
      stringObj[objElement].condition = { $or: conditionEnd }
    } else {
      stringObj[objElement].condition = conditionEnd[0]
    }
  })
  const advanceFind = stringObj[Object.keys(stringObj).length - 1].condition
  if (quickFind.length === 0) {
    return advanceFind
  } else {
    return { $and: [advanceFind, { $or: [...quickFind] }] }
  }
}

export default filterStringFun
