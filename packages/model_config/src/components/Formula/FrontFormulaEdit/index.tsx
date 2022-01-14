import FormulaEdit from './FormulaEdit'
import { functionItem, globalItem, operationItem } from './formulaConstant'
const FrontFormula = (props: any) => {
  const { fieldItems } = props
  const config = {
    fieldItems,
    functionItem,
    globalItem,
    operationItem
  }
  return (
    <FormulaEdit
      {...props}
      config={config}
    />
  )
}

export default FrontFormula
