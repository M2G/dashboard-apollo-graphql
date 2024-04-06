/* eslint-disable */
import NoData from './NoData';
import { render, screen } from '@testing-library/react';

describe('test NoData', () => {
  test('should render', () => {
    render(<NoData />);

    expect(screen.getByText('No Data')).toBeInTheDocument();
  });
});
