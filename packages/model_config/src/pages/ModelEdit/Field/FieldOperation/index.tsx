import { useSelector } from 'react-redux'
import FieldCreate from './FieldCreate/index'
import FieldEdit from './FieldEdit/index'
import FieldSelect from './FieldSelect'
import { ShowType, PADDING_STYLE } from '@/common/constant'
import './index.less'
import { useEffect } from 'react'
import { useHistory } from 'react-router-dom'

export default function FieldOperation (props: any) {
  const { match: { params: { modelId } } } = props
  const history = useHistory()
  const { show } = useSelector((state: any) => state.field)
  // when reloading the frame, the redux state is emptied, so that go back to modelEdit page carrying modelId param
  useEffect(() => {
    if (!show) {
      // window.location.href = `#/model/edit/${modelId}`
      history.push(`/model/edit/${modelId}`)
    }
  }, [show, modelId, history])
  return (
    <div style={PADDING_STYLE}>
      {show === ShowType.CREATE && <FieldCreate />}
      {show === ShowType.SELECT && <FieldSelect />}
      {show === ShowType.EDIT && <FieldEdit />}
    </div>
  )
}
