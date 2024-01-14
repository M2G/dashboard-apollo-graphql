/*eslint-disable*/
import { useEffect, useMemo, useState, createContext } from 'react';
import clsx from 'clsx';
import TableHead from 'components/Core/Table/TableHead';
import TableBody from 'components/Core/Table/TableBody';
import styles from './Table.module.scss';

export const TableContext = createContext<Record<string, any>>({});

interface ITableWrapper {
  header: any;
  rows: any;
  id: string | number;
  className?: string;
}

function TableWrapper({
  header,
  rows,
  id,
  className = ''
}: ITableWrapper): JSX.Element {
  console.log('rows rows', rows);

  const [sortData, setSortData] = useState<any>(null);

  const handleSort = (index: any, sortDirection: string, type: any) =>
    setSortData({
      index,
      direction: sortDirection,
      type
    } as any);

  const getSortedTable = useMemo(() => {
    if (!sortData) return rows;
    const { index, direction, type }: any = sortData;

    if (!type || type === 'string') {
      return rows?.sort(
        (
          a: { [x: string]: { value: any } },
          b: { [x: string]: { value: string } }
        ) =>
          direction === 'descending'
            ? a[index].value.localeCompare(b[index].value)
            : b[index].value.localeCompare(a[index].value)
      );
    }
    if (type === 'date') {
      return rows?.sort(
        (
          a: { [x: string]: { value: number } },
          b: { [x: string]: { value: number } }
        ) =>
          direction === 'ascending'
            ? a[index].value - b[index].value
            : b[index].value - a[index].value
      );
    }

    return rows;
  }, [sortData, rows]);

  useEffect(() => {
    header?.forEach(({ defaultSort, type }: any, index: any) => {
      if (defaultSort) handleSort(index, 'descending', type);
    });
  }, [header]);

  return (
    <TableContext.Provider
      value={{ header, handleSort, sortData, getSortedTable }}
    >
      <table
        className={clsx(
          styles.table,
          'c-table',
          className
        )}
      >
        <TableHead key="tableHead" id={id} />
        <TableBody key="tableBody" id={id} />
      </table>
    </TableContext.Provider>
  );
}

export default TableWrapper;
