import { render } from '@testing-library/react';
import DateCell from './DateCell';

const date: any = Math.floor(Date.now() / 1000);

describe('test DateCell', () => {
  test('should render', () => {
    const { container } = render(<DateCell date={date} />);
    expect(container).toHaveTextContent(
      new Date(date * 1000).toLocaleDateString(),
    );
    expect(container).toHaveTextContent(
      new Date(date * 1000).toLocaleTimeString(),
    );
  });

  test('should not render', () => {
    const { container } = render(<DateCell date={undefined} />);
    expect(container).toHaveTextContent('-');
  });
});
