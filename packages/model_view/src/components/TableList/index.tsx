import { useEffect } from 'react'
import { useAppSelector } from '@/redux'
import { useDispatch } from 'react-redux'
import DataTable from '../DataTable';
import { ListConfigProps, ViewProps } from '@/interfaces/ListConfig'
import { emptyData, emptyConfig } from '@/constants/dataSliceConstant'
import { queryDataPreProcessing } from '@/utils/listPreprocessing';
import { ListService } from '@/services/listService';
import { queryRequest } from '@/services/requestEncoder';
const { query } = ListService;

export default () => {
  const dispatch = useDispatch()

  // 配置
  const { modelId, current, viewList, configLoading, viewLoading }: ListConfigProps = useAppSelector((state: any) => state.config)
  const { supportSelectCal, config: { viewFields = [], viewDataFilter, defaultSort, summaryCalculate } }: ViewProps = viewList[current] ?? emptyConfig
  // 数据
  const loading = useAppSelector((state: any) => state.data.viewDataList[current]?.loading) ?? true
  const tempData = useAppSelector((state: any) => state.data.viewDataList[current]?.temp);
  const { pagination } = useAppSelector((state: any) => state.data.viewDataList[current]?.data) ?? emptyData

  useEffect(() => {
    // TODO: 依据视图配置信息查询对应的试图数据 将外部查找暂时去掉（因为目前没有涉及到），考虑在后续添加
    if (current && loading && !configLoading && !viewLoading && viewFields.length > 0) {
      const params = queryDataPreProcessing(modelId, pagination, viewFields, defaultSort, tempData, viewDataFilter, summaryCalculate);
      if (supportSelectCal) {
        if ((tempData?.selectedRowKeys ?? []).length > 0) {
          if (params.filter.length === 0) { params.filter.push({}) }
          params.filter.push({ id: { $in: tempData.selectedRowKeys } })
          params.queryList = false
        } else {
          params.queryList = true
        }
      }
      dispatch(query(queryRequest(params)))
    }
  }, [configLoading, current, defaultSort, dispatch, loading, modelId, pagination, summaryCalculate, supportSelectCal, tempData, viewDataFilter, viewFields, viewLoading])

  return (
    <DataTable />
  )
}
