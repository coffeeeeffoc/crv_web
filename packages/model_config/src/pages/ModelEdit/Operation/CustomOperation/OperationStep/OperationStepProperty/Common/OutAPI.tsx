import { useState, useEffect, useMemo, useCallback } from 'react'
import styles from './index.less'
import { useSelector, useDispatch } from 'react-redux'
import { Table, Row, Col, Input, Button } from 'antd'
import { operationUrlActions } from '@redux/actions'
import ShowModal from '@@/ModuleUtils/ShowModal'
import HeadModule from '@@/ModuleUtils/HeadModule'

interface propsType {
  value: {
    url?: string
    name?: string
    id?: string
  }
  onChange: (param: any) => void
  visible: boolean
  setVisible: (param: boolean) => void
  stepType: string
  requestDispatch: (param: any) => void

}
const { Search } = Input
const OutAPIModal = ({
  value,
  onChange,
  visible,
  setVisible,
  stepType,
  requestDispatch
}: propsType) => {
  const dispatch = useDispatch()
  const [selectedRow, setSelectedRow] = useState({} as any)
  const searchValue: any = useMemo(() => {
    if (value) {
      return value
    } else return ''
  }, [value])

  const { loading, list = [], pagination, retrieveCondition } = useSelector((state: any) => state.operationUrl)

  useEffect(() => {
    // 页面刷新
    dispatch(operationUrlActions.setRetrieveCondition({ retrieveCondition: '' }))
  }, [dispatch])

  useEffect(() => {
    if (loading && visible) {
      dispatch(requestDispatch({ pagination: { page: pagination.current, pageSize: pagination.pageSize }, filter: { retrieveCondition: retrieveCondition } }))
    }
  }, [loading, visible, dispatch, stepType, pagination, requestDispatch, retrieveCondition, selectedRow])

  useEffect(() => {
    const propsValueIndex = list.findIndex((item: { url: string, [propsName: string]: any }) => item.url === searchValue.url)
    if (propsValueIndex !== -1) setSelectedRow({ url: list[propsValueIndex].url })
  }, [list, searchValue.url])

  // 点击确定后的回调
  const handleOk = () => {
    onChange({ name: selectedRow.name, url: selectedRow.url, id: selectedRow.id })
    setVisible(false)
  }

  const handleCancel = () => {
    setVisible(false)
  }

  const setRowClassName = useCallback((record: { url: string, [propsName: string]: any }) => {
    if (selectedRow?.url === record?.url) return styles.onRowClick
  }, [selectedRow])

  const paginations = {
    ...pagination,
    showQuickJumper: true,
    showSizeChanger: true,
    pageSizeOptions: [10, 20, 25, 50, 100]
  }

  const columns = [
    {
      title: ' 名称',
      dataIndex: 'name',
    },
    {
      title: '说明',
      dataIndex: 'statement',
    },
    {
      title: 'URL',
      dataIndex: 'url',
    }
  ]

  const title = (
    <HeadModule textLeft='外部页面选择' buttonType={[
      <Button size='small' key='ok' type='primary' className='okBtn' onClick={handleOk}>确定</Button>,
      <Button size='small' key='cancel' type='primary' className='cancelBtn' onClick={handleCancel}>取消</Button>
    ]} />
  )

  // 分页、排序、筛选变化时触发
  const onTableChange = (pagination: any) => {
    dispatch(operationUrlActions.setPagination({ pagination: pagination }))
  }

  // 检索回调
  const onSearch = (val: string) => {
    dispatch(operationUrlActions.setRetrieveCondition({ retrieveCondition: val }))
  }

  return (
    <ShowModal
      // destroyOnClose
      title={title}
      visible={visible}
      bodyStyle={{ overflowY: 'auto' }}
    >
      <div style={{ width: '100%', margin: 'auto', padding: '10px 10px 0 10px' }} >
        <Row>
          <Col span={24}>
            <Search placeholder='输入检索关键字' onSearch={onSearch} enterButton />
          </Col>
          <Col span={24} style={{ marginTop: 10 }}>
            <Table
              bordered
              size='small'
              className={styles.table}
              loading={loading}
              rowKey='id'
              columns={columns}
              rowClassName={setRowClassName}
              dataSource={list || []}
              pagination={paginations}
              scroll={{ y: '300px' }}
              onChange={onTableChange}
              footer={() => `总条数：${paginations.total ?? 0}`}
              onRow={record => ({
                onClick: e => {
                  setSelectedRow(record)
                },
                onDoubleClick: e => {
                  onChange({ name: record.name, url: record.url, id: record.id })
                  setVisible(false)
                }
              })}
            />
          </Col>
        </Row>
      </div>
    </ShowModal>
  )
}

export default OutAPIModal
