import { useState, useEffect, useRef } from 'react'
import { Input, Row, Space, Col, Tooltip } from 'antd'
import { useDispatch } from 'react-redux'
import DeleteModule from '@@/ModuleUtils/DeleteModule'
import { DownOutlined, UpOutlined, CloseOutlined } from '@ant-design/icons'
import { viewActions } from '@/redux/actions'
import { TargetListTitleType, OperationIdsType } from '../../interface'

const ListTitle = ({
  isEditTitle,
  setIsEditTitle,
  name,
  index,
  viewOperations,
  type,
  setIsFold,
  isFold
}: TargetListTitleType) => {
  const [value, setValue] = useState(name)
  const inputRef: any = useRef(null)

  const dispatch = useDispatch()
  const updateViewOperations = JSON.parse(JSON.stringify(viewOperations))

  useEffect(() => {
    setValue(name)
  }, [name])
  useEffect(() => {
    setTimeout(() => {
      inputRef.current?.focus()
    }, 0)
  }, [isEditTitle])

  const deleteOnClick = () => {
    updateViewOperations[type].splice(index, 1)
    viewOperations[type][index].operationIds.forEach((item: OperationIdsType, itemIndex: number) => {
      const updateOperation = { name: '', type: 'SINGLE', operationIds: [item] }
      updateViewOperations[type].splice(index + itemIndex, 0, updateOperation)
    })
    dispatch(viewActions.setViewData({ viewOperations: updateViewOperations }))
  }

  const editSure = () => {
    setIsEditTitle(false)
    updateViewOperations[type][index].name = value
    dispatch(viewActions.setViewData({ viewOperations: updateViewOperations }))
  }

  const downOutlinedClick = () => {
    setIsFold(false)
  }

  const upOutlinedClick = () => {
    setIsFold(true)
  }

  if (isEditTitle) {
    return (
      <div>
        <Row style={{ margin: '0 -4px' }}>
          <Input
            ref={inputRef}
            onBlur={editSure}
            onPressEnter={editSure}
            value={value}
            size='small'
            onChange={val => setValue(val.target.value)}
            style={{ width: '100%' }}
          />
        </Row>
      </div>
    )
  }

  return (
    <div>
      <Row>
        <Col span={16}>
          {name}
        </Col>
        <Col span={8} style={{ textAlign: 'right' }}>
          <Space>
            {!isFold &&
              <Tooltip placement="topLeft" title={'单击收起'}>
                <UpOutlined onClick={upOutlinedClick} />
              </Tooltip>}
            {isFold &&
              <Tooltip placement="topLeft" title={'单击展开'}>
                <DownOutlined onClick={downOutlinedClick} />
              </Tooltip>}
            <DeleteModule onConfirm={deleteOnClick}>
              <CloseOutlined />
            </DeleteModule>
          </Space>
        </Col>
      </Row>
    </div>
  )
}

export default ListTitle
