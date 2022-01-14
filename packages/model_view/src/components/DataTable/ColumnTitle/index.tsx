import React, { FC } from 'react';
import { Popover } from 'antd';
import DropDownContent from './DropDownContent';
import { DownCircleOutlined } from '@ant-design/icons';

export interface ColumnTitleProps {
  title: string
  fixed?: boolean
  sort?: ('desc' | 'asc')
  filterContent?: any
  onChange: (value?: any) => void
  [key: string]: any
}

const ColumnTitle: FC<ColumnTitleProps> = ({ isShowIcon, title, fixed, sort, dataIndex, fieldType, filterContent, onChange, ...props }) => {
  const onClose = (val?: { sort: any, fixed: boolean, filter: any }) => {
    onChange(val)
  }
  return (
    <div style={{ paddingRight: 15, whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden', wordBreak: 'break-all' }}>
      {title}
      { isShowIcon && <Popover destroyTooltipOnHide={true} content={<DropDownContent fieldType={fieldType} value={{ fixed, sort, filter: filterContent }} onClose={onClose} {...props} />} placement="bottom">
        <DownCircleOutlined style={{ position: 'absolute', right: 5, paddingTop: 4, height: 22 }} />
      </Popover>}
    </div>
  )
}

export default ColumnTitle;
