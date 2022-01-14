/**
 * 根据lastUpdateTime排序, 返回一个数组
 * @param {array} arr
 */
// 函数入参约束，为数组
type arrType = any[]

interface sortParamType {
  lastUpdateTime: string
  createTime: any
  [propsName: string]: any
}

export const sortData = (arr: arrType): [] => {
  if (arr === []) return []
  const arrSt = JSON.parse(JSON.stringify(arr))
  const sortLastUpdateTime = (a: sortParamType, b: sortParamType) => {
    // 根据lastUpdateTime的大小判断
    return new Date(b.lastUpdateTime ?? b.createTime).getTime() - new Date(a.lastUpdateTime ?? a.createTime).getTime()
  }
  const retArr = arrSt.sort(sortLastUpdateTime)
  return retArr
}
