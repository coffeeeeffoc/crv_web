import { Modal, ModalProps, ConfigProvider } from 'antd';
import styles from './index.less';
import classNames from 'classnames';
import { useDiffCallback } from '../hooks/basic/usePrevious';

interface BasicModalProps extends ModalProps {
  children?: React.ReactNode;
  onReOpen?: Function;
};

export default ({
  children,
  ...rest
}: BasicModalProps) => {
  useDiffCallback(rest.visible, () => {
    rest.visible && rest.onReOpen?.();
  });
  return (
    <Modal
      // 当modal设置了高度时，content可以在高度超出设置的范围时滚动，从而避免外层页面产生滚动条，故设contentScrollable
      className={classNames(styles.modal, rest.className, styles.contentScrollable)}
      closable={false}
      width='90vw'
      destroyOnClose
      okText='确定'
      cancelText='取消'
      {...rest}
    >
      {children}
    </Modal>
  );
};
