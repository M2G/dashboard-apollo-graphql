/* eslint-disable */
import { render } from '@testing-library/react';
import Background from './Background';

describe('test DateCell', () => {
  test('should render', () => {
    const setIsOpened = jest.fn();
    const { container }: any = render(
      <Background show setIsOpened={setIsOpened} />
    );

    const backgroundIsActive: any = container?.querySelector(
      '.background.is-active'
    );
    expect(backgroundIsActive).toBeInTheDocument();
  });

  test('should not render', () => {
    const setIsOpened = jest.fn();
    const { container }: any = render(
      <Background show={false} setIsOpened={setIsOpened} />
    );

    const background: any = container?.querySelector('.background');
    expect(background).toBeInTheDocument();
  });
});
