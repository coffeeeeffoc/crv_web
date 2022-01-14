import { Dropdown } from 'antd'
import { useState } from 'react'
import { DownOutlined } from '@ant-design/icons';

interface propsType {
  comboMenus: any
  id: string
  textName: any
}

const DropdownCom = ({
  comboMenus,
  id,
  textName
}: propsType) => {
  const [visible, setVisible] = useState<boolean>(false)
  return (
    <span onClick={() => setVisible(v => !v)}>
      <Dropdown overlay={comboMenus} trigger={['click']} visible overlayStyle={{ display: visible ? 'block' : 'none' }} key={`${id}-dropdown`}>
        <a key={id} id={id}>{textName} <DownOutlined /></a>
        {/* <Button key={btnArr[0].id} type="primary">{btnArr[0].displayName} <DownOutlined /></Button> */}
      </Dropdown>
    </span>
  )
}

export default DropdownCom
