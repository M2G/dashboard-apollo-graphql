import Sidebar from './Sidebar';
import { render, screen } from '@testing-library/react';

// Mocking the icons @see https://stackoverflow.com/questions/66270169/how-can-i-mock-out-all-the-icons-in-react-material-ui-icons-using-jest
jest.mock('ui', () => {
  const icons = {
    __esModule: true,
  };

  const handler = {
    get: function (_, prop) {
      return () => <div data-testid={prop} className={`mock_${prop}Icon`} />;
    },
  };

  return new Proxy(icons, handler);
});

describe('test Sidebar', () => {
  test('should render', async () => {
    render(<Sidebar />);

    expect(screen.getAllByTestId('Icon').length).toBe(4);

    screen.debug();
  });
});
