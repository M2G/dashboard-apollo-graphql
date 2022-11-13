import { useMemo } from 'react';

function Pagination({ currentPageSize = 2, setCurrentPageSize }: any) {
  const pageSize = useMemo(() => currentPageSize, [currentPageSize]);
  const handleClick = ({ target: { value } }: { target: { value: string } }): any => {
    setCurrentPageSize(parseInt(value, 10));
  };

  return <select className="form-select" aria-label="Default select example" onChange={handleClick} value={pageSize}>
    <option value="2" selected>2</option>
    <option value="5">5</option>
    <option value="10">10</option>
    <option value="">All</option>
  </select>;
}

export default Pagination;
