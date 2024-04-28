import { act, cleanup, render, screen } from '@testing-library/react';

import Pagination from './Pagination';
beforeEach(() => {
  jest.clearAllMocks();
});

describe('Pagination Container', () => {
  describe('Pagination success (has prev/next)', () => {
    afterEach(cleanup);

    const setCurrentPage = jest.fn();

    beforeEach(() => {
      render(
        <Pagination hasNextPage hasPrevPage setCurrentPage={setCurrentPage} />,
      );
    });

    it('should success (has prev/next)', async () => {
      expect(screen.getByTestId('next')).toBeInTheDocument();
      expect(screen.getByTestId('prev')).toBeInTheDocument();

      await act(() => {
        screen.getByTestId('next').click();
      });

      expect(setCurrentPage).toHaveBeenCalledTimes(1);
    });
  });
  describe('Pagination success (hasnt next)', () => {
    afterEach(cleanup);

    const setCurrentPage = jest.fn();

    beforeEach(() => {
      render(
        <Pagination
          hasNextPage={false}
          hasPrevPage
          setCurrentPage={setCurrentPage}
        />,
      );
    });

    it('should success (hasnt next)', async () => {
      expect(screen.getByTestId('next')).toBeInTheDocument();
      expect(screen.getByTestId('prev')).toBeInTheDocument();

      await act(() => {
        screen.getByTestId('prev').click();
      });

      expect(screen.getByTestId('prev').closest('li')).toHaveClass('page-item');
      expect(screen.getByTestId('next').closest('li')).toHaveClass(
        'page-item disabled',
      );
      expect(setCurrentPage).toHaveBeenCalledTimes(1);
    });
  });
  describe('Pagination success (hasnt prev/next)', () => {
    afterEach(cleanup);

    const setCurrentPage = jest.fn();

    beforeEach(() => {
      render(
        <Pagination
          hasNextPage={false}
          hasPrevPage={false}
          setCurrentPage={setCurrentPage}
        />,
      );
    });

    it('should render (hasnt prev/next)', async () => {
      expect(screen.getByTestId('next')).toBeInTheDocument();
      expect(screen.getByTestId('prev')).toBeInTheDocument();

      await act(() => {
        screen.getByTestId('prev').click();
      });

      expect(screen.getByTestId('prev').closest('li')).toHaveClass(
        'page-item disabled',
      );
      expect(screen.getByTestId('next').closest('li')).toHaveClass(
        'page-item disabled',
      );
      expect(setCurrentPage).toHaveBeenCalledTimes(1);
    });
  });
});
