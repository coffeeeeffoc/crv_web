/**
 * modal展示组件
 */
import { Modal } from 'antd';
import styles from './index.less';
import classNames from 'classnames';
import React from 'react';

interface PropsType {
  children: React.ReactNode;
  [propsName: string]:any
}
export default ({
  children,
  ...rest
}: PropsType) => {
  return (
    <Modal
      // 当modal设置了高度时，content可以在高度超出设置的范围时滚动，从而避免外层页面产生滚动条，故设contentScrollable
      className={classNames(styles.modal, rest.className, styles.contentScrollable)}
      closable={false}
      footer={null}
      // destroyOnClose={true}
      // width='70vw'
      {...rest}
    >
      {children}
    </Modal>
  );
};
