/*eslint-disable*/
import { string, bool, func, oneOfType, object } from 'prop-types';

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
    currentSortedData?.direction === 'ascending' ? 'ascending' : 'descending';

  return <th>
      {label}
      {isSortable && (
        <button
          onClick={onSortClick}
          className={`sort-icon ${currentSortedData ? sortedClass : ''}`}
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
