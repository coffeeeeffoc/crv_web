import { Space, Menu } from 'antd'
// import { DownOutlined } from '@ant-design/icons'
import { useSelector, useDispatch } from 'react-redux'
import Action from '@crv/utils/src/browser/actions'
import { dataActions } from '@/redux/actions'
import { ActionProps, OperationType, ListConfigProps, ViewProps } from '@/interfaces/ListConfig'
import DropdownCom from './Dropdown'
import { useCallback, useMemo } from 'react'
import { getTreeModelFields } from '@crv/utils/src/browser/business/fields'
/**
 * 顶部按钮属性
 */
export interface RowActionBarProps {
  record: any
  temp: any
  pagination: any
}

export default ({ record = {}, pagination }: RowActionBarProps) => {
  // 下拉按钮点击事件
  const { modelId, model, current, viewList }: ListConfigProps = useSelector((state: any) => state.config)

  const actionInstance = useMemo(() => new Action(), []);
  const dispatch = useDispatch()
  const {
    config: {
      actions: { row: { buttons, showCount } },
    }
  }: ViewProps = viewList[current]

  const refreshCallback = useCallback((data: any) => {
    dispatch(dataActions.setSelectRows({ viewId: current, selectedRowKeys: [], selectedRows: [] }))
    dispatch(dataActions.setPage({ viewId: current, pagination }))
  }, [dispatch, current, pagination])

  const operationClick = useCallback((operation: any) => {
    actionInstance.run({
      actions: operation.steps ?? [],
      context: {
        modelContext: {
          model: getTreeModelFields(model),
        },
        modelId,
        history: (window.top as any)?.history,
        refreshCallback
      },
      data: [{ id: record?.id }]
    })
  }, [actionInstance, model, modelId, refreshCallback, record?.id])

  /** 创建顶部按钮 */
  const buildTopShowButtons = useCallback((btns: ActionProps[], count: number): any => {
    let topShowBtns = btns
    if (btns.length > count) {
      topShowBtns = btns.slice(0, count)
    }
    return topShowBtns.map((btnArrSt: any, index) => {
      const btnArr = btnArrSt.operations
      if (btnArrSt.type === 'SINGLE') {
        const operationData = btnArr[0] ?? {}
        return (
          // <Tooltip title={operationData.statement} key={`statement-${operationData.id}`} placement='right'>
          <a title={operationData.statement} key={operationData.id} id={`${operationData.id}.${record?.id}`} onClick={e => operationClick(operationData)}>{operationData.name}</a>
          // </Tooltip>
        )
      } else {
        const comboMenus = (
          <Menu>
            {
              btnArr.map((operationData: any) => {
                return (
                  // <Tooltip title={operationData.statement} key={`state-${operationData.id}`} placement="right">
                  <Menu.Item title={operationData.statement} key={operationData.id} id={`${operationData.id}.${record.id}`} onClick={e => operationClick(operationData)}>
                    {operationData.name}
                  </Menu.Item>
                  // </Tooltip>
                )
              })
            }
          </Menu>
        )
        return (
          <DropdownCom comboMenus={comboMenus} id={`BUTTON_${index}_${record.id}`} key={`BUTTON_${index}_${record.id}`} textName={btnArrSt.name}/>
          // <Dropdown overlay={comboMenus} trigger={['click']}>
          //   <a key={`BUTTON_${index}_${record.id}`} id={`BUTTON_${index}_${record.id}`} type="primary">{btnArrSt.name} <DownOutlined /></a>
          // </Dropdown>
        )
      }
    })
  }, [operationClick, record?.id])
  /** 创建顶部下拉按钮 */
  const buildTopDownButtons = useCallback((btns: ActionProps[], count: number): any => {
    if (btns.length > count) {
      const downBtns = btns.slice(count)
      const downMenu = (
        <Menu>
          {
            downBtns.map((btnArrSt: any, index: number) => {
              const btnArr = btnArrSt.operations
              const temp = btnArr.map((operationData: OperationType) => (
                // <Tooltip title={operationData.statement} key={`state-${operationData.id}`} placement="right">
                <Menu.Item title={operationData.statement} key={operationData.id} id={`${operationData.id}.${record?.id}`} onClick={e => operationClick(operationData)}>
                  {operationData.name}
                </Menu.Item>
                // </Tooltip>
              ))
              if (temp.length > 0 && index + 1 < downBtns.length) {
                temp.push(<Menu.Divider key="Menu.Divider" />)
              }
              return temp
            })
          }
        </Menu>
      )
      return downMenu
    }
  }, [operationClick, record?.id])

  return (
    <Space align="center">
      {
        buildTopShowButtons(buttons, showCount)
      }
      {
        buttons.length > showCount && (
          <DropdownCom comboMenus={buildTopDownButtons(buttons, showCount)} id='MORE' key='MORE' textName='More'/>
          // <Dropdown trigger={['click']} overlay={buildTopDownButtons(buttons, showCount)}>
          //   <a id='MORE'>
          //     More <DownOutlined />
          //   </a>
          // </Dropdown>
        )
      }
    </Space>
  )
}
