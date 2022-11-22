/*eslint-disable*/
import {
  useMemo,
  useState,
  useCallback,
  useEffect,
} from 'react';
import { useTranslation } from "react-i18next";
import userListItem from 'containers/UserList/UserListItem';
import UserEdit from 'containers/Users/UserEdit';
import UserNew from 'containers/Users/UserNew';
import SidebarWrapper from 'components/Core/Sidebar/SidebarWrapper';
import ModalWrapper from 'components/Core/Modal/ModalWrapper';
import TopLineLoading from 'components/Loading/TopLineLoading';
import {
  useUpdateUserMutation,
  useCreateUserMutation,
  useDeleteUserMutation,
  useGetUserListLazyQuery,
} from 'modules/graphql/generated';
import UserFilters from 'containers/UserFilters';
import List from 'containers/UserList/List';

interface IUserList {
  id: number | string;
  canEdit?: boolean;
  canDelete?: boolean;
  canAdd?: boolean;
}

function UserList({
 id, canEdit = false, canDelete = false, canAdd = false
}: IUserList) {
  const { t } = useTranslation();
  const [editingUser, setEditingUser] = useState(false);
  const [newUser, setNewUser] = useState(false);
  const [deletingUser, setDeletingUser] = useState(false);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(2);

  const [userFilter, { loading, error, data, refetch }] = useGetUserListLazyQuery({ fetchPolicy: 'cache-and-network' });

  useEffect(() => {
    !data && userFilter({
      variables: {
        filters: "",
        pageSize: pageSize,
        page: page,
      }
    });
  }, []);

  const [{ results, pageInfo } = {} as any] = data?.users || [];

  console.log('{ loading, error, data }', { loading, error, data });
  console.log('results', results);
  console.log('pageInfo', pageInfo);

  const [createUser] = useCreateUserMutation({
    onCompleted: refetch,
  } as any);

  const [updateUser] = useUpdateUserMutation({
    onCompleted: refetch,
  } as any);

  const [deleteUser] = useDeleteUserMutation({
    onCompleted: refetch,
  } as any);

  const onDelete = useCallback((currentSource: any) => {
    setNewUser(false);
    setEditingUser(false);
    setDeletingUser(currentSource);
  }, []);

  const onClose = useCallback(() => {
    setDeletingUser(false);
    setEditingUser(false);
    setNewUser(false);
  }, []);

  const onAdd = useCallback(() => {
    setNewUser(true);
    setEditingUser(false);
    setDeletingUser(false);
  }, []);

  const onEdit = useCallback((user: any) => {
    setEditingUser(user);
    setNewUser(false);
    setDeletingUser(false);
  }, []);

  const onEditUser = useCallback(async (user: any): Promise<void> => {
    await updateUser({
      variables: {
       ...user,
        id: user?._id
      },
    });
    onClose();
  }, []);

  const onNewUser = useCallback(async (user: any): Promise<void> => {
    await createUser({
      variables: {
        email: user?.email,
        password: user?.password,
      } as any
    });
    setNewUser(user);
    onClose();
  }, []);

  const onDeleteUser = useCallback(async (user: any) => {
    await deleteUser({
      variables: {
        id: user?._id,
      }
    });
    onClose();
  }, []);

  const searchTerms = useCallback((params: any) => {
    userFilter({
      variables: {
        filters: params?.search,
        pageSize: undefined,
        page: undefined,
      } as any
    });
  }, []);

  const onChangePage = useCallback((params: any) => {
    console.log('setPage', params)
    setPage(params);
    userFilter({
      variables: {
        filters: undefined,
        pageSize: pageSize,
        page: params || page,
      } as any
    });
  }, [pageSize]);

  const onChangePageSize = useCallback((params: any) => {
    console.log('setPageSize', params)
    setPageSize(params);
    userFilter({
      variables: {
        filters: undefined,
        pageSize: params || pageSize,
        page: page,
      } as any
    });
  }, [page]);

  const rows = useMemo(
    () =>
      results?.map((user: any) =>
        userListItem({
          id,
          user,
          onEdit,
          onDelete,
          canDelete,
          canEdit,
        })),
    [id, onEdit, onDelete, canDelete, canEdit, editingUser, newUser, deletingUser, results]);

  const header = useMemo(
    () => [
      { label: '', sortable: false },
      { label: 'First name', sortable: false },
      { label: 'Last name', sortable: false },
      { label: 'Email', sortable: false },
      { label: 'Created at', sortable: true, type: 'date' },
      { label: 'Modified at', sortable: true, type: 'date' },
    ],
    []);

  if (!results?.length && loading) return <TopLineLoading />;

  console.log(':::::::::::::::::::::: page pageSize', { page, pageSize })

  return <>

    <section className="py-5 text-center container">
      <div className="row py-lg-5">
        <div className="col-lg-6 col-md-8 mx-auto">
          <h1 className="fw-light">{t("Welcome to React")}</h1>
          <p className="lead text-muted">Something short and leading about the collection below—its
            contents, the creator, etc. Make it short and sweet, but not too short so folks don’t
            simply skip over it entirely.</p>
          <p>
            {canAdd && <button className="btn btn-primary my-2"  type="submit" onClick={onAdd}>Add user(s)</button>}
          </p>
        </div>
      </div>
    </section>

    {results?.length && !loading ? <>
        <UserFilters onSubmit={searchTerms} />
        <List
          // @ts-ignore
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

        <SidebarWrapper
          isOpened={editingUser}
          setIsOpened={onClose}>
          <UserEdit
            data={editingUser}
            onSubmit={onEditUser}
          />
        </SidebarWrapper>

        <SidebarWrapper
          isOpened={newUser}
          setIsOpened={onClose}>
          <UserNew onSubmit={onNewUser} />
        </SidebarWrapper>

        <ModalWrapper
          id="test"
          title="Delete"
          hide={onClose}
          isShowing={deletingUser}
          onConfirm={() => onDeleteUser(deletingUser)}
        >
          <p>Warning, you are about to perform an irreversible action</p>
        </ModalWrapper>
      </>
      : <div>No data</div>}

    </>;
}

export default UserList;
