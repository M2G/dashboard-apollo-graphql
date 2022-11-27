import type { ReactNode } from 'react';
import clsx from 'clsx';
import Background from './Background';
import styles from './Sidebar.module.scss';

interface ISidebar {
  show: boolean;
  setIsOpened: (params: any) => {};
  children: ReactNode;
}

function Sidebar({ show, setIsOpened, children }: ISidebar): JSX.Element {
  return (
    <div className={clsx(styles.sidebar, show ? styles.active : '')}>
      <div className={styles.wrapper}>
        <div
          tabIndex={0}
          aria-hidden="true"
          role="button"
          className={styles.icon}
          onClick={() => setIsOpened(false)}
        >
          <span />
        </div>
        <div>{children}</div>
      </div>
    </div>
  );
}

function SidebarWrapper({ isOpened, setIsOpened, children }: any): JSX.Element {
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
