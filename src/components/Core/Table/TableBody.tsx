import { useContext } from 'react';
import { number, oneOfType, string } from 'prop-types';

interface ITableBody {
  id: number | string;
  context: any;
}

function TableBody({ id, context }: ITableBody) {
  const { getSortedTable } = useContext(context);
  return <tbody className="c-table-body">
  {getSortedTable?.map((row: { display: any }[]) =>
    <tr key={`tableRow__${id}`}>
      {row?.map(({ display }: any) => (
        <td
          key={`tableCell__${id}`}
          className="table-wrapper-cell"
        >
          {display}
        </td>
      ))}
    </tr>)}
  </tbody>;
}

TableBody.propTypes = {
  id: oneOfType([string, number]).isRequired,
};

export default TableBody;
