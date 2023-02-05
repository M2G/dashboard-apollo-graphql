/*eslint-disable*/
import { useMemo, useState, useCallback, useEffect } from 'react';
import type { SetStateAction } from 'react';
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
  useGetUserListLazyQuery
} from 'modules/graphql/generated';
import UserFilters from 'containers/UserFilters';
import List from 'containers/UserList/List';
import AddUser from './Action/AddUser';
import './index.scss';
import type { DatasetInjector } from 'components/Core/Pagination/Pagination';

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
  const [editingUser, setEditingUser] = useState(false);
  const [newUser, setNewUser] = useState(false);
  const [deletingUser, setDeletingUser] = useState(false);

  const [userFilter, { loading, error, data, refetch, fetchMore }] = useGetUserListLazyQuery();

  console.log('useGetUserListLazyQuery', { loading, error, data });

  useEffect(() => {
    userFilter({
      variables: {
        afterCursor: null,
        first: 2,
        filters: ''
      }
    });
  }, []);

  const [createUser] = useCreateUserMutation({
    onCompleted: refetch as any
  });

  const [updateUser] = useUpdateUserMutation({
    onCompleted: refetch
  } as any);

  const [deleteUser] = useDeleteUserMutation({
    onCompleted: refetch
  } as any);

  const onDelete = useCallback((user: User): void => {
    setNewUser(false);
    setEditingUser(false);
    setDeletingUser(user as unknown as SetStateAction<boolean>);
  }, []);

  const onClose = useCallback(() => {
    setDeletingUser(false);
    setEditingUser(false);
    setNewUser(false);
  }, []);

  const onAdd = useCallback((): void => {
    setNewUser(true);
    setEditingUser(false);
    setDeletingUser(false);
  }, []);

  const onEdit = useCallback((user: User): void => {
    setEditingUser(user as unknown as SetStateAction<boolean>);
    setNewUser(false);
    setDeletingUser(false);
  }, []);

  const onEditUser = useCallback(
    async (user: User): Promise<void> => {
      await updateUser({
        variables: {
          ...user,
          id: user?._id ?? ''
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
          email: user?.email ?? '',
          password: user?.password ?? '',
          first_name: user?.first_name ?? '',
          last_name: user?.last_name ?? '',
          username: user?.username ?? ''
        }
      });
      setNewUser(user as unknown as SetStateAction<boolean>);
      onClose();
    },
    [createUser, onClose]
  );

  const onDeleteUser = useCallback(
    async (user: User): Promise<void> => {
      await deleteUser({
        variables: {
          id: user?._id || ''
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

  console.log('users users users users', users);

  const pageInfo = data?.users?.pageInfo || {};

  console.log('pageInfo pageInfo pageInfo', pageInfo);

  const rows = useMemo(
    () =>
      users?.map((user: any) =>
        userListItem({
          canDelete,
          canEdit,
          id,
          onDelete,
          onEdit,
          user: user.node
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

          <SidebarWrapper isOpened={editingUser} setIsOpened={onClose}>
            <UserEdit data={editingUser} onSubmit={onEditUser} />
          </SidebarWrapper>

          <SidebarWrapper isOpened={newUser} setIsOpened={onClose}>
            <UserNew onSubmit={onNewUser} />
          </SidebarWrapper>

          <ModalWrapper
            title="Delete"
            hide={onClose}
            isShowing={deletingUser}
            onConfirm={async () => onDeleteUser(deletingUser as unknown as User)}
          >
            <p>Warning, you are about to perform an irreversible action</p>
          </ModalWrapper>
        </>
      )}
    </div>
  );
}

export default UserList;
