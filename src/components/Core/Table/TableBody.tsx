import { useContext } from 'react';
import clsx from 'clsx';
import { TableContext } from 'components/Core/Table/TableWrapper';
import styles from 'components/Core/Table/Table.module.scss';

interface ITableBody {
  id: number | string;
}

function TableBody({ id }: ITableBody): JSX.Element {
  const { getSortedTable } = useContext(TableContext);
  return (
    <tbody className="c-table-body">
      {getSortedTable?.map((row: { display: any }[], indexRow: number) => (
        <tr
          className={styles.tr}
          key={`bodyTable__${id}__${indexRow}` as any}
        >
          {row?.map(({ display }: any, indexCol: any) => (
            <td
              className={clsx(styles.td, 'table-wrapper-cell')}
              key={`bodyTable__${id}__${indexCol}` as any}
            >
              {display}
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  );
}

export default TableBody;
