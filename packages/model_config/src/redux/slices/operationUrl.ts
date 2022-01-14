import { createSlice } from '@reduxjs/toolkit'
import { message as messageCode } from 'antd'
import { POST_REQUEST } from '@/services/postServices'
import { RequestBackType } from '../interface'

const { externalApi, externalPage } = POST_REQUEST

interface listBaseType {
  id: string
  version?: string | number
  url?: string
  name?: string
  [propsName: string]: any
}

interface initialStateType {
  list: listBaseType[]
  retrieveCondition: string
  loading: boolean
  pagination: {
    current: number
    pageSize: number
    total?: number
  }
}
const initialState: initialStateType = {
  /** list: model数据结构
     * {
        'id': 'modelName',
        'version': '1',
        'createUser': 'wm',
        'create_time': '2020-04-08 09:00:00',
        'lastUpdateUser': 'wm',
        'lastUpdateTime': '2020-04-08 09:00:00',
        'name': '模型',
        'module': 'core',
        'type': 'entity',
        'stringId': true,
        'idLength': 128,
        'exportData': true,
        'ruleDataSource': true,
        'ruleTarget': true,
        'ruleDictionary': true,
        'reportDataSource': true
      }
     */
  list: [],
  // 搜索时的value值，在第一次查询数据时为undefined
  retrieveCondition: '',
  // loading: 加载状态
  loading: true,
  // pagination: table展示效果
  pagination: { current: 1, pageSize: 10, total: 0 }
}
export const {
  actions,
  reducer
} = createSlice({
  name: 'operationOutURL',
  initialState,
  reducers: {
    /**
     * setModelId控制创建model后查询modelId
     * @param {*} state
     * @param {*} param1
     * @returns
     */
    setModelId: (state: initialStateType, { payload }: any) => {
      state = { ...state, ...payload, loading: true }
      return state
    },
    /**
     * setPagination:依据modelList表格变化更新数据
     * @param {*} state
     * @param {*} param1
     */
    setPagination: (state: initialStateType, { payload }: any) => {
      state = { ...state, ...payload, loading: true }
      return state
    },
    /**
     * setRetrieveCondition:依据modelList搜索回调更新数据
     * @param {*} state
     * @param {*} param1
     */
    setRetrieveCondition: (state: initialStateType, { payload }: any) => {
      state.retrieveCondition = payload.retrieveCondition
      state.pagination.current = 1
      state.loading = true
      return state
    }

  },
  // 引入外部操作，处理异步请求结果的reducer,传递给createReducer
  extraReducers: (builder: any) => {
    builder.addCase(externalApi.pending, (state: initialStateType) => {
      state.loading = true
    })
    builder.addCase(externalApi.fulfilled, (state: initialStateType, { payload }: RequestBackType) => {
      const { status, result, message } = payload.data
      if (status === 200) {
        state.list = result.list
        state.pagination.total = result.total
        state.loading = false
      } else {
        messageCode.error(message)
        state.loading = false
      }
      return state
    })
    builder.addCase(externalPage.pending, (state: initialStateType) => {
      state.loading = true
    })
    builder.addCase(externalPage.fulfilled, (state: initialStateType, { payload }: RequestBackType) => {
      const { status, result, message } = payload.data
      if (status === 200) {
        state.list = result.list
        state.pagination.total = result.total
        state.loading = false
      } else {
        messageCode.error(message)
        state.loading = false
      }
      return state
    })
  }
})

export default reducer
