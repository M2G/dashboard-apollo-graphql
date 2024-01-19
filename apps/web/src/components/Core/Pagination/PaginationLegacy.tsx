interface IPagination {
  currentPage: number;
  totalItems: number;
  perPage: number;
  setCurrentPage: (params: any) => {};
}

function Pagination({
  currentPage,
  perPage,
  setCurrentPage,
  totalItems,
}: IPagination): JSX.Element {
  const handleClick = ({
    target: {
      dataset: { id },
    },
  }: {
    target: { dataset: { id: string } };
  }): any => setCurrentPage(parseInt(id, 10));

  const handlePrevClick = (): any => setCurrentPage(currentPage - 1);

  const handleNextClick = (): any => setCurrentPage(currentPage + 1);

  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalItems / perPage); i += 1) {
    pageNumbers.push(i);
  }

  const displayNumbers = pageNumbers.slice(
    currentPage - 2 > 0 ? currentPage - 2 : 0,
    currentPage + 2,
  );

  return (
    <nav aria-label="-1">
      {pageNumbers.length > 1 && (
        <ul className="inline-flex h-10 -space-x-px px-4 py-2 text-base">
          <li>
            <a
              className={`border-semi-10-contrast ml-0 flex h-10 items-center justify-center rounded-l-lg border px-4 leading-tight hover:bg-gray-100 hover:text-gray-700 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white ${
                currentPage === 1 ? '_:dark:text-grey-dark pointer-events-none' : ''
              }`}
              href="#"
              onClick={handlePrevClick}>
              Prev
            </a>
          </li>
          {displayNumbers?.map((number, index) => (
            <li key={`${number}-${index}`}>
              <a
                className={`border-semi-10-contrast text-grey-dark flex h-10 items-center justify-center border px-4 leading-tight hover:bg-gray-100 hover:text-gray-700 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white ${
                  currentPage === number
                    ? 'flex h-10 items-center justify-center border px-4 text-blue-600 dark:text-white'
                    : ''
                }`}
                data-id={number}
                href="#"
                onClick={handleClick}>
                {number}
              </a>
            </li>
          ))}
          <li>
            <a
              className={`border-semi-10-contrast text-grey-dark flex h-10 items-center justify-center rounded-r-lg border px-4 leading-tight hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white ${
                currentPage === pageNumbers.length
                  ? '_:dark:text-grey-dark pointer-events-none'
                  : ''
              }`}
              href="#"
              onClick={handleNextClick}>
              Next
            </a>
          </li>
        </ul>
      )}
    </nav>
  );
}

export default Pagination;
