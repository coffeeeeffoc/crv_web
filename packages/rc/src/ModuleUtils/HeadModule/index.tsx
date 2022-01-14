import { Divider, Space, Row, Col, Input, Button} from 'antd';
import type { FC, ReactNode } from 'react';
import { SearchOutlined } from '@ant-design/icons';

interface buttonsType {
  elementname: string;
  type: string;
}

interface propsDataType {
  textLeft?: string;
  onSearch?: any;
  buttonType?: ReactNode[];
  divider?: boolean;
  children?: any; 
}
const { Search } = Input;
/**
 * 头部组件封装
 */
const HeadModule: FC<propsDataType> =  ({
  textLeft,
  onSearch,
  buttonType = [],
  divider
}) => {

  const enterButton = <Button type='primary' id='SERACH_BUTTON' key='SERACH_BUTTON'>
    <SearchOutlined id='SEARCH_COIN'/>
  </Button>

  return (
    <>
      <Row>
        <Col span={12}>
          { onSearch &&<Search
            // elementname={elementname}
            key='SEARCH_INPUT'
            id='SEARCH_INPUT'
            placeholder='输入检索关键字'
            allowClear
            autoComplete='off'// 清除先前的记忆代码
            enterButton={enterButton}
            onSearch={onSearch}
          />}
          { textLeft && <span style={{ fontSize: '16px' }}>{textLeft}</span>}
        </Col>
        <Col span={12} style={{ textAlign: 'right' }}>
          <Space>
            {
              buttonType.map(item => {return item} )
            }
        </Space>
        </Col>
      </Row>
      {divider && <Divider style={{ margin: '10px 0' }} key='divider'/>}
    </>
    
  )
};
export default HeadModule;