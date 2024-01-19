/*eslint-disable*/
interface IPagination {
  currentPage: number;
  totalItems: number;
  perPage: number;
  setCurrentPage: (params: any) => {};
}

function Pagination({ currentPage, totalItems, perPage, setCurrentPage }: IPagination) {
  const handleClick = ({
    target: {
      dataset: { id },
    },
  }: {
    target: { dataset: { id: string } };
  }): any => setCurrentPage(parseInt(id, 10));

  const handlePrevClick = () => setCurrentPage(currentPage - 1);

  const handleNextClick = () => setCurrentPage(currentPage + 1);

  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalItems / perPage); i += 1) {
    pageNumbers.push(i);
  }

  const displayNumbers = pageNumbers.slice(
    currentPage - 5 > 0 ? currentPage - 5 : 0,
    currentPage + 5,
  );
  return (
    <nav aria-label="-1">
      {pageNumbers.length > 1 && (
        <ul className="pagination">
          <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
            <a className="page-link" href="#" onClick={handlePrevClick}>
              Prev
            </a>
          </li>
          {displayNumbers?.map((number) => (
            <li key={number} className={`page-item ${currentPage === number ? 'active' : ''}`}>
              <a data-id={number} className="page-link" href="#" onClick={handleClick as any}>
                {number}
              </a>
            </li>
          ))}
          <li className={`page-item ${currentPage === pageNumbers.length ? 'disabled' : ''}`}>
            <a className="page-link" href="#" onClick={handleNextClick}>
              Next
            </a>
          </li>
        </ul>
      )}
    </nav>
  );
}

export default Pagination;
