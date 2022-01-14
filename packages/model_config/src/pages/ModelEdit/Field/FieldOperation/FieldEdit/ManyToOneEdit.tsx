import { FC, useCallback, useEffect, useState, useMemo } from 'react'
import { Form, Row, Col, Select, Checkbox, Input } from 'antd'
import { useSelector, useDispatch } from 'react-redux'
import { POST_REQUEST } from '@/services/postServices'
import InputWithLength from '@rc/ModuleUtils/ControlWithLength/InputWithLength'
import SelectResponse from '@@/ModuleUtils/RewriteControl/SelectResponse'
import { FieldType } from '@/common/constant'
import InputCalculation from '@@/ModuleUtils/RewriteControl/InputCalculation'
import { usePrevious } from '@/hooks/usePrevious'
import { DataEditProps } from '../interface'
import { debounce } from 'lodash'
import { FIELD_CONFIG_COL_STYLE } from '../../fieldTypes/constants'
import { FIELD_RULES, NAME_RULES } from '@/common/checkInfo/checkInfo'

const { refModel: modelRequest, refModelField: fieldRequest } = POST_REQUEST
const { Option } = Select

const ManyToOneEdit: FC<DataEditProps> = (props) => {
  const { fieldFormData, form } = props
  const dispatch = useDispatch()
  const { refModel: { list: modelItems, loading: modelLoading, total }, refModelField: { list: fieldItems, loading: fieldLoading } } = useSelector((state: any) => state.field)
  const [page, setPage] = useState<number>(1)
  const [retrieveCondition, setRetrieveCondition] = useState<string>(fieldFormData.refModel)
  const [modelValue, setModelValue] = useState<string>(fieldFormData?.refModel)
  const isBeforeModel = modelValue !== usePrevious(modelValue)
  const disable = useMemo(() => fieldFormData.id?.[0] === '_', [fieldFormData.id])

  useEffect(() => {
    dispatch(modelRequest({ pagination: { page: page, pageSize: 15 }, filter: { retrieveCondition: retrieveCondition } }))
  }, [page, retrieveCondition, dispatch])

  useEffect(() => {
    dispatch(fieldRequest({ modelId: modelValue, baseInfo: false, fields: [] }))
  }, [modelValue, dispatch])

  useEffect(() => {
    // 当关联表变化的时候
    if (isBeforeModel) {
      // 重置内容显示格式
      form.setFieldsValue({ showFormat: undefined })
      form.setFieldsValue({ refModelField: fieldItems.length > 0 ? 'id' : undefined })
    }
  }, [fieldItems, form, isBeforeModel])

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
          <Form.Item key='id' label='名称：' name='id' rules={disable ? [] : FIELD_RULES}>
            <InputWithLength maxLength={32} disabled={disable} />
          </Form.Item>
          <Form.Item key='name' label='显示名称' name='name' rules={NAME_RULES}>
            <InputWithLength maxLength={20} placeholder='请输入显示名称' />
          </Form.Item>
          <Form.Item key='refModel' label='关联表：' name='refModel' rules={[{ required: true, message: '关联表不可为空' }]}>
            <SelectResponse
              items={modelItems}
              selectLoading={modelLoading}
              placeholder='请选择关联表'
              onSearch={debounce(refModelOnSearch, 500)}
              setModelValue={refModelOnChange}
              setPage={setPage}
              page={page}
              total={total}
              disabled={disable}
            />
          </Form.Item>
          <Form.Item
            key='refModelField'
            label='关联字段：'
            name='refModelField'
            rules={[{ required: true, message: '关联字段不可为空' }]}>
            <Select loading={fieldLoading} disabled={disable} showSearch placeholder='请选择关联字段'>
              {
                fieldItems.filter((field: any) => field.fieldType !== FieldType.MANY_TO_ONE && field.fieldType !== FieldType.MANY_TO_ONE && field.fieldType !== FieldType.ONE_TO_MANY).map((item: any) => {
                  return <Option key={item.id} value={item.id}>{`${item.name ?? item.id}(${item.id})`}</Option>
                })
              }
            </Select>
          </Form.Item>
        </Col>
        <Col span={12} style={FIELD_CONFIG_COL_STYLE}>
          <Form.Item key='unique' name='unique' label=' ' valuePropName='checked'>
            <Checkbox disabled={disable}>取值唯一</Checkbox>
          </Form.Item>
          <Form.Item key='required' name='required' label=' ' initialValue={false} valuePropName='checked'>
            <Checkbox disabled={disable}>是否必填</Checkbox>
          </Form.Item>
        </Col>
        <Col span={24} style={FIELD_CONFIG_COL_STYLE}>
          <Form.Item key='showFormat' name='showFormat' label='内容显示格式' help='如果不设置，则默认取name字段的值，如果没有name字段则取关联字段的值'>
            <InputCalculation fieldItems={fieldItems} disabled={disable} />
          </Form.Item>
          <Form.Item key='fieldStatement' name='fieldStatement' label='字段说明：'>
            <Input.TextArea rows={5} showCount maxLength={140} />
          </Form.Item>
        </Col>
      </Row>
    </>
  )
}

export default ManyToOneEdit
