import { FC, ReactNode, useCallback, useEffect, useState } from 'react'
import { Form, Row, Col, Select, Input, Radio, Space } from 'antd'
import { useSelector, useDispatch } from 'react-redux'
import { POST_REQUEST } from '@/services/postServices'
import InputWithLength from '@rc/ModuleUtils/ControlWithLength/InputWithLength'
import SelectResponse from '@@/ModuleUtils/RewriteControl/SelectResponse'
import { FieldType, associateFieldType } from '@/common/constant'
import { FieldItemType } from '../../fieldTypes/interface'
import { DataProps } from '../interface'
import { debounce } from 'lodash'
import { FIELD_CONFIG_COL_STYLE, OneToManyDeleteType } from '../../fieldTypes/constants'
import CollapsePanel from '@@/ModuleUtils/Collapse'
import { FIELD_RULES, NAME_RULES } from '@/common/checkInfo/checkInfo'

const { refModel: modelRequest, refModelField: fieldRequest } = POST_REQUEST
const { Option } = Select

const OneToManyCreate: FC<DataProps> = (props) => {
  // const { form } = props
  const dispatch = useDispatch()
  const { baseInfo: { fields: baseInfoFields = [] }, modelId } = useSelector((state: any) => state.modelEdit)
  const { refModel: { list: modelItems, loading: modelLoading, total }, refModelField: { list: fieldItems, loading: fieldLoading } } = useSelector((state: any) => state.field)
  const [page, setPage] = useState<number>(1)
  const [retrieveCondition, setRetrieveCondition] = useState<string>('')
  const [modelValue, setModelValue] = useState<string>('')
  // 主表字段在当前关联表中做为关联字段出现的数组
  const [currentIdArr, setCurrentIdArr] = useState<string[]>([])
  // 关联表的字段中，关联类型是many_to_one，关联表是当前主表，关联字段是当前主表关联字段时的id数组
  const [currentRefModelIdArr, setCurrentRefModelIdArr] = useState<string[]>([])
  // 记录当前的主表关联字段
  const [currentField, setCurrentField] = useState<string>()
  // record the refRequired to control refField is or ie not required
  // const [refRequired, setRefRequired] = useState<boolean>(false)

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
      console.log('useEffect1')
      const currentIdArrSt: string[] = []
      fieldItems.forEach((fieldItem: FieldItemType) => {
        if (fieldItem.fieldType === FieldType.MANY_TO_ONE && fieldItem.refModel === modelId) {
          // 如果关联表字段中存在many_to_one类型的，且关联表为当前的主表的id，则将该关联表中的字段的关联字段id（即当前主表的部分字段id）形成一个数组
          currentIdArrSt.push(fieldItem.refModelField)
        }
      })
      // 渲染主表关联字段
      // if (currentIdArrSt.length > 0) {
      //   form.setFieldsValue({ refField: currentIdArrSt[0] })
      //   setCurrentField(currentIdArrSt[0])
      // } else {
      //   form.setFieldsValue({ refField: 'id' })
      //   setCurrentField('id')
      // }
      setCurrentIdArr([...new Set(currentIdArrSt)])
    }
    // 明细表发生变化即清空明细表关联字段
    // form.setFieldsValue({ refModelField: 'id' })
  }, [fieldItems, modelId])

  useEffect(() => {
    const currentRefModelIdArr: string[] = []
    if (fieldItems.length > 0 && currentField) {
      console.log('useEffect2')
      fieldItems.forEach(({ id, fieldType, refModel, refModelField }: FieldItemType) => {
        if (fieldType === FieldType.MANY_TO_ONE && refModelField === currentField && refModel === modelId) {
          currentRefModelIdArr.push(id)
        }
      })
      // form.setFieldsValue({ refModelField: currentRefModelIdArr[0] ?? 'id' })
      setCurrentRefModelIdArr([...new Set(currentRefModelIdArr)])
    }
  }, [fieldItems, currentField, modelId])

  const refModelOnChange = useCallback((e) => {
    setModelValue(e)
    setRetrieveCondition('')
    setPage(1)
  }, [])

  const refModelOnSearch = useCallback((e: string) => {
    setRetrieveCondition(e)
    setPage(1)
  }, [])

  const collapseHeader: ReactNode = <Row style={{ width: '100%' }}>
    <Col span={24} style={{ textAlign: 'right' }}>
      高级选项
    </Col>
  </Row>

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
          <Form.Item
            key='refModel'
            label='明细表：'
            name='refModel'
            rules={[{ required: true, message: '关联表不可为空' }]}>
            <SelectResponse
              items={modelItems}
              selectLoading={modelLoading}
              placeholder='请选择明细表'
              onSearch={debounce(refModelOnSearch, 500)}
              setModelValue={refModelOnChange}
              setPage={setPage}
              page={page}
              total={total}
            />
          </Form.Item>
          <CollapsePanel header={collapseHeader}>
            <Form.Item
              key='refField'
              label='主表关联字段：'
              name='refField'
            >
              <Select allowClear loading={fieldLoading} showSearch placeholder='请选择主表关联字段' onChange={(e: string) => setCurrentField(e)}>
                {
                  // 过滤主表关联字段
                  baseInfoFields.filter((field: FieldItemType) => !associateFieldType.includes(field.fieldType)).map(({ id, name }: FieldItemType) => (
                    currentIdArr.includes(id)
                      ? <Option value={id} key={id}><span style={{ whiteSpace: 'pre', backgroundColor: 'rgb(251 251 90 / 50%)' }}>{`${name ?? id}(${id})`}</span></Option>
                      : <Option value={id} key={id}><span style={{ whiteSpace: 'pre' }}>{`${name ?? id}(${id})`}</span></Option>
                  ))
                }
              </Select>
            </Form.Item>
            <Form.Item
              key='refModelField'
              label='明细表关联字段：'
              name='refModelField'
            >
              <Select allowClear loading={fieldLoading} showSearch placeholder='请选择明细表关联字段'>
                {
                  fieldItems.filter((field: FieldItemType) => !associateFieldType.includes(field.fieldType) || (field.fieldType === FieldType.MANY_TO_ONE && field.refModel === modelId)).map(({ id, name }: FieldItemType) => (
                    currentRefModelIdArr.includes(id)
                      ? <Option value={id} key={id}><span style={{ whiteSpace: 'pre', backgroundColor: 'rgb(251 251 90 / 50%)' }}>{`${name ?? id}(${id})`}</span></Option>
                      : <Option value={id} key={id}><span style={{ whiteSpace: 'pre' }}>{`${name ?? id}(${id})`}</span></Option>
                  ))
                }
              </Select>
            </Form.Item>
            <Form.Item key='deleteType' name='deleteType' label='' initialValue={OneToManyDeleteType.DELETE}>
              <Radio.Group>
                <Space direction='vertical'>
                  <Radio value={OneToManyDeleteType.DELETE}>删除数据时将同时删除关联表相关记录</Radio>
                  <Radio value={OneToManyDeleteType.KEEP}>当本表中记录已经被引用时不允许删除数据</Radio>
                  <Radio value={OneToManyDeleteType.RESET}>删除数据时将关联表对应字段值置空</Radio>
                </Space>
              </Radio.Group>
            </Form.Item>
          </CollapsePanel>
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

export default OneToManyCreate
