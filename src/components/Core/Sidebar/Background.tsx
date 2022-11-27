import clsx from 'clsx';
import styles from './Background.module.scss';

interface IBackground {
  setIsOpened: (params: any) => {};
  show: boolean;
}

function Background({ show, setIsOpened }: IBackground): JSX.Element {
  return (
    <div
      aria-hidden="true"
      className={clsx(styles.background, show ? styles.active : '')}
      onClick={() => setIsOpened(false)}
    />
  );
}

export default Background;
