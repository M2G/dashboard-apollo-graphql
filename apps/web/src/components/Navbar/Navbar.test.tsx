/* eslint-disable */
import Navbar from './Navbar';
import { render, screen, fireEvent } from '@testing-library/react';

describe('test Navbar', () => {
  test('should render', () => {
    render(<Navbar />);

    screen.debug();

    /*

    const initialState = { auth: {} };
    const options: any = { initialState };

    const { container }: any = render(<Navbar />, options);

    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Search')).toBeInTheDocument();

    const button: any = container?.querySelector('.btn');
    expect(button).toBeInTheDocument();
    fireEvent.click(button);

     */
  });
});
