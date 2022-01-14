import { useState, useEffect } from 'react'
import { Button, Row, Col, Radio, Input, Form, Select, Checkbox } from 'antd'
import { DashOutlined } from '@ant-design/icons'
import OutAPIModal from '../Common/OutAPI'
import styles from './index.less'
import EditableTable from './attachParamTable'
import JsonEdit from './JsonEdit'
import useForceUpdate from '../Common/useForceUpdate'
import { POST_REQUEST } from '@/services/postServices'
import { EnumCallApiType, EnumInnerApi } from '../../constants'

const { externalPage } = POST_REQUEST
const { Option } = Select
interface propsType {
  form: any
  stepType: string
  [propsName: string]: any
}

const CallAPI = ({ form, ...props }: propsType) => {
  const { stepType } = props
  const [visible, setVisible] = useState(false)

  const { callApiType: radioValue = EnumCallApiType.INNER_API } = form.getFieldsValue()
  const forceUpdate = useForceUpdate()

  useEffect(() => {
    forceUpdate()
  }, [form, forceUpdate])

  const onRadioChange = (e: any) => {
    forceUpdate()
  }

  const UrlInput = (props: any) => {
    return (
      <div>
        <Input value={props.value?.name}
          disabled
          suffix={
            <Button type='primary' disabled={radioValue !== EnumCallApiType.EXTERNAL_API} onClick={() => setVisible(true)}>
              < DashOutlined />
            </Button>
          }
        />
        <OutAPIModal visible={visible} setVisible={setVisible} {...props} stepType={stepType} requestDispatch={externalPage} />
      </div>
    )
  }
  const innerURLOption = [
    { key: EnumInnerApi.DELETE, value: EnumInnerApi.DELETE, name: '删除数据' },
    { key: EnumInnerApi.EXPORT_DATA, value: EnumInnerApi.EXPORT_DATA, name: '导出数据' },
    { key: EnumInnerApi.IMPORT_DATA, value: EnumInnerApi.IMPORT_DATA, name: '导入数据' },
    { key: EnumInnerApi.CREATE_DATA, value: EnumInnerApi.CREATE_DATA, name: '新增数据' },
    { key: EnumInnerApi.UPDATE_SINGLE, value: EnumInnerApi.UPDATE_SINGLE, name: '更新单条数据' },
    { key: EnumInnerApi.UPDATE_MULTIPLE, value: EnumInnerApi.UPDATE_MULTIPLE, name: '更新多条数据' },
    { key: EnumInnerApi.SAVE, value: EnumInnerApi.SAVE, name: '保存数据(自动判断是更新单条数据、更新多条数据、新增数据)' }
  ]
  return (
    <>
      <Row>
        <Col span={24}>
          <Form.Item key='callApiType' name='callApiType' className={styles.changeForm} initialValue={EnumCallApiType.INNER_API} rules={[{ required: true, message: '请选择类型' }]}>
            <Radio.Group onChange={onRadioChange} >
              <Radio value={EnumCallApiType.INNER_API} key={EnumCallApiType.INNER_API}>
                标准服务:
              </Radio>
              <Form.Item dependencies={['callApiType']} key='innerApi' name='innerApi' className='operateType' rules={radioValue === EnumCallApiType.INNER_API ? [{ required: true, message: '请选择内部服务API!' }] : []}>
                <Select getPopupContainer={triggerNode => triggerNode.parentNode}
                  disabled={radioValue !== EnumCallApiType.INNER_API}
                  placeholder='请选择标准服务'
                >
                  {
                    innerURLOption.map(item => {
                      return <Option value={item.value} key={item.key}>{item.name}</Option>
                    })
                  }
                </Select>
              </Form.Item>
              <Radio value={EnumCallApiType.EXTERNAL_API} key={EnumCallApiType.EXTERNAL_API}>
                特殊服务:
              </Radio>
              <Form.Item dependencies={['callApiType']} key='externalApi' name='externalApi' className='outURL' rules={radioValue === EnumCallApiType.EXTERNAL_API ? [{ required: true, message: '请选择外部服务API!' }] : []}>
                <UrlInput disabled={radioValue !== EnumCallApiType.EXTERNAL_API}
                  visible={visible}
                  setVisible={setVisible}
                  stepType={stepType} />
              </Form.Item>
            </Radio.Group>
          </Form.Item>
        </Col>
        <Col span={24}>
          <Form.Item key='showError' name='showError' valuePropName='checked' initialValue={true}>
            <Checkbox>向用户展示API反馈的错误提示信息</Checkbox>
          </Form.Item>
        </Col>
        <Col span={24}>
          <Form.Item key='showSuccess' name='showSuccess' valuePropName='checked' initialValue={true}>
            <Checkbox>向用户展示API反馈的成功提示信息</Checkbox>
          </Form.Item>
        </Col>
        <Col span={24}>
          <Form.Item key='mergeData' name='mergeData' valuePropName='checked'>
            <Checkbox >允许将用户录入的前置表单数据值合并到当前提交的数据行上</Checkbox>
          </Form.Item>
        </Col>
        <Col span={24}>
          <Form.Item label='步骤说明:' name='statement'>
            <Input.TextArea rows={5} showCount maxLength={140} />
          </Form.Item>
        </Col>
        <Col span={24}>
          <span>接口附加参数：</span>
        </Col>
        <Col span={16}>
          <Form.Item key='setFieldValue' name='setFieldValue' label='字段取值:'>
            <EditableTable />
          </Form.Item>
        </Col>
        <Col span={16}>
          <Form.Item key='customParam' name='customParam' label='自定义参数:'>
            <JsonEdit />
          </Form.Item>
        </Col>
      </Row>
    </>
  )
}

export default CallAPI
