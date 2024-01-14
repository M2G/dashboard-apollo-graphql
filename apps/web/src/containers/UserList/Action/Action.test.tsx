import { render, screen } from '@testing-library/react';
import AddUser from './AddUser';

describe('test AddUser', () => {
  test('should render', () => {
    const onAdd = jest.fn();
    render(<AddUser onAdd={onAdd} canAdd />);
    const button = screen.getByText('Add user');
    button.click();
    expect(onAdd).toBeCalledTimes(1);
  });
});
