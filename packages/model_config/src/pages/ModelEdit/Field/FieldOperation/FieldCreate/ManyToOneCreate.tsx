import { FC, useEffect, useState, useCallback } from 'react'
import { Form, Row, Col, Select, Checkbox, Input } from 'antd'
import { useSelector, useDispatch } from 'react-redux'
import { POST_REQUEST } from '@/services/postServices'
import InputWithLength from '@rc/ModuleUtils/ControlWithLength/InputWithLength'
import SelectResponse from '@@/ModuleUtils/RewriteControl/SelectResponse'
import { associateFieldType } from '@/common/constant'
import { FieldItemType } from '../../fieldTypes/interface'
import { DataProps } from '../interface'
import { debounce } from 'lodash'
import { FIELD_CONFIG_COL_STYLE } from '../../fieldTypes/constants'
import { FIELD_RULES, NAME_RULES } from '@/common/checkInfo/checkInfo'

const { refModel: modelRequest, refModelField: fieldRequest } = POST_REQUEST
const { Option } = Select

const ManyToOneCreate: FC<DataProps> = (props) => {
  const { form } = props
  const dispatch = useDispatch()
  const { refModel: { list: modelItems, loading: modelLoading, total }, refModelField: { list: fieldItems, loading: fieldLoading } } = useSelector((state: any) => state.field)
  const [page, setPage] = useState<number>(1)
  const [retrieveCondition, setRetrieveCondition] = useState<string>('')
  const [modelValue, setModelValue] = useState<string>('')

  useEffect(() => {
    dispatch(modelRequest({ pagination: { page: page, pageSize: 15 }, filter: { retrieveCondition: retrieveCondition } }))
  }, [page, retrieveCondition, dispatch])

  useEffect(() => {
    if (modelValue && modelValue.length > 0) {
      dispatch(fieldRequest({ modelId: modelValue, baseInfo: false, fields: [] }))
    }
  }, [modelValue, dispatch])

  useEffect(() => {
    if (fieldItems.length > 0) {
      form.setFieldsValue({ refModelField: 'id' })
    } else {
      form.setFieldsValue({ refModelField: undefined })
    }
  }, [fieldItems, form])

  const refModelOnChange = useCallback((e) => {
    setModelValue(e)
    setRetrieveCondition('')
    setPage(1)
  }, [])

  const refModelOnSearch = useCallback((e: string) => {
    setRetrieveCondition(e)
    setPage(1)
  }, [])

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
          <Form.Item key='refModel' label='关联表：' name='refModel' rules={[{ required: true, message: '关联表不可为空' }]}>
            <SelectResponse
              items={modelItems}
              // items={modelItems.filter((modelItem: FieldItemType) => modelItem.id !== modelId)}
              selectLoading={modelLoading}
              placeholder='请选择关联表'
              onSearch={debounce(refModelOnSearch, 500)}
              // onSearch={(e: string) => {deBounce(setRetrieveCondition(e), 24000); setPage(1)}}
              setModelValue={refModelOnChange}
              setPage={setPage}
              page={page}
              total={total}
            />
          </Form.Item>
          <Form.Item
            key='refModelField'
            label='关联字段：'
            name='refModelField'
            rules={[{ required: true, message: '关联字段不可为空' }]}>
            <Select loading={fieldLoading} showSearch placeholder='请选择关联字段'>
              {
                fieldItems.filter((field: FieldItemType) => !associateFieldType.includes(field.fieldType)).map((item: any) => {
                  return <Option key={item.id} value={item.id}>{`${item.name ?? item.id}(${item.id})`}</Option>
                })
              }
            </Select>
          </Form.Item>
        </Col>
        <Col span={12} style={FIELD_CONFIG_COL_STYLE}>
          <Form.Item key='unique' name='unique' label=' ' initialValue={false} valuePropName='checked'>
            <Checkbox>取值唯一</Checkbox>
          </Form.Item>
          <Form.Item key='required' name='required' label=' ' initialValue={false} valuePropName='checked'>
            <Checkbox>是否必填</Checkbox>
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

export default ManyToOneCreate
