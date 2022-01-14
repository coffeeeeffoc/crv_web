import { FC, ReactNode, useEffect, useState } from 'react'
import { Button, Input } from 'antd'
import { DashOutlined } from '@ant-design/icons'
import { useSelector } from 'react-redux'
import style from './index.less'
import ShowModel from '@@/ModuleUtils/ShowModal'
import SelectTable from './SelectTable'
import { ShowType } from '@/common/constant'
import OptionCreate from './OptionCreate'
import OptionEdit from './OptionEdit'
import { RecordType } from './interface'

interface EnumSelectPropsType {
  [propsName: string]: any
  value?: RecordType
  onChange?: (value: string) => void
}

const EnumSelect: FC<EnumSelectPropsType> = (props) => {
  console.log('enumConfig', props)
  const { enumOption: { show } } = useSelector((state: any) => state.field)
  const [inputValue, setInputValue] = useState<string | undefined>(props.value?.name ?? '')
  useEffect(() => {
    setInputValue(props.value?.name)
  }, [props.value?.name])
  // 控制model
  const [visible, setVisible] = useState<boolean>(false)
  // 控制model的title
  const [title, setTitle] = useState<ReactNode>('')
  // 所需要编辑的数据
  const [editData, setEditData] = useState({})
  const suffix: ReactNode = <Button key='OPTION_SELECT' id='OPTION_SELECT' type='primary' onClick={() => setVisible(true)}>
    < DashOutlined />
  </Button>
  return (
    <>
      <Input disabled={true} value={inputValue} suffix={suffix} className={style.enumSelect} placeholder={props.placeholder} />
      <ShowModel
        title={title}
        visible={visible}
        width='800px'
      >
        {
          show === ShowType.SELECT && <SelectTable {...props} setEditData={setEditData} setVisible={setVisible} setTitle={setTitle} />
        }
        {
          show === ShowType.CREATE && <OptionCreate setTitle={setTitle} />
        }
        {
          show === ShowType.EDIT && <OptionEdit setTitle={setTitle} editData={editData} />
        }
      </ShowModel>
    </>
  )
}

export default EnumSelect
