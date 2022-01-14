import { FC, useCallback } from 'react'
import { Card } from './Card'
import update from 'immutability-helper'
import styles from './index.less'
import { Col, Row } from 'antd'
import { PlusSquareOutlined } from '@ant-design/icons'
import { SummaryCalculateType } from './index'
import { viewActions } from '@/redux/actions'
import { useDispatch } from 'react-redux'

interface ContainerProps {
  summaryCalculate: SummaryCalculateType[]
}

const Container: FC<ContainerProps> = ({
  summaryCalculate,
}) => {
  const dispatch = useDispatch()
  const addOnClick = useCallback(() => {
    dispatch(viewActions.setViewData({
      summaryCalculate: update(summaryCalculate, {
        $splice: [
          [summaryCalculate.length, 0, { id: summaryCalculate.length + 1, name: '', formula: '' }]
        ]
      })
    }))
  }, [summaryCalculate, dispatch])

  const moveCard = useCallback((dragIndex: number, hoverIndex: number) => {
    const dragCard = summaryCalculate[dragIndex]
    dispatch(viewActions.setViewData({
      summaryCalculate: update(summaryCalculate, {
        $splice: [
          [dragIndex, 1],
          [hoverIndex, 0, dragCard]
        ]
      })
    }))
  }, [summaryCalculate, dispatch])

  const renderCard = (card: SummaryCalculateType, index: number) => {
    return (
      <Card
        key={card.id}
        // key={`${JSON.stringify(card)}`}
        index={index}
        id={card.id}
        info={card}
        summaryCalculate={summaryCalculate}
        moveCard={moveCard}
      />
    )
  }

  return (
    <>
      <Row style={{ marginBottom: '5px' }}>
        <Col span={24}>
          点击右侧按钮添加汇总值，可拖拽调整汇总值的显示顺序
          <PlusSquareOutlined onClick={addOnClick} style={{ fontSize: '30px', float: 'right' }} />
        </Col>
      </Row>
      <div className={styles.container}>{summaryCalculate.map((card, i) => renderCard(card, i))}</div>
    </>
  )
}

export default Container
