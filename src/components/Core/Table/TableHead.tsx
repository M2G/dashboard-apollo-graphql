import type { JSX } from 'react';
import { useContext } from 'react';
import styles from 'components/Core/Table/Table.module.scss';
import TableHeaderCell from 'components/Core/Table/TableHeaderCell';
import { TableContext } from 'components/Core/Table/TableWrapper';

interface ITableHead {
  id: number | string;
}

function TableHead({ id }: ITableHead): JSX.Element {
  const { handleSort, header, sortData } = useContext(TableContext);
  return (
    <thead className="c-table-head">
      <tr className={styles.tr}>
        {header?.map(({ label, sortable, type }: any, index: number) => (
          <TableHeaderCell
            onSort={(sortDirection: any) =>
              handleSort(index, sortDirection, type)
            }
            currentSortedData={sortData?.index === index ? sortData : null}
            isSortable={sortable}
            key={`tableHeaderCell__${id}__${index}` as any}
            label={label}
          />
        ))}
      </tr>
    </thead>
  );
}

export default TableHead;
