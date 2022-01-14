import { FC, useCallback } from 'react'
import { Button, Form, Row, Col, Radio, Space } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { fieldActions, modelEditActions } from '@/redux/actions'
import HeadModule from '@@/ModuleUtils/HeadModule'
import { FIELD_ELEMENT } from '@/common/elementName'
import { ShowType, FieldType, CurrentTabType } from '@/common/constant'
import { SelectField, FIELD_FORM_DIV_AUTO } from '../fieldTypes/constants'

interface newControlType {
  fieldType: FieldType
}

const FieldSelect: FC = () => {
  const dispatch = useDispatch()
  const [form] = Form.useForm()
  const history = useHistory()
  const onFinish = useCallback((value: newControlType) => {
    dispatch(fieldActions.setFieldState({ newControl: value.fieldType, show: ShowType.CREATE }))
  }, [dispatch])

  const { modelId } = useSelector((state: any) => state.modelEdit)

  const selectBack = useCallback(() => {
    dispatch(modelEditActions.setUpdate('update'))
    dispatch(modelEditActions.setCurrentTab({ currentTab: CurrentTabType.FIELD }))
    history.push(`/model/edit/${modelId}`)
  }, [dispatch, modelId, history])

  const buttonType = [
    <Button type='primary' key='back' onClick={selectBack} id={FIELD_ELEMENT.SELECT_BACK}>返回</Button>
  ]

  return (
    <Form
      // style={FIELD_FORM_STYLE}
      layout='vertical'
      form={form}
      onFinish={onFinish}
      initialValues={{}}
    >
      <HeadModule textLeft='新增字段-选择字段类型' buttonType={buttonType} divider />
      <div style={FIELD_FORM_DIV_AUTO}>
        <Row >
          <Col span={24} style={{ paddingLeft: 100, paddingRight: 100 }}>
            <Form.Item key='fieldType'
              label=''
              name='fieldType'
              rules={[{ required: true, message: '请选择类型' }]}
            >
              <Radio.Group>
                <Space direction='vertical'>
                  {
                    SelectField.map((field: any) => <Radio style={{ width: '100%' }} key={field.value} value={field.value}>{field.label}</Radio>)
                  }
                </Space>
              </Radio.Group>
            </Form.Item>
          </Col>
          <Col span={24} style={{ textAlign: 'left', paddingLeft: '100px' }}>
            <Button style={{ padding: '0 50px' }} type='primary' htmlType='submit' id={FIELD_ELEMENT.SELECT_NEXT}>下一步</Button>
          </Col>
        </Row>
      </div>
    </Form>
  )
}

export default FieldSelect
