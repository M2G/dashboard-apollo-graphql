/*eslint-disable*/
import clsx from 'clsx';
import styles from './Table.module.scss';

interface ITableHeaderCell {
  label: any;
  onSort: any;
  isSortable: any;
  currentSortedData: any;
}

function TableHeaderCell({
  label,
  onSort,
  isSortable,
  currentSortedData
}: ITableHeaderCell) {
  const onSortClick = () =>
    onSort(
      !currentSortedData || currentSortedData.direction === 'ascending'
        ? 'descending'
        : 'ascending'
    );

  const sortedClass =
    currentSortedData?.direction === styles.ascending
      ? styles.ascending
      : styles.descending;

  return (
    <th className={styles.th}>
      {label}
      {isSortable && (
        <button
          onClick={onSortClick}
          className={clsx(
            styles.button,
            `sort-icon ${currentSortedData ? sortedClass : ''}`
          )}
        />
      )}
    </th>
  );
}

export default TableHeaderCell;
