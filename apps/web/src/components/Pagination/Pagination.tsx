import type { ChangeEventHandler, MouseEventHandler } from 'react';

interface IPagination {
  hasNextPage: boolean;
  hasPrevPage: boolean;
  setCurrentPage: (dataset: any) => void;
}

export type DatasetInjector<
  HTMLAnchorElement,
  D extends DOMStringMap,
> = HTMLAnchorElement & {
  dataset: D;
};

function Pagination({ hasNextPage, hasPrevPage, setCurrentPage }: IPagination) {
  const handlePrevClick: ChangeEventHandler<
    DatasetInjector<HTMLAnchorElement, { prev: string }>
  > = ({ target: { dataset } }) => setCurrentPage(dataset);

  const handleNextClick: ChangeEventHandler<
    DatasetInjector<HTMLAnchorElement, { next: string }>
  > = ({ target: { dataset } }) => setCurrentPage(dataset);

  return (
    <nav aria-label="-1">
      <ul className="pagination">
        <li className={`page-item ${hasPrevPage ? '' : 'disabled'}`}>
          <a
            data-prev
            className="page-link"
            href="#"
            onClick={
              handlePrevClick as unknown as MouseEventHandler<HTMLAnchorElement>
            }
          >
            Prev
          </a>
        </li>
        <li className={`page-item ${hasNextPage ? '' : 'disabled'}`}>
          <a
            data-next
            className="page-link"
            href="#"
            onClick={
              handleNextClick as unknown as MouseEventHandler<HTMLAnchorElement>
            }
          >
            Next
          </a>
        </li>
      </ul>
    </nav>
  );
}

export default Pagination;
