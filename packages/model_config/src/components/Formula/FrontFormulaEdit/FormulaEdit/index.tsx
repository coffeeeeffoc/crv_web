import { useState, useRef, useEffect } from 'react'
import { Button, Space, Row, Col, Input, Modal, Checkbox } from 'antd'
import ItemShow from './itemShow'
import styles from './index.less'
import { EditType, Type } from '../formulaConstant'

interface formEditInterface {
  value?: string | undefined
  onChange: (value: any) => void
  config: any
  save: () => void
}
interface refInterface {
  current: any
}
interface itemInterface {
  value: string
  name: string
  [propName: string]: number | string
}
const { Search } = Input
const FormulaEdit = ({ value = '', onChange, config, save }: formEditInterface) => {
  const { fieldItems, functionItem, globalItem, operationItem } = config
  // 字段公式
  const [formula, setFormula] = useState(value)
  // 显示字段
  const [configItemsField, setConfigItemsField] = useState(fieldItems)
  // 文本翻译
  const [formulaTranslate, setFormulaTranslate] = useState(value)
  // 中英文切换
  const [language, setLanguage] = useState(false)
  const ref: refInterface = useRef(null)
  const [isModalVisible, setIsModalVisible] = useState(true)

  // useEffect

  useEffect(() => {
    if (isModalVisible) {
      setFormula(value)
      setTimeout(() => {
        ref?.current?.setSelectionRange(value.length, value.length)
        ref?.current?.focus()
      }, 0)
    }
  }, [isModalVisible, value])

  useEffect(() => {
    const matchDollarString = formula.match(/(\$\{)[a-z0-9_]*(\})/g) ?? []
    let strTemp = formula.trim()
    matchDollarString.forEach((matchDollar: any) => {
      const matchIdString = matchDollar.slice(2, -1)
      // const globalIndex = globalItem.findIndex((item:itemInterface) => item?.value === matchIdString)
      const fieldIndex = fieldItems.findIndex((item: any) => item?.value === matchIdString)
      if (fieldIndex !== -1) {
        strTemp = strTemp.replace(matchDollar, fieldItems[fieldIndex].name)
      }
      // else if (globalIndex !== -1) {
      //   strTemp = strTemp.replace(matchDollar, globalItem[globalIndex].name)
      // }
    })
    setFormulaTranslate(strTemp)
  }, [formula, fieldItems])

  // 点击确定后的回调
  const handleOk = () => {
    setIsModalVisible(false)
    onChange(formula)
    save()
  }

  // 取消
  const handleCancel = () => {
    setIsModalVisible(false)
    save()
  }

  const setSelectionRange = (start: number, end: number) => {
    setTimeout(() => {
      ref.current.setSelectionRange(start, end)
      ref.current.focus()
    }, 0)
  }
  const itemSelected = (e: any) => {
    const positionStart: number = ref?.current?.selectionStart
    const typeTemp = e?.target?.getAttribute('type')
    let valTemp: string = e?.target?.getAttribute('val')
    if (valTemp) {
      const len: number = positionStart + valTemp.length
      if (typeTemp === Type.FIELD) {
        valTemp = `\${${valTemp}}`
        setSelectionRange(len + 3, len + 3)
      } else if (typeTemp === Type.FUNCTION || valTemp === '()') {
        setSelectionRange(len - 1, len - 1)
      } else {
        setSelectionRange(len, len)
      }
      setFormula(formula?.substr(0, positionStart) + valTemp + formula?.substr(positionStart))
    }
  }

  const title: any = (
    <Row>
      <Col span={12}>
        计算公式编辑
      </Col>
      <Col span={12} style={{ textAlign: 'right' }}>
        <Space>
          <Button size='small' key="ok" type="primary" onClick={handleOk}>确定</Button>
          <Button size='small' key="cancel" type="primary" onClick={handleCancel}>取消</Button>
        </Space>
      </Col>
    </Row>
  )

  const onSearch = (val: string) => {
    const searchValue = new RegExp(val.trim(), 'i')
    setConfigItemsField(fieldItems.filter((item: itemInterface) => item.value.search(searchValue) > -1 || item?.name.search(searchValue) > -1))
  }

  return (
    <Modal
      title={title}
      visible={isModalVisible}
      closable={false}
      className={styles.formulaModel}
      footer={false}
      width='600px'
      maskClosable={true}
      style={{
        top: '5vh'
      }}
    >
      <Row style={{ marginBottom: '5px' }}>
        <Col span={12}>
          <Row style={{ marginBottom: '2px' }}>
            <Col span={3}>
              <span>{EditType.FIELD}</span>
            </Col>
            <Col span={12}>
              <Search
                placeholder="请输入搜索"
                onSearch={onSearch}
                enterButton
                size='small'
              />
            </Col>
            <Col span={9} style={{ paddingLeft: '10px' }}>
              <Checkbox checked={language} onChange={(val) => setLanguage(val.target.checked)}>显示英文</Checkbox>
            </Col>
          </Row>
          <div className='field'>
            <ItemShow language={language} item={configItemsField} itemSelected={itemSelected} key='configItemsField' />
          </div>
          <Row style={{ marginBottom: '4px' }}>
            <Col>
              <span>{EditType.GLOBAL}</span>
            </Col>
          </Row>
          <div className='globalParam'>
            {
              <ItemShow language={language} item={globalItem} itemSelected={itemSelected} key='globalParam' />
            }
          </div>
        </Col>
        <Col span={12} style={{ paddingLeft: '10px' }}>
          <Row style={{ marginBottom: '4px' }}>
            <Col>
              <span>{EditType.FUNCTION}</span>
            </Col>
          </Row>
          <div className='func'>
            {
              <ItemShow language={language} item={functionItem} itemSelected={itemSelected} key='function' />
            }
          </div>
          <Row style={{ marginBottom: '4px' }}>
            <Col>
              <span>{EditType.OPERATION}</span>
            </Col>
          </Row>
          <div className='operation'>
            {
              <ItemShow language={language} item={operationItem} itemSelected={itemSelected} key='operation' />
            }
          </div>
        </Col>
      </Row>
      <span>{EditType.FIELD_FORMULA}</span>
      <textarea className='textAreaStyle' onChange={(e) => { setFormula(e.target.value) }} value={formula} ref={ref}></textarea>
      <span>{EditType.FORMULA_TRANSLATION}</span>
      <textarea className='textAreaStyle' value={formulaTranslate} readOnly></textarea>
    </Modal>
  )
}

export default FormulaEdit
