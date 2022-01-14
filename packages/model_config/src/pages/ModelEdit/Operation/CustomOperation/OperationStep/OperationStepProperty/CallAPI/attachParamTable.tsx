import React, { useContext, useState, useEffect, useRef, useMemo } from 'react'
import classNames from 'classnames'
import { Table, Input, Form, Select, InputNumber } from 'antd'
import DeleteModule from '@@/ModuleUtils/DeleteModule'
import { PlusSquareOutlined, CloseCircleOutlined } from '@ant-design/icons'
import DatePicker from './OwnDatePicker'
import { useSelector } from 'react-redux'
import styles from './index.less'
import { FormInstance } from 'antd/lib/form'
import { DefaultField } from '@/common/constant'

interface EditableRowProps {
  index: number
}

interface Item {
  key: number
  num: string
  fields: string
}

const EditableContext = React.createContext<FormInstance<any> | null>(null)
const { Option } = Select
const EditableRow: React.FC<EditableRowProps> = ({ index, ...props }) => {
  const [form] = Form.useForm()
  return (
    <Form form={form} component={false} initialValues={{}}>
      <EditableContext.Provider value={form}>
        <tr {...props} />
      </EditableContext.Provider>
    </Form>
  )
}

interface EditableCellProps {
  title: React.ReactNode
  editable: boolean
  children: React.ReactNode
  dataIndex: keyof Item
  record: Item
  handleSave: (record: Item) => void
  dataSource: any[]
}

const EditableCell = ({
  title,
  editable,
  children,
  dataIndex,
  record,
  handleSave,
  dataSource,
  ...restProps
}: EditableCellProps) => {
  const [editing, setEditing] = useState(false)
  const inputRef: any = useRef(null)
  const form: any = useContext(EditableContext)

  const { baseInfo: { fields = [] } } = useSelector((state: any) => state.modelEdit)
  const fieldShow = useMemo(() => [...fields], [fields])
  useEffect(() => {
    DefaultField.forEach(
      item => {
        const index = fieldShow.findIndex(field => field.id === item)
        if (index !== -1) {
          fieldShow.splice(index, 1)
        }
      }
    )
  }, [fieldShow])
  useEffect(() => {
    if (editing) {
      inputRef?.current?.focus()
    }
  }, [editing])

  const toggleEdit = () => {
    setEditing(!editing)
    form.setFieldsValue({
      [dataIndex]: record[dataIndex],
    })
  }

  const save = async () => {
    try {
      const values = await form.validateFields()
      toggleEdit()
      handleSave({ ...record, ...values })
    } catch (errInfo) {
      console.log('Save failed:', errInfo)
    }
  }

  let childNode = children

  if (editable) {
    childNode = editing
      ? (
        <Form.Item
          style={{
            margin: 0,
          }}
          name={dataIndex}
          key={dataIndex}
        >
          {
            (() => {
              if (dataIndex === 'num') {
                const temp = fieldShow?.find(item => item.id === record?.fields)
                switch (temp?.fieldType) {
                  case 'TEXT':
                    return <Input ref={inputRef} onPressEnter={save} onBlur={save} />
                  case 'DATE':
                    return <DatePicker ref={inputRef} onPressEnter={save} onBlur={save} save={save} />
                  case 'CURRENCY':
                    return <InputNumber ref={inputRef} onPressEnter={save} onBlur={save} min='0' style={{ width: '100%', display: 'inline-flex' }} />
                  default:
                    return <Input ref={inputRef} onPressEnter={save} onBlur={save} />
                }
              }
              if (dataIndex === 'fields') {
                return <Select onBlur={save} ref={inputRef} showSearch placeholder='Select field' style={{ width: '100%' }}>
                  {
                    fieldShow.map(item => {
                      return <Option key={item.id} value={item.id}>{`${item.name}(${item.id})`}</Option>
                    })
                  }
                </Select>
              }
            })()
          }
        </Form.Item>
        )
      : (
        <div
          className='wholeCell'
          onClick={toggleEdit}
        >
          {children}
        </div>
        )
  }

  return (
    <td
      key={dataIndex}
      {...restProps}
      className={classNames({ editable }, { editing })}
    >
      {childNode}
    </td>
  )
}

const EditableTable = (props: any) => {
  const { value = {}, onChange } = props
  const { baseInfo: { fields = [] } } = useSelector((state: any) => state.modelEdit)

  const sourceParam = useMemo(() => {
    const updateValue: any = []
    Object.keys(value).forEach((item, index) => {
      updateValue.push({ key: index, fields: item, num: '0' })
    })
    Object.values(value).forEach((item, index) => {
      updateValue[index].num = item
    })
    return updateValue
  }, [value])

  const handleAdd = () => {
    const newData = {
      key: sourceParam.length,
      fields: '',
      num: '',
    }
    const baseValue = [...sourceParam, newData]
    const updateValue: any = {}
    baseValue.forEach(
      item => {
        updateValue[item.fields] = item.num
      }
    )
    onChange(updateValue)
  }

  const column = [
    {
      title: '字段',
      dataIndex: 'fields',
      width: '40%',
      editable: true,
      ellipsis: true,
      render: (text: string) => {
        const fieldIndex = fields.findIndex((item: { id: string, [propsName: string]: any }) => item.id === text)
        if (fieldIndex !== -1) return `${fields[fieldIndex].name}(${fields[fieldIndex].id})`
        return text
      }
    },
    {
      title: '值',
      dataIndex: 'num',
      editable: true,
      width: '50%',
    },
    {
      title: <PlusSquareOutlined style={{ fontSize: '25px' }} onClick={handleAdd} />,
      dataIndex: 'operation',
      align: 'center',
      render: (_: string, record: Item) =>
        sourceParam.length >= 1
          ? (
            <DeleteModule onConfirm={() => handleDelete(record.key)}>
              <CloseCircleOutlined />
            </DeleteModule>
            )
          : null,
    }
  ]

  const handleDelete = (key: React.Key) => {
    const dataSource = [...sourceParam]
    const arrTemp = dataSource.filter((item: Item) => item.key !== key)
    const updateValue: any = {}
    arrTemp.forEach(
      (item: Item) => {
        updateValue[item.fields] = item.num
      }
    )
    onChange(updateValue)
  }

  const handleSave = (row: Item) => {
    const newData: any = [...sourceParam]
    const index = newData.findIndex((item: Item) => row.key === item.key)
    const item = newData[index]
    newData.splice(index, 1, { ...item, ...row })

    // const baseValue = newData
    const updateValue: any = {}
    newData.forEach(
      (item: Item) => {
        updateValue[item.fields] = item.num
      }
    )
    // setSourceParam(newData)
    onChange(updateValue)
  }
  const components = {
    body: {
      row: EditableRow,
      cell: EditableCell,
    },
  }

  const columns: any = column.map((col) => {
    if (!col.editable) {
      return col
    }

    return {
      ...col,
      // dataSource: sourceParam,
      onCell: (record: Item) => ({
        record,
        editable: col.editable,
        dataIndex: col.dataIndex,
        title: col.title,
        handleSave: handleSave,
        dataSource: sourceParam
      }),
    }
  })
  return (
    <Table
      components={components}
      className={styles.table}
      bordered
      dataSource={sourceParam}
      pagination={false}
      columns={columns}
      scroll={{ y: 'xxx' }}
    />
  )
}

export default EditableTable
