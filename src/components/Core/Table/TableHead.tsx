import { useContext } from 'react';
import TableHeaderCell from 'components/Core/Table/TableHeaderCell';
import { number, oneOfType, string } from 'prop-types';
import { TableContext } from 'components/Core/Table/TableWrapper';

interface ITableHead {
  id?: number | string;
}

function TableHead({ id }: ITableHead) {
  const { header, handleSort, sortData } = useContext(TableContext);
  return <thead className="c-table-head">
  <tr>
    {header?.map(({ label, sortable, type }: any, index: number) =>
      <TableHeaderCell
        key={`tableHeaderCell__${id}__${index}` as any}
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