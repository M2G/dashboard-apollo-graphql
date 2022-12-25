/*eslint-disable*/
import { render, screen } from '@testing-library/react';
import { GetUserListDocument } from 'modules/graphql/generated';
import MyMockedProvider from 'apollo/MockProvider';
import UserList from './UserList';

const data = {
  users: {
    __typename: 'Users',
    results: [
      {
        __typename: 'User',
        _id: '632fc3747943271e582ff7c7',
        first_name: 'Smith',
        last_name: 'Jackson',
        email: 'smith.jackson@university.com',
        password: '$2a$10$zZwZ9FuuHQxjWQAQQFc6cOUj59UfUMZLp7/.pGQiyS3aBsYlKgXBe',
        created_at: 1658098622,
        modified_at: 1671941336,
        last_connected_at: 1671941336,
        deleted_at: 0
      },
      {
        __typename: 'User',
        _id: '6325166e24edff96de6bf90c',
        first_name: 'Oliver',
        last_name: 'Garcia',
        email: 'oliver.garcia@university.com',
        password: '$2a$10$zZwZ9FuuHQxjWQAQQFc6cOUj59UfUMZLp7/.pGQiyS3aBsYlKgXBe',
        created_at: 1658098356,
        modified_at: 1663988936,
        last_connected_at: 1663988936,
        deleted_at: 0
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
  test('should render without error', () => {
    render(
      <MyMockedProvider mocks={[]}>
        <UserList id="test" canEdit canDelete canAdd />
      </MyMockedProvider>
    );
  });

  test('should render', async () => {
    const usersMock = {
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
      <MyMockedProvider mocks={[usersMock]} addTypename={false}>
        <UserList id="test" canEdit canDelete canAdd />
      </MyMockedProvider>
    );

    await new Promise((resolve) => setTimeout(resolve, 2000));

    console.log('consoleLogSpy.mock.calls ', consoleLogSpy.mock.calls);

    expect(screen.getByText(data.users.results[0].first_name)).toBeInTheDocument();
    expect(screen.getByText(data.users.results[0].last_name)).toBeInTheDocument();
    expect(screen.getByText(data.users.results[0].email)).toBeInTheDocument();
    expect(
      screen.getAllByText(new Date(data.users.results[0].created_at * 1000).toLocaleDateString())[0]
    ).toBeInTheDocument();
    expect(
      screen.getAllByText(
        new Date(data.users.results[0].modified_at * 1000).toLocaleDateString()
      )[0]
    ).toBeInTheDocument();

    expect(screen.getByText(data.users.results[1].first_name)).toBeInTheDocument();
    expect(screen.getByText(data.users.results[1].last_name)).toBeInTheDocument();
    expect(screen.getByText(data.users.results[1].email)).toBeInTheDocument();
    expect(
      screen.getAllByText(new Date(data.users.results[1].created_at * 1000).toLocaleDateString())[0]
    ).toBeInTheDocument();
    expect(
      screen.getAllByText(
        new Date(data.users.results[1].modified_at * 1000).toLocaleDateString()
      )[0]
    ).toBeInTheDocument();
  });

  test('renders without error', async () => {
    const usersMock = {
      request: {
        query: GetUserListDocument,
        variables: {
          filters: '',
          pageSize: 5,
          page: 1
        }
      },
      error: new Error('An error occurred')
    };

    render(
      <MyMockedProvider mocks={[usersMock]} addTypename={false}>
        <UserList id="test" canEdit canDelete canAdd />
      </MyMockedProvider>
    );


    console.log("'ddddddddd", screen.debug())

    // expect(await screen.findByText("Loading...")).toBeInTheDocument();
  });
});
