/*eslint-disable*/
import {
  fireEvent,
  render,
  cleanup,
  screen,
  act,
} from '@testing-library/react';
import ChangePassordForm from './ChangePassordForm';
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
    let oldPassword: HTMLInputElement;
    let newPassword: HTMLInputElement;
    let confirmPassword: HTMLInputElement;
    let submit: HTMLInputElement;
    const onSubmit = jest.fn();

    beforeEach(async () => {
      //@see https://stackoverflow.com/questions/76081552/typeerror-cannot-destructure-property-basename-of-react-namespace-usecontex
      render(
        <MemoryRouter>
          <ChangePassordForm
            initialValues={INITIAL_VALUES}
            onSubmit={onSubmit}
          />
        </MemoryRouter>,
      );

      oldPassword = screen.getByTestId('oldPassword');
      newPassword = screen.getByTestId('password');
      confirmPassword = screen.getByTestId('confirmPassword');
      submit = screen.getByTestId('submit');

      fireEvent.change(oldPassword, { target: { value: 'bbbbbbbbbbbbbb' } });
      fireEvent.change(newPassword, { target: { value: 'aaaaaaaaaaaa' } });
      fireEvent.change(confirmPassword, { target: { value: 'aaaaaaaaaaaa' } });

      await act(() => {
        fireEvent.submit(submit);
      });
    });

    test('should display correctly value form input', () => {
      expect(oldPassword.value).toBe('test');
      expect(newPassword.value).toBe('test2');
      expect(confirmPassword.value).toBe('test2');
    });

    test('should display error validation', async () => {
      fireEvent.change(oldPassword, { target: { value: '' } });
      fireEvent.change(newPassword, { target: { value: '' } });
      fireEvent.change(confirmPassword, { target: { value: '' } });

      await act(() => {
        fireEvent.submit(submit);
      });

      expect(
        screen.getByText('String must contain at least 6 character(s)'),
      ).toBeInTheDocument();
      expect(submit).toBeDisabled();
    });

    /*
    //TODO error validation match password
      test('should display error match validation', async () => {
        fireEvent.change(oldPassword, { target: { value: 'bbbbbbbbbbbbbb' } });
        fireEvent.change(newPassword, { target: { value: 'aaaaaaaaaaaaaaaaa' } });
        fireEvent.blur(newPassword);
        fireEvent.change(confirmPassword, { target: { value: 'cccccccccccccccc' } });
        fireEvent.blur(confirmPassword);

        await act(() => {
          fireEvent.submit(submit);
        });

        screen.debug();

        expect(submit).toBeDisabled();
      });
     */

    test('should submit data', () => {
      expect(onSubmit).toHaveBeenCalledTimes(1);
      expect(onSubmit.mock.calls[0][0]).toMatchObject({
        oldPassword: 'bbbbbbbbbbbbbb',
        password: 'aaaaaaaaaaaa',
        confirmPassword: 'aaaaaaaaaaaa',
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
