import { createSlice } from '@reduxjs/toolkit'
import { ListService } from '@/services/listService'
import { message } from 'antd'

const { query, queryByUrl } = ListService
/**
 * 数据Slice
 * 数据结构说明：
 */
export const {
  actions,
  reducer
} = createSlice({
  name: 'data',
  initialState: {
    modelId: '',
    current: '',
    viewDataList: {
      // '': {
      //   loading: true, // 数据加载状态
      //   temp: {
      //     filters: {
      //       filterFields: [],
      //       filterContent: [],
      //       filterCondition: {}
      //     }, // 筛选条件
      //     selectedRows: [], // 列表选择得记录集合
      //     selectedRowKeys: [] // 列表选择得记录Id集合+
      //     selectAll: boolean // 是否选择所有数据
      //   }, // 临时数据  选择行  筛选条件等
      //   data: {
      //     list: [], // 数据集合
      //     summary: {}, //数据汇总
      //     pagination: { current: 1, pageSize: 10 } // 分页参数
      //     sorter: {} // 筛选信息
      //   }
      // }
    },
    viewDataTotal: {}
  },
  reducers: {
    setColumnStatus: (state: any, { payload }: any) => {
      const { viewId, filters, sorter } = payload;
      state.viewDataList[viewId].temp = { ...state.viewDataList[viewId].temp }
      state.viewDataList[viewId].temp.filters.columnSearch = filters;
      state.viewDataList[viewId].temp.columnSorter = sorter;
      state.viewDataList[viewId].loading = true;
      state.viewDataList[viewId].temp.selectedRowKeys = []
      state.viewDataList[viewId].temp.selectedRows = []
    },
    // 筛选条件更新
    setFilter: (state: any, { payload }: any) => {
      const { viewId, filters } = payload
      state.viewDataList[viewId].temp.filters = { ...state.viewDataList[viewId].temp.filters, ...filters }
      state.viewDataList[viewId].data.pagination = { current: 1, pageSize: 10 }
      // state.viewDataList[viewId].data.list = []
      state.viewDataList[viewId].temp.selectedRowKeys = []
      state.viewDataList[viewId].temp.selectedRows = []
      state.viewDataList[viewId].loading = true
      // return state
    },
    // 设置排序
    setSorter: (state: any, { payload }: any) => {
      const { viewId, sorter } = payload;
      state.viewDataList[viewId].data.sorter = sorter;
      state.viewDataList[viewId].loading = true;
    },
    // 修改表格行选中状态
    setSelectRows: (state: any, { payload }: any) => {
      const { viewId, selectedRows, selectedRowKeys, loading } = payload
      state.viewDataList[viewId].temp.selectedRowKeys = selectedRowKeys
      state.viewDataList[viewId].temp.selectedRows = selectedRows
      state.viewDataList[viewId].loading = loading
    },
    // 修改是否全部选中的状态
    setSelectAll: (state: any, { payload }: any) => {
      const { viewId, selectAll } = payload
      state.viewDataList[viewId].temp.selectAll = selectAll
    },
    // 分页触发
    setPage: (state: any, { payload }: any) => {
      const { viewId, pagination, sorter } = payload
      state.viewDataList[viewId].data.sorter = sorter
      state.viewDataList[viewId].data.pagination = pagination
      state.viewDataList[viewId].temp.selectedRows = []
      state.viewDataList[viewId].temp.selectedRowKeys = []
      state.viewDataList[viewId].loading = true
    },
    // 改变展示的视图时触发
    setView: (state: any, { payload }: any) => {
      const { viewId } = payload
      state.current = viewId
      Object.keys(state.viewDataList).forEach(view => {
        if (view !== viewId) {
          state.viewDataList[view].data = { list: [], pagination: { current: 1, pageSize: 10 }, sorter: [] }
          state.viewDataList[view].loading = true
        }
      })
    },
    // 若每列的宽度变化，则触发此函数
    setColsWidth: (state: any, { payload }: any) => {
      const { colsWidth, viewId } = payload
      state.viewDataList[viewId].temp.colsWidth = colsWidth
    }
  },
  extraReducers: (builder) => {
    /** d */
    builder.addCase(query.pending, (state: any, payload: any) => {
      // state.viewDataList[state.current].loading = true
      // return state
    })
    builder.addCase(query.fulfilled, (state: any, { payload }: any) => {
      const { status, result = [] } = payload.data
      // const result = JSON.parse(a)
      if (!state.viewDataList[state.current]) {
        state.viewDataList[state.current] = {}
        state.viewDataList[state.current].temp = {}
        state.viewDataList[state.current].temp.selectAll = false
        state.viewDataList[state.current].temp.colsWidth = {}
        state.viewDataList[state.current].temp.filters = {
          filterFields: [],
          filterContent: '',
          filterCondition: {}
        }
        // 存放数据
        state.viewDataList[state.current].data = {}
        // 分页
        state.viewDataList[state.current].data.pagination = {}
        // 排序
        state.viewDataList[state.current].data.sorter = []
        // 汇总
        state.viewDataList[state.current].data.total = {}
      }
      state.viewDataList[state.current].loading = false
      if (status === 200) {
        state.viewDataList[state.current].data.pagination.total = result[0].total ?? 0
        state.viewDataList[state.current].data.pagination.current = result[0].current ?? 1
        state.viewDataList[state.current].data.pagination.pageSize = result[0].pageSize ?? 10
        state.viewDataList[state.current].data.list = result[0].data
        for (let i = 1; i < result.length; i += 1) {
          if (result[i].data?.[0]?.$summary) {
            state.viewDataList[state.current].data.summary = result[i].data?.[0] ?? {}
          } else {
            state.viewDataList[state.current].data.total = result[i].data?.[0] ?? {}
            if (state.viewDataList[state.current].data?.total.id) { delete state.viewDataList[state.current].data.total.id }
          }
        }
      } else {
        // 汇总信息
        state.viewDataList[state.current].data = { list: [], pagination: { total: 0, current: 1, pageSize: 10 } }
        // state.viewDataList[state.current].loading = false
        message.error(payload?.data?.message)
      }
      return state
    })
    builder.addCase(query.rejected, (state: any, payload: any) => {
      console.info('query.rejected', state, payload)
      message.error(payload?.data?.message)
    })
    /** 自定义查询 */
    builder.addCase(queryByUrl.pending, (state: any, payload: any) => {
      const { meta: { arg: { modelId } } } = payload
      console.info('queryByUrl.pending', state, payload, modelId)
      // state[modelId] = { configLoading: true, views: [], viewList: {} }
    })
    builder.addCase(queryByUrl.fulfilled, (state: any, { meta: { arg }, payload }: any) => {
      console.info('queryByUrl.fulfilled', state, payload)
      if (!state.viewDataList[arg.data.viewId]) {
        state.viewDataList[arg.data.viewId] = {}
        state.viewDataList[arg.data.viewId].temp = {}
      }
      state.viewDataList[arg.data.viewId].data = payload.result
      state.viewDataList[arg.data.viewId].loading = false
      return state
    })
    builder.addCase(queryByUrl.rejected, (state, { payload }) => {
      console.info('queryByUrl.rejected', state, payload)
    })
  }
})

export default reducer
