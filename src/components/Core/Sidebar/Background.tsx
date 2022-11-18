import classnames from 'classnames';
import styles from './Background.module.scss';

interface IBackground {
  setIsOpened: (params: any) => {};
  show: boolean;
}

function Background({ show, setIsOpened }: IBackground) {
  return <div aria-hidden="true" className={classnames(styles.background, show ? styles.active : '')} onClick={() => setIsOpened(false)} />;
}

export default Background;
