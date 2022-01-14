import { FC, useState } from 'react'
import { Form, Row, Col } from 'antd'
import { createControl } from '../../fieldTypes/createControl'
import { reNumberCount, reDecimalCount } from '@utils/utilFunc/utilTransform'
import { DataProps } from '../interface'
import { FIELD_CONFIG_COL_STYLE } from '../../fieldTypes/constants'

const CurrencyCreate: FC<DataProps> = (props) => {
  const { fields } = props
  const [length, setLength] = useState(27)

  return (
    <>
      <Row>
        <Col span={12} style={{ ...FIELD_CONFIG_COL_STYLE, borderRight: '1px solid #fbfbfb' }}>
          {
            fields.left.map((field: any) => {
              const control = createControl(field.control, field.config, field.props)
              // 将newProps的挂载于被Item所包的组件中
              const newProps: any = {}
              if (field.name === 'length') {
                newProps.onChange = (val: number) => setLength(val)
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
              if (field.name === 'decimalDigits') {
                newItemProps.dependencies = ['length']
                newItemProps.rules = [
                  { required: true, message: '小数位数不能为空' },
                  { min: 2, max: length > 27 ? 27 : length, type: 'integer', message: `小数位数应为整数且应大于等于2,小于等于${length > 27 ? 27 : '字段长度'}` }
                ]
              }
              if (field.name === 'defaultValue') {
                newItemProps.dependencies = ['length', 'decimalDigits']
                newItemProps.rules = [
                  ({ getFieldValue }: any) => ({
                    async validator (_: any, value: any) {
                      if (value) {
                        const currencyLength = getFieldValue('length') ?? 0
                        const currencyDecimalDigits = getFieldValue('decimalDigits') ?? 0
                        const numberCount = reNumberCount(String(value))
                        const decimalCunt = reDecimalCount(value)
                        console.log('decimalCunt', numberCount, numberCount)
                        if (decimalCunt > currencyDecimalDigits || numberCount > currencyLength || numberCount - decimalCunt > currencyLength - currencyDecimalDigits) {
                          return await Promise.reject(new Error('小数位数或整位数错误'))
                        }
                      }
                      return await Promise.resolve()
                    }
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

export default CurrencyCreate
