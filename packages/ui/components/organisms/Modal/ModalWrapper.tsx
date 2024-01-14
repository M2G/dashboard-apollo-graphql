import Modal from './Modal';

interface IModalWrapper {
  children: any;
  hide: any;
  id?: string | undefined;
  isShowing: any;
  onConfirm: any;
  title: any;
}

function ModalWrapper({
  children,
  hide,
  id,
  isShowing,
  onConfirm,
  title,
}: IModalWrapper): JSX.Element {
  return (
    <Modal
      hide={hide}
      id={id}
      isShowing={isShowing}
      onConfirm={onConfirm}
      title={title}>
      {children}
    </Modal>
  );
}

export default ModalWrapper;
