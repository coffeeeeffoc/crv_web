import FormulaEdit from './FormulaEdit'
import { functionItem, globalItem, operationItem } from './formulaConstant'
const BackFormula = (props: any) => {
  const { fieldItems } = props
  const config = {
    fieldItems,
    functionItem,
    globalItem,
    operationItem
    // field: {
    //   items: fieldItems,
    //   tabName: '字段'
    // },
    // funcationList: {
    //   item: functionItem,
    //   tabName: '函数'
    // },
    // globalParam: {
    //   item: globalItem,
    //   tabName: '全局参数'
    // },
    // operateSign: {
    //   item: operationItem,
    //   tabName: '操作符'
    // }
  }
  // 针对props上的config进行配置
  // const [configItem, setConfigItem] = useState(config)
  // const itemArr = ['function', 'globalParam', 'operateSign']
  // useEffect(() => {
  //   const tempItem = itemArr.filter(item => Object.keys(config).indexOf(item) === -1)
  //   // 获取传入的config中空对象（只针对于itemArr）
  //   const filterConfigNull = itemArr.filter(item => JSON.stringify(config[item]) === '{}')
  //   const tempConfigItem = { ...configItem }
  //   filterConfigNull.map(item => {
  //     delete tempConfigItem[item]
  //     return item
  //   })
  //   tempItem.forEach(item => {
  //     tempConfigItem[item] = config[item]
  //   })
  //   setConfigItem(tempConfigItem)
  // }, [config])

  return (
    <FormulaEdit
      {...props}
      config={config}
    />
  )
}

export default BackFormula
