import { FC, useState, useEffect, useMemo, useCallback } from 'react'
import { Table } from 'antd'
import ResizableTitle from './ResizableTitle'
import styles from './ResizableTitle.less'
// import VirtualTable from '@rc/TableUtils/VirtualTable'
import { dataActions } from '@/redux/actions'
import { useSelector, useDispatch } from 'react-redux'
import { ListDataProps, ViewDataListType } from '@/interfaces/ListConfig'
import { emptyData } from '@/constants/dataSliceConstant'
import update from 'immutability-helper'
import { getTextWidth } from '@utils/browser/string'
import { stringCharacterCount } from '@/utils/utilConvert'

const ResizeTable: FC<any> = (props) => {
  const dispatch = useDispatch()
  const { viewDataList, current }: ViewDataListType = useSelector((state: any) => state.data)
  const { temp = {} }: ListDataProps = viewDataList[current] ?? emptyData

  // 来源于reduce中的行变化
  const colsWidth: any = useMemo(() => temp?.colsWidth ?? {}, [temp.colsWidth])
  const [columns, setColumns] = useState(props.columns || [])
  const scroll: any = { scroll: { ...props.scroll } }

  const handleResize = useCallback((index: number) => (e: any, { size }: { size: any }) => {
    // 将拖拽后每列的宽度存入
    dispatch(dataActions.setColsWidth({
      viewId: current,
      colsWidth: update(colsWidth, {
        [columns[index].dataIndex]: {
          $set: size.width
        }
      })
    }))
  }, [current, dispatch, columns])

  useEffect(() => {
    setColumns(props.columns.map((col: any, index: number) => {
      return {
        ...col,
        width: colsWidth[col.dataIndex] ?? col.width
      }
    }))
  }, [props.columns, colsWidth])

  const resizeOnDoubleClick = useCallback((e: any, record: any) => {
    // TODO: 未必为最优法，可以考虑通过对应数据的dataIndex来获取dataSource的值，获得最大长度的值，通过只修改，或者修改相应样式
    if (e.target.className === 'react-resizable-handle') {
      console.log('双击拖拉鼠标符号时', record)
      // 计算当前列宽度
      const { dataSource } = props;
      let maxContent = record.title?.props?.title ?? '';
      let maxLength = stringCharacterCount(maxContent);
      (dataSource ?? []).forEach((item: any) => {
        const content = `${item[record.dataIndex] ?? ''}`;
        const charLength = stringCharacterCount(content)
        if (charLength > maxLength) {
          maxLength = charLength;
          maxContent = content;
        }
      })
      console.info('maxContent = ', maxContent)
      // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
      const w = getTextWidth(maxContent) + 10 + 20;
      dispatch(dataActions.setColsWidth({
        viewId: current,
        colsWidth: update(colsWidth, {
          [record.dataIndex]: {
            $set: w
          }
        })
      }))
    }
  }, [colsWidth, current, dispatch, props])

  const cols = useMemo(() => {
    let width: number = 0
    const tbWidth = document.getElementById(props.parentDomId)?.clientWidth
    const startCol = columns.map((col: any, index: number) => {
      width = width + (col.width as number)
      return {
        ...col,
        ellipsis: true,
        onHeaderCell: (column: any) => ({
          width: column.width,
          onResize: handleResize(index),
          onDoubleClick: (event: any) => resizeOnDoubleClick(event, col),
        })
      }
    })
    if (width <= (tbWidth ?? 0) && columns.length > 1) {
      // 删除最后一列的width
      // delete startCol[startCol.length - 1].width
    } else {
      // 列设置总和超出则
      scroll.scroll.x = width
    }
    return startCol
  }, [columns, handleResize, props.parentDomId, scroll.scroll])

  console.log('cols', cols)

  return (
    <Table
      {...props}
      components={{ header: { cell: ResizableTitle } }}
      className={props.className ? `${props.className} ${styles.crvResizable}` : styles.crvResizable}
      columns={cols}
      {...scroll}
    />
  )
}

export default ResizeTable
