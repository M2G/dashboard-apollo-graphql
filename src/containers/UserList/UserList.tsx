/*eslint-disable*/
import type { SetStateAction } from 'react';
import { useMemo, useState, useCallback, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import type { IUserListItem } from 'containers/UserList/UserListItem';
import userListItem from 'containers/UserList/UserListItem';
import UserEdit from 'containers/Users/UserEdit';
import UserNew from 'containers/Users/UserNew';
import SidebarWrapper from 'components/Core/Sidebar/SidebarWrapper';
import ModalWrapper from 'components/Core/Modal/ModalWrapper';
import TopLineLoading from 'components/Loading/TopLineLoading';
import type { Users, User } from 'modules/graphql/generated';
import {
  useUpdateUserMutation,
  useCreateUserMutation,
  useDeleteUserMutation,
  useGetUserListLazyQuery
} from 'modules/graphql/generated';
import UserFilters from 'containers/UserFilters';
import List from 'containers/UserList/List';

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
  const { t } = useTranslation();
  const [editingUser, setEditingUser] = useState(false);
  const [newUser, setNewUser] = useState(false);
  const [deletingUser, setDeletingUser] = useState(false);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(2);

  const [userFilter, { loading, error, data, refetch }] =
    useGetUserListLazyQuery({ fetchPolicy: 'cache-and-network' });

  useEffect(() => {
    !data &&
      userFilter({
        variables: {
          filters: '',
          pageSize,
          page
        }
      });
  }, []);

  const [{ results, pageInfo } = {} as Users] = data?.users || [];

  console.log('{ loading, error, data }', { loading, error, data });
  console.log('results', results);
  console.log('pageInfo', pageInfo);

  const [createUser] = useCreateUserMutation({
    onCompleted: refetch
  } as any);

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

  const onEditUser = useCallback(async (user: User): Promise<void> => {
    updateUser({
      variables: {
        ...user,
        id: user?._id ?? ''
      }
    });
    onClose();
  }, []);

  const onNewUser = useCallback(async (user: User): Promise<void> => {
    await createUser({
      variables: {
        email: user?.email ?? '',
        password: user?.password ?? '',
        first_name: user?.first_name ?? '',
        last_name: user?.last_name ?? '',
        username: user?.username ?? ''
      }
    });
    setNewUser(user as any);
    onClose();
  }, []);

  const onDeleteUser = useCallback(
    async (user: User): Promise<void> => {
      await deleteUser({
        variables: {
          id: user?._id ?? ''
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

  const onChangePage = useCallback(
    async (params: any) => {
      console.log('setPage', params);
      setPage(params);
      await userFilter({
        variables: {
          filters: undefined,
          pageSize,
          page: params || page
        } as any
      });
    },
    [pageSize]
  );

  const onChangePageSize = useCallback(
    async (params: any) => {
      console.log('setPageSize', params);
      setPageSize(params);
      await userFilter({
        variables: {
          filters: undefined,
          pageSize: params || pageSize,
          page
        } as any
      });
    },
    [page]
  );

  const rows = useMemo(
    () =>
      results?.map((user) =>
        userListItem({
          id,
          user,
          onEdit,
          onDelete,
          canDelete,
          canEdit
        } as IUserListItem)
      ),
    [
      id,
      onEdit,
      onDelete,
      canDelete,
      canEdit,
      editingUser,
      newUser,
      deletingUser,
      results
    ]
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

  if (!results?.length && loading) return <TopLineLoading />;

  console.log(':::::::::::::::::::::: page pageSize', { page, pageSize });

  return (
    <>
      <div>
        {canAdd && (
          <button
            className="btn btn-primary my-2"
            type="submit"
            onClick={onAdd}
          >
            {t('Add user')}
          </button>
        )}
      </div>

      {results?.length && !loading ? (
        <>
          <UserFilters onSubmit={searchTerms} />
          <List
            id={id}
            header={header}
            rows={rows}
            data={results}
            count={pageInfo?.count}
            currentPage={page}
            setCurrentPage={onChangePage}
            currentPageSize={pageSize}
            setCurrentPageSize={onChangePageSize}
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
            onConfirm={async () =>
              onDeleteUser(deletingUser as unknown as User)
            }
          >
            <p>Warning, you are about to perform an irreversible action</p>
          </ModalWrapper>
        </>
      ) : (
        <div>No data</div>
      )}
    </>
  );
}

export default UserList;
