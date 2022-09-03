import { useContext } from 'react';
import { number, oneOfType, string } from 'prop-types';
import { TableContext } from 'components/Core/Table/TableWrapper';
import classnames from 'classnames';
import styles from 'components/Core/Table/Table.module.scss';

interface ITableBody {
  id: number | string;
}

function TableBody({ id }: ITableBody) {
  const { getSortedTable } = useContext(TableContext);
  return <tbody className="c-table-body">
  {getSortedTable?.map((row: { display: any }[], indexRow: number) =>
    <tr
      className={classnames(styles.tr)}
      key={`bodyTable__${id}__${indexRow}` as any}>
      {row?.map(({ display }: any, indexCol: any) =>
        <td
          className={classnames(styles.td, "table-wrapper-cell")}
          key={`bodyTable__${id}__${indexCol}` as any}
        >
          {display}
        </td>)}
    </tr>)}
  </tbody>;
}

TableBody.propTypes = {
  id: oneOfType([string, number]).isRequired,
};

export default TableBody;