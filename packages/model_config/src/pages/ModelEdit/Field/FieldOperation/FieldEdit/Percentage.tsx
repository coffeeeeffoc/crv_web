import { FC, useState } from 'react'
import { Form, Row, Col } from 'antd'
import { createControl } from '../../fieldTypes/createControl'
import { reNumberCount, reDecimalCount } from '@utils/utilFunc/utilTransform'
import { DataEditProps } from '../interface'
import { FIELD_CONFIG_COL_STYLE } from '../../fieldTypes/constants'

const CurrencyEdit: FC<DataEditProps> = (props) => {
  const { fields, fieldFormData } = props
  const [currencyLength, setCurrencyLength] = useState<number>(fieldFormData.length)
  const [decimalDigits, setDecimalDigits] = useState<number>(fieldFormData.decimalDigits)

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
              if (field.name === 'defaultValue') {
                newItemProps.dependencies = ['length', 'decimalDigits', 'minValue', 'maxValue']
                newItemProps.rules = [
                  ({ getFieldValue }: any) => ({
                    async validator (_: any, value: any) {
                      if (value) {
                        const currencyLength = getFieldValue('length') ?? 0
                        const currencyDecimalDigits = getFieldValue('decimalDigits') ?? 0
                        const currencyMinValue = getFieldValue('minValue')
                        const currencyMaxValue = getFieldValue('maxValue')
                        const numberCount = reNumberCount(String(value))
                        const decimalCunt = reDecimalCount(value)
                        if (decimalCunt > currencyDecimalDigits || numberCount > currencyLength || numberCount - decimalCunt > currencyLength - currencyDecimalDigits) {
                          return await Promise.reject(new Error('小数位数或整位数错误'))
                        }
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
      </Row>
      {
        (fields.rows).map((row: any, index: number) => {
          const span = 24 / row.length
          return (
            <Row style={FIELD_CONFIG_COL_STYLE} key={`${index}-row`}>
              {
                row.map((field: any, colIndex: any) => {
                  const control = createControl(field.control, field.config, field.props)
                  // 对个别field做依赖处理
                  const newProps: any = {}
                  const newItemProps: any = {}
                  if (field.name === 'length') {
                    newProps.onChange = (val: number) => setCurrencyLength(val)
                  }
                  // 字段小数位数的依赖关系
                  if (field.name === 'decimalDigits') {
                    newProps.onChange = (val: number) => setDecimalDigits(val)
                    newItemProps.dependencies = ['length']
                    newItemProps.rules = [
                      { required: true, message: '小数位数不能为空' },
                      { min: 2, max: currencyLength > 28 ? 28 : currencyLength, type: 'integer', message: `小数位数应为整数且应大于等于2,小于等于${currencyLength > 28 ? 28 : '字段长度'}` }
                    ]
                  }
                  // 小数位数的依赖关系
                  if (field.name === 'showDigits') {
                    newItemProps.dependencies = ['decimalDigits']
                    newItemProps.rules = [
                      { max: decimalDigits, type: 'integer', message: `显示小数位数应为整数且小于等于${decimalDigits < 28 ? '字段小数位数' : 28}` }
                    ]
                  }
                  if (field.name === 'minValue') {
                    newItemProps.dependencies = ['length', 'decimalDigits', 'maxValue']
                    newItemProps.rules = [
                      ({ getFieldValue }: any) => ({
                        async validator (_: any, value: any) {
                          if (value) {
                            const currencyLength = getFieldValue('length') ?? 0
                            const currencyDecimalDigits = getFieldValue('decimalDigits') ?? 0
                            const currencyMaxValue = getFieldValue('maxValue')
                            const numberCount = reNumberCount(String(value))
                            const decimalCunt = reDecimalCount(value)
                            if (decimalCunt > currencyDecimalDigits || numberCount > currencyLength || numberCount - decimalCunt > currencyLength - currencyDecimalDigits) {
                              return await Promise.reject(new Error('小数位数或整位数错误'))
                            }
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
                    newItemProps.dependencies = ['length', 'decimalDigits', 'minValue']
                    newItemProps.rules = [
                      ({ getFieldValue }: any) => ({
                        async validator (_: any, value: any) {
                          if (value) {
                            const currencyLength = getFieldValue('length') ?? 0
                            const currencyDecimalDigits = getFieldValue('decimalDigits') ?? 0
                            const currencyMinValue = getFieldValue('minValue')
                            const numberCount = reNumberCount(String(value))
                            const decimalCunt = reDecimalCount(value)
                            if (decimalCunt > currencyDecimalDigits || numberCount > currencyLength || numberCount - decimalCunt > currencyLength - currencyDecimalDigits) {
                              return await Promise.reject(new Error('小数位数或整位数错误'))
                            }
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

export default CurrencyEdit
