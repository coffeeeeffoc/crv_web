import { AsyncPost, AsyncPostCustomUrl } from '@crv/utils/src/asyncThunk';

export enum ApiUrl {
  QUERY_CONFIG = 'crvserviceconfig/model/retrieveRequire',
  QUERY_DATA = 'crvserviceview/data',
  RETRIEVE = 'crvserviceview/configData/retrieve'
}

export const ListService = {
  /** 配置查询接口 */
  queryConfigSt: AsyncPost(ApiUrl.QUERY_CONFIG + 'st', () => ApiUrl.QUERY_CONFIG),
  queryConfigNd: AsyncPost(ApiUrl.QUERY_CONFIG + 'nd', () => ApiUrl.QUERY_CONFIG),
  // queryConfig: AsyncPost('http://192.168.0.222/gateway/crvserviceview/configData/retrieve'),
  /** 数据查询接口 */
  // query: AsyncPost('data/list/query'),
  query: AsyncPost(ApiUrl.QUERY_DATA),
  // 查询合计
  // queryTotal: AsyncPost(ApiUrl.QUERY_DATA + '?v=total'),
  // query: AsyncPost('http://192.168.0.222/gateway/crvserviceview/data'),
  /** 新增 */
  insert: AsyncPost(''),
  /** 编辑 */
  edit: AsyncPost(''),
  /** 保存 */
  delete: AsyncPost(''),
  /** 自定义查询接口 */
  queryByUrl: AsyncPostCustomUrl('扩展url')
}
