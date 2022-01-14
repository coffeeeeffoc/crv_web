import { FC, useCallback, useEffect, useMemo, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { Button, Checkbox, Popconfirm } from 'antd'
import { sortData } from '@/utils/sortData'
import TableListShow from '@/components/TableListShow'
import { POST_REQUEST } from '@/services/postServices'
import { fieldActions, modelEditActions } from '@/redux/actions'
import { FIELD_ELEMENT } from '@/common/elementName'
import EditText from '@@/ModuleUtils/EditText'
import { CurrentTabType, DefaultField, FieldType, ShowType } from '@/common/constant'
// import { TabPropsType } from '@/interfaces/Common'
import { DisplayField } from './fieldTypes/constants'
import { useAppSelector } from '@/redux'

interface recordType {
  id: string
  [propsName: string]: any
}

interface TabPropsType {
  modelId: string | number
  [propsName: string]: any
}

const { delField, createTable } = POST_REQUEST

const Field: FC<TabPropsType> = (props) => {
  const { modelId } = props
  const dispatch = useDispatch()
  const history = useHistory()
  useEffect(() => {
    dispatch(modelEditActions.setCurrentTab({ currentTab: CurrentTabType.FIELD }))
  }, [dispatch])

  const { baseInfo } = useAppSelector((state: any) => state.modelEdit)
  const { updateLoading } = useAppSelector(state => state.modelList)
  const { isDefaultFieldShow } = useAppSelector(state => state.field)
  const fields = useMemo(() => baseInfo.fields ?? [], [baseInfo.fields])
  const [selectedRowKeys, setSelectedRowKeys] = useState([])

  // add fieldTypeEscape,module for onSearch
  const dataSource = useMemo(() => fields.map((field: recordType) => ({
    ...field,
    fieldTypeEscape: DisplayField[field.fieldType],
    module: baseInfo.module,
    modelType: field.fieldType === FieldType.FORMULA ? '非实体' : '实体'
    // when isDefaultShowShow is false, filter six defaultField and the id initials is '_'(automatically generated oneToMany field)
  })
  ).filter((item: any) => isDefaultFieldShow ? item.id : !DefaultField.includes(item.id) && item.id[0] !== '_'
  ), [fields, baseInfo.module, isDefaultFieldShow])

  const checkedOnChange = useCallback((e) => {
    dispatch(fieldActions.setDefaultFieldShow({ isDefaultFieldShow: e.target.checked }))
  }, [dispatch])

  const rowSelection = {
    selectedRowKeys,
    onChange: (selectedRowKeys: []) => setSelectedRowKeys(selectedRowKeys)
  }
  const authOnClick = useCallback(() => {
    dispatch(createTable({ modelIds: [modelId], initialAll: false }))
  }, [modelId, dispatch])
  const update2Db = () => {
    window.confirm('该功能待做')
  }

  const buttonType = [
    <Checkbox style={{ height: '24px', textOverflow: 'ellipsis', textAlign: 'center', width: 'max-content' }} checked={isDefaultFieldShow} key='isDefaultFieldShow' onChange={checkedOnChange}>显示默认字段</Checkbox>,
    // <Checkbox style={{ height: '32px', textOverflow: 'ellipsis' }} checked={isDefaultFieldShow} key='isDefaultFieldShow' onChange={checkedOnChange}>显示默认字段</Checkbox>,
    <Popconfirm key='popconfirm' onConfirm={authOnClick} title='确认更新当前表？'>
      <Button
        loading={updateLoading}
        type='primary'
        id={FIELD_ELEMENT.UPDATE_DATA}
        key={FIELD_ELEMENT.UPDATE_DATA}
      >更新数据库</Button>
    </Popconfirm>,
    <Button
      key='auth' type='primary' id={FIELD_ELEMENT.AUTH} onClick={update2Db}
    >权限</Button>,
    <Button
      key='new' type='primary'
      onClick={() => {
        dispatch(fieldActions.setFieldState({ show: ShowType.SELECT }))
        history.push(`/model/edit/${modelId}/field`)
      }} id={FIELD_ELEMENT.CREATE}>新增</Button>
  ]

  // delete field operate
  const handleDelete = useCallback((record: recordType) => {
    dispatch(modelEditActions.setCurrentTab({ currentTab: CurrentTabType.FIELD }))
    dispatch(delField({
      model: {
        id: modelId,
        fields: [{ id: record.id, version: record.version }]
      }
    }))
  }, [modelId, dispatch])

  const columns = [
    {
      title: '操作',
      width: 100,
      align: 'center',
      render: (val: string, record: recordType, index: number) => (
        <EditText
          record={record}
          editClick={() => {
            dispatch(fieldActions.setFieldState({ editData: record, show: ShowType.EDIT }))
            // window.location.href = `#/model/edit/${modelId}/field`
            history.push(`/model/edit/${modelId}/field`)
          }}
          deleteClick={() => handleDelete(record)}
          editElementName={`${FIELD_ELEMENT.EDIT}_${record.id}`}
          deleteElementName={`${FIELD_ELEMENT.DELETE}_${record.id}`} />
      )
    },
    {
      dataIndex: 'id',
      title: '字段名称',
      ellipsis: true,
    },
    {
      dataIndex: 'name',
      title: '名称',
      ellipsis: true,
    },
    {
      dataIndex: 'module',
      title: '模型',
      ellipsis: true,
    },
    {
      dataIndex: 'fieldTypeEscape',
      title: '字段类型',
      ellipsis: true,
    },
    {
      dataIndex: 'length',
      title: '长度',
      ellipsis: true
    },
    {
      dataIndex: 'modelType',
      title: '类型',
      ellipsis: true
    }
  ]

  return (
    <TableListShow
      buttonType={buttonType}
      columns={columns}
      dataSource={sortData(dataSource)}
      rowSelection={rowSelection}
      filterCondition={['id', 'name', 'fieldTypeEscape', 'module', 'length', 'modelType']}
      tabType='field'
    />
  )
}

export default Field
