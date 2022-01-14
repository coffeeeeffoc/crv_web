/**
 * modal展示组件
 */
import { Modal } from 'antd'
import styles from './index.less'
import classNames from 'classnames'
import React from 'react'
// import { useReOpen } from './hooks'
interface propsType {
  children: React.ReactNode
  title?: React.ReactNode
  [propsName: string]: any
}
const ShowModal = ({
  children,
  ...rest
}: propsType) => {
  // useReOpen(rest.visible, rest.onReOpen)
  return (
    <Modal
      // 当modal设置了高度时，content可以在高度超出设置的范围时滚动，从而避免外层页面产生滚动条，故设contentScrollable
      className={classNames(styles.modal, rest.className, styles.contentScrollable)}
      closable={false}
      // title={false}
      footer={null}
      destroyOnClose
      width='70vw'
      // destroyOnClose
      bodyStyle={{ overflowY: 'auto' }}
      {...rest}
    >
      {children}
    </Modal>
  )
}

export default ShowModal
