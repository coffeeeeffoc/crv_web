import { FC } from 'react'
import { Form, Row, Col, Select, Input } from 'antd'
import { useAppSelector } from '@/redux'
import InputWithLength from '@rc/ModuleUtils/ControlWithLength/InputWithLength'
import { DataProps } from '../interface'
import { FIELD_CONFIG_COL_STYLE, formulaResultType } from '../../fieldTypes/constants'
import InputCalculation from '@/components/ModuleUtils/RewriteControl/InputCalculation'
import { FIELD_RULES, NAME_RULES } from '@/common/checkInfo/checkInfo'

const Formula: FC<DataProps> = (props) => {
  const { baseInfo: { fields = [] } } = useAppSelector(state => state.modelEdit)

  return (
    <>
      <Row>
        <Col span={12} style={{ ...FIELD_CONFIG_COL_STYLE, borderRight: '1px solid #fbfbfb' }}>
          <Form.Item key='id' label='名称：' name='id' rules={FIELD_RULES}>
            <InputWithLength maxLength={32} placeholder='请输入名称' />
          </Form.Item>
          <Form.Item key='name' label='显示名称' name='name' rules={NAME_RULES}>
            <InputWithLength maxLength={20} placeholder='请输入显示名称' />
          </Form.Item>
        </Col>
        <Col span={24} style={FIELD_CONFIG_COL_STYLE}>
          <Form.Item key='formula' name='formula' label='计算公式：'
            rules={[{ required: true, message: '计算公式不能为空' }]}>
            <InputCalculation fieldItems={fields}/>
          </Form.Item>
        </Col>
        <Col span={12} style={{ padding: '0 51px 0 50px' }}>
          <Form.Item key='type' name='resultType' label='结果类型：'
            rules={[{ required: true, message: '需要选择结果类型' }]}
            initialValue={formulaResultType[0].value}
          >
            <Select placeholder='请选择类型'>
              {
                formulaResultType.map(({ value, label }) => <Select.Option value={value} key={value}>{label}</Select.Option>)
              }
            </Select>
          </Form.Item>
        </Col>
        <Col span={24} style={FIELD_CONFIG_COL_STYLE}>
          <Form.Item key='fieldStatement' name='fieldStatement' label='字段说明：'>
            <Input.TextArea rows={5} showCount maxLength={140} />
          </Form.Item>
        </Col>
      </Row>
    </>
  )
}

export default Formula
