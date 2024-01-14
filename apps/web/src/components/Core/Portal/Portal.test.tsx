/*eslint-disable*/
import { render, screen } from '@testing-library/react';
import Portal from './Portal';

describe('test DateCell', () => {
  test('should render', () => {
    render(
      <Portal id="123456">
        <div>test</div>
      </Portal>
    );

    const id: any = document.body?.querySelector('#123456');

    expect(id).toBeInTheDocument();
    expect(screen.getByText('test')).toBeInTheDocument();
  });
});
