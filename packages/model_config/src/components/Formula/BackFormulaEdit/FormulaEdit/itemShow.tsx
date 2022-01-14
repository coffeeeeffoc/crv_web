import { Tooltip } from 'antd'
// import { Type } from '../formulaConstant'

interface itemShowInterface {
  item: itemInterface[]
  itemSelected: (val: any) => void
  language?: boolean
}
interface itemInterface {
  value: string | number
  type: string
  name: string
  description: string
}
const ItemShow = ({ item, itemSelected, language = false }: itemShowInterface) => {
  return (
    <ul className='formulaUlStyle' onClick={itemSelected} style={{ userSelect: 'none' }}>
      {
        item.map((item: itemInterface) => {
          // if(item.type === Type.FIELD && item.type === Type.)
          return (
            <Tooltip
              title={item.description}
              // title={language ? item.name : item.value}
              key={item.value}
            >
              <li
                key={item.value}
                className={'formulaLiStyle'}
                // @ts-expect-error
                val={item.value}
                type={item.type}
                name={item.name}
              >
                {
                  language ? item.value : item.name ? item.name : item.value
                }
              </li>
            </Tooltip>
          )
          //   else
          //     return (
          //       <Tooltip
          //         title={item.description}
          //         key={item.value}
          //       >
          //         <li
          //           key={item.value}
          //           className={'formulaLiStyle'}
          //           // @ts-ignore
          //           val={item.value}
          //           type ={item.type}
          //           name={item.name}
          //           >
          //             {
          //               item.name
          //             }
          //         </li>
          //       </Tooltip>
          //     )
        })
      }
    </ul>
  )
}

export default ItemShow
