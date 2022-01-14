import { createSlice } from '@reduxjs/toolkit'
import { message as messageCode } from 'antd'
import { POST_REQUEST } from '@/services/postServices'
import { CurrentTabType } from '@/common/constant'
import { RequestBackType } from '../interface'
import { ModelEditInitialStateType } from '../interface/modelEdit'

const { queryOne, saveBase } = POST_REQUEST

const initialState: ModelEditInitialStateType = {
  // loading: 页面是否加载效果
  loading: true,
  modelId: '',
  /**  baseInfo: 单个模型信息数据结构
   *
    {
      "id": "modelName",
      "version": "1",
      "createUser": "wm",
      "createTime": "2020-09-08 08:23:34 CST",
      "lastUpdateUser": "wm",
      "lastUpdateTime": "2020-09-08 08:23:34 CST",
      "name": "模型",
      "module": "所属模型",
      "type": "ENTITY",
      "stringId": true,
      "idLength": 128,
      "exportData": true,
      "ruleDataSource": true,
      "ruleTarget": true,
      "ruleDictionary": true,
      "reportDataSource": true,
      "fields": [],
      "operations": [],
      "views": [],
      "formConfig": [],
    }
   */
  baseInfo: {},
  // currentTab 当前tab的展示页面，控制在进行操作（保存，返回可定位到对应修改的位置）,
  currentTab: CurrentTabType.BASE,
  // update 更新的次数，在进行部分操作后，以确保为最新数据
  update: 0
}

export const {
  actions,
  reducer
} = createSlice({
  name: 'modelEdit',
  initialState,
  reducers: {
    setCurrentTab: (state: ModelEditInitialStateType, { payload }: any) => {
      // 用于将所有可枚举属性的值从一个或多个源对象分配到目标对象,将返回目标对象
      state.currentTab = payload.currentTab
    },
    setUpdate: (state: ModelEditInitialStateType, { payload }) => {
      state.update++
    },
    setBaseInfo: (state: ModelEditInitialStateType, { payload }: any) => {
      state = { ...state, ...payload }
      return state
    },
    setModelId: (state: ModelEditInitialStateType, { payload }: any) => {
      state.modelId = payload
    }
  },
  extraReducers: (builder: any) => {
    builder.addCase(queryOne.pending, (state: ModelEditInitialStateType) => {
      state.loading = true
      return state
    })
    builder.addCase(saveBase.pending, (state: ModelEditInitialStateType) => {
      state.loading = true
      return state
    })
    builder.addCase(queryOne.fulfilled, (state: ModelEditInitialStateType, { payload }: RequestBackType) => {
      const { status, result = {}, message } = payload.data
      if (status === 200) {
        state.baseInfo = result
        state.modelId = result.id
        // state.baseInfo.fields = result.fields?.filter(({ id }: any) => id[0] !== '_')
        // state.baseInfo.filterFields
      } else {
        messageCode.error(message)
      }
      state.loading = false
      return state
    })
    builder.addCase(saveBase.fulfilled, (state: ModelEditInitialStateType, { payload }: RequestBackType) => {
      const { status, message } = payload?.data
      if (status === 200) {
        messageCode.success(message)
        state.currentTab = CurrentTabType.BASE
        state.update = state.update + 1
      } else {
        messageCode.error(message)
      }
      state.loading = false
      return state
    })
  }
})

export default reducer
