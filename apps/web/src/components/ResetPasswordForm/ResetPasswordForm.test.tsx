/*eslint-disable*/
import {
  fireEvent,
  render,
  cleanup,
  screen,
  act,
  waitFor,
} from '@testing-library/react';
import ResetPasswordForm from './ResetPasswordForm';
import { INITIAL_VALUES } from './constants';
import { MemoryRouter } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

//@see https://stackoverflow.com/questions/45020842/how-do-i-mock-react-i18next-and-i18n-js-in-jest
jest.mock('react-i18next', () => ({
  useTranslation: jest.fn(),
}));

const tSpy = (_: any, parameters: any) => {
  if (parameters) {
    return parameters;
  }
  jest.fn((str) => str);
};

const changeLanguageSpy = jest.fn((lng: string) => new Promise(() => {}));
const useTranslationSpy = useTranslation as jest.Mock;

beforeEach(() => {
  jest.clearAllMocks();

  useTranslationSpy.mockReturnValue({
    t: tSpy,
    i18n: {
      changeLanguage: changeLanguageSpy,
      language: 'en',
    },
  });
});

afterEach(cleanup);

describe('Reset Password Form Component', () => {
  describe('Submitting form', () => {
    let inputNewPassword: HTMLInputElement;
    let inputVerifyPassword: HTMLInputElement;
    let btnSubmit: HTMLButtonElement;
    const onSubmit = jest.fn();

    beforeEach(() => {
      //@see https://stackoverflow.com/questions/76081552/typeerror-cannot-destructure-property-basename-of-react-namespace-usecontex
      render(
        <MemoryRouter>
          <ResetPasswordForm
            initialValues={INITIAL_VALUES}
            onSubmit={onSubmit}
          />
        </MemoryRouter>,
      );

      inputNewPassword = screen.getByTestId('new_password');
      inputVerifyPassword = screen.getByTestId('verify_password');
      btnSubmit = screen.getByTestId('submit');
    });

    test('should display correctly value form input', async () => {
      fireEvent.change(inputNewPassword, {
        target: { value: '9Ij!Z-Tb)nft73OpLpw£71' },
      });
      fireEvent.change(inputVerifyPassword, {
        target: { value: '9Ij!Z-Tb)nft73OpLpw£71' },
      });

      expect(inputNewPassword.value).toBe('9Ij!Z-Tb)nft73OpLpw£71');
      expect(inputVerifyPassword.value).toBe('9Ij!Z-Tb)nft73OpLpw£71');

      await act(() => {
        fireEvent.submit(btnSubmit);
      });

      expect(onSubmit).toHaveBeenCalledTimes(1);
      expect(onSubmit.mock.calls[0][0]).toMatchObject({
        new_password: '9Ij!Z-Tb)nft73OpLpw£71',
        verify_password: '9Ij!Z-Tb)nft73OpLpw£71',
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

    test('should display error validation', async () => {
      fireEvent.input(inputNewPassword, {
        target: { value: '' },
      });
      fireEvent.input(inputVerifyPassword, {
        target: { value: '' },
      });

      await act(() => {
        fireEvent.submit(btnSubmit);
      });

      expect(
        screen.getAllByText('String must contain at least 8 character(s)')[0],
      ).toBeInTheDocument();

      expect(
        screen.getAllByText('String must contain at least 8 character(s)')[1],
      ).toBeInTheDocument();

      expect(btnSubmit).toBeDisabled();
    });

    test('should display error validation (match password)', async () => {
      fireEvent.input(inputNewPassword, {
        target: { value: '9Ij!Z-Tb)nft73OpLpw£71' },
      });
      fireEvent.input(inputVerifyPassword, {
        target: { value: '9Ij!Z-Tb)nft73OpLpw£711111111' },
      });

      await act(() => {
        fireEvent.submit(btnSubmit);
      });

      expect(screen.getByText('Passwords does not match')).toBeInTheDocument();

      expect(btnSubmit).toBeDisabled();
    });
  });
});
