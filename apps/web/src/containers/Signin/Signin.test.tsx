import { render, screen } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import { SigninDocument } from 'modules/graphql/generated';
import Signin from './Signin';
import { InMemoryCache } from '@apollo/client';

describe('test Signin', () => {
  test('should render', () => {
    const mocks = [
      {
        request: {
          query: SigninDocument,
          variables: {
            name: "Buck"
          }
        },
        result: {
          data: {
            dog: { id: "1", name: "Buck", breed: "bulldog" }
          }
        }
      }
    ];
    render(
      <MockedProvider
        mocks={mocks}
        addTypename={false}
        defaultOptions={{
          watchQuery: { fetchPolicy: 'no-cache' },
          query: { fetchPolicy: 'no-cache' },
        }}
        cache={
          new InMemoryCache()
        }
      >
        <Signin />
      </MockedProvider>,
    );

    screen.debug();
  });
});
