import { FC, useEffect, useState } from 'react'
import { Form, Row, Col } from 'antd'
import { createControl } from '../../fieldTypes/createControl'
import { DataEditProps } from '../interface'
import { FIELD_CONFIG_COL_STYLE } from '../../fieldTypes/constants'

const IntegerEdit: FC<DataEditProps> = (props) => {
  const { fields, fieldFormData, DefaultField } = props
  const [integerDisable, setIntegerDisable] = useState<boolean>(false)
  useEffect(() => {
    if (DefaultField.includes(fieldFormData.id)) {
      setIntegerDisable(true)
    }
  }, [fieldFormData.id, DefaultField])

  return (
    <>
      <Row>
        <Col span={12} style={{ ...FIELD_CONFIG_COL_STYLE, borderRight: '1px solid #fbfbfb' }}>
          {
            fields.left.map((field: any) => {
              const control = createControl(field.control, field.config, field.props)
              // 将newProps的挂载于被Item所包的组件中
              const newProps: any = {}
              const newItemProps: any = {}
              if (field.name !== 'name') {
                newProps.disabled = integerDisable
              }
              if (field.name === 'defaultValue') {
                newItemProps.dependencies = ['minValue', 'maxValue']
                newItemProps.rules = [
                  ({ getFieldValue }: any) => ({
                    async validator (_: any, value: any) {
                      if (value) {
                        const currencyMinValue = Number(getFieldValue('minValue'))
                        const currencyMaxValue = Number(getFieldValue('maxValue'))
                        if (currencyMinValue && value < currencyMinValue) {
                          return await Promise.reject(new Error('默认值不可小于最小值'))
                        }
                        if (currencyMaxValue && value > currencyMaxValue) {
                          return await Promise.reject(new Error('默认值不可大于最大值'))
                        }
                      }
                      return await Promise.resolve()
                    }
                  })
                ]
              }
              return <Form.Item key={field.name} label={field.title} name={field.name}
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
        <Col span={12} style={FIELD_CONFIG_COL_STYLE} >
          {
            fields.right.map((field: any) => {
              const control = createControl(field.control, field.config, field.props)
              const newProps: any = {}
              newProps.disabled = integerDisable
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
      </Row>
      {
        (fields.rows).map((row: any, index: number) => {
          const span = 24 / row.length
          return (
            <Row style={FIELD_CONFIG_COL_STYLE} key={`${index}-row`}>
              {
                row.map((field: any, colIndex: number) => {
                  const control = createControl(field.control, field.config, field.props)
                  // 对个别field做依赖处理
                  const newProps: any = {}
                  const newItemProps: any = {}
                  if (field.name !== 'fieldStatement') {
                    newProps.disabled = integerDisable
                  }
                  if (field.name === 'minValue') {
                    newItemProps.dependencies = ['maxValue']
                    newItemProps.rules = [
                      ({ getFieldValue }: any) => ({
                        async validator (_: any, value: any) {
                          if (value) {
                            const currencyMaxValue = Number(getFieldValue('maxValue'))
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
                            const currencyMinValue = Number(getFieldValue('minValue'))
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
                    <Col span={span} key={`lastCol-${colIndex}-${index}`}>
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

export default IntegerEdit
