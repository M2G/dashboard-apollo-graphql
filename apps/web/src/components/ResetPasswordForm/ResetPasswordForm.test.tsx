/*eslint-disable*/
import {
  fireEvent,
  render,
  cleanup,
  screen,
  act,
} from '@testing-library/react';
import ResetPasswordForm from './ResetPasswordForm';
import { INPUT_NAME, INITIAL_VALUES } from './constants';
import { MemoryRouter } from 'react-router-dom';

jest.mock('react-i18next', () => ({
  useTranslation: () => ({ t: () => ['key'] }),
  Trans: () => jest.fn(),
  t: () => jest.fn(),
}));

afterEach(cleanup);

describe('Reset Password Form Component', () => {
  describe('Submitting form', () => {
    let wrapper: any;
    let floatingNewPassword: HTMLInputElement;
    let floatingVerifyPassword: HTMLInputElement;
    let floatingSubmit: HTMLInputElement;
    const onSubmit = jest.fn();

    beforeEach(async () => {
      //@see https://stackoverflow.com/questions/76081552/typeerror-cannot-destructure-property-basename-of-react-namespace-usecontex
      render(
        <MemoryRouter>
          <ResetPasswordForm
            initialValues={INITIAL_VALUES}
            onSubmit={onSubmit}
          />
        </MemoryRouter>,
      );

      floatingNewPassword = screen.getByTestId('new_password');
      floatingVerifyPassword = screen.getByTestId('verify_password');
      floatingSubmit = screen.getByTestId('submit');

      fireEvent.change(floatingNewPassword, { target: { value: 'test' } });
      fireEvent.change(floatingVerifyPassword, { target: { value: 'test' } });

      await act(() => {
        fireEvent.submit(floatingSubmit);
      });
    });

    test('should display error validatiob', async () => {
      fireEvent.change(floatingNewPassword, { target: { value: '' } });
      fireEvent.change(floatingVerifyPassword, { target: { value: '' } });

      await act(() => {
        fireEvent.submit(floatingSubmit);
      });

      expect(
        screen.getAllByText('Verify password requis')[0],
      ).toBeInTheDocument();
      expect(
        screen.getAllByText('Verify password requis')[1],
      ).toBeInTheDocument();
    });

    test('should display correctly value form input', () => {
      expect(floatingVerifyPassword.value).toBe('test');
      expect(floatingVerifyPassword.value).toBe('test');
    });

    test('should submit data', () => {
      expect(onSubmit).toHaveBeenCalledTimes(1);
      expect(onSubmit.mock.calls[0][0]).toMatchObject({
        new_password: 'test',
        verify_password: 'test',
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
