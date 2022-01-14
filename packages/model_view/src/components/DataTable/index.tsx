/* eslint-disable no-template-curly-in-string */
import { FC, ReactNode, useCallback, useMemo, useState } from 'react'
import { dataActions } from '@/redux/actions'
import ResizeTable from './ResizeTable'
import RowActionBar from './RowActionBar'
import { useSelector, useDispatch } from 'react-redux'
import { emptyData, emptyConfig } from '@/constants/dataSliceConstant'
import { ListConfigProps, ListDataProps, ViewProps, ViewDataListType } from '@/interfaces/ListConfig'
import { Row, Col, Table, ConfigProvider } from 'antd'
import { EnumFieldType, associatedField, AlignColumnType, formulaField } from '@/constants/constant'
import zhCN from 'antd/es/locale/zh_CN'
import { dateTransform, currencyTransform, alignTransform, deepCopy, removeFromArray } from '@/utils/utilConvert'
import dataSimpleFieldTypeConvert from './RenderAction/dataConvert';
import ColumnTitle from './ColumnTitle';
import { getOperationColWidth } from '@rc/CustomTable/business/RowActionBar/utils';

/**
 * 列设置弹层
 */
const DataTable: FC = () => {
  const dispatch = useDispatch()
  // 配置
  const { current, viewList, showColumnsList }: ListConfigProps = useSelector((state: any) => state.config)
  const {
    supportSelectCal,
    config: {
      actions,
      columns,
      viewFields
    },
    refModelInfo = []
  }: ViewProps = viewList[current] ?? emptyConfig
  const { viewDataList }: ViewDataListType = useSelector((state: any) => state.data)
  const { loading, data: { list = [], pagination, summary = {}, total }, temp = {} }: ListDataProps = viewDataList[current] ?? emptyData

  const [fixedColumns, setFixedColumns] = useState<any>({ left: [], right: [] })

  const showColumns = useMemo(() => {
    const tempShowCols = [...(showColumnsList[current] ?? [])]

    fixedColumns.left.forEach((field: string) => {
      const index = tempShowCols.findIndex((c: any) => c.id === field);
      if (index > -1) {
        const temp = tempShowCols[index];
        tempShowCols.splice(index, 1);
        tempShowCols.splice(0, 0, temp);
      }
    })

    // if (fixedColumns.left) {
    //   const index = tempShowCols.findIndex((c: any) => c.id === fixedColumns.left);
    //   if (index > -1) {
    //     const temp = tempShowCols[index];
    //     tempShowCols.splice(index, 1);
    //     tempShowCols.splice(0, 0, temp);
    //   }
    // }
    fixedColumns.right.forEach((field: string) => {
      const index = tempShowCols.findIndex((c: any) => c.id === field);
      if (index > -1) {
        const temp = tempShowCols[index];
        tempShowCols.splice(index, 1);
        tempShowCols.push(temp)
      }
    })
    // if (fixedColumns.right) {
    //   const index = tempShowCols.findIndex((c: any) => c.id === fixedColumns.right);
    //   if (index > -1) {
    //     const temp = tempShowCols[index];
    //     tempShowCols.splice(index, 1);
    //     tempShowCols.push(temp)
    //   }
    // }
    return tempShowCols;
  }, [showColumnsList, current, fixedColumns]);
  // 数据格式转换
  const dataSource = useMemo(() => dataSimpleFieldTypeConvert({ columns: viewFields, data: list, refModelInfo }), [viewFields, list, refModelInfo])

  const paginationBase: any = useMemo(() => {
    return {
      ...pagination,
      showQuickJumper: true,
      showSizeChanger: true,
      pageSizeOptions: [10, 20, 50, 100, 200],
      showTotal: (total: any) => <span>共：{total}</span>
    }
  }, [pagination])
  console.log('getOperationColWidth-actions', actions);
  const operationWidth: number = useMemo(() => {
    const { showCount, buttons }: { showCount: number, buttons: any[] } = actions.row
    return getOperationColWidth(
      buttons.map(item => ({
        ...item,
        operationIds: item.operations?.map(({ name }: any) => ({ name })),
      })).slice(0, showCount),
      [],
      'More',
      {
        gap: 8,
        lrPadding: 5,
      }
    );
    // // 操作行字符的数量
    // let textCount: number = 0
    // // 操作行操作按钮的数量
    // let operationCount: number = 0
    // buttons.filter((item, index) => index <= showCount).forEach(button => {
    //   // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
    //   textCount = textCount + stringCharacterCount(button.type === 'SINGLE' ? button.operations[0].name : button.name)
    //   operationCount++
    // })
    // const OPERATION_WIDTH = 8
    // const CHARTER_WIDTH = 8
    // const PADDING_WIDTH = 20
    // if (textCount === 0 && operationCount === 0) {
    //   // 操作字符数量和操作行按钮数量为0返回0
    //   return 0
    // }
    // // 返回的长度 = 操作按钮的数量 - 1 * 间距 + 字符数 * 每个字符的宽度 + 左右的间隔
    // if (buttons.length > showCount) {
    //   // 有更多操作一栏
    //   return operationCount * OPERATION_WIDTH + (textCount + 2) * CHARTER_WIDTH + PADDING_WIDTH
    // } else {
    //   return (operationCount - 1) * OPERATION_WIDTH + textCount * CHARTER_WIDTH + PADDING_WIDTH
    // }
  }, [actions.row])

  /** 列变化 */
  const onColumnChange = useCallback((column: any, colSet?: any) => {
    const tempFixed: any = {
      left: removeFromArray(fixedColumns.left, (field: string) => field === column.dataIndex),
      right: removeFromArray(fixedColumns.right, (field: string) => field === column.dataIndex)
    }
    if (!colSet) {
      const tempSort = column.dataIndex !== temp.columnSorter?.field ? temp.columnSorter : null;
      const tempFilters = { ...(temp?.filters?.columnSearch ?? {}) };
      if (tempFilters[column.dataIndex]) {
        // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
        delete tempFilters[column.dataIndex]
      }
      setFixedColumns(tempFixed)
      dispatch(dataActions.setColumnStatus({
        viewId: current,
        sorter: tempSort,
        filters: Object.keys(tempFilters).length > 0 ? tempFilters : undefined
      }))
      return;
    }
    const { sort, filter, fixed, fieldType } = colSet;
    // // 固定列处理
    // const tempFixed = { ...fixedColumns };

    // if (tempFixed.left === column.dataIndex) { tempFixed.left = null }
    // if (tempFixed.right === column.dataIndex) { tempFixed.right = null }
    if (fixed) {
      tempFixed[fixed].push(column.dataIndex);
      setFixedColumns(tempFixed)
    } else {
      setFixedColumns(tempFixed)
    }
    // 筛选、排序处理
    // if (sort || filter || filter === '') {

    // }
    const tempColFilters: any = { ...(temp?.filters?.columnSearch ?? {}) };
    if (filter) {
      const fieldTypeOperatorMap: any = { TEXT: 'LIKE', LONG_TEXT: 'LIKE', ENUM: 'IN' }
      const operate: any = fieldTypeOperatorMap[fieldType] ?? 'BETWEEN'
      const tempFilter = { valueType: 'VALUE', title: column.name, field: column.dataIndex, operate: operate, value: filter, t: new Date().getTime(), enumConfig: column.enumConfig ?? {} }
      tempColFilters[column.dataIndex] = tempFilter;
    } else {
      // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
      delete tempColFilters[column.dataIndex]
    }
    let tempColSorter: any = temp.columnSorter;
    if (sort) { tempColSorter = { field: column.dataIndex, sort: sort, title: column.name } } else if (temp.columnSorter && temp.columnSorter.field === column.dataIndex) { tempColSorter = undefined }
    dispatch(dataActions.setColumnStatus({
      viewId: current,
      sorter: tempColSorter,
      filters: Object.keys(tempColFilters).length > 0 ? tempColFilters : undefined
    }))
  }, [current, dispatch, fixedColumns, temp.columnSorter, temp?.filters?.columnSearch])

  const cols = useMemo(() => [
    {
      title: '操作',
      width: operationWidth,
      dataIndex: 'operationData',
      fixed: 'left',
      onCell: () => ({ style: { textAlign: 'center' } }),
      render: (text: any, record: any) => <RowActionBar record={record} temp={temp} pagination={pagination} />
    },
    ...showColumns.map(showColumn => {
      const baseColumns = deepCopy(columns[columns.findIndex(column => column.dataIndex === showColumn.id)], {})
      const viewField = viewFields[viewFields.findIndex(field => showColumn.id === field.id)] ?? {}
      baseColumns.className = alignTransform(viewField?.contentAlign ?? AlignColumnType.COLUMN_LEFT)
      // 冻结列
      if (fixedColumns.left.includes(baseColumns.dataIndex)) { baseColumns.fixed = 'left' }
      if (fixedColumns.right.includes(baseColumns.dataIndex)) { baseColumns.fixed = 'right' }
      baseColumns.title = (
        <ColumnTitle
          title={baseColumns.title}
          {...baseColumns}
          {...viewField}
          fieldType={viewField.fieldType}
          fixed={fixedColumns.left.includes(baseColumns.dataIndex) ? 'left' : (fixedColumns.right.includes(baseColumns.dataIndex) ? 'right' : undefined)}
          isShowIcon={![...associatedField, formulaField].includes(viewField.fieldType)}
          sort={temp?.columnSorter?.field === baseColumns.dataIndex && temp?.columnSorter?.sort}
          filterContent={(temp?.filters?.columnSearch?.[baseColumns.dataIndex]?.value)}
          onChange={(columnValue: any) => onColumnChange({ ...baseColumns, ...viewField }, columnValue)}
        />
      )
      // 对关联字段做拼接和显示
      return { ...baseColumns }
    })
  ], [operationWidth, showColumns, temp, pagination, columns, viewFields, fixedColumns, onColumnChange])

  const rowSelection = useMemo(() => {
    return {
      selectedRowKeys: temp.selectedRowKeys,
      onChange: (selectedRowKeys: any[], selectedRows: any[]) => {
        dispatch(dataActions.setSelectRows({ viewId: current, selectedRowKeys, selectedRows, loading: supportSelectCal }))
        // if (supportSelectCal) {
        //   const params = queryDataPreProcessing(modelId, pagination, viewFields, defaultSort, temp, viewDataFilter, summaryCalculate)
        //   if (selectedRowKeys.length > 0) {
        //     if (params.filter.length === 0) { params.filter.push({}) }
        //     params.filter.push({ id: { $in: selectedRowKeys } })
        //     params.queryList = false
        //     // dispatch(query(queryRequest({ modelId, pagination, viewFields: viewFields, filter: [filterStringFun(temp.filters), { id: { $in: selectedRowKeys } }], queryList: false })))
        //     dispatch(query(queryRequest(params)))
        //   } else {
        //     params.queryList = true
        //     dispatch(query(queryRequest(params)))
        //     // dispatch(query(queryRequest({ modelId, pagination, viewFields: viewFields, filter: [filterStringFun(temp.filters)], queryList: true })))
        //   }
        // }
      }
    }
  }, [temp, dispatch, current, supportSelectCal])

  // 分页排序变化
  const tableChange = useCallback((pageValue: any, filter: any, sorter: any) => {
    dispatch(dataActions.setPage({ viewId: current, pagination: pageValue }))// , sorter: sorterArr
  }, [dispatch, current])

  // 汇总行
  const tableSummary = useCallback(() => {
    if (Object.keys(summary).length > 0) {
      return (
        <Table.Summary fixed>
          <Table.Summary.Row>
            <Table.Summary.Cell index={0} key={0} className='column-center' colSpan={1}>
              <span>{'汇总'}</span>
            </Table.Summary.Cell>
            {
              cols.map((item: any, itemIndex: number) => {
                return (
                  // TODO: 对应汇总行显示问题
                  <Table.Summary.Cell index={itemIndex + 1} key={itemIndex} className={item.className} colSpan={1}>
                    {/* <Table.Summary.Cell index={itemIndex + 1} key={itemIndex + 1} className={item.className} colSpan={1}> */}
                    {
                      (() => {
                        // 汇总行显示内容
                        const viewFieldIndex = viewFields.findIndex(viewField => viewField.id === item.dataIndex)
                        const { summaryFormat, fieldType, showType, showDigits, summary: formula } = viewFields[viewFieldIndex] ?? {}
                        let summaryDate = summary[item.dataIndex]
                        // id有汇总时，将重命名为newId给后端（原因： 后端需求），在此处做处理
                        if (item.dataIndex === 'id') {
                          summaryDate = summary.newId ?? summary.id
                        }
                        // 货币日期时
                        if (fieldType === EnumFieldType.CURRENCY) {
                          summaryDate = currencyTransform(summaryDate, showDigits, showType)
                        }
                        if (fieldType === EnumFieldType.DATE) {
                          summaryDate = dateTransform(summaryDate, showType)
                        }
                        // 对id特殊处理，只有存在formula时：
                        if (formula && formula.length > 0) {
                          if (summaryFormat && summaryFormat.length > 0 && summary[item?.dataIndex]) {
                            console.log('item?.dataIndex', item?.dataIndex, itemIndex)
                            return <span>{summaryFormat.replace('${}', summaryDate)}</span>
                          } else {
                            return <span>{summaryDate ?? ''}</span>
                          }
                        }
                        return ''
                      })()
                    }
                  </Table.Summary.Cell>
                )
              })
            }
          </Table.Summary.Row>
        </Table.Summary>
      )
    } else {
      return null
    }
  }, [summary, viewFields, cols])

  const footerComponent: ReactNode = (
    <Row>
      <Col span={12}>
        &nbsp;
        {
          Object.keys(total ?? {}).map((title: string) => <span key={`total_${title}`} style={{ marginRight: 5 }}>{`${title}:${total[title]}`}</span>)
        }
      </Col>
    </Row>
  )

  return (
    <ConfigProvider locale={zhCN}>
      {/* // <VirtualTable
    // columns={cols}
    // dataSource={list}
    // // rowKey="id"
    // loading={loading}
    // // parentDomId="dataTable"
    // // className="dataTable"
    // bordered
    // size="small"
    // // columns={cols}
    // // dataSource={list}
    // pagination={paginationBase}
    // footer={() => { return footerComponent }}
    // onChange={tableChange}
    // rowSelection={rowSelection}
    // scroll={{ y: a, x: '100vw' }}
    // /> */}
      <ResizeTable
        rowKey="id"
        loading={viewFields.length > 0 && loading}
        parentDomId="dataTable"
        className="dataTable"
        bordered
        size="small"
        columns={cols}
        dataSource={dataSource}
        pagination={paginationBase}
        footer={() => { return footerComponent }}
        // onRow={(record: any, index: number) => {
        //   return (
        //     <LazyLoad height={200}>
        //       1ss
        //     </LazyLoad>
        //   )
        // }}
        onChange={tableChange}
        rowSelection={rowSelection}
        scroll={{ y: 1000 }}
        summary={tableSummary}
      // summary={Object.keys(summary).length > 0 && tableSummary}
      />
    </ConfigProvider>
  )
}

export default DataTable;
