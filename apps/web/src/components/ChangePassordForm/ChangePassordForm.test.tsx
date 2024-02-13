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
    let fieldOldPassword: HTMLInputElement;
    let fieldNewPassword: HTMLInputElement;
    let fieldConfirmPassword: HTMLInputElement;
    let buttonSubmit: HTMLInputElement;
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

      fieldOldPassword = screen.getByTestId('oldPassword');
      fieldNewPassword = screen.getByTestId('password');
      fieldConfirmPassword = screen.getByTestId('confirmPassword');
      buttonSubmit = screen.getByTestId('submit');

      fireEvent.change(fieldOldPassword, {
        target: { value: 'bbbbbbbbbbbbbb' },
      });
      fireEvent.change(fieldNewPassword, { target: { value: 'aaaaaaaaaaaa' } });
      fireEvent.change(fieldConfirmPassword, {
        target: { value: 'aaaaaaaaaaaa' },
      });

      await act(() => {
        fireEvent.submit(buttonSubmit);
      });
    });

    test('should display correctly value form input', () => {
      expect(fieldOldPassword.value).toBe('bbbbbbbbbbbbbb');
      expect(fieldNewPassword.value).toBe('aaaaaaaaaaaa');
      expect(fieldConfirmPassword.value).toBe('aaaaaaaaaaaa');
    });

    test('should display error validation', async () => {
      fireEvent.change(fieldOldPassword, { target: { value: '' } });
      fireEvent.change(fieldNewPassword, { target: { value: '' } });
      fireEvent.change(fieldConfirmPassword, { target: { value: '' } });

      await act(() => {
        fireEvent.submit(buttonSubmit);
      });

      expect(
        screen.getByText('String must contain at least 6 character(s)'),
      ).toBeInTheDocument();
      expect(buttonSubmit).toBeDisabled();
    });

    //TODO error validation match password
    test('should display error match validation', async () => {
      fireEvent.change(fieldOldPassword, {
        target: { value: 'bbbbbbbbbbbbbb' },
      });
      fireEvent.change(fieldNewPassword, {
        target: { value: 'aaaaaaaaaaaaaaaaa' },
      });
      fireEvent.change(fieldConfirmPassword, {
        target: { value: 'cccccccccccccccc' },
      });
      await act(() => {
        fireEvent.submit(buttonSubmit);
      });

      screen.debug();

      expect(buttonSubmit).toBeDisabled();
    });

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
