import { useState } from 'react'
import StepSelect from './OperationStepSelect'
import StepPropertyModel from './OperationStepProperty'
import ShowModal from '@@/ModuleUtils/ShowModal'
import { ShowType } from '@/common/constant'

interface propsType {
  visible: boolean
  setVisible: any
  show: ShowType
  setShow: any
  value: any
  onChange: any
  operationStepValue: {
    stepType: string
    [propsName: string]: any
  }
  setOperationStepValue: any
}
const PropertySet = ({
  visible,
  setVisible,
  show,
  setShow,
  value,
  onChange,
  operationStepValue,
  setOperationStepValue
}: propsType) => {
  const [stepType, setStepType] = useState('')
  const [title, setTitle] = useState()

  return (
    <>
      <ShowModal
        title={title}
        visible={visible}
        bodyStyle={{ overflowY: 'auto' }}
      >
        {
          show === ShowType.SELECT && <StepSelect
            setVisible={setVisible}
            setShow={setShow}
            setStepType={setStepType}
            setTitle={setTitle}
          />
        }
        {
          show === ShowType.CREATE && <StepPropertyModel
            stepType={stepType}
            setVisible={setVisible}
            setShow={setShow}
            show={show}
            value={value}
            onChange={onChange}
            operationStepValue={operationStepValue}
            setOperationStepValue={setOperationStepValue}
            setTitle={setTitle}
          />
        }
        {
          show === ShowType.EDIT && <StepPropertyModel
            stepType={operationStepValue.stepType}
            setVisible={setVisible}
            setShow={setShow}
            show={show}
            value={value}
            onChange={onChange}
            setOperationStepValue={setOperationStepValue}
            operationStepValue={operationStepValue}
            setTitle={setTitle}
          />
        }
      </ShowModal>
    </>
  )
}

export default PropertySet
