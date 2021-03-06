import { useCallback, useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Button, Form, Row, Col, Input, Select, Checkbox } from 'antd'
import OperationStep from './OperationStep/index'
import HeadModule from '@@/ModuleUtils/HeadModule'
import { OPERATION_ELEMENT } from '@/common/elementName'
import { modelEditActions, operationActions } from '@/redux/actions'
import { POST_REQUEST } from '@/services/postServices'
import InputWithLength from '@rc/ModuleUtils/ControlWithLength/InputWithLength'
import { TargetDateType } from './constant'
import { CurrentTabType, ShowType } from '@/common/constant'
import { useHistory } from 'react-router-dom'

const { updateOperation } = POST_REQUEST

const { Option } = Select
export default function OperationCreate (props: any) {
  const dispatch = useDispatch()
  const { match: { params: { modelId } } } = props
  // const { modelId } = useSelector((state: any) => state.modelEdit)
  const { operationData, loading, show, editSuccess } = useSelector((state: any) => state.operation)
  const history = useHistory()
  const [form] = Form.useForm()

  const [selectValue, setSelectValue] = useState<boolean>(operationData?.targetData === TargetDateType.MULTIPLE)

  const createBack = useCallback(() => {
    dispatch(modelEditActions.setUpdate('update'))
    dispatch(modelEditActions.setCurrentTab({ currentTab: CurrentTabType.OPERATION }))
    // window.location.href = `#/model/edit/${modelId}`
    history.push(`/model/edit/${modelId}`)
  }, [dispatch, modelId, history])

  useEffect(() => {
    if (editSuccess) {
      history.push(`/model/edit/${modelId}`)
      dispatch(operationActions.setOperationState({ editSuccess: false }))
    }
  }, [editSuccess, history, modelId, dispatch])

  const targetDataChange = useCallback((val: string) => {
    setSelectValue(val === 'MULTIPLE')
  }, [])

  const onFinish = useCallback((value: any) => {
    dispatch(modelEditActions.setCurrentTab({ currentTab: CurrentTabType.OPERATION }))
    dispatch(updateOperation({
      model: {
        id: modelId,
        operations: [
          { ...operationData, ...value }
        ]
      }
    }))
  }, [dispatch, modelId, operationData])

  const buttonType = [
    <Button type='primary' htmlType='submit' loading={loading} key={OPERATION_ELEMENT.SAVE} id={OPERATION_ELEMENT.SAVE}>??????</Button>,
    <Button type='primary' onClick={createBack} loading={loading} key={OPERATION_ELEMENT.BACK} id={OPERATION_ELEMENT.BACK}>??????</Button>
  ]

  return (
    <Form
      style={{ width: '100vw', margin: 'auto', padding: 20 }}
      layout='vertical'
      form={form}
      initialValues={operationData}
      onFinish={onFinish}
    >
      <HeadModule textLeft={show === ShowType.CREATE ? '????????????-???????????????' : '????????????-???????????????'} buttonType={buttonType} divider />
      <Row style={{ paddingLeft: 10, paddingRight: 10 }}>
        <Col span={12}>
          <Form.Item key='name' name='name' label='??????:' rules={[
            { required: true, message: '??????????????????' },
            { pattern: /^\S.*\S$|(^\S{0,1}\S$)/, message: '???????????????????????????' }
          ]}>
            <InputWithLength maxLength={20} />
          </Form.Item>
        </Col>
        <Col span={24} style={{ width: '50%' }}>
          <Form.Item key='operationSteps' name='operationSteps' label=''>
            <OperationStep modelId={modelId} />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item key='targetData' name='targetData' label='????????????:' rules={[
            { required: true, message: '????????????????????????' }
          ]} initialValue={TargetDateType.NO_SEL_DATA}>
            <Select onChange={targetDataChange}>
              <Option key={TargetDateType.NO_SEL_DATA} value={TargetDateType.NO_SEL_DATA} >?????????????????????</Option>
              <Option key={TargetDateType.ONLY_ONE} value={TargetDateType.ONLY_ONE}>?????????????????????</Option>
              <Option key={TargetDateType.MULTIPLE} value={TargetDateType.MULTIPLE} >??????????????????</Option>
            </Select>
          </Form.Item>
        </Col>
        <Col span={12} style={{ textAlign: 'center' }}>
          <Form.Item key='supportSelectAll' name='supportSelectAll' label=' ' valuePropName='checked' >
            <Checkbox disabled={!selectValue}>????????????????????????</Checkbox>
          </Form.Item>
        </Col>
        <Col span={24}>
          <Form.Item key='statement' name='statement' label='????????????:'>
            <Input.TextArea rows={5} showCount maxLength={140} />
          </Form.Item>
        </Col>
      </Row>
    </Form>
  )
}
