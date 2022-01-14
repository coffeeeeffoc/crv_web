// 对于含有返回值result_list的返回值依赖
export interface listType {
  id: string | number
  [propsName: string]: any
}

export interface RequestPayloadType {
  config: any
  data: {
    result?: any
    message: string
    messageCode: number
    status: number
  }
  status: number
  request: any
}

export interface RequestMetaType {
  arg: any
  requestId: string
  requestStatus: string
}

export interface RequestBackType {
  type: string
  payload: RequestPayloadType
  meta: RequestMetaType
}

export interface RequestRejectType {
  error: any
  meta: RequestMetaType
  type: string
  payload: any
}
