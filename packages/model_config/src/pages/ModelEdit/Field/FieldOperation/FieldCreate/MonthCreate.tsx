import { FC, useCallback, useState } from 'react'
import { Form, Row, Col } from 'antd'
import { EnumDefaultType, FIELD_CONFIG_COL_STYLE } from '../../fieldTypes/constants'
import { createControl } from '../../fieldTypes/createControl'
import { DataProps } from '../interface'

const Month: FC<DataProps> = (props) => {
  const { fields, form } = props
  const [dateType, setDateType] = useState<EnumDefaultType>(EnumDefaultType.NONE)

  const defaultTypeOnChange = useCallback((val: EnumDefaultType) => {
    setDateType(val)
    if (val === EnumDefaultType.SYSTEM) {
      form.setFieldsValue({ defaultValue: new Date().getMonth() + 1 })
    }
    if (val === EnumDefaultType.NONE) {
      form.setFieldsValue({ defaultValue: undefined })
    }
  }, [setDateType, form])

  return (
    <>
      <Row>
        <Col span={12} style={{ ...FIELD_CONFIG_COL_STYLE, borderRight: '1px solid #fbfbfb' }}>
          {
            fields.left.map((field: any) => {
              const control = createControl(field.control, field.config, field.props)
              const newProps: any = {}
              if (field.name === 'defaultType') {
                newProps.onChange = defaultTypeOnChange
              }
              return <Form.Item key={field.name} label={field.title} name={field.name}
                {...field.itemProps}
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
              // 将newProps的挂载于被Item所包的组件中
              const newProps: any = {}
              // 将newProps的挂载于被Item中
              const newItemProps: any = {}
              // 当字段类型为DATE时需对defaultValue做特殊处理，
              if (field.name === 'defaultValue') {
                newProps.disabled = dateType !== EnumDefaultType.FIXED
                newItemProps.dependencies = ['defaultType']
                newItemProps.rules = [
                  ({ getFieldValue }: any) => ({
                    async validator (_: any, value: any) {
                      console.log('form.getFieldValue', value, getFieldValue('defaultType'))
                      if (!value && getFieldValue('defaultType') === EnumDefaultType.FIXED) {
                        return await Promise.reject(new Error('固定月份需选择默认值'))
                      }
                      return await Promise.resolve()
                    },
                  })
                ]
              }
              return <Form.Item key={field.name} label={field.title} name={field.name}
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
        <Col span={24} style={FIELD_CONFIG_COL_STYLE}>
          {
            fields.foot.map((field: any) => {
              const control = createControl(field.control, field.config, field.props)
              // 对个别field做依赖处理
              return <Form.Item key={field.name} label={field.title} name={field.name}
                {...field.itemProps}>
                <control.type
                  {...control.props}
                />
              </Form.Item>
            })
          }
        </Col>
      </Row>
    </>
  )
}

export default Month
