/* eslint-disable no-template-curly-in-string */
import Mock from 'mockjs';

export default [
  {
    url: 'config/list/query',
    type: 'post',
    response: (config: any) => {
      return Mock.mock({
        status: 200,
        message: 'success',
        result: {
          id: 'modelId',
          version: '1',
          name: '模型',
          module: '所属模型',
          type: 'ENTITY',
          stringId: true,
          idLength: 128,
          exportData: true,
          ruleDataSource: true,
          ruleTarget: true,
          ruleDictionary: true,
          reportDataSource: true,
          fields: [
            {
              id: 'id',
              version: '1',
              name: '编号',
              retrieve: true,
              unique: false,
              fieldType: 'NUMBER',
              length: 32,
              fieldStatement: '这是字段说明（这个部分是所有字段都包含的基本数据字段，下面每个都是对特定字段类型的补充）',
              defaultValue: '默认值',
              dataValidity: '/^jen/'
            },
            {
              id: 'name',
              version: '1',
              name: '姓名',
              retrieve: true,
              unique: false,
              fieldType: 'TEXT',
              length: 32,
              fieldStatement: '这是字段说明（这个部分是所有字段都包含的基本数据字段，下面每个都是对特定字段类型的补充）',
              defaultValue: '默认值',
              dataValidity: '/^jen/'
            },
            {
              id: 'age',
              version: '1',
              name: '年龄',
              retrieve: true,
              unique: false,
              fieldType: 'NUMBER',
              length: 32,
              fieldStatement: '这是字段说明（这个部分是所有字段都包含的基本数据字段，下面每个都是对特定字段类型的补充）',
              defaultValue: '默认值',
              dataValidity: '/^jen/'
            },
            {
              id: 'mobile',
              version: '1',
              name: '手机号码',
              retrieve: true,
              unique: false,
              fieldType: 'TEXT',
              length: 32,
              fieldStatement: '这是字段说明（这个部分是所有字段都包含的基本数据字段，下面每个都是对特定字段类型的补充）',
              defaultValue: '默认值',
              dataValidity: '/^jen/'
            },
            {
              id: 'birthday',
              version: '1',
              name: '出生日期',
              unique: false,
              fieldType: 'DATE',
              length: 32,
              fieldStatement: '这是字段说明（这个部分是所有字段都包含的基本数据字段，下面每个都是对特定字段类型的补充）',
              defaultType: 'FIXED_DATE/SYSTEM_DATE/无默认值',
              defaultValue: '2020-09-08',
              showType: 'HYPHEN_PREFIX/HYPHEN_NON_PREFIX/SLASH_PREFIX/SLASH_NON_PREFIX',
              dataValidity: '//'
            },
            {
              id: 'salary',
              version: '1',
              name: '薪水',
              unique: false,
              fieldType: 'DECIMAL',
              length: 32,
              fieldStatement: '这是字段说明（这个部分是所有字段都包含的基本数据字段，下面每个都是对特定字段类型的补充）',
              defaultValue: '0.0',
              decimalDigits: 32,
              minValue: '0.0',
              maxValue: '1999.09',
              showType: 'THOUSAND_SEPARATORS/PERCENTAGE/PER_THOUSAND',
              showDigits: 2
            }
          ],
          operations: [
            {
              id: 1,
              name: '新增',
              version: 1,
              statement: '这是操作说明',
              operationType: 'CREATE'
            },
            {
              id: 2,
              name: '编辑',
              version: 1,
              statement: '这是操作说明',
              operationType: 'EDIT'
            },
            {
              id: 3,
              name: '删除',
              version: 1,
              statement: '这是操作说明',
              operationType: 'DELETE'
            },
            {
              id: 4,
              name: '批量修改',
              version: 1,
              statement: '这是操作说明',
              operationType: 'MULTIEDIT'
            },
            {
              id: 5,
              name: '数据导入',
              version: 1,
              statement: '这是操作说明',
              operationType: 'DATAIMPORT'
            },
            {
              id: 6,
              name: '数据导出',
              version: 1,
              statement: '这是操作说明',
              operationType: 'DATAEXPORT',
              targetData: 'MULTIPLE', // NOSELDATA/ONLYONE/MULTIPLE
              supportSelectAll: true,
              operationSteps: [
                {
                  stepType: 'FORMSWITCH',
                  statement: 'this is operation statement',
                  formSwitchType: 'TOFORM',
                  formId: 'form1',
                  formType: 'EDIT/CREATE/DETAIL/BATCH/COPY'
                }
              ]
            }
          ],
          views: [
            {
              id: 1,
              name: '视图1',
              statement: '这是视图说明',
              supportSelectCal: true,
              version: 1,
              viewFields: [
                {
                  id: 'id',
                  columnWidth: 100,
                  summary: 'avg(filed1)',
                  summaryFormat: '合计:${}金额',
                  showName: '编号',
                  headerAlign: 'LEFT',
                  contentAlign: 'CENTER'
                },
                {
                  id: 'name',
                  columnWidth: 100,
                  summary: 'avg(filed1)',
                  summaryFormat: '合计:${}金额',
                  showName: '姓名',
                  headerAlign: 'LEFT',
                  contentAlign: 'CENTER'
                },
                {
                  id: 'age',
                  columnWidth: 1000,
                  summary: 'avg(filed1)',
                  summaryFormat: '合计:${}金额',
                  showName: '年龄',
                  headerAlign: 'LEFT',
                  contentAlign: 'CENTER'
                },
                {
                  id: 'mobile',
                  columnWidth: 1000,
                  summary: 'avg(filed1)',
                  summaryFormat: '合计:${}金额',
                  showName: '手机号码',
                  headerAlign: 'LEFT',
                  contentAlign: 'CENTER'
                },
                {
                  id: 'birthday',
                  columnWidth: 100,
                  summary: 'avg(filed1)',
                  summaryFormat: '合计:${}金额',
                  showName: '出生日期',
                  headerAlign: 'LEFT',
                  contentAlign: 'CENTER'
                },
                {
                  id: 'salary',
                  columnWidth: 1000,
                  summary: 'avg(filed1)',
                  summaryFormat: '合计:${}金额',
                  showName: '薪水',
                  headerAlign: 'RIGHT',
                  contentAlign: 'RIGHT'
                }
              ],
              viewOperations: {
                headerShowCount: 3,
                dataShowCount: 2,
                tableHeader: [
                  { name: '', type: 'SINGLE', operationIds: [{ id: '1', name: '新增' }] },
                  { name: '新增编辑', type: 'COMBO', operationIds: [{ id: '2', name: '编辑' }, { id: '3', name: '删除' }] },
                  { name: 'ceyan', type: 'COMBO', operationIds: [{ id: '5', name: '编辑' }] },
                  { name: '新增编辑', type: 'COMBO', operationIds: [{ id: '2', name: '编辑' }, { id: '3', name: '删除' }] },
                  { name: '新增编辑', type: 'COMBO', operationIds: [{ id: '2', name: '编辑' }, { id: '3', name: '删除' }] },
                  { name: '', type: 'SINGLE', operationIds: [{ id: '1', name: '新建' }] }
                ],
                dataRow: [
                  { name: '', type: 'SINGLE', operationIds: [{ id: '1', name: '新增' }] },
                  { name: '新增编辑', type: 'COMBO', operationIds: [{ id: '2', name: '编辑' }, { id: '3', name: '删除' }] },
                  { name: '新增编辑', type: 'COMBO', operationIds: [{ id: '2', name: '编辑' }, { id: '3', name: '删除' }] },
                  { name: '', type: 'SINGLE', operationIds: [{ id: '1', name: '新建' }] }
                ]
              },
              viewDataFilter: {
                conditions: [
                  {
                    id: 1,
                    column: 'is_sel',
                    operation: '=',
                    value: 0
                  }
                ],
                conditionCombination: '(1 or 2) and 3 [or,and,not]'
              },
              summaryCalculate: [],
              externalDataApi: 'data/list/otherUrl'
            },
            {
              id: 2,
              name: '视图2',
              statement: '这是视图说明',
              supportSelectCal: true,
              version: 1,
              viewFields: [
                {
                  id: 'id',
                  columnWidth: 100,
                  summary: 'avg(filed1)',
                  summaryFormat: '合计:${}金额',
                  showName: '编号',
                  headerAlign: 'LEFT',
                  contentAlign: 'CENTER'
                },
                {
                  id: 'name',
                  columnWidth: 100,
                  summary: 'avg(filed1)',
                  summaryFormat: '合计:${}金额',
                  showName: '姓名',
                  headerAlign: 'LEFT',
                  contentAlign: 'CENTER'
                },
                {
                  id: 'age',
                  columnWidth: 100,
                  summary: 'avg(filed1)',
                  summaryFormat: '合计:${}金额',
                  showName: '年龄',
                  headerAlign: 'LEFT',
                  contentAlign: 'CENTER'
                },
                {
                  id: 'mobile',
                  columnWidth: 100,
                  summary: 'avg(filed1)',
                  summaryFormat: '合计:${}金额',
                  showName: '手机号码',
                  headerAlign: 'LEFT',
                  contentAlign: 'CENTER'
                },
                {
                  id: 'birthday',
                  columnWidth: 100,
                  summary: 'avg(filed1)',
                  summaryFormat: '合计:${}金额',
                  showName: '出生日期',
                  headerAlign: 'LEFT',
                  contentAlign: 'CENTER'
                }
              ],
              viewOperations: {
                headerShowCount: 3,
                dataShowCount: 2,
                tableHeader: [
                  { name: '', type: 'SINGLE', operationIds: [1] },
                  { name: '', type: 'SINGLE', operationIds: [4] },
                  { name: '', type: 'SINGLE', operationIds: [5] },
                  { name: '', type: 'SINGLE', operationIds: [6] }
                ],
                dataRow: [
                  { name: '', type: 'SINGLE', operationIds: [1] },
                  { name: '', type: 'COMBO', operationIds: [2, 3] }
                ]
              },
              viewDataFilter: {
                conditions: [
                  {
                    id: 1,
                    column: 'is_sel',
                    operation: '=',
                    value: 0
                  }
                ],
                conditionCombination: '(1 or 2) and 3 [or,and,not]'
              },
              summaryCalculate: [],
              externalDataApi: ''
            }
          ],
          menuconfigures: {},
          datafilters: {},
          uniquenessrole: {},
          rolepermission: {}
        }

      })
    }
  },
  {
    url: 'data/list/query',
    type: 'post',
    response: (config: any) => {
      const { body } = config;
      const json: any = JSON.parse(body);
      return Mock.mock({
        status: 200,
        message: '互虐',
        result: {
          // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
          [`list|${json.pagination.pageSize}`]: [
            {
              // 模型信息-基本信息
              'id|+1': (json.pagination.current - 1) * json.pagination.pageSize + 1,
              'name|1-10': '★',
              'version|1': [0, 1, 2],
              'create_user|1': ['xiao ming', 'xiao wang', 'lingRan'],
              'last_update_user|1': ['xiao ming', 'xiao wang', 'lingRan'],
              'text1|1': ['text10', 'text12', 'text13'],
              'text2|1': ['text20', 'text22', 'text23'],
              'mobile|1': ['13916688974', '13916688975', '13916688976', '13916688977'],
              'last_update_time|1': ['1990-04-03 11:23:00', '1990-05-03 11:23:00', '2018-05-03 08:23:00'],
              'create_time|1': ['1990-04-03 11:23:00', '1990-05-03 11:23:00', '2018-05-03 08:23:00'],
              salary: 5
            }
          ],
          pagination: {
            current: json.pagination.current,
            pageSize: json.pagination.pageSize,
            total: 501
          }
        },
      })
    }
  },
  {
    url: 'data/list/otherUrl',
    type: 'post',
    response: (config: any) => {
      const { body } = config;
      const json: any = JSON.parse(body);
      return Mock.mock({
        status: 200,
        message: '互虐',
        result: {
          // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
          [`list|${json.pagination.pageSize}`]: [
            {
              // 模型信息-基本信息
              'id|+1': (json.pagination.current - 1) * json.pagination.pageSize + 1,
              'name|1-10': '★',
              'version|1': [0, 1, 2],
              'create_user|1': ['xiao ming', 'xiao wang', 'lingRan'],
              'last_update_user|1': ['xiao ming', 'xiao wang', 'lingRan'],
              'text1|1': ['text10', 'text12', 'text13'],
              'text2|1': ['text20', 'text22', 'text23'],
              'mobile|1': ['13916688974', '13916688975', '13916688976', '13916688977'],
              'last_update_time|1': ['1990-04-03 11:23:00', '1990-05-03 11:23:00', '2018-05-03 08:23:00'],
              'create_time|1': ['1990-04-03 11:23:00', '1990-05-03 11:23:00', '2018-05-03 08:23:00'],
              // salary: 10
            }
            // {
            //   // 模型信息-基本信息
            //   'id|+1': (json.pagination.current - 1) * json.pagination.pageSize + 1,
            //   'name|1-10': '★',
            //   'age|1': [35, 30],
            //   'mobile|1': ['13916688974', '13916688975', '13916688976', '13916688977'],
            //   'birthday|1': ['1990-04-03 11:23:00', '1990-05-03 11:23:00'],
            //   salary: 10
            // }
          ],
          pagination: {
            current: json.pagination.current,
            pageSize: json.pagination.pageSize,
            total: 501
          }
        },
      })
    }
  },
  // 配置
  {
    url: 'http1://192.168.0.222/gateway/crvserviceconfig/model/retrieveRequire',
    type: 'post',
    response: (config: any) => {
      console.info('-------------------------config', config)
      const { body } = config;
      const json: any = JSON.parse(body);
      if (json.views.length > 0) {
        return Mock.mock({
          result: [{
            operations: [{
              targetData: 'NO_SEL_DATA',
              createTime: '2021-10-18 14:23:45 GMT+08:00',
              name: '刷新',
              lastUpdateUser: 'luoju',
              createUser: 'luoju',
              id: 1,
              version: 0,
              operationSteps: [{
                stepType: 'REFRESH'
              }],
              lastUpdateTime: '2021-10-18 14:23:45 GMT+08:00'
            }, {
              targetData: 'MULTIPLE',
              createTime: '2021-10-18 14:24:57 GMT+08:00',
              name: '删除多条',
              lastUpdateUser: 'luoju',
              createUser: 'luoju',
              id: 2,
              version: 2,
              operationSteps: [{
                callApiType: 'INNER_API',
                stepType: 'CALL_API',
                showError: true,
                innerApi: 'DELETE',
                showSuccess: true
              }, {
                stepType: 'REFRESH'
              }],
              supportSelectAll: true,
              lastUpdateTime: '2021-10-22 18:56:44 GMT+08:00'
            }, {
              targetData: 'ONLY_ONE',
              createTime: '2021-10-18 14:25:29 GMT+08:00',
              name: '删除一条',
              lastUpdateUser: 'luoju',
              createUser: 'luoju',
              id: 3,
              version: 1,
              operationSteps: [{
                callApiType: 'INNER_API',
                mergeData: true,
                stepType: 'CALL_API',
                showError: true,
                innerApi: 'DELETE',
                showSuccess: true
              }, {
                stepType: 'REFRESH'
              }],
              lastUpdateTime: '2021-10-19 13:19:51 GMT+08:00'
            }, {
              targetData: 'ONLY_ONE',
              createTime: '2021-10-18 14:26:09 GMT+08:00',
              name: '编辑',
              lastUpdateUser: 'admin',
              createUser: 'luoju',
              id: 4,
              version: 3,
              operationSteps: [{
                formId: 3,
                formType: 'EDIT',
                stepType: 'FORM_SWITCH',
                formSwitchType: 'TO_FORM'
              }],
              lastUpdateTime: '2021-10-20 15:57:34 GMT+08:00'
            }, {
              targetData: 'NO_SEL_DATA',
              createTime: '2021-10-18 14:28:30 GMT+08:00',
              name: '新建',
              lastUpdateUser: 'luoju',
              createUser: 'luoju',
              id: 5,
              version: 1,
              operationSteps: [{
                formId: 3,
                formType: 'CREATE',
                stepType: 'FORM_SWITCH',
                formSwitchType: 'TO_FORM'
              }],
              lastUpdateTime: '2021-10-18 16:20:52 GMT+08:00'
            }, {
              targetData: 'ONLY_ONE',
              createTime: '2021-10-18 16:20:29 GMT+08:00',
              name: '详情',
              lastUpdateUser: 'luoju',
              createUser: 'luoju',
              id: 7,
              version: 1,
              operationSteps: [{
                formId: 3,
                formType: 'DETAIL',
                stepType: 'FORM_SWITCH',
                formSwitchType: 'TO_FORM'
              }],
              lastUpdateTime: '2021-10-19 10:17:28 GMT+08:00'
            }, {
              targetData: 'NO_SEL_DATA',
              createTime: '2021-10-18 16:24:03 GMT+08:00',
              name: '保存',
              lastUpdateUser: 'admin',
              createUser: 'luoju',
              id: 8,
              version: 2,
              operationSteps: [{
                callApiType: 'INNER_API',
                stepType: 'CALL_API',
                showError: true,
                innerApi: 'SAVE',
                showSuccess: true
              }, {
                stepType: 'FORM_SWITCH',
                formSwitchType: 'GO_BACK'
              }],
              lastUpdateTime: '2021-10-20 15:53:41 GMT+08:00'
            }, {
              targetData: 'NO_SEL_DATA',
              createTime: '2021-10-25 12:25:00 GMT+08:00',
              name: '新建2',
              lastUpdateUser: 'luoju',
              createUser: 'luoju',
              id: 9,
              version: 0,
              operationSteps: [{
                formId: 4,
                formType: 'CREATE',
                stepType: 'FORM_SWITCH',
                formSwitchType: 'TO_FORM'
              }],
              lastUpdateTime: '2021-10-25 12:25:00 GMT+08:00'
            }, {
              targetData: 'NO_SEL_DATA',
              createTime: '2021-10-27 17:42:40 GMT+08:00',
              name: 'cc创建',
              lastUpdateUser: 'luoju',
              createUser: 'luoju',
              id: 10,
              version: 0,
              operationSteps: [{
                formId: 5,
                formType: 'CREATE',
                stepType: 'FORM_SWITCH',
                formSwitchType: 'TO_FORM'
              }],
              lastUpdateTime: '2021-10-27 17:42:40 GMT+08:00'
            }, {
              targetData: 'NO_SEL_DATA',
              createTime: '2021-10-27 17:42:59 GMT+08:00',
              name: 'cc编辑',
              lastUpdateUser: 'luoju',
              createUser: 'luoju',
              id: 11,
              version: 0,
              operationSteps: [{
                formId: 5,
                formType: 'EDIT',
                stepType: 'FORM_SWITCH',
                formSwitchType: 'TO_FORM'
              }],
              lastUpdateTime: '2021-10-27 17:42:59 GMT+08:00'
            }, {
              targetData: 'NO_SEL_DATA',
              createTime: '2021-10-28 14:20:09 GMT+08:00',
              name: '返回',
              statement: '返回说明----萨芬的范德萨GV',
              lastUpdateUser: 'luoju',
              createUser: 'luoju',
              id: 12,
              version: 0,
              operationSteps: [{
                stepType: 'FORM_SWITCH',
                formSwitchType: 'GO_BACK'
              }],
              lastUpdateTime: '2021-10-28 14:20:09 GMT+08:00'
            }, {
              targetData: 'ONLY_ONE',
              createTime: '2021-11-19 15:11:50 GMT+08:00',
              name: '编辑form7',
              lastUpdateUser: 'luoju',
              createUser: 'luoju',
              id: 13,
              version: 0,
              operationSteps: [{
                formId: 7,
                formType: 'EDIT',
                stepType: 'FORM_SWITCH',
                formSwitchType: 'TO_FORM'
              }],
              lastUpdateTime: '2021-11-19 15:11:50 GMT+08:00'
            }],
            id: 'test_luoju',
            fields: [
              {
                createTime: '2021-10-18 14:22:30 GMT+08:00',
                name: '主键',
                length: 11,
                lastUpdateUser: 'luoju',
                createUser: 'luoju',
                id: 'id',
                version: 0,
                fieldType: 'INTEGER',
                lastUpdateTime: '2021-10-18 14:22:30 GMT+08:00'
              }, {
                createTime: '2021-10-18 14:22:30 GMT+08:00',
                name: '版本',
                lastUpdateUser: 'luoju',
                createUser: 'luoju',
                id: 'version',
                version: 0,
                fieldType: 'INTEGER',
                lastUpdateTime: '2021-10-18 14:22:30 GMT+08:00'
              }, {
                length: 200,
                version: 0,
                createTime: '2021-10-18 14:22:30 GMT+08:00',
                name: '创建人',
                lastUpdateUser: 'luoju',
                createUser: 'luoju',
                id: 'create_user',
                fieldType: 'TEXT',
                lastUpdateTime: '2021-10-18 14:22:30 GMT+08:00'
              }, {
                createTime: '2021-10-18 14:22:30 GMT+08:00',
                name: '创建时间',
                lastUpdateUser: 'luoju',
                createUser: 'luoju',
                id: 'create_time',
                version: 0,
                showType: 'AM_PM',
                fieldType: 'DATETIME',
                lastUpdateTime: '2021-10-18 14:22:30 GMT+08:00'
              }, {
                length: 200,
                version: 0,
                createTime: '2021-10-18 14:22:30 GMT+08:00',
                name: '更新人',
                lastUpdateUser: 'luoju',
                createUser: 'luoju',
                id: 'last_update_user',
                fieldType: 'TEXT',
                lastUpdateTime: '2021-10-18 14:22:30 GMT+08:00'
              }, {
                createTime: '2021-10-18 14:22:30 GMT+08:00',
                name: '更新时间',
                lastUpdateUser: 'luoju',
                createUser: 'luoju',
                id: 'last_update_time',
                version: 0,
                fieldType: 'DATETIME',
                lastUpdateTime: '2021-10-18 14:22:30 GMT+08:00'
              }, {
                defaultValue: '2',
                length: 456,
                version: 1,
                createTime: '2021-10-18 15:37:00 GMT+08:00',
                unique: false,
                name: '名称',
                lastUpdateUser: 'luoju',
                retrieve: false,
                createUser: 'luoju',
                id: 'aaa',
                fieldType: 'TEXT',
                lastUpdateTime: '2021-10-20 09:14:50 GMT+08:00'
              }, {
                length: 20,
                version: 2,
                fieldStatement: '价格哥哥哥哥哥哥哥哥',
                createTime: '2021-10-18 15:37:28 GMT+08:00',
                unique: false,
                showDigits: 2,
                name: '价格',
                lastUpdateUser: 'luoju',
                showType: 'THOUSAND_SEPARATORS', // THOUSAND_SEPARATORS
                createUser: 'luoju',
                decimalDigits: 5,
                id: 'price',
                fieldType: 'CURRENCY',
                lastUpdateTime: '2021-10-25 18:37:15 GMT+08:00'
              }, {
                version: 2,
                defaultType: 'NON_DATE',
                createTime: '2021-10-18 15:37:45 GMT+08:00',
                unique: false,
                name: '生产日期',
                lastUpdateUser: 'luoju',
                // HYPHEN_PREFIX = 'YYYY-MM-DD',
                // HYPHEN_NON_PREFIX = 'YYYY-M-DD',
                // SLASH_PREFIX = 'YYYY/MM/DD',
                // SLASH_NON_PREFIX = 'YYYY/M/DD'
                showType: 'SLASH_NON_PREFIX',
                createUser: 'luoju',
                id: 'date',
                fieldType: 'DATE',
                lastUpdateTime: '2021-10-18 17:12:16 GMT+08:00'
              }, {
                length: 20,
                version: 2,
                createTime: '2021-10-20 08:59:19 GMT+08:00',
                unique: false,
                showDigits: 6,
                name: '百分比',
                lastUpdateUser: 'luoju',
                showType: 'THOUSAND_SEPARATORS',
                createUser: 'luoju',
                decimalDigits: 6,
                id: 'percentage',
                fieldType: 'CURRENCY',
                lastUpdateTime: '2021-10-20 09:10:52 GMT+08:00'
              }, {
                defaultValue: '*#*',
                length: 6,
                version: 0,
                createTime: '2021-10-20 09:00:18 GMT+08:00',
                unique: false,
                name: '名称2',
                lastUpdateUser: 'luoju',
                retrieve: true,
                createUser: 'luoju',
                id: 'name2',
                fieldType: 'TEXT',
                lastUpdateTime: '2021-10-20 09:00:18 GMT+08:00'
              }, {
                length: 10,
                version: 2,
                createTime: '2021-10-20 09:08:57 GMT+08:00',
                unique: false,
                showDigits: 8,
                name: '千分比',
                lastUpdateUser: 'luoju',
                showType: 'THOUSAND_SEPARATORS',
                createUser: 'luoju',
                decimalDigits: 8,
                id: 'thousand',
                fieldType: 'CURRENCY',
                lastUpdateTime: '2021-10-20 09:48:32 GMT+08:00'
              }, {
                version: 0,
                defaultType: 'SYSTEM_DATE',
                createTime: '2021-10-20 09:16:39 GMT+08:00',
                unique: false,
                name: '系统当前日期',
                lastUpdateUser: 'luoju',
                showType: 'HYPHEN_PREFIX',
                createUser: 'luoju',
                id: 'system_date',
                fieldType: 'DATE',
                lastUpdateTime: '2021-10-20 09:16:39 GMT+08:00'
              }, {
                defaultValue: '2021-10-07',
                version: 2,
                defaultType: 'FIXED_DATE',
                createTime: '2021-10-20 09:17:07 GMT+08:00',
                unique: false,
                name: '固定日期',
                lastUpdateUser: 'luoju',
                showType: 'SLASH_PREFIX',
                createUser: 'luoju',
                id: 'fixed_date',
                fieldType: 'DATE',
                lastUpdateTime: '2021-10-28 14:42:14 GMT+08:00'
              }, {
                length: 10,
                version: 1,
                createTime: '2021-10-20 10:32:47 GMT+08:00',
                unique: false,
                showDigits: 1,
                name: '价格1',
                lastUpdateUser: 'luoju',
                showType: 'THOUSAND_SEPARATORS',
                createUser: 'luoju',
                decimalDigits: 2,
                id: 'price1',
                fieldType: 'CURRENCY',
                lastUpdateTime: '2021-10-20 10:32:51 GMT+08:00'
              }, {
                length: 10,
                version: 1,
                createTime: '2021-10-20 10:38:52 GMT+08:00',
                unique: false,
                showDigits: 1,
                name: '价格2',
                lastUpdateUser: 'luoju',
                showType: 'THOUSAND_SEPARATORS',
                createUser: 'luoju',
                decimalDigits: 2,
                id: 'price2',
                fieldType: 'CURRENCY',
                lastUpdateTime: '2021-10-20 10:39:00 GMT+08:00'
              }, {
                showFormat: '',
                refModel: 'test_luoju2',
                version: 4,
                required: false,
                createTime: '2021-11-08 14:06:32 GMT+08:00',
                unique: false,
                refModelField: 'name1',
                name: 'ref_name1',
                lastUpdateUser: 'luoju',
                createUser: 'luoju',
                id: 'ref_name1',
                fieldType: 'MANY_TO_ONE',
                lastUpdateTime: '2021-11-19 13:11:33 GMT+08:00'
              }, {
                showFormat: '${name1}-${currency}',
                refGroup: '222',
                refModel: 'test_luoju2',
                version: 2,
                createTime: '2021-11-08 14:11:18 GMT+08:00',
                unique: false,
                name: 'ref2',
                lastUpdateUser: 'luoju',
                createUser: 'luoju',
                id: 'ref2',
                fieldType: 'MANY_TO_MANY',
                lastUpdateTime: '2021-11-13 20:27:18 GMT+08:00'
              }, {
                deleteType: 'DELETE',
                refModel: 'test_luoju3',
                version: 3,
                refField: 'name2',
                createTime: '2021-11-09 17:18:14 GMT+08:00',
                unique: false,
                refModelField: 'name',
                name: 'ref3',
                lastUpdateUser: 'luoju',
                createUser: 'luoju',
                id: 'ref3',
                fieldType: 'ONE_TO_MANY',
                lastUpdateTime: '2021-11-10 19:59:33 GMT+08:00'
              }, {
                showFormat: '',
                refModel: 'test_luoju2',
                version: 3,
                required: false,
                createTime: '2021-11-12 10:40:20 GMT+08:00',
                unique: false,
                refModelField: 'currency',
                name: 'aa',
                lastUpdateUser: 'luoju',
                createUser: 'luoju',
                id: 'aa',
                fieldType: 'MANY_TO_ONE',
                lastUpdateTime: '2021-11-12 11:09:52 GMT+08:00'
              }, {
                showFormat: '${text01}----${last_update_user}',
                refGroup: 'qqq',
                refModel: 'test_lcp_03',
                version: 1,
                createTime: '2021-11-12 10:45:08 GMT+08:00',
                unique: false,
                name: 'bb',
                lastUpdateUser: 'luoju',
                createUser: 'luoju',
                id: 'bb',
                fieldType: 'MANY_TO_MANY',
                lastUpdateTime: '2021-11-12 10:45:42 GMT+08:00'
              }, {
                deleteType: 'DELETE',
                refModel: 'test_luoju3',
                version: 1,
                refField: 'aaa',
                createTime: '2021-11-12 10:48:21 GMT+08:00',
                unique: false,
                refModelField: 'ref_aaa',
                name: 'cc',
                lastUpdateUser: 'luoju',
                createUser: 'luoju',
                id: 'cc',
                fieldType: 'ONE_TO_MANY',
                lastUpdateTime: '2021-11-12 10:48:56 GMT+08:00'
              },
              {
                length: 10,
                unique: false,
                name: '简介',
                id: 'description',
                fieldType: 'LONGTEXT',
              },
              {
                length: 10,
                unique: false,
                name: 'YEAR',
                id: 'birth_year',
                fieldType: 'YEAR',
                showType: 'FULL'
              },
              {
                length: 10,
                unique: false,
                showDigits: 1,
                name: '出生年月',
                decimalDigits: 2,
                id: 'birth_month',
                fieldType: 'YEAR_MONTH',
                showType: 'HALF_ZERO_FILL'
              },
              {
                length: 10,
                unique: false,
                showDigits: 1,
                name: '出生月',
                showType: '',
                decimalDigits: 2,
                id: 'birth_month',
                fieldType: 'MONTH',
              },
              {
                length: 10,
                unique: false,
                showDigits: 1,
                name: '出生时辰',
                showType: 'DEFAULT',
                decimalDigits: 2,
                id: 'birth_time',
                fieldType: 'TIME',
              },
              {
                length: 10,
                unique: false,
                name: '性别',
                id: 'gender',
                fieldType: 'ENUM',
                enumConfig: {
                  name: '选项说明(key)',
                  statement: '说明',
                  enumLists: [
                    { value: '1', name: '男' },
                    { value: '0', name: '女' }
                  ]
                }
              },
              {
                length: 10,
                unique: false,
                name: 'YYYY',
                id: 'year_1',
                fieldType: 'YEAR',
                showFormat: 'FULL'
              },
              {
                length: 10,
                unique: false,
                name: 'YY',
                id: 'year_2',
                fieldType: 'YEAR',
                showFormat: 'HALF'
              },
              {
                length: 10,
                unique: false,
                name: 'month-normal',
                id: 'month_1',
                fieldType: 'MONTH',
                showFormat: 'NORMAL'
              },
              {
                length: 10,
                unique: false,
                name: 'month-ZERO_FILL',
                id: 'month_2',
                fieldType: 'MONTH',
                showFormat: 'ZERO_FILL'
              },
              {
                length: 10,
                unique: false,
                name: 'YYYY-M',
                id: 'year_month_1',
                fieldType: 'YEAR_MONTH',
                showFormat: 'FULL_NORMAL'
              },
              {
                length: 10,
                unique: false,
                name: 'YYYY-MM',
                id: 'year_month_2',
                fieldType: 'YEAR_MONTH',
                showFormat: 'FULL_ZERO_FILL'
              },
              {
                length: 10,
                unique: false,
                name: 'YY-M',
                id: 'year_month_3',
                fieldType: 'YEAR_MONTH',
                showFormat: 'HALF_NORMAL'
              },
              {
                length: 10,
                unique: false,
                name: 'YY-MM',
                id: 'year_month_4',
                fieldType: 'YEAR_MONTH',
                showFormat: 'HALF_ZERO_FILL'
              },
              {
                length: 10,
                unique: false,
                name: 'yyyy-MM-dd HH:mm:ss',
                id: 'dt_1',
                fieldType: 'DATE_TIME',
                showFormat: 'HYPHEN_PREFIX_DEFAULT'
              },
              {
                length: 10,
                unique: false,
                name: 'yyyy-MM-d H:m:s',
                id: 'dt_2',
                fieldType: 'DATE_TIME',
                showFormat: 'HYPHEN_NON_PREFIX_DEFAULT'
              },
              {
                length: 10,
                unique: false,
                name: 'yyyy/MM/dd HH:mm:ss',
                id: 'dt_3',
                fieldType: 'DATE_TIME',
                showFormat: 'SLASH_PREFIX_DEFAULT'
              },
              {
                length: 10,
                unique: false,
                name: 'yyyy/M/d H:m:s',
                id: 'dt_4',
                fieldType: 'DATE_TIME',
                showFormat: 'SLASH_NON_PREFIX_DEFAULT'
              },
              {
                length: 10,
                unique: false,
                name: 'yyyy-MM-dd hh:mm:ss',
                id: 'dt_5',
                fieldType: 'DATE_TIME',
                showFormat: 'HYPHEN_PREFIX_AM_PM'
              },
              {
                length: 10,
                unique: false,
                name: 'yyyy-M-d h:m:s',
                id: 'dt_6',
                fieldType: 'DATE_TIME',
                showFormat: 'HYPHEN_NON_PREFIX_AM_PM'
              },
              {
                length: 10,
                unique: false,
                name: 'yyyy/MM/dd hh:mm:ss',
                id: 'dt_7',
                fieldType: 'DATE_TIME',
                showFormat: 'SLASH_PREFIX_AM_PM'
              },
              {
                length: 10,
                unique: false,
                name: 'yyyy/M/d h:m:s',
                id: 'dt_8',
                fieldType: 'DATE_TIME',
                showFormat: 'SLASH_NON_PREFIX_AM_PM'
              },
              {
                length: 10,
                unique: false,
                name: 'time_default',
                id: 'time_1',
                fieldType: 'TIME',
                showFormat: 'DEFAULT'
              },
              {
                length: 10,
                unique: false,
                name: 'time_am/pm',
                id: 'time_2',
                fieldType: 'TIME',
                showFormat: 'AM_PM'
              },
              {
                length: 10,
                unique: false,
                name: 'int-NORMAL',
                id: 'int_1',
                fieldType: 'INTEGER',
                showType: 'NORMAL'
              },
              {
                length: 10,
                unique: false,
                name: 'int-THOUSAND_SEPARATORS',
                id: 'int_2',
                fieldType: 'INTEGER',
                showType: 'THOUSAND_SEPARATORS'
              }
            ],
            views: [{
              createTime: '2021-10-18 17:14:24 GMT+08:00',
              name: '默认视图1',
              statement: '',
              lastUpdateUser: 'luoju',
              createUser: 'luoju',
              id: 2,
              supportSelectCal: false,
              viewFields: [
                {
                  summary: '',
                  summaryFormat: '',
                  headerAlign: 'LEFT',
                  contentAlign: 'LEFT',
                  columnWidth: 200,
                  id: 'id'
                }, {
                  summary: '',
                  summaryFormat: '',
                  headerAlign: 'LEFT',
                  contentAlign: 'RIGHT',
                  columnWidth: 200,
                  id: 'date'
                }, {
                  summary: '',
                  summaryFormat: '',
                  headerAlign: 'LEFT',
                  contentAlign: 'LEFT',
                  columnWidth: 200,
                  id: 'create_user'
                }, {
                  summary: '',
                  summaryFormat: '',
                  headerAlign: 'LEFT',
                  contentAlign: 'LEFT',
                  columnWidth: 200,
                  id: 'create_time'
                }, {
                  summary: '',
                  summaryFormat: '',
                  headerAlign: 'LEFT',
                  showName: '',
                  contentAlign: 'LEFT',
                  columnWidth: 200,
                  id: 'aaa'
                }, {
                  summary: '',
                  summaryFormat: '',
                  headerAlign: 'RIGHT',
                  showName: '',
                  contentAlign: 'RIGHT',
                  columnWidth: 200,
                  id: 'price'
                }, {
                  summary: '',
                  summaryFormat: '',
                  headerAlign: 'LEFT',
                  showName: '',
                  contentAlign: 'LEFT',
                  columnWidth: 200,
                  id: 'description'
                }, {
                  summary: '',
                  summaryFormat: '',
                  headerAlign: 'LEFT',
                  showName: '',
                  contentAlign: 'LEFT',
                  columnWidth: 200,
                  id: 'birth_year'
                }, {
                  headerAlign: 'LEFT',
                  showName: '',
                  contentAlign: 'LEFT',
                  columnWidth: 200,
                  id: 'birth_month'
                }, {
                  headerAlign: 'LEFT',
                  showName: '',
                  contentAlign: 'LEFT',
                  columnWidth: 200,
                  id: 'birth_time'
                }, {
                  headerAlign: 'LEFT',
                  showName: '',
                  contentAlign: 'LEFT',
                  columnWidth: 200,
                  id: 'gender'
                }, {
                  headerAlign: 'LEFT',
                  showName: '',
                  contentAlign: 'LEFT',
                  columnWidth: 200,
                  id: 'year_1'
                }, {
                  headerAlign: 'LEFT',
                  showName: '',
                  contentAlign: 'LEFT',
                  columnWidth: 200,
                  id: 'year_2'
                }, {
                  headerAlign: 'LEFT',
                  showName: '',
                  contentAlign: 'LEFT',
                  columnWidth: 200,
                  id: 'month_1'
                }, {
                  headerAlign: 'LEFT',
                  showName: '',
                  contentAlign: 'LEFT',
                  columnWidth: 200,
                  id: 'month_2'
                }, {
                  headerAlign: 'LEFT',
                  showName: '',
                  contentAlign: 'LEFT',
                  columnWidth: 200,
                  id: 'year_month_1'
                }, {
                  headerAlign: 'LEFT',
                  showName: '',
                  contentAlign: 'LEFT',
                  columnWidth: 200,
                  id: 'year_month_2'
                }, {
                  headerAlign: 'LEFT',
                  showName: '',
                  contentAlign: 'LEFT',
                  columnWidth: 200,
                  id: 'year_month_3'
                }, {
                  headerAlign: 'LEFT',
                  showName: '',
                  contentAlign: 'LEFT',
                  columnWidth: 200,
                  id: 'year_month_4'
                }, {
                  headerAlign: 'LEFT',
                  showName: '',
                  contentAlign: 'LEFT',
                  columnWidth: 200,
                  id: 'dt_1'
                }, {
                  headerAlign: 'LEFT',
                  showName: '',
                  contentAlign: 'LEFT',
                  columnWidth: 200,
                  id: 'dt_2'
                }, {
                  headerAlign: 'LEFT',
                  showName: '',
                  contentAlign: 'LEFT',
                  columnWidth: 200,
                  id: 'dt_3'
                }, {
                  headerAlign: 'LEFT',
                  showName: '',
                  contentAlign: 'LEFT',
                  columnWidth: 200,
                  id: 'dt_4'
                }, {
                  headerAlign: 'LEFT',
                  showName: '',
                  contentAlign: 'LEFT',
                  columnWidth: 200,
                  id: 'dt_5'
                }, {
                  headerAlign: 'LEFT',
                  showName: '',
                  contentAlign: 'LEFT',
                  columnWidth: 200,
                  id: 'dt_6'
                }, {
                  headerAlign: 'LEFT',
                  showName: '',
                  contentAlign: 'LEFT',
                  columnWidth: 200,
                  id: 'dt_7'
                }, {
                  headerAlign: 'LEFT',
                  showName: '',
                  contentAlign: 'LEFT',
                  columnWidth: 200,
                  id: 'dt_8'
                }, {
                  headerAlign: 'LEFT',
                  showName: '',
                  contentAlign: 'LEFT',
                  columnWidth: 200,
                  id: 'time_1'
                }, {
                  headerAlign: 'LEFT',
                  showName: '',
                  contentAlign: 'LEFT',
                  columnWidth: 200,
                  id: 'time_2'
                }, {
                  headerAlign: 'LEFT',
                  showName: '',
                  contentAlign: 'LEFT',
                  columnWidth: 200,
                  id: 'int_1'
                }, {
                  headerAlign: 'LEFT',
                  showName: '',
                  contentAlign: 'LEFT',
                  columnWidth: 200,
                  id: 'int_2'
                }],
              version: 12,
              viewOperations: {
                dataRow: [{
                  name: '',
                  operationIds: [{
                    displayName: '编辑',
                    name: '编辑',
                    id: 4
                  }],
                  type: 'SINGLE'
                }, {
                  name: '',
                  operationIds: [{
                    displayName: '详情',
                    name: '详情',
                    id: 7
                  }],
                  type: 'SINGLE'
                }, {
                  name: '',
                  operationIds: [{
                    displayName: '删除一条',
                    name: '删除一条',
                    id: 3
                  }],
                  type: 'SINGLE'
                }, {
                  name: '',
                  operationIds: [{
                    displayName: '编辑form7',
                    name: '编辑form7',
                    id: 13
                  }],
                  type: 'SINGLE'
                }],
                headerShowCount: 3,
                dataShowCount: 3,
                tableHeader: [{
                  name: '',
                  operationIds: [{
                    displayName: '刷新',
                    name: '刷新',
                    id: 1
                  }],
                  type: 'SINGLE'
                }, {
                  name: '',
                  operationIds: [{
                    displayName: '删除多条',
                    name: '删除多条',
                    id: 2
                  }],
                  type: 'SINGLE'
                }, {
                  name: '',
                  operationIds: [{
                    displayName: '删除一条',
                    name: '删除一条',
                    id: 3
                  }],
                  type: 'SINGLE'
                }, {
                  name: '',
                  operationIds: [{
                    displayName: '编辑',
                    name: '编辑',
                    id: 4
                  }],
                  type: 'SINGLE'
                }, {
                  name: '',
                  operationIds: [{
                    displayName: '新建',
                    name: '新建',
                    id: 5
                  }],
                  type: 'SINGLE'
                }, {
                  name: '',
                  operationIds: [{
                    displayName: '详情',
                    name: '详情',
                    id: 7
                  }],
                  type: 'SINGLE'
                }, {
                  name: '',
                  operationIds: [{
                    displayName: '新建2',
                    name: '新建2',
                    id: 9
                  }],
                  type: 'SINGLE'
                }, {
                  name: '',
                  operationIds: [{
                    displayName: 'cc创建',
                    name: 'cc创建',
                    id: 10
                  }],
                  type: 'SINGLE'
                }, {
                  name: '',
                  operationIds: [{
                    displayName: 'cc编辑',
                    name: 'cc编辑',
                    id: 11
                  }],
                  type: 'SINGLE'
                }, {
                  name: '',
                  operationIds: [{
                    displayName: '编辑form7',
                    name: '编辑form7',
                    id: 13
                  }],
                  type: 'SINGLE'
                }]
              },
              lastUpdateTime: '2021-11-19 15:12:10 GMT+08:00',
              viewDataFilter: {
                conditions: [
                  {
                    id: 1,
                    column: 'year_1',
                    operation: '=',
                    valueType: 'VALUE',
                    value: '2'
                  }
                ],
                conditionCombination: ''
              },
              defaultSort: [
                { year_1: 'asc' },
                { year_2: 'desc' }
              ],
              summaryCalculate: [
                {
                  name: '合计年',
                  calculateFormula: 'sum(year_1)'
                }
              ]
            }]
          }, {
            module: 'core',
            updateDBMessage: '',
            type: 'ENTITY',
            exportData: false,
            stringId: true,
            operations: [],
            updateDBStatus: 1,
            updateDBTime: '2021-11-23 17:23:52 GMT+08:00',
            id: 'test_lcp_03',
            ruleDictionary: false,
            idLength: 20,
            fields: [{
              length: 20,
              version: 0,
              createTime: '2021-11-11 16:23:27 GMT+08:00',
              name: '主键',
              lastUpdateUser: 'lvcp',
              createUser: 'lvcp',
              id: 'id',
              fieldType: 'TEXT',
              lastUpdateTime: '2021-11-11 16:23:27 GMT+08:00'
            }, {
              createTime: '2021-11-11 16:23:27 GMT+08:00',
              name: '版本',
              lastUpdateUser: 'lvcp',
              createUser: 'lvcp',
              id: 'version',
              version: 0,
              fieldType: 'INTEGER',
              lastUpdateTime: '2021-11-11 16:23:27 GMT+08:00'
            }, {
              length: 200,
              version: 0,
              createTime: '2021-11-11 16:23:27 GMT+08:00',
              name: '创建人',
              lastUpdateUser: 'lvcp',
              createUser: 'lvcp',
              id: 'create_user',
              fieldType: 'TEXT',
              lastUpdateTime: '2021-11-11 16:23:27 GMT+08:00'
            }, {
              createTime: '2021-11-11 16:23:27 GMT+08:00',
              name: '创建时间',
              lastUpdateUser: 'lvcp',
              createUser: 'lvcp',
              id: 'create_time',
              version: 0,
              fieldType: 'DATETIME',
              lastUpdateTime: '2021-11-11 16:23:27 GMT+08:00'
            }, {
              length: 200,
              version: 0,
              createTime: '2021-11-11 16:23:27 GMT+08:00',
              name: '更新人',
              lastUpdateUser: 'lvcp',
              createUser: 'lvcp',
              id: 'last_update_user',
              fieldType: 'TEXT',
              lastUpdateTime: '2021-11-11 16:23:27 GMT+08:00'
            }, {
              createTime: '2021-11-11 16:23:27 GMT+08:00',
              name: '更新时间',
              lastUpdateUser: 'lvcp',
              createUser: 'lvcp',
              id: 'last_update_time',
              version: 0,
              fieldType: 'DATETIME',
              lastUpdateTime: '2021-11-11 16:23:27 GMT+08:00'
            }, {
              defaultValue: '',
              length: 3000,
              version: 0,
              createTime: '2021-11-11 16:23:54 GMT+08:00',
              unique: false,
              name: '文本字段01',
              lastUpdateUser: 'lvcp',
              retrieve: false,
              createUser: 'lvcp',
              id: 'text01',
              fieldType: 'TEXT',
              lastUpdateTime: '2021-11-11 16:23:54 GMT+08:00'
            }, {
              version: 0,
              defaultType: 'NON_DATE',
              createTime: '2021-11-23 11:29:52 GMT+08:00',
              unique: false,
              name: '出生日期',
              lastUpdateUser: 'admin',
              showType: 'HYPHEN_PREFIX',
              createUser: 'admin',
              id: 'birthday',
              fieldType: 'DATE',
              lastUpdateTime: '2021-11-23 11:29:52 GMT+08:00'
            }, {
              refModel: 'test_lcp_02',
              version: 0,
              required: false,
              createTime: '2021-11-23 16:51:52 GMT+08:00',
              unique: false,
              refModelField: 'id',
              name: '单选',
              lastUpdateUser: 'lvcp',
              createUser: 'lvcp',
              id: 'single_select',
              fieldType: 'MANY_TO_ONE',
              lastUpdateTime: '2021-11-23 16:51:52 GMT+08:00'
            }],
            ruleDataSource: false,
            reportDataSource: false,
            views: [],
            ruleTarget: false
          }, {
            module: 'core',
            updateDBMessage: '',
            type: 'ENTITY',
            exportData: false,
            stringId: false,
            operations: [],
            name: '罗举测试2',
            updateDBStatus: 1,
            updateDBTime: '2021-11-17 15:37:18 GMT+08:00',
            id: 'test_luoju2',
            ruleDictionary: false,
            fields: [{
              createTime: '2021-11-05 13:41:03 GMT+08:00',
              name: '主键',
              lastUpdateUser: 'luoju',
              createUser: 'luoju',
              id: 'id',
              version: 0,
              fieldType: 'INTEGER',
              lastUpdateTime: '2021-11-05 13:41:03 GMT+08:00'
            }, {
              createTime: '2021-11-05 13:41:03 GMT+08:00',
              name: '版本',
              lastUpdateUser: 'luoju',
              createUser: 'luoju',
              id: 'version',
              version: 0,
              fieldType: 'INTEGER',
              lastUpdateTime: '2021-11-05 13:41:03 GMT+08:00'
            }, {
              length: 200,
              version: 0,
              createTime: '2021-11-05 13:41:03 GMT+08:00',
              name: '创建人',
              lastUpdateUser: 'luoju',
              createUser: 'luoju',
              id: 'create_user',
              fieldType: 'TEXT',
              lastUpdateTime: '2021-11-05 13:41:03 GMT+08:00'
            }, {
              createTime: '2021-11-05 13:41:03 GMT+08:00',
              name: '创建时间',
              lastUpdateUser: 'luoju',
              createUser: 'luoju',
              id: 'create_time',
              version: 0,
              fieldType: 'DATETIME',
              lastUpdateTime: '2021-11-05 13:41:03 GMT+08:00'
            }, {
              length: 200,
              version: 0,
              createTime: '2021-11-05 13:41:03 GMT+08:00',
              name: '更新人',
              lastUpdateUser: 'luoju',
              createUser: 'luoju',
              id: 'last_update_user',
              fieldType: 'TEXT',
              lastUpdateTime: '2021-11-05 13:41:03 GMT+08:00'
            }, {
              createTime: '2021-11-05 13:41:03 GMT+08:00',
              name: '更新时间',
              lastUpdateUser: 'luoju',
              createUser: 'luoju',
              id: 'last_update_time',
              version: 0,
              fieldType: 'DATETIME',
              lastUpdateTime: '2021-11-05 13:41:03 GMT+08:00'
            }, {
              defaultValue: '555',
              length: 50,
              version: 1,
              createTime: '2021-11-05 13:41:47 GMT+08:00',
              unique: false,
              name: '名称1',
              lastUpdateUser: 'luoju',
              retrieve: false,
              createUser: 'luoju',
              id: 'name1',
              fieldType: 'TEXT',
              lastUpdateTime: '2021-11-05 13:41:51 GMT+08:00'
            }, {
              length: 50,
              version: 1,
              createTime: '2021-11-05 13:42:38 GMT+08:00',
              unique: false,
              showDigits: 7,
              name: '货币1',
              lastUpdateUser: 'luoju',
              showType: 'NORMAL',
              createUser: 'luoju',
              decimalDigits: 9,
              id: 'currency',
              fieldType: 'CURRENCY',
              lastUpdateTime: '2021-11-05 13:42:51 GMT+08:00'
            }, {
              defaultValue: '2021-11-11',
              version: 1,
              defaultType: 'FIXED_DATE',
              createTime: '2021-11-05 13:43:23 GMT+08:00',
              unique: false,
              name: '日期1',
              lastUpdateUser: 'luoju',
              showType: 'HYPHEN_PREFIX',
              createUser: 'luoju',
              id: 'date1',
              fieldType: 'DATE',
              lastUpdateTime: '2021-11-05 13:43:27 GMT+08:00'
            }],
            ruleDataSource: false,
            reportDataSource: false,
            views: [],
            ruleTarget: false
          }, {
            module: 'core',
            updateDBMessage: '',
            type: 'ENTITY',
            exportData: false,
            stringId: false,
            operations: [],
            name: 'test_luoju3',
            updateDBStatus: 1,
            updateDBTime: '2021-11-13 18:42:04 GMT+08:00',
            id: 'test_luoju3',
            ruleDictionary: false,
            fields: [{
              createTime: '2021-11-10 17:43:59 GMT+08:00',
              name: '主键',
              lastUpdateUser: 'luoju',
              createUser: 'luoju',
              id: 'id',
              version: 0,
              fieldType: 'INTEGER',
              lastUpdateTime: '2021-11-10 17:43:59 GMT+08:00'
            }, {
              createTime: '2021-11-10 17:43:59 GMT+08:00',
              name: '版本',
              lastUpdateUser: 'luoju',
              createUser: 'luoju',
              id: 'version',
              version: 0,
              fieldType: 'INTEGER',
              lastUpdateTime: '2021-11-10 17:43:59 GMT+08:00'
            }, {
              length: 200,
              version: 0,
              createTime: '2021-11-10 17:43:59 GMT+08:00',
              name: '创建人',
              lastUpdateUser: 'luoju',
              createUser: 'luoju',
              id: 'create_user',
              fieldType: 'TEXT',
              lastUpdateTime: '2021-11-10 17:43:59 GMT+08:00'
            }, {
              createTime: '2021-11-10 17:43:59 GMT+08:00',
              name: '创建时间',
              lastUpdateUser: 'luoju',
              createUser: 'luoju',
              id: 'create_time',
              version: 0,
              fieldType: 'DATETIME',
              lastUpdateTime: '2021-11-10 17:43:59 GMT+08:00'
            }, {
              length: 200,
              version: 0,
              createTime: '2021-11-10 17:43:59 GMT+08:00',
              name: '更新人',
              lastUpdateUser: 'luoju',
              createUser: 'luoju',
              id: 'last_update_user',
              fieldType: 'TEXT',
              lastUpdateTime: '2021-11-10 17:43:59 GMT+08:00'
            }, {
              createTime: '2021-11-10 17:43:59 GMT+08:00',
              name: '更新时间',
              lastUpdateUser: 'luoju',
              createUser: 'luoju',
              id: 'last_update_time',
              version: 0,
              fieldType: 'DATETIME',
              lastUpdateTime: '2021-11-10 17:43:59 GMT+08:00'
            }, {
              length: 20,
              version: 1,
              createTime: '2021-11-10 17:44:20 GMT+08:00',
              unique: false,
              name: 'name',
              lastUpdateUser: 'luoju',
              retrieve: false,
              createUser: 'luoju',
              id: 'name',
              fieldType: 'TEXT',
              lastUpdateTime: '2021-11-10 17:44:22 GMT+08:00'
            }, {
              length: 20,
              version: 1,
              createTime: '2021-11-10 19:43:53 GMT+08:00',
              unique: false,
              name: 'name2',
              lastUpdateUser: 'luoju',
              retrieve: false,
              createUser: 'luoju',
              id: 'name2',
              fieldType: 'TEXT',
              lastUpdateTime: '2021-11-10 19:43:56 GMT+08:00'
            }, {
              length: 20,
              version: 1,
              createTime: '2021-11-10 20:11:35 GMT+08:00',
              unique: false,
              showDigits: 5,
              name: 'deci',
              lastUpdateUser: 'luoju',
              showType: 'NORMAL',
              createUser: 'luoju',
              decimalDigits: 5,
              id: 'deci',
              fieldType: 'CURRENCY',
              lastUpdateTime: '2021-11-10 20:11:36 GMT+08:00'
            }, {
              showFormat: 'create_usercurrency02text02text01',
              refModel: 'inv_strategy',
              version: 2,
              required: false,
              createTime: '2021-11-11 09:36:43 GMT+08:00',
              unique: false,
              refModelField: 'id',
              name: '2233',
              lastUpdateUser: 'luoju',
              createUser: 'zz',
              id: 'tesd',
              fieldType: 'MANY_TO_ONE',
              lastUpdateTime: '2021-11-13 18:34:31 GMT+08:00'
            }, {
              refModel: 'test_luoju',
              version: 0,
              required: false,
              createTime: '2021-11-11 15:06:53 GMT+08:00',
              unique: false,
              refModelField: 'aaa',
              name: 'refAAA',
              lastUpdateUser: 'luoju',
              createUser: 'luoju',
              id: 'ref_aaa',
              fieldType: 'MANY_TO_ONE',
              lastUpdateTime: '2021-11-11 15:06:53 GMT+08:00'
            }, {
              refGroup: 'tt',
              refModel: 'test_luoju4',
              version: 7,
              createTime: '2021-11-11 15:09:00 GMT+08:00',
              unique: false,
              name: 'ref3_4',
              lastUpdateUser: 'luoju',
              createUser: 'luoju',
              id: 'ref2',
              fieldType: 'MANY_TO_MANY',
              lastUpdateTime: '2021-11-13 20:28:59 GMT+08:00'
            }],
            ruleDataSource: false,
            reportDataSource: false,
            views: [],
            ruleTarget: false
          }],
          messageCode: 200,
          message: '提示：操作成功',
          status: 200
        })
      }
      return Mock.mock({ result: [{ operations: [], id: 'test_luoju', fields: [], views: [{ name: '默认视图1', statement: '', id: 2 }, { name: '默认视图1副本1', statement: '', id: 3 }] }], messageCode: 200, message: '提示：操作成功', status: 200 })
    }
  },
  // 数据
  {
    url: 'http1://192.168.0.222/gateway/crvserviceview/data',
    type: 'post',
    response: (config: any) => {
      const { body } = config;
      const json: any = JSON.parse(body);
      console.info('queryData>>>>>>>>>>', json)
      if (json[0].fields.length === 0) {
        return Mock.mock({
          messageCode: 200,
          message: '提示：操作成功',
          status: 200,
          result: [
            {
              total: 8,
              current: 1,
              pageSize: 10,
              model: 'test_luoju',
              data: [{
                合计年: 1234,
                id: 1
              }]
            }
          ]
        })
      }
      return Mock.mock(
        {
          result: [{
            total: 8,
            current: 1,
            data: [
              {
                aaa: '2',
                date: '2021-06-19',
                create_time: '2021-11-09 09:51:16',
                version: 2,
                price: 1234567.35000,
                id: 45,
                create_user: 'luoju',
                description: '111',
                birth_year: 1990,
                birth_month: '1990-04',
                birth_time: '23:11:50',
                gender: '1',
                year_1: 2021,
                year_2: 2021,
                month_1: 1,
                month_2: 1,
                year_month_1: '2021-01',
                year_month_2: '2021-01',
                year_month_3: '2021-01',
                year_month_4: '2021-01',
                dt_1: '2021-01-01 23:59:05',
                dt_2: '2021-01-01 23:59:05',
                dt_3: '2021-01-01 23:59:05',
                dt_4: '2021-01-01 23:59:05',
                dt_5: '2021-01-01 23:59:05',
                dt_6: '2021-01-01 23:59:05',
                dt_7: '2021-01-01 23:59:05',
                dt_8: '2021-01-01 23:59:05',
                time_1: '23:59:59',
                time_2: '23:59:59',
                int_1: 1234567,
                int_2: 1234567
              },
              {
                aaa: '2',
                date: '2021-06-19',
                create_time: '2021-11-09 09:51:16',
                version: 2,
                price: 1234567.35000,
                id: 46,
                create_user: 'luoju',
                description: '111',
                birth_year: 1990,
                birth_month: '1990-04',
                birth_time: '23:11:50',
                gender: '1',
                year_1: 2021,
                year_2: 2021,
                month_1: 1,
                month_2: 1,
                year_month_1: '2021-01',
                year_month_2: '2021-01',
                year_month_3: '2021-01',
                year_month_4: '2021-01',
                dt_1: '2021-01-01 23:59:05',
                dt_2: '2021-01-01 23:59:05',
                dt_3: '2021-01-01 23:59:05',
                dt_4: '2021-01-01 23:59:05',
                dt_5: '2021-01-01 23:59:05',
                dt_6: '2021-01-01 23:59:05',
                dt_7: '2021-01-01 23:59:05',
                dt_8: '2021-01-01 23:59:05',
                time_1: '23:59:59',
                time_2: '23:59:59',
                int_1: 1234567,
                int_2: 1234567
              }
              // { aaa: '2', date: '2021-11-19', create_time: '2021-11-09 19:48:13', version: 1, price: 12.35000, id: 54, create_user: 'admin', name2: '*#*' },
              // { aaa: '2', date: '2021-11-19', create_time: '2021-11-10 19:14:52', version: 0, price: 12.35000, id: 55, create_user: 'aaa', name2: '*#*' },
              // { aaa: '2', date: '2021-11-19', create_time: '2021-11-10 19:17:18', version: 4, price: 12.35000, id: 56, create_user: 'aaa', name2: '555' },
              // { aaa: '2', date: '2021-11-19', create_time: '2021-11-10 19:32:05', version: 0, price: 12.35000, id: 57, create_user: 'admin', name2: '*#*' },
              // { aaa: '2', date: '2021-11-19', create_time: '2021-11-11 16:08:17', version: 3, price: 12.35000, id: 66, create_user: 'admin', name2: '66' },
              // { aaa: '2', date: '2021-11-19', create_time: '2021-11-11 19:59:09', version: 0, price: 12.35000, id: 77, create_user: 'admin', name2: '*#*' },
              // { aaa: '2', create_time: '2021-11-23 13:35:04', id: 765, create_user: 'luoju', name2: '*#*', version: 0 }
            ],
            pageSize: 10,
            model: 'test_luoju'
          }
          ],
          messageCode: 200,
          message: '提示：操作成功',
          status: 200
        }
      )
    }
  }
];
