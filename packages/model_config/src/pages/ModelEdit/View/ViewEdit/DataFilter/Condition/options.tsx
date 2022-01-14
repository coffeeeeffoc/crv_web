import { operationType, paramType, EnumParamType, globalType } from '../ConditionValue'
import { MinusOutlined } from '@ant-design/icons'
import { ReactNode } from 'react'
import { FieldType } from '@/common/constant'

const columnOptions = (
  fields: any[],
  OperateControl: ReactNode,
  deleteOperate: (index: number) => void
) => {
  return [
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
              const textRender = text?.split?.(',')?.map(item => {
                const { value, name } = enumList.filter(({ value }) => value === item)?.[0]
                return `${value}`
                // return `${name}(${value})`
              }).join(',')
              return textRender
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
            return `${globalInfo?.text ?? text}`
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
      render: (text: any, record: any, index: number) => <MinusOutlined style={{ fontSize: '20px' }} onClick={() => deleteOperate(index)} />,
      width: 100,
      align: 'center'
    }
  ]
}

export default columnOptions
