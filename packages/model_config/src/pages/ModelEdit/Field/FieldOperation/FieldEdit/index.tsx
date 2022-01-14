import { FC, useCallback, useMemo, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useAppSelector } from '@/redux'
import { Button, Form, Spin } from 'antd'
import { editFieldTypeMap } from '../../fieldTypes'
import { POST_REQUEST } from '@/services/postServices'
import { modelEditActions, fieldActions } from '@/redux/actions'
import { DisplayField, FIELD_FORM_DIV_AUTO, emptyTurn } from '../../fieldTypes/constants'
import HeadModule from '@@/ModuleUtils/HeadModule'
import { FIELD_ELEMENT } from '@/common/elementName'
import { DefaultField, FieldType, CurrentTabType } from '@/common/constant'
import CurrencyEdit from './CurrencyEdit'
import DateEdit from './DateEdit'
import ManyToOneEdit from './ManyToOneEdit'
import ManyToManyEdit from './ManyToManyEdit'
import OneToManyEdit from './OneToManyEdit'
import TextEdit from './TextEdit'
import LengthTextEdit from './LengthTextEdit'
import DateTimeEdit from './DateTimeEdit'
import TimeEdit from './TimeEdit'
import IntegerEdit from './IntegerEdit'
import DecimalEdit from './DecimalEdit'
import YearEdit from './YearEdit'
import MonthEdit from './MonthEdit'
import YearMonthEdit from './YearMonthEdit'
import EnumEdit from './EnumEdit'
import Percentage from './Percentage'
import Permillage from './Permillage'
import Formula from './Formula'
import { useHistory } from 'react-router-dom'

const { editFieldSave, queryOne } = POST_REQUEST

const FieldEdit: FC = () => {
  const [form] = Form.useForm()
  const history = useHistory()
  const { baseInfo, modelId } = useAppSelector(state => state.modelEdit)
  const { editData, loading, editSuccess } = useAppSelector(state => state.field)
  const dispatch = useDispatch()

  // if field edit success, to modelEdit page
  useEffect(() => {
    if (editSuccess) {
      history.push(`/model/edit/${modelId}`)
      dispatch(fieldActions.setFieldState({ editSuccess: false }))
    }
  }, [editSuccess, dispatch, history, modelId])

  // if ediData from redux lack the field of version, get the latest model information
  useEffect(() => {
    if (!editData.version) {
      dispatch(queryOne({ model: { id: modelId } }))
    }
  }, [editData.version, modelId, dispatch])

  // assign editData, avoid not getting the latest value when creat a new field
  const fieldFormData = useMemo(() => Object.assign(JSON.parse(JSON.stringify(editData)), baseInfo.fields?.filter(({ id }) => id === editData.id)?.[0] ?? {}), [editData, baseInfo.fields])
  // const fieldFormData = useMemo(() => editData.version ? editData : baseInfo.fields?.filter(({ id }) => id === editData.id)?.[0] ?? {}, [editData, baseInfo.fields])

  // if fieldFormData update, form initialValue reset
  useEffect(() => {
    form.resetFields()
  }, [fieldFormData, form])

  const editSave = useCallback(async () => {
    console.log('editSave', form.getFieldsValue())
    const fieldInfo = await form.validateFields()
    // some field need turn null into empty string when edit
    if (Object.keys(emptyTurn).includes(fieldFormData.fieldType)) {
      emptyTurn[fieldFormData.fieldType].forEach((type: string) => {
        if (fieldInfo[type] === null) {
          fieldInfo[type] = ''
        }
      })
    }
    dispatch(editFieldSave({ model: { id: modelId, fields: [{ ...fieldFormData, ...fieldInfo }] } }))
    dispatch(modelEditActions.setCurrentTab({ currentTab: CurrentTabType.FIELD }))
  }, [dispatch, modelId, fieldFormData, form])

  const fieldEditBack = useCallback(() => {
    // 展示的tab页的变化
    dispatch(modelEditActions.setCurrentTab({ currentTab: CurrentTabType.FIELD }))
    // 路由的跳转
    history.push(`/model/edit/${modelId}`)
    // 更新数据
    dispatch(modelEditActions.setUpdate({}))
    // 清除关联表的状态
    dispatch(fieldActions.setAssociateM({ clear: 'clear' }))
  }, [dispatch, modelId, history])
  // field的变化模式
  const fields: any = editFieldTypeMap[fieldFormData?.fieldType]
  const buttonType = useMemo(() => [
    <Button type='primary' htmlType='submit' onClick={editSave} loading={loading} key={FIELD_ELEMENT.EDIT_SAVE} id={FIELD_ELEMENT.EDIT_SAVE}>保存</Button>,
    <Button type='primary' onClick={fieldEditBack} loading={loading} key={FIELD_ELEMENT.EDIT_BACK} id={FIELD_ELEMENT.EDIT_BACK}>返回</Button>
  ], [loading, fieldEditBack, editSave])

  console.log('editData', fieldFormData)

  const propsValue = useMemo(() => ({
    fields,
    fieldFormData,
    form,
    DefaultField // 六个默认类型，编辑时只可更改名称
  }), [fieldFormData, fields, form])

  return (
    <Spin spinning={loading}>
      <Form
        // style={FIELD_FORM_STYLE}
        layout='vertical'
        form={form}
        initialValues={fieldFormData}
      // onFinish={editSave}
      >
        <HeadModule textLeft={`编辑字段-${DisplayField[fieldFormData.fieldType]}`} buttonType={buttonType} divider />
        <div style={FIELD_FORM_DIV_AUTO}>
          {
            (() => {
              switch (fieldFormData.fieldType) {
                case FieldType.CURRENCY:
                  return <CurrencyEdit {...propsValue} />
                case FieldType.DATE:
                  return <DateEdit {...propsValue} />
                case FieldType.TEXT:
                  return <TextEdit {...propsValue} />
                case FieldType.LONG_TEXT:
                  return <LengthTextEdit {...propsValue} />
                case FieldType.DATE_TIME:
                  return <DateTimeEdit {...propsValue} />
                case FieldType.TIME:
                  return <TimeEdit {...propsValue} />
                case FieldType.YEAR_MONTH:
                  return <YearMonthEdit {...propsValue} />
                case FieldType.YEAR:
                  return <YearEdit {...propsValue} />
                case FieldType.MONTH:
                  return <MonthEdit {...propsValue} />
                case FieldType.INTEGER:
                  return <IntegerEdit {...propsValue} />
                case FieldType.DECIMAL:
                  return <DecimalEdit {...propsValue} />
                case FieldType.PERCENTAGE:
                  return <Percentage {...propsValue} />
                case FieldType.PERMILLAGE:
                  return <Permillage {...propsValue} />
                case FieldType.ENUM:
                  return <EnumEdit {...propsValue} />
                case FieldType.FORMULA:
                  return <Formula {...propsValue} />
                case FieldType.MANY_TO_MANY:
                  return <ManyToManyEdit {...propsValue} />
                case FieldType.MANY_TO_ONE:
                  return <ManyToOneEdit {...propsValue} />
                case FieldType.ONE_TO_MANY:
                  return <OneToManyEdit {...propsValue} />
                default:
                  return <TextEdit {...propsValue} />
              }
            })()
          }
        </div>
      </Form>
    </Spin>
  )
}

export default FieldEdit
