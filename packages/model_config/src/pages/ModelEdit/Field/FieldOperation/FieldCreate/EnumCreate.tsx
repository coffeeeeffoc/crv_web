import { FC, useEffect, useMemo, useState } from 'react'
import { DataProps } from '../interface'
import { Form, Row, Col } from 'antd'
import { createControl } from '../../fieldTypes/createControl'
import { FIELD_CONFIG_COL_STYLE } from '../../fieldTypes/constants'

interface ConfigureType {
  value: string
  name: string
}

interface RecordType {
  id?: string
  name?: string
  statement?: string
  enumList: ConfigureType[]
}

const EnumCreate: FC<DataProps> = (props) => {
  const { fields, form } = props
  const [enumConfigure, setEnumConfigure] = useState<RecordType>({ enumList: [] })

  useEffect(() => {
    form.setFieldsValue({ defaultItem: enumConfigure?.enumList?.[0]?.value })
  }, [enumConfigure.enumList, form])

  const configOptions = useMemo(() => ({
    options: enumConfigure.enumList?.map(enumList => ({
      value: enumList.value,
      text: `${enumList.name}(${enumList.value})`
    }))
  }), [enumConfigure.enumList])

  return (
    <>
      <Row>
        <Col span={12} style={{ ...FIELD_CONFIG_COL_STYLE, borderRight: '1px solid #fbfbfb' }}>
          {
            fields.left.map((field: any) => {
              const control = createControl(field.control, { ...field.config, ...configOptions }, field.props)
              // mount newItemProps to the form.item
              const newItemProps: any = {}
              const newProps: any = {}
              if (field.name === 'enumConfig') {
                newProps.onChange = (val: any) => setEnumConfigure(val)
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
    </>
  )
}

export default EnumCreate
