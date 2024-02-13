/*eslint-disable*/
import {
  fireEvent,
  render,
  cleanup,
  screen,
  act,
} from '@testing-library/react';
import ForgotPasswordForm from './ForgotPasswordForm';
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
    let fieldEmail: HTMLInputElement;
    let fieldSubmit: HTMLInputElement;
    const onSubmit = jest.fn();

    beforeEach(async () => {
      //@see https://stackoverflow.com/questions/76081552/typeerror-cannot-destructure-property-basename-of-react-namespace-usecontex
      render(
        <MemoryRouter>
          <ForgotPasswordForm
            initialValues={INITIAL_VALUES}
            onSubmit={onSubmit}
          />
        </MemoryRouter>,
      );

      fieldEmail = screen.getByTestId('email');
      fieldSubmit = screen.getByTestId('submit');

      fireEvent.change(fieldEmail, { target: { value: 'test@gmail.com' } });

      await act(() => {
        fireEvent.submit(fieldSubmit);
      });
    });

    test('should display error validation', async () => {
      fireEvent.change(fieldEmail, { target: { value: '' } });

      await act(() => {
        fireEvent.submit(fieldSubmit);
      });

      expect(screen.getByText('Invalid email')).toBeInTheDocument();
      expect(fieldSubmit).toBeDisabled();
    });

    test('should display correctly value form input', () => {
      expect(fieldEmail.value).toBe('test@gmail.com');
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
