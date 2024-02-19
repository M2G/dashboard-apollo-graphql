/*eslint-disable*/
import {
  fireEvent,
  render,
  cleanup,
  screen,
  act,
} from '@testing-library/react';
import SigninForm from './SigninForm';
import { INPUT_NAME, INITIAL_VALUES } from './constants';
import { MemoryRouter } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

//@see https://stackoverflow.com/questions/45020842/how-do-i-mock-react-i18next-and-i18n-js-in-jest
jest.mock('react-i18next', () => ({
  useTranslation: jest.fn(),
}));

const tSpy = jest.fn((str) => str);
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

describe('Signin Form Component', () => {
  describe('Submitting form', () => {
    let wrapper: any;
    let fieldInput: HTMLInputElement;
    let fieldPassword: HTMLInputElement;
    let btnSubmit: HTMLButtonElement;
    const onSubmit = jest.fn();

    beforeEach(async () => {
      //@see https://stackoverflow.com/questions/76081552/typeerror-cannot-destructure-property-basename-of-react-namespace-usecontex
      render(
        <MemoryRouter>
          <SigninForm initialValues={INITIAL_VALUES} onSubmit={onSubmit} />
        </MemoryRouter>,
      );

      fieldInput = screen.getByTestId('email');
      fieldPassword = screen.getByTestId('password');
      btnSubmit = screen.getByTestId('submit');
    });

    test('should display correctly value form input', async () => {
      fireEvent.change(fieldInput, { target: { value: 'test@gmail.com' } });
      fireEvent.change(fieldPassword, {
        target: { value: '9Ij!Z-Tb)nft73OpLpw£71' },
      });

      expect(fieldInput.value).toBe('test@gmail.com');
      expect(fieldPassword.value).toBe('9Ij!Z-Tb)nft73OpLpw£71');

      await act(() => {
        fireEvent.submit(btnSubmit);
      });

      expect(btnSubmit).toBeEnabled();
      expect(onSubmit).toHaveBeenCalledTimes(1);
      expect(onSubmit.mock.calls[0][0]).toMatchObject({
        email: 'test@gmail.com',
        password: '9Ij!Z-Tb)nft73OpLpw£71',
      });

      //@TODO: fix this test
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
      fireEvent.change(fieldInput, { target: { value: '' } });
      fireEvent.change(fieldPassword, { target: { value: '' } });

      await act(() => {
        fireEvent.submit(btnSubmit);
      });

      expect(screen.getByText('Invalid email')).toBeInTheDocument();
      expect(
        screen.getByText('String must contain at least 6 character(s)'),
      ).toBeInTheDocument();

      expect(btnSubmit).toBeDisabled();
    });
  });
});
