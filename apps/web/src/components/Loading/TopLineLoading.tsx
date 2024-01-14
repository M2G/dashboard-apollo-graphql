import type { JSX } from 'react';
import styles from './TopLineLoading.module.scss';

function TopLineLoading(): JSX.Element {
  return <div className={styles.loader} />;
}

export default TopLineLoading;
