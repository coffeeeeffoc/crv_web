
import { useEffect, useRef } from 'react'
import JSONEditor from 'jsoneditor'
import 'jsoneditor/dist/jsoneditor.css'

export default function JsonEdit ({
  value = '{}',
  onChange,
}: any) {
  const containerRef: any = useRef(null)
  // const viewContainerRef = useRef(null)
  const jsoneditor: any = useRef(null)
  // const viewJsoneditor = useRef(null)
  const onChangeNew = () => {
    const value: any = jsoneditor.current.get()
    // viewJsoneditor.current.set(value)
    onChange(JSON.stringify(value))
  }

  const initJsonEditor = () => {
    const options: any = {
      mode: 'code',
      history: true,
      onChange: onChangeNew,
      // onValidationError: this.onError
    }

    jsoneditor.current = new JSONEditor(containerRef.current, options)
    jsoneditor.current.set(JSON.parse(value))
  }

  useEffect(() => {
    initJsonEditor()
    // initViewJsonEditor()
    // eslint-disable-next-line
  }, [])

  useEffect(() => {
    if (jsoneditor.current) {
      jsoneditor.current.update(JSON.parse(value))
      // viewJsoneditor.current.update(JSON.parse(value))
    }
  }, [value])
  return (
    <div className='jsonEditWrap'>
      {/* <Row span={24}>
        <Col span={18}> */}
      <div className='jsoneditor-react-container' ref={containerRef} />
      {/* </Col> */}
      {/* <Col span={12}>
          <div className='jsoneditor-react-container' ref={viewContainerRef} />
        </Col> */}
      {/* </Row> */}
    </div>
  )
}
