import { Form, Input, Checkbox } from 'antd'
import InputWithLength from '@rc/ModuleUtils/ControlWithLength/InputWithLength'

const PopConfirm = () => {
  return (
    <>
      <Form.Item label="请输入标题" name="title" initialValue="提示" >
        <InputWithLength placeholder="请输入标题" maxLength={20}/>
      </Form.Item>
      <Form.Item label="请输入提示信息" name="content" rules={[{ required: true, message: '标题为必填项' }]}>
        <Input.TextArea placeholder="请输入提示内容" rows={3} showCount maxLength={140}/>
      </Form.Item>
      <Form.Item label="确定按钮文字" name="okText" rules={[{ required: true, message: '确定按钮标题为必填项' }]} initialValue='确定'>
        <InputWithLength placeholder="请输入确定按钮文字" maxLength={20}/>
      </Form.Item>
      <Form.Item name="cancelBtnVisible" valuePropName="checked">
        <Checkbox>显示取消按钮</Checkbox>
      </Form.Item>
      <Form.Item noStyle shouldUpdate={(prevValue, curValue) => prevValue.cancelBtnVisible !== curValue.cancelBtnVisible}>
        {({ getFieldValue }) => {
          const isShow = getFieldValue('cancelBtnVisible')
          return isShow
            ? (
              <Form.Item label="取消按钮文字" name="cancelText" initialValue="取消" rules={[{ required: !!isShow, message: '取消按钮标题为必填项' }]}>
                <InputWithLength placeholder="请输入取消按钮文字" maxLength={20}/>
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

export default PopConfirm
