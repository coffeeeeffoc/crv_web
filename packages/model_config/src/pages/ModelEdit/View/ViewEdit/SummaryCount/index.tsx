import { FC, useMemo } from 'react'
import Container from './Container'
import { useAppSelector } from '@/redux'

export interface SummaryCalculateType {
  id: number
  name: string
  formula: string
}
const SummaryCount: FC<any> = () => {
  const { viewData } = useAppSelector(state => state.view)
  const summaryCalculate: SummaryCalculateType[] = useMemo(() => viewData.summaryCalculate ?? [], [viewData.summaryCalculate])
  return (
    <Container summaryCalculate={summaryCalculate} />
  )
}

export default SummaryCount
