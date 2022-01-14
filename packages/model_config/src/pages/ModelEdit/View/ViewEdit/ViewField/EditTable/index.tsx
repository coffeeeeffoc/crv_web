import { useState, useEffect, useMemo, useCallback } from 'react'
import { Tooltip } from 'antd'
import { useDispatch } from 'react-redux'
import setEditControl from './setEditControl'
import { viewActions } from '@/redux/actions'
import { AlignEnglish, AlignChinese, TableShowName } from './constant'
import { EditTableType, EditTableDataSourceType, viewFieldsType, fieldsType } from '../interfaceViewField'
import { useAppSelector } from '@/redux'
import { associateFieldType } from '@/common/constant'
import { POST_REQUEST } from '@/services/postServices'
import EditTable from '@@/TableUnit/EditTable'

const { refModelField: fieldRequest } = POST_REQUEST
export const EditableTable = ({ tableValue }: EditTableType) => {
  const { viewData: { viewFields = [] } } = useAppSelector(state => state.view)
  const { baseInfo: { fields = [] } } = useAppSelector(state => state.modelEdit)
  const { refModelField: { list: fieldItems } } = useAppSelector(state => state.field)
  // 关联表字段
  const refFieldItems = useMemo(() => fieldItems.filter(({ fieldType }) => !associateFieldType.includes(fieldType)).map((item: fieldsType) => {
    return {
      value: item.id,
      type: 'FIELD',
      description: item.fieldStatement ? `说明：${item.fieldStatement}` : `${item.name}(${item.id})`,
      name: item.name
    }
  }), [fieldItems])
  // fieldItem
  const fieldItem = useMemo(() => fields.filter(({ fieldType }) => !associateFieldType.includes(fieldType)).map((item) => ({
    value: item.id,
    type: 'FIELD',
    description: item.fieldStatement ? `说明：${item.fieldStatement}` : `${item.name}(${item.id})`,
    name: item.name
  })), [fields])
  const dispatch = useDispatch()
  const [dataSource, setDataSource] = useState([] as EditTableDataSourceType[])

  useEffect(() => {
    if (tableValue === '') {
      setDataSource([])
    } else {
      const currentField: any = fields[fields.findIndex(item => item.id === tableValue)]
      const index = viewFields.findIndex(item => item.id === tableValue)
      if (index > -1) {
        // 关联字段的处理
        if (associateFieldType.includes(currentField.fieldType)) {
          dispatch(fieldRequest({ modelId: currentField.refModel, baseInfo: false, fields: [] }))
          setDataSource([
            { key: 'content', attribute: TableShowName.CONTENT, value: viewFields[index].content },
            { key: 'contentFormat', attribute: TableShowName.CONTENT_FORMAT, value: viewFields[index].contentFormat },
            { key: 'columnWidth', attribute: TableShowName.COLUMN_WIDTH, value: viewFields[index].columnWidth },
            { key: 'showName', attribute: TableShowName.SHOW_NAME, value: viewFields[index].showName },
            { key: 'headerAlign', attribute: TableShowName.HEADER_ALIGN, value: viewFields[index].headerAlign },
            { key: 'contentAlign', attribute: TableShowName.CONTENT_ALIGN, value: viewFields[index].contentAlign }
          ])
        } else {
          // 非关联字段的处理
          setDataSource([
            { key: 'summary', attribute: TableShowName.SUMMARY, value: viewFields[index].summary },
            { key: 'summaryFormat', attribute: TableShowName.SUMMARY_FORMAT, value: viewFields[index].summaryFormat },
            { key: 'columnWidth', attribute: TableShowName.COLUMN_WIDTH, value: viewFields[index].columnWidth },
            { key: 'showName', attribute: TableShowName.SHOW_NAME, value: viewFields[index].showName },
            { key: 'headerAlign', attribute: TableShowName.HEADER_ALIGN, value: viewFields[index].headerAlign },
            { key: 'contentAlign', attribute: TableShowName.CONTENT_ALIGN, value: viewFields[index].contentAlign }
          ])
        }
      } else {
        setDataSource([])
      }
    }
  }, [viewFields, tableValue, fields, dispatch])

  const editControl = useMemo(() => setEditControl({ fieldItem: fieldItem, refFieldItems: refFieldItems }), [fieldItem, refFieldItems])
  const column = [
    {
      dataIndex: 'attribute',
      title: '当前选中列属性',
      width: '35%',
      ellipsis: true,
    },
    {
      dataIndex: 'value',
      title: '值',
      editable: true,
      ellipsis: true,
      render: (text: AlignEnglish, record: EditTableDataSourceType, index: number) => {
        if (index > 3) {
          return AlignChinese[text]
        }
        if (index < 2) {
          return <Tooltip placement="topLeft" title={text}>{text}</Tooltip>
        } else {
          return text
        }
      }
    }
  ]

  const handleSave = useCallback((row: EditTableDataSourceType) => {
    const { key: type, value } = row
    const newData = [...dataSource]
    const index = newData.findIndex((item) => row.key === item.key)
    const item = newData[index]
    newData.splice(index, 1, { ...item, ...row })
    setDataSource(newData)
    const updateViewFields: any[] = JSON.parse(JSON.stringify(viewFields))
    const fieldIndex: number = viewFields.findIndex((item: viewFieldsType) => item.id === tableValue)
    if (fieldIndex !== -1) updateViewFields[fieldIndex][type] = value
    dispatch(viewActions.setViewData({ viewFields: updateViewFields }))
  }, [dispatch, viewFields, dataSource, tableValue])
  return (
    <div>
      <EditTable
        editControl={editControl}
        bordered
        rowKey='attribute'
        dataSource={dataSource}
        columns={column}
        pagination={false}
        handleSave={handleSave}
      />
    </div>
  )
}
export default EditableTable
