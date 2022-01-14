/**
 * 转化类，提取类的函数
 */

// 返回一个字符串中的数字数量
export const reNumberCount = (stringSt: string) => {
  return (stringSt.match(/[0-9]/g) ?? []).length
}

// 返回一个数字的小数位数
export const reDecimalCount = (numberSt: number) => {
  const arraySt = String(numberSt).split('')
  // 小数点的位置
  let pointIndex = arraySt.indexOf('.') + 1
  // 小数点不存在时返回0
  return pointIndex === 0 ? 0 : arraySt.length - pointIndex
}

// 防抖函数
export const deBounce = (func: any, delay: number) => {
  let timer: any = null
  return function (...args: any) {
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      func(...args)
    }, delay)
  }
}

// 深拷贝
export const deepCopy = (dataSt: any, errorOutput?: any) => {
  try {
    return JSON.parse(JSON.stringify(dataSt))
  } catch {
    return errorOutput ?? ''
  }
}
