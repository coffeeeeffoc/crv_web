import { FC, ReactNode, useCallback, useMemo } from 'react'
import { Row, Col } from 'antd'
import { useDispatch } from 'react-redux'
import { UpOutlined, DownOutlined } from '@ant-design/icons'
import { SortType } from '../interfaceViewField'
import { viewActions } from '@/redux/actions'
import update from 'immutability-helper'
interface TargetListPropsType {
  id: string
  displayName: string
  sort: SortType
  index: number
  defaultSort: any
}
const TargetList: FC<TargetListPropsType> = (props) => {
  const { displayName, id, sort, index, defaultSort = [] } = props
  const dispatch = useDispatch()
  const acsOnClick = useCallback(() => {
    dispatch(viewActions.setViewData({
      defaultSort: update(defaultSort, {
        $splice: [
          [index, 1, { [Object.keys(defaultSort[index])[0]]: SortType.ASC }]
        ]
      })
    }))
  }, [index, dispatch, defaultSort])
  const descOnClick = useCallback(() => {
    dispatch(viewActions.setViewData({
      defaultSort: update(defaultSort, {
        $splice: [
          [index, 1, { [Object.keys(defaultSort[index])[0]]: SortType.DESC }]
        ]
      })
    }))
  }, [index, dispatch, defaultSort])

  const SortCoin: ReactNode = useMemo(() => {
    if (sort === SortType.ASC) {
      return <UpOutlined title='升序，点击降序' style={{ float: 'right', color: 'red' }} onClick={descOnClick} />
    } else {
      return <DownOutlined title='降序，点击升序' style={{ float: 'right', color: 'green' }} onClick={acsOnClick} />
    }
  }, [sort, acsOnClick, descOnClick])

  return (
    <>
      <Row>
        <Col span={24} style={{ paddingRight: '10px' }}>
          <span key={id}>{displayName}</span>
          {
            SortCoin
          }
        </Col>
      </Row>
    </>
  )
}

export default TargetList
