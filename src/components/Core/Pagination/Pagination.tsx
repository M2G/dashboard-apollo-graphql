/*eslint-disable*/
interface IPagination {
  pageSize: number;
  page: number;
  onChange: (params: any) => any;
}

function Pagination({ onChange }: IPagination) {
  return <div>
    <select className="form-select" aria-label="Default select example" onChange={({ target: { value }}) => onChange(value)}>
      <option value="2">2</option>
      <option value="5">5</option>
      <option value="10">10</option>
      <option value="">All</option>
    </select>
    <nav aria-label="Page navigation example">
      <ul className="pagination">
        <li className="page-item"><a className="page-link" href="#">Previous</a></li>
        <li className="page-item"><a className="page-link" href="#">1</a></li>
        <li className="page-item"><a className="page-link" href="#">2</a></li>
        <li className="page-item"><a className="page-link" href="#">3</a></li>
        <li className="page-item"><a className="page-link" href="#">Next</a></li>
      </ul>
    </nav>
  </div>;
}

export default Pagination;
