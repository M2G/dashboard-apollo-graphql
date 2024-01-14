import type { JSX } from 'react';
import Modal from './Modal';

interface IModalWrapper {
  id?: string | undefined;
  isShowing: any;
  hide: any;
  title: any;
  onConfirm: any;
  children: any;
}

function ModalWrapper({
  id,
  isShowing,
  hide,
  title,
  onConfirm,
  children,
}: IModalWrapper): JSX.Element {
  return (
    <Modal
      id={id}
      isShowing={isShowing}
      hide={hide}
      title={title}
      onConfirm={onConfirm}
    >
      {children}
    </Modal>
  );
}

export default ModalWrapper;
