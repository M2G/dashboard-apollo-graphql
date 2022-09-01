/*eslint-disable*/
import { string, bool, func, oneOfType, object } from 'prop-types';
import styles from './Table.module.scss';
import classnames from 'classnames';

const TableHeaderCell = ({
  label,
  onSort,
  isSortable,
  currentSortedData,
}: any) => {

  const onSortClick = () => onSort(
      !currentSortedData || currentSortedData.direction === 'ascending'
        ? 'descending'
        : 'ascending'
    );

  const sortedClass =
    currentSortedData?.direction === styles.ascending ? styles.ascending : styles.descending;

  return <th className={styles.th}>
      {label}
      {isSortable && (
        <button
          onClick={onSortClick}
          className={classnames(styles.button, `sort-icon ${currentSortedData ? sortedClass : ''}`)}
        />
      )}
    </th>
};

TableHeaderCell.propTypes = {
  isSortable: bool,
  currentSortedData: oneOfType([bool, object]),
  onSort: func,
  label: string.isRequired,
};

export default TableHeaderCell;
