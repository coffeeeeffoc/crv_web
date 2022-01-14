import { useCallback, useMemo } from 'react'
import { useAppSelector, useAppDispatch } from '@/redux'
import { DragTablePropsType, fieldsType } from '../interfaceViewField'
import DraggableTransfer from '@rc/DraggableTransfer'
import { viewActions } from '@/redux/actions'

const DragTable = ({ setTableValue }: DragTablePropsType) => {
  const { baseInfo } = useAppSelector(state => state.modelEdit)
  const { viewData } = useAppSelector(state => state.view)
  const dispatch = useAppDispatch()
  const fields: fieldsType[] = useMemo(() => baseInfo.fields ?? [], [baseInfo.fields])
  const viewFields: any[] = useMemo(() => viewData.viewFields ?? [], [viewData.viewFields])

  const targetId = useMemo(() => viewFields.map(({ id }) => id), [viewFields])

  const dataSource = useMemo(() => fields.map(f => ({ ...f, key: f.id })), [fields])
  const dataOnChange = useCallback((e: any) => {
    console.log('dataOnChange', e)
    const updateViewFields: typeof viewFields = []
    e.forEach((element: any) => {
      const viewFilter = viewFields.filter(({ id }) => id === element)
      if (viewFilter.length !== 0) {
        updateViewFields.push(viewFilter[0])
      } else {
        updateViewFields.push({
          id: element,
          showName: '',
          columnWidth: 200,
          contentFormat: '',
          content: '',
          headerAlign: 'LEFT',
          contentAlign: 'LEFT'
        })
      }
    });
    dispatch(viewActions.setViewData({ viewFields: updateViewFields }))
    // setTableValue(5)
  }, [viewFields, dispatch])

  const onSelectChange = useCallback((e: any) => {
    console.log(e)
  }, [])
  // 源字段以及目标字段
  // const [sourceData, setSourceData] = useState([] as SourceDataType[])
  // const [targetData, setTargetData] = useState([] as SourceDataType[])
  // // 行选择
  // const [selectedRowKeys, setSelectedKeys] = useState([] as SelectedKeyType[])

  // const dispatch = useDispatch()

  // useEffect(() => {
  //   setTargetData(viewFields.map(
  //     (item: viewFieldsType) => {
  //       const index = fields.findIndex(list => list.id === item.id)
  //       const currentFieldType = fields[index].fieldType
  //       // if(index !== -1) {
  //       if (associateFieldType.includes(currentFieldType)) {
  //         return {
  //           id: item.id,
  //           displayName: `${fields[index].name}(${item.id})`,
  //           columnWidth: item.columnWidth,
  //           contentFormat: item.summaryFormat,
  //           content: item.summary,
  //           showName: item.showName,
  //           headerAlign: item.headerAlign,
  //           contentAlign: item.contentAlign
  //         }
  //       }
  //       return {
  //         id: item.id,
  //         displayName: `${fields[index].name}(${item.id})`,
  //         columnWidth: item.columnWidth,
  //         summaryFormat: item.summaryFormat,
  //         summary: item.summary,
  //         showName: item.showName,
  //         headerAlign: item.headerAlign,
  //         contentAlign: item.contentAlign
  //       }
  //       // }
  //     }
  //   ))
  //   const filterSource = fields.filter(item => viewFields.findIndex((list: viewFieldsType) => list.id === item.id) === -1)
  //   setSourceData(
  //     filterSource.map(item => {
  //       return {
  //         id: item.id,
  //         name: item.name,
  //         displayName: `${item.name}(${item.id})`,
  //         columnWidth: 200,
  //         summaryFormat: '',
  //         showName: '',
  //         summary: '',
  //         content: '',
  //         contentFormat: '',
  //         headerAlign: 'LEFT',
  //         contentAlign: 'LEFT'
  //       }
  //     })
  //   )
  // }, [viewFields, fields])

  // const onSelectChange = (selectedRowKeys: SelectedKeyType[]) => {
  //   setSelectedKeys(selectedRowKeys)
  // }

  // const rowSelection = {
  //   selectedRowKeys,
  //   onChange: onSelectChange,
  // }

  // const components = {
  //   body: {
  //     row: DragTableBodyRow,
  //   },
  // }

  // const toTargetData = useCallback(() => {
  //   if (selectedRowKeys.length !== 0) {
  //     if (sourceData.findIndex(item => item.id === selectedRowKeys[0]) !== -1) {
  //       const updateViewFields: viewFieldsType[] = JSON.parse(JSON.stringify(viewFields))
  //       selectedRowKeys.forEach(item => {
  //         // const updateData: viewFieldsType = {
  //         //   id: item,
  //         //   columnWidth: 200,
  //         //   summaryFormat: '',
  //         //   showName: '',
  //         //   summary:'',
  //         //   headerAlign: 'LEFT',
  //         //   contentAlign: 'LEFT'
  //         // }
  //         const currentFieldType = fields[fields.findIndex((list: any) => list.id === item)].fieldType
  //         let updateData: viewFieldsType = {
  //           id: item,
  //           columnWidth: 200,
  //           summaryFormat: '',
  //           showName: '',
  //           summary: '',
  //           headerAlign: 'LEFT',
  //           contentAlign: 'LEFT'
  //         }
  //         if (associateFieldType.includes(currentFieldType)) {
  //           updateData = {
  //             id: item,
  //             columnWidth: 200,
  //             contentFormat: '',
  //             showName: '',
  //             content: '',
  //             headerAlign: 'LEFT',
  //             contentAlign: 'LEFT'
  //           }
  //         }
  //         updateViewFields.splice(updateViewFields.length, 0, updateData)
  //         setSelectedKeys([])
  //       })
  //       dispatch(viewActions.setViewData({ viewFields: updateViewFields }))
  //     }
  //   }
  // }, [selectedRowKeys, viewFields, dispatch, sourceData, fields])

  // const toSourceData = useCallback(() => {
  //   if (selectedRowKeys.length !== 0) {
  //     if (targetData.findIndex(item => item.id === selectedRowKeys[0]) !== -1) {
  //       const updateViewFields: viewFieldsType[] = JSON.parse(JSON.stringify(viewFields))
  //       selectedRowKeys.forEach(item => {
  //         const index = updateViewFields.findIndex(list => list.id === item)
  //         updateViewFields.splice(index, 1)
  //         setSelectedKeys([])
  //       })
  //       dispatch(viewActions.setViewData({ viewFields: updateViewFields }))
  //     }
  //   }
  // }, [selectedRowKeys, viewFields, dispatch, targetData])

  return (
    <>
      <DraggableTransfer
        listStyle={{
          width: 300,
          height: 'calc(100vh - 120px)',
        }}
        dataSource={dataSource}
        value={targetId}
        onChange={dataOnChange}
        dataIndex='id'
        titles={['待选择列', '已选择列']}
        onSelectChange={onSelectChange}
      />
      {/* <Row className={styles.rowHeight}>
        <Col span={10} style={{ border: '1px solid rgba(0, 0, 0, 0.06)', padding: 'auto', display: 'inline-block', boxSizing: 'content-box' }}>
          <SourceTable
            rowSelection={rowSelection}
            sourceData={sourceData}
            components={components}
            viewFields={viewFields}
          />
        </Col>
        <Col span={2} style={{ margin: '5px' }}>
          <div className={styles.buttonStyle}>
            <Button type='primary' disabled={sourceData?.findIndex(item => item?.id === selectedRowKeys[0]) === -1} onClick={toTargetData} style={{ top: '30%' }}><RightOutlined /></Button>
            <Button type='primary' disabled={targetData?.findIndex(item => item?.id === selectedRowKeys[0]) === -1} onClick={toSourceData} style={{ top: '45%' }}><LeftOutlined /></Button>
          </div>
        </Col>
        <Col span={10} style={{ border: '1px solid rgba(0, 0, 0, 0.06)', boxSizing: 'content-box' }}>
          <TargetTable
            rowSelection={rowSelection}
            targetData={targetData}
            components={components}
            setTableValue={setTableValue}
            viewFields={viewFields}
          />
        </Col>
      </Row> */}
    </>

  )
}

export default DragTable
