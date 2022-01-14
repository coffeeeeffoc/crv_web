import type { ReactNode } from 'react';
import { Button, Space } from 'antd';
import classNames from 'classnames';
import styles from './index.less';
import React from 'react';

interface PageHeaderProps {
  title: string | ReactNode;
  buttons?: ReactNode;
  onOk?: React.MouseEventHandler<HTMLElement>,
  onCancel?: React.MouseEventHandler<HTMLElement>,
  okText?: string | ReactNode;
  cancelText?: string | ReactNode;
  className?: string;
  style?: React.CSSProperties;
};

export default ({
  title,
  buttons,
  onOk,
  okText,
  onCancel,
  cancelText,
  className,
  style,
}: PageHeaderProps) => {
  const showOk = onOk ?? okText;
  const showCancel = onCancel ?? cancelText;
  const defaultButtons = [
    showOk && <Button type='primary' onClick={onOk} >{okText ?? '保存'}</Button>,
    showCancel && <Button type='primary' onClick={onCancel} >{cancelText ?? '返回'}</Button>,
  ];

  return (
    <div className={classNames(className, styles.pageHeader)} style={style} >
      <header>
        {title}
      </header>
      <Space>
        {buttons ?? (defaultButtons.filter(Boolean).map((item, index) => React.cloneElement((item as any), { key: index })))}
      </Space>
    </div>
  )
};
