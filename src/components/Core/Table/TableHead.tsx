import { useContext } from 'react';
import TableHeaderCell from 'components/Core/Table/TableHeaderCell';
import { number, oneOfType, string } from 'prop-types';

interface ITableHead {
  id?: number | string;
  context: any;
}

function TableHead({ id, context }: ITableHead) {
  const { header, handleSort, sortData } = useContext(context);
  return <thead className="c-table-head">
  <tr>
    {header?.map(({ label, sortable, type }: any, index: number) =>
      <TableHeaderCell
        key={id}
        label={label}
        isSortable={sortable}
        currentSortedData={sortData?.index === index ? sortData : null}
        onSort={(sortDirection) => handleSort(index, sortDirection, type)}
      />)}
  </tr>
  </thead>;
}

TableHead.propTypes = {
  id: oneOfType([string, number]).isRequired,
};

export default TableHead;
