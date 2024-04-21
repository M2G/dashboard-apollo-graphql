import { useMemo } from 'react';

interface IPageSize {
  currentPageSize: number;
  setCurrentPageSize: (params: number) => void;
}

function PageSize({ currentPageSize, setCurrentPageSize }: IPageSize) {
  const handleClick = ({ target: { value } }: { target: { value: string } }) =>
    setCurrentPageSize(parseInt(value, 10));

  return (
    <select
      aria-label="-1"
      className="mt-[15px] block appearance-none border-none bg-transparent px-2 text-base font-normal leading-normal text-white outline-none"
      data-testid="select-page-size"
      onChange={handleClick}
      value={currentPageSize}>
      <option selected value="2">
        2
      </option>
      <option value="5">5</option>
      <option value="10">10</option>
      <option value="">All</option>
    </select>
  );
}

export default PageSize;
