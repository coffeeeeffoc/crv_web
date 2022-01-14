import { Form, Radio, Checkbox, Input } from 'antd'

const CloseModal = ({ ...props }: any) => {
  console.info('CloseModal', props)
  return (
    <>
      <Form.Item label="关闭弹窗返回的状态为" name="returnState" initialValue={false}>
        <Radio.Group>
          <Radio value={true}>确定</Radio>
          <Radio value={false}>取消</Radio>
        </Radio.Group>
      </Form.Item>
      <Form.Item noStyle shouldUpdate={(prevValue, curValue) => prevValue.returnState !== curValue.returnState}>
        {({ getFieldValue }) => {
          const isShow = getFieldValue('returnState')
          return <div><b>提示：</b>关闭最后打开的弹窗，并且打开该弹窗的操作步骤的后续操作将会{isShow ? <b style={{ color: 'green' }}>继续</b> : <b style={{ color: 'red' }}>停止</b>}执行</div>
        }}
      </Form.Item>
      <Form.Item noStyle shouldUpdate={(prevValue, curValue) => prevValue.returnState !== curValue.returnState}>
        {({ getFieldValue }) => {
          const isShow = getFieldValue('returnState')
          return isShow
            ? (
              <Form.Item name="returnDataEnabled" valuePropName="checked">
                <Checkbox>关闭弹窗时返回表单数据</Checkbox>
              </Form.Item>
              )
            : null
        }}
      </Form.Item>
      <Form.Item label='步骤说明:' name='statement'>
        <Input.TextArea rows={5} showCount maxLength={140} />
      </Form.Item>
    </>
  )
}
export default CloseModal
