import { ReactNode, useCallback, useMemo } from 'react'
import { Table } from 'antd'
import { useDrop } from 'react-dnd'
import { useDispatch } from 'react-redux'
import update from 'immutability-helper'
import tableStyle from './index.less'
import classNames from 'classnames'
import { viewActions } from '@/redux/actions'
import { TargetTablePropsType, SortType, TargetDataType } from './interfaceViewField'
import TargetList from './TargetList'

const TargetTable = ({
  components,
  tableAlign = 'target',
  targetData,
  rowSelection,
  defaultSort = []
}: TargetTablePropsType) => {
  const dispatch = useDispatch()
  const columns = [
    {
      title: '已选择列',
      dataIndex: 'displayName',
      ellipsis: true
    }
  ]
  const moveRow = useCallback(
    (item, hoverIndex) => {
      const { index, align, record } = item
      if (align !== tableAlign) {
        dispatch(viewActions.setViewData({
          defaultSort: update(defaultSort, {
            $splice: [
              [hoverIndex, 0, { [record.id]: SortType.ASC }]
            ]
          })
        }))
      } else {
        const dragRow = defaultSort[index]
        dispatch(viewActions.setViewData({
          defaultSort: update(defaultSort, {
            $splice: [
              [index, 1],
              [hoverIndex, 0, dragRow]
            ]
          })
        }))
      }
    }, [defaultSort, dispatch, tableAlign])

  // 双击更改数据
  const onDoubleClick = useCallback((index: any) => {
    const sortGenre = defaultSort[index][Object.keys(defaultSort[index])[0]]
    dispatch(viewActions.setViewData({
      defaultSort: sortGenre === SortType.ASC
        ? update(defaultSort, {
          $splice: [
            [index, 1, { [Object.keys(defaultSort[index])[0]]: SortType.DESC }]
          ]
        })
        : update(defaultSort, {
          $splice: [
            [index, 1, { [Object.keys(defaultSort[index])[0]]: SortType.ASC }]
          ]
        })
    }))
  }, [dispatch, defaultSort])

  const dataSource: Array<{ displayName: ReactNode, id: string }> = useMemo(() => targetData.map((item: TargetDataType, index: number) => {
    return {
      id: item.id,
      displayName: <TargetList {...item} index={index} defaultSort={defaultSort} />
    }
  }), [targetData, defaultSort])

  const [, drop] = useDrop({
    accept: 'dragSortList',
    drop: (item, monitor) => {
      if (monitor.didDrop()) {
        return
      }
      moveRow(item, targetData.length)
    },
  })

  return (
    <div ref={drop} >
      <Table
        className={classNames(tableStyle.sourceTable)}
        columns={columns}
        rowSelection={rowSelection}
        dataSource={dataSource}
        components={components}
        scroll={{ y: 'xxx' }}
        rowKey='id'
        onRow={(record, index) => ({
          align: tableAlign,
          index,
          record,
          moveRow,
          onDoubleClick: event => {
            onDoubleClick(index)
          },
        })}
        pagination={false}
      />
    </div>
  )
}

export default TargetTable
