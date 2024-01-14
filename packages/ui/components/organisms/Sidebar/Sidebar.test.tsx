/* eslint-disable */
import { render, screen, fireEvent } from '@testing-library/react';
import SidebarWrapper from './SidebarWrapper';

describe('test DateCell', () => {
  test('should render', () => {
    const onClose = jest.fn();

    const { container }: any = render(
      <SidebarWrapper isOpened setIsOpened={onClose}>
        <div>Test</div>
      </SidebarWrapper>
    );

    const backgroundIsActive: any = container?.querySelector(
      '.background.is-active'
    );
    const sidebarIsActive: any = container?.querySelector('.sidebar.is-active');
    const button = screen.getByRole('button');

    expect(screen.getByText('Test')).toBeInTheDocument();
    expect(sidebarIsActive).toBeInTheDocument();
    expect(backgroundIsActive).toBeInTheDocument();
    expect(button).toBeInTheDocument();

    fireEvent.click(button);
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  test('should not render', () => {
    const onClose: any = jest.fn();

    const { container }: any = render(
      <SidebarWrapper setIsOpened={onClose} isOpened>
        <div>Test</div>
      </SidebarWrapper>
    );

    const backgroundIsActive: any = container?.querySelector('.background');
    const sidebarIsActive: any = container?.querySelector('.sidebar');
    const button = screen.getByRole('button');

    expect(screen.getByText('Test')).toBeInTheDocument();
    expect(sidebarIsActive).toBeInTheDocument();
    expect(backgroundIsActive).toBeInTheDocument();
    expect(button).toBeInTheDocument();

    fireEvent.click(button);
    expect(onClose).toHaveBeenCalledTimes(1);
  });
});
