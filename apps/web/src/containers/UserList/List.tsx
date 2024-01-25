import type { JSX } from 'react';
import Pagination from '@/components/Core/Pagination/Pagination';
import TableWrapper from '@/components/Core/Table';

type ListProps = {
  header: any;
  hasNextPage: any;
  hasPrevPage: any;
  id: any;
  rows: any;
  setCurrentPage: any;
};

function List({
  id,
  header,
  rows,
  hasNextPage,
  hasPrevPage,
  setCurrentPage,
}: ListProps): JSX.Element {
  return (
    <>
      <TableWrapper id={id} header={header} rows={rows} />
      <div className="d-inline-flex">
        <Pagination
          hasNextPage={hasNextPage}
          hasPrevPage={hasPrevPage}
          setCurrentPage={setCurrentPage}
        />
      </div>
    </>
  );
}

export default List;
