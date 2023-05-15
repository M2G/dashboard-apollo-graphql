import { JSX } from 'react';
import Pagination from 'components/Core/Pagination/PaginationLegacy';
import PageSize from 'components/Core/Pagination/PageSize';
import TableWrapper from 'components/Core/Table';

function List({
  id,
  header,
  rows,
  data,
  count,
  setCurrentPage,
  setCurrentPageSize,
  currentPageSize,
  currentPage,
}: any): JSX.Element {
  const perPage = currentPageSize;
  const lastIndex = currentPage * perPage;
  const firstIndex = lastIndex - perPage;

  const currentDevices = data?.slice(firstIndex, lastIndex);

  console.log('currentDevices', currentDevices);
  console.log('data', data);

  return (
    <>
      <TableWrapper id={id} header={header} rows={rows} />
      <div className="d-inline-flex">
        <PageSize
          currentPageSize={currentPageSize}
          setCurrentPageSize={setCurrentPageSize}
        />
        <Pagination
          totalItems={count}
          perPage={perPage}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </div>
    </>
  );
}

export default List;
