import { memo, useMemo } from 'react';
import { Icon } from 'ui';
import IconNames from 'ui/components/atoms/Icon/Icons.types';

enum SortDirection {
  ASCENDING = 'ascending',
  DESCENDING = 'descending',
}

interface ITableHeaderCell {
  currentSortedData: any;
  isSortable: boolean;
  label: string;
  onSort: (arg: SortDirection) => void;
}

function TableHeaderCell({
  currentSortedData,
  isSortable,
  label,
  onSort,
}: ITableHeaderCell): JSX.Element {
  function onSortClick(): void {
    onSort(
      currentSortedData?.direction === SortDirection.ASCENDING
        ? SortDirection.DESCENDING
        : SortDirection.ASCENDING,
    );
  }

  const sortedClass = useMemo(
    () =>
      currentSortedData?.direction === SortDirection.ASCENDING
        ? IconNames.ARROW_DOWN
        : IconNames.ARROW_UP,
    [currentSortedData?.direction],
  );

  return (
    <th className="border-b-0 p-2 pl-0 text-base font-bold">
      {label}
      {isSortable && (
        <button
          className="sort-icon mb-0 rounded-none border-0 bg-transparent px-2 font-bold"
          onClick={onSortClick}>
          <Icon
            as={sortedClass}
            className="_:w-6 _:h-6 cursor-pointer mb-[-5px]"
          />
        </button>
      )}
    </th>
  );
}

export default memo(TableHeaderCell);
