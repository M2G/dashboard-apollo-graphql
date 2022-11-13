import classnames from 'classnames';
import styles from './Background.module.scss';

function Background({ show, setIsOpened }: any) {
  return <div aria-hidden="true" className={classnames(styles.background, show ? styles.active : '')} onClick={() => setIsOpened(false)} />;
}

export default Background;
