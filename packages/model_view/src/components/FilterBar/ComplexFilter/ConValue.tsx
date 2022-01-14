/* eslint-disable no-template-curly-in-string */
/**
 * 表单高级过滤
 */
import { Input, Space, Select, Button } from 'antd'
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons'
import { useCallback, useEffect, useState } from 'react'
import { OperateType, EnumFieldType, OperateTypeValue, formulaField } from '@/constants/constant'
import { FieldListType, ConditionType } from './index'
import FieldSelect from './controls/FieldSelect';
import RefFieldValueSelect from './controls/RefFieldValueSelect';
import DateTimePicker, { DateRangePicker } from './controls/DateTimePicker';
import NumberInput, { NumberRange } from './controls/NumberInput';
import EnumSelect from './controls/EnumSelect';
// import RefSelect from '@rc/RefWidget/RefSelect';
// import { transformRefData } from '@rc/RefWidget/utils'
// import { EnumFieldType as TempEnumFieldType } from '@utils/types/business/FieldType'

interface propsType {
  fieldList: FieldListType[]
  [propsName: string]: any
}

const { Option } = Select
const ConValue = (props: propsType) => {
  const { fieldList, value = [], onChange } = props
  const [conditionValue, setConditionValue] = useState<ConditionType[]>(value)

  useEffect(() => {
    setConditionValue(value)
  }, [value])

  const deleteCon = (index: number) => {
    let updateConditionValue = [...conditionValue]
    updateConditionValue.splice(index, 1)
    updateConditionValue = updateConditionValue.map((condition: any, index) => {
      return { ...condition, no: index + 1 }
    })
    onChange(updateConditionValue)
  }

  const increaseCon = () => {
    const updateConditionValue = [...conditionValue]
    updateConditionValue.push({
      no: conditionValue.length + 1,
      field: undefined,
      operate: undefined,
      value: undefined
    })
    onChange(updateConditionValue)
  }

  const fieldOnChange = useCallback((text: any, index: number, field: keyof ConditionType) => {
    const updateConditionValue: any = JSON.parse(JSON.stringify(conditionValue))
    updateConditionValue[index][field] = text;
    if (field === 'field') {
      delete updateConditionValue[index].operate;
      delete updateConditionValue[index].value;
    }
    if (field === 'operate') { delete updateConditionValue[index].value; }
    onChange(updateConditionValue)
  }, [conditionValue, onChange])

  const fieldTypeOperateTypeMap: any = {
    [EnumFieldType.INTEGER]: { operate: [OperateType.EQUAL, OperateType.NOT_EQUAL, OperateType.GREATER, OperateType.GREATER_EQUAL, OperateType.LESS, OperateType.LESS_EQUAL, OperateType.BETWEEN], control: { normal: NumberInput, [OperateType.BETWEEN]: NumberRange } },
    // [EnumFieldType.CURRENCY]: { operate: [OperateType.EQUAL, OperateType.NOT_EQUAL, OperateType.GREATER, OperateType.GREATER_EQUAL, OperateType.LESS, OperateType.LESS_EQUAL, OperateType.BETWEEN], control: { normal: NumberInput, [OperateType.BETWEEN]: NumberRange } },
    [EnumFieldType.DATE]: { operate: [OperateType.EQUAL, OperateType.NOT_EQUAL, OperateType.BETWEEN], control: { normal: DateTimePicker, [OperateType.BETWEEN]: DateRangePicker } },
    [EnumFieldType.TEXT]: { operate: [OperateType.EQUAL, OperateType.NOT_EQUAL, OperateType.LIKE], control: { normal: Input } },
    [EnumFieldType.ENUM]: { operate: [OperateType.IN, OperateType.NOT_IN], control: { normal: EnumSelect } }
  }
  fieldTypeOperateTypeMap[EnumFieldType.LONG_TEXT] = fieldTypeOperateTypeMap[EnumFieldType.TEXT];
  fieldTypeOperateTypeMap[EnumFieldType.CURRENCY] = fieldTypeOperateTypeMap[EnumFieldType.INTEGER];
  fieldTypeOperateTypeMap[EnumFieldType.DECIMAL] = fieldTypeOperateTypeMap[EnumFieldType.INTEGER];
  fieldTypeOperateTypeMap[EnumFieldType.DOUBLE] = fieldTypeOperateTypeMap[EnumFieldType.INTEGER];
  fieldTypeOperateTypeMap[EnumFieldType.PERCENTAGE] = fieldTypeOperateTypeMap[EnumFieldType.INTEGER];
  fieldTypeOperateTypeMap[EnumFieldType.PERMILLAGE] = fieldTypeOperateTypeMap[EnumFieldType.INTEGER];
  // 日期相关
  fieldTypeOperateTypeMap[EnumFieldType.MONTH] = fieldTypeOperateTypeMap[EnumFieldType.INTEGER];
  fieldTypeOperateTypeMap[EnumFieldType.DATE_TIME] = fieldTypeOperateTypeMap[EnumFieldType.DATE];
  fieldTypeOperateTypeMap[EnumFieldType.YEAR] = fieldTypeOperateTypeMap[EnumFieldType.DATE];
  fieldTypeOperateTypeMap[EnumFieldType.YEAR_MONTH] = fieldTypeOperateTypeMap[EnumFieldType.DATE];
  fieldTypeOperateTypeMap[EnumFieldType.TIME] = fieldTypeOperateTypeMap[EnumFieldType.DATE];
  // TEXT/LONGTEXT
  // DECIMAL/DOUBLE/INTEGER
  // DATE/DATETIME/TIME/YEAR/MONTH
  // PASSWORD
  // FILE
  // ENUM
  // CALCULATION
  // ONETOMANY/MANYTOONE/MANYTOMANY

  const createValueControl = ({ field, operate, value }: ConditionType, config: FieldListType | undefined, index: number, val: any): any => {
    const { fieldType = EnumFieldType.TEXT, refModel, refModelField, childrens, showFormat, content } = config ?? {};
    // const { fieldType = EnumFieldType.TEXT } = config ?? {};
    const fieldTypeConfig = fieldTypeOperateTypeMap[fieldType];
    const valueDeal = (e: any) => (['number', 'string'].includes(typeof e) || Array.isArray(e)) ? e : e.target.value;
    // 字段或操作为空,返回默认Input
    if (!field || !operate) {
      return <Input style={{ width: '200px' }} defaultValue={value} placeholder='值' onBlur={e => fieldOnChange(valueDeal(e), index, 'value')} />
    }
    // 基础类型
    if (fieldTypeConfig) {
      const Control = fieldTypeConfig.control[`${operate}`] ?? fieldTypeConfig.control.normal;
      return <Control style={{ width: '200px' }} config={config} value={value} onChange={(val: any) => fieldOnChange(valueDeal(val), index, 'value')} />
    } else { // 关联字段类型
      const refFild = field.split('.');// length === 1 关联下拉, length === 2 普通
      if (refFild.length === 1) {
        // const tempConfig: any = { ...config };
        // const transformValue = transformRefData(tempConfig);

        // const converValue = (val: string) => {
        //   if (!val) return []
        //   const idInfo = config?.childrens.find((o: any) => o.id === 'id');
        //   return idInfo?.fieldType === 'INTEGER' ? val.split(',').filter((v: string) => !!v).map((v: string) => parseInt(v)) : val.split(',')
        // }

        // return (
        //   <RefSelect
        //     // querySelfDataContext={{ displayType, editType, initialPageData }}
        //     field={'aaaaaa'}
        //     modelId={config?.refModel ?? ''}
        //     config={tempConfig}
        //     value={transformValue.wrapValue(converValue(value))}
        //     onChange={(val: any) => fieldOnChange(transformValue.parseValue(val).join(','), index, 'value')}
        //     transformProps={(props) => ({ ...props, size: 'small', style: { width: '200px' } })}
        //   />
        // )
        let showFormatStr = '';
        const isExistenceName = childrens?.findIndex((o: any) => o.id === 'name') !== -1
        // return (content || showFormat || isExistenceName) ? (content || showFormat || '${name}') : (filterField ? `$\{${filterField}}` : '${id}')
        // one2many,many2many优先级 content，showFormat，name(有的情况下)，id，关联字段(有的情况下)
        // many2one content，showFormat，name(有的情况下)，关联字段(有的情况下)，id
        if (fieldType === 'MANY_TO_ONE') {
          // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
          showFormatStr = (content || showFormat || (isExistenceName && '${name}') || (refModelField && `\${${refModelField}}`) || '${id}')
        } else {
          // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
          showFormatStr = (content || showFormat || (isExistenceName && '${name}') || '${id}') // || (refModelField && `\${${refModelField}}`)
        }
        return <RefFieldValueSelect displayFormat={showFormatStr} modelId={refModel} style={{ width: '200px' }} config={config} filterField={refModelField} value={value} onChange={(val: any) => fieldOnChange(val, index, 'value')} />
      } else if (refFild.length === 2) {
        const subConfig = config?.childrens?.find((o: any) => o.id === refFild[1]);
        return createValueControl({ no: 1, field, operate, value }, subConfig, index, val)
      }
      return <Input style={{ width: '150px' }} defaultValue={value} placeholder='值' onBlur={e => fieldOnChange(valueDeal(e), index, 'value')} />
    }
  }

  const createOperateOptions = (field: string | undefined, config: FieldListType | undefined): any => {
    const { fieldType } = config ?? {};
    const currentConfig = fieldTypeOperateTypeMap[fieldType ?? '-']
    if (currentConfig) {
      return currentConfig.operate;
    }
    const refFild = field?.split('.') ?? [];
    if (refFild.length === 1) {
      return [OperateType.IN, OperateType.NOT_IN];
    } else if (refFild.length === 2) {
      const subConfig = config?.childrens?.find((o: any) => o.id === refFild[1]);
      return createOperateOptions(field, subConfig)
    }
    return fieldTypeOperateTypeMap[EnumFieldType.TEXT].operate;
  }

  return (
    <>
      {
        conditionValue.map((item: ConditionType, index: number) => {
          const { no, field, operate, value } = item;
          const config: any = fieldList.find((o: any) => field?.startsWith(`${o.id}.`) === true || field === o.id)
          return (
            <Space key='space' style={{ display: 'flex', marginBottom: 5 }} align='baseline'>
              <Input value={no} style={{ width: 25, textAlign: 'center', paddingLeft: 0, paddingRight: 0, borderRadius: 15 }} />
              <FieldSelect options={fieldList.filter((f: any) => f.fieldType !== formulaField).map((o: any) => ({ ...o, children: o.childrens }))} style={{ minWidth: 130, maxWidth: 130 }} fieldList={fieldList} value={field} onChange={val => fieldOnChange(val, index, 'field')} />
              <Select value={operate} placeholder='请选择操作符' onPopupScroll={e => console.log('selectresponse', e)} style={{ width: 100 }} onChange={val => fieldOnChange(val, index, 'operate')}>
                {
                  createOperateOptions(field, config).map((op: any) => <Option key={op} value={op}>{OperateTypeValue[op]}</Option>)
                }
              </Select>
              {
                createValueControl(item, config, index, value)
              }
              <MinusCircleOutlined onClick={() => deleteCon(index)} />
            </Space>
          )
        })
      }
      <Button type='dashed' onClick={() => increaseCon()} block icon={<PlusOutlined />} style={{ marginTop: '10px', marginBottom: '-30px' }}>
        添加过滤条件
      </Button>
    </>
  )
}

export default ConValue
