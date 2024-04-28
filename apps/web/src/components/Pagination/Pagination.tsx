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
  function handlePrevClick({
    target: { dataset },
  }: ChangeEventHandler<
    DatasetInjector<HTMLAnchorElement, { prev: string }>
  >): void {
    setCurrentPage(dataset);
  }

  function handleNextClick({
    target: { dataset },
  }: ChangeEventHandler<
    DatasetInjector<HTMLAnchorElement, { prev: string }>
  >): void {
    setCurrentPage(dataset);
  }

  return (
    <nav aria-label="-1">
      <ul className="pagination">
        <li className={`page-item ${hasPrevPage ? '' : 'disabled'}`}>
          <a
            className="page-link"
            data-prev
            data-testid="prev"
            href="#"
            onClick={
              handlePrevClick as unknown as MouseEventHandler<HTMLAnchorElement>
            }>
            Prev
          </a>
        </li>
        <li className={`page-item ${hasNextPage ? '' : 'disabled'}`}>
          <a
            className="page-link"
            data-next
            data-testid="next"
            href="#"
            onClick={
              handleNextClick as unknown as MouseEventHandler<HTMLAnchorElement>
            }>
            Next
          </a>
        </li>
      </ul>
    </nav>
  );
}

export default Pagination;
