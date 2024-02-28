/* eslint-disable */
import {
  fireEvent,
  render,
  cleanup,
  screen,
  act,
  waitFor,
} from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import ResetPassword from './ResetPassword';
import AutoMockProvider from '@/apollo/AutoMockProvider';
import { useResetPasswordMutation } from '@/modules/graphql/generated';

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
  useTranslationSpy.mockReturnValue({
    t: tSpy,
    i18n: {
      changeLanguage: changeLanguageSpy,
      language: 'en',
    },
  });

  jest
    .spyOn(URLSearchParams.prototype, 'get')
    .mockReturnValue('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9');

  //jest.clearAllMocks();
});

afterEach(cleanup);

const data = {
  resetPassword: {
    success: true,
  },
};

const data2 = {
  resetPassword: {
    success: false,
  },
};

describe('Reset Password Container', () => {
  describe('Submitting form', () => {
    let inputNewPassword: HTMLInputElement;
    let inputVerifyPassword: HTMLInputElement;
    let btnSubmit: HTMLButtonElement;

    beforeEach(() => {
      const resolver = {
        useResetPasswordMutation: () => ({ data, loading: false }),
      };

      render(
        <AutoMockProvider mockResolvers={resolver}>
          <MemoryRouter initialEntries={['/reset-password']}>
            <ResetPassword />
          </MemoryRouter>
        </AutoMockProvider>,
      );

      inputNewPassword = screen.getByTestId('new_password');
      inputVerifyPassword = screen.getByTestId('verify_password');
      btnSubmit = screen.getByTestId('submit');
    });

    test('should success reset password', async () => {
      fireEvent.change(inputNewPassword, {
        target: { value: '9Ij!Z-Tb)nft73OpLpw£71' },
      });
      fireEvent.change(inputVerifyPassword, {
        target: { value: '9Ij!Z-Tb)nft73OpLpw£71' },
      });

      await act(() => {
        fireEvent.submit(btnSubmit);
      });

      // screen.getByText('Password reset confirmation');

      screen.debug();
    });
  });
  /* describe('Submitting form 2', () => {
    let inputNewPassword: HTMLInputElement;
    let inputVerifyPassword: HTMLInputElement;
    let btnSubmit: HTMLButtonElement;

    beforeEach(() => {
      const resolver = {
        useResetPasswordMutation: () => data2,
      };

      render(
        <AutoMockProvider mockResolvers={resolver}>
          <MemoryRouter initialEntries={['/reset-password']}>
            <ResetPassword />
          </MemoryRouter>
        </AutoMockProvider>,
      );

      inputNewPassword = screen.getByTestId('new_password');
      inputVerifyPassword = screen.getByTestId('verify_password');
      btnSubmit = screen.getByTestId('submit');
    });

    test('should success reset password', async () => {
      fireEvent.change(inputNewPassword, {
        target: { value: '9Ij!Z-Tb)nft73OpLpw£71' },
      });
      fireEvent.change(inputVerifyPassword, {
        target: { value: '9Ij!Z-Tb)nft73OpLpw£71' },
      });

      await act(() => {
        fireEvent.submit(btnSubmit);
      });

      // screen.getByText('Password reset confirmation');

      screen.debug();
    });
  });*/
});
