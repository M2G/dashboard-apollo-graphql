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
import Signin from './Signin';
import { SigninDocument } from '@/modules/graphql/generated';
import AuthContext from '@/AuthContext';
import { GraphQLError } from 'graphql';

beforeEach(() => {
  jest.clearAllMocks();
});

describe('CSignin Container', () => {
  describe('Signin success', () => {
    let inputEmail: HTMLInputElement;
    let inputPassword: HTMLInputElement;
    let btnSubmit: HTMLButtonElement;

    afterEach(cleanup);
    beforeEach(() => {
      const mocks = [
        {
          //delay: 30,
          request: {
            query: SigninDocument,
            variables: {
              email: 'oliver.garcia@university.com',
              password: 'JxSu+8RY2K]25<H|j/g',
            },
          },
          result: {
            data: {
              signin:
                'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im9saXZlci5nYXJjaWFAdW5pdmVyc2l0eS5jb20iLCJpZCI6MzUsInBhc3N3b3JkIjoiJDJiJDEwJHFDLlZNdHF3bWNkQWlYV3ZjVGMzak9vTk95NGVjbUtBcUVWQTAvdndOenJmVE10LlZMZjBLIiwiaWF0IjoxNzExMTY2MzE0LCJleHAiOjE3MTExNjY2MTQsImF1ZCI6W10sInN1YiI6Im9saXZlci5nYXJjaWFAdW5pdmVyc2l0eS5jb20ifQ.sGNR_0MXpBmMeQRRtgV1sKJBZbb2ZmGVhiBocgJE1lA',
            },
          },
        },
      ];

      render(
        <MockedProvider mocks={mocks} addTypename={false}>
          <AuthContext.Provider>
            <MemoryRouter initialEntries={['/signin']}>
              <Signin />
            </MemoryRouter>
          </AuthContext.Provider>
        </MockedProvider>,
      );

      inputEmail = screen.getByTestId('email');
      inputPassword = screen.getByTestId('password');
      btnSubmit = screen.getByTestId('submit');
    });

    it('should success signin', async () => {
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

  describe('Signin fail', () => {
    let inputEmail: HTMLInputElement;
    let inputPassword: HTMLInputElement;
    let btnSubmit: HTMLButtonElement;

    afterEach(cleanup);
    beforeEach(() => {
      const mocks = [
        {
          //delay: 30,
          request: {
            query: SigninDocument,
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
              signin:
                'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im9saXZlci5nYXJjaWFAdW5pdmVyc2l0eS5jb20iLCJpZCI6MzUsInBhc3N3b3JkIjoiJDJiJDEwJHFDLlZNdHF3bWNkQWlYV3ZjVGMzak9vTk95NGVjbUtBcUVWQTAvdndOenJmVE10LlZMZjBLIiwiaWF0IjoxNzExMTY2MzE0LCJleHAiOjE3MTExNjY2MTQsImF1ZCI6W10sInN1YiI6Im9saXZlci5nYXJjaWFAdW5pdmVyc2l0eS5jb20ifQ.sGNR_0MXpBmMeQRRtgV1sKJBZbb2ZmGVhiBocgJE1lA',
            },
          },
        },
      ];

      render(
        <MockedProvider mocks={mocks} addTypename={false}>
          <AuthContext.Provider>
            <MemoryRouter initialEntries={['/signin']}>
              <Signin />
            </MemoryRouter>
          </AuthContext.Provider>
        </MockedProvider>,
      );

      inputEmail = screen.getByTestId('email');
      inputPassword = screen.getByTestId('password');
      btnSubmit = screen.getByTestId('submit');
    });

    it('should fail signin', async () => {
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
