import { FC, useCallback, useEffect, useMemo, useRef } from 'react'
import { Form, Input } from 'antd'
import { useAppSelector } from '@/redux'
import legalCondition from './legalCondition'
import ConditionTable from './Condition'
import { useDispatch } from 'react-redux'
import { viewActions } from '@redux/actions'

interface ViewFieldPropsType {
  [propsName: string]: any
}

const ViewField: FC<ViewFieldPropsType> = () => {
  const { viewData } = useAppSelector(state => state.view)
  const viewDataFilter = useMemo(() => viewData.viewDataFilter ?? {}, [viewData.viewDataFilter])
  const dispatch = useDispatch()
  const [form] = Form.useForm()

  const FormRef = useRef<any>(null)
  useEffect(() => {
    form.resetFields()
  }, [viewDataFilter, form])

  const onFinish = useCallback(async () => {
    const value = await form.validateFields()
    console.log('onFinish', value)
    dispatch(viewActions.setViewData({
      viewDataFilter: value
    }))
  }, [dispatch, form])
  return (
    <>
      <Form
        initialValues={viewDataFilter}
        form={form}
        layout='vertical'
        ref={FormRef}
      >
        <Form.Item
          name='conditions'
          label='条件：'>
          <ConditionTable viewDataFilter={viewDataFilter} onFinish={onFinish} />
        </Form.Item>
        <Form.Item
          name='conditionCombination'
          // bind conditions to conditionCombination, to ensure check condition's value change
          dependencies={['conditions']}
          label='组合条件'
          rules={[
            ({ getFieldValue }) => ({
              validator (_, value): any {
                if (value && value !== '' && getFieldValue('conditions')) {
                  const fieldArr: string[] = getFieldValue('conditions').map((condition: any) => {
                    return condition.id.toString()
                  })
                  return legalCondition(value, fieldArr)
                } else {
                  return Promise.resolve()
                }
              }
            })
          ]}
        >
          <Input onBlur={onFinish} />
        </Form.Item>
      </Form>
    </>
  )
}
export default ViewField
