/* eslint-disable */
import {
  fireEvent,
  render,
  cleanup,
  screen,
  act,
} from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { MockedProvider } from '@apollo/client/testing';
import ChangePassword from './ChangePassword';
import { ChangePasswordDocument } from '@/modules/graphql/generated';
import AuthContext from '@/AuthContext';
import { GraphQLError } from 'graphql';

beforeEach(() => {
  jest.clearAllMocks();
});

describe('Change password Container', () => {
  describe('Change password success', () => {
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
            query: ChangePasswordDocument,
            variables: {
              id: 1,
              input: {
                oldPassword: '9Ij!Z-Tb)nft73OpLpw£71----',
                password: '9Ij!Z-Tb)nft73OpLpw£71',
              },
            },
          },
          result: {
            data: {
              changePassword: {
                __typename: 'Status',
                success: true,
              },
            },
          },
        },
      ];

      render(
        <MockedProvider mocks={mocks} addTypename={false}>
          <AuthContext.Provider>
            <MemoryRouter initialEntries={['/change-password']}>
              <ChangePassword />
            </MemoryRouter>
          </AuthContext.Provider>
        </MockedProvider>,
      );

      inputOldPassword = screen.getByTestId('oldPassword');
      inputPassword = screen.getByTestId('password');
      inputConfirmPassword = screen.getByTestId('confirmPassword');
      btnSubmit = screen.getByTestId('submit');
    });

    it('should success change password', async () => {
      fireEvent.change(inputOldPassword, {
        target: { value: '9Ij!Z-Tb)nft73OpLpw£71----' },
      });
      fireEvent.change(inputPassword, {
        target: { value: '9Ij!Z-Tb)nft73OpLpw£71' },
      });
      fireEvent.change(inputConfirmPassword, {
        target: { value: '9Ij!Z-Tb)nft73OpLpw£71' },
      });

      await act(() => {
        fireEvent.submit(btnSubmit);
      });

      screen.debug();

      expect(
        await screen.findByText('Your password has been changed successfully'),
      ).toBeInTheDocument();
    });
  });
  describe('Change password fail', () => {
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
            query: ChangePasswordDocument,
            variables: {
              id: 1,
              input: {
                oldPassword: '9Ij!Z-Tb)nft73OpLpw£71----',
                password: '9Ij!Z-Tb)nft73OpLpw£71',
              },
            },
          },
          result: {
            errors: [new GraphQLError('Passwords does not match')],
            data: {
              changePassword: {
                __typename: 'Status',
                success: false,
              },
            },
          },
        },
      ];

      render(
        <MockedProvider mocks={mocks} addTypename={false}>
          <AuthContext.Provider>
            <MemoryRouter initialEntries={['/change-password']}>
              <ChangePassword />
            </MemoryRouter>
          </AuthContext.Provider>
        </MockedProvider>,
      );

      inputOldPassword = screen.getByTestId('oldPassword');
      inputPassword = screen.getByTestId('password');
      inputConfirmPassword = screen.getByTestId('confirmPassword');
      btnSubmit = screen.getByTestId('submit');
    });

    it('should success change password£ password', async () => {
      fireEvent.change(inputOldPassword, {
        target: { value: '9Ij!Z-Tb)nft73OpLpw£71----' },
      });
      fireEvent.change(inputPassword, {
        target: { value: '9Ij!Z-Tb)nft73OpLpw£71' },
      });
      fireEvent.change(inputConfirmPassword, {
        target: { value: '9Ij!Z-Tb)nft73OpLpw£71' },
      });

      await act(() => {
        fireEvent.submit(btnSubmit);
      });

      expect(
        await screen.findByText('Passwords does not match'),
      ).toBeInTheDocument();
    });
  });
});

// An error has occurred during your request
