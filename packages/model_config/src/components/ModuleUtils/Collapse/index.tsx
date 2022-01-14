import { Collapse } from 'antd'
import { FC, ReactNode } from 'react'
import './index.less'

const { Panel } = Collapse

interface CollapsePanelPropsType {
  children: ReactNode
  header: ReactNode
}
const CollapsePanel: FC<CollapsePanelPropsType> = ({
  children,
  header
}) => {
  return (
    <Collapse style={{ marginBottom: '10px ' }}>
      <Panel header='高级选项' forceRender={true} key='panelSt'>
        {children}
      </Panel>
    </Collapse>
  )
}

export default CollapsePanel
