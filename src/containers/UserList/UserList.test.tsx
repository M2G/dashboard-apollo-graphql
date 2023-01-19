/*eslint-disable*/
import { render, screen, act } from '@testing-library/react';
import AutoMockProvider from 'apollo/AutoMockProvider';
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
  test('should render without error', async () => {
    await act(async () => render(
      <AutoMockProvider mockResolvers={{}}>
        <UserList id="test" canEdit canDelete canAdd />
      </AutoMockProvider>
    ));
  });

  test('should render', async () => {
    const resolver = {
      Users: () => data.users
    }

    await act(async () => render(
      <AutoMockProvider mockResolvers={resolver}>
        <UserList id="test" canEdit canDelete canAdd />
      </AutoMockProvider>
    ));

    await new Promise((resolve) => setTimeout(resolve, 2000));

    expect(await screen.findByText(data.users.results[0].first_name)).toBeInTheDocument();
    expect(await screen.findByText(data.users.results[0].last_name)).toBeInTheDocument();
    expect(await screen.findByText(data.users.results[0].email)).toBeInTheDocument();
    expect(await screen.findByText(data.users.results[0].first_name)).toBeInTheDocument();
    expect(await screen.findByText(data.users.results[0].last_name)).toBeInTheDocument();
    expect(await screen.findByText(data.users.results[0].email)).toBeInTheDocument();
    expect(
      await screen.findByText(new Date(data.users.results[0].created_at * 1000).toLocaleDateString())
    ).toBeInTheDocument();
    expect(
      await screen.findByText(
        new Date(data.users.results[0].modified_at * 1000).toLocaleDateString()
      )
    ).toBeInTheDocument();
  });

  test('renders without error', async () => {

    const resolver = {
      Users: () => {
        error: new Error('An error occurred')
      }
    }

    const { container } =  await act(async () => render(
      <AutoMockProvider mockResolvers={resolver}>
        <UserList id="test" canEdit canDelete canAdd />
      </AutoMockProvider>
    ));

    console.log('container', container)

    // expect(await container?.querySelector('.loader')).toBeInTheDocument();
  });
});
