import type { JSX } from 'react';

import Pagination from '@/components/Core/Pagination/Pagination';
import TableWrapper from '@/components/Core/Table';

type ListProps = {
  hasNextPage: boolean;
  hasPrevPage: boolean;
  header: any;
  id: string;
  rows: any;
  setCurrentPage: (page: number) => void;
};

function List({
  hasNextPage,
  hasPrevPage,
  header,
  id,
  rows,
  setCurrentPage,
}: ListProps): JSX.Element {
  return (
    <>
      <TableWrapper header={header} id={id} rows={rows} />
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
