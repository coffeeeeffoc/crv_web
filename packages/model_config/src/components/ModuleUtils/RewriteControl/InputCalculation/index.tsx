import { Input, Badge, Button } from 'antd'
import { FC, useEffect, useMemo, useState } from 'react'
import Formula from '@@/Formula/FrontFormulaEdit'

const InputCalculation: FC<any> = (props) => {
  const [visible, setVisible] = useState<boolean>(false)
  const { fieldItems = [], value = '', onChange, ...restProps } = props
  const [formulaTranslate, setFormulaTranslate] = useState<string>(value)
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

  return (
    <>
      <Badge.Ribbon text={<Button type='link' style={{ color: 'white', height: '24px', padding: '0px 10px 20px 10px', marginBottom: '10px' }} onClick={() => setVisible(true)}>计算公式</Button>} style={{ height: '30px', top: '-34px', paddingTop: '4px' }}>
        <Input value={formulaTranslate} disabled {...restProps} />
      </Badge.Ribbon>
      {
        visible && <Formula fieldItems={fieldItem} value={value} onChange={onChange} save={() => setVisible(false)} />
      }
    </>
  )
}

export default InputCalculation
