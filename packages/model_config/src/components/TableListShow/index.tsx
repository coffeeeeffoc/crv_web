import { useState, useEffect, useCallback } from 'react'
import type { FC } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import HeadModule from '@@/ModuleUtils/HeadModule'
import { Table, Row, Col } from 'antd'
import { modelEditActions } from '@/redux/actions'
import tableStyle from './index.less'

interface propsDataType {
  dataSource: object[]
  tabType: string
  buttonType?: object[]
  columns: object[]
  filterCondition: string[]
  rowSelection?: any
}
const TableListShow: FC<propsDataType> = (props) => {
  const { dataSource, tabType, buttonType, columns, filterCondition, rowSelection } = props

  const { loading } = useSelector((state: any) => state[tabType] || {})
  const dispatch = useDispatch()

  const [search, setSearch] = useState('')
  const [dataSourceList, setDataSourceList] = useState(dataSource)
  useEffect(() => {
    let reg: any = ''
    try {
      reg = new RegExp(search.trim(), 'i')
    } catch {
      reg = search
      console.log('RegExp error')
    }
    setDataSourceList(dataSource.filter((item: any) => {
      if (!search?.trim()) {
        return true
      }
      const index = filterCondition.findIndex((field: any) => {
        try {
          return JSON.stringify(item[field])?.search(reg) > -1
        } catch {
          return false
        }
      })
      return index > -1
    }))
  }, [dataSource, filterCondition, search, setDataSourceList])

  const paginations: any = {
    showQuickJumper: true,
    showSizeChanger: true,
    pageSizeOptions: [10, 20, 25, 50, 100]
  }

  const selectEnter = useCallback((val: string) => {
    setSearch(val)
    dispatch(modelEditActions.setUpdate('update'))
  }, [dispatch])
  return (
    <Row>
      <Col span={24}>
        <HeadModule onSearch={selectEnter} buttonType={buttonType} />
      </Col>
      <Col span={24} style={{ marginTop: 20 }}>
        <Table
          className={tableStyle.table}
          footer={() => <span style={{ marginTop: '10px' }}>{`总条数：${dataSourceList.length}`}</span>}
          loading={loading}
          bordered
          rowKey="id"
          size="small"
          columns={columns}
          dataSource={dataSourceList}
          pagination={paginations}
          rowSelection={rowSelection}
          scroll={{ y: 'x' }}
        />
      </Col>
    </Row>
  )
}
export default TableListShow
