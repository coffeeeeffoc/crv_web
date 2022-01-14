import { FC, ReactNode, useCallback, useEffect, useState, useMemo } from 'react'
import HeadModule from '@@/ModuleUtils/HeadModule'
import { Row, Col, Button, Input, Space } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { ShowType } from '@/common/constant'
import { RecordType, ColumnsType } from '../interface'
import style from './index.less'
import { SearchOutlined } from '@ant-design/icons'
import { fieldActions } from '@redux/actions'
import { POST_REQUEST } from '@/services/postServices'
import GrooveTable from '@@/TableUnit/GrooveTable'
import { sortData } from '@/utils/sortData'

const { retrieveOptions } = POST_REQUEST

const { Search } = Input

interface SelectTablePropsType {
  setVisible: (value: boolean) => void
  setTitle: (value: ReactNode) => void
  setEditData: (value: {}) => void
  [propsName: string]: any
}

const SelectTable: FC<SelectTablePropsType> = ({
  value,
  onChange,
  setVisible,
  setTitle,
  setEditData,
}) => {
  const dispatch = useDispatch()
  const { enumOption: { list = [], loading } } = useSelector((state: any) => state.field)
  const [rowSelected, setRowSelected] = useState<RecordType[]>([value])
  const [rowSelectedKey, setRowSelectedKey] = useState<React.Key[]>([])
  const [searchValue, setSearchValue] = useState<string>('')
  const sure = useCallback(() => {
    onChange(rowSelected[0])
    setVisible(false)
  }, [setVisible, rowSelected, onChange])

  console.log('enumOption', list, value, rowSelectedKey)
  useEffect(() => {
    setRowSelected([value])
    setRowSelectedKey([value?.id])
  }, [value])

  const back = useCallback(() => {
    setVisible(false)
  }, [setVisible])

  const buttonTypeTitle: ReactNode[] = useMemo(() => [
    <Button type='primary' size='small' key='SELECT_SURE' id='SELECT_SURE' onClick={sure}>确定</Button>,
    <Button type='primary' size='small' key='SELECT_BACK' id='SELECT_BACK' onClick={back}>返回</Button>
  ], [sure, back])

  const onSearch = useCallback((val: string) => {
    setSearchValue(val)
  }, [setSearchValue])

  // request, get list
  useEffect(() => {
    // if (show === ShowType.SELECT) {
    dispatch(retrieveOptions({ filter: { retrieveCondition: searchValue } }))
    // }
  }, [dispatch, searchValue])

  useEffect(() => {
    setTitle(<HeadModule textLeft='选项配置-选择' buttonType={buttonTypeTitle}/>)
  }, [setTitle, buttonTypeTitle])

  // create enumList
  const createOnClick = useCallback(() => {
    console.log('create')
    dispatch(fieldActions.setEnumState({ show: ShowType.CREATE }))
  }, [dispatch])

  interface EditTextProps {
    editClick: (value: any) => void
    editElementName: string
  }

  const EditText: FC<EditTextProps> = ({
    editClick,
    editElementName
  }) => {
    return (
      <Space style={{ margin: '-4px' }}>
        <Button
          style={{ padding: 0 }}
          type='link'
          onClick={editClick}
          id={editElementName}
        >编辑</Button>
      </Space>
    )
  }

  const EnterButton: ReactNode = <Button type='primary' size='small' id='SEARCH_BUTTON' key='SEARCH_BUTTON'>
    <SearchOutlined id='SEARCH_COIN'/>
  </Button>

  const editClick = useCallback((record: RecordType) => {
    setEditData(record)
    dispatch(fieldActions.setEnumState({ show: ShowType.EDIT }))
  }, [dispatch, setEditData])

  const rowSelection = useMemo(() => ({
    // defaultSelectedRowKeys: rowSelectedKey,
    selectedRowKeys: rowSelectedKey,
    onChange: (selectedRowKeys: React.Key[], selectedRows: RecordType[]) => {
      setRowSelectedKey(selectedRowKeys)
      setRowSelected(selectedRows)
    }
  }), [rowSelectedKey])

  const columns: ColumnsType[] = [
    {
      title: '操作',
      dataIndex: 'operate',
      key: 'operate',
      width: 100,
      align: 'center',
      render: (text: any, record: RecordType) => (
        <EditText
          editClick={e => editClick(record)}
          editElementName={`EDIT-${record.id}`}
        />
      )
    },
    {
      title: '名称',
      dataIndex: 'name',
      key: 'name',
      width: '30%',
      ellipsis: true
    },
    {
      title: '说明',
      dataIndex: 'statement',
      key: 'statement',
      ellipsis: true
    }
  ]

  return (
    <>
      <Row style={{ paddingLeft: '10px', paddingRight: '10px' }}>
        <Col span={12} style={{ marginBottom: '10px' }}>
          <Search
            className={style.search}
            size='small'
            key='SEARCH_INPUT'
            id='SEARCH_INPUT'
            placeholder='输入检索关键字'
            allowClear
            autoComplete='off'// 清除先前的记忆代码
            enterButton={EnterButton}
            onSearch={onSearch}
          />
        </Col>
        <Col span={12} style={{ textAlign: 'right' }}>
          <Space>
            <Button type='primary' size='small' onClick={createOnClick} key='CREATE' id='cREATE'>新建</Button>
          </Space>
        </Col>
        <Col span={24}>
          <GrooveTable
            className={style.table}
            loading={loading}
            dataSource={sortData(list)}
            columns={columns}
            bordered
            rowSelection={{
              type: 'radio',
              ...rowSelection
            }}

            pagination={{
              showQuickJumper: true,
              showSizeChanger: true,
              pageSizeOptions: [10, 20, 25, 50, 100]
            }}
            scroll={{ y: 'x' }}
            size='small'
            rowKey='id'
          />
        </Col>
      </Row>
    </>
  )
}

export default SelectTable
