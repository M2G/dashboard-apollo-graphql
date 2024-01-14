import type { JSX } from 'react';
import { useCallback, useEffect, useMemo, useState } from 'react';

import type { UserList } from './types';
import type { IUserListItem } from 'containers/UserList/UserListItem';
import type { GetUsersQuery, User, Users } from 'modules/graphql/generated';
import {
  GetUsersDocument,
  useCreateUserMutation,
  useDeleteUserMutation,
  useGetUsersLazyQuery,
  useUpdateUserMutation,
} from 'modules/graphql/generated';
import ModalWrapper from 'components/Core/Modal/ModalWrapper';
import SidebarWrapper from 'components/Core/Sidebar/SidebarWrapper';
import TopLineLoading from 'components/Loading/TopLineLoading';
import NoData from 'components/NoData';
import UserFilters from 'containers/UserFilters';
import List from 'containers/UserList/ListLegacy';
import userListItem from 'containers/UserList/UserListItem';
import UserEdit from 'containers/Users/UserEdit';
import UserNew from 'containers/Users/UserNew';

import AddUser from './Action/AddUser';
import './index.scss';

function UserList({
  canAdd = false,
  canDelete = false,
  canEdit = false,
  id,
}: UserList): JSX.Element {
  const [state, setUser] = useState<{
    deletingUser?: User | boolean;
    editingUser?: User | boolean;
    newUser?: User | boolean;
  }>({
    deletingUser: false,
    editingUser: false,
    newUser: false,
  });
  const [pagination, setPagination] = useState<{
    page: number;
    pageSize: number;
  }>({
    page: 1,
    pageSize: 5,
  });
  const [term, setTerm] = useState('');

  const [getUsers, { data, error, loading }] = useGetUsersLazyQuery({
    fetchPolicy: 'cache-and-network',
    nextFetchPolicy: 'cache-first',
  });

  console.log('useGetUserListLazyQuery', { data, error, loading });

  async function getData(): Promise<void> {
    await getUsers({
      variables: {
        filters: term,
        page: pagination.page,
        pageSize: pagination.pageSize,
      },
    });
  }

  useEffect((): void => {
    getData();
  }, [pagination, term]);

  const [createUser] = useCreateUserMutation();
  const [updateUser] = useUpdateUserMutation();
  const [deleteUser] = useDeleteUserMutation();

  const onDelete = useCallback((user: User): void => {
    setUser({ deletingUser: user, editingUser: false, newUser: false });
  }, []);

  const onClose = useCallback(() => {
    setUser({ deletingUser: false, editingUser: false, newUser: false });
  }, []);

  const onAdd = useCallback((): void => {
    setUser({ deletingUser: false, editingUser: false, newUser: true });
  }, []);

  const onEdit = useCallback((user: User): void => {
    setUser({ deletingUser: false, editingUser: user, newUser: false });
  }, []);

  const onEditUser = useCallback(
    async (user: User): Promise<void> => {
      await updateUser({
        optimisticResponse: {
          __typename: 'Mutation',
          updateUser: {
            __typename: 'Status',
            success: true,
          },
        },
        update(cache, _) {
          const cachedUserList = cache.readQuery<GetUsersQuery>({
            query: GetUsersDocument,
            variables: {
              filters: term,
              page: pagination.page,
              pageSize: pagination.pageSize,
            },
          });

          const userList = cachedUserList?.users?.results || [];

          const users = userList.map((d) => {
            if (d?.id !== user?.id) return d;
            return {
              ...user,
              __typename: 'User',
              created_at: Math.floor(Date.now() / 1000),
              id: user.id,
              modified_at: Math.floor(Date.now() / 1000),
              password: user.password,
            };
          });

          const newData = {
            users: {
              __typename: 'Users',
              pageInfo: cachedUserList?.users?.pageInfo,
              results: users,
            },
          };

          cache.writeQuery({
            data: {
              __typename: 'Query',
              ...newData,
            },
            query: GetUsersDocument,
            variables: {
              filters: term,
              page: pagination.page,
              pageSize: pagination.pageSize,
            },
          });
        },
        variables: {
          id: user.id!,
          input: {
            email: user?.email,
            first_name: user?.first_name,
            last_name: user?.last_name,
            username: user?.username,
          },
        },
      });
      onClose();
    },
    [pagination, onClose, updateUser],
  );

  const onNewUser = useCallback(
    async (user: User): Promise<void> => {
      await createUser({
        optimisticResponse: {
          __typename: 'Mutation',
          createUser: {
            __typename: 'User',
            created_at: Math.floor(Date.now() / 1000),
            email: user?.email,
            first_name: user?.first_name || '',
            last_name: user?.last_name || '',
            modified_at: Math.floor(Date.now() / 1000),
          },
        },
        update(cache, mutationResult) {
          const resultMessage = mutationResult?.data?.createUser;
          const cachedUserList = cache.readQuery<GetUsersQuery>({
            query: GetUsersDocument,
            variables: {
              filters: term,
              page: pagination.page,
              pageSize: pagination.pageSize,
            },
          });

          const userList = cachedUserList?.users?.results || [];

          const newUser = [
            ...userList,
            ...[
              {
                ...user,
                __typename: 'User',
                created_at: Math.floor(Date.now() / 1000),
                first_name: resultMessage?.first_name || '',
                id: Math.floor(Math.random() * 2),
                last_name: resultMessage?.last_name || '',
                modified_at: Math.floor(Date.now() / 1000),
              },
            ],
          ];

          const newData = {
            users: {
              __typename: 'Users',
              pageInfo: cachedUserList?.users?.pageInfo,
              results: newUser,
            },
          };

          cache.writeQuery({
            data: {
              __typename: 'Query',
              ...newData,
            },
            query: GetUsersDocument,
            variables: {
              filters: term,
              page: pagination.page,
              pageSize: pagination.pageSize,
            },
          });
        },
        variables: {
          email: user.email,
          password: user.password,
        },
      });
      onClose();
    },
    [createUser, onClose, pagination.page, pagination.pageSize, term],
  );

  const onDeleteUser = useCallback(
    async (user: User): Promise<void> => {
      await deleteUser({
        optimisticResponse: {
          __typename: 'Mutation',
          deleteUser: {
            __typename: 'Status',
            success: true,
          },
        },
        update(cache, _) {
          const cachedUserList: { users: Users } | null = cache.readQuery({
            query: GetUsersDocument,
            variables: {
              filters: term,
              page: pagination.page,
              pageSize: pagination.pageSize,
            },
          });

          const filtered: never[] =
            cachedUserList?.users?.results?.filter(
              (({ id: userId }: { id: number }) => userId !== user.id) as any,
            ) || [];

          const newUser = [...filtered];

          const newData = {
            users: {
              __typename: 'Users',
              pageInfo: cachedUserList?.users.pageInfo,
              results: newUser,
            },
          };

          cache.writeQuery({
            data: {
              __typename: 'Query',
              ...newData,
            },
            query: GetUsersDocument,
            variables: {
              filters: term,
              page: pagination.page,
              pageSize: pagination.pageSize,
            },
          });
        },
        variables: {
          id: user?.id!,
        },
      });
      onClose();
    },
    [deleteUser, onClose, pagination.page, pagination.pageSize, term],
  );

  const searchTerms = useCallback(
    async (term: string): Promise<void> => {
      setTerm(term);
      await getUsers({
        variables: {
          filters: term,
          page: pagination.page,
          pageSize: pagination.pageSize,
        },
      });
    },
    [getUsers, pagination.page, pagination.pageSize],
  );

  const onChangePage = useCallback(
    async (page: number): Promise<void> => {
      setPagination((prevState) => ({
        ...prevState,
        page,
      }));

      await getUsers({
        variables: {
          filters: term,
          page: page || pagination.page,
          pageSize: pagination.pageSize,
        },
      });
    },
    [getUsers, term, pagination.page, pagination.pageSize],
  );

  const onChangePageSize = useCallback(
    async (pageSize: number): Promise<void> => {
      setPagination((prevState) => ({
        ...prevState,
        pageSize,
      }));

      await getUsers({
        variables: {
          filters: term,
          page: pagination.page,
          pageSize: pageSize || pagination.pageSize,
        },
      });
    },
    [pagination, getUsers],
  );

  const users: any = data?.users || [];
  const results = users?.results || [];
  const pageInfo = users?.pageInfo || {};

  const rows = useMemo(
    () =>
      results?.map((user: any) =>
        userListItem({
          canDelete,
          canEdit,
          id,
          onDelete,
          onEdit,
          user,
        } as IUserListItem),
      ),
    [results, canDelete, canEdit, id, onDelete, onEdit],
  );

  const header = useMemo(
    () => [
      { label: '', sortable: false },
      { label: 'First name', sortable: false },
      { label: 'Last name', sortable: false },
      { label: 'Email', sortable: false },
      { label: 'Created at', sortable: true, type: 'date' },
      { label: 'Modified at', sortable: true, type: 'date' },
    ],
    [],
  );

  if (loading) return <TopLineLoading />;

  return (
    <div className="c-user-list">
      <AddUser canAdd={canAdd} onAdd={onAdd} />

      {!results.length && <NoData />}
      <UserFilters currentTerm={term} onSearchTerm={searchTerms} />
      <List
        count={pageInfo?.count}
        currentPage={pagination?.page}
        currentPageSize={pagination?.pageSize}
        data={results}
        header={header}
        id={id}
        rows={rows}
        setCurrentPage={onChangePage}
        setCurrentPageSize={onChangePageSize}
      />

      <SidebarWrapper isOpened={!!state.editingUser} setIsOpened={onClose}>
        <UserEdit data={state.editingUser} onSubmit={onEditUser} />
      </SidebarWrapper>

      <SidebarWrapper isOpened={!!state.newUser} setIsOpened={onClose}>
        <UserNew onSubmit={onNewUser} />
      </SidebarWrapper>

      <ModalWrapper
        onConfirm={async () =>
          onDeleteUser(state.deletingUser as unknown as User)
        }
        hide={onClose}
        isShowing={state.deletingUser}
        title="Delete"
      >
        <p>Warning, you are about to perform an irreversible action</p>
      </ModalWrapper>
    </div>
  );
}

export default UserList;
