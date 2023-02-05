/*eslint-disable*/
import Pagination from 'components/Core/Pagination/Pagination';
import TableWrapper from 'components/Core/Table';

function List({ id, header, rows, hasNextPage, hasPrevPage, setCurrentPage }: any): JSX.Element {
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
