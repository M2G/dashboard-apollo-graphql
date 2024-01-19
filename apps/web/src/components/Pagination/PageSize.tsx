import { useMemo } from 'react';

interface IPageSize {
  currentPageSize: number;
  setCurrentPageSize: (params: number) => void;
}

function PageSize({ currentPageSize, setCurrentPageSize }: IPageSize) {
  const pageSize = useMemo(() => currentPageSize, [currentPageSize]);

  const handleClick = ({ target: { value } }: { target: { value: string } }) =>
    setCurrentPageSize(parseInt(value, 10));

  return (
    <select aria-label="-1" onChange={handleClick} value={pageSize}>
      <option value="2">2</option>
      <option value="5">5</option>
      <option value="10">10</option>
      <option value="">All</option>
    </select>
  );
}

export default PageSize;
