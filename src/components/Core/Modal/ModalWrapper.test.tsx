/* eslint-disable */
import { render, screen, fireEvent } from '@testing-library/react';
import ModalWrapper from './ModalWrapper';

describe('test DateCell', () => {
  test('should render', async () => {
    const onClose = jest.fn();
    const onConfirm = jest.fn();

    render(
      <ModalWrapper
        id="test"
        isShowing
        hide={onClose}
        onConfirm={onConfirm}
      >
        <div>Test</div>
      </ModalWrapper>
    );

    expect(screen.getByText('Test')).toBeInTheDocument();
    const overlay: any = document.body?.querySelector('.c-modal-overlay');
    const modalWrapper: any = document.body?.querySelector('.c-modal-wrapper');
    const modalContainer: any = document.body?.querySelector('.c-modal');
    const modalHeader: any = document.body?.querySelector('.modal-header');
    const closeButton: any = document.body?.querySelector('.modal-close-button');

    expect(overlay).toBeInTheDocument();
    expect(modalWrapper).toBeInTheDocument();
    expect(modalContainer).toBeInTheDocument();
    expect(modalHeader).toBeInTheDocument();
    expect(closeButton).toBeInTheDocument();

    const button = screen.getByRole('button');
    fireEvent.click(button);
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  test('should not render', () => {
    const onClose = jest.fn();
    const onConfirm = jest.fn();

    render(
      <ModalWrapper
        isShowing={false}
        onConfirm={onConfirm}
        hide={onClose}>
        <div>Test</div>
      </ModalWrapper>
    );

    const overlay: any = document.body?.querySelector('.c-modal-overlay');
    const modalWrapper: any = document.body?.querySelector('.c-modal-wrapper');
    const modalContainer: any = document.body?.querySelector('.c-modal');
    const modalHeader: any = document.body?.querySelector('.modal-header');
    const closeButton: any = document.body?.querySelector('.modal-close-button');

    expect(overlay).toBeNull();
    expect(modalWrapper).toBeNull();
    expect(modalContainer).toBeNull();
    expect(modalHeader).toBeNull();
    expect(closeButton).toBeNull();
  });
});
