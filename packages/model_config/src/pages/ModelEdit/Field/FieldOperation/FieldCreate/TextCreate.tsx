import { FC, useState } from 'react'
import { Form, Row, Col } from 'antd'
import { createControl } from '../../fieldTypes/createControl'
import { DataProps } from '../interface'
import { FIELD_CONFIG_COL_STYLE } from '../../fieldTypes/constants'

const TextCreate: FC<DataProps> = (props) => {
  const { fields } = props
  const [textLength, setTextLength] = useState<number>(0)

  return (
    <>
      <Row>
        <Col span={12} style={{ ...FIELD_CONFIG_COL_STYLE, borderRight: '1px solid #fbfbfb' }}>
          {
            fields.left.map((field: any) => {
              const control = createControl(field.control, field.config, field.props)
              // 将newProps的挂载于被Item中
              const newItemProps: any = {}
              const newProps: any = {}
              if (field.name === 'length') {
                newProps.onChange = (val: number) => setTextLength(val)
                newItemProps.dependencies = ['unique']
                newItemProps.rules = [
                  { required: true, message: '文本内容的最大长度不能为空' },
                  ({ getFieldValue }: any) => ({
                    async validator (_: any, value: any) {
                      if (value > 768 && getFieldValue('unique') === true) {
                        return await Promise.reject(new Error('取值唯一时最大长度限制为768'))
                      }
                      if (value > 16383) {
                        return await Promise.reject(new Error('文本内容的最大长度应为小于等于16383的整数'))
                      }
                      return await Promise.resolve()
                    },
                  })
                ]
              }
              return <Form.Item key={field.name} label={field.title} name={field.name} in
                {...field.itemProps}
                {...newItemProps}
              >
                <control.type
                  {...control.props}
                  {...newProps}
                />
              </Form.Item>
            })
          }
        </Col>
        <Col span={12} style={FIELD_CONFIG_COL_STYLE}>
          {
            fields.right.map((field: any) => {
              const control = createControl(field.control, field.config, field.props)
              return <Form.Item key={field.name} label={field.title} name={field.name}
                {...field.itemProps}
              >
                <control.type
                  {...control.props}
                />
              </Form.Item>
            })
          }
        </Col>
        <Col span={24} style={FIELD_CONFIG_COL_STYLE}>
          {
            fields.foot.map((field: any) => {
              const control = createControl(field.control, field.config, field.props)
              const newItemProps: any = {}
              const newProps: any = {}
              if (field.name === 'defaultValue') {
                newItemProps.rules = [
                  ({ getFieldValue }: any) => ({
                    async validator (_: any, value: any) {
                      newItemProps.dependencies = ['length']
                      const getTextLength = getFieldValue('length')
                      if (value && value.length > getTextLength && getTextLength) {
                        return await Promise.reject(new Error('默认值内容大于最大长度'))
                      }
                      return await Promise.resolve()
                    },
                  })
                ]
              }
              return <Form.Item key={`${field.name}-${textLength}`} label={field.title} name={field.name}
                {...field.itemProps}
                {...newItemProps}>
                <control.type
                  {...control.props}
                  {...newProps}
                />
              </Form.Item>
            })
          }
        </Col>
      </Row>
    </>
  )
}

export default TextCreate
