import { FC, useCallback, useMemo } from 'react'
import { Button } from 'antd'
import { useSelector, useDispatch } from 'react-redux'
import { sortData } from '@/utils/sortData'
import TableListShow from '@@/TableListShow'
import { POST_REQUEST } from '@/services/postServices'
import EditText from '@/components/ModuleUtils/EditText'
import { FORM_CONFIG_ELEMENT } from '@/common/elementName'
// import { TabPropsType } from '@/interfaces/Common'
import { modelEditActions } from '@/redux/actions'
import { getRealUrl } from '@crv/utils/../../../project.config.js'
import { CurrentTabType } from '@/common/constant'

const { deleteFormConfig } = POST_REQUEST

interface TabPropsType {
  modelId: string | number
  [propsName: string]: any
}

const FormConfig: FC<TabPropsType> = (props) => {
  const { modelId } = props

  const dispatch = useDispatch()
  const { baseInfo } = useSelector((state: any) => state.modelEdit)

  const forms = useMemo(() => baseInfo.forms ?? [], [baseInfo.forms])

  const columns = [
    {
      title: '操作',
      width: '100px',
      align: 'center',
      render: (val: any, record: any, index: any) => (
        <EditText
          editClick={() => formConfigEdit(record)}
          deleteClick={() => formConfigDelete(record)}
          editElementName={`${FORM_CONFIG_ELEMENT.EDIT}_${record.id}`}
          deleteElementName={`${FORM_CONFIG_ELEMENT.DELETE}_${record.id}`}
        />
      )
    },
    {
      dataIndex: 'id',
      title: 'ID',
      width: '100px',
      ellipsis: true
    },
    {
      dataIndex: 'name',
      title: '名称',
      width: '30%',
      ellipsis: true,
    },
    {
      dataIndex: 'statement',
      title: '说明',
      ellipsis: true
    }
  ]

  const buttonType = [
    <Button
      onClick={() => {
        (window.top as any)?.Mainframe?.openAsMenuApi({
          title: '新建表单',
          path: getRealUrl(`/crv_form_config/config/model/${modelId}/create`),
          visibleType: false,
          onDestroy: () => {
            dispatch(modelEditActions.setUpdate('update'))
            dispatch(modelEditActions.setCurrentTab({ currentTab: CurrentTabType.FORM }))
          }
        })
      }}
      id={FORM_CONFIG_ELEMENT.CREATE}
      type='primary'
      key='create'
    >新建</Button>
  ]

  // 编辑数据
  const formConfigEdit = useCallback((record: any) => {
    // 点击编辑后跳转
    (window.top as any)?.Mainframe?.openAsMenuApi({
      title: record.name,
      path: getRealUrl(`/crv_form_config/config/model/${modelId}/form/${record.id}`),
      visibleType: false,
      onDestroy: () => {
        dispatch(modelEditActions.setUpdate('update'))
        dispatch(modelEditActions.setCurrentTab({ currentTab: CurrentTabType.FORM }))
      },
      data: {
        record,
      },
    })
  }, [dispatch, modelId])

  const formConfigDelete = useCallback((record: any) => {
    dispatch(deleteFormConfig({ model: { id: modelId, forms: [{ id: record.id }] } }))
    dispatch(modelEditActions.setCurrentTab({ currentTab: CurrentTabType.FORM }))
  }, [dispatch, modelId])

  return (
    <TableListShow
      tabType='formConfig'
      dataSource={sortData(forms)}
      filterCondition={['id', 'name', 'statement']}
      buttonType={buttonType}
      columns={columns}
      rowSelection={false}
    />
  )
}

export default FormConfig
