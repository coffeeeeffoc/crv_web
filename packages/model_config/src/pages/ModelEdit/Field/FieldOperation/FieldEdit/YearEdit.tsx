import { FC, useState } from 'react'
import { Form, Row, Col } from 'antd'
import { createControl } from '../../fieldTypes/createControl'
import { EnumDefaultType, FIELD_CONFIG_COL_STYLE } from '../../fieldTypes/constants'
import { DataEditProps } from '../interface'

const YearEdit: FC<DataEditProps> = (props) => {
  const { fields, fieldFormData, form } = props
  const [dateType, setDateType] = useState<EnumDefaultType>(fieldFormData.defaultType)

  console.log('year001', form.getFieldsValue().minValue)
  return (
    <>
      <Row>
        <Col span={12} style={{ ...FIELD_CONFIG_COL_STYLE, borderRight: '1px solid #fbfbfb' }}>
          {
            fields.left.map((field: any) => {
              const control = createControl(field.control, field.config, field.props)
              const newProps: any = {}
              if (field.name === 'defaultType') {
                newProps.onChange = (val: EnumDefaultType) => setDateType(val)
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
                newProps.dateType = dateType
                newProps.disabled = dateType !== EnumDefaultType.FIXED
                newItemProps.dependencies = ['defaultType']
                newItemProps.rules = [
                  ({ getFieldValue }: any) => ({
                    async validator (_: any, value: any) {
                      if (!value && getFieldValue('defaultType') === EnumDefaultType.FIXED) {
                        return await Promise.reject(new Error('固定年度需选择默认值'))
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
      {
        (fields.rows).map((row: any, index: number) => {
          const span = 24 / row.length
          return (
            <Row style={FIELD_CONFIG_COL_STYLE} key={`${index}-row`}>
              {
                row.map((field: any) => {
                  const control = createControl(field.control, field.config, field.props)
                  // 对个别field做依赖处理
                  const newProps: any = {}
                  const newItemProps: any = {}
                  if (field.name === 'minValue') {
                    newItemProps.dependencies = ['maxValue']
                    newItemProps.normalize = (value: any, prevValue: any, prevValues: any) => {
                      console.log('year', value, prevValue, prevValues)
                      return Number(value)
                    }
                    newProps.value = String(form.getFieldsValue().minValue ?? '')
                    newItemProps.rules = [
                      ({ getFieldValue }: any) => ({
                        async validator (_: any, value: any) {
                          if (value) {
                            const currencyMaxValue = getFieldValue('maxValue')
                            if (currencyMaxValue && value > currencyMaxValue) {
                              return await Promise.reject(new Error('最小取值不可大于最大取值'))
                            }
                          }
                          return await Promise.resolve()
                        }
                      })
                    ]
                  }
                  if (field.name === 'maxValue') {
                    newItemProps.dependencies = ['minValue']
                    newItemProps.rules = [
                      ({ getFieldValue }: any) => ({
                        async validator (_: any, value: any) {
                          if (value) {
                            const currencyMinValue = getFieldValue('minValue')
                            if (currencyMinValue && value < currencyMinValue) {
                              return await Promise.reject(new Error('最大取值不可小于最小取值'))
                            }
                          }
                          return await Promise.resolve()
                        }
                      })
                    ]
                  }
                  if (field.control === 'Divider') {
                    return (
                      <Col span={span} key={field.name}>
                        {createControl(field.control, field.config, field.props)}
                      </Col>)
                  }
                  return (
                    <Col span={span} key='lastCol'>
                      <Form.Item key={field.name} label={field.title} name={field.name}
                        {...field.itemProps}
                        {...newItemProps}>
                        <control.type
                          {...control.props}
                          {...newProps}
                        />
                      </Form.Item>
                    </Col>)
                })
              }
            </Row>
          )
        })
      }
    </>
  )
}

export default YearEdit
