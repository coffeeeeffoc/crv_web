import { useState } from 'react'
import type { FC } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Button, Form, Row, Col, Spin } from 'antd'
import { modelFormRightFields, fields } from './fieldType'
import HeadModule from '@@/ModuleUtils/HeadModule'
import { POST_REQUEST } from '@/services/postServices'
import { BASE_ELEMENT } from '@/common/elementName'
// import { TabPropsType } from '@/interfaces/Common'

const { saveBase } = POST_REQUEST

const Base: FC<any> = (props) => {
  // const { modelId } = props
  const [form] = Form.useForm()
  const dispatch = useDispatch()
  const { loading, baseInfo } = useSelector((state: any) => state.modelEdit)
  const [visible, setVisible] = useState(baseInfo?.stringId)

  const onFinish = async (value: any) => {
    // 保存
    const values = { ...value, version: baseInfo.version }
    dispatch(saveBase({ model: { ...values } }))
  }

  const stringChange = (val: any) => {
    setVisible(val.target.checked)
    if (!val.target.checked) form.setFieldsValue({ idLength: undefined })
  }
  // headModule的按钮类型，数组遍历
  const buttonType = [
    <Button key={BASE_ELEMENT.SAVE} type='primary' htmlType='submit' loading={loading} id={BASE_ELEMENT.SAVE}>保存</Button>
  ]

  return (
    <Spin spinning={loading}>
      <Form
        layout='vertical'
        form={form}
        onFinish={onFinish}
        initialValues={baseInfo}
      >
        <HeadModule buttonType={buttonType} />
        <Row>
          <Col span={12} style={{ paddingRight: 50, borderRight: '1px solid #fbfbfb' }}>
            {
              (fields as any).map((field: any) => {
                const newItemProps: any = {}
                const newProps: any = {}
                // stringId和idLength做依赖
                if (field.name === 'stringId') {
                  newProps.onChange = stringChange
                }
                if (field.name === 'idLength') {
                  newProps.disabled = !visible
                  newItemProps.dependencies = ['stringId']
                  if (visible) {
                    newItemProps.rules = [{ required: true, message: 'ID字段长度为必填选项' },
                      { min: 1, max: 768, type: 'integer', message: 'ID字段的长度应大于0小于等于768' }]
                  }
                }
                return <Form.Item key={field.name}
                  label={field.title} name={field.name}
                  {...field.itemProps}
                  {...newItemProps}>
                  <field.control.type
                    {...field.control.props}
                    {...newProps}
                  />
                </Form.Item>
              })
            }
          </Col>
          <Col span={12} style={{ paddingLeft: '50px' }}>
            {
              // 遍历右侧复选框数据
              modelFormRightFields.map(field => <Form.Item key={field.name} label={field.title} name={field.name} {...field.itemProps}>{field.control}</Form.Item>)
            }
          </Col>
        </Row>
      </Form>
    </Spin>
  )
}
export default Base
