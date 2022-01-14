import { FC, useState, ReactNode, useCallback, useMemo } from 'react'
import { Button } from 'antd'
import ShowModal from '@rc/ModuleUtils/ShowModal'
import HeadModule from '@rc/ModuleUtils/HeadModule'
import TransferTable from './TransferTable'

interface FieldListType {
  name: string
  id: string
}
export interface ColumnSettingProps {
  visible: boolean
  fieldList: FieldListType[]
  value: any[]
  onChange: (...args: any[]) => any
  onCancel: (...args: any[]) => any
}

/**
 * 列设置弹层
 */
const ColumnSetting: FC<ColumnSettingProps> = ({ visible, fieldList, value = [], onChange, onCancel }) => {
  const [targetData, setTargetData] = useState(value)

  const onOk = useCallback(() => {
    if (onChange) {
      onChange(targetData)
    }
    onCancel()
  }, [targetData, onChange, onCancel])

  const buttonType = useMemo(() => [
    <Button key='sure' size='small' type='primary' onClick={onOk}>确定</Button>,
    <Button key='cancel' size='small' type='primary' className='cancelBtn' onClick={onCancel}>取消</Button>
  ], [onOk, onCancel])

  const title: ReactNode = useMemo(() => <HeadModule textLeft='列设置' buttonType={buttonType} />, [buttonType])

  return (
    <ShowModal
      title={title}
      visible={visible}
      // bodyStyle={{ padding: '10px 0 10px 10px' }}
    >
      <TransferTable targetData={targetData} setTargetData={setTargetData} fieldList={fieldList}/>
      {/* <Transfer
        listStyle={{ width: 230, height: 300 }}
        dataSource={fieldList.map((item: any) => ({ key: item.id, title: item.name }))}
        titles={['待选择列', '已选择列']}
        targetKeys={targetKeys}
        selectedKeys={selectedKeys}
        onChange={onTransChange}
        onSelectChange={onSelectChange}
        render={(item: any) => <Tooltip placement="right" title={item.key}>{item.title}</Tooltip>}
      /> */}
    </ShowModal>
  )
}

export default ColumnSetting
