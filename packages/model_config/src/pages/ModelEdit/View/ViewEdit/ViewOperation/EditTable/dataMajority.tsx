
/**
 *  判断viewOperationSelectKey中是否存在值,存在返回true；
 */
import { useEffect, useMemo, useState } from 'react'
import { useAppSelector } from '@/redux'

// eslint-disable-next-line
export default (tableValue: any): boolean => {
  const { viewOperationSelectKey = {} } = useAppSelector(state => state.view)
  const [operationIds, setOperationIds] = useState([] as any[])

  useEffect(() => {
    const updateOperation: any[] = []
    Object.keys(viewOperationSelectKey).forEach(
      (item: any) => {
        viewOperationSelectKey[item].forEach((element: string) => {
          updateOperation.splice(0, 0, element)
        })
      }
    )
    setOperationIds(updateOperation)
  }, [viewOperationSelectKey])

  const findIndex: number = useMemo(() => operationIds.findIndex((item: any) => item === tableValue[0]?.id), [operationIds, tableValue])
  // 选择项的id集合长度等于1并且包含tableValue时，返回true
  return operationIds.length === 1 && findIndex !== -1
}
