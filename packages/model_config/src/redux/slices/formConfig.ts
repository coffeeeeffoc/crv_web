import { createSlice } from '@reduxjs/toolkit'
import { POST_REQUEST } from '@/services/postServices'
import { message as messageCode } from 'antd'
import { RequestBackType } from '../interface'

const { createFormConfig, deleteFormConfig } = POST_REQUEST

interface initialStateType {
  loading: boolean
  formConfigData: object
  modelId: string
  formVersion: number
}

const initialState: initialStateType = {
  // loading: 页面是否加载效果
  loading: false,
  // 存放数据，考虑将更新的数据和新建的数据都保留在此
  formConfigData: {},
  modelId: '',
  formVersion: 0
}

export const {
  actions,
  reducer
} = createSlice({
  name: 'operation',
  initialState,
  reducers: {
    setFormConfigState: (state: initialStateType, { payload }: any) => {
      state = { ...state, ...payload }
      return state
    },
  },
  extraReducers: (builder: any) => {
    builder.addCase(createFormConfig.pending, (state: initialStateType) => {
      state.loading = true
      return state
    })
    builder.addCase(createFormConfig.fulfilled, (state: initialStateType, { payload }: RequestBackType) => {
      const { status, message } = payload.data
      if (status === 200) {
        messageCode.success(message)
        state.formVersion = state.formVersion + 1
        // window.location.href = `#/model/edit/${state.modelId}`
      } else {
        messageCode.error(message)
      }
      state.loading = false
      return state
    })
    builder.addCase(deleteFormConfig.pending, (state: initialStateType) => {
      state.loading = true
      return state
    })
    builder.addCase(deleteFormConfig.fulfilled, (state: initialStateType, { payload }: RequestBackType) => {
      const { status, message } = payload.data
      if (status === 200) {
        messageCode.success(message)
        state.formVersion = state.formVersion + 1
      } else {
        messageCode.error(message)
      }
      state.loading = false
      return state
    })
  }
})

export default reducer
