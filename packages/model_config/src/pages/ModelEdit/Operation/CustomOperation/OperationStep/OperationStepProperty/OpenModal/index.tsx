import { useState } from 'react'
import { Form, Radio, Checkbox, Input, Button } from 'antd'
import { DashOutlined } from '@ant-design/icons'
import { useAppSelector } from '@/redux'
import OutAPIModal from '../Common/OutAPI'
import { EnumPageType } from '../../constants'
import CloseModal from './CloseModal'
import { POST_REQUEST } from '@/services/postServices'
import useForceUpdate from '../Common/useForceUpdate'
import CssWidthHeightInput from '@/components/CssWidthHeightInput'
import SwitchListOrFormItems from '../Common/SwitchListOrFormItems'
import InputWithLength from '@rc/ModuleUtils/ControlWithLength/InputWithLength'
import styles from '../FormSwitch/index.less'
export { CloseModal }

const { externalApi } = POST_REQUEST

const OpenModal = ({ form, stepType, ...props }: any) => {
  const { modelId: currentModel } = useAppSelector(state => state.modelEdit)
  const { pageType: radioValue } = form.getFieldsValue()

  const [visible, setVisible] = useState<boolean>(false)
  const forceUpdate = useForceUpdate()

  const UrlInput = (props: any) => {
    return (
      <div>
        <Input value={props.value?.name}
          style={{ padding: 0 }}
          disabled
          suffix={
            <Button type='primary' style={{ margin: 0, border: 0, borderLeft: '1px solid #d9d9d9' }} disabled={radioValue !== EnumPageType.EXTERNAL_PAGE} onClick={() => setVisible(true)}>
              < DashOutlined />
            </Button>
          }
        />
        <OutAPIModal visible={visible} setVisible={setVisible} {...props} stepType={stepType} requestDispatch={externalApi} />
      </div>
    )
  }

  return (
    <>
      <Form.Item key='pageType' name='pageType' className={styles.formSwitch} initialValue={EnumPageType.INNER_PAGE} rules={[{ required: true, message: '类型为必选项！' }]}>
        <Radio.Group onChange={(e: any) => forceUpdate()}>
          <Radio value={EnumPageType.INNER_PAGE} key={EnumPageType.INNER_PAGE}>
            切换到模型[表单/视图]
          </Radio>
          <SwitchListOrFormItems form={form} disabled={radioValue !== EnumPageType.INNER_PAGE} currentModel={currentModel} />
          <Radio value={EnumPageType.EXTERNAL_PAGE} key={EnumPageType.EXTERNAL_PAGE}>
            在弹窗打开外部页面
          </Radio>
          <Form.Item dependencies={['pageType']} key='externalPage' name='externalPage' label='外部页面链接:' className='outURL' rules={radioValue === EnumPageType.EXTERNAL_PAGE ? [{ required: true, message: '请选择外部页面链接!' }] : []}>
            <UrlInput />
          </Form.Item>
          {/* </div> */}
          <Form.Item key='width' name='width' label='弹窗宽度:' initialValue='50%' rules={[{ required: true, message: '请填写弹窗宽度!' }]}>
            <CssWidthHeightInput style={{ width: '50%' }} />
          </Form.Item>
          <Form.Item key='height' name='height' label='弹窗高度:' initialValue='400px' rules={[{ required: true, message: '请填写弹窗高度!' }]}>
            <CssWidthHeightInput style={{ width: '50%' }} />
          </Form.Item>
          <Form.Item key='title' name='title' label='弹窗标题:' rules={[{ required: true, message: '请填写弹窗标题!' }]}>
            <InputWithLength maxLength={20} size='small' style={{ width: '50%' }} />
          </Form.Item>
          <Form.Item key='maskClosable' name='maskClosable' valuePropName='checked' initialValue={false} >
            <Checkbox>点击弹窗外部的阴影区域自动关闭弹窗</Checkbox>
          </Form.Item>
        </Radio.Group>
      </Form.Item>
      <Form.Item label='步骤说明:' name='statement'>
        <Input.TextArea rows={5} showCount maxLength={140} />
      </Form.Item>
    </>
  )
}

export default OpenModal
