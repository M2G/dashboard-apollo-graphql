/*eslint-disable*/
import { Component } from 'react';
import PropTypes from 'prop-types';

interface IPagination {
  currentPage: number;
  totalItems: number;
  perPage: number;
  setCurrentPage: (params: any) => {};
}

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

Pagination.propTypes = {
  currentPage: PropTypes.number.isRequired,
  totalItems: PropTypes.number.isRequired,
  perPage: PropTypes.number.isRequired,
  setCurrentPage: PropTypes.func.isRequired,
};

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
      // @ts-ignore
      return <WrappedComponent setCurrentPage={this.setCurrentPage} currentPage={this.state.currentPage} {...this.props} />
    }
  }
}

export { withPagination };
export default Pagination;
