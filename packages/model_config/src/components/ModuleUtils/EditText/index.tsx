import { Button, Space } from 'antd'
import { FC, useEffect, useState } from 'react'
import DeleteModule from '../DeleteModule'
import { DefaultField } from '@/common/constant'

interface propsType {
  editClick: (record: any) => void
  deleteClick: (record: any) => void
  editElementName: string
  deleteElementName: string
  other?: React.ReactNode
  record?: any
}

const EditText: FC<propsType> = ({
  editClick,
  deleteClick,
  editElementName,
  deleteElementName,
  other,
  record = {}
}) => {
  const [showDelete, setShowDelete] = useState(DefaultField.includes(record.id))

  useEffect(() => {
    setShowDelete(DefaultField.includes(record.id) || record.id?.[0] === '_')
  }, [record.id])

  return (
    <Space style={{ margin: '-4px' }}>
      <Button
        style={{ padding: 0 }}
        type='link'
        onClick={editClick}
        id={editElementName}
      >编辑</Button>
      {
        showDelete
          ? <Button
            style={{ padding: 0 }}
            disabled={showDelete}
            type='link'
            id={deleteElementName}
          >删除</Button>
          : <DeleteModule onConfirm={deleteClick} style={{ display: !showDelete ? 'none' : '' }}>
            <Button
              style={{ padding: 0 }}
              disabled={showDelete}
              type='link'
              id={deleteElementName}
            >删除</Button>
          </DeleteModule>
      }
      {other}
    </Space>
  )
}

export default EditText
