import { FC, useEffect, useState, useMemo, useCallback } from 'react'
import { Form, Row, Col, Input, AutoComplete } from 'antd'
import { useSelector, useDispatch } from 'react-redux'
import { POST_REQUEST } from '@/services/postServices'
import InputWithLength from '@rc/ModuleUtils/ControlWithLength/InputWithLength'
import SelectResponse from '@@/ModuleUtils/RewriteControl/SelectResponse'
import { FieldType } from '@/common/constant'
import InputCalculation from '@@/ModuleUtils/RewriteControl/InputCalculation'
import { FieldItemType } from '../../fieldTypes/interface'
import { usePrevious } from '@/hooks/usePrevious'
import { DataEditProps } from '../interface'
import { debounce } from 'lodash'
import { FIELD_CONFIG_COL_STYLE } from '../../fieldTypes/constants'
import { FIELD_RULES, NAME_RULES } from '@/common/checkInfo/checkInfo'

const { refModel: modelRequest, refModelField: fieldRequest } = POST_REQUEST

const ManyToManyEdit: FC<DataEditProps> = (props) => {
  const { fieldFormData, form } = props
  const dispatch = useDispatch()
  const { modelId } = useSelector((state: any) => state.modelEdit)
  const { refModel: { list: modelItems, loading: modelLoading, total }, refModelField: { list: fieldItems } } = useSelector((state: any) => state.field)
  const [page, setPage] = useState<number>(1)
  const [retrieveCondition, setRetrieveCondition] = useState<string>('')
  const [modelValue, setModelValue] = useState<string>(fieldFormData?.refModel)
  const isBeforeModel = modelValue !== usePrevious(modelValue)

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
    }
  }, [isBeforeModel, form])

  const refGroupArr = useMemo(() => {
    const refGroupSt: any[] = []
    fieldItems.forEach((field: FieldItemType) => {
      if (field.fieldType === FieldType.MANY_TO_ONE) {
        refGroupSt.push(field.refGroup)
      }
    })
    return [...new Set(refGroupSt)].map((item: any) => ({ value: item }))
  }, [fieldItems])

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
            <InputWithLength maxLength={32} disabled={true} />
          </Form.Item>
          <Form.Item key='name' label='显示名称' name='name' rules={NAME_RULES}>
            <InputWithLength maxLength={20} placeholder='请输入显示名称' />
          </Form.Item>
          <Form.Item key='refModel' label='关联表：' name='refModel' rules={[{ required: true, message: '关联表不可为空' }]}>
            <SelectResponse
              items={modelItems.filter((modelItem: FieldItemType) => modelItem.id !== modelId)}
              selectLoading={modelLoading}
              placeholder='请选择关联表'
              onSearch={debounce(refModelOnSearch, 500)}
              setModelValue={refModelOnChange}
              setPage={setPage}
              page={page}
              total={total}
            />
          </Form.Item>
          <Form.Item
            key='refGroup'
            label='关联分组标志：'
            name='refGroup'
            rules={[{ max: 10, type: 'string', message: '关联分组标志应小于10个字符' }]}
          >
            <AutoComplete options={refGroupArr} placeholder='请选择或输入分组' allowClear showSearch />
          </Form.Item>
        </Col>
        <Col span={24} style={FIELD_CONFIG_COL_STYLE}>
          <Form.Item key='showFormat' name='showFormat' label='内容显示格式' help='如果不设置，则默认取name字段的值，如果没有name字段则取关联表id的值'>
            <InputCalculation fieldItems={fieldItems} />
          </Form.Item>
          <Form.Item key='fieldStatement' name='fieldStatement' label='字段说明：'>
            <Input.TextArea rows={5} showCount maxLength={140} />
          </Form.Item>
        </Col>
      </Row>
    </>
  )
}

export default ManyToManyEdit
