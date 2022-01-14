/* eslint-disable no-template-curly-in-string */
import Mock from 'mockjs';
import {
  retrieveModelsUrl,
  retrieveModelFormUrl,
  retrieveModelUrl,
  saveFormUrl,
  getBatchDataUrl,
} from '@/services/apis';

Mock.setup({
  timeout: '20-60',
});

Mock.mock(
  new RegExp(retrieveModelsUrl),
  Mock.mock({
    status: 200,
    message: '提示：操作成功',
    messageCode: 200,
    result: {
      list: [
        { id: 'computer', name: '电脑' },
        { id: 'office', name: '办公室' },
        { id: 'staff', name: '员工' },
      ],
      total: 2,
    },
  })
);
console.log(retrieveModelFormUrl);
Mock.mock(
  new RegExp(retrieveModelFormUrl),
  Mock.mock({
    result: [
      {
        id: 'test_luoju_time',
        views: [],
        fields: [
          {
            id: 'id',
            name: '主键',
            version: 0,
            fieldType: 'INTEGER',
            createTime: '2021-11-30 17:18:48 CST',
            createUser: 'luoju',
            lastUpdateTime: '2021-11-30 17:18:48 CST',
            lastUpdateUser: 'luoju'
          },
          {
            id: 'version',
            name: '版本',
            version: 0,
            fieldType: 'INTEGER',
            createTime: '2021-11-30 17:18:48 CST',
            createUser: 'luoju',
            lastUpdateTime: '2021-11-30 17:18:48 CST',
            lastUpdateUser: 'luoju'
          },
          {
            id: 'create_user',
            name: '创建人',
            version: 0,
            fieldType: 'TEXT',
            length: 200,
            createTime: '2021-11-30 17:18:48 CST',
            createUser: 'luoju',
            lastUpdateTime: '2021-11-30 17:18:48 CST',
            lastUpdateUser: 'luoju'
          },
          {
            id: 'create_time',
            name: '创建时间',
            version: 0,
            fieldType: 'DATETIME',
            createTime: '2021-11-30 17:18:48 CST',
            createUser: 'luoju',
            lastUpdateTime: '2021-11-30 17:18:48 CST',
            lastUpdateUser: 'luoju'
          },
          {
            id: 'last_update_user',
            name: '更新人',
            version: 0,
            fieldType: 'TEXT',
            length: 200,
            createTime: '2021-11-30 17:18:48 CST',
            createUser: 'luoju',
            lastUpdateTime: '2021-11-30 17:18:48 CST',
            lastUpdateUser: 'luoju'
          },
          {
            id: 'last_update_time',
            name: '更新时间',
            version: 0,
            fieldType: 'DATETIME',
            createTime: '2021-11-30 17:18:48 CST',
            createUser: 'luoju',
            lastUpdateTime: '2021-11-30 17:18:48 CST',
            lastUpdateUser: 'luoju'
          },
          {
            id: 'date',
            version: 0,
            createUser: 'luoju',
            createTime: '2021-11-30 17:19:17 CST',
            lastUpdateUser: 'luoju',
            lastUpdateTime: '2021-11-30 17:19:17 CST',
            unique: false,
            name: '日期',
            fieldType: 'DATE',
            length: 60,
            fieldStatement: null,
            showFormat: 'YYYY-MM-DD',
            defaultType: 'SYSTEM',
            defaultValue: ''
          },
          {
            id: 'date_time',
            version: 0,
            createUser: 'luoju',
            createTime: '2021-11-30 17:19:17 CST',
            lastUpdateUser: 'luoju',
            lastUpdateTime: '2021-11-30 17:19:17 CST',
            unique: false,
            name: '日期时间',
            fieldType: 'DATE_TIME',
            length: 60,
            fieldStatement: null,
            showFormat: 'YYYY-MM-DD hh:mm:ss',
            defaultType: 'SYSTEM',
            defaultValue: ''
          },
          {
            id: 'time',
            version: 0,
            createUser: 'luoju',
            createTime: '2021-11-30 17:19:17 CST',
            lastUpdateUser: 'luoju',
            lastUpdateTime: '2021-11-30 17:19:17 CST',
            unique: false,
            name: '时间',
            fieldType: 'TIME',
            length: 60,
            fieldStatement: null,
            showFormat: 'HH:mm:ss',
            defaultType: 'SYSTEM',
            defaultValue: ''
          },
          {
            id: 'time_a_system',
            version: 0,
            createUser: 'luoju',
            createTime: '2021-11-30 17:19:17 CST',
            lastUpdateUser: 'luoju',
            lastUpdateTime: '2021-11-30 17:19:17 CST',
            unique: false,
            name: '时间A系统',
            fieldType: 'TIME',
            length: 60,
            fieldStatement: null,
            showFormat: 'hh:mm:ss a',
            defaultType: 'SYSTEM',
            defaultValue: ''
          },
          {
            id: 'time_a_fixed',
            version: 0,
            createUser: 'luoju',
            createTime: '2021-11-30 17:19:17 CST',
            lastUpdateUser: 'luoju',
            lastUpdateTime: '2021-11-30 17:19:17 CST',
            unique: false,
            name: '时间A固定',
            fieldType: 'TIME',
            length: 60,
            fieldStatement: null,
            showFormat: 'hh:mm:ss A',
            defaultType: 'FIXED',
            defaultValue: '04:05:26'
          },
          {
            id: 'time_kk',
            version: 0,
            createUser: 'luoju',
            createTime: '2021-11-30 17:19:17 CST',
            lastUpdateUser: 'luoju',
            lastUpdateTime: '2021-11-30 17:19:17 CST',
            unique: false,
            name: '时间kk',
            fieldType: 'TIME',
            length: 60,
            fieldStatement: null,
            showFormat: 'kk:mm:ss',
            defaultType: 'FIXED',
            defaultValue: '04:05:26'
          },
          {
            id: 'year',
            version: 0,
            createUser: 'luoju',
            createTime: '2021-11-30 17:19:17 CST',
            lastUpdateUser: 'luoju',
            lastUpdateTime: '2021-11-30 17:19:17 CST',
            unique: false,
            name: '年',
            fieldType: 'YEAR',
            length: 60,
            fieldStatement: null,
            showFormat: 'YYYY'
          },
          {
            id: 'month',
            version: 0,
            createUser: 'luoju',
            createTime: '2021-11-30 17:19:17 CST',
            lastUpdateUser: 'luoju',
            lastUpdateTime: '2021-11-30 17:19:17 CST',
            unique: false,
            name: '月',
            fieldType: 'MONTH',
            length: 60,
            fieldStatement: null,
            showFormat: 'MM'
          },
          {
            id: 'year_month',
            version: 0,
            createUser: 'luoju',
            createTime: '2021-11-30 17:19:17 CST',
            lastUpdateUser: 'luoju',
            lastUpdateTime: '2021-11-30 17:19:17 CST',
            unique: false,
            name: '年月',
            fieldType: 'YEAR_MONTH',
            length: 60,
            fieldStatement: null,
            showFormat: 'YYYY-MM'
          }
        ],
        forms: [
          {
            id: 1,
            name: 'time',
            version: 3,
            createUser: 'luoju',
            createTime: '2021-10-27 17:36:56 CST',
            lastUpdateUser: 'luoju',
            lastUpdateTime: '2021-11-30 15:20:17 CST',
            config: {
              areas: {
                alignSelf: 'center',
                color: '#1e1e1e',
                children: [
                  {
                    parent: 'container',
                    alignSelf: 'initial',
                    color: 'rgba(0, 0, 0, 0.8)',
                    children: [],
                    display: 'block',
                    width: 'auto',
                    justifySelf: 'initial',
                    id: 'operationBar',
                    type: 'div',
                    gridArea: '1 / 1 / 2 / 5',
                    height: 'auto'
                  },
                  {
                    parent: 'container',
                    alignSelf: 'initial',
                    color: 'rgba(0, 0, 0, 0.8)',
                    children: [],
                    display: 'block',
                    width: 'auto',
                    justifySelf: 'initial',
                    id: 'id',
                    type: 'div',
                    gridArea: '2 / 1 / 3 / 2',
                    height: 'auto'
                  },
                  {
                    color: 'rgba(0, 0, 0, 0.8)',
                    type: 'div',
                    display: 'block',
                    grid: null,
                    gridArea: '2 / 2 / 3 / 3',
                    width: 'auto',
                    height: 'auto',
                    justifySelf: 'initial',
                    alignSelf: 'initial',
                    children: [],
                    id: 'date',
                    parent: 'container'
                  },
                  {
                    color: 'rgba(0, 0, 0, 0.8)',
                    type: 'div',
                    display: 'block',
                    grid: null,
                    gridArea: '2 / 3 / 3 / 4',
                    width: 'auto',
                    height: 'auto',
                    justifySelf: 'initial',
                    alignSelf: 'initial',
                    children: [],
                    id: 'date_time',
                    parent: 'container'
                  },
                  {
                    color: 'rgba(0, 0, 0, 0.8)',
                    type: 'div',
                    display: 'block',
                    grid: null,
                    gridArea: '2 / 4 / 3 / 5',
                    width: 'auto',
                    height: 'auto',
                    justifySelf: 'initial',
                    alignSelf: 'initial',
                    children: [],
                    id: 'time',
                    parent: 'container'
                  },
                  {
                    color: 'rgba(0, 0, 0, 0.8)',
                    type: 'div',
                    display: 'block',
                    grid: null,
                    gridArea: '3 / 1 / 4 / 2',
                    width: 'auto',
                    height: 'auto',
                    justifySelf: 'initial',
                    alignSelf: 'initial',
                    children: [],
                    id: 'time_a_system',
                    parent: 'container'
                  },
                  {
                    color: 'rgba(0, 0, 0, 0.8)',
                    type: 'div',
                    display: 'block',
                    grid: null,
                    gridArea: '3 / 2 / 4 / 3',
                    width: 'auto',
                    height: 'auto',
                    justifySelf: 'initial',
                    alignSelf: 'initial',
                    children: [],
                    id: 'year',
                    parent: 'container'
                  },
                  {
                    color: 'rgba(0, 0, 0, 0.8)',
                    type: 'div',
                    display: 'block',
                    grid: null,
                    gridArea: '3 / 3 / 4 / 4',
                    width: 'auto',
                    height: 'auto',
                    justifySelf: 'initial',
                    alignSelf: 'initial',
                    children: [],
                    id: 'month',
                    parent: 'container'
                  },
                  {
                    color: 'rgba(0, 0, 0, 0.8)',
                    type: 'div',
                    display: 'block',
                    grid: null,
                    gridArea: '3 / 4 / 4 / 5',
                    width: 'auto',
                    height: 'auto',
                    justifySelf: 'initial',
                    alignSelf: 'initial',
                    children: [],
                    id: 'year_month',
                    parent: 'container'
                  },
                  {
                    color: 'rgba(0, 0, 0, 0.8)',
                    type: 'div',
                    display: 'block',
                    grid: null,
                    gridArea: '4 / 1 / 5 / 2',
                    width: 'auto',
                    height: 'auto',
                    justifySelf: 'initial',
                    alignSelf: 'initial',
                    children: [],
                    id: 'time_a_fixed',
                    parent: 'container'
                  },
                  {
                    color: 'rgba(0, 0, 0, 0.8)',
                    type: 'div',
                    display: 'block',
                    grid: null,
                    gridArea: '4 / 2 / 5 / 3',
                    width: 'auto',
                    height: 'auto',
                    justifySelf: 'initial',
                    alignSelf: 'initial',
                    children: [],
                    id: 'time_kk',
                    parent: 'container'
                  },
                ],
                grid: {
                  alignContent: 'initial',
                  justifyItems: 'initial',
                  implicit: {
                    columnWidth: '1fr',
                    rowCount: 3,
                    columnCount: 3,
                    childrenCount: 9,
                    rowHeight: '65px'
                  },
                  col: {
                    auto: [],
                    sizes: [
                      '1fr',
                      '1fr',
                      '1fr',
                      '1fr'
                    ],
                    gap: '32px',
                    lineNames: [
                      {
                        name: '',
                        active: false
                      },
                      {
                        name: '',
                        active: false
                      },
                      {
                        name: '',
                        active: false
                      },
                      {
                        name: '',
                        active: false
                      },
                      {
                        name: '',
                        active: false
                      }
                    ]
                  },
                  alignItems: 'initial',
                  autoFlow: 'row',
                  explicitType: 'explicit',
                  row: {
                    auto: [],
                    sizes: [
                      'minmax(65px, min-content)',
                      'minmax(65px, min-content)',
                      'minmax(65px, min-content)',
                      'minmax(65px, min-content)',
                      'minmax(65px, min-content)'
                    ],
                    gap: '8px',
                    lineNames: [
                      {
                        name: '',
                        active: false
                      },
                      {
                        name: '',
                        active: false
                      },
                      {
                        name: '',
                        active: false
                      },
                      {
                        name: '',
                        active: false
                      },
                      {
                        name: '',
                        active: false
                      },
                      {
                        name: '',
                        active: false
                      }
                    ]
                  },
                  justifyContent: 'initial'
                },
                display: 'grid',
                width: 'auto',
                justifySelf: 'center',
                id: 'container',
                type: 'section',
                gridArea: 'auto',
                height: 'auto'
              },
              areaAdditions: {
                operationBar: {
                  operationBar: {
                    operations: [
                      {
                        id: 8
                      },
                      {
                        id: 12
                      }
                    ],
                    id: 'qich4pE',
                    props: {
                      space: {
                        gap: {
                          _$type: 'default',
                          _$content: 20
                        },
                        justifyContent: {
                          _$type: 'default',
                          _$content: 'flex-end'
                        }
                      }
                    }
                  }
                },
                id: {
                  widget: {
                    id: 'integer'
                  },
                  field: {
                    field: 'id'
                  }
                },
                date: {
                  field: {
                    field: 'date'
                  },
                  widget: {
                    id: 'date'
                  }
                },
                date_time: {
                  field: {
                    field: 'date_time'
                  },
                  widget: {
                    id: 'date'
                  }
                },
                time: {
                  field: {
                    field: 'time'
                  },
                  widget: {
                    id: 'date'
                  }
                },
                time_a_system: {
                  field: {
                    field: 'time_a_system'
                  },
                  widget: {
                    id: 'date'
                  }
                },
                time_a_fixed: {
                  field: {
                    field: 'time_a_fixed'
                  },
                  widget: {
                    id: 'date'
                  }
                },
                time_kk: {
                  field: {
                    field: 'time_kk'
                  },
                  widget: {
                    id: 'date'
                  }
                },
                year: {
                  field: {
                    field: 'year'
                  },
                  widget: {
                    id: 'date'
                  }
                },
                month: {
                  field: {
                    field: 'month'
                  },
                  widget: {
                    id: 'date'
                  }
                },
                year_month: {
                  field: {
                    field: 'year_month'
                  },
                  widget: {
                    id: 'date'
                  }
                }
              },
              layoutConfigSetting: {
                additions: {
                  fieldWidgetAlign: {
                    type: 'vertical'
                  }
                }
              }
            }
          }
        ]
      },
      {
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
        fields: [
          {
            length: 20,
            version: 0,
            required: false,
            createTime: '2021-11-11 16:23:27 GMT+08:00',
            name: '主键',
            lastUpdateUser: 'lvcp',
            createUser: 'lvcp',
            id: 'id',
            fieldType: 'TEXT',
            lastUpdateTime: '2021-11-11 16:23:27 GMT+08:00',
          },
          {
            createTime: '2021-11-11 16:23:27 GMT+08:00',
            name: '版本',
            lastUpdateUser: 'lvcp',
            createUser: 'lvcp',
            id: 'version',
            version: 0,
            fieldType: 'INTEGER',
            required: false,
            lastUpdateTime: '2021-11-11 16:23:27 GMT+08:00',
          },
          {
            length: 200,
            version: 0,
            required: false,
            createTime: '2021-11-11 16:23:27 GMT+08:00',
            name: '创建人',
            lastUpdateUser: 'lvcp',
            createUser: 'lvcp',
            id: 'create_user',
            fieldType: 'TEXT',
            lastUpdateTime: '2021-11-11 16:23:27 GMT+08:00',
          },
          {
            createTime: '2021-11-11 16:23:27 GMT+08:00',
            name: '创建时间',
            lastUpdateUser: 'lvcp',
            createUser: 'lvcp',
            id: 'create_time',
            version: 0,
            fieldType: 'DATETIME',
            required: false,
            lastUpdateTime: '2021-11-11 16:23:27 GMT+08:00',
          },
          {
            length: 200,
            version: 0,
            required: false,
            createTime: '2021-11-11 16:23:27 GMT+08:00',
            name: '更新人',
            lastUpdateUser: 'lvcp',
            createUser: 'lvcp',
            id: 'last_update_user',
            fieldType: 'TEXT',
            lastUpdateTime: '2021-11-11 16:23:27 GMT+08:00',
          },
          {
            createTime: '2021-11-11 16:23:27 GMT+08:00',
            name: '更新时间',
            lastUpdateUser: 'lvcp',
            createUser: 'lvcp',
            id: 'last_update_time',
            version: 0,
            fieldType: 'DATETIME',
            required: false,
            lastUpdateTime: '2021-11-11 16:23:27 GMT+08:00',
          },
          {
            defaultValue: '',
            length: 3000,
            version: 0,
            required: false,
            createTime: '2021-11-11 16:23:54 GMT+08:00',
            unique: false,
            name: '文本字段01',
            lastUpdateUser: 'lvcp',
            retrieve: false,
            createUser: 'lvcp',
            id: 'text01',
            fieldType: 'TEXT',
            lastUpdateTime: '2021-11-11 16:23:54 GMT+08:00',
          },
          {
            version: 0,
            required: false,
            defaultType: 'NON_DATE',
            createTime: '2021-11-23 11:29:52 GMT+08:00',
            unique: false,
            name: '出生日期',
            lastUpdateUser: 'admin',
            showType: 'HYPHEN_PREFIX',
            createUser: 'admin',
            id: 'birthday',
            fieldType: 'DATE',
            lastUpdateTime: '2021-11-23 11:29:52 GMT+08:00',
          },
          {
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
            lastUpdateTime: '2021-11-23 16:51:52 GMT+08:00',
          },
        ],
        ruleDataSource: false,
        reportDataSource: false,
        views: [],
        ruleTarget: false,
      },
      {
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
        fields: [
          {
            createTime: '2021-11-05 13:41:03 GMT+08:00',
            name: '主键',
            lastUpdateUser: 'luoju',
            createUser: 'luoju',
            id: 'id',
            version: 0,
            fieldType: 'INTEGER',
            required: false,
            lastUpdateTime: '2021-11-05 13:41:03 GMT+08:00',
          },
          {
            createTime: '2021-11-05 13:41:03 GMT+08:00',
            name: '版本',
            lastUpdateUser: 'luoju',
            createUser: 'luoju',
            id: 'version',
            version: 0,
            fieldType: 'INTEGER',
            required: false,
            lastUpdateTime: '2021-11-05 13:41:03 GMT+08:00',
          },
          {
            length: 200,
            version: 0,
            required: false,
            createTime: '2021-11-05 13:41:03 GMT+08:00',
            name: '创建人',
            lastUpdateUser: 'luoju',
            createUser: 'luoju',
            id: 'create_user',
            fieldType: 'TEXT',
            lastUpdateTime: '2021-11-05 13:41:03 GMT+08:00',
          },
          {
            createTime: '2021-11-05 13:41:03 GMT+08:00',
            name: '创建时间',
            lastUpdateUser: 'luoju',
            createUser: 'luoju',
            id: 'create_time',
            version: 0,
            fieldType: 'DATETIME',
            required: false,
            lastUpdateTime: '2021-11-05 13:41:03 GMT+08:00',
          },
          {
            length: 200,
            version: 0,
            required: false,
            createTime: '2021-11-05 13:41:03 GMT+08:00',
            name: '更新人',
            lastUpdateUser: 'luoju',
            createUser: 'luoju',
            id: 'last_update_user',
            fieldType: 'TEXT',
            lastUpdateTime: '2021-11-05 13:41:03 GMT+08:00',
          },
          {
            createTime: '2021-11-05 13:41:03 GMT+08:00',
            name: '更新时间',
            lastUpdateUser: 'luoju',
            createUser: 'luoju',
            id: 'last_update_time',
            version: 0,
            fieldType: 'DATETIME',
            required: false,
            lastUpdateTime: '2021-11-05 13:41:03 GMT+08:00',
          },
          {
            defaultValue: '555',
            length: 50,
            version: 1,
            required: false,
            createTime: '2021-11-05 13:41:47 GMT+08:00',
            unique: false,
            name: '名称1',
            lastUpdateUser: 'luoju',
            retrieve: false,
            createUser: 'luoju',
            id: 'name1',
            fieldType: 'TEXT',
            lastUpdateTime: '2021-11-05 13:41:51 GMT+08:00',
          },
          {
            length: 50,
            version: 1,
            required: false,
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
            lastUpdateTime: '2021-11-05 13:42:51 GMT+08:00',
          },
          {
            defaultValue: '2021-11-11',
            version: 1,
            required: false,
            defaultType: 'FIXED_DATE',
            createTime: '2021-11-05 13:43:23 GMT+08:00',
            unique: false,
            name: '日期1',
            lastUpdateUser: 'luoju',
            showType: 'HYPHEN_PREFIX',
            createUser: 'luoju',
            id: 'date1',
            fieldType: 'DATE',
            lastUpdateTime: '2021-11-05 13:43:27 GMT+08:00',
          },
        ],
        ruleDataSource: false,
        reportDataSource: false,
        views: [],
        ruleTarget: false,
      },
      {
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
        fields: [
          {
            createTime: '2021-11-10 17:43:59 GMT+08:00',
            name: '主键',
            lastUpdateUser: 'luoju',
            createUser: 'luoju',
            id: 'id',
            version: 0,
            fieldType: 'INTEGER',
            required: false,
            lastUpdateTime: '2021-11-10 17:43:59 GMT+08:00',
          },
          {
            createTime: '2021-11-10 17:43:59 GMT+08:00',
            name: '版本',
            lastUpdateUser: 'luoju',
            createUser: 'luoju',
            id: 'version',
            version: 0,
            fieldType: 'INTEGER',
            required: false,
            lastUpdateTime: '2021-11-10 17:43:59 GMT+08:00',
          },
          {
            length: 200,
            version: 0,
            required: false,
            createTime: '2021-11-10 17:43:59 GMT+08:00',
            name: '创建人',
            lastUpdateUser: 'luoju',
            createUser: 'luoju',
            id: 'create_user',
            fieldType: 'TEXT',
            lastUpdateTime: '2021-11-10 17:43:59 GMT+08:00',
          },
          {
            createTime: '2021-11-10 17:43:59 GMT+08:00',
            name: '创建时间',
            lastUpdateUser: 'luoju',
            createUser: 'luoju',
            id: 'create_time',
            version: 0,
            fieldType: 'DATETIME',
            required: false,
            lastUpdateTime: '2021-11-10 17:43:59 GMT+08:00',
          },
          {
            length: 200,
            version: 0,
            required: false,
            createTime: '2021-11-10 17:43:59 GMT+08:00',
            name: '更新人',
            lastUpdateUser: 'luoju',
            createUser: 'luoju',
            id: 'last_update_user',
            fieldType: 'TEXT',
            lastUpdateTime: '2021-11-10 17:43:59 GMT+08:00',
          },
          {
            createTime: '2021-11-10 17:43:59 GMT+08:00',
            name: '更新时间',
            lastUpdateUser: 'luoju',
            createUser: 'luoju',
            id: 'last_update_time',
            version: 0,
            fieldType: 'DATETIME',
            required: false,
            lastUpdateTime: '2021-11-10 17:43:59 GMT+08:00',
          },
          {
            length: 20,
            version: 1,
            required: false,
            createTime: '2021-11-10 17:44:20 GMT+08:00',
            unique: false,
            name: 'name',
            lastUpdateUser: 'luoju',
            retrieve: false,
            createUser: 'luoju',
            id: 'name',
            fieldType: 'TEXT',
            lastUpdateTime: '2021-11-10 17:44:22 GMT+08:00',
          },
          {
            length: 20,
            version: 1,
            required: false,
            createTime: '2021-11-10 19:43:53 GMT+08:00',
            unique: false,
            name: 'name2',
            lastUpdateUser: 'luoju',
            retrieve: false,
            createUser: 'luoju',
            id: 'name2',
            fieldType: 'TEXT',
            lastUpdateTime: '2021-11-10 19:43:56 GMT+08:00',
          },
          {
            length: 20,
            version: 1,
            required: false,
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
            lastUpdateTime: '2021-11-10 20:11:36 GMT+08:00',
          },
          {
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
            lastUpdateTime: '2021-11-13 18:34:31 GMT+08:00',
          },
          {
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
            lastUpdateTime: '2021-11-11 15:06:53 GMT+08:00',
          },
          {
            refGroup: 'tt',
            refModel: 'test_luoju4',
            version: 7,
            required: false,
            createTime: '2021-11-11 15:09:00 GMT+08:00',
            unique: false,
            name: 'ref3_4',
            lastUpdateUser: 'luoju',
            createUser: 'luoju',
            id: 'ref2',
            fieldType: 'MANY_TO_MANY',
            lastUpdateTime: '2021-11-13 20:28:59 GMT+08:00',
          },
        ],
        ruleDataSource: false,
        reportDataSource: false,
        views: [],
        ruleTarget: false,
      },
      {
        module: 'core',
        updateDBMessage: '',
        type: 'ENTITY',
        exportData: false,
        stringId: false,
        operations: [],
        name: 'test_luoju4',
        updateDBStatus: 1,
        updateDBTime: '2021-11-11 15:25:31 GMT+08:00',
        id: 'test_luoju4',
        ruleDictionary: false,
        fields: [
          {
            createTime: '2021-11-11 15:23:42 GMT+08:00',
            name: '主键',
            lastUpdateUser: 'luoju',
            createUser: 'luoju',
            id: 'id',
            version: 0,
            fieldType: 'INTEGER',
            required: false,
            lastUpdateTime: '2021-11-11 15:23:42 GMT+08:00',
          },
          {
            createTime: '2021-11-11 15:23:42 GMT+08:00',
            name: '版本',
            lastUpdateUser: 'luoju',
            createUser: 'luoju',
            id: 'version',
            version: 0,
            fieldType: 'INTEGER',
            required: false,
            lastUpdateTime: '2021-11-11 15:23:42 GMT+08:00',
          },
          {
            length: 200,
            version: 0,
            required: false,
            createTime: '2021-11-11 15:23:42 GMT+08:00',
            name: '创建人',
            lastUpdateUser: 'luoju',
            createUser: 'luoju',
            id: 'create_user',
            fieldType: 'TEXT',
            lastUpdateTime: '2021-11-11 15:23:42 GMT+08:00',
          },
          {
            createTime: '2021-11-11 15:23:42 GMT+08:00',
            name: '创建时间',
            lastUpdateUser: 'luoju',
            createUser: 'luoju',
            id: 'create_time',
            version: 0,
            fieldType: 'DATETIME',
            required: false,
            lastUpdateTime: '2021-11-11 15:23:42 GMT+08:00',
          },
          {
            length: 200,
            version: 0,
            required: false,
            createTime: '2021-11-11 15:23:42 GMT+08:00',
            name: '更新人',
            lastUpdateUser: 'luoju',
            createUser: 'luoju',
            id: 'last_update_user',
            fieldType: 'TEXT',
            lastUpdateTime: '2021-11-11 15:23:42 GMT+08:00',
          },
          {
            createTime: '2021-11-11 15:23:42 GMT+08:00',
            name: '更新时间',
            lastUpdateUser: 'luoju',
            createUser: 'luoju',
            id: 'last_update_time',
            version: 0,
            fieldType: 'DATETIME',
            required: false,
            lastUpdateTime: '2021-11-11 15:23:42 GMT+08:00',
          },
          {
            length: 30,
            version: 1,
            required: false,
            createTime: '2021-11-11 15:24:04 GMT+08:00',
            unique: false,
            name: 'name',
            lastUpdateUser: 'luoju',
            retrieve: false,
            createUser: 'luoju',
            id: 'name',
            fieldType: 'TEXT',
            lastUpdateTime: '2021-11-11 15:24:06 GMT+08:00',
          },
          {
            version: 1,
            required: false,
            defaultType: 'NON_DATE',
            createTime: '2021-11-11 15:24:23 GMT+08:00',
            unique: false,
            name: 'date',
            lastUpdateUser: 'luoju',
            showType: 'HYPHEN_PREFIX',
            createUser: 'luoju',
            id: 'date',
            fieldType: 'DATE',
            lastUpdateTime: '2021-11-11 15:24:25 GMT+08:00',
          },
        ],
        ruleDataSource: false,
        reportDataSource: false,
        views: [],
        ruleTarget: false,
      },
    ],
    messageCode: 200,
    message: '提示：操作成功',
    status: 200,
  })
);
Mock.mock(
  new RegExp(retrieveModelUrl),
  Mock.mock({
    status: 200,
    message: '提示：操作成功',
    messageCode: 200,
    result: {
      id: 'computer',
      name: '电脑',
      fields: [
        {
          id: 'sn',
          name: '序号',
          fieldType: 'TEXT',
        },
        {
          id: 'brand',
          name: '品牌',
          fieldType: 'TEXT',
        },
        {
          id: 'owner',
          name: '拥有者',
          fieldType: 'TEXT',
        },
        {
          id: 'specification',
          name: '型号',
          fieldType: 'TEXT',
        },
        {
          id: 'price',
          name: '价格',
          fieldType: 'DECIMAL',
        },
        {
          id: 'dateOfProduction',
          name: '生产日期',
          fieldType: 'DATE',
        },
      ],
      operations: [
        {
          id: 1,
          name: '新建',
          statement: '这是新建按钮',
        },
        {
          id: 4,
          name: '编辑',
          statement: '这是编辑按钮',
        },
        {
          id: 7,
          name: '删除',
          statement: '请注意，这是删除按钮',
          operationSteps: [
            {
              stepType: 'CALL_API',
              callApiType: 'INNER_API',
              innerApi: 'DELETE',
              errorContinue: true,
            },
            {
              stepType: 'FORM_SWITCH',
              pageType: 'TO_FORM',
              modelId: 'modelId1',
              formId: 1,
              formType: 'create',
            },
          ],
        },
        {
          id: 9,
          name: '返回',
          statement: '请注意，这是返回按钮',
          operationSteps: [
            {
              stepType: 'FORM_SWITCH',
              pageType: 'GO_BACK',
            },
          ],
        },
      ],
      forms: [
        {
          id: 1,
          name: '添加记录表单',
          statement: '添加记录用，详情联系xxx',
          // eslint-disable-next-line @typescript-eslint/quotes, quotes, no-template-curly-in-string
          config:
            '{"areas":{"name":"container","color":"#1e1e1e","type":"section","display":"grid","grid":{"explicitType":"explicit","implicit":{"childrenCount":9,"rowCount":3,"columnCount":3,"rowHeight":"50px","columnWidth":"1fr"},"row":{"sizes":["minmax(50px, min-content)","minmax(50px, min-content)","minmax(50px, min-content)"],"auto":[],"lineNames":[{"active":false,"name":""},{"active":false,"name":""},{"active":false,"name":""},{"active":false,"name":""}],"gap":"8px"},"col":{"sizes":["1fr","1fr","1fr","1fr"],"auto":[],"lineNames":[{"active":false,"name":""},{"active":false,"name":""},{"active":false,"name":""},{"active":false,"name":""}],"gap":"32px"},"autoFlow":"row","justifyContent":"initial","alignContent":"initial","justifyItems":"initial","alignItems":"initial"},"gridArea":"auto","width":"auto","height":"auto","justifySelf":"center","alignSelf":"center","children":[{"name":"OfkOnul","color":"rgba(0, 0, 0, 0.8)","type":"div","display":"block","grid":null,"gridArea":"1 / 1 / 2 / 5","width":"auto","height":"auto","justifySelf":"initial","alignSelf":"initial","children":[],"id":"IezaXh4","parent":"3ID9ILe"},{"name":"ipMehki","color":"rgba(0, 0, 0, 0.8)","type":"div","display":"block","grid":null,"gridArea":"2 / 1 / 3 / 2","width":"auto","height":"auto","justifySelf":"initial","alignSelf":"initial","children":[],"id":"nTAxQdD","parent":"3ID9ILe"},{"name":"BjdMTvt","color":"rgba(0, 0, 0, 0.8)","type":"div","display":"block","grid":null,"gridArea":"2 / 2 / 3 / 3","width":"auto","height":"auto","justifySelf":"initial","alignSelf":"initial","children":[],"id":"QgOYHXt","parent":"3ID9ILe"},{"name":"ILXquNI","color":"rgba(0, 0, 0, 0.8)","type":"div","display":"block","grid":null,"gridArea":"2 / 3 / 3 / 4","width":"auto","height":"auto","justifySelf":"initial","alignSelf":"initial","children":[],"id":"rTSyHzU","parent":"3ID9ILe"},{"name":"JNkGjkU","color":"rgba(0, 0, 0, 0.8)","type":"div","display":"block","grid":null,"gridArea":"3 / 1 / 4 / 2","width":"auto","height":"auto","justifySelf":"initial","alignSelf":"initial","children":[],"id":"NU9sUbZ","parent":"3ID9ILe"},{"name":"bFnFRzZ","color":"rgba(0, 0, 0, 0.8)","type":"div","display":"block","grid":null,"gridArea":"3 / 2 / 4 / 3","width":"auto","height":"auto","justifySelf":"initial","alignSelf":"initial","children":[],"id":"Mul16Gl","parent":"3ID9ILe"},{"name":"aaaaaaa","color":"rgba(0, 0, 0, 0.8)","type":"div","display":"block","grid":null,"gridArea":"3 / 3 / 4 / 4","width":"auto","height":"auto","justifySelf":"initial","alignSelf":"initial","children":[],"id":"bbbbbbb","parent":"3ID9ILe"}],"id":"3ID9ILe","parent":null},"areaAdditions":{"IezaXh4":{"operationBar":{"id":"bT3vJI6","operations":[{"id":1},{"id":4},{"id":7},{"id":9}],"props":{"space":{"justifyContent":{"_$type":"default","_$content":"flex-end"},"gap":{"_$type":"default","_$content":20}}}}},"nTAxQdD":{"field":{"field":"sn"},"widget":{"id":"decimal"}},"QgOYHXt":{"field":{"field":"brand"},"widget":{"id":"text"}},"rTSyHzU":{"field":{"field":"owner"},"widget":{"id":"text"}},"NU9sUbZ":{"field":{"field":"specification"},"widget":{"id":"text","props":{"disabled":{"_$type":"boolean","_$content":true}}}},"Mul16Gl":{"field":{"field":"price"},"widget":{"id":"decimal","props":{"disabled":{"_$type":"expression","_$content":"${brand} === \'abc\'"}}}},"bbbbbbb":{"field":{"field":"dateOfProduction"},"widget":{"id":"date","props":{"disabled":{"_$type":"function","_$content":"function(data) {\\n    return data.brand === \'aaa\';\\n}"}}}}}}',
        },
        {
          id: 2,
          name: '修改表单',
          statement: '修改记录用，详情联系xxx',
        },
      ],
    },
  })
);

// 保存表单
Mock.mock(
  new RegExp(saveFormUrl),
  Mock.mock({
    status: 200,
    message: '提示：操作成功',
    messageCode: 200,
  })
);

// 查询批量数据
Mock.mock(
  new RegExp(getBatchDataUrl),
  Mock.mock({
    status: 200,
    message: '提示：操作成功',
    messageCode: 200,
    result: [
      {
        sn: 'ajhdfks',
        brand: 'lenovo',
        specification: 'W530',
        price: '3589',
      },
      {
        sn: 'chdfsiuf',
        brand: 'dell',
        specification: 'D543',
        price: '7895',
      },
    ],
  })
);
