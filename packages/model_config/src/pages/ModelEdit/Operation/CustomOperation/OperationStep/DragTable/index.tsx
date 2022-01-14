import { useCallback, useEffect, useMemo, useState } from 'react'
import update from 'immutability-helper'
import { displayOperationType, OperationType, innerURLOption, EnumPageType, EnumCallApiType, EnumInnerPageType, operateTypeConfig } from '../constants'
import { OPERATION_ELEMENT } from '@/common/elementName'
import EditText from '@@/ModuleUtils/EditText'
import style from './index.less'
import DragTable from '@@/TableUnit/DragTable'
import { ShowType } from '@/common/constant'
import { post } from '@utils/browser/request'
import API_URL from '@/services/apiUrlConstants'
// import message from '@utils/browser/message'

interface propsType {
  dataSource: any[]
  onChange: any
  setVisible: any
  setShow: (value: ShowType) => void
  setOperationStepValue: any
  modelId: string
}

const DragOperationTable = ({
  dataSource,
  onChange,
  setVisible,
  setShow,
  setOperationStepValue,
  modelId
}: propsType) => {
  const [currentModelId, setCurrentModelId] = useState<any[]>([])
  const [modelInfo, setModelInfo] = useState<any>({})

  useEffect(() => {
    // the currentModelId existence and modelInfo do not include currentModelId
    const modelGather: any = {}
    new Promise((resolve: any, reject: any) => {
      let temp = 0
      currentModelId?.forEach(item => {
        post(API_URL.RETRIEVE_REQUIRE, { modelId: item, views: [], forms: [], baseInfo: true }).then((res: any) => {
          temp++
          if (res.status === 200) {
            const result = res.data.result?.[0] ?? {}
            modelGather[item] = {
              views: result.views ?? [],
              forms: result.forms ?? [],
              name: result.name,
              id: result.id
            }
          }
          if (temp === currentModelId.length) {
            resolve()
          }
        }).catch((err) => {
          reject(err)
          console.log('err', err)
        })
      })
    }).then(() => setModelInfo(modelGather))
  }, [currentModelId])

  useEffect(() => {
    const modelIdArr: any[] = []
    dataSource?.forEach(item => {
      if (item.modelId && !modelIdArr.includes(item.modelId)) {
        modelIdArr.push(item.modelId)
      }
    })
    setCurrentModelId(modelIdArr)
  }, [dataSource])

  // edit button, change the operationStepValue and open operationStep page
  const clickEdit = useCallback((record: any, index: number) => {
    setOperationStepValue({ ...record, index: index })
    setVisible(true)
    setShow(ShowType.EDIT)
  }, [setOperationStepValue, setVisible, setShow])

  // delete button, delete this operationStep
  const clickDelete = useCallback((index: any) => {
    onChange(update(dataSource, {
      $splice: [
        [index, 1]
      ]
    }))
  }, [dataSource, onChange])

  const operateActionTransform = useCallback((text: string, record: any, modelGatherInfo: any) => {
    console.log('record', record)
    const pageTypeTransform = () => {
      switch (record.pageType) {
        case EnumPageType.INNER_PAGE:
        {
          const currentModelInfo = modelGatherInfo[record.modelId] ?? {}
          switch (record.innerPageType) {
            case EnumInnerPageType.VIEW:
            {
              const currentView: any[] = currentModelInfo.views?.filter((v: any) => v.id === record.viewId) ?? []
              return currentView.length > 0
                ? `${displayOperationType[text]}(模型-视图：${currentModelInfo.name ?? currentModelInfo.id}-${currentView[0].name})`
                : `${displayOperationType[text]}(${record.viewId})`
            }
            case EnumInnerPageType.FORM:
            {
              const currentForm: any[] = currentModelInfo?.forms?.filter((v: any) => v.id === record.formId) ?? []
              return currentForm.length > 0
                // ? `${displayOperationType[text]}(模型-表单：${currentModelInfo.name ?? currentModelInfo.id}，表单：${currentForm[0].name})`
                ? `${displayOperationType[text]}(模型-表单：${currentModelInfo.name ?? currentModelInfo.id}-${currentForm[0].name}, 操作：${operateTypeConfig.filter(({ value }) => value === record.formType)?.[0].name})`
                : `${displayOperationType[text]}(${record.formId})`
            }
            default:
              return displayOperationType[text] ?? text
          }
        }
        case EnumPageType.EXTERNAL_PAGE:
          return `${displayOperationType[text]}(外部页面链接名称：${record.externalPage?.name})`
        default:
          return displayOperationType[text] ?? text
      }
    }
    switch (text) {
      case OperationType.CALL_API:
      {
        switch (record.callApiType) {
          case EnumCallApiType.INNER_API:
            return `${displayOperationType[text]}(标准服务：${innerURLOption.filter(({ value }) => value === record.innerApi)?.[0]?.name})`
          case EnumCallApiType.EXTERNAL_API:
            return `${displayOperationType[text]}(特殊服务：${record.externalApi?.name})`
          default:
            return text
        }
      }
      case OperationType.FORM_SWITCH:
        return pageTypeTransform()
      case OperationType.OPEN_MODAL:
        return pageTypeTransform()
      case OperationType.OPEN_TOP_TAB:
        return pageTypeTransform()
      default:
        return displayOperationType[text] ?? text
    }
  }, [])

  const columns = useMemo(() => [
    {
      title: '序号',
      dataIndex: 'index',
      key: 'name',
      align: 'center',
      width: 50,
      render: (_: any, __: any, index: number) => index + 1
    },
    {
      title: '操作',
      width: 100,
      align: 'center',
      render: (_: any, record: {
        id: string
        [propsName: string]: any
      }, index: number) => (
        <EditText
          editClick={() => clickEdit(record, index)}
          deleteClick={() => clickDelete(index)}
          editElementName={`${OPERATION_ELEMENT.STEP_EDIT}_${record.id}`}
          deleteElementName={`${OPERATION_ELEMENT.STEP_DELETE}_${record.id}`} />
      )
    },
    {
      title: '动作',
      // width: '30%',
      dataIndex: 'stepType',
      ellipsis: true,
      render: (text: string, record: any) => operateActionTransform(text, record, modelInfo)
    },
    {
      title: '步骤说明',
      dataIndex: 'statement',
      ellipsis: true,
    }
  ], [modelInfo, clickDelete, operateActionTransform, clickEdit])

  const moveRow = useCallback((dragIndex, hoverIndex) => {
    const dragRow = dataSource[dragIndex]
    const newData = update(dataSource, {
      $splice: [
        [dragIndex, 1],
        [hoverIndex, 0, dragRow]
      ]
    })
    onChange(newData)
  }, [dataSource, onChange])

  return (
    <DragTable
      className={style.table}
      columns={columns}
      dataSource={dataSource}
      onRow={(record: any, index: number) => ({
        index,
        moveRow,
      })}
      scroll={{ y: 'xxx' }}
    />
  )
}

export default DragOperationTable
