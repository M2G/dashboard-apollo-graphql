/*eslint-disable*/
import {
  fireEvent,
  render,
  cleanup,
  screen,
  act,
} from '@testing-library/react';
import SignupForm from './SignupForm';
import { INPUT_NAME, INITIAL_VALUES } from './constants';
import { MemoryRouter } from 'react-router-dom';

jest.mock('react-i18next', () => ({
  useTranslation: () => ({ t: () => ['key'] }),
  Trans: () => jest.fn(),
  t: () => jest.fn(),
}));

afterEach(cleanup);

describe('Signup Form Component', () => {
  describe('Submitting form', () => {
    let wrapper: any;
    let floatingInput: HTMLInputElement;
    let floatingPassword: HTMLInputElement;
    let floatingSubmit: HTMLInputElement;
    const onSubmit = jest.fn();

    beforeEach(async () => {
      //@see https://stackoverflow.com/questions/76081552/typeerror-cannot-destructure-property-basename-of-react-namespace-usecontex
      render(
        <MemoryRouter>
          <SignupForm initialValues={INITIAL_VALUES} onSubmit={onSubmit} />
        </MemoryRouter>,
      );

      floatingInput = screen.getByTestId('email');
      floatingPassword = screen.getByTestId('password');
      floatingSubmit = screen.getByTestId('submit');

      fireEvent.change(floatingInput, { target: { value: 'test@gmail.com' } });
      fireEvent.change(floatingPassword, { target: { value: 'test' } });

      await act(() => {
        fireEvent.submit(floatingSubmit);
      });
    });

    test('should display error validatiob', async () => {
      fireEvent.change(floatingInput, { target: { value: '' } });
      fireEvent.change(floatingPassword, { target: { value: '' } });

      await act(() => {
        fireEvent.submit(floatingSubmit);
      });

      expect(screen.getByText('Invalid email')).toBeInTheDocument();
      expect(screen.getByText('Password is required')).toBeInTheDocument();
    });

    test('should display correctly value form input', () => {
      expect(floatingInput.value).toBe('test@gmail.com');
      expect(floatingPassword.value).toBe('test');
    });

    test('should submit data', () => {
      expect(onSubmit).toHaveBeenCalledTimes(1);
      expect(onSubmit.mock.calls[0][0]).toMatchObject({
        email: 'test@gmail.com',
        password: 'test',
      });

      /*
      expect(onSubmit).toHaveBeenCalledWith(
        {
          email: 'test@gmail.com',
          password: 'test',
        }
      );
      */
    });
  });
});
