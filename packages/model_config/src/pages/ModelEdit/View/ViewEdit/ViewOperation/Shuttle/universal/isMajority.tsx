
/**
 *  判断viewOperationSelectKey中是否存在值,存在返回true；
 */
const isMajority = (viewOperationSelectKey: any) => {
  const majorityDrag = Object.keys(viewOperationSelectKey).map(item => {
    if (viewOperationSelectKey[item].length > 0) return true
    return false
  })
  if (!majorityDrag.includes(true)) return false
  return true
}

export default isMajority
