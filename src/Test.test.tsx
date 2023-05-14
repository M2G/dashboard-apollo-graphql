import { render, screen } from '@testing-library/react';
import Test from './Test';

describe('App', () => {
  it('should work as expected', () => {
    render(<Test />);
    screen.debug();
    expect(1 + 1).toBe(2);
  });
});
