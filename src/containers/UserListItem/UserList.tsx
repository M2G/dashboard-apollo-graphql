/*eslint-disable*/
import {
  useMemo,
  useState,
  useCallback,
  useEffect,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from "react-i18next";
import userListItem from 'containers/UserListItem/UserListItem';
import UserEdit from 'containers/Users/UserEdit';
import UserNew from 'containers/Users/UserNew';
import { signupUserAction } from 'store/signup/actions';
import {
  authGetUsersProfilAction,
  authDeleteUserProfilAction, authUpdateUserProfilAction } from 'store/auth/actions';
import TableWrapper from 'components/Core/Table/TableWrapper';
import SidebarWrapper from 'components/Core/Sidebar/SidebarWrapper';
import ModalWrapper from 'components/Core/Modal/ModalWrapper';
import TopLineLoading from 'components/Loading/TopLineLoading';

function UserList({
 id, canEdit = false, canDelete = false, canAdd = false,
}: any) {
  const { t } = useTranslation();
  const [editingUser, setEditingUser] = useState(false);
  const [newUser, setNewUser] = useState(false);
  const [deletingUser, setDeletingUser] = useState(false);

  const { auth,
    // signup
  }: any = useSelector((state: any) => ({
    signup: state?.signup,
    auth: state?.auth
  }));

  const dispatch = useDispatch();

  const authGetUsersProfil = () => dispatch(authGetUsersProfilAction());
  const deleteUserAction = (id: string) => dispatch(authDeleteUserProfilAction(id) as any);
  const editUserAction = (params: any) => dispatch(authUpdateUserProfilAction(params) as any);
  const signupAction = (params: any) => dispatch(signupUserAction(params) as any);

  const users = auth?.data || [];

  useEffect(() => authGetUsersProfil(), []);

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

  const onEditUser = useCallback((user: any) => {
    editUserAction(user);
    authGetUsersProfil();
    onClose();
  }, []);

  const onEdit = useCallback((user: any) => {
    setEditingUser(user);
    setNewUser(false);
    setDeletingUser(false);
  }, []);

  const onNewUser = useCallback((user: any) => {
    setNewUser(user);
    signupAction(user);
    authGetUsersProfil();
    onClose();
  }, []);

  const onDeleteUser = useCallback((user: any) => {
    deleteUserAction(user._id);
    authGetUsersProfil();
    onClose();
  }, []);

  const rows = useMemo(
    () =>
      users?.map((user: any) =>
        userListItem({
          id,
          user,
          onEdit,
          onDelete,
          canDelete,
          canEdit,
        })),
    [id, onEdit, onDelete, canDelete, canEdit, editingUser, newUser, deletingUser, users]);

  console.log('users', users)

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

  if (!users?.length && auth.loading) return <TopLineLoading />;

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

    {!users?.length && !auth.loading && <div>No data</div>}

    <TableWrapper id={id} header={header} rows={rows} />

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
        hide={onClose}
        isShowing={deletingUser}
        onConfirm={() => onDeleteUser(deletingUser)}
      />

    </>;
}

export default UserList;
