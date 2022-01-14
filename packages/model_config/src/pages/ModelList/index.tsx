import { useEffect, useState, ReactNode, FC, useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { Table, Row, Col, Button, Tooltip, Popconfirm, Input, Space } from 'antd'
import { Link, useHistory } from 'react-router-dom'
import { modelListActions, modelEditActions } from '@redux/actions'
import tableStyle from './index.less'
import EditText from '@@/ModuleUtils/EditText'
import { MODEL_ELEMENT } from '@/common/elementName'
import { POST_REQUEST } from '@/services/postServices'
import { updateDBStatusType, updateDBKey } from './constant'
import { sortData } from '@/utils/sortData'
import { useAppSelector } from '@/redux'
import { CurrentTabType, PADDING_STYLE } from '@/common/constant'
import { SearchOutlined } from '@ant-design/icons'
import moment from 'moment'

const { Search } = Input
const { queryModel, delModel, createTable } = POST_REQUEST
/**
 * 模型列表
 * @param {*} props
 */

const ModelList: FC = () => {
  const dispatch = useDispatch()
  const { loading, list = [], pagination, retrieveCondition, updateLoading } = useAppSelector(state => state.modelList)
  const [selectedKeys, setSelectedKeys] = useState([])
  const history = useHistory()

  const { pageSize, current } = pagination

  const rowSelection: object = {
    selectedKeys,
    onChange: (selectedRowKeys: []) => setSelectedKeys(selectedRowKeys)
  }
  const paginations: any = {
    ...pagination,
    showQuickJumper: true,
    showSizeChanger: true,
    pageSizeOptions: [10, 20, 25, 50, 100]
  }

  // 编辑模型
  const editModelOnClick = useCallback((recordId) => {
    dispatch(modelEditActions.setCurrentTab({ currentTab: CurrentTabType.BASE }))
    history.push(`/model/edit/${recordId}`)
  }, [dispatch, history])

  const columns: object[] = [
    {
      title: '操作',
      width: 140,
      align: 'center',
      ellipsis: true,
      key: 'operation',
      render: (val: string, record: any, index: number) => (
        <EditText
          editClick={() => editModelOnClick(record.id)}
          deleteClick={() => dispatch(delModel({ model: { id: record.id, version: record.version } }))}
          editElementName={`${MODEL_ELEMENT.EDIT}_${record.id}`}
          deleteElementName={`${MODEL_ELEMENT.DELETE}_${record.id}`}
          other={<Button style={{ padding: 0 }} type='link' onClick={() => {
            const url = `/crv_model_config/#/model/edit/${record.id}`;
            // 开发环境且只打开本工程，则用浏览器的tab页打开
            if (process.env.NODE_ENV === 'development' && top === window) {
              return window.open(url);
            }
            // 默认在main_frame工程以tab页的形式用iframe打开
            top?.Mainframe?.openAsMenuApi({
              /**

               main_frame中区分不同tab菜单的key键是 【pathKey = `/${name}/${path.split('#)[0]}`;】。
               而model_config和model_view采用的hash路由，#前面部分都一样，没法区分。故此处暂时设置name属性来确保pathKey不冲突。
               此方案在此处能用，但不通用，不严谨，若想跳转的路径的详细信息在#后面，则可能无法唯一区分。
               后续尽量采用BrowserRouter来更完美地解决地问题
              */
              name: record.id,
              title: `模型配置:[${record.id}|${record.name ?? ''}]`,
              path: url,
              visibleType: false,
              onDestroy: () => {
              },
            });
          }} >tab打开</Button>}
        />
      )
    },
    {
      dataIndex: 'id',
      key: 'id',
      width: '15%',
      title: '数据库表名',
      ellipsis: true,
    },
    {
      dataIndex: 'name',
      width: '20%',
      title: '名称',
      key: 'name',
      ellipsis: true,
    },
    {
      dataIndex: 'type',
      key: 'type',
      width: '10%',
      title: '类型',
      ellipsis: true,
      render: (text: string) => text === 'ENTITY' ? '实体' : null
    },
    {
      dataIndex: 'module',
      width: '10%',
      key: 'module',
      ellipsis: true,
      title: '所属模块'
    },
    {
      dataIndex: 'updateDBStatus',
      key: 'updateDBStatus',
      width: '10%',
      title: '配置更新状态',
      ellipsis: true,
      render: (text: string | number, record: any) => {
        switch (text) {
          case updateDBKey.ONE:
            return updateDBStatusType[text]
          case updateDBKey.TWO:
            return <Tooltip title={record.updateDBMessage} placement='leftTop' overlayStyle={{ maxWidth: '50vw' }}>
              <span style={{ color: 'red' }}>{updateDBStatusType[text]}</span>
            </Tooltip>
          default:
            return updateDBStatusType[updateDBKey.ZERO]
        }
      }
    },
    {
      dataIndex: 'updateDBTime',
      key: 'updateDBTime',
      title: '配置更新时间',
      ellipsis: true,
      render: (text: any) => text ? moment(text).format('YYYY-MM-DD HH:mm:ss') : ''
    }
  ]

  useEffect(() => {
    if (loading && !updateLoading) {
      dispatch(queryModel({ pagination: { page: current, pageSize: pageSize }, filter: { retrieveCondition: retrieveCondition } }))
    }
  }, [loading, dispatch, current, pageSize, retrieveCondition, updateLoading])

  // 分页、排序、筛选变化时触发
  const onTableChange = useCallback((pagination: object) => {
    dispatch(modelListActions.setPagination({ pagination: pagination }))
  }, [dispatch])

  // 检索回调
  const onSearch: any = useCallback((val: string) => {
    dispatch(modelListActions.setRetrieveCondition({ retrieveCondition: val }))
  }, [dispatch])

  const updateAllOnClick = useCallback(() => {
    dispatch(createTable({ initialAll: true }))
  }, [dispatch])

  const updateSelectOnclick = useCallback(() => {
    dispatch(createTable({ modelIds: selectedKeys, initialAll: false }))
  }, [dispatch, selectedKeys])

  const footerComponent: ReactNode = (
    <Row>
      <Col span={12}>
        <span>{`总条数：${paginations.total ?? 0}`}</span>
      </Col>
    </Row>
  )

  const enterButton: ReactNode = <Button type='primary' id='SEARCH_BUTTON' key='SEARCH_BUTTON'>
    <SearchOutlined id='SEARCH_COIN' key='SEARCH_COIN' />
  </Button>

  return (
    <Row style={PADDING_STYLE} >
      <Col span={12}>
        <Search
          key='SEARCH_INPUT'
          id='SEARCH_INPUT'
          placeholder='输入检索关键字'
          defaultValue={retrieveCondition}
          // value={searchValue}
          // onChange={e => searchOnChange(e.target.value)}
          allowClear
          autoComplete='off'// 清除先前的记忆代码
          enterButton={enterButton}
          onSearch={onSearch}
        />
      </Col>
      <Col span={12} style={{ textAlign: 'right' }} >
        <Space key='spaceList'>
          <Popconfirm onConfirm={updateAllOnClick} title='确认更新全部表？'>
            <Button loading={updateLoading} id={MODEL_ELEMENT.UPDATE_ALL} key={MODEL_ELEMENT.UPDATE_ALL} type='primary'>更新全部表</Button>
          </Popconfirm >
          <Popconfirm onConfirm={updateSelectOnclick} title='确认更新所选表？' disabled={selectedKeys.length === 0}>
            <Button loading={updateLoading} id={MODEL_ELEMENT.UPDATE_SELECT} key={MODEL_ELEMENT.UPDATE_SELECT} type='primary' disabled={selectedKeys.length === 0}>更新所选表</Button>
          </Popconfirm>
          <Link to='/model/create'><Button type='primary' key={MODEL_ELEMENT.CREATE} id={MODEL_ELEMENT.CREATE}>新建</Button></Link>
        </Space>
      </Col>
      <Col span={24} style={{ marginTop: 20 }}>
        <Table
          className={tableStyle.table}
          id='modelList'
          key='modelListTable'
          size='small'
          loading={loading}
          bordered
          rowKey='id'
          columns={columns}
          dataSource={sortData(list)}
          pagination={paginations}
          onChange={onTableChange}
          rowSelection={rowSelection}
          footer={() => footerComponent}
          scroll={{ y: 'xxx' }}
        />
      </Col>
    </Row>
  )
}

export default ModelList
