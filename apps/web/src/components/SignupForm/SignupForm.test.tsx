/*eslint-disable*/
import { fireEvent, render, cleanup } from '@testing-library/react';
import SignupForm from './SignupForm';
import { INPUT_NAME } from './constants';

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
        [INPUT_NAME.PASSWORD]: ''
      };

      wrapper = render(
        <SignupForm initialValues={INITIAL_VALUES} onSubmit={onSubmit} />
      );

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
        password: 'test'
      });
    });
  });
});
