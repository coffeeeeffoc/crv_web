import { useState } from 'react'
import { Row, Col } from 'antd'
import EditableTable from './EditTable'
// import DragTable from './DragTable'
import styles from './DragTable/index.less'
import ViewFieldTransfer from './Transfer'

export default function ViewInterface () {
  const [tableValue, setTableValue] = useState<string>('')

  return (
    <div className={styles.rowHeight}>
      <Row>
        <Col span={14} style={{ paddingRight: 10 }}>
          {/* <DragTable setTableValue={setTableValue} /> */}
          <ViewFieldTransfer setTableValue={setTableValue}/>
        </Col>
        <Col span={10} style={{ paddingLeft: 10 }}>
          <EditableTable
            tableValue={tableValue}
          />
        </Col>
      </Row>
    </div>
  )
}
