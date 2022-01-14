import { FC } from 'react';
import { Tag } from 'antd';
import { CloseOutlined, SortDescendingOutlined, SortAscendingOutlined } from '@ant-design/icons';

const SortStatusBar: FC<any> = ({ field, order, onCancel }) => {
  return (
    <Tag icon={order === 'asc' ? <SortAscendingOutlined /> : <SortDescendingOutlined />} color="blue" style={{ lineHeight: '30px', borderRadius: 15, fontSize: 14, color: '#9a9696' }}>
      <span>排序：</span>
      <span style={{ color: '#096dd9', marginRight: 10 }}>{field}</span>
      <CloseOutlined onClick={onCancel} />
    </Tag>
  )
}

export default SortStatusBar;
