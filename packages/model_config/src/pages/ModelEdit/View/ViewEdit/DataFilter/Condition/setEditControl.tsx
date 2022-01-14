import { forwardRef, useCallback } from 'react'
import { Select, Input } from 'antd'
import { associateFieldType, FieldType } from '@/common/constant'
import { operationType, paramType, fieldTypeOperateMap } from '../ConditionValue'
import ValueControl from './valueControl'

export default ({
  fields = []
}: any) => {
  return forwardRef((propsType: any, ref: any): any => {
    const {
      onPressEnter,
      onBlur,
      dataIndex,
      value,
      record,
      onChange,
      ...rest
    } = propsType
    const result = {
      value,
      onChange,
      ...rest,
    }
    const selectOnChange = useCallback((val: any) => {
      onChange(val)
      onBlur()
    }, [onChange, onBlur])
    console.log('12456', fields.filter(({ id }: any) => id === record.field)?.[0]?.fieldType, fieldTypeOperateMap[fields.filter(({ id }: any) => id === record.field)?.[0]?.fieldType]?.operate)

    switch (dataIndex) {
      case 'field':
      {
        const option = fields.filter((item: any) => !associateFieldType.includes(item?.fieldType) && item.fieldType !== FieldType.FORMULA).map((list: any) => ({
          key: list.id,
          value: list.id,
          label: `${list.name ?? list.id}(${list.id})`,
        }))
        return <Select showSearch allowClear defaultOpen
          filterOption={(inputValue: string, option: any) => {
            // option.label可能是数字，故此处转换为字符串
            return String(option.label).includes(inputValue)
          }}
          ref={ref} onBlur={onBlur} options={option} {...result} onChange={selectOnChange}>
        </Select>
      }
      case 'operator':
        return <Select defaultOpen ref={ref} onBlur={onBlur} {...result} onChange={selectOnChange}>
          {
            operationType.filter(({ value }) => fieldTypeOperateMap[fields.filter(({ id }: any) => id === record.field)?.[0]?.fieldType]?.operate?.includes(value))?.map(list => (
              <Select.Option key={list.value} value={list.value}>{list.text}</Select.Option>
            ))
          }
        </Select>
      case 'valueType':
        return <Select defaultOpen ref={ref} onBlur={onBlur} {...result} onChange={selectOnChange}>
          {
            paramType.map(list => (
              <Select.Option key={list.value} value={list.value}>{list.text}</Select.Option>
            ))
          }
        </Select>
      case 'value':
        return <ValueControl fields={fields} {...propsType} ref={ref} />
      default:
        return <Input onPressEnter={onPressEnter} onBlur={onBlur} ref={ref} {...result}></Input>
    }
  })
}
