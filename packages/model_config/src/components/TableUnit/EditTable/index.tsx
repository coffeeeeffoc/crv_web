import React, { FC, useContext, useState, useEffect, useRef, useCallback } from 'react'
import { Table, Form, Input } from 'antd'
import style from './index.less'
import classNames from 'classnames'
import GrooveTable from '../GrooveTable'
import { FormInstance } from 'antd/lib/form'
import { ergodicDataSource } from '../hook'

const DefaultInput = Input

const EditableContext = React.createContext<FormInstance<any> | null>(null)

interface EditableRowProps {
  index: number
}

const EditableRow: FC<EditableRowProps> = ({ index, ...props }) => {
  const [form] = Form.useForm()
  return (
    <Form form={form} component={false}>
      <EditableContext.Provider value={form}>
        <tr {...props} />
      </EditableContext.Provider>
    </Form>
  )
}

interface EditableCellProps {
  title: React.ReactNode
  editable: boolean
  children: any
  // children: React.ReactNode
  dataIndex: any
  record: any
  editControl: any
  focusTrig: boolean
  // editControl: React.ReactNode
  handleSave: (record: any) => void
}

const EditableCell: React.FC<EditableCellProps> = ({
  title,
  editable,
  children,
  dataIndex,
  record,
  editControl: EditControl = DefaultInput,
  focusTrig,
  handleSave,
  ...restProps
}) => {
  const [editing, setEditing] = useState(false)
  const inputRef = useRef<Input>(null)
  // TODO: 如何？
  const form: any = useContext(EditableContext)

  useEffect(() => {
    if (editing) {
      inputRef.current?.focus?.()
    }
  }, [editing])

  const titleShow = useCallback((val: any) => {
    let titleRender = ''
    try {
      titleRender = String(val).slice(1)
    } catch (err) {
      console.log(err)
    }
    return titleRender
  }, [])

  const toggleEdit = useCallback(() => {
    setEditing(!editing)
  }, [editing])

  console.log('editing', editing)
  const onClickEdit = useCallback((e) => {
    toggleEdit()
    form.setFieldsValue({
      [dataIndex]: record[dataIndex],
    })
  }, [form, toggleEdit, dataIndex, record])

  const save = useCallback(async () => {
    try {
      // getFieldsValue参数为true时返回所有字段值，参数为空时默认返回现存字段值（编辑状态时，只有当前正在编辑的字段为现存字段）
      // 不知道为啥，await form.getFieldsValue(true)这句话第一次执行获取的值不准确，后续执行获取的值更准确
      // await form.getFieldsValue(true)
      // const values = await form.getFieldsValue(true)
      const values = await form.validateFields()
      toggleEdit()
      handleSave?.({
        ...record,
        ...values,
      })
    } catch (errInfo) {
      console.log('Save failed:', errInfo)
    }
  }, [form, toggleEdit, handleSave, record])

  let childNode = children
  if (focusTrig) {
    childNode = <Form.Item
      style={{ margin: 0 }}
      name={dataIndex}
    >
      <EditControl dataIndex={dataIndex} record={record} onPressEnter={save} onBlur={save} form={form} className='wholeCell' />
    </Form.Item>
  } else {
    if (editable) {
      childNode = editing
        ? (
          <Form.Item
            style={{ margin: 0 }}
            name={dataIndex}
          >
            <EditControl dataIndex={dataIndex} record={record} ref={inputRef} onPressEnter={save} onBlur={save} form={form} className='wholeCell' />
          </Form.Item>
          )
        : (
          <div className='wholeCell' onClick={onClickEdit} title={titleShow(children)}>
            {children}
          </div>
          )
    }
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

type EditableTableProps = Parameters<typeof Table>[0]
type ColumnTypes = Exclude<EditableTableProps['columns'], undefined>

interface EditTablePropsType {
  dataSource: Array<{}>
  columns: any[]
  className?: string
  focusTrig?: boolean
  handleSave?: (value: any) => void
  [propsName: string]: any
}

const EditTable: FC<EditTablePropsType> = ({
  dataSource,
  columns,
  className,
  handleSave = () => { },
  editControl,
  // focusTrig = true,
  focusTrig = false,
  ...restProps
}) => {
  const components = {
    body: {
      row: EditableRow,
      cell: EditableCell
    }
  }
  const cols = columns.map(col => {
    if (!col.editable) {
      return col
    }
    return {
      ...col,
      onCell: (record: any) => ({
        record,
        editable: col.editable,
        dataIndex: col.dataIndex,
        title: col.title,
        handleSave: handleSave,
        editControl: editControl,
        focusTrig: focusTrig
      }),
    }
  })
  return (
    <GrooveTable
      {...restProps}
      dataSource={ergodicDataSource(dataSource)}
      columns={cols as ColumnTypes}
      className={classNames(style.table, className)}
      components={components}
      bordered
      rowKey='_rowIndex'
    />
  )
}

export default EditTable
