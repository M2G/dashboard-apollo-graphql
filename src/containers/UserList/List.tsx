/*eslint-disable*/
import Pagination, { withPagination } from "components//Core/Pagination/Pagination";
import TableWrapper from 'components/Core/Table';

function List({ id, header, rows, data, count, setCurrentPage, currentPage }: any) {
  const perPage = 2;
  const lastIndex = currentPage * perPage;
  const firstIndex = lastIndex - perPage;

  const currentDevices = data.slice(firstIndex, lastIndex);

  console.log('currentDevices', currentDevices);
  console.log('data', data);

  return (
    <div>
      <TableWrapper id={id} header={header} rows={rows} />
      <Pagination
        totalItems={count}
        perPage={perPage}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
}
//@ts-ignore
export default withPagination(List);
