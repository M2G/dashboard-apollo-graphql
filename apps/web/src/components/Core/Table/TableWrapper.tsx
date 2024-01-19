import { createContext, useEffect, useMemo, useState } from 'react';
import TableBody from '@/components/Core/Table/TableBody';
import TableHead from '@/components/Core/Table/TableHead';

export const TableContext = createContext<Record<string, any>>({});

interface ITableWrapper {
  className?: string;
  header: any;
  id: number | string;
  rows: any;
}

function TableWrapper({
  className = '',
  header,
  id,
  rows,
}: ITableWrapper): JSX.Element {
  const [sortData, setSortData] = useState<any>(null);
  function handleSort(index: any, sortDirection: string, type: any) {
    setSortData({
      direction: sortDirection,
      index,
      type,
    } as any);
  }

  const getSortedTable = useMemo(() => {
    if (!sortData) return rows;
    const { direction, index, type }: any = sortData;

    if (!type || type === 'string') {
      return rows?.sort(
        (
          a: { [x: string]: { value: any } },
          b: { [x: string]: { value: string } },
        ) =>
          direction === 'descending'
            ? a[index].value.localeCompare(b[index].value)
            : b[index].value.localeCompare(a[index].value),
      );
    }
    if (type === 'date') {
      return rows?.sort(
        (
          a: { [x: string]: { value: number } },
          b: { [x: string]: { value: number } },
        ) =>
          direction === 'ascending'
            ? a[index].value - b[index].value
            : b[index].value - a[index].value,
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
      value={{ getSortedTable, handleSort, header, sortData }}>
      <table className="c-table text-grey-dark w-full border-collapse">
        <TableHead id={id} />
        <TableBody id={id} />
      </table>
    </TableContext.Provider>
  );
}

export default TableWrapper;
