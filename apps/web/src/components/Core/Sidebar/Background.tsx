import type { Dispatch, SetStateAction } from 'react';
import clsx from 'clsx';
import styles from './Background.module.scss';

interface IBackground {
  setIsOpened: Dispatch<SetStateAction<boolean>>;
  show: boolean;
}

function Background({ setIsOpened, show }: IBackground): JSX.Element {
  return (
    <div
      aria-hidden="true"
      className={clsx(styles.background, show ? styles.active : '')}
      onClick={() => setIsOpened(false)}
    />
  );
}

export default Background;
