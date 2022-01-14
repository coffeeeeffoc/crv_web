import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Col, Form, Row } from 'antd'
import ShowModal from '@@/ModuleUtils/ShowModal'
import HeadModule from '@@/ModuleUtils/HeadModule'
import { POST_REQUEST } from '@/services/postServices'
import { modelEditActions } from '@/redux/actions'
import { CurrentTabType } from '@/common/constant'
import {
  EnumPageType,
  OperationType,
  EnumCallApiType,
  selectGeneralOperationTypeMap
} from '../CustomOperation/OperationStep/constants'
import { TargetDateType } from '@/pages/ModelEdit/Operation/CustomOperation/constant'

const { updateOperation } = POST_REQUEST
/**
 * 通用操作
 * @param param0
 * @returns
 */
const GeneralOperation = ({ visible, onCancel }: any) => {
  const [form] = Form.useForm()
  const dispatch = useDispatch()

  const { modelId } = useSelector((state: any) => state.modelEdit)

  const save = useCallback(async () => {
    const values = await form.getFieldsValue()
    const generalOperationMap: any = {
      REFRESH: {
        name: '刷新',
        statement: '刷新',
        targetData: TargetDateType.NO_SEL_DATA,
        operationSteps: [{ statement: '刷新', stepType: OperationType.REFRESH }]
      },
      SAVE: {
        name: '保存',
        statement: '保存',
        targetData: TargetDateType.NO_SEL_DATA,
        operationSteps: [
          {
            callApiType: EnumCallApiType.INNER_API,
            showError: true,
            showSuccess: true,
            statement: '保存',
            innerApi: 'SAVE',
            externalApi: null,
            stepType: OperationType.CALL_API
          },
          {
            pageType: EnumPageType.GO_BACK,
            statement: '返回',
            stepType: OperationType.FORM_SWITCH
          },
          {
            statement: '刷新',
            stepType: OperationType.REFRESH
          }
        ]
      },
      DELETE: {
        name: '删除',
        operationSteps: [
          {
            callApiType: EnumCallApiType.INNER_API,
            showError: true,
            showSuccess: true,
            statement: '删除',
            innerApi: 'DELETE',
            externalApi: null,
            stepType: OperationType.CALL_API
          },
          {
            statement: '刷新',
            stepType: OperationType.REFRESH
          }
        ],
        targetData: TargetDateType.MULTIPLE,
        supportSelectAll: true,
        statement: '删除'
      },
      GO_BACK: {
        name: '返回',
        operationSteps: [
          {
            pageType: EnumPageType.GO_BACK,
            statement: '返回',
            stepType: OperationType.FORM_SWITCH
          },
          {
            stepType: OperationType.REFRESH,
            statement: '刷新',
          }
        ],
        targetData: TargetDateType.NO_SEL_DATA,
        statement: '返回'
      },
    }
    const ops = values.stepType?.map((action: string) => generalOperationMap[action])
    if (ops.length > 0) dispatch(updateOperation({ model: { id: modelId, operations: ops } }))
    dispatch(modelEditActions.setCurrentTab({ currentTab: CurrentTabType.OPERATION }))
    onCancel()
  }, [dispatch, form, modelId, onCancel])

  const buttonType = [
    <Button size='small' key='ok' type='primary' onClick={save}>确定</Button>,
    <Button size='small' key='cancel' type='primary' onClick={onCancel}>取消</Button>
  ]

  return (
    <ShowModal
      title={<HeadModule textLeft='选择通用操作' buttonType={buttonType}/>}
      visible={visible}
      bodyStyle={{ overflowY: 'auto' }}
      width="50vw"
    >
      <Form
        style={{ width: '100%', margin: '0 auto' }}
        layout='vertical'
        form={form}
        initialValues={{}}
      >
        <Row style={{ paddingLeft: 100, paddingRight: 100 }}>
          <Col span={24}>
            <Form.Item
              key={selectGeneralOperationTypeMap.name}
              label={selectGeneralOperationTypeMap.title}
              name='stepType'
              rules={[
                { required: true, message: '请选择类型' }
              ]}
            >{selectGeneralOperationTypeMap.control}</Form.Item>
          </Col>
        </Row>
      </Form>
    </ShowModal>
  )
}

export default GeneralOperation
