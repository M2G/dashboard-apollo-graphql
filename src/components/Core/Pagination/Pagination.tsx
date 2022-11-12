/*eslint-disable*/
/*
interface IPagination {
  pageSize: number;
  page: number;
  onChange: (params: any) => any;
}
*/
import { Component } from 'react';

const Pagination = ({ currentPage, totalItems, perPage, setCurrentPage }: any) => {
  const handleClick = ({ currentTarget: { dataset: { id } } }: { currentTarget: { dataset: { id: string }; }; }): any => {
    setCurrentPage(parseInt(id, 10))
  }

  const pageNumbers = []

  for (let i = 1; i <= Math.ceil(totalItems / perPage); i += 1) {
    pageNumbers.push(i)
  }

  const displayNumbers = pageNumbers.slice(currentPage - 2 > 0 ? currentPage - 2 : 0, currentPage + 2)

  console.log('pageNumbers', pageNumbers)
  console.log('currentPage', currentPage)

  return <nav>
    {pageNumbers.length > 1 ? <ul className="pagination">
      {currentPage > 2 &&
        <li
          data-id={1} className="page-item" onClick={handleClick as any}>
          <a className="page-link" href="#">
        First
        </a>
      </li>}
      {displayNumbers.map(number => (console.log('number', number),
        <li key={number} data-id={number} className={`page-item ${currentPage === number ? 'active' : ''}`} onClick={handleClick as any}>
          <a className="page-link" href="#">
          {number}
          </a>
        </li>
      ))}
      {currentPage !== pageNumbers.length && pageNumbers.length > 2 &&
        <li data-id={pageNumbers.length as any} className="page-item" onClick={handleClick as any}>
          <a className="page-link" href="#">
        Last
          </a>
      </li>}
    </ul> : null}
  </nav>
}

const withPagination = (WrappedComponent: JSX.IntrinsicAttributes) => {
  return class extends Component {
    constructor(props: {} | Readonly<{}>) {
      super(props)

      this.setCurrentPage = this.setCurrentPage.bind(this)

      this.state = {
        currentPage: 1
      }
    }

    setCurrentPage(currentPage: any) {
      this.setState({ currentPage })
    }

    render() {
      return (
        // @ts-ignore
        <WrappedComponent setCurrentPage={this.setCurrentPage} currentPage={this.state.currentPage} {...this.props} />
      )
    }
  }
}



/*
function Pagination({ onChange,
                      count,
                      pages,
                      next,
                      prev }: any) {

  const [paginate, setPaginate] = useState({});

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
    <select className="form-select" aria-label="Default select example" onChange={({ target: { value }}) => {
        onChange({ pageSize: value });
        setPaginate({ pageSize: value });
      }}>
      <option value="2">2</option>
      <option value="5">5</option>
      <option value="10">10</option>
      <option value="">All</option>
    </select>
    <nav aria-label="Page navigation example">
      <ul className="pagination">
        <li className="page-item"><a className="page-link" href="#" onClick={() => onChange({ ...paginate, pages: pages - 1 })}>Previous</a></li>
        {pageList?.map((page) => <li className="page-item" onClick={() => onChange( { ...paginate, page })}><a className="page-link" href="#">{page}</a></li>)}
        <li className="page-item"><a className="page-link" href="#" onClick={() => onChange({ ...paginate, pages: pages + 1 })}>Next</a></li>
      </ul>
    </nav>
  </div>;
}
*/
export { withPagination };
export default Pagination;
