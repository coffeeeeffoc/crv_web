import { FC, useEffect, useState, useMemo, useCallback } from 'react'
import { Form, Row, Col, AutoComplete, Input } from 'antd'
import { useSelector, useDispatch } from 'react-redux'
import { POST_REQUEST } from '@/services/postServices'
import InputWithLength from '@rc/ModuleUtils/ControlWithLength/InputWithLength'
import SelectResponse from '@@/ModuleUtils/RewriteControl/SelectResponse'
import { FieldType } from '@/common/constant'
import { FieldItemType } from '../../fieldTypes/interface'
import { DataProps } from '../interface'
import { debounce } from 'lodash'
import { FIELD_CONFIG_COL_STYLE } from '../../fieldTypes/constants'
import { FIELD_RULES, NAME_RULES } from '@/common/checkInfo/checkInfo'

const { refModel: modelRequest, refModelField: fieldRequest } = POST_REQUEST

const ManyToManyCreate: FC<DataProps> = (props) => {
  const dispatch = useDispatch()
  const { modelId } = useSelector((state: any) => state.modelEdit)
  const { refModel: { list: modelItems, loading: modelLoading, total }, refModelField: { list: fieldItems } } = useSelector((state: any) => state.field)
  const [page, setPage] = useState<number>(1)
  const [modelValue, setModelValue] = useState<string>('')
  const [retrieveCondition, setRetrieveCondition] = useState<string>('')

  useEffect(() => {
    dispatch(modelRequest({ pagination: { page: page, pageSize: 15 }, filter: { retrieveCondition: retrieveCondition } }))
  }, [page, retrieveCondition, dispatch])

  useEffect(() => {
    if (modelValue && modelValue.length > 0) {
      dispatch(fieldRequest({ modelId: modelValue, baseInfo: false, fields: [] }))
    }
  }, [modelValue, dispatch])
  // 关联分组标志，查到所有many_to_many的字段的关联分组标志
  const refGroupArr = useMemo(() => {
    const refGroupSt: any[] = []
    fieldItems.forEach((field: FieldItemType) => {
      if (field.fieldType === FieldType.MANY_TO_ONE && field.refModel === modelId) {
        refGroupSt.push(field.refGroup)
      }
    })
    return [...new Set(refGroupSt)].map((item: any) => ({ value: item }))
  }, [fieldItems, modelId])

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
              items={modelItems.filter((modelItem: FieldItemType) => modelItem.id !== modelId)}
              selectLoading={modelLoading}
              placeholder='请选择关联表'
              setModelValue={refModelOnChange}
              onSearch={debounce(refModelOnSearch, 500)}
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
          <Form.Item key='fieldStatement' name='fieldStatement' label='字段说明：'>
            <Input.TextArea rows={5} showCount maxLength={140} />
          </Form.Item>
        </Col>
      </Row>
    </>
  )
}

export default ManyToManyCreate
