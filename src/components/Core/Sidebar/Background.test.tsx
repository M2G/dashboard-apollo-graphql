/* eslint-disable */
import { render } from '@testing-library/react';
import Background from './Background';

describe('test DateCell', () => {
  test('should render', () => {
    const setIsOpened = jest.fn();
    const { container }: any = render(
      <Background
        show
        setIsOpened={setIsOpened}>
        <div>Test</div>
      </Background>,
);

    const backgroundIsActive: any = container?.querySelector('.background.is-active');
    expect(backgroundIsActive).toBeInTheDocument();
  });

  test('should not render', () => {
    const setIsOpened = jest.fn();
    const { container }: any = render(
      <Background
        show={false}
        setIsOpened={setIsOpened}>
        <div>Test</div>
      </Background>,
    );

    const background: any = container?.querySelector('.background');
    expect(background).toBeInTheDocument();
  });
});
