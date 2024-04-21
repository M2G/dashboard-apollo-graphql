import List from './List';
import { render, screen } from '@testing-library/react';
describe('test List', () => {
  test('should render', async () => {
    const header = [
      { label: '', sortable: false },
      { label: 'First name', sortable: false },
      { label: 'Last name', sortable: false },
      { label: 'Email', sortable: false },
      { label: 'Created at', sortable: true, type: 'date' },
      { label: 'Modified at', sortable: true, type: 'date' },
    ];

    const rows = [
      [
        {
          display: '07A4E191EA',
          value: '07A4E191EA',
        },
        {
          display: '07A4E191EA',
          value: '07A4E191EA',
        },
      ],
    ];

    render(
      <List
        hasNextPage
        hasPrevPage
        header={header}
        id="id"
        rows={rows}
        setCurrentPage={jest.fn()}
      />,
    );

    expect(screen.getByTestId('table')).toBeInTheDocument();
    expect(screen.getByTestId('thead')).toBeInTheDocument();
    expect(screen.getByTestId('tbody')).toBeInTheDocument();
    expect(screen.getByTestId('Prev')).toBeInTheDocument();
    expect(screen.getByText('Prev')).toBeInTheDocument();
    expect(screen.getByText('Next')).toBeInTheDocument();

    screen.debug();
  });
});
