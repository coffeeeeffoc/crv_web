import { FC, useEffect, useMemo } from 'react'
import { Form, Select, Col, AutoComplete } from 'antd'
import { FieldType } from '@/common/constant'
import { fieldShowTypeOption, dateShowTypeOption, dateRelatedFields } from '../../constants'
import { usePrevious } from '@/hooks/usePrevious'

interface FormulaShowRenderProp {
  resultType: FieldType
  form: any
}
const FormulaShowRender: FC<FormulaShowRenderProp> = ({
  resultType,
  form
}) => {
  const ITEM_COL_STYLE = { paddingRight: '50px' }
  const showTypeOptions: typeof dateShowTypeOption = useMemo(() => fieldShowTypeOption[resultType] ?? [], [resultType])
  const disable = useMemo(() => showTypeOptions.length === 0, [showTypeOptions?.length])
  console.log('resultType', resultType)
  const resetShowType = resultType !== usePrevious(resultType)
  useEffect(() => {
    if (resetShowType) {
      form.setFieldsValue({ showType: '' })
    }
  }, [resetShowType, form])
  // useMemo
  return (
    <>
      <Col span={12} style={ITEM_COL_STYLE}>
        <Form.Item name='showType' key='showType' label='数据显示格式' rules={[{ required: !disable, message: '请选择或输入数据显示格式' }]}>
          {(() => {
            return dateRelatedFields.includes(resultType)
              ? <AutoComplete disabled={disable} placeholder='请选择或输入数据显示格式' options={showTypeOptions} />
              : <Select disabled={disable} placeholder='请选择数据显示格式'>
                {
                  showTypeOptions?.map(({ value, label }) => <Select.Option value={value} key={value}>{label}</Select.Option>)
                }
              </Select>
          })()
          }
        </Form.Item>
      </Col>
    </>
  )
}

export default FormulaShowRender
