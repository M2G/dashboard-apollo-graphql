import { useMemo } from 'react';
import PropTypes from 'prop-types';
import styles from './Pagination.module.scss';

interface IPageSize {
  currentPageSize: number;
  setCurrentPageSize: (params: any) => {};
}

function PageSize({ currentPageSize, setCurrentPageSize }: IPageSize) {
  const pageSize = useMemo(() => currentPageSize, [currentPageSize]);

  const handleClick = ({ target: { value } }: { target: { value: string } }): any =>
    setCurrentPageSize(parseInt(value, 10));

  return <select aria-label="-1" className={`form-select me-2 ${styles.pagesize}`} onChange={handleClick} value={pageSize}>
    <option value="2">2</option>
    <option value="5">5</option>
    <option value="10">10</option>
    <option value="">All</option>
  </select>;
}

PageSize.propTypes = {
  currentPageSize: PropTypes.number.isRequired,
  setCurrentPageSize: PropTypes.func.isRequired,
};

export default PageSize;
