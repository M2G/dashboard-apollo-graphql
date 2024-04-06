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
import Signup from './Signup';
import { SignupDocument } from '@/modules/graphql/generated';
import AuthContext from '@/AuthContext';
import { GraphQLError } from 'graphql';

beforeEach(() => {
  jest.clearAllMocks();
});

describe('Signup Container', () => {
  describe('Signup success', () => {
    let inputEmail: HTMLInputElement;
    let inputPassword: HTMLInputElement;
    let btnSubmit: HTMLButtonElement;

    afterEach(cleanup);
    beforeEach(() => {
      const mocks = [
        {
          //delay: 30,
          request: {
            query: SignupDocument,
            variables: {
              email: 'oliver.garcia@university.com',
              password: 'JxSu+8RY2K]25<H|j/g',
            },
          },
          result: {
            data: {
              signup: {
                id: 36,
              },
            },
          },
        },
      ];

      render(
        <MockedProvider mocks={mocks} addTypename={false}>
          <AuthContext.Provider>
            <MemoryRouter initialEntries={['/signup']}>
              <Signup />
            </MemoryRouter>
          </AuthContext.Provider>
        </MockedProvider>,
      );

      inputEmail = screen.getByTestId('email');
      inputPassword = screen.getByTestId('password');
      btnSubmit = screen.getByTestId('submit');
    });

    it('should success signup', async () => {
      fireEvent.change(inputEmail, {
        target: { value: 'oliver.garcia@university.com' },
      });
      fireEvent.change(inputPassword, {
        target: { value: 'JxSu+8RY2K]25<H|j/g' },
      });

      await act(() => {
        fireEvent.submit(btnSubmit);
      });

      screen.debug();
    });
  });

  describe('Signup fail', () => {
    let inputEmail: HTMLInputElement;
    let inputPassword: HTMLInputElement;
    let btnSubmit: HTMLButtonElement;

    afterEach(cleanup);
    beforeEach(() => {
      const mocks = [
        {
          //delay: 30,
          request: {
            query: SignupDocument,
            variables: {
              email: 'oliver.garcia@university.com',
              password: 'JxSu+8RY2K]25<H|j/g',
            },
          },
          result: {
            errors: [
              new GraphQLError('An error has occurred during your request'),
            ],
            data: {
              signup: {
                id: 36,
              },
            },
          },
        },
      ];

      render(
        <MockedProvider mocks={mocks} addTypename={false}>
          <AuthContext.Provider>
            <MemoryRouter initialEntries={['/signin']}>
              <Signup />
            </MemoryRouter>
          </AuthContext.Provider>
        </MockedProvider>,
      );

      inputEmail = screen.getByTestId('email');
      inputPassword = screen.getByTestId('password');
      btnSubmit = screen.getByTestId('submit');
    });

    it('should success signup', async () => {
      fireEvent.change(inputEmail, {
        target: { value: 'oliver.garcia@university.com' },
      });
      fireEvent.change(inputPassword, {
        target: { value: 'JxSu+8RY2K]25<H|j/g' },
      });

      await act(() => {
        fireEvent.submit(btnSubmit);
      });

      screen.debug();

      expect(
        await screen.findByText('An error has occurred during your request'),
      ).toBeInTheDocument();
    });
  });
});

// An error has occurred during your request
