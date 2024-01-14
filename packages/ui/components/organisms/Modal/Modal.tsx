import type { ReactNode, MouseEventHandler, RefObject } from 'react';

import Portal from '../Portal';

import { useEffect, useRef } from 'react';
import { Button } from '../../atoms';

interface IModal {
  children: ReactNode;
  hide: () => MouseEventHandler<HTMLButtonElement>;
  id?: string;
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
}: IModal): ReactNode {
  const ref: RefObject<HTMLDivElement> = useRef();
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

  return (
    isShowing && (
      <Portal id={id}>
        <div className="fixed left-0 top-0 z-[100] h-screen w-screen bg-black/[.5]">
          <div className="fixed left-0 top-0 z-[101] flex h-full w-full items-center overflow-y-auto overflow-x-hidden outline-none">
            <div
              className="relative m-auto max-w-[400px] rounded-lg bg-[linear-gradient(to_top_right,rgba(39,39,42,1),rgba(24,24,27,1))] p-4 text-gray-900 shadow-[0_0.5rem_1rem_rgba(0,0,0,0.15)]"
              ref={ref}>
              <div className="relative flex items-center justify-between">
                <h4 className="mb-2 text-2xl font-bold text-white dark:text-white">
                  {title}
                </h4>
                <button
                  aria-label="Close"
                  className="absolute bottom-2 left-[calc(100%-20px)]"
                  data-bs-dismiss="modal"
                  onClick={hide}
                  type="button">
                  <svg
                    className="h-6 w-6 stroke-white"
                    fill="none"
                    height="24"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    width="24"
                    xmlns="http://www.w3.org/2000/svg">
                    <line x1="18" x2="6" y1="6" y2="18" />
                    <line x1="6" x2="18" y1="6" y2="18" />
                  </svg>
                </button>
              </div>
              <div className="mb-2 text-white">{children}</div>
              <div className="modal-footer border-top-0 flex justify-around">
                <Button
                  className="_:bg-white _:font-normal _:text-black"
                  onClick={onConfirm}
                  type="button">
                  Confirmer
                </Button>
                <Button
                  className="_:bg-white _:font-normal _:text-black"
                  data-bs-dismiss="modal"
                  onClick={hide}
                  type="button">
                  Close
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Portal>
    )
  );
}

export default Modal;
