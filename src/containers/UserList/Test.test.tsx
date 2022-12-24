/*eslint-disable*/
import { render, screen } from '@testing-library/react';
import { MockedProvider, MockLink } from '@apollo/client/testing';
import { ApolloLink } from '@apollo/client';
import { onError } from '@apollo/client/link/error';
import { GetUserListDocument } from 'modules/graphql/generated';
import Test from './Test';

export function MyMockedProvider(props: { [x: string]: any; mocks: any }) {
  let { mocks, ...otherProps } = props;

  let mockLink = new MockLink(mocks);
  let errorLoggingLink = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors)
      graphQLErrors.map(({ message, locations, path }) =>
        console.log(
          `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
        )
      );

    if (networkError) console.log(`[Network error]: ${networkError}`);
  });
  let link = ApolloLink.from([errorLoggingLink, mockLink]);

  return <MockedProvider {...otherProps} link={link} />;
}

const data = {
  users: {
    __typename: 'Users',
    results: [
      {
        __typename: 'User',
        _id: '632fc3747943271e582ff7c7',
        first_name: 'Federic',
        last_name: 'Delavier',
        email: 'federic.delavier@university.com',
        created_at: 1664074612,
        modified_at: 1667014561,
        password: '$2b$10$hQoG8E..vnfh0gZeDgt/b.1nfMwRB4UtfCBjAmmaLxkaxabkjxAqq'
      },
      {
        __typename: 'User',
        _id: '632fc3747943271e582ff7c7',
        first_name: 'Federic',
        last_name: 'Delavier',
        email: 'federic.delavier@university.com',
        created_at: 1664074612,
        modified_at: 1667014561,
        password: '$2b$10$hQoG8E..vnfh0gZeDgt/b.1nfMwRB4UtfCBjAmmaLxkaxabkjxAqq'
      }
    ],
    pageInfo: {
      __typename: 'PageInfo',
      count: 7,
      pages: 4,
      next: 2,
      prev: null
    }
  }
};

describe('test UserList', () => {
  test('should render', async () => {
    const dogMock = {
      request: {
        query: GetUserListDocument,
        variables: {
          filters: '',
          pageSize: 5,
          page: 1
        }
      },
      result: {
        loading: false,
        data: data
      }
    };

    let consoleLogSpy = jest.spyOn(console, 'log');

    render(
      <MyMockedProvider mocks={[dogMock]} addTypename={false}>
        <Test />
      </MyMockedProvider>
    );

    await new Promise((resolve) => setTimeout(resolve, 2000));

    console.log('consoleLogSpy.mock.calls ', consoleLogSpy.mock.calls);

    screen.debug();
  });
});
