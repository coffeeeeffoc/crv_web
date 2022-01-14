import { useCallback, useEffect } from 'react'
import { Button, Form } from 'antd'
import { displayOperationType } from '../constants'
import update from 'immutability-helper'
import PropertySetting from './PropertySetting'
import HeadModule from '@@/ModuleUtils/HeadModule'
import { ShowType } from '@/common/constant'

interface propsType {
  stepType: string
  setVisible: any
  setShow: (value: ShowType) => void
  value: any
  onChange: any
  operationStepValue: any
  setOperationStepValue: any
  show: ShowType
  setTitle: any
}

const StepPropertyModel = ({
  stepType,
  setVisible,
  setShow,
  value = [],
  onChange,
  operationStepValue,
  setOperationStepValue,
  show,
  setTitle
}: propsType) => {
  const sourceValue = value
  const [form] = Form.useForm()

  const handleCancel = () => {
    show === ShowType.CREATE ? setShow(ShowType.SELECT) : setVisible(false)
    setOperationStepValue({})
  }

  const save = useCallback(async () => {
    const value = await form.validateFields()
    console.log('operationValue', value)
    if (show === ShowType.CREATE) {
      onChange(update(sourceValue, {
        $splice: [
          [sourceValue.length, 0, { ...value, stepType: stepType }]
        ]
      }))
    } else {
      onChange(update(sourceValue, {
        $splice: [
          [operationStepValue.index, 1],
          [operationStepValue.index, 0, { ...value, stepType: stepType }]
        ]
      }))
    }
    setVisible(false)
  }, [form, stepType, show, setVisible, sourceValue, onChange, operationStepValue.index])

  const buttonType = [
    <Button size='small' key='ok' type='primary' onClick={save}>确定</Button>,
    <Button size='small' key='cancel' type='primary' onClick={handleCancel}>取消</Button>
  ]

  useEffect(() => {
    setTitle(<HeadModule textLeft={`操作步骤属性设置-${displayOperationType[stepType]}`} buttonType={buttonType} />)
    // eslint-disable-next-line
  }, [])

  return (
    <div>
      <Form
        name='basic'
        style={{ paddingLeft: '40px', paddingRight: '40px' }}
        initialValues={operationStepValue}
        form={form}
        size='small'
        preserve={false}
        layout='vertical'
      >
        <PropertySetting {...{ stepType, form }} />
      </Form>
    </div>
  )
}

export default StepPropertyModel
