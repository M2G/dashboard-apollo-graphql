import { useContext } from 'react';
import TableHeaderCell from 'components/Core/Table/TableHeaderCell';
import { TableContext } from 'components/Core/Table/TableWrapper';
import styles from 'components/Core/Table/Table.module.scss';

interface ITableHead {
  id: number | string;
}

function TableHead({ id }: ITableHead): JSX.Element {
  const { header, handleSort, sortData } = useContext(TableContext);
  return (
    <thead className="c-table-head">
      <tr className={styles.tr}>
        {header?.map(({ label, sortable, type }: any, index: number) => (
          <TableHeaderCell
            key={`tableHeaderCell__${id}__${index}` as any}
            label={label}
            isSortable={sortable}
            currentSortedData={sortData?.index === index ? sortData : null}
            onSort={(sortDirection: any) =>
              handleSort(index, sortDirection, type)
            }
          />
        ))}
      </tr>
    </thead>
  );
}

export default TableHead;
