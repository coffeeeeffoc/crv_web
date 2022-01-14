import DropdownCom from './Dropdown'
import { Button, Space, Menu } from 'antd'
import ColumnSetting from './ColumnSetting'
import { SaveOutlined } from '@ant-design/icons'
import Action from '@crv/utils/src/browser/actions'
import { useCallback, useMemo, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { conditionCombin } from '@/utils/listPreprocessing'
import { ActionTargetDataType } from '@/constants/constant'
import { configActions, dataActions } from '@/redux/actions'
import { emptyData, emptyConfig } from '@/constants/dataSliceConstant'
import { ListDataProps, ViewDataListType } from '@/interfaces/ListConfig'
import { getTreeModelFields } from '@crv/utils/src/browser/business/fields'
import { ActionProps, OperationType, ListConfigProps, ViewProps } from '../../interfaces/ListConfig'

export default () => {
  const dispatch = useDispatch()

  const [colSettingVisible, setColSettingVisible] = useState<boolean>(false)
  const { modelId, model, current, viewList }: ListConfigProps = useSelector((state: any) => state.config)
  const {
    config: {
      viewFields = [],
      viewDataFilter,
      filterFields,
      actions: { top: { buttons, showCount } },
      showColumns
    }
  }: ViewProps = viewList[current] ?? emptyConfig;

  const { viewDataList }: ViewDataListType = useSelector((state: any) => state.data)
  const { data: { pagination }, temp = {} }: ListDataProps = viewDataList[current] ?? emptyData
  const { selectedRowKeys = [], selectedRows = [], selectAll: tempSelectAll = false } = temp;

  const actionInstance = useMemo(() => new Action(), [])

  const refreshCallback = useCallback((data: any) => {
    dispatch(dataActions.setPage({ viewId: current, pagination }))
    dispatch(dataActions.setSelectRows({ viewId: current, selectedRowKeys: [], selectedRows: [] }))
    dispatch(dataActions.setSelectAll({ viewId: current, selectAll: false }))
  }, [dispatch, current, pagination])

  // 操作点击事件
  const operationClick = useCallback((operation: OperationType) => {
    // 当目标数据为选择多行数据 && 支持数据全选功能 && 已勾选选择全部数据时，data为筛选条件
    if (operation.targetData === ActionTargetDataType.MULTIPLE && operation.selectAll && tempSelectAll) {
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
        data: [],
        filters: conditionCombin(temp, viewFields, viewDataFilter) // filterStringFun(temp.filters)
      })
    } else {
      // 否则为所选行的id数组
      actionInstance.run({
        actions: operation.steps ?? [],
        context: {
          modelContext: {
            model: getTreeModelFields(model),
          },
          modelId,
          refreshCallback
        },
        data: selectedRows.map(({ id, version }: any) => { return { id, version } })
      })
    }
    // TODO:将按钮事件存在于slice中
  }, [tempSelectAll, actionInstance, model, modelId, refreshCallback, temp, viewFields, viewDataFilter, selectedRows])

  /** 按钮是否禁用 */
  const btnIsDisable = useCallback((operationType: OperationType) => {
    const { selectAll, targetData } = operationType
    // 根据操作的目标数据决定是否禁用
    if (targetData === ActionTargetDataType.NO_SEL_DATA) { return false }
    if (targetData === ActionTargetDataType.ONLY_ONE && selectedRowKeys.length === 1) { return false }
    if (targetData === ActionTargetDataType.MULTIPLE) {
      if (selectedRowKeys.length > 0) return false
      if (selectAll && tempSelectAll) return false
    }
    return true
  }, [selectedRowKeys, tempSelectAll])

  /** 创建顶部按钮 */
  const buildTopShowButtons = useCallback((btns: ActionProps[], count: number): any => {
    let topShowBtns = btns
    if (btns.length > count) {
      topShowBtns = btns.slice(0, count)
    }
    return topShowBtns.map((btnArrSt: any, index) => {
      const btnArr = btnArrSt.operations
      if (btnArrSt.type === 'SINGLE') {
        const operationData = btnArr[0]
        return (
          <Button
            title={operationData.statement}
            disabled={btnIsDisable(operationData)}
            onClick={e => operationClick(operationData)}
            id={`${modelId}.${operationData.id}`}
            key={operationData.id}
            type='primary'
          >{operationData.name}</Button>
        )
      } else {
        const comboMenus = (
          <Menu forceSubMenuRender>
            {/* <Menu onClick={menuClick}> */}
            {
              btnArr.map((operationData: any) => {
                // btnArr.slice(1).map((operationData: any) => {
                return (
                  // <Tooltip title={operationData.statement} key={`state-${operationData.id}`} placement='left'>
                  <Menu.Item disabled={btnIsDisable(operationData)} key={operationData.id} id={`${modelId}.${operationData.id}`} title={operationData.statement} onClick={e => operationClick(operationData)}>
                    {operationData.name}
                  </Menu.Item>
                  // </Tooltip>
                )
              })
            }
          </Menu>
        )
        return (
          <DropdownCom comboMenus={comboMenus} id={`BUTTON_TOP_${index}`} key={`BUTTON_TOP_${index}`} buttonName={btnArrSt.name} />
          // <span onClick={() => setVisible(v => !v)}>
          //   <Dropdown overlay={comboMenus} trigger={['click']} visible overlayStyle={{ display: visible ? 'block' : 'none' }}>
          //     <Button key={`BUTTON_TOP_${index}`} id={`BUTTON_TOP_${index}`} type='primary'>{btnArrSt.name} <DownOutlined /></Button>
          //     {/* <Button key={btnArr[0].id} type='primary'>{btnArr[0].displayName} <DownOutlined /></Button> */}
          //   </Dropdown>
          // </span>
        )
      }
    })
  }, [btnIsDisable, modelId, operationClick])
  /** 创建顶部下拉按钮 */
  const buildTopDownButtons = useCallback((btns: ActionProps[], count: number): any => {
    if (btns.length > count) {
      const downBtns = btns.slice(count)
      const downMenu = (
        <Menu>
          {/* <Menu onClick={menuClick}> */}
          {
            downBtns.map((btnArrSt: any, index) => {
              const btnArr = btnArrSt.operations
              const temp = btnArr.map((operationData: OperationType) => (
                // <Tooltip title={operationData.statement} key={`state-${operationData.id}`} placement='left'>
                <Menu.Item disabled={btnIsDisable(operationData)} title={operationData.statement} key={operationData.id} id={`${modelId}.${operationData.id}`} onClick={e => operationClick(operationData)}>
                  {operationData.name}
                </Menu.Item>
                // </Tooltip>
              ))
              if (temp.length > 0) {
                temp.push(<Menu.Divider key={`Menu.Divide_${index}`} />)
              }
              return temp
            })
          }
          <Menu.Item id='COLS_SETTING' key='COLS_SETTING' icon={<SaveOutlined />} onClick={e => setColSettingVisible(true)}>
            列设置
          </Menu.Item>
        </Menu>
      )
      return downMenu
    } else {
      return (
        <Menu>
          <Menu.Item id='COLS_SETTING' key='COLS_SETTING' icon={<SaveOutlined />} onClick={e => setColSettingVisible(true)}>
            列设置
          </Menu.Item>
        </Menu>
      )
    }
  }, [btnIsDisable, modelId, operationClick])

  return (
    <>
      <Space align='end' wrap style={{ justifyContent: 'flex-end' }}>
        {
          buildTopShowButtons(buttons, showCount)
        }
        <DropdownCom comboMenus={buildTopDownButtons(buttons, showCount)} id='MORE_OPERATIONS' key='MORE_OPERATIONS' buttonName='更多操作' />
        {/* <Dropdown trigger={['click']} overlay={buildTopDownButtons(buttons, showCount)}>
          <Button id='MORE_OPERATIONS'>
            更多操作 <DownOutlined />
          </Button>
        </Dropdown> */}
      </Space>
      {colSettingVisible && <ColumnSetting value={showColumns} visible={colSettingVisible} fieldList={filterFields} onCancel={() => setColSettingVisible(false)} onChange={(cols: any[]) => dispatch(configActions.setShowColumn({ modelId, viewId: current, columns: cols }))} />}
    </>
  )
}
