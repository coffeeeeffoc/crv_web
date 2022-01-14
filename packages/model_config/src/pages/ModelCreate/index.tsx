import { useState, useCallback, useEffect } from 'react'
import type { FC } from 'react'
import { useDispatch } from 'react-redux'
import { useAppSelector } from '@/redux'
import { Button, Row, Col, Form } from 'antd'
import { modelFormRightFields, fields } from './fieldType'
import HeadModule from '@@/ModuleUtils/HeadModule'
import { modelListActions, modelEditActions } from '@/redux/actions'
import { MODEL_ELEMENT } from '@/common/elementName'
import { CurrentTabType, PADDING_STYLE } from '@/common/constant'
import { POST_REQUEST } from '@/services/postServices'
import { useHistory } from 'react-router-dom'

const { createModel } = POST_REQUEST

/**
 * 模型新增
 * @param {*} props
 */
const ModelCreate: FC<any> = (props) => {
  const [form] = Form.useForm()
  const dispatch = useDispatch()
  const [visible, setVisible] = useState(false)
  const history = useHistory()
  const { createSuccess } = useAppSelector(state => state.modelList)
  const { modelId } = useAppSelector(state => state.modelEdit)

  // 新建模型保存回调
  const onFinish = useCallback(async () => {
    const values = await form.validateFields()
    // dispatch(modelListActions.setModelState({ modelId: values.id }))
    // 新增模型，回调到编辑页面的base页面
    dispatch(modelEditActions.setCurrentTab({ currentTab: CurrentTabType.BASE }))
    dispatch(createModel({ model: values }))
    // update modelId from redux modelEdit
    dispatch(modelEditActions.setModelId(values.id))
  }, [form, dispatch])

  useEffect(() => {
    if (createSuccess) {
      history.push(`/model/edit/${modelId}`)
      dispatch(modelListActions.setModelState({ createSuccess: false }))
    }
  }, [createSuccess, modelId, dispatch, history])

  const goBack = useCallback(() => {
    dispatch(modelListActions.setModelState({ loading: true }))
    history.push('/model/list')
  }, [dispatch, history])

  const stringChange = useCallback((val: any) => {
    setVisible(val.target.checked)
    if (!val.target.checked) form.setFieldsValue({ idLength: undefined })
  }, [setVisible, form])

  const buttonType = [
    <Button type='primary' key={MODEL_ELEMENT.CREATE_SAVE} onClick={onFinish} id={MODEL_ELEMENT.CREATE_SAVE}>保存</Button>,
    <Button type='primary' id={MODEL_ELEMENT.CREATE_BACK} key={MODEL_ELEMENT.CREATE_BACK} onClick={goBack}>返回</Button>
  ]

  return (
      <Form
        layout='vertical'
        form={form}
        initialValues={{}}
        style={PADDING_STYLE}
      >
        <HeadModule textLeft='新建模型' buttonType={buttonType} divider />
        <Row>
          <Col span={12} style={{ paddingLeft: 50, paddingRight: 20, borderRight: '1px solid #fbfbfb' }}>
            {
              fields.map((field: any) => {
                const newProps: any = {}
                const newItemProps: any = {}
                if (field.name === 'stringId') {
                  newProps.onChange = stringChange
                }
                if (field.name === 'idLength') {
                  newItemProps.dependencies = ['stringId']
                  newProps.disabled = !visible
                  if (visible) {
                    newItemProps.rules = [{ required: true, message: 'ID字段长度为必填选项' },
                      { min: 1, max: 768, type: 'integer', message: 'ID字段的长度应大于0小于等于768' }]
                  }
                }
                return <Form.Item key={field.name} label={field.title} name={field.name}
                  {...field.itemProps}
                  {...newItemProps}>
                  <field.control.type
                    {...field.control.props}
                    {...newProps}
                  />
                </Form.Item>
              })
            }
          </Col>
          <Col span={12} style={{ padding: '0 100px 0 20px' }}>
            {
              modelFormRightFields.map(field => <Form.Item key={field.name} label={field.title} name={field.name} {...field.itemProps}>{field.control}</Form.Item>)
            }
          </Col>
        </Row>
      </Form>
  )
}
export default ModelCreate
