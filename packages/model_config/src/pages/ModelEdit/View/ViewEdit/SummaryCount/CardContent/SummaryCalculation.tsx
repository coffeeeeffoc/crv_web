import { Input, Button } from 'antd'
import { FC, useCallback, useEffect, useMemo, useState } from 'react'
import Formula from '@@/Formula/FrontFormulaEdit'

const SummaryCalculation: FC<any> = (props) => {
  const [visible, setVisible] = useState<boolean>(false)
  const { fieldItems = [], value = '', onChange, onFinish, ...restProps } = props
  const [formulaTranslate, setFormulaTranslate] = useState<string>(value)
  useCallback(() => {
    setFormulaTranslate(value)
  }, [value])
  const fieldItem = useMemo(() => fieldItems.map((item: any) => {
    return {
      value: item.id,
      type: 'FIELD',
      description: item.fieldStatement ? `说明：${item.fieldStatement}` : `${item.name}(${item.id})`,
      name: item.name
    }
  }), [fieldItems])

  useEffect(() => {
    const matchDollarString = value.match(/(\$\{)[a-z0-9_]*(\})/g) ?? []
    let strTemp = value.trim()
    matchDollarString.forEach((matchDollar: any) => {
      const matchIdString = matchDollar.slice(2, -1)
      const fieldIndex = fieldItem.findIndex((item: any) => item?.value === matchIdString)
      if (fieldIndex !== -1) {
        strTemp = strTemp.replace(matchDollar, fieldItem[fieldIndex].name)
      }
    })
    setFormulaTranslate(strTemp)
  }, [value, fieldItem])

  const onClick = useCallback((val: any) => {
    setVisible(true)
  }, [setVisible])

  const save = useCallback(() => {
    onFinish()
    setVisible(false)
  }, [setVisible, onFinish])

  return (
    <>
      <Input.Group compact>
        <Input style={{ width: 'calc(100% - 97px)' }} value={formulaTranslate} readOnly disabled {...restProps} />
        <Button type='primary' style={{ marginLeft: '10px', borderRadius: '10px' }} onClick={onClick}>计算公式</Button>
      </Input.Group>
      {
        visible && <Formula fieldItems={fieldItem} value={value} onChange={onChange} save={save} />
      }
    </>
  )
}

export default SummaryCalculation
