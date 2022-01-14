// 根据不同的radio选项，渲染Modal里面不同的组件
import FormSwitch from './FormSwitch'
import CallAPI from './CallAPI'
import Refresh from './Refresh'
import PopConfirm from './PopConfirm'
import OpenModal, { CloseModal } from './OpenModal'
import { OperationType } from '../constants'
interface propsType {
  stepType: string
  form: any
}

const stepTypeControlMap: any = {
  [OperationType.FORM_SWITCH]: FormSwitch,
  [OperationType.CALL_API]: CallAPI,
  [OperationType.REFRESH]: Refresh,
  [OperationType.POP_CONFIRM]: PopConfirm,
  [OperationType.OPEN_MODAL]: OpenModal,
  [OperationType.CLOSE_MODAL]: CloseModal,
  [OperationType.OPEN_TOP_TAB]: FormSwitch,
}

const PropertySetting = ({
  stepType,
  form
}: propsType) => {
  const Control = stepTypeControlMap[stepType]
  if (Control) {
    return <Control form={form} stepType={stepType} />
  }
  return <>待开发</>
}

export default PropertySetting
