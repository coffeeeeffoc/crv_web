import { Divider, Space, Row, Col, Input, Button } from 'antd'
import { FC, ReactNode } from 'react'
import { SearchOutlined } from '@ant-design/icons'

interface propsDataType {
  textLeft?: string
  onSearch?: any
  buttonType?: ReactNode[]
  divider?: boolean
  children?: any
}
const { Search } = Input
/**
 * 头部组件封装
 */
const HeadModule: FC<propsDataType> = ({
  textLeft,
  onSearch,
  buttonType = [],
  divider
}) => {
  const enterButton = <Button type='primary' id='SEARCH_BUTTON' key='SEARCH_BUTTON'>
    <SearchOutlined id='SEARCH_COIN' />
  </Button>

  return (
    <>
      <Row style={{ height: '32px' }}>
        <Col span={12}>
          {onSearch && <Search
            key='SEARCH_INPUT'
            id='SEARCH_INPUT'
            placeholder='输入检索关键字'
            allowClear
            autoComplete='off'// 清除先前的记忆代码
            enterButton={enterButton}
            onSearch={onSearch}
          />}
          {textLeft && <span key={textLeft} style={{ fontSize: '16px' }}>{textLeft}</span>}
        </Col>
        <Col span={12} style={{ textAlign: 'right', overflow: 'auto' }}>
          <Space>
            {
              buttonType
            }
          </Space>
        </Col>
      </Row>
      {divider && <Divider key='divider' style={{ margin: '10px 0 10px 0' }} />}
    </>

  )
}

export default HeadModule
