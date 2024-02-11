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
    let password: HTMLInputElement;
    let newPassword: HTMLInputElement;
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
      password = screen.getByTestId('password');
      newPassword = screen.getByTestId('password');
      submit = screen.getByTestId('submit');

      fireEvent.change(oldPassword, { target: { value: 'test' } });
      fireEvent.change(password, { target: { value: 'test2' } });
      fireEvent.change(newPassword, { target: { value: 'test2' } });

      await act(() => {
        fireEvent.submit(submit);
      });
    });

    test('should display correctly value form input', () => {
      expect(oldPassword.value).toBe('test');
      expect(password.value).toBe('test2');
      expect(newPassword.value).toBe('test2');
    });

    test('should submit data', () => {
      expect(onSubmit).toHaveBeenCalledTimes(1);
      expect(onSubmit.mock.calls[0][0]).toMatchObject({
        email: 'test',
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
