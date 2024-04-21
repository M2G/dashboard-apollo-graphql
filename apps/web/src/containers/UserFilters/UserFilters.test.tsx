import UserFilters from './UserFilters';
import {
  render,
  screen,
  fireEvent,
  act,
  waitFor,
} from '@testing-library/react';

describe('test UserFilters', () => {
  test('should render', async () => {
    const onSearchTerm = jest.fn();

    render(<UserFilters currentTerm="test" onSearchTerm={onSearchTerm} />);

    const searchInput = screen.getByTestId('search-input');

    expect(searchInput).toBeInTheDocument();

    await act(() => {
      fireEvent.change(searchInput, { target: { value: 'test2' } });
    });

    await waitFor(
      () => {
        expect(onSearchTerm).toHaveBeenCalledTimes(1);
      },
      {
        timeout: 500,
      },
    );
  });
});
