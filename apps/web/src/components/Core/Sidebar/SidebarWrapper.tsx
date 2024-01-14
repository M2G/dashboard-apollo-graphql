import type { Dispatch, ReactNode, SetStateAction, JSX } from 'react';

import clsx from 'clsx';

import Background from './Background';
import styles from './Sidebar.module.scss';

interface ISidebar {
  children: ReactNode;
  setIsOpened: Dispatch<SetStateAction<boolean>>;
  show: boolean;
}

interface ISidebarWrapper {
  children: ReactNode;
  isOpened: boolean;
  setIsOpened: Dispatch<SetStateAction<boolean>>;
}

function Sidebar({ children, setIsOpened, show }: ISidebar): JSX.Element {
  return (
    <div
      className={clsx('c-sidebar', styles.sidebar, show ? styles.active : '')}
    >
      <div className={styles.wrapper}>
        <div
          aria-hidden="true"
          className={styles.icon}
          onClick={() => setIsOpened(false)}
          role="button"
          tabIndex={0}
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
        </div>
        <div>{children}</div>
      </div>
    </div>
  );
}

function SidebarWrapper({
  children,
  isOpened,
  setIsOpened,
}: ISidebarWrapper): JSX.Element {
  return (
    <>
      <Background setIsOpened={setIsOpened} show={isOpened} />
      <Sidebar setIsOpened={setIsOpened} show={isOpened}>
        {children}
      </Sidebar>
    </>
  );
}

export default SidebarWrapper;
