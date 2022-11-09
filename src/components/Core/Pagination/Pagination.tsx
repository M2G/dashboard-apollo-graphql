/*eslint-disable*/
/*
interface IPagination {
  pageSize: number;
  page: number;
  onChange: (params: any) => any;
}
*/
function Pagination({ onChange,
                      count,
                      pages,
                      next,
                      prev }: any) {

  const range = (start: number, end: number) => {
    const length = end - start + 1;
    return Array.from({ length }, (_, i) => start + i);
  };

  console.log('range', range(prev, next));

  const pageList = range(prev, next);

  console.log('Pagination', {
    count,
    pages,
    next,
    prev
  });

  return <div>
    <select className="form-select" aria-label="Default select example" onChange={({ target: { value }}) => onChange(value)}>
      <option value="2">2</option>
      <option value="5">5</option>
      <option value="10">10</option>
      <option value="">All</option>
    </select>
    <nav aria-label="Page navigation example">
      <ul className="pagination">
        <li className="page-item"><a className="page-link" href="#" onClick={() => onChange(pages - 1)}>Previous</a></li>
        {pageList?.map((page) => <li className="page-item" onClick={() => onChange(page)}><a className="page-link" href="#">{page}</a></li>)}
        <li className="page-item"><a className="page-link" href="#" onClick={() => onChange(pages + 1)}>Next</a></li>
      </ul>
    </nav>
  </div>;
}

export default Pagination;
