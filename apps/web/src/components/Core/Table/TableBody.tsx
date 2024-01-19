import { memo, useContext } from 'react';
import { TableContext } from '@/components/Core/Table/TableWrapper';

interface ITableBody {
  id: number | string;
}

interface ITableRow {
  id: number | string;
  data: any;
  indexRow: number;
}

function TableRow({ data, id, indexRow }: ITableRow): JSX.Element {
  return (
    <tr
      className="border-semi-10-contrast border-b-solid border-b-[1px]"
      key={`bodyTable__${id}__${indexRow}` as string}>
      {data?.map(({ display }: any, indexCol: number) => (
        <td
          className="border-semi-10-contrast border-b-solid border-b-[1px]"
          key={`bodyTable__${id}__${indexCol}` as any}>
          {display}
        </td>
      ))}
    </tr>
  );
}

const MemoizedTableRow = memo(TableRow);

function TableBody({ id }: ITableBody): JSX.Element {
  const { getSortedTable } = useContext(TableContext);
  return (
    <tbody>
      {getSortedTable?.map((row: { display: any }[], indexRow: number) => (
        <MemoizedTableRow
          data={row}
          id={id}
          indexRow={indexRow}
          key={`bodyTable__${id}__${indexRow}` as string}
        />
      ))}
    </tbody>
  );
}

export default TableBody;
