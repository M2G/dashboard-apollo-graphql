import type { MouseEventHandler } from 'react';
import clsx from 'clsx';
import Portal from 'components/Core/Portal';
import styles from './Modal.module.scss';

interface IModal {
  id: string | undefined;
  isShowing: boolean;
  hide: MouseEventHandler<HTMLButtonElement>;
  onConfirm: any;
  title: string;
  children: any;
}

interface IModalWrapper {
  id: string | undefined;
  isShowing: any;
  hide: any;
  title: any;
  onConfirm: any;
  children: any;
}

function Modal({
  id = '',
  isShowing,
  hide,
  title,
  onConfirm,
  children,
}: IModal): JSX.Element | null {
  return isShowing ? (
    <Portal id={id}>
      <div className={styles.overlay}>
        <div className={styles.wrapper}>
          <div className={clsx(styles.modal, 'modal-content rounded-4 shadow')}>
            <div className={clsx(styles.header, 'border-bottom-0')}>
              <h5 className="modal-title">{title}</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={hide}
              />
            </div>
            <div className="modal-body py-0">{children}</div>
            <div className="modal-footer flex-column border-top-0">
              <button
                type="button"
                className="btn btn-lg btn-primary w-100 mx-0 mb-2"
                onClick={onConfirm}
              >
                Confirmer
              </button>
              <button
                type="button"
                className="btn btn-lg btn-light w-100 mx-0"
                data-bs-dismiss="modal"
                onClick={hide}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </Portal>
  ) : null;
}

function ModalWrapper({
  id = undefined,
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
