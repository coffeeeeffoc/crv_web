import { FC, useCallback, ReactNode, useMemo, useState, useEffect } from 'react'
import EditTable from '@@/TableUnit/EditTable'
import { PlusOutlined, MinusOutlined } from '@ant-design/icons'
import update from 'immutability-helper'
import setEditControl from './setEditControl'
import { deepCopy } from '@utils/utilFunc/utilTransform'
import { ConditionType } from '../interface'
import { useAppSelector } from '@/redux'
import { operationType, paramType, EnumParamType, globalType } from '../ConditionValue'
import { FieldType } from '@/common/constant'
import style from './index.less'

interface ConditionTableType {
  [propsName: string]: any
}
const ConditionTable: FC<ConditionTableType> = ({
  value,
  onChange,
  viewDataFilter,
  onFinish
}) => {
  const [tableValue, setTableValue] = useState<any[]>([])
  const { baseInfo: { fields = [] } } = useAppSelector(state => state.modelEdit)
  useEffect(() => {
    setTableValue(value ?? [])
  }, [value])
  // get editControl
  const editControl = useMemo(() => setEditControl({ fields: fields }), [fields])
  // add condition arr
  const addOperate = useCallback(() => {
    onChange(update(tableValue, {
      $push: [
        {
          id: tableValue.length + 1,
          field: null,
          operator: null,
          valueType: null,
          value: undefined
        }
      ]
    }))
    onFinish()
  }, [tableValue, onChange, onFinish])
  const OperateControl: ReactNode = useMemo(() => <PlusOutlined style={{ fontSize: '20px' }} onClick={addOperate} />, [addOperate])

  // delete condition
  const deleteOperate = useCallback(async (index: number) => {
    const updateTableValue = deepCopy(value, [])
    updateTableValue.splice(index, 1)
    onChange(updateTableValue.map((list: ConditionType, index: number) => ({
      ...list,
      id: index + 1
    })))
    onFinish()
  }, [value, onChange, onFinish])

  // change condition
  const handleSave = useCallback((record: any) => {
    const index = record._rowIndex ?? -1
    const updateData = record
    // delete _rowIndex from record
    delete updateData._rowIndex
    // while field, operator and valueType change, the value will be emptied
    const { field, operator, valueType } = tableValue[index] ?? {}
    const valueChange: any = {}
    if (field !== updateData.field || operator !== updateData.operator || valueType !== updateData.valueType) {
      valueChange.value = undefined
    }
    onChange(update(tableValue, {
      $splice: [
        [index, 1, { ...tableValue[index], ...updateData, ...valueChange }]
      ]
    }))
    onFinish()
  }, [onChange, tableValue, onFinish])

  const columns = useMemo(() => [
    {
      dataIndex: 'id',
      key: 'id',
      title: '序号',
      width: 50
    },
    {
      dataIndex: 'field',
      key: 'field',
      title: '列',
      editable: true,
      ellipsis: true,
      render: (text: string) => {
        const fieldInfo = fields.filter(({ id }: any) => id === text)?.[0]
        if (fieldInfo) {
          return `${fieldInfo.name}(${fieldInfo.id})`
        }
      }
    },
    {
      dataIndex: 'operator',
      key: 'operator',
      title: '操作',
      editable: true,
      ellipsis: true,
      render: (text: string) => operationType.filter(({ value }) => value === text)?.[0]?.text
    },
    {
      dataIndex: 'valueType',
      key: 'valueType',
      title: '值类型',
      editable: true,
      ellipsis: true,
      render: (text: string) => paramType.filter(({ value }) => value === text)?.[0]?.text
    },
    {
      dataIndex: 'value',
      ellipsis: true,
      key: 'value',
      title: '值',
      editable: true,
      render: (text: string, record: any) => {
        switch (record.valueType) {
          case EnumParamType.VALUE:
          {
            const fieldInfo = fields.filter(({ id }) => id === record.field)?.[0] ?? {}
            const enumList: Array<{ value: string, name: string }> = fieldInfo.enumConfig?.enumList ?? []
            if (fieldInfo.fieldType === FieldType.ENUM && text !== '') {
              const textRender = text?.split?.(',')?.filter(item => item !== '')?.map(item => {
                const { name = '' } = enumList?.filter(({ value = '' }) => value === item)?.[0] ?? {}
                // return `${name}`
                return `${name ?? ''}(${item})`
              }).join(',')
              return textRender
              // return <span title={textRender}>{textRender}</span>
            }
            return text
          }
          case EnumParamType.FIELD:
          {
            const fieldInfo = fields.filter(({ id }: any) => id === text)?.[0]
            if (fieldInfo) {
              return `${fieldInfo.name}(${fieldInfo.id})`
            }
            return text
          }
          case EnumParamType.GLOBAL:
          {
            const globalInfo = globalType.filter(({ value }) => value === text)?.[0]
            if (globalInfo) {
              return globalInfo.text
            }
            return text
          }
          default:
            return text
        }
      }
    },
    {
      dataIndex: 'operate',
      title: OperateControl,
      key: 'operate',
      render: (text: any, record: any, index: number) => <MinusOutlined style={{ fontSize: '20px' }} onClick={async () => await deleteOperate(index)} />,
      width: 100,
      align: 'center'
    }
  ], [fields, OperateControl, deleteOperate])
  return (
    <EditTable
      className={style.conditionTable}
      dataSource={tableValue}
      editControl={editControl}
      columns={columns}
      pagination={false}
      handleSave={handleSave}
      scroll={{ y: 'xxx' }}
      border
    />
  )
}

export default ConditionTable
