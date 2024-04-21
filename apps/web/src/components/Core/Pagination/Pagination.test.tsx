import Pagination from './Pagination';
import { render, screen } from '@testing-library/react';

describe('test TopLineLoading', () => {
  test('should action click Next', () => {
    const setCurrentPage = jest.fn();

    render(
      <Pagination hasNextPage hasPrevPage setCurrentPage={setCurrentPage} />,
    );

    expect(screen.getByText('Next')).toBeInTheDocument();

    screen.getByText('Next').click();

    expect(setCurrentPage).toHaveBeenCalledTimes(1);
  });
  test('should action click Prev', () => {
    const setCurrentPage = jest.fn();

    render(
      <Pagination hasNextPage hasPrevPage setCurrentPage={setCurrentPage} />,
    );

    expect(screen.getByText('Prev')).toBeInTheDocument();

    screen.getByText('Prev').click();

    expect(setCurrentPage).toHaveBeenCalledTimes(1);
  });
});
