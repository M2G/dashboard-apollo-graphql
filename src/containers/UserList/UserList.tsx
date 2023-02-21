/*eslint-disable*/
import { useMemo, useCallback, useEffect, useReducer } from 'react';
import type { IUserListItem } from 'containers/UserList/UserListItem';
import userListItem from 'containers/UserList/UserListItem';
import UserEdit from 'containers/Users/UserEdit';
import UserNew from 'containers/Users/UserNew';
import SidebarWrapper from 'components/Core/Sidebar/SidebarWrapper';
import ModalWrapper from 'components/Core/Modal/ModalWrapper';
import TopLineLoading from 'components/Loading/TopLineLoading';
import NoData from 'components/NoData';
import type { User } from 'modules/graphql/generated';
import {
  useUpdateUserMutation,
  useCreateUserMutation,
  useDeleteUserMutation,
  useGetUserListLazyQuery,
  GetUserListDocument,
  GetUserListQuery
} from 'modules/graphql/generated';
import UserFilters from 'containers/UserFilters';
import List from 'containers/UserList/List';
import AddUser from './Action/AddUser';
import type { DatasetInjector } from 'components/Core/Pagination/Pagination';
import { convertNodeToCursor, objectId } from './helpers';
import './index.scss';

interface IUserList {
  id: string;
  canEdit?: boolean;
  canDelete?: boolean;
  canAdd?: boolean;
}

function UserList({
  id,
  canEdit = false,
  canDelete = false,
  canAdd = false
}: IUserList): JSX.Element {
  const [state, setState] = useReducer(
    (
      state: {
        editingUser?: boolean | User;
        newUser?: boolean | User;
        deletingUser?: boolean | User;
      },
      newState: {
        editingUser?: boolean | User;
        newUser?: boolean | User;
        deletingUser?: boolean | User;
      }
    ) => ({ ...state, ...newState }),
    {
      editingUser: false,
      newUser: false,
      deletingUser: false
    }
  );

  const [userFilter, { loading, error, data, fetchMore }] = useGetUserListLazyQuery({
    fetchPolicy: 'cache-and-network',
    nextFetchPolicy: 'cache-first'
  });

  console.log('useGetUserListLazyQuery', { loading, error, data });

  useEffect(() => {
    userFilter({
      variables: {
        afterCursor: null,
        first: 14,
        filters: ''
      }
    });
  }, [userFilter]);

  const [createUser] = useCreateUserMutation();
  const [updateUser] = useUpdateUserMutation();
  const [deleteUser] = useDeleteUserMutation();

  const onDelete = useCallback((user: User): void => {
    setState({ editingUser: false, newUser: false, deletingUser: user });
  }, []);

  const onClose = useCallback(() => {
    setState({ editingUser: false, newUser: false, deletingUser: false });
  }, []);

  const onAdd = useCallback((): void => {
    setState({ editingUser: false, newUser: true, deletingUser: false });
  }, []);

  const onEdit = useCallback((user: User): void => {
    setState({ editingUser: user, newUser: false, deletingUser: false });
  }, []);

  const onEditUser = useCallback(
    async (user: User): Promise<void> => {
      await updateUser({
        variables: {
          ...user,
          id: user?._id || ''
        },
        optimisticResponse: {
          __typename: 'Mutation',
          updateUser: {
            email: user?.email,
            first_name: user?.first_name || '',
            last_name: user?.last_name || '',
            created_at: Math.floor(Date.now() / 1000),
            modified_at: Math.floor(Date.now() / 1000),
            __typename: 'User'
          }
        },
        update(cache, mutationResult: any) {
          const updateUser = mutationResult?.data?.updateUser;
          const cachedUserList = cache.readQuery<GetUserListQuery>({
            query: GetUserListDocument,
            variables: {
              afterCursor: null,
              first: 14,
              filters: ''
            }
          });

          console.log('------------', {
            updateUser,
            cachedUserList,
            id: user?._id
          });

          const userList = cachedUserList?.users?.edges || [];

          const find = userList.find((d) => d?.node?._id === user?._id);

          console.log('find find find', find);
        }
      });
      onClose();
    },
    [onClose, updateUser]
  );

  const onNewUser = useCallback(
    async (user: User): Promise<void> => {
      await createUser({
        variables: {
          email: user?.email || '',
          password: user?.password || ''
        },
        optimisticResponse: {
          __typename: 'Mutation',
          createUser: {
            email: user?.email,
            first_name: user?.first_name || '',
            last_name: user?.last_name || '',
            created_at: Math.floor(Date.now() / 1000),
            modified_at: Math.floor(Date.now() / 1000),
            __typename: 'User'
          }
        },
        update(cache, mutationResult: any) {
          const resultMessage = mutationResult?.data?.createUser;
          const cachedUserList = cache.readQuery<GetUserListQuery>({
            query: GetUserListDocument,
            variables: {
              afterCursor: null,
              first: 14,
              filters: ''
            }
          });

          const userList = cachedUserList?.users?.edges || [];

          const _id = objectId();

          const newUser = [
            ...userList,
            ...[
              {
                __typename: 'Edge',
                node: {
                  ...user,
                  _id,
                  first_name: resultMessage?.first_name || '',
                  last_name: resultMessage?.last_name || '',
                  created_at: Math.floor(Date.now() / 1000),
                  modified_at: Math.floor(Date.now() / 1000),
                  __typename: 'User'
                },
                cursor: convertNodeToCursor({ _id })
              }
            ]
          ];

          const newData: any = {
            users: {
              edges: newUser,
              pageInfo: cachedUserList?.users?.pageInfo,
              totalCount: cachedUserList?.users?.totalCount
                ? cachedUserList.users.totalCount + 1
                : 0,
              __typename: 'Users'
            }
          };

          cache.writeQuery<GetUserListQuery>({
            query: GetUserListDocument,
            variables: {
              afterCursor: null,
              first: 14,
              filters: ''
            },
            data: {
              __typename: 'Query',
              ...newData
            }
          });
        }
      });
      setState({ newUser: user });
      onClose();
    },
    [createUser, onClose]
  );

  const onDeleteUser = useCallback(
    async (user: User): Promise<void> => {
      await deleteUser({
        variables: {
          id: user?._id || ''
        },
        optimisticResponse: {
          __typename: 'Mutation',
          deleteUser: {
            __typename: 'User',
            _id: user?._id
          }
        },
        update(cache, mutationResult: any) {
          const { _id } = mutationResult?.data?.deleteUser;
          const cachedUserList = cache.readQuery({
            query: GetUserListDocument,
            variables: {
              afterCursor: null,
              first: 14,
              filters: ''
            }
          });

          const existingTodos: any = Object.assign({}, cachedUserList);

          const filtered = existingTodos?.users?.edges?.filter(
            (edge: { node: { _id: any } }) => edge?.node?._id !== _id
          );

          const newUser = [...filtered];

          const newData = {
            users: {
              edges: newUser,
              pageInfo: existingTodos.users.pageInfo,
              totalCount: existingTodos.users.totalCount + 1,
              __typename: 'Users'
            }
          };

          cache.writeQuery({
            query: GetUserListDocument,
            variables: {
              afterCursor: null,
              first: 14,
              filters: ''
            },
            data: {
              ...newData
            }
          });
        }
      });
      onClose();
    },
    [deleteUser, onClose]
  );

  const searchTerms = useCallback(
    async (params: any): Promise<void> => {
      await userFilter({
        variables: {
          filters: params?.search || '',
          page: undefined,
          pageSize: undefined
        } as any
      });
    },
    [userFilter]
  );

  const updateQuery = (previousResult: { users: any }, { fetchMoreResult }: any) => {
    return fetchMoreResult.users.edges.length ? fetchMoreResult : previousResult;
  };

  const onChangePage = useCallback(
    async (dataset: DatasetInjector<any, any>) => {
      if (dataset.next) {
        console.log('setPage', dataset);
        return fetchMore({
          updateQuery,
          variables: {
            first: 2,
            afterCursor: data?.users?.pageInfo?.endCursor || null
          }
        });
      }

      fetchMore({
        updateQuery,
        variables: {
          first: 2,
          afterCursor: data?.users?.pageInfo?.startCursor || null
        }
      });
    },
    [data, fetchMore, userFilter]
  );

  const users = data?.users?.edges || [];
  const pageInfo = data?.users?.pageInfo || {};

  const rows = useMemo(
    () =>
      users?.map(({ node }: any) =>
        userListItem({
          canDelete,
          canEdit,
          id,
          onDelete,
          onEdit,
          user: node
        } as IUserListItem)
      ),
    [users, canDelete, canEdit, id, onDelete, onEdit]
  );

  const header = useMemo(
    () => [
      { label: '', sortable: false },
      { label: 'First name', sortable: false },
      { label: 'Last name', sortable: false },
      { label: 'Email', sortable: false },
      { label: 'Created at', sortable: true, type: 'date' },
      { label: 'Modified at', sortable: true, type: 'date' }
    ],
    []
  );

  if (loading) return <TopLineLoading />;

  return (
    <div className="c-userlist">
      <AddUser canAdd={canAdd} onAdd={onAdd} />

      {!users.length && <NoData />}
      {users?.length && (
        <>
          <UserFilters onSubmit={searchTerms} />
          <List
            id={id}
            header={header}
            rows={rows}
            hasNextPage={data?.users?.pageInfo?.hasNextPage}
            hasPrevPage={data?.users?.pageInfo?.hasPrevPage}
            setCurrentPage={onChangePage}
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
