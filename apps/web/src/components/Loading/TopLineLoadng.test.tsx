import TopLineLoading from './TopLineLoading';
import { render, screen } from '@testing-library/react';

describe('test TopLineLoading', () => {
  test('should render', () => {
    render(<TopLineLoading />);

    expect(screen.getByTestId('loader')).toBeInTheDocument();
  });
});
