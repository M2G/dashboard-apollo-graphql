import { useContext } from 'react';
import { number, oneOfType, string } from 'prop-types';
import { TableContext } from 'components/Core/Table/TableWrapper';

interface ITableBody {
  id: number | string;
}

function TableBody({ id }: ITableBody) {
  const { getSortedTable } = useContext(TableContext);
  return <tbody className="c-table-body">
  {getSortedTable?.map((row: { display: any }[], indexRow: number) =>
    <tr key={`bodyTable__${id}__${indexRow}` as any}>
      {row?.map(({ display }: any, indexCol: any) => <td
          key={`bodyTable__${id}__${indexCol}` as any}
          className="table-wrapper-cell"
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
