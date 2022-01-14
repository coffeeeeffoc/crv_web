import { FC, ReactNode, useCallback, useEffect, useMemo } from 'react'
import HeadModule from '@@/ModuleUtils/HeadModule'
import { useDispatch, useSelector } from 'react-redux'
import { Form, Row, Col, Button, Input } from 'antd'
import { ShowType } from '@/common/constant'
import InputWithLength from '@rc/ModuleUtils/ControlWithLength/InputWithLength'
import Configure from './ConfigureTable'
import { fieldActions } from '@redux/actions'
import { POST_REQUEST } from '@/services/postServices'
import { ConfigureType } from './interface'

const { createOption } = POST_REQUEST

interface OptionPropsType {
  // setShow: (value: ShowType) => void
  setTitle: (value: ReactNode) => void
}

const OptionCreate: FC<OptionPropsType> = ({
  // setShow,
  setTitle
}) => {
  const [form] = Form.useForm()
  const dispatch = useDispatch()
  const { enumOption: { loading } } = useSelector((state: any) => state.field)
  const onFinish = useCallback(async () => {
    const value = await form.validateFields()
    // setShow(ShowType.SELECT)
    // TODO: need add create enum api
    dispatch(createOption({ ...value }))
    console.log(value)
  }, [form, dispatch])
  const back = useCallback(() => {
    dispatch(fieldActions.setEnumState({ show: ShowType.SELECT }))
  }, [dispatch])
  const buttonType: ReactNode[] = useMemo(() => [
    <Button type='primary' loading={loading} size='small' key='SELECT_SURE' id='SELECT_SURE' onClick={onFinish}>确定</Button>,
    <Button type='primary' size='small' key='SELECT_BACK' id='SELECT_BACK' onClick={back}>返回</Button>
  ], [onFinish, back, loading])
  useEffect(() => {
    setTitle(<HeadModule textLeft='选项配置-新建' buttonType={buttonType} />)
    console.log('setDataSource1')
    // TODO: error?
  }, [setTitle, buttonType])
  return (
    <Form
      layout='vertical'
      form={form}
      style={{ padding: '0 20px' }}
      initialValues={{ enumLists: [] }}
    >
      <Row>
        <Col span={24}>
          <Form.Item key='name' name='name' label='选项名称：' rules={[{ required: true, message: '选项名称不可为空！' }]}>
            <InputWithLength maxLength={20} />
          </Form.Item>
          <Form.Item key='statement' name='statement' label='选项说明：'>
            <Input.TextArea rows={5} maxLength={140} showCount />
          </Form.Item>
          <Form.Item
            key='enumList'
            name='enumList'
            label='选项配置：'
            rules={[
              { required: true, message: '选项配置不可为空！' },
              ({ getFieldValue }: any) => ({
                async validator (_, value) {
                  const configureArr = [...value]
                  const valueArr = [...new Set(value.map((item: ConfigureType) => (item.value)))]
                  if (valueArr.filter(item => !item).length > 0) {
                    return Promise.reject(new Error('选项配置值属性不可为空'))
                  }
                  if (valueArr.length < configureArr.length) {
                    return Promise.reject(new Error('选项配置值属性需唯一'))
                  }
                  return Promise.resolve()
                }
              })
            ]}
          >
            <Configure />
          </Form.Item>
        </Col>
      </Row>
    </Form>
  )
}

export default OptionCreate
