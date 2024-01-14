import { render } from '@testing-library/react';
import TableHeaderCell from './TableHeaderCell';

// const date: Date = new Date();

describe('test TableHeaderCell', () => {
  test('should render', () => {
    const args = {
      currentSortedData: null,
      isSortable: false,
      label: 'First name',
      onSort: () => {},
    };

    const { container } = render(
      <TableHeaderCell
        label={args.label}
        isSortable={args.isSortable}
        currentSortedData={args.currentSortedData}
        onSort={args.onSort}
      />,
    );
    expect(container).toHaveTextContent('First name');
  });

  test('should not render', () => {
    const args = {
      currentSortedData: null,
      isSortable: false,
      label: '',
      onSort: () => {},
    };

    const { container } = render(
      <TableHeaderCell
        label={args.label}
        isSortable={args.isSortable}
        currentSortedData={args.currentSortedData}
        onSort={args.onSort}
      />,
    );
    expect(container).toHaveTextContent('');
  });
});
