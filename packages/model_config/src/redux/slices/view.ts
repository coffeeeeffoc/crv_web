import { createSlice } from '@reduxjs/toolkit'
import { message as messageCode } from 'antd'
import { POST_REQUEST } from '@/services/postServices'
import { RequestBackType } from '../interface'
import { viewInitialStateType } from '../interface/viewInterface'
const { createDefaultView, editViewSave, deleteView, copyView } = POST_REQUEST

const initialState: viewInitialStateType = {
  // loading: 页面是否加载效果
  loading: false,
  editSuccess: false,
  /** viewData: 存放单条视图的相关数据
   * {
    'id': '1+',
    'createUser': 'wm',
    'createTime': '2020-09-08 08:23:34 CST',
    'lastUpdateUser': 'wm',
    'lastUpdateTime': '2020-09-08 08:23:34 CST',
    'name': '视图1',
    'statement': '这是视图说明',
    'supportSelectCal': true,
    'version': 1,
    'viewFields': [
      {
        'id': 'field1',
        'columnWidth': 1000,
        'summary': 'avg(filed1)',
        'summaryFormat': '合计:${}金额',
        'showName': 'abc',
        'headerAlign': 'LEFT',
        'contentAlign': 'CENTER,默认金额居右，文本居左'
      },
      { 'id': 'field2' }
    ],
    'viewOperations': {
      'headerShowCount': 3,
      'dataShowCount': 3,
      'tableHeader': [
        { 'name': '', 'type': 'SINGLE', 'operationIds': ['1'] },
        { 'name': '', 'type': 'COMBO', 'operationIds': ['1', '2'] }
      ],
      'dataRow': [
        { 'name': '', 'type': 'SINGLE', 'operationIds': ['1'] },
        { 'name': '', 'type': 'COMBO', 'operationIds': ['1', '2'] }
      ]
    },
    'viewDataFilter': {
      'conditions': [
        {
          'id': 1,
          'column': 'field1',
          'operation': '=',
          'value': '通用值(100)；也可以是系统变量(${duration})'
        },
        {}
      ],
      'conditionCombination': '(1 or 2) and 3 [or,and,not]'
    },
    'summaryCalculate': [],
    'externalDataApi': ''
  }
   */
  viewData: {},
  // modelId 模型Id
  modelId: '',
  viewVersions: 0,
  // viewOperation
  viewOperationSelectKey: {}
}

export const {
  actions,
  reducer
} = createSlice({
  name: 'view',
  initialState,
  reducers: {
    setViewState (state: viewInitialStateType, { payload }) {
      state = { ...state, ...payload }
      return state
    },
    setViewData (state: viewInitialStateType, { payload }) {
      state.viewData = { ...state.viewData, ...payload }
    },
    setOperationSelect (state: viewInitialStateType, { payload }) {
      if (payload === null) {
        state.viewOperationSelectKey = {}
      } else {
        state.viewOperationSelectKey[payload.type] = payload.viewOperationSelectKey
      }
      return state
    },
  },
  extraReducers: (builder: any) => {
    builder.addCase(createDefaultView.pending, (state: viewInitialStateType) => {
      state.loading = true
      return state
    })
    builder.addCase(createDefaultView.fulfilled, (state: viewInitialStateType, { payload }: RequestBackType) => {
      const { status, message } = payload.data
      if (status === 200) {
        messageCode.success(message)
        state.viewVersions = state.viewVersions + 1
      } else {
        messageCode.error(message)
      }
      state.loading = false
      return state
    })
    builder.addCase(createDefaultView.rejected, (state: viewInitialStateType) => {
      messageCode.warn('默认视图创建失败')
      state.loading = false
      return state
    })
    builder.addCase(copyView.pending, (state: viewInitialStateType) => {
      state.loading = true
      return state
    })
    builder.addCase(copyView.fulfilled, (state: viewInitialStateType, { payload }: RequestBackType) => {
      const { status, message } = payload.data
      if (status === 200) {
        messageCode.success(message)
        state.viewVersions = state.viewVersions + 1
      } else {
        messageCode.error(message)
      }
      state.loading = false
      return state
    })
    builder.addCase(editViewSave.pending, (state: viewInitialStateType) => {
      state.loading = true
      return state
    })
    builder.addCase(editViewSave.fulfilled, (state: viewInitialStateType, { payload }: RequestBackType) => {
      const { status, message } = payload.data
      if (status === 200) {
        messageCode.success(message)
        state.viewVersions = state.viewVersions + 1
        state.editSuccess = true
      } else {
        messageCode.error(message)
      }
      state.loading = false
      return state
    })
    builder.addCase(deleteView.pending, (state: viewInitialStateType) => {
      state.loading = true
      return state
    })
    builder.addCase(deleteView.fulfilled, (state: viewInitialStateType, { payload }: RequestBackType) => {
      const { status, message } = payload.data
      if (status === 200) {
        messageCode.success(message)
        state.viewVersions = state.viewVersions + 1
      } else {
        messageCode.error(message)
      }
      state.loading = false
      return state
    })
  }
})

export default reducer
