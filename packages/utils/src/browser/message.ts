import { message as showMessage, Modal as showModal } from 'antd';
import type { MessageInstance } from 'antd/lib/message';
import type { ModalFuncProps } from 'antd/lib/modal/Modal';
import { isTop } from './utils';

export type { ModalFuncProps };

export const globalMessage = ({ message, messageType }: { message: string; messageType: string }, inCurrentPage = false) => {
  (inCurrentPage || isTop)
    ? (showMessage as any)[messageType](message)
    : (top as any).Mainframe?.getprompt({ type: 'Message', message, messageType });
};

export const message = new Proxy({}, {
  get: (target, property, receiver) => (msg: string, inCurrentPage = false) => globalMessage({
    message: msg,
    messageType: (property as string),
  }, inCurrentPage),
}) as MessageInstance;

export const confirm = (props: ModalFuncProps, inCurrentPage = false) => {
  if (isTop || inCurrentPage) {
    showModal.confirm(props);
  } else {
    (top as any).Mainframe?.getprompt({ ok: true, cancel: true, message: props.content, title: props.title, type: 'Modal', props });
  }
};

export default message;
