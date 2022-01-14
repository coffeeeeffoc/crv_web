import { useState, useEffect, useCallback, FC } from 'react'
import { Button, Row, Col } from 'antd'
import DragTable from './DragTable'
import PropertySet from './PropertySet'
import { OPERATION_ELEMENT } from '@/common/elementName'
import { ShowType } from '@/common/constant'
interface OperationStepProps {
  modelId: string
  [propsName: string]: any
}
const OperationStep: FC<OperationStepProps> = (props) => {
  const { value, onChange, modelId } = props
  // 控制是否展示modal
  const [visible, setVisible] = useState<boolean>(false)
  // 控制modal展示的组件是哪一个
  const [show, setShow] = useState<ShowType>(ShowType.SELECT)
  const [operationStepValue, setOperationStepValue] = useState<any>({})

  useEffect(() => {
    setOperationStepValue(operationStepValue)
  }, [operationStepValue])

  const increaseStep = useCallback(() => {
    setVisible(true)
    setShow(ShowType.SELECT)
    setOperationStepValue({})
  }, [setVisible, setShow, setOperationStepValue])

  return (
    <>
      <Row>
        <Col span={12}>
          <span>操作步骤：</span>
        </Col>
        <Col span={12} style={{ textAlign: 'right', paddingBottom: '5px' }}>
          <Button type='primary' onClick={increaseStep} size='middle' id={OPERATION_ELEMENT.INCREASE_STEP}>添加步骤</Button>
        </Col>
        <Col span={24} style={{ paddingTop: '0px', border: '1px solid rgba(0, 0, 0, 0.06)', borderTopWidth: 0, boxSizing: 'content-box' }}>
          <DragTable
            setShow={setShow}
            onChange={onChange}
            setOperationStepValue={setOperationStepValue}
            dataSource={value}
            setVisible={setVisible}
            modelId={modelId}
          />
        </Col>
      </Row>
      <PropertySet
        visible={visible}
        setVisible={setVisible}
        show={show}
        setShow={setShow}
        value={value}
        onChange={onChange}
        operationStepValue={operationStepValue}
        setOperationStepValue={setOperationStepValue}
      />
    </>
  )
}

export default OperationStep
