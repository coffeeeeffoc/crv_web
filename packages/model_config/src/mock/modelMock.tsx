import Mock from 'mockjs';

const modelMock = [
  {
    url: 'crv_web_config: any/model/query1',
    type: 'post',
    response: (config: any) => {
      const { body } = config;
      const json = JSON.parse(body);
      return Mock.mock({
        status: 200,
        message: '互虐',
        result: {
          [`list|${json.pagination.pageSize}`]: [
            {
            // 模型信息-基本信息
              'id|+1': (json.pagination.page - 1) * json.pagination.pageSize + 1,
              'name|1-10': '★',
              'type|1': ['entity', 'view'],
              'module|1': ['core', 'income', 'getData', 'reportconfig: any'],
              'stringId|1': [true, false],
              'idLength|1-10': 5,
              'exportData|1': [true, false],
              'ruleDataSource|1': [true, false],
              'ruleTarget|1': [true, false],
              'ruleDictionary|1': [true, false],
              'reportDataSource|1': [true, false],
              // 字段信息
              'field|25': [
                {
                  'id|+1': 1,
                  'name|1-10': '★',
                  'field_type|': ['entity', 'int'],
                  required: true,
                  'data_type|1': ['varchar', 'int', 'double'],
                  'length|1-100': 50
                }
              ],
              'operationList|5': [
                {
                  'id|+1': 1,
                  'name|1': ['新增', '编辑', '删除', '启用'],
                  description: ''
                }
              ],
              'viewList|5': [
                {
                  'id|+1': 1,
                  'name|1': ['新增', '编辑', '删除', '启用'],
                  description: ''
                }
              ],
              'formList|5': [
                {
                  'id|+1': 1,
                  'name|1': ['新增', '编辑', '删除', '启用'],
                  description: ''
                }
              ],
              'dataFilterRuleList|5': [
                {
                  'id|+1': 1,
                  'relation_role|1': ['超级管理员', '公司管理员', '部门经理', '员工'],
                  description: ''
                }
              ],
              'uniqueRuleList|5': [
                {
                  'id|+1': 1,
                  description: ''
                }
              ],
              'rolePermissionsList|5': [
                {
                  'id|+1': 1,
                  'role|1': ['超级管理员', '公司管理员', '部门经理', '员工'],
                  description: ''
                }
              ]
            }
          ],
          pagination: {
            page: json.pagination.page,
            pageSize: json.pagination.pageSize,
          },
          total: 100
        },
      })
    }
  },
  {
    url: 'crv_web_config: any/model/insert',
    type: 'post',
    response: (config: any) => {
      return Mock.mock({
        status: 200,
        message: '成功',
      })
    }
  },
  {
    url: 'crv_web_config: any/model/delete',
    type: 'post',
    response: (config: any) => {
      return Mock.mock({
        status: 200,
        message: '成功',
      })
    }
  },
  {
    url: 'crv_web_config: any/model/update',
    type: 'post',
    response: (config: any) => {
      return Mock.mock({
        status: 200,
        message: '成功',
      })
    }
  },
  {
    url: 'crv_web_config: any/model/queryupdate',
    type: 'post',
    response: (config: any) => {
      const { body } = config;
      const json = JSON.parse(body);
      return Mock.mock({
        status: 200,
        message: 'success',
        result:
          {
            // 模型信息-基本信息
            id: json?.model?.id,
            'name|1-10': '★',
            'type|1': ['entity', 'view'],
            module: 'core',
            'stringId|1': true,
            'idLength|1-128': 28,
            'exportData|1': true,
            'ruleDataSource|1': true,
            'ruleTarget|1': true,
            'ruleDictionary|1': true,
            'reportDataSource|1': true,
            version: 1,
            views: [
              {
                id: '11-',
                createUser: 'wm',
                createTime: '2020-09-08 08:23:34 CST',
                lastUpdateUser: 'wm',
                lastUpdateTime: '2020-09-08 08:23:34 CST',
                name: '视图1',
                statement: '这是视图说明',
                supportSelectCal: true,
                version: 1,
                viewFields: [
                  {
                    id: 'field1',
                    columnWidth: 1001,
                    summary: '$....',
                    summaryFormat: '合计:${}金额',
                    showName: 'abc',
                    headerAlign: 'left',
                    contentAlign: 'center,金额居右，文本居左'
                  },
                  {
                    id: 'field2',
                    columnWidth: 1002,
                    summary: '$....',
                    summaryFormat: '合计:${}金额',
                    showName: 'abc',
                    headerAlign: 'left',
                    contentAlign: 'center,金额居右，文本居左'
                  },
                  {
                    id: 'field3',
                    columnWidth: 1003,
                    summary: '$....',
                    summaryFormat: '合计:${}金额',
                    showName: 'abc',
                    headerAlign: 'left',
                    contentAlign: 'center,金额居右，文本居左'
                  }
                ],
                viewOperations: {
                  headerShowCount: 3,
                  dataShowCount: 4,
                  tableHeader: [
                    { name: '', type: 'SINGLE', operationIds: ['t132'] },
                    { name: '', type: 'SINGLE', operationIds: ['1'] },
                    { name: 'tname1', type: 'COMBO', operationIds: ['t2', 't3'] },
                    { name: '', type: 'SINGLE', operationIds: ['3'] },
                    { name: 'tname2', type: 'COMBO', operationIds: ['t4', 't5'] },
                    { name: 'tname3', type: 'COMBO', operationIds: ['t6', 't7'] },
                    { name: '', type: 'SINGLE', operationIds: ['t9'] }
                  ],
                  dataRow: [
                    { name: '', type: 'SINGLE', operationIds: ['d1'] },
                    { name: 'dname1', type: 'COMBO', operationIds: ['d2', 'd3'] },
                    { name: 'dname2', type: 'COMBO', operationIds: ['d4', 'd5'] },
                    { name: '', type: 'SINGLE', operationIds: ['4'] },
                    { name: '', type: 'SINGLE', operationIds: ['5'] },
                    { name: 'dname3', type: 'COMBO', operationIds: ['d6', 'd7'] }
                  ]
                },
                viewDataFilter: {
                  conditions: [
                    {
                      id: 1,
                      column: 'field1',
                      operation: '=',
                      value: ''
                    },
                    {}
                  ],
                  conditionCombination: '(1 or 2) and 3 [or,and,not]'
                },
                summaryCalculate: [],
                outDataApi: ''
              },
              {
                id: '1+',
                createUser: 'wm',
                createTime: '2020-09-08 08:23:34 CST',
                lastUpdateUser: 'wm',
                lastUpdateTime: '2020-09-08 08:23:34 CST',
                name: '视图2',
                statement: '这是视图说明',
                supportSelectCal: true,
                version: 1,
                viewFields: [
                  {
                    id: 'field1',
                    columnWidth: 1000,
                    summary: '$....',
                    summaryFormat: '合计:${}金额',
                    showName: 'abc',
                    headerAlign: 'left',
                    contentAlign: 'center,金额居右，文本居左'
                  },
                  {
                    id: 'field2'
                  },
                  {
                    id: 'field3'
                  }
                ],
                viewOperations: {
                  headerShowCount: 3,
                  dataShowCount: 3,
                  tableHeader: [
                    { name: '', type: 'SINGLE', operationIds: ['1'] },
                    { name: '', type: 'COMBO', operationIds: ['1', '2'] }
                  ],
                  dataRow: [
                    { name: '', type: 'SINGLE', operationIds: ['1'] },
                    { name: '', type: 'COMBO', operationIds: ['1', '2'] }
                  ]
                  // },
                  // "dataRow": {
                  //   "showCount": 3,
                  //   "operations": [
                  //     {
                  //       "name": "",
                  //       "type": "single",
                  //       "operationIds": ["1"]
                  //     },
                  //     {
                  //       "name": "",
                  //       "type": "combin",
                  //       "operationIds": ["1", "2"]
                  //     }
                  //   ]
                  // }
                },
                viewDataFilter: {
                  conditions: [
                    {
                      id: 1,
                      column: 'field1',
                      operation: '=',
                      value: 'd'
                    },
                    {}
                  ],
                  conditionCombination: '(1 or 2) and 3 [or,and,not]'
                },
                summaryCalculate: [],
                outDataApi: ''
              },
              {
                'id|1-10': '1',
                'name|1-20': '2',
                'isSelect|1': [true, false],
                statement: '这是说明'
              }
            ],
            operations: [
              {
                id: 'operation1',
                name: '操作名1',
                createUser: 'wm',
                createTime: '2020-09-08 08:23:34 CST',
                lastUpdateUser: 'wm',
                lastUpdateTime: '2020-09-08 08:23:34 CST',
                version: 1,
                statement: '这是操作说明tttttttttttttttt1',
                operationSteps: [
                  { name: '1', opType: '1', statement: '1' },
                  { name: '11', opType: '1', statement: '11' },
                  { name: '12', opType: '12', statement: '12' },
                  { name: '13', opType: '13', statement: '13' }
                ],
                pg: 'ztecv',
                operationType: 'FLUSH/CREATE/EDIT/SAVE/MULEDIT/DELETE/DATAEXPORT/DATAIMPORT/OPENMODAL/FIXEDAPI/CUSTOM'
              },
              {
                id: 'operation2',
                name: '操作名2',
                createUser: 'wm',
                operationSteps: [
                  { name: 1, opType: 1, statement: 1 },
                  { name: 11, opType: 11, statement: 11 },
                  { name: 12, opType: 12, statement: 12 },
                  { name: 13, opType: 13, statement: 13 }
                ],
                createTime: '2020-09-08 08:23:34 CST',
                lastUpdateUser: 'wm',
                lastUpdateTime: '2020-09-08 08:23:34 CST',
                version: 1,
                statement: '这是操作说明2',
                operationType: 'FLUSH/CREATE/EDIT/SAVE/MULEDIT/DELETE/DATAEXPORT/DATAIMPORT/OPENMODAL/FIXEDAPI/CUSTOM'
              },
              {
                id: 'operation3',
                name: '操作名3',
                createUser: 'wm',
                operationSteps: [
                  { name: 1, opType: 1, statement: 1 },
                  { name: 11, opType: 11, statement: 11 },
                  { name: 12, opType: 12, statement: 12 },
                  { name: 13, opType: 13, statement: 13 }
                ],
                createTime: '2020-09-08 08:23:34 CST',
                lastUpdateUser: 'wm',
                lastUpdateTime: '2020-09-08 08:23:34 CST',
                version: 1,
                statement: '这是操作说明',
                operationType: 'FLUSH/CREATE/EDIT/SAVE/MULEDIT/DELETE/DATAEXPORT/DATAIMPORT/OPENMODAL/FIXEDAPI/CUSTOM'
              },
              {
                id: 'operation4',
                name: '操作名4',
                createUser: 'wm',
                operationSteps: [
                  { name: 1, opType: 1, statement: 1 },
                  { name: 11, opType: 11, statement: 11 },
                  { name: 12, opType: 12, statement: 12 },
                  { name: 13, opType: 13, statement: 13 }
                ],
                createTime: '2020-09-08 08:23:34 CST',
                lastUpdateUser: 'wm',
                lastUpdateTime: '2020-09-08 08:23:34 CST',
                version: 1,
                statement: '这是操作说明',
                operationType: 'FLUSH/CREATE/EDIT/SAVE/MULEDIT/DELETE/DATAEXPORT/DATAIMPORT/OPENMODAL/FIXEDAPI/CUSTOM'
              },
              {
                id: 'operation5',
                name: '操作名5',
                operationSteps: [
                  { name: 1, opType: 1, statement: 1 },
                  { name: 11, opType: 11, statement: 11 },
                  { name: 12, opType: 12, statement: 12 },
                  { name: 13, opType: 13, statement: 13 }
                ],
                createUser: 'wm',
                createTime: '2020-09-08 08:23:34 CST',
                lastUpdateUser: 'wm',
                lastUpdateTime: '2020-09-08 08:23:34 CST',
                version: 1,
                statement: '这是操作说明',
                operationType: 'FLUSH/CREATE/EDIT/SAVE/MULEDIT/DELETE/DATAEXPORT/DATAIMPORT/OPENMODAL/FIXEDAPI/CUSTOM'
              }
            ],
            fields: [
              {
                id: 'manyToOne1',
                version: '1',
                refModel: 'test211029',
                refModelField: 'create_user',
                createUser: 'wm',
                createTime: '2020-08-09 08:00:00',
                lastUpdateUser: 'wm',
                lastUpdateTime: '2020-08-09 08:00:00',
                name: '单选查询',
                retrieve: true,
                unique: false,
                fieldType: 'MANY_TO_ONE',
                length: 32,
                fieldStatement: '这是字段说明（这个部分是所有字段都包含的基本数据字段，下面每个都是对特定字段类型的补充）',
                defaultValue: '默认值',
                dataValidity: '数据有效性验证规则'
              },
              {
                id: 'manyToOne4',
                version: '1',
                refModel: 'test211029',
                refModelField: 'total_tax_amount',
                createUser: 'wm',
                createTime: '2020-08-09 08:00:00',
                lastUpdateUser: 'wm',
                lastUpdateTime: '2020-08-09 08:00:00',
                name: '单选查询',
                retrieve: true,
                unique: false,
                fieldType: 'MANY_TO_ONE',
                length: 32,
                fieldStatement: '这是字段说明（这个部分是所有字段都包含的基本数据字段，下面每个都是对特定字段类型的补充）',
                defaultValue: '默认值',
                dataValidity: '数据有效性验证规则'
              },
              {
                id: 'manyToOne5',
                version: '1',
                refModel: 'test211029',
                refModelField: 'version',
                createUser: 'wm',
                createTime: '2020-08-09 08:00:00',
                lastUpdateUser: 'wm',
                lastUpdateTime: '2020-08-09 08:00:00',
                name: '单选查询',
                retrieve: true,
                unique: false,
                fieldType: 'MANY_TO_ONE',
                length: 32,
                fieldStatement: '这是字段说明（这个部分是所有字段都包含的基本数据字段，下面每个都是对特定字段类型的补充）',
                defaultValue: '默认值',
                dataValidity: '数据有效性验证规则'
              },
              {
                id: 'manyToOne2',
                version: '1',
                refModel: 'test211029',
                refModelField: 'version',
                createUser: 'wm',
                createTime: '2020-08-09 08:00:00',
                lastUpdateUser: 'wm',
                lastUpdateTime: '2020-08-09 08:00:00',
                name: '单选查询2',
                retrieve: true,
                unique: false,
                fieldType: 'MANY_TO_ONE',
                length: 32,
                fieldStatement: '这是字段说明（这个部分是所有字段都包含的基本数据字段，下面每个都是对特定字段类型的补充）',
                defaultValue: '默认值',
                dataValidity: '数据有效性验证规则'
              },
              {
                id: 'manyToOne3',
                version: '1',
                refModel: 'test211029',
                refModelField: 'create_user',
                createUser: 'wm',
                createTime: '2020-08-09 08:00:00',
                lastUpdateUser: 'wm',
                lastUpdateTime: '2020-08-09 08:00:00',
                name: '单选查询',
                retrieve: true,
                unique: false,
                fieldType: 'MANY_TO_ONE',
                length: 32,
                fieldStatement: '这是字段说明（这个部分是所有字段都包含的基本数据字段，下面每个都是对特定字段类型的补充）',
                defaultValue: '默认值',
                dataValidity: '数据有效性验证规则'
              },
              {
                id: 'manyToMany1',
                version: '1',
                refModel: 'test211029',
                refGroup: '分组1',
                createUser: 'wm',
                createTime: '2020-08-09 08:00:00',
                lastUpdateUser: 'wm',
                lastUpdateTime: '2020-08-09 08:00:00',
                name: 'manyToMany001',
                retrieve: true,
                unique: false,
                fieldType: 'MANY_TO_MANY',
                length: 32,
                fieldStatement: '这是字段说明（这个部分是所有字段都包含的基本数据字段，下面每个都是对特定字段类型的补充）',
                defaultValue: '默认值',
                dataValidity: '数据有效性验证规则'
              },
              {
                id: 'manyToMany2',
                version: '1',
                refModel: 'test211029',
                refGroup: '分组1',
                createUser: 'wm',
                createTime: '2020-08-09 08:00:00',
                lastUpdateUser: 'wm',
                lastUpdateTime: '2020-08-09 08:00:00',
                name: 'manyToMany004',
                retrieve: true,
                unique: false,
                fieldType: 'MANY_TO_MANY',
                length: 32,
                fieldStatement: '这是字段说明（这个部分是所有字段都包含的基本数据字段，下面每个都是对特定字段类型的补充）',
                defaultValue: '默认值',
                dataValidity: '数据有效性验证规则'
              },
              {
                id: 'manyToMany3',
                version: '1',
                refModel: 'test211029',
                refGroup: '分组2',
                createUser: 'wm',
                createTime: '2020-08-09 08:00:00',
                lastUpdateUser: 'wm',
                lastUpdateTime: '2020-08-09 08:00:00',
                name: 'manyToMany003',
                retrieve: true,
                unique: false,
                fieldType: 'MANY_TO_MANY',
                length: 32,
                fieldStatement: '这是字段说明（这个部分是所有字段都包含的基本数据字段，下面每个都是对特定字段类型的补充）',
                defaultValue: '默认值',
                dataValidity: '数据有效性验证规则'
              },
              {
                id: 'oneToMany1',
                version: '1',
                refModel: 'test211029',
                refGroup: '分组2',
                createUser: 'wm',
                createTime: '2020-08-09 08:00:00',
                lastUpdateUser: 'wm',
                lastUpdateTime: '2020-08-09 08:00:00',
                name: 'oneToMany003',
                retrieve: true,
                unique: false,
                fieldType: 'ONE_TO_MANY',
                length: 32,
                fieldStatement: '这是字段说明（这个部分是所有字段都包含的基本数据字段，下面每个都是对特定字段类型的补充）',
                defaultValue: '默认值',
                dataValidity: '数据有效性验证规则'
              },
              {
                id: 'oneToMany2',
                version: '1',
                refModel: 'test211029',
                createUser: 'wm',
                createTime: '2020-08-09 08:00:00',
                lastUpdateUser: 'wm',
                lastUpdateTime: '2020-08-09 08:00:00',
                name: 'oneToMany003',
                retrieve: true,
                unique: false,
                fieldType: 'ONE_TO_MANY',
                length: 32,
                fieldStatement: '这是字段说明（这个部分是所有字段都包含的基本数据字段，下面每个都是对特定字段类型的补充）',
                defaultValue: '默认值',
                dataValidity: '数据有效性验证规则'
              },
              {
                id: 'oneToMany3',
                version: '1',
                refModel: 'test211029',
                createUser: 'wm',
                createTime: '2020-08-09 08:00:00',
                lastUpdateUser: 'wm',
                lastUpdateTime: '2020-08-09 08:00:00',
                name: 'oneToMany003',
                retrieve: true,
                unique: false,
                fieldType: 'ONE_TO_MANY',
                length: 32,
                fieldStatement: '这是字段说明（这个部分是所有字段都包含的基本数据字段，下面每个都是对特定字段类型的补充）',
                defaultValue: '默认值',
                dataValidity: '数据有效性验证规则'
              },
              {
                id: 'manyToOne_test211029',
                version: '1',
                refModel: 'test211029',
                refModelField: 'create_user',
                createUser: 'wm',
                createTime: '2020-08-09 08:00:00',
                lastUpdateUser: 'wm',
                lastUpdateTime: '2020-08-09 08:00:00',
                name: '字段名czxxxxxxxxxxxxxxxxx',
                retrieve: true,
                unique: false,
                fieldType: 'MANY_TO_ONE',
                length: 32,
                fieldStatement: '这是字段说明（这个部分是所有字段都包含的基本数据字段，下面每个都是对特定字段类型的补充）',
                defaultValue: '默认值',
                dataValidity: '数据有效性验证规则'
              },
              {
                id: 'manyToOne_test211029',
                version: '1',
                refModel: 'test211029',
                refModelField: 'create_user',
                createUser: 'wm',
                createTime: '2020-08-09 08:00:00',
                lastUpdateUser: 'wm',
                lastUpdateTime: '2020-08-09 08:00:00',
                name: '字段名czxxxxxxxxxxxxxxxxx',
                retrieve: true,
                unique: false,
                fieldType: 'MANY_TO_ONE',
                length: 32,
                fieldStatement: '这是字段说明（这个部分是所有字段都包含的基本数据字段，下面每个都是对特定字段类型的补充）',
                defaultValue: '默认值',
                dataValidity: '数据有效性验证规则'
              },
              {
                id: 'field2vcfdavvdsvdfdvfdvf',
                version: '1',
                createUser: 'wm',
                createTime: '2020-08-09 08:00:00',
                lastUpdateUser: 'wm',
                lastUpdateTime: '2020-08-09 08:00:00',
                name: '字段名vffdvfdvfd',
                retrieve: true,
                unique: false,
                fieldType: 'CURRENCY',
                length: 32,
                fieldStatement: '这是字段说明（这个部分是所有字段都包含的基本数据字段，下面每个都是对特定字段类型的补充）',
                defaultValue: 0.0,
                decimalDigits: 32,
                minValue: 0.0,
                maxValue: 1999.09,
                showType: '0',
                showDigits: 2
              },
              {
                id: 'field3',
                version: '1',
                createUser: 'wm',
                createTime: '2020-08-09 08:00:00',
                lastUpdateUser: 'wm',
                lastUpdateTime: '2020-08-09 08:00:00',
                name: '字段名 v c cxcxvfdvvvvvv',
                retrieve: true,
                unique: false,
                fieldType: 'DATE',
                dataType: 'date',
                length: 32,
                fieldStatement: '这是字段说明（这个部分是所有字段都包含的基本数据字段，下面每个都是对特定字段类型的补充）',
                defaultType: '0',
                defaultValue: '2020-08-09 08:00:00',
                showType: '0',
                dataValidity: '数据有效性验证规则'
              },
              {
                id: 'text_field1ddddddddddddddddddddddddddddd',
                version: '1',
                createUser: 'wm',
                createTime: '2020-08-09 08:00:00',
                lastUpdateUser: 'wm',
                lastUpdateTime: '2020-08-09 08:00:00',
                name: '字段名ccccccccccccccccccccccccccccccccc',
                retrieve: true,
                unique: false,
                fieldType: 'text',
                length: 32,
                fieldStatement: '这是字段说明（这个部分是所有字段都包含的基本数据字段，下面每个都是对特定字段类型的补充）',
                defaultValue: '默认值',
                dataValidity: '数据有效性验证规则'
              },
              {
                id: 'decimal_field1dddddddddddddddddddddddddd',
                version: '1',
                createUser: 'wm',
                createTime: '2020-08-09 08:00:00',
                lastUpdateUser: 'wm',
                lastUpdateTime: '2020-08-09 08:00:00',
                name: '字段名ssssssssssssssssssssssssssssssssss',
                retrieve: true,
                unique: false,
                fieldType: 'CURRENCY',
                length: 32,
                fieldStatement: '这是字段说明（这个部分是所有字段都包含的基本数据字段，下面每个都是对特定字段类型的补充）',
                defaultValue: 0.0,
                decimalDigits: 32,
                minValue: 0.0,
                maxValue: 1999.09,
                showType: '0',
                showDigits: 2
              },
              {
                id: 'date_field1ddddddddddddddddddccccccccccccccc',
                version: '1',
                createUser: 'wm',
                createTime: '2020-08-09 08:00:00',
                lastUpdateUser: 'wm',
                lastUpdateTime: '2020-08-09 08:00:00',
                name: '字段名qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq',
                retrieve: true,
                unique: false,
                fieldType: 'date',
                dataType: 'date',
                length: 32,
                fieldStatement: '这是字段说明（这个部分是所有字段都包含的基本数据字段，下面每个都是对特定字段类型的补充）',
                defaultType: '0',
                defaultValue: '2020-08-09 08:00:00',
                showType: '0',
                dataValidity: '数据有效性验证规则'
              }
            ],
            'formconfig: anyurations': [
              { id: 1, name: '超级管理员', role: '超级管理员', statement: '121' },
              { id: 2, name: '公司管理员', role: '公司管理员', statement: '121' },
              { id: 3, name: '部门经理', role: '部门经理', statement: '121' },
              { id: 4, name: 'menuconfig: anyures4', role: '员工', statement: '121' },
              { id: 5, name: 'menuconfig: anyures5', role: '员工', statement: '121' },
              { id: 6, name: 'menuconfig: anyures6', role: '部门经理', statement: '121' }
            ]

            // pagination: {
            //   current: json.pagination.current,
            //   pageSize: json.pagination.pageSize,
            //   total: 100
            // }
          }

      })
    }
  }
];

export default modelMock
