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
import { INPUT_NAME } from './constants';
import AutoMockProvider from '@/apollo/AutoMockProvider';

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
  // jest.clearAllMocks();

  useTranslationSpy.mockReturnValue({
    t: tSpy,
    i18n: {
      changeLanguage: changeLanguageSpy,
      language: 'en',
    },
  });

  jest.spyOn(URLSearchParams.prototype, 'has').mockReturnValue(true);
  jest.spyOn(URLSearchParams.prototype, 'get').mockReturnValue('token');
});

afterEach(cleanup);

describe('Signup Container', () => {
  describe('Submitting form', () => {
    let inputNewPassword: HTMLInputElement;
    let inputVerifyPassword: HTMLInputElement;
    let btnSubmit: HTMLButtonElement;
    const onSubmit = jest.fn();

    beforeEach(() => {
      const INITIAL_VALUES = {
        [INPUT_NAME.NEW_PASSWORD]: '',
        [INPUT_NAME.VERIFY_PASSWORD]: '',
      };

      render(
        <AutoMockProvider mockResolvers={{}}>
          <MemoryRouter initialEntries={['/reset-password']}>
            <ResetPassword initialValues={INITIAL_VALUES} onSubmit={onSubmit} />
          </MemoryRouter>
        </AutoMockProvider>,
      );

      //inputNewPassword = screen.getByTestId('new_password');
      //inputVerifyPassword = screen.getByTestId('verify_password');
      //btnSubmit = screen.getByTestId('submit');
    });

    test('should render', async () => {
      screen.debug();
      /*  fireEvent.change(inputNewPassword, {
        target: { value: '9Ij!Z-Tb)nft73OpLpw£71' },
      });
      fireEvent.change(inputVerifyPassword, {
        target: { value: '9Ij!Z-Tb)nft73OpLpw£71' },
      });

      expect(inputNewPassword).toBeInTheDocument();
      expect(inputVerifyPassword).toBeInTheDocument();

      await act(() => {
        fireEvent.submit(btnSubmit);
      });

      expect(onSubmit).toHaveBeenCalledTimes(1);
      expect(onSubmit.mock.calls[0][0]).toMatchObject({
        new_password: '9Ij!Z-Tb)nft73OpLpw£71',
        verify_password: '9Ij!Z-Tb)nft73OpLpw£71',
      });*/
    });
  });
});
