import { createSlice } from '@reduxjs/toolkit'
import { ListService } from '@/services/listService'
// import { convert } from '@/utils/configConvert'
import { viewConvert } from '@/utils/configConvert/viewConfig'
import { message } from 'antd'

const { queryConfigSt, queryConfigNd } = ListService
/**
 * 空配置数据结构
 */
export const emptyConfig = {
  // 当前视图
  current: undefined,
  // 固定视图
  unChangeable: true,
  // 模型配置整体获取
  configLoading: true,
  // 视图配置
  viewLoading: true,
  // 视图配置列表
  viewList: {},
  // 视图信息
  views: [],
  // 存放展示列的数据
  showColumnsList: {}
}

export const {
  actions,
  reducer
} = createSlice({
  name: 'config',
  initialState: emptyConfig,
  reducers: {
    setModelId: (state: any, { payload }: any) => {
      const { modelId } = payload
      state.modelId = modelId
    },
    /**
     * 设置当前视图
     * @param state
     * @param param1
     */
    setView: (state: any, { payload }: any) => {
      const { viewId, unChangeable } = payload
      state.current = viewId
      state.unChangeable = unChangeable
      state.viewList = {}
    },
    /**
     * 设置显示列
     * @param state
     * @param param1
     */
    setShowColumn: (state: any, { payload }: any) => {
      const { viewId, columns } = payload
      state.viewList[viewId].config.showColumns = columns
      state.showColumnsList[viewId] = columns
    }
  },
  extraReducers: (builder) => {
    builder.addCase(queryConfigSt.fulfilled, (state: any, { payload }: any) => {
      const { data: { status, result, message: messageInfo } } = payload
      if (status === 200) {
        state.views = result[0].views;
        // current 存在但不在views集合中，跳转错误页面
        if (state.current) {
          if (result[0].views.findIndex((v: any) => `${v.id}` === `${state.current}`) < 0) { location.href = '/404' }
        } else {
          // current不存在设置默认
          state.current = result[0].views?.[0]?.id;
          state.unChangeable = false
        }
      } else { message.error(messageInfo) }
      state.configLoading = false
      console.log('queryConfigSt0', status, result, payload)
    })
    builder.addCase(queryConfigSt.rejected, (state: any, payload: any) => {
      console.log('queryConfigSt.rejected', payload)
      message.error(payload?.error?.message)
    })
    builder.addCase(queryConfigNd.pending, (state: any, { payload }: any) => {
      state.viewLoading = true
    })
    builder.addCase(queryConfigNd.fulfilled, (state: any, { payload }: any) => {
      const { data: { status, result, message: messageInfo } } = payload
      if (status === 200) {
        state.viewLoading = false
        const viewConvertValue = viewConvert(result)
        state.model = result;
        state.viewList[state.current] = viewConvertValue
        // 同步视图列表的显示信息
        if (!state.showColumnsList[state.current]) {
          state.showColumnsList[state.current] = viewConvertValue?.config?.showColumns
        }
      } else {
        message.error(messageInfo)
      }
      console.log('queryConfigSt', status, result, payload)
    })
    builder.addCase(queryConfigNd.rejected, (state: any, { payload }: any) => {
      message.error(payload?.message)
    })
  }
})

export default reducer
