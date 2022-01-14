import { FC, useCallback, useEffect, useMemo, useRef } from 'react'
import { Form } from 'antd'
import update from 'immutability-helper'
import SummaryCalculation from './SummaryCalculation'
import InputWithLength from '@rc/ModuleUtils/ControlWithLength/InputWithLength'
import { CloseSquareOutlined } from '@ant-design/icons'
import { useAppSelector } from '@/redux'
import { useDispatch } from 'react-redux'
import { viewActions } from '@/redux/actions'
import { SummaryCalculateType } from '../index'

interface PropsType {
  index: number
  [propsName: string]: any
}
const CardContent: FC<PropsType> = (props) => {
  const { info, index, summaryCalculate } = props
  const formRef = useRef<any>(null)
  useEffect(() => {
    formRef?.current?.resetFields()
  }, [])
  const dispatch = useDispatch()
  const { baseInfo } = useAppSelector(state => state.modelEdit)
  const fields = useMemo(() => baseInfo.fields ?? [], [baseInfo.fields])
  const [form] = Form.useForm()
  const onFinish = useCallback(async () => {
    const value = await form.validateFields()
    dispatch(viewActions.setViewData({
      summaryCalculate: update(summaryCalculate, {
        $splice: [
          [index, 1, { ...info, ...value }]
        ]
      })
    }))
  }, [index, summaryCalculate, dispatch, form, info])
  const deleteOnClick = useCallback(() => {
    dispatch(viewActions.setViewData({
      summaryCalculate: update(summaryCalculate, {
        $splice: [
          [index, 1]
        ]
      }).map?.((item: SummaryCalculateType, index: number) => ({
        ...item,
        id: index
      }))
    }))
  }, [index, summaryCalculate, dispatch])
  return (
    <div>
      <span style={{ top: '-4px', position: 'relative', fontSize: '18px', color: 'blue' }}>{index + 1}</span>
      <CloseSquareOutlined style={{ float: 'right', position: 'relative', fontSize: '24px' }} onClick={deleteOnClick} />
      <Form
        layout='vertical'
        initialValues={info}
        form={form}
        ref={formRef}
      // size='small'
      >
        <Form.Item label='显示名称：' name='name' key={`${index}-name`}>
          <InputWithLength maxLength={20} onBlur={onFinish} />
        </Form.Item>
        <Form.Item label='计算公式：' name='formula' key={`${index}-formula`}>
          <SummaryCalculation fieldItems={fields} onFinish={onFinish} />
        </Form.Item>
      </Form>
    </div>
  )
}

export default CardContent
