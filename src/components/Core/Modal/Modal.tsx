import type { MouseEventHandler, MutableRefObject, JSX } from 'react';
import { useEffect, useRef } from 'react';
import Portal from 'components/Core/Portal';
import styles from './Modal.module.scss';

interface IModal {
  id?: string | undefined;
  isShowing: boolean;
  hide: () => MouseEventHandler<HTMLButtonElement>;
  onConfirm: any;
  title: string;
  children: any;
}

function Modal({
  id,
  isShowing,
  hide,
  title,
  onConfirm,
  children,
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
          <div className={styles.modal} ref={ref as any}>
            <div className={styles.header}>
              <h5 className={styles.title}>{title}</h5>
              <button
                type="button"
                className={styles.close}
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={hide}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-4 h-4"
                >
                  <line x1="18" x2="6" y1="6" y2="18" />
                  <line x1="6" x2="18" y1="6" y2="18" />
                </svg>
              </button>
            </div>
            <div className={styles.body}>{children}</div>
            <div className="modal-footer border-top-0">
              <button
                type="button"
                className="btn btn-light me-2"
                onClick={onConfirm}
              >
                Confirmer
              </button>
              <button
                type="button"
                className="btn btn-light"
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

export default Modal;
