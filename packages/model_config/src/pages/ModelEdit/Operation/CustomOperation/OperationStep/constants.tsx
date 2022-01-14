import { Radio, Space, Checkbox, Row, Col } from 'antd'
/**
 * 常量
 */
// stepType
export enum OperationType {
  FORM_SWITCH = 'FORM_SWITCH',
  CALL_API = 'CALL_API',
  REFRESH = 'REFRESH',
  POP_CONFIRM = 'POP_CONFIRM',
  OPEN_MODAL = 'OPEN_MODAL',
  CLOSE_MODAL = 'CLOSE_MODAL',
  OPEN_TOP_TAB = 'OPEN_TOP_TAB',
  SAVE = 'SAVE',
  DELETE = 'DELETE',
  GO_BACK = 'GO_BACK'
}

// FORM_SWITCH
export enum EnumPageType {
  INNER_PAGE = 'INNER_PAGE',
  EXTERNAL_PAGE = 'EXTERNAL_PAGE',
  GO_BACK = 'GO_BACK'
}

export enum EnumInnerPageType {
  VIEW = 'VIEW',
  FORM = 'FORM'
}

// formType
export enum EnumToForm {
  EDIT = 'EDIT',
  CREATE = 'CREATE',
  DELETE = 'DELETE',
  BATCH = 'BATCH',
  COPY = 'COPY',
  DETAIL = 'DETAIL'
}

export const operateTypeConfig: any[] = [
  { value: EnumToForm.EDIT, key: EnumToForm.EDIT, name: '编辑' },
  { value: EnumToForm.CREATE, key: EnumToForm.CREATE, name: '创建' },
  { value: EnumToForm.DETAIL, key: EnumToForm.DETAIL, name: '明细' },
  { value: EnumToForm.BATCH, key: EnumToForm.BATCH, name: '批量' },
  { value: EnumToForm.COPY, key: EnumToForm.COPY, name: '复制' }
]

// CALL_API
export enum EnumCallApiType {
  EXTERNAL_API = 'EXTERNAL_API',
  INNER_API = 'INNER_API',
}

// innerApi
export enum EnumInnerApi {
  DELETE = 'DELETE',
  EXPORT_DATA = 'EXPORT_DATA',
  IMPORT_DATA = 'IMPORT_DATA',
  CREATE_DATA = 'CREATE_DATA',
  UPDATE_SINGLE = 'UPDATE_SINGLE',
  UPDATE_MULTIPLE = 'UPDATE_MULTIPLE',
  SAVE = 'SAVE',
}

export const innerURLOption = [
  { key: EnumInnerApi.DELETE, value: EnumInnerApi.DELETE, name: '删除数据' },
  { key: EnumInnerApi.EXPORT_DATA, value: EnumInnerApi.EXPORT_DATA, name: '导出数据' },
  { key: EnumInnerApi.IMPORT_DATA, value: EnumInnerApi.IMPORT_DATA, name: '导入数据' },
  { key: EnumInnerApi.CREATE_DATA, value: EnumInnerApi.CREATE_DATA, name: '新增数据' },
  { key: EnumInnerApi.UPDATE_SINGLE, value: EnumInnerApi.UPDATE_SINGLE, name: '更新单条数据' },
  { key: EnumInnerApi.UPDATE_MULTIPLE, value: EnumInnerApi.UPDATE_MULTIPLE, name: '更新多条数据' },
  { key: EnumInnerApi.SAVE, value: EnumInnerApi.SAVE, name: '保存数据(自动判断是更新单条数据、更新多条数据、新增数据)' }
]

export const displayOperationType: any = {
  [OperationType.FORM_SWITCH]: '表单切换',
  [OperationType.CALL_API]: '调用服务',
  [OperationType.REFRESH]: '刷新',
  [OperationType.POP_CONFIRM]: '弹出提示',
  [OperationType.OPEN_MODAL]: '打开弹窗',
  [OperationType.CLOSE_MODAL]: '关闭弹窗',
  [OperationType.OPEN_TOP_TAB]: 'OPEN_TOP_TAB'
}

export const selectOperationTypeMap = {
  title: '',
  name: 'operationType',
  control: <Radio.Group>
    <Space direction='vertical'>
      {
        [
          { value: OperationType.FORM_SWITCH, key: OperationType.FORM_SWITCH, label: '表单切换，切换到指定的表单页面' },
          { value: OperationType.CALL_API, key: OperationType.CALL_API, label: '调用服务，调用指定的API接口' },
          { value: OperationType.REFRESH, key: OperationType.REFRESH, label: '刷新' },
          { value: OperationType.POP_CONFIRM, key: OperationType.POP_CONFIRM, label: '弹出提示，弹出自定义消息内容' },
          { value: OperationType.OPEN_MODAL, label: '打开弹窗，在打开的弹窗中显示给定的表单页面。' },
          { value: OperationType.CLOSE_MODAL, label: '关闭弹窗，关闭当前打开的弹窗' },
          { value: OperationType.OPEN_TOP_TAB, label: '打开Tab页，打开新的Tab页面显示' }
        ].map(item => <Radio key={item.key} value={item.value}>{item.label}</Radio>)
      }
    </Space>
  </Radio.Group>
}

export const selectGeneralOperationTypeMap = {
  title: '',
  name: 'operationType',
  control: <Checkbox.Group>
    <Row>
      {
        [
          { key: OperationType.REFRESH, value: OperationType.REFRESH, label: '刷新' },
          { key: OperationType.SAVE, value: OperationType.SAVE, label: '保存' },
          { key: OperationType.DELETE, value: OperationType.DELETE, label: '删除' },
          { key: OperationType.GO_BACK, value: OperationType.GO_BACK, label: '返回' }
        ].map(({ key, value, label }) => <Col key={`${key}-col`} span={24}><Checkbox key={key} value={value}>{label}</Checkbox></Col>)
      }
    </Row>
  </Checkbox.Group>
}
