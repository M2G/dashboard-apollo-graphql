/*eslint-disable*/

interface IPagination {
  currentPage: any;
  totalItems: any;
  perPage: any;
  setCurrentPage: any;
}

import { Component } from 'react';

const Pagination = ({ currentPage, totalItems, perPage, setCurrentPage }: IPagination): any => {
  const handleClick = ({ target: { dataset: { id } } }: { target: { dataset: { id: string }; }; }): any => {
    setCurrentPage(parseInt(id, 10));
  }

  const handlePrevClick = (): any => {
    setCurrentPage(currentPage - 1);
  }

  const handleNextClick = (): any => {
    setCurrentPage(currentPage + 1);
  }

  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalItems / perPage); i += 1) {
    pageNumbers.push(i);
  }

  const displayNumbers = pageNumbers.slice(currentPage - 5 > 0 ? currentPage - 5 : 0, currentPage + 5)

  console.log('pageNumbers', pageNumbers)
  console.log('currentPage', currentPage)
  console.log('displayNumbers', displayNumbers)

  return <nav aria-label="-1">
    {pageNumbers.length > 1 ? <ul className="pagination">
        <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
          <a className="page-link" href="#" onClick={handlePrevClick}>
            Prev
        </a>
      </li>
      {displayNumbers.map(number =>
        <li key={number} className={`page-item ${currentPage === number ? 'active' : ''}`}>
          <a data-id={number} className="page-link" href="#" onClick={handleClick as any}>
          {number}
          </a>
        </li>
      )}
        <li className={`page-item ${currentPage === pageNumbers.length ? 'disabled' : ''}`}>
          <a className="page-link" href="#" onClick={handleNextClick}>
            Next
          </a>
      </li>
    </ul> : null}
  </nav>
}

Pagination.propTypes = {};

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
