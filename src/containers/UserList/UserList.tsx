/*eslint-disable*/
import { useMemo, useCallback, useEffect, useState } from 'react';
import type { IUserListItem } from 'containers/UserList/UserListItem';
import userListItem from 'containers/UserList/UserListItem';
import UserEdit from 'containers/Users/UserEdit';
import UserNew from 'containers/Users/UserNew';
import SidebarWrapper from 'components/Core/Sidebar/SidebarWrapper';
import ModalWrapper from 'components/Core/Modal/ModalWrapper';
import TopLineLoading from 'components/Loading/TopLineLoading';
import NoData from 'components/NoData';
import type { User, Users } from 'modules/graphql/generated';
import {
  useUpdateUserMutation,
  useCreateUserMutation,
  useDeleteUserMutation,
  useGetUsersLazyQuery,
  GetUsersDocument,
  GetUsersQuery,
  GetUserDocument,
} from 'modules/graphql/generated';
import UserFilters from 'containers/UserFilters';
import List from 'containers/UserList/ListLegacy';
import AddUser from './Action/AddUser';
import { objectId } from './helpers';
import type { UserList } from './types';
import './index.scss';

function UserList({
  id,
  canEdit = false,
  canDelete = false,
  canAdd = false,
}: UserList): JSX.Element {
  const [state, setUser] = useState<{
    editingUser?: boolean | User;
    newUser?: boolean | User;
    deletingUser?: boolean | User;
  }>({
    editingUser: false,
    newUser: false,
    deletingUser: false,
  });
  const [page, setPage] = useState<{
    page: number;
    pageSize: number;
  }>({
    page: 1,
    pageSize: 5,
  });

  const [userFilter, { loading, error, data }] = useGetUsersLazyQuery({
    fetchPolicy: 'cache-and-network',
  });

  console.log('useGetUserListLazyQuery', { loading, error, data });

  useEffect(() => {
    userFilter({
      variables: {
        page: page.page,
        pageSize: page.pageSize,
        filters: '',
      },
    });
  }, [userFilter]);

  const [createUser] = useCreateUserMutation();
  const [updateUser] = useUpdateUserMutation();
  const [deleteUser] = useDeleteUserMutation();

  const onDelete = useCallback((user: User): void => {
    setUser({ editingUser: false, newUser: false, deletingUser: user });
  }, []);

  const onClose = useCallback(() => {
    setUser({ editingUser: false, newUser: false, deletingUser: false });
  }, []);

  const onAdd = useCallback((): void => {
    setUser({ editingUser: false, newUser: true, deletingUser: false });
  }, []);

  const onEdit = useCallback((user: User): void => {
    setUser({ editingUser: user, newUser: false, deletingUser: false });
  }, []);

  const onEditUser = useCallback(
    async (user: User): Promise<void> => {
      await updateUser({
        variables: {
          input: { ...user },
          id: user._id || '',
        },
        optimisticResponse: {
          __typename: 'Mutation',
          updateUser: {
            email: user?.email,
            first_name: user?.first_name || '',
            last_name: user?.last_name || '',
            created_at: Math.floor(Date.now() / 1000),
            modified_at: Math.floor(Date.now() / 1000),
            __typename: 'User',
          },
        },
        update(cache, mutationResult: any) {
          const updateUser = mutationResult?.data?.updateUser;
          const cachedUserList = cache.readQuery<GetUsersQuery>({
            query: GetUsersDocument,
            variables: {
              page: 1,
              pageSize: 5,
              filters: '',
            },
          });

          const userList = cachedUserList?.users?.results || [];

          const users = userList.map((d) => {
            if (d?._id !== user?._id) return d;
            return {
              node: {
                ...updateUser,
              },
            };
          });

          const newData: any = {
            users: {
              results: users,
              pageInfo: cachedUserList?.users?.pageInfo,
              __typename: 'Users',
            },
          };

          cache.writeQuery<GetUsersQuery>({
            query: GetUsersDocument,
            variables: {
              page: 1,
              pageSize: 5,
              filters: '',
            },
            data: {
              __typename: 'Query',
              ...newData,
            },
          });
        },
      });
      onClose();
    },
    [onClose, updateUser],
  );

  const onNewUser = useCallback(
    async (user): Promise<void> => {
      await createUser({
        variables: {
          email: user.email,
          password: user.password,
        },
        optimisticResponse: {
          __typename: 'Mutation',
          createUser: {
            email: user?.email,
            first_name: user?.first_name || '',
            last_name: user?.last_name || '',
            created_at: Math.floor(Date.now() / 1000),
            modified_at: Math.floor(Date.now() / 1000),
            __typename: 'User',
          },
        },
        update(cache, mutationResult: any) {
          const resultMessage = mutationResult?.data?.createUser;
          const cachedUserList = cache.readQuery<GetUsersQuery>({
            query: GetUsersDocument,
            variables: {
              page: 1,
              pageSize: 5,
              filters: '',
            },
          });

          const userList = cachedUserList?.users?.results || [];

          const _id = objectId();

          const newUser = [
            ...userList,
            ...[
              {
                ...user,
                _id,
                first_name: resultMessage?.first_name || '',
                last_name: resultMessage?.last_name || '',
                created_at: Math.floor(Date.now() / 1000),
                modified_at: Math.floor(Date.now() / 1000),
                __typename: 'User',
              },
            ],
          ];

          const newData = {
            users: {
              results: newUser,
              pageInfo: cachedUserList?.users?.pageInfo,
              __typename: 'Users',
            },
          };

          console.log('newData newData newData newData', newData);

          cache.writeQuery<GetUsersQuery, any>({
            query: GetUsersDocument,
            variables: {
              page: 1,
              pageSize: 5,
              filters: '',
            },
            data: {
              __typename: 'Query',
              ...newData,
            },
          });
        },
      });
      setUser({ newUser: user });
      onClose();
    },
    [createUser, onClose],
  );

  const onDeleteUser = useCallback(
    async (user: User): Promise<void> => {
      await deleteUser({
        variables: {
          id: user?._id || '',
        },
        optimisticResponse: {
          __typename: 'Mutation',
          deleteUser: {
            __typename: 'User',
            _id: user?._id,
          },
        },
        update(cache, mutationResult: any) {
          const { _id } = mutationResult?.data?.deleteUser;
          const cachedUserList = cache.readQuery({
            query: GetUsersDocument,
            variables: {
              afterCursor: null,
              first: 14,
              filters: '',
            },
          });

          const existingTodos: any = Object.assign({}, cachedUserList);

          const filtered = existingTodos?.users?.edges?.filter(
            (edge: { node: { _id: any } }) => edge?.node?._id !== _id,
          );

          const newUser = [...filtered];

          const newData = {
            users: {
              edges: newUser,
              pageInfo: existingTodos.users.pageInfo,
              totalCount: existingTodos.users.totalCount + 1,
              __typename: 'Users',
            },
          };

          cache.writeQuery({
            query: GetUsersDocument,
            variables: {
              afterCursor: null,
              first: 14,
              filters: '',
            },
            data: {
              ...newData,
            },
          });
        },
      });
      onClose();
    },
    [deleteUser, onClose],
  );

  const searchTerms = useCallback(
    async (params: any): Promise<void> => {
      console.log('params params', params);
      await userFilter({
        variables: {
          filters: params?.search || '',
          page: undefined,
          pageSize: undefined,
        } as any,
      });
    },
    [userFilter],
  );

  const onChangePage = useCallback(
    async (currentPage: number) => {
      console.log('setPage', page);
      setPage(({ pageSize }) => {
        {
          page: currentPage, pageSize;
        }
      });
      await userFilter({
        variables: {
          filters: '',
          page: currentPage || page.page,
          pageSize: page.pageSize,
        },
      });
    },
    [page, userFilter],
  );

  const onChangePageSize = useCallback(
    async (pageSize: number) => {
      console.log('setPageSize', pageSize);
      setPage({ pageSize });
      await userFilter({
        variables: {
          filters: '',
          page: page.page,
          pageSize: pageSize || page.pageSize,
        },
      });
    },
    [page, userFilter],
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
    [users, canDelete, canEdit, id, onDelete, onEdit],
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

  console.log('page page page page page page ', page)

  return (
    <div className="c-user-list">
      <AddUser canAdd={canAdd} onAdd={onAdd} />

      {!results.length && <NoData />}
      {results.length && (
        <>
          <UserFilters onSearchTerm={searchTerms} />
          <List
            id={id}
            header={header}
            rows={rows}
            data={results}
            count={pageInfo?.count}
            currentPage={page.page}
            setCurrentPage={onChangePage}
            currentPageSize={page.pageSize}
            setCurrentPageSize={onChangePageSize}
          />

          <SidebarWrapper isOpened={!!state.editingUser} setIsOpened={onClose}>
            <UserEdit data={state.editingUser} onSubmit={onEditUser} />
          </SidebarWrapper>

          <SidebarWrapper isOpened={!!state.newUser} setIsOpened={onClose}>
            <UserNew onSubmit={onNewUser} />
          </SidebarWrapper>

          <ModalWrapper
            title="Delete"
            hide={onClose}
            isShowing={state.deletingUser}
            onConfirm={async () => onDeleteUser(state.deletingUser as unknown as User)}
          >
            <p>Warning, you are about to perform an irreversible action</p>
          </ModalWrapper>
        </>
      )}
    </div>
  );
}

export default UserList;
