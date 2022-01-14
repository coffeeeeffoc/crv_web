import { FC, ReactNode, useCallback, useEffect, useMemo } from 'react'
import HeadModule from '@@/ModuleUtils/HeadModule'
import { Form, Row, Col, Button, Input } from 'antd'
import { ShowType } from '@/common/constant'
import InputWithLength from '@rc/ModuleUtils/ControlWithLength/InputWithLength'
import Configure from './ConfigureTable'
import { useDispatch, useSelector } from 'react-redux'
import { fieldActions } from '@redux/actions'
import { POST_REQUEST } from '@/services/postServices'
import { ConfigureType } from './interface'

const { updateOption } = POST_REQUEST

interface OptionPropsType {
  setTitle: (value: ReactNode) => void
  // 编辑数据
  editData: {}
}

const OptionEdit: FC<OptionPropsType> = ({
  setTitle,
  editData
}) => {
  const [form] = Form.useForm()
  const dispatch = useDispatch()
  const { enumOption: { loading } } = useSelector((state: any) => state.field)
  const onFinish = useCallback(async () => {
    const value = await form.validateFields()
    // TODO: need add edit api
    dispatch(updateOption({ ...editData, ...value }))
    dispatch(fieldActions.setEnumState({ show: ShowType.SELECT }))
  }, [form, dispatch, editData])
  const back = useCallback(() => {
    dispatch(fieldActions.setEnumState({ show: ShowType.SELECT }))
  }, [dispatch])
  const buttonType: ReactNode[] = useMemo(() => [
    <Button type='primary' size='small' loading={loading} key='SELECT_SURE' id='SELECT_SURE' onClick={onFinish}>确定</Button>,
    <Button type='primary' size='small' key='SELECT_BACK' id='SELECT_BACK' onClick={back}>返回</Button>
  ], [onFinish, back, loading])
  useEffect(() => {
    setTitle(<HeadModule textLeft='选项配置-编辑' buttonType={buttonType} />)
  }, [setTitle, buttonType])
  return (
    <Form
      layout='vertical'
      form={form}
      // onFinish={onFinish}
      initialValues={editData}
      style={{ padding: '0 20px' }}
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

export default OptionEdit
