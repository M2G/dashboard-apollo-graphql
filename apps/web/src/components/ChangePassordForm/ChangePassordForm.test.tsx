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
    });

    test('should display correctly value form input', async () => {
      fireEvent.change(fieldOldPassword, {
        target: { value: '9Ij!Z-Tb)nft73OpLpw£71' },
      });
      fireEvent.change(fieldNewPassword, {
        target: { value: 'Li)~zpS^Q%Pj9>D"833' },
      });
      fireEvent.change(fieldConfirmPassword, {
        target: { value: 'Li)~zpS^Q%Pj9>D"833' },
      });

      expect(fieldOldPassword.value).toBe('9Ij!Z-Tb)nft73OpLpw£71');
      expect(fieldNewPassword.value).toBe('Li)~zpS^Q%Pj9>D"833');
      expect(fieldConfirmPassword.value).toBe('Li)~zpS^Q%Pj9>D"833');

      await act(() => {
        fireEvent.submit(buttonSubmit);
      });

      expect(buttonSubmit).toBeEnabled();
    });

    test('should display error validation', async () => {
      fireEvent.change(fieldOldPassword, { target: { value: '' } });
      fireEvent.change(fieldNewPassword, { target: { value: '' } });
      fireEvent.change(fieldConfirmPassword, { target: { value: '' } });

      await act(() => {
        fireEvent.submit(buttonSubmit);
      });

      expect(
        screen.queryAllByText('String must contain at least 6 character(s)')[0],
      ).toBeInTheDocument();
      expect(buttonSubmit).toBeDisabled();
    });

    test('should display error validation (match password)', async () => {
      fireEvent.change(fieldOldPassword, {
        target: { value: '9Ij!Z-Tb)nft73OpLpw£71' },
      });
      fireEvent.input(fieldNewPassword, {
        target: { value: 'Li)~zpS^Q%Pj9>D"833' },
      });
      fireEvent.input(fieldConfirmPassword, {
        target: { value: 'Li)~zpS^Q%Pj9>D"833----' },
      });

      await act(() => {
        fireEvent.submit(buttonSubmit);
      });

      expect(screen.getByText('Passwords does not match')).toBeInTheDocument();

      expect(buttonSubmit).toBeDisabled();
    });

    test('should submit data', async () => {
      fireEvent.change(fieldOldPassword, {
        target: { value: '9Ij!Z-Tb)nft73OpLpw£71' },
      });
      fireEvent.change(fieldNewPassword, {
        target: { value: 'Li)~zpS^Q%Pj9>D"833' },
      });
      fireEvent.change(fieldConfirmPassword, {
        target: { value: 'Li)~zpS^Q%Pj9>D"833' },
      });

      await act(() => {
        fireEvent.submit(buttonSubmit);
      });

      expect(onSubmit).toHaveBeenCalledTimes(1);
      expect(onSubmit.mock.calls[0][0]).toMatchObject({
        oldPassword: '9Ij!Z-Tb)nft73OpLpw£71',
        password: 'Li)~zpS^Q%Pj9>D"833',
        confirmPassword: 'Li)~zpS^Q%Pj9>D"833',
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
