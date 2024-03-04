/* eslint-disable */
import {
  fireEvent,
  render,
  cleanup,
  screen,
  act,
} from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import ResetPassword from './ResetPassword';
import { MockedProvider } from '@apollo/client/testing';
import { ResetPasswordDocument } from '@/modules/graphql/generated';
import { GraphQLError } from 'graphql';

beforeEach(() => {
  jest.clearAllMocks();
  jest
    .spyOn(URLSearchParams.prototype, 'get')
    .mockReturnValue('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9');
});

describe('Reset Password Container', () => {
  describe('Submitting form', () => {
    let inputNewPassword: HTMLInputElement;
    let inputVerifyPassword: HTMLInputElement;
    let btnSubmit: HTMLButtonElement;
    beforeEach(() => {
      const mocks = [
        {
          //delay: 30,
          request: {
            query: ResetPasswordDocument,
            variables: {
              input: {
                password: '9Ij!Z-Tb)nft73OpLpw£71',
                token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9',
              },
            },
          },
          result: {
            data: {
              resetPassword: {
                __typename: 'Status',
                success: true,
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

    it('should success reset password', async () => {
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
        await screen.findByText('Your password has been reset successfully'),
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
            query: ResetPasswordDocument,
            variables: {
              input: {
                password: '9Ij!Z-Tb)nft73OpLpw£71',
                token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9',
              },
            },
          },
          result: {
            errors: [
              new GraphQLError(
                'An error occured while resetting your password',
              ),
            ],
            data: {
              resetPassword: {
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
