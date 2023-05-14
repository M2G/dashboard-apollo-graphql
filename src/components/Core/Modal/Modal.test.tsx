/* eslint-disable */
import { render, screen, fireEvent } from '@testing-library/react';
import Modal from './Modal';

describe('test Modal', () => {
  test('should render', async () => {
    const onClose = jest.fn();
    const onConfirm = jest.fn();

    render(
      <Modal id="test" title="test" isShowing hide={onClose} onConfirm={onConfirm}>
        <div>Test</div>
      </Modal>,
    );

    expect(screen.getByText('Test')).toBeInTheDocument();
    const button = screen.getAllByRole('button');
    fireEvent.click(button[0]);
    expect(onClose).toHaveBeenCalledTimes(1);
  });
});
