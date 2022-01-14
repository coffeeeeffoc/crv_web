import { FC, ReactNode, useCallback, useEffect, useState, useMemo } from 'react'
import { ColumnsType, ConfigureType } from '../interface'
import EditTable from '@@/TableUnit/EditTable'
import { PlusOutlined, MinusOutlined } from '@ant-design/icons'
import update from 'immutability-helper'
import setEditControl from './setEditControl'

interface ConfigurePropsType {
  value?: ConfigureType[] | undefined
  // onChange?: (value: ConfigureType[]) => void
  [propsName: string]: any
}

const ConfigureTable: FC<ConfigurePropsType> = ({
  value = [],
  onChange
}) => {
  const [dataSource, setDataSource] = useState<ConfigureType[]>(value)
  const editControl = useMemo(() => setEditControl(), [])
  useEffect(() => {
    setDataSource(value)
    console.log('setDataSource')
  }, [value, setDataSource])
  // Add option configuration
  const addOperate = useCallback(() => {
    onChange(update(dataSource, {
      $push: [
        {
          value: '',
          name: ''
        }
      ]
    }))
  }, [dataSource, onChange])

  // delete option configuration
  const deleteOperate = useCallback((index: number) => {
    onChange(update(dataSource, { $splice: [[index, 1]] }))
    // setDataSource(update(dataSource, { $splice: [[index, 1]] }))
  }, [dataSource, onChange])

  // save option configuration after edit
  const handleSave = useCallback((record: ConfigureType) => {
    const index = record._rowIndex ?? -1
    const updateData = record
    // delete _rowIndex from record
    delete updateData._rowIndex
    onChange(update(dataSource, {
      $splice: [
        [index, 1, { ...dataSource[index], ...updateData }]
      ]
    }))
  }, [dataSource, onChange])

  const OperateControl: ReactNode = <PlusOutlined style={{ fontSize: '20px' }} onClick={addOperate} />
  const columns: ColumnsType[] = [
    {
      title: '值',
      dataIndex: 'value',
      key: 'value',
      editable: true,
      width: '25%',
      align: 'center'
    },
    {
      title: '显示文字',
      dataIndex: 'name',
      key: 'name',
      editable: true,
      align: 'center'
    },
    {
      title: OperateControl,
      dataIndex: 'operate',
      key: 'operate',
      render: (text: any, record: ConfigureType, index: number) => <MinusOutlined style={{ fontSize: '20px' }} onClick={() => deleteOperate(index)} />,
      width: 100,
      align: 'center'
    }
  ]

  return (
    <EditTable
      editControl={editControl}
      dataSource={dataSource}
      columns={columns}
      pagination={false}
      handleSave={handleSave}
      scroll={{ y: '200px' }}
    />
  )
}

export default ConfigureTable
