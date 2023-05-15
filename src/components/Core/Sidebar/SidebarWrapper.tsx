import type { Dispatch, ReactNode, SetStateAction } from 'react';
import clsx from 'clsx';
import Background from './Background';
import styles from './Sidebar.module.scss';

interface ISidebar {
  show: boolean;
  setIsOpened: Dispatch<SetStateAction<boolean>>;
  children: ReactNode;
}

interface ISidebarWrapper {
  isOpened: boolean;
  setIsOpened: Dispatch<SetStateAction<boolean>>;
  children: ReactNode;
}

function Sidebar({ show, setIsOpened, children }: ISidebar): JSX.Element {
  return (
    <div
      className={clsx('c-sidebar', styles.sidebar, show ? styles.active : '')}
    >
      <div className={styles.wrapper}>
        <div
          tabIndex={0}
          aria-hidden="true"
          role="button"
          className={styles.icon}
          onClick={() => {
            setIsOpened(false);
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            className="w-4 h-4"
          >
            <line x1="18" x2="6" y1="6" y2="18"></line>
            <line x1="6" x2="18" y1="6" y2="18"></line>
          </svg>
        </div>
        <div>{children}</div>
      </div>
    </div>
  );
}

function SidebarWrapper({
  isOpened,
  setIsOpened,
  children,
}: ISidebarWrapper): JSX.Element {
  return (
    <>
      <Background show={isOpened} setIsOpened={setIsOpened} />
      <Sidebar show={isOpened} setIsOpened={setIsOpened}>
        {children}
      </Sidebar>
    </>
  );
}

export default SidebarWrapper;
