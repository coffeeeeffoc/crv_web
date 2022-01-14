import { FC, ReactNode, useCallback, useEffect, useMemo, useState } from 'react'
import { Button, Form, Input, message } from 'antd'
import { useSelector, useDispatch } from 'react-redux'
import ShowModal from '@rc/ModuleUtils/ShowModal'
import HeadModule from '@rc/ModuleUtils/HeadModule'
import legalCondition from './legalCondition'
import ConValue from './ConValue'
import { OperateType, EnumFieldType } from '@/constants/constant'
import { ListConfigProps, ViewProps, ListDataProps } from '@/interfaces/ListConfig'
import { dataActions } from '@/redux/actions'
import { emptyData } from '@/constants/dataSliceConstant'

export interface ConditionType {
  no: number
  field: string | undefined
  operate: OperateType | undefined
  value: any
  [propsName: string]: any
}

export interface FieldListType {
  name: string
  id: string | number
  fieldType: EnumFieldType
  refModel?: string
  refModelField?: string
  childrens?: any[]
  showFormat?: string
  content?: string
  [key: string]: any
}
export interface ComplexFilterProps {
  visible: boolean
  onCancel: (...arg: any) => any
}
/**
 * 列表页面高级筛选
 */
const ComplexFilter: FC<ComplexFilterProps> = ({ visible, onCancel }) => {
  const dispatch = useDispatch()
  const [form] = Form.useForm()
  const [preserve, setPreserve] = useState(true)

  const { current, viewList }: ListConfigProps = useSelector((state: any) => state.config)
  const { config: { filterFields } }: ViewProps = viewList[current] ?? {}

  const { temp: { filters } = { filters: {} } }: ListDataProps = useSelector((state: any) => state.data.viewDataList[current] ?? emptyData)

  useEffect(() => {
    if (visible) {
      setPreserve(false)
      form.setFieldsValue(filters.complexSearch)
    }
  }, [visible, form, filters.complexSearch])
  useEffect(() => {
    if (!visible) setPreserve(true)
  }, [visible])

  const changeFilter = useCallback((value: any) => {
    dispatch(dataActions.setFilter({ viewId: current, filters: { complexSearch: value } }))
    dispatch(dataActions.setSelectAll({ viewId: current, selectAll: false }))
  }, [current, dispatch])

  const onFinish = useCallback(async () => {
    const values = await form.validateFields()
    const { conditions = [] } = values
    let legalCon = true
    conditions.forEach((condition: ConditionType) => {
      ['field', 'value', 'operate'].forEach((item: keyof ConditionType) => {
        if (condition[item] === undefined || condition[item] === null || condition[item] === '') {
          legalCon = false
        }
      })
    })
    if (legalCon) {
      changeFilter(conditions.length > 0 ? values : undefined)
      onCancel()
    } else {
      message.warn('需补全过滤条件')
    }
  }, [changeFilter, form, onCancel])

  const onClear = useCallback(() => {
    changeFilter(undefined)
    onCancel()
  }, [changeFilter, onCancel])

  const buttonType = useMemo(() => [
    <Button id='FILTER_CLEAR' key='FILTER_SURE' size='small' type='default' disabled={!filters.complexSearch} onClick={onClear}>清除</Button>,
    <Button id='FILTER_SURE' key='FILTER_SURE' size='small' type='primary' onClick={onFinish}>确定</Button>,
    <Button id='FILTER_CANCEL' key='FILTER_CANCEL' size='small' type='primary' className='cancelBtn' onClick={onCancel}>取消</Button>
  ], [filters.complexSearch, onCancel, onClear, onFinish])

  const title: ReactNode = useMemo(() => <HeadModule textLeft='表单高级过滤' buttonType={buttonType} />, [buttonType])

  return (
    <ShowModal
      title={title}
      destroyOnClose
      visible={visible}
      bodyStyle={{ overflowY: 'auto', maxHeight: '50vh' }}
      style={{ top: '10vh' }}
      width='540px'
    >
      <Form
        // name="dynamic_form_nest_item"
        form={form}
        // onFinish={onFinish}
        preserve={preserve}
        scrollToFirstError
        size='small'
        autoComplete="off"
      >
        <Form.Item
          name='conditions'
          initialValue={[]}
        >
          <ConValue fieldList={filterFields} />
        </Form.Item>
        <Form.Item
          style={{ marginTop: '-15px' }}
          label="条件组合逻辑"
          labelCol={{ span: 24 }}
          name='conditionCombin'
          initialValue={''}
          dependencies={['conditions']}
          rules={[
            ({ getFieldValue }) => ({
              validator (_, value): any {
                if (!getFieldValue('conditions')) {
                  return Promise.reject(new Error('请添加过滤条件'))
                }
                const fieldArr: string[] = getFieldValue('conditions').map((condition: any) => {
                  return condition.no.toString()
                })
                if (value) {
                  return legalCondition(value, fieldArr)
                } else {
                  return Promise.resolve()
                }
              }
            })
          ]}
        >
          <Input placeholder="请输入条件组合逻辑" />
        </Form.Item>
      </Form>
    </ShowModal>
  )
}

export default ComplexFilter
