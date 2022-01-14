import { FC, useCallback, useMemo, useState } from 'react'
import { Row, Col, Button } from 'antd'
import DraggableBodyRow from './DragableBodyRow'
import SourceTable from './SourceTable'
import TargetTable from './TargetTable'
import { RightOutlined, LeftOutlined } from '@ant-design/icons'
import styles from './index.less'

interface FieldListType {
  name: string
  id: string
}
interface PropsType {
  fieldList: FieldListType[]
  targetData: FieldListType[]
  setTargetData: (value: any) => void
  [propsName: string]: any
}
const TransferTable: FC<PropsType> = ({
  fieldList,
  targetData,
  setTargetData
}) => {
  const [selectedRowKeys, setSelectedKeys] = useState<string[]>([])
  const [selectedRows, setSelectedRows] = useState([])
  // 根据右列数据生成左列数据
  const sourceData = useMemo(() => fieldList.filter(source => targetData.findIndex(target => source.id === target.id) === -1), [targetData, fieldList])
  const onSelectChange = useCallback((selectedRowKeys: string[], selectedRows: []) => {
    setSelectedKeys(selectedRowKeys)
    setSelectedRows(selectedRows)
  }, [setSelectedKeys, setSelectedRows])
  const components = useMemo(() => {
    return {
      body: {
        row: DraggableBodyRow,
      }
    }
  }, [])
  const rowSelection = useMemo(() => {
    return {
      selectedRowKeys,
      onChange: onSelectChange
    }
  }, [onSelectChange, selectedRowKeys])
  // 左列数据右移
  const toTargetData = useCallback(() => {
    setTargetData([...targetData, ...selectedRows])
  }, [targetData, selectedRows, setTargetData])
  // 右列数据左移
  const toSourceData = useCallback(() => {
    setTargetData(targetData.filter(target => !selectedRowKeys.includes(target.id)))
  }, [selectedRowKeys, targetData, setTargetData])
  return (
    <>
      <Row style={{ marginBottom: '10px' }}>
        <Col span={10}>
          <span style={{ fontSize: '16px' }}>待选择列：</span>
          <div style={{ border: '1px solid rgba(0, 0, 0, 0.06)', boxSizing: 'content-box' }}>
            <SourceTable
              sourceData={sourceData}
              targetData={targetData}
              setTargetData={setTargetData}
              rowSelection={rowSelection}
              components={components}
            />
          </div>
        </Col>
        <Col span={4}>
          <div className={styles.buttonStyle}>
            <Button type='primary' disabled={sourceData?.findIndex(item => item?.id === selectedRowKeys[0]) === -1} onClick={toTargetData} style={{ top: '30%' }}><RightOutlined /></Button>
            <Button type='primary' disabled={targetData?.findIndex(item => item?.id === selectedRowKeys[0]) === -1} onClick={toSourceData} style={{ top: '45%' }}><LeftOutlined /></Button>
          </div>
        </Col>
        <Col span={10}>
          <span style={{ fontSize: '16px' }}>已选择列：</span>
          <div style={{ border: '1px solid rgba(0, 0, 0, 0.06)', boxSizing: 'content-box' }}>
            <TargetTable
              targetData={targetData}
              setTargetData={setTargetData}
              rowSelection={rowSelection}
              components={components}
            />
          </div>
        </Col>
      </Row>
    </>
  )
}

export default TransferTable
