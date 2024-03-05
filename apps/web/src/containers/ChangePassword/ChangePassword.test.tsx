/* eslint-disable */
import {
  fireEvent,
  render,
  cleanup,
  screen,
  act,
} from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { MockedProvider } from '@apollo/client/testing';
import ChangePassword from './ChangePassword';
import { UpdateUserDocument } from '@/modules/graphql/generated';
import { GraphQLError } from 'graphql';

beforeEach(() => {
  jest.clearAllMocks();
});

describe('Change password Container', () => {
  describe('Change password success', () => {
    let wrapper: any;
    let inputOldPassword: HTMLInputElement;
    let inputPassword: HTMLInputElement;
    let inputConfirmPassword: HTMLInputElement;
    let btnSubmit: HTMLButtonElement;

    afterEach(cleanup);
    beforeEach(() => {
      const mocks = [
        {
          //delay: 30,
          request: {
            query: UpdateUserDocument,
            variables: {
              password: '9Ij!Z-Tb)nft73OpLpw£71',
            },
          },
          result: {
            data: {
              updateUser: {
                __typename: 'Status',
                success: true,
              },
            },
          },
        },
      ];

      render(
        <MockedProvider mocks={mocks} addTypename={false}>
          <MemoryRouter initialEntries={['/change-password']}>
            <ChangePassword />
          </MemoryRouter>
        </MockedProvider>,
      );

      inputOldPassword = screen.getByTestId('oldPassword');
      inputPassword = screen.getByTestId('password');
      inputConfirmPassword = screen.getByTestId('confirmPassword');
      btnSubmit = screen.getByTestId('submit');
    });

    it('should success forgot password', async () => {
      fireEvent.change(oldPassword, {
        target: { value: '9Ij!Z-Tb)nft73OpLpw£71----' },
      });
      fireEvent.change(password, {
        target: { value: '9Ij!Z-Tb)nft73OpLpw£71' },
      });
      fireEvent.change(confirmPassword, {
        target: { value: '9Ij!Z-Tb)nft73OpLpw£71' },
      });

      await act(() => {
        fireEvent.submit(btnSubmit);
      });

      screen.debug();

      expect(
        await screen.findByText('Your request has been processed successfully'),
      ).toBeInTheDocument();
    });
  });
  describe('Submitting form (2)', () => {
    let inputNewPassword: HTMLInputElement;
    let inputVerifyPassword: HTMLInputElement;
    let btnSubmit: HTMLButtonElement;

    afterEach(cleanup);
    beforeEach(() => {
      const mocks = [
        {
          //delay: 30,
          request: {
            query: ForgotPasswordDocument,
            variables: {
              email: 'test@gmail.com',
            },
          },
          result: {
            data: {
              forgotPassword: {
                __typename: 'Status',
                success: false,
              },
            },
          },
        },
      ];

      render(
        <MockedProvider mocks={mocks} addTypename={false}>
          <MemoryRouter initialEntries={['/reset-password']}>
            <ResetPassword />
          </MemoryRouter>
        </MockedProvider>,
      );

      inputNewPassword = screen.getByTestId('new_password');
      inputVerifyPassword = screen.getByTestId('verify_password');
      btnSubmit = screen.getByTestId('submit');
    });

    it('should fail reset password', async () => {
      fireEvent.change(inputNewPassword, {
        target: { value: '9Ij!Z-Tb)nft73OpLpw£71' },
      });
      fireEvent.change(inputVerifyPassword, {
        target: { value: '9Ij!Z-Tb)nft73OpLpw£71' },
      });

      await act(() => {
        fireEvent.submit(btnSubmit);
      });

      expect(
        await screen.findByText(
          'An error occured while resetting your password',
        ),
      ).toBeInTheDocument();
    });
  });
});

// An error has occurred during your request
