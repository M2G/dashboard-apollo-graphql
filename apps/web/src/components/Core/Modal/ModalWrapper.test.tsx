/* eslint-disable */
import { render, screen, fireEvent } from '@testing-library/react';
import ModalWrapper from './ModalWrapper';

describe('test ModalWrapper', () => {
  test('should render', async () => {
    const onClose = jest.fn();
    const onConfirm = jest.fn();

    render(
      <ModalWrapper title="test" isShowing hide={onClose} onConfirm={onConfirm}>
        <div>Test</div>
      </ModalWrapper>,
    );

    expect(screen.getByText('Test')).toBeInTheDocument();
    const button = screen.getAllByRole('button');
    fireEvent.click(button[0]);
    expect(onClose).toHaveBeenCalledTimes(1);
  });
});
