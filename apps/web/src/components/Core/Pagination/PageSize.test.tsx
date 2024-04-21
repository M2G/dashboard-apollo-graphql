import PageSize from './PageSize';
import { fireEvent, render, screen } from '@testing-library/react';

describe('test PageSize', () => {
  test('should action select', async () => {
    const setCurrentPageSize = jest.fn();

    render(
      <PageSize currentPageSize={2} setCurrentPageSize={setCurrentPageSize} />,
    );

    const select = screen.getByTestId('select-page-size') as HTMLSelectElement;

    expect(select).toBeInTheDocument();

    await fireEvent.change(select, { target: { value: 5 } });

    const options = screen.getAllByRole('option');

    expect(options).toHaveLength(4);

    expect(options[0].selected).toBeTruthy();

    expect(setCurrentPageSize).toHaveBeenCalledTimes(1);
  });
});
