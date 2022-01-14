import { Dropdown, Button } from 'antd'
import { useCallback, useState } from 'react'
import { DownOutlined } from '@ant-design/icons';

interface propsType {
  comboMenus: any
  id: string
  buttonName: any
}

const DropdownCom = ({
  comboMenus,
  id,
  buttonName
}: propsType) => {
  const [visible, setVisible] = useState<boolean>(false)
  const onClick = useCallback(() => setVisible(v => !v), [])
  return (
    <span onClick={onClick}>
      <Dropdown overlay={comboMenus} trigger={['click']} visible overlayStyle={{ display: visible ? 'block' : 'none' }} key={`${id}-dropdown`}>
        <Button key={id} id={id} type={id === 'MORE_OPERATIONS' ? 'default' : 'primary'}>{buttonName} <DownOutlined /></Button>
        {/* <Button key={btnArr[0].id} type="primary">{btnArr[0].displayName} <DownOutlined /></Button> */}
      </Dropdown>
    </span>
  )
}

export default DropdownCom
