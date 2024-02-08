/*eslint-disable*/
import { fireEvent, render, cleanup, screen } from '@testing-library/react';
import SigninForm from './SigninForm';
import { INPUT_NAME } from './constants';
import { MemoryRouter } from 'react-router-dom';

jest.mock('react-i18next', () => ({
  useTranslation: () => ({ t: () => ['key'] }),
  Trans: () => jest.fn(),
  t: () => jest.fn(),
}));

afterEach(cleanup);

describe('Signin Container', () => {
  describe('Submitting form', () => {
    let wrapper: any;
    let floatingInput: HTMLInputElement;
    let floatingPassword: HTMLInputElement;
    const onSubmit = jest.fn();

    beforeEach(() => {
      const INITIAL_VALUES = {
        [INPUT_NAME.EMAIL]: '',
        [INPUT_NAME.PASSWORD]: '',
      };

      //@see https://stackoverflow.com/questions/76081552/typeerror-cannot-destructure-property-basename-of-react-namespace-usecontex
      render(
        <MemoryRouter>
          <SigninForm initialValues={INITIAL_VALUES} onSubmit={onSubmit} />
        </MemoryRouter>,
      );

      const tt = screen.getByTestId('email');

      console.log('tt', tt);

      /*

      floatingInput = wrapper.container.querySelector('#floatingInput');
      floatingPassword = wrapper.container.querySelector('#floatingPassword');

      fireEvent.change(floatingInput, { target: { value: 'test@gmail.com' } });
      fireEvent.change(floatingPassword, { target: { value: 'test' } });

      expect(floatingInput).toBeInTheDocument();
      expect(floatingPassword).toBeInTheDocument();

      const button: any = wrapper.container.querySelector('.btn');
      fireEvent.click(button);
    });

    test('should render', () => {
      expect(onSubmit).toHaveBeenCalledTimes(1);
      expect(onSubmit).toHaveBeenCalledWith({
        email: 'test@gmail.com',
        password: 'test',
      });*/
    });

    test('should render', () => {});
  });
});
