/*eslint-disable*/
import classnames from 'classnames';
import Background from './Background';
import styles from './Sidebar.module.scss';

function Sidebar({ show, setIsOpened, children }: any) {
  return <div className={classnames(styles.sidebar, show ? styles.active : '')}>
      <div className={styles.wrapper}>
        <div
          role="button"
          className={styles.icon}
          onClick={() => setIsOpened(false)}>
          <span />
        </div>
        <div>
          {children}
        </div>
      </div>
    </div>
}

function SidebarWrapper({ isOpened, setIsOpened, children }: any) {
  return <>
      <Background show={isOpened} setIsOpened={setIsOpened} />
      <Sidebar show={isOpened} setIsOpened={setIsOpened}>
        {children}
      </Sidebar>
    </>
}

export default SidebarWrapper;
