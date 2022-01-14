import { useState, useCallback, useEffect, useMemo } from 'react'
import { Row, Col, Button } from 'antd'
import { useDispatch } from 'react-redux'
import { RightOutlined, LeftOutlined } from '@ant-design/icons'
import DragTableBodyRow from './dragSortList'
import TargetTable from './TargetTable'
import SourceTable from './SourceTable'
import styles from './index.less'
import { useAppSelector } from '@/redux'
import { viewActions } from '@/redux/actions'
import { SourceDataType, TargetDataType, fieldsType, SortType } from './interfaceViewField'
import update from 'immutability-helper'

const DragTable = ({ setTableValue }: any) => {
  const { baseInfo } = useAppSelector(state => state.modelEdit)
  const { viewData } = useAppSelector(state => state.view)
  const fields: fieldsType[] = useMemo(() => baseInfo.fields ?? [], [baseInfo.fields])
  const defaultSort: any = useMemo(() => viewData.defaultSort ?? [], [viewData.defaultSort])

  // 源字段以及目标字段
  const [sourceData, setSourceData] = useState<SourceDataType[]>([])
  const [targetData, setTargetData] = useState<TargetDataType[]>([])
  // 行选择
  const [selectedRowKeys, setSelectedKeys] = useState<React.Key[]>([])

  const dispatch = useDispatch()

  useEffect(() => {
    // 依据defaultSort解析出target和source
    setTargetData(defaultSort.map((item: any) => {
      const targetId = Object.keys(item)[0]
      const index = fields.findIndex(list => list.id === targetId)
      return {
        id: targetId,
        displayName: `${fields[index].name}(${targetId})`,
        sort: item[targetId]
      }
    }))
    const filterSource = fields.filter(item => defaultSort.findIndex((list: any) => Object.keys(list)[0] === item.id) === -1)
    setSourceData(
      filterSource.map(item => ({
        id: item.id,
        displayName: `${item.name}(${item.id})`
      }))
    )
  }, [defaultSort, fields])

  const onSelectChange = (selectedRowKeys: React.Key[]) => {
    setSelectedKeys(selectedRowKeys)
  }
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  }
  const components = {
    body: {
      row: DragTableBodyRow,
    },
  }
  const toTargetData = useCallback(() => {
    if (sourceData.findIndex(item => item.id === selectedRowKeys[0]) !== -1) {
      dispatch(viewActions.setViewData({
        defaultSort: update(defaultSort, {
          $push: selectedRowKeys.map(item => ({
            [item]: SortType.ASC
          }))
        })
      }))
      setSelectedKeys([])
    }
  }, [selectedRowKeys, defaultSort, dispatch, sourceData])

  const toSourceData = useCallback(() => {
    if (targetData.findIndex(item => item.id === selectedRowKeys[0]) !== -1) {
      const updateDefaultSort = JSON.parse(JSON.stringify(defaultSort))
      selectedRowKeys.forEach(item => {
        const index = updateDefaultSort.findIndex((list: any) => Object.keys(list)[0] === item)
        updateDefaultSort.splice(index, 1)
      })
      dispatch(viewActions.setViewData({ defaultSort: updateDefaultSort }))
      setSelectedKeys([])
    }
  }, [selectedRowKeys, defaultSort, dispatch, targetData])

  return (
    <div>
      <Row className={styles.rowHeight}>
        <Col span={6} style={{ border: '1px solid rgba(0, 0, 0, 0.06)', padding: 'auto', display: 'inline-block', boxSizing: 'content-box' }}>
          <SourceTable
            rowSelection={rowSelection}
            sourceData={sourceData}
            components={components}
            defaultSort={defaultSort}
          />
        </Col>
        <Col span={1} style={{ margin: '5px' }}>
          <div className={styles.buttonStyle}>
            <Button type='primary' disabled={sourceData?.findIndex(item => item?.id === selectedRowKeys[0]) === -1} onClick={toTargetData} style={{ top: '30%' }}><RightOutlined /></Button>
            <Button type='primary' disabled={targetData?.findIndex(item => item?.id === selectedRowKeys[0]) === -1} onClick={toSourceData} style={{ top: '45%' }}><LeftOutlined /></Button>
          </div>
        </Col>
        <Col span={6} style={{ border: '1px solid rgba(0, 0, 0, 0.06)', boxSizing: 'content-box' }}>
          <TargetTable
            rowSelection={rowSelection}
            targetData={targetData}
            components={components}
            setTableValue={setTableValue}
            defaultSort={defaultSort}
          />
        </Col>
      </Row>
    </div>

  )
}

export default DragTable
