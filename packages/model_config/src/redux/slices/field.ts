import { createSlice } from '@reduxjs/toolkit'
import { message as messageCode } from 'antd'
import { POST_REQUEST } from '@/services/postServices'
import { RequestBackType, RequestRejectType } from '../interface'
import { FieldInitialStateType } from '../interface/fieldInterfaces'
import { FieldType, ShowType } from '@/common/constant'
const { createFieldSave, editFieldSave, delField, refModelField, refModel, retrieveOptions, createOption, updateOption } = POST_REQUEST

const initialState: FieldInitialStateType = {
  // loading: 页面是否加载效果
  loading: false,
  editSuccess: false,
  isDefaultFieldShow: false,
  /** show: 展示状态，默认初始表单
  * "list":FieldList字段表单页面
  * "edit":FieldEdit编辑字段页面
  * "select":FieldSelect选择字段类型页面
  * "create":FieldCreate新增字段页面
  */
  show: undefined,
  /** newControl: 创建字段时存储字段的类型
  *
    TEXT: "TEXT",
    INT: "INT",
    DOUBLE: "DOUBLE",
    CURRENCY: "CURRENCY",
    TIME: "TIME",
    DATE: "DATE",
    DATE_TIME: "DATE_TIME",
    YEAR: "YEAR",
    MONTH: "MONTH",
    PASSWORD: "PASSWORD",
    FILE: "FILE",
    SELECT: "SELECT",
    FORMULA: "FORMULA",
  */
  newControl: FieldType.TEXT,
  /** editData: 存放单条字段的相关数据
  * {
      "id": "text_field",
      "version": "1",
      "createUser": "wm",
      "createTime": "2020-08-09 08:00:00",
      "lastUpdateUser": "wm",
      "lastUpdateTime": "2020-08-09 08:00:00",
      "name": "字段名",
      "retrieve": true,
      "unique": false,
      "fieldType": "text",
      "length": 32,
      "fieldStatement": "这是字段说明（这个部分是所有字段都包含的基本数据字段，下面每个都是对特定字段类型的补充）",
      "defaultValue": "默认值",
      "dataValidity": "数据有效性验证规则"
      },
  */
  editData: {},
  // modelId 模型Id
  modelId: '',
  // fieldVersions 用于更新操作，以确保为最新数据
  fieldVersions: 0,
  // 关联表
  refModel: {
    list: [],
    total: 0,
    loading: false
  },
  // 关联字段
  refModelField: {
    list: [],
    loading: false
  },
  // 选项列表
  enumOption: {
    list: [],
    loading: false,
    show: ShowType.SELECT
  }
}

export const {
  actions,
  reducer
} = createSlice({
  name: 'field',
  initialState,
  reducers: {
    setFieldState: (state: FieldInitialStateType, { payload }: any) => {
      state = { ...state, ...payload, loading: false }
      return state
    },
    setAssociateM: (state: FieldInitialStateType, { payload }: any) => {
      state.refModel = { list: [], total: 0, loading: false }
      state.refModelField = { list: [], loading: false }
    },
    setEnumState: (state: FieldInitialStateType, { payload }: any) => {
      state.enumOption = { ...state.enumOption, ...payload }
    },
    setDefaultFieldShow: (state: FieldInitialStateType, { payload }: any) => {
      state.isDefaultFieldShow = payload.isDefaultFieldShow
    }
  },
  extraReducers: (builder: any) => {
    builder.addCase(createFieldSave.pending, (state: FieldInitialStateType) => {
      state.loading = true
    })
    builder.addCase(createFieldSave.rejected, (state: FieldInitialStateType, reject: RequestRejectType) => {
      messageCode.error(reject.error?.message ?? '创建失败')
      state.loading = false
    })
    builder.addCase(createFieldSave.fulfilled, (state: FieldInitialStateType, { payload }: RequestBackType) => {
      const { status, message } = payload.data
      if (status === 200) {
        messageCode.success(message)
        state.fieldVersions = state.fieldVersions + 1
        state.show = ShowType.EDIT
      } else {
        messageCode.error(message)
        // state.show = ShowType.EDIT
      }
      state.loading = false
    })
    builder.addCase(editFieldSave.pending, (state: FieldInitialStateType) => {
      state.loading = true
    })
    builder.addCase(editFieldSave.rejected, (state: FieldInitialStateType, reject: RequestRejectType) => {
      console.log('reject', reject, editFieldSave)
      messageCode.error(reject.error?.message)
      state.loading = false
    })
    builder.addCase(editFieldSave.fulfilled, (state: FieldInitialStateType, { payload }: RequestBackType) => {
      console.log('saveBase', payload)
      const { status, message } = payload.data
      // const history = useHistory()
      if (status === 200) {
        messageCode.success(message)
        state.refModel = { list: [], total: 0, loading: false }
        state.refModelField = { list: [], loading: false }
        state.fieldVersions = state.fieldVersions + 1
        state.editSuccess = true
        state.loading = false
      } else {
        messageCode.error(message)
        state.loading = false
      }
    })
    builder.addCase(delField.pending, (state: FieldInitialStateType) => {
      state.loading = true
    })
    builder.addCase(delField.fulfilled, (state: FieldInitialStateType, { payload }: RequestBackType) => {
      const { status, message } = payload.data
      if (status === 200) {
        messageCode.success(message)
        state.fieldVersions = state.fieldVersions + 1
      } else {
        messageCode.error(message)
      }
      state.loading = false
    })
    builder.addCase(delField.rejected, (state: FieldInitialStateType, reject: RequestRejectType) => {
      messageCode.error(reject.error?.message)
      state.loading = false
    })
    // 关联表
    builder.addCase(refModel.pending, (state: FieldInitialStateType) => {
      state.refModel.loading = true
    })
    builder.addCase(refModel.fulfilled, (state: FieldInitialStateType, { meta: { arg }, payload }: RequestBackType) => {
      const { status, result, message } = payload.data
      if (status === 200) {
        if (arg.pagination.page === 1) {
          state.refModel.list = result.list
        } else {
          state.refModel.list = [...state.refModel.list, ...result.list]
        }
        state.refModel.total = result.total
      } else {
        messageCode.error(message)
      }
      state.refModel.loading = false
    })
    // 关联字段
    builder.addCase(refModelField.pending, (state: FieldInitialStateType) => {
      state.refModelField.loading = true
    })
    builder.addCase(refModelField.fulfilled, (state: FieldInitialStateType, { payload }: RequestBackType) => {
      const { status, result, message } = payload.data
      if (status === 200) {
        state.refModelField.list = result?.[0]?.fields ?? []
      } else {
        state.refModelField.list = []
        messageCode.error(message)
      }
      state.refModelField.loading = false
    })
    // 选项查询
    builder.addCase(retrieveOptions.pending, (state: FieldInitialStateType) => {
      state.enumOption.loading = true
    })
    builder.addCase(retrieveOptions.fulfilled, (state: FieldInitialStateType, { payload }: RequestBackType) => {
      const { status, result, message } = payload.data
      if (status === 200) {
        state.enumOption.list = result ?? []
      } else {
        state.enumOption.list = []
        messageCode.error(message)
      }
      state.enumOption.loading = false
    })
    // 选项的创建
    builder.addCase(createOption.pending, (state: FieldInitialStateType) => {
      state.enumOption.loading = true
    })
    builder.addCase(createOption.fulfilled, (state: FieldInitialStateType, { payload }: RequestBackType) => {
      const { status, message } = payload.data
      if (status === 200) {
        messageCode.success(message)
        state.enumOption.show = ShowType.SELECT
      } else {
        messageCode.error(message)
      }
      state.enumOption.loading = false
    })
    // 选项更新
    builder.addCase(updateOption.pending, (state: FieldInitialStateType) => {
      state.enumOption.loading = true
    })
    builder.addCase(updateOption.fulfilled, (state: FieldInitialStateType, { payload }: RequestBackType) => {
      const { status, message } = payload.data
      if (status === 200) {
        messageCode.success(message)
        state.enumOption.show = ShowType.SELECT
      } else {
        messageCode.error(message)
      }
      state.enumOption.loading = false
    })
  }
})

export default reducer
