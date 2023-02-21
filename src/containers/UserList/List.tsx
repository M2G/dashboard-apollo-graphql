/*eslint-disable*/
import Pagination from 'components/Core/Pagination/Pagination';
import TableWrapper from 'components/Core/Table';

type List = {
  id: any;
  header: any;
  rows: any;
  hasNextPage: any;
  hasPrevPage: any;
  setCurrentPage: any;
};

function List({ id, header, rows, hasNextPage, hasPrevPage, setCurrentPage }: List): JSX.Element {
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
