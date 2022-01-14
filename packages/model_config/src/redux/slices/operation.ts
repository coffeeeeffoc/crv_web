import { createSlice } from '@reduxjs/toolkit'
import { POST_REQUEST } from '@/services/postServices'
import { message as messageCode } from 'antd'
import { RequestBackType, RequestRejectType } from '../interface'

const { updateOperation, deleteOperation } = POST_REQUEST

type showType = '' | 'edit' | 'create'
interface initialStateType {
  editSuccess: boolean
  loading: boolean
  show: showType
  operationData: object
  modelId: string
  operationVersion: number
}

const initialState: initialStateType = {
  // loading: 页面是否加载效果
  loading: false,
  editSuccess: false,
  // 展示编辑或是创建页面
  show: '',
  // 存放数据，考虑将更新的数据和新建的数据都保留在此
  operationData: {},
  modelId: '',
  operationVersion: 0
}

export const {
  actions,
  reducer
} = createSlice({
  name: 'operation',
  initialState,
  reducers: {
    setOperationState: (state: initialStateType, { payload }) => {
      state = { ...state, ...payload }
      return state
    },
  },
  extraReducers: (builder: any) => {
    builder.addCase(updateOperation.pending, (state: initialStateType) => {
      state.loading = true
    })
    builder.addCase(updateOperation.rejected, (state: initialStateType, reject: RequestRejectType) => {
      messageCode.error(reject.error?.message)
    })
    builder.addCase(updateOperation.fulfilled, (state: initialStateType, { payload }: RequestBackType) => {
      const { status, message } = payload.data
      if (status === 200) {
        messageCode.success(message)
        state.operationVersion = state.operationVersion + 1
        state.editSuccess = true
        // window.location.href = `/model/edit/${state.modelId}`
      } else {
        messageCode.error(message)
      }
      state.loading = false
      return state
    })
    builder.addCase(deleteOperation.pending, (state: initialStateType) => {
      state.loading = true
    })
    builder.addCase(deleteOperation.rejected, (state: initialStateType, reject: RequestRejectType) => {
      messageCode.error(reject.error?.message)
    })
    builder.addCase(deleteOperation.fulfilled, (state: initialStateType, { payload }: RequestBackType) => {
      const { status, message } = payload.data
      if (status === 200) {
        messageCode.success(message)
        state.operationVersion = state.operationVersion + 1
      } else {
        messageCode.error(message)
      }
      state.loading = false
      return state
    })
  }
})

export default reducer
