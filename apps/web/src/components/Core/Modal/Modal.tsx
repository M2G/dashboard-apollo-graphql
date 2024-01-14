import type { JSX, MouseEventHandler, MutableRefObject } from 'react';
import { useEffect, useRef } from 'react';

import Portal from 'components/Core/Portal';

import styles from './Modal.module.scss';

interface IModal {
  children: any;
  hide: () => MouseEventHandler<HTMLButtonElement>;
  id?: string | undefined;
  isShowing: boolean;
  onConfirm: any;
  title: string;
}

function Modal({
  children,
  hide,
  id,
  isShowing,
  onConfirm,
  title,
}: IModal): JSX.Element | null {
  const ref: MutableRefObject<HTMLDivElement | undefined> = useRef();
  useEffect(() => {
    const checkIfClickedOutside = (e: Event): void => {
      if (ref.current && !ref.current.contains(e.target as HTMLDivElement)) {
        hide();
      }
    };
    document.addEventListener('mousedown', checkIfClickedOutside);
    return () => {
      document.removeEventListener('mousedown', checkIfClickedOutside);
    };
  }, [hide]);

  return isShowing ? (
    <Portal id={id}>
      <div className={styles.overlay}>
        <div className={styles.wrapper}>
          <div className={styles.modal} ref={ref}>
            <div className={styles.header}>
              <h5 className={styles.title}>{title}</h5>
              <button
                aria-label="Close"
                className={styles.close}
                data-bs-dismiss="modal"
                onClick={hide}
                type="button"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  height="24"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  width="24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <line x1="18" x2="6" y1="6" y2="18" />
                  <line x1="6" x2="18" y1="6" y2="18" />
                </svg>
              </button>
            </div>
            <div className={styles.body}>{children}</div>
            <div className="modal-footer border-top-0">
              <button
                className="btn btn-light me-2"
                onClick={onConfirm}
                type="button"
              >
                Confirmer
              </button>
              <button
                className="btn btn-light"
                data-bs-dismiss="modal"
                onClick={hide}
                type="button"
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

export default Modal;
