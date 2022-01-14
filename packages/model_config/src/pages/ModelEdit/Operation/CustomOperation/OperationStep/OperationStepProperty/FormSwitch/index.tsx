import { useState, useEffect } from 'react'
import { Button, Radio, Input, Form } from 'antd'
import { DashOutlined } from '@ant-design/icons'
import styles from './index.less'
import OutAPIModal from '../Common/OutAPI'
import { useAppSelector } from '@/redux'
import useForceUpdate from '../Common/useForceUpdate'
import { POST_REQUEST } from '@/services/postServices'
import { EnumPageType, OperationType } from '../../constants'
import SwitchListOrFormItems from '../Common/SwitchListOrFormItems'
import InputWithLength from '@rc/ModuleUtils/ControlWithLength/InputWithLength'

const { externalApi } = POST_REQUEST

const ChangeForm = ({ form, ...props }: any) => {
  const { stepType } = props
  const { modelId: currentModel } = useAppSelector(state => state.modelEdit)
  const { pageType: radioValue } = form.getFieldsValue()
  const forceUpdate = useForceUpdate()
  const onRadioChange = (e: any) => {
    forceUpdate()
  }
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    forceUpdate()
  }, [form, forceUpdate])

  const UrlInput = (props: any) => {
    return (
      <div>
        <Input value={props.value?.name}
          disabled
          suffix={
            <Button type='primary' disabled={radioValue !== EnumPageType.EXTERNAL_PAGE} onClick={() => setVisible(true)}>
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
      <Form.Item key='pageType' name='pageType' initialValue={EnumPageType.INNER_PAGE} className={styles.formSwitch} rules={[{ required: true, message: '类型为必选项！' }]}>
        <Radio.Group onChange={onRadioChange} value={radioValue}>
          <Radio value={EnumPageType.INNER_PAGE} key={EnumPageType.INNER_PAGE}>
            切换到模型[表单/视图]
          </Radio>
          <SwitchListOrFormItems form={form} disabled={radioValue !== EnumPageType.INNER_PAGE} currentModel={currentModel} />
          <Radio value={EnumPageType.EXTERNAL_PAGE} key={EnumPageType.EXTERNAL_PAGE}>
            切换到外部URL
          </Radio>
          <Form.Item dependencies={['pageType']} key='externalPage' name='externalPage' label='外部页面链接:' className='outURL' rules={radioValue === EnumPageType.EXTERNAL_PAGE ? [{ required: true, message: '请选择外部页面链接!' }] : []}>
            <UrlInput />
          </Form.Item>
          {
            stepType !== OperationType.OPEN_TOP_TAB && (
              <Radio value={EnumPageType.GO_BACK} key={EnumPageType.GO_BACK}>
                返回上一个页面
              </Radio>
            )
          }
        </Radio.Group>
      </Form.Item>
      {
        stepType === OperationType.OPEN_TOP_TAB && (
          <Form.Item label='TAB页标题：' name='title'>
            <InputWithLength size='small' maxLength={20} />
          </Form.Item>
        )
      }
      <Form.Item label='步骤说明：' name='statement'>
        <Input.TextArea rows={5} showCount maxLength={140} />
      </Form.Item>
    </>
  )
}

export default ChangeForm
