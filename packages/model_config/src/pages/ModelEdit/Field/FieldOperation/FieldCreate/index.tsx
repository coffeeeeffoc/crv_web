import { useMemo, FC, useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Button, Spin, message, Form } from 'antd'
import { createFieldTypeMap } from '../../fieldTypes'
import { fieldActions, modelEditActions } from '@/redux/actions'
import { POST_REQUEST } from '@/services/postServices'
import { DisplayField, FIELD_FORM_DIV_AUTO } from '../../fieldTypes/constants'
import { FIELD_ELEMENT } from '@/common/elementName'
import HeadModule from '@@/ModuleUtils/HeadModule'
import { FieldType, ShowType, CurrentTabType } from '@/common/constant'
import CurrencyCreate from './CurrencyCreate'
import DateCreate from './DateCreate'
import ManyToOneCreate from './ManyToOneCreate'
import ManyToManyCreate from './ManyToManyCreate'
import OneToManyCreate from './OneToManyCreate'
import TextCreate from './TextCreate'
import LengthTextCreate from './LengthTextCreate'
import DateTimeCreate from './DateTimeCreate'
import TimeCreate from './TimeCreate'
import IntegerCreate from './IntegerCreate'
import DecimalCreate from './DecimalCreate'
import YearCreate from './YearCreate'
import MonthCreate from './MonthCreate'
import YearMonthCreate from './YearMonthCreate'
import EnumCreate from './EnumCreate'
import Percentage from './Percentage'
import Permillage from './Permillage'
import Formula from './Formula'

const { createFieldSave } = POST_REQUEST

const FieldCreate: FC = (props: any) => {
  const [form] = Form.useForm()
  const dispatch = useDispatch()
  const { baseInfo: { fields: baseInfoFields = [] }, modelId } = useSelector((state: any) => state.modelEdit)
  const { newControl, loading } = useSelector((state: any) => state.field)
  const createBack = useCallback(() => {
    // go back to selected page
    dispatch(fieldActions.setFieldState({ show: ShowType.SELECT }))
    dispatch(modelEditActions.setCurrentTab({ currentTab: CurrentTabType.FIELD }))
    // Empty associateTable information's status
    dispatch(fieldActions.setAssociateM({ clear: 'clear' }))
  }, [dispatch])

  const save = useCallback((value: any) => {
    const fieldInfo = { ...value }
    // Judge whether the field name is legal
    if (baseInfoFields && baseInfoFields.findIndex((item: { id: any, [propsName: string]: any }) => item.id === fieldInfo.id) !== -1) {
      message.error('字段名称(id)重复！')
    } else {
      dispatch(modelEditActions.setCurrentTab({ currentTab: CurrentTabType.FIELD }))
      dispatch(createFieldSave({ model: { id: modelId, fields: [{ ...fieldInfo, fieldType: newControl }] } }))
      dispatch(fieldActions.setFieldState({ editData: { ...fieldInfo, fieldType: newControl } }))
      // dispatch(fieldActions.setFieldState({ editData: { ...fieldInfo, version: 0, fieldType: newControl } }))
    }
    console.log('fieldInfo', fieldInfo)
  }, [baseInfoFields, modelId, newControl, dispatch])
  // choose fieldType of field which need create, render differently according to different types
  const fields: any = createFieldTypeMap[newControl]
  const buttonType = useMemo(() => [
    <Button type='primary' htmlType='submit' loading={loading} key={FIELD_ELEMENT.CREATE_SAVE} id={FIELD_ELEMENT.CREATE_SAVE}>保存</Button>,
    <Button type='primary' onClick={createBack} loading={loading} key={FIELD_ELEMENT.CREATE_BACK} id={FIELD_ELEMENT.CREATE_BACK}>返回</Button>
  ], [loading, createBack])
  // the props to render control's children
  const propsValue = useMemo(() => ({
    fields,
    form
  }), [fields, form])
  // TODO:

  return (
    <Spin spinning={loading}>
      <Form
        // style={FIELD_FORM_STYLE}
        layout='vertical'
        form={form}
        initialValues={{}}
        onFinish={save}
      >
        <HeadModule textLeft={`新增字段-${DisplayField[newControl]}`} buttonType={buttonType} divider />
        <div style={FIELD_FORM_DIV_AUTO}>
          {
            (() => {
              switch (newControl) {
                case FieldType.CURRENCY:
                  return <CurrencyCreate {...propsValue} />
                case FieldType.DATE:
                  return <DateCreate {...propsValue} />
                case FieldType.TEXT:
                  return <TextCreate {...propsValue} />
                case FieldType.LONG_TEXT:
                  return <LengthTextCreate {...propsValue} />
                case FieldType.DATE_TIME:
                  return <DateTimeCreate {...propsValue} />
                case FieldType.TIME:
                  return <TimeCreate {...propsValue} />
                case FieldType.YEAR_MONTH:
                  return <YearMonthCreate {...propsValue} />
                case FieldType.YEAR:
                  return <YearCreate {...propsValue} />
                case FieldType.MONTH:
                  return <MonthCreate {...propsValue} />
                case FieldType.INTEGER:
                  return <IntegerCreate {...propsValue} />
                case FieldType.PERCENTAGE:
                  return <Percentage {...propsValue} />
                case FieldType.PERMILLAGE:
                  return <Permillage {...propsValue} />
                case FieldType.DECIMAL:
                  return <DecimalCreate {...propsValue} />
                case FieldType.ENUM:
                  return <EnumCreate {...propsValue} />
                case FieldType.FORMULA:
                  return <Formula {...propsValue} />
                case FieldType.MANY_TO_MANY:
                  return <ManyToManyCreate {...propsValue} />
                case FieldType.MANY_TO_ONE:
                  return <ManyToOneCreate {...propsValue} />
                case FieldType.ONE_TO_MANY:
                  return <OneToManyCreate {...propsValue} />
                default:
                  return <>TO BE DONE</>
              }
            })()
          }
        </div>
      </Form>
    </Spin>
  )
}

export default FieldCreate
