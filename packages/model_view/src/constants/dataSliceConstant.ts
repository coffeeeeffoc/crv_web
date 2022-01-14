export const emptyData = {
  loading: true,
  temp: {
    filters: {
      quickSearch: undefined,
      complexSearch: undefined,
      columnSearch: undefined
    },
    colsWidth: {},
  }, // 临时数据  选择行  筛选条件等
  data: {
    list: [],
    pagination: { current: 1, pageSize: 10, total: 0 },
    sorter: {}
  }
}

export const emptyConfig = {
  config: {
    filterFields: [],
    actions: { top: { buttons: [], showCount: 3 }, row: { buttons: [], showCount: 3 } },
    columns: [],
    defaultFilterFields: [],
    viewFields: [],
    showColumns: []
  },
  // 关联表信息
  refModelInfo: {},
  supportSelectCal: false
}
