import { forwardRef, useCallback } from 'react'
import { Input, Select } from 'antd'
import { globalType, EnumParamType, fieldTypeOperateMap, EnumControlType } from '../../ConditionValue'
import { associateFieldType } from '@/common/constant'
import { DateTimePicker, DateRangePicker } from './TimePicker'
import { InputNumberLimit, NumberRange } from './NumberRange'
import InputWithLength from '@rc/ModuleUtils/ControlWithLength/InputWithLength'
import MonthSelectRange from './MonthRange'

export default forwardRef((props: any, ref: any): any => {
  const { fields, onPressEnter, onBlur, dataIndex, value, record, onChange, ...rest } = props
  const result = {
    value,
    onChange,
    ...rest,
  }
  const pressEnterOnChange = useCallback((val: any) => {
    onChange(val.target.value)
    onPressEnter()
  }, [onChange, onPressEnter])

  const selectOnChange = useCallback((val: any) => {
    onChange(val)
    onBlur()
  }, [onChange, onBlur])

  const enumSelectOnChange = useCallback((val: []) => {
    onChange(val.join(','))
    // onBlur()
  }, [onChange])

  switch (record.valueType) {
    case EnumParamType.GLOBAL:
      return <Select defaultOpen ref={ref} onBlur={onBlur} {...result} onChange={selectOnChange}>
        {globalType.map(list => (<Select.Option key={list.value} value={list.value}>{list.text}</Select.Option>))}
      </Select>
    case EnumParamType.VALUE:
    {
      const fieldInfo = fields.filter(({ id }: any) => id === record.field)?.[0] ?? {}
      const fieldType = fieldInfo.fieldType
      const operateMapControl = fieldTypeOperateMap[fieldType]?.control ?? {}
      const controlType = operateMapControl?.[record.operator] ?? operateMapControl?.normal
      switch (controlType) {
        case EnumControlType.DateTimePicker:
          return <DateTimePicker ref={ref} {...props} fieldType={fieldType} />
        case EnumControlType.RangePicker:
          return <DateRangePicker ref={ref} {...result} onBlur={onBlur} fieldType={fieldType} />
        case EnumControlType.NumberInput:
          return <InputNumberLimit fieldInfo={fieldInfo} onBlur={onBlur} ref={ref} {...result} onPressEnter={pressEnterOnChange} />
        case EnumControlType.NumberRange:
          return <NumberRange fieldInfo={fieldInfo} onBlur={onBlur} ref={ref} {...result} onPressEnter={pressEnterOnChange} />
        case EnumControlType.EnumSelect:
          return <Select mode="multiple" allowClear defaultOpen ref={ref} onBlur={onBlur} value={value?.split?.(',')?.filter((item: any) => item !== '') ?? []} onChange={enumSelectOnChange}>
            {
              fieldInfo?.enumConfig?.enumList?.map(({ value, name }: { value: string, name: string }) => <Select.Option key={value} value={value}>{`${name}(${value})`}</Select.Option>)
            }
          </Select>
        case EnumControlType.Input:
          return <InputWithLength onBlur={onBlur} ref={ref} maxLength={fieldInfo?.length ?? 20} {...result} onPressEnter={pressEnterOnChange} />
        case EnumControlType.MonthSelect:
          return <Select defaultOpen ref={ref} onBlur={onBlur} {...result} onChange={selectOnChange}>
            {
              [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(item => <Select.Option key={item} value={item}>{item}</Select.Option>)
            }
          </Select>
        case EnumControlType.MonthDoubleSelect:
          return <MonthSelectRange fieldInfo={fieldInfo} onBlur={onBlur} ref={ref} {...result} />
        default:
          return <Input onBlur={onBlur} ref={ref} {...result} onPressEnter={pressEnterOnChange} />
      }
    }
    case EnumParamType.FIELD:
      return <Select defaultOpen showSearch
        filterOption={(inputValue: string, option: any) => {
          // option.label可能是数字，故此处转换为字符串
          return String(option.children).includes(inputValue)
        }} ref={ref} onBlur={onBlur} {...result} onChange={selectOnChange}>
        {
          fields.filter((item: any) => !associateFieldType.includes(item?.fieldType)).map((list: any) => (
            <Select.Option key={list.id} value={list.id} title={list.fieldStatement}>{`${list.name}(${list.id})`}</Select.Option>
          ))
        }
      </Select>
    default:
      <Input onBlur={onBlur} ref={ref} {...result} onPressEnter={pressEnterOnChange} />
  }
  return <Input onBlur={onBlur} ref={ref} {...result} onPressEnter={pressEnterOnChange} />
})
