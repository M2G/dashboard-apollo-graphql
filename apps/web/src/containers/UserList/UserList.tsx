import type { JSX } from 'react';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import type { IUserListItem } from '@/containers/UserList/UserListItem';
import type { GetUsersQuery, User, Users } from '@/modules/graphql/generated';

import TopLineLoading from '@/components/Loading/TopLineLoading';
import NoData from '@/components/NoData';
import UserFilters from '@/containers/UserFilters';
import List from '@/containers/UserList/ListLegacy';
import userListItem from '@/containers/UserList/UserListItem';
import UserEdit from '@/components/Users/UserEdit';
import UserNew from '@/components/Users/UserNew';
import {
  GetUsersDocument,
  useCreateUserMutation,
  useDeleteUserMutation,
  useGetUsersLazyQuery,
  useUpdateUserMutation,
} from '@/modules/graphql/generated';

import { Modal, Sidebar } from 'ui';

import AddUser from './Action/AddUser';
import type { UserList as UserListType } from './types';

// import './index.scss';

interface IUserList {
  deletingUser: User | boolean | null;
  editingUser: User | boolean | null;
  newUser: User | boolean | null;
}

function UserList({
  canAdd = false,
  canDelete = false,
  canEdit = false,
  id,
}: UserListType): JSX.Element {
  const { t } = useTranslation();
  const [state, setUser] = useState<IUserList>({
    deletingUser: null,
    editingUser: null,
    newUser: null,
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

  useEffect((): void => {
    getUsers({
      variables: {
        filters: term,
        page: pagination.page,
        pageSize: pagination.pageSize,
      },
    });
  }, [getUsers, pagination, term]);

  const [createUser] = useCreateUserMutation();
  const [updateUser] = useUpdateUserMutation();
  const [deleteUser] = useDeleteUserMutation();

  const handleAction = useCallback(
    ({
      deletingUser = null,
      editingUser = null,
      newUser = null,
    }: {
      deletingUser: boolean | null;
      editingUser: boolean | null;
      newUser: boolean | null;
    }): void => {
      setUser({
        deletingUser,
        editingUser,
        newUser,
      });
    },
    [],
  );

  function onClose(): void {
    handleAction({
      deletingUser: false,
      editingUser: false,
      newUser: false,
    });
  }

  const onEditUser = useCallback(
    (user: User): Promise<void> => {
      updateUser({
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
    [updateUser, onClose, term, pagination.page, pagination.pageSize],
  );

  const onNewUser = useCallback(
    (user: User): void => {
      createUser({
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
      handleAction({ deletingUser: false, editingUser: false, newUser: false });
    },
    [deleteUser, handleAction, pagination.page, pagination.pageSize, term],
  );

  const searchTerms = useCallback(
    async (term?: string): Promise<void> => {
      setTerm(term);
      getUsers({
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

      getUsers({
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
      getUsers({
        variables: {
          filters: term,
          page: pagination.page,
          pageSize: pageSize || pagination.pageSize,
        },
      });
    },
    [getUsers, term, pagination.page, pagination.pageSize],
  );

  const users = data?.users;
  const results = users?.results;
  const pageInfo = users?.pageInfo;

  const rows = useMemo(
    () =>
      results?.map((user) =>
        userListItem({
          canDelete,
          canEdit,
          id,
          onDelete: (d) =>
            handleAction({
              deletingUser: d,
              editingUser: false,
              newUser: false,
            }),
          onEdit: (d) =>
            handleAction({
              deletingUser: false,
              editingUser: d,
              newUser: false,
            }),
          user,
        } as IUserListItem),
      ),
    [results, canDelete, canEdit, id, handleAction],
  );

  const header = useMemo(
    () => [
      { label: '', sortable: false },
      { label: t('field.firstName'), sortable: false },
      { label: t('field.lastName'), sortable: false },
      { label: t('field.email'), sortable: false },
      { label: t('field.createdAt'), sortable: true, type: 'date' },
      { label: t('field.updateAt'), sortable: true, type: 'date' },
    ],
    [t],
  );

  // if (loading) return <TopLineLoading />;

  return (
    <div className="c-user-list">
      {canAdd && (
        <AddUser
          onAdd={() => {
            handleAction({
              deletingUser: false,
              editingUser: false,
              newUser: true,
            });
          }}
        />
      )}
      <UserFilters currentTerm={term} onSearchTerm={searchTerms} />
      {results?.length > 0 ? (
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
      ) : (
        <NoData />
      )}

      <Sidebar isOpened={!!state?.editingUser} setIsOpened={onClose}>
        {state?.editingUser && (
          <UserEdit initialValues={state.editingUser} onSubmit={onEditUser} />
        )}
      </Sidebar>

      <Sidebar isOpened={!!state?.newUser} setIsOpened={onClose}>
        {state?.newUser && <UserNew onSubmit={onNewUser} />}
      </Sidebar>

      <Modal
        hide={onClose}
        isShowing={state?.deletingUser}
        onConfirm={() => onDeleteUser(state?.deletingUser as unknown as User)}
        title="Delete">
        <p>Warning, you are about to perform an irreversible action</p>
      </Modal>
    </div>
  );
}

export default UserList;
