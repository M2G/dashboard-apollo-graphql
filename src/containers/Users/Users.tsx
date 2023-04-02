import UserList from 'containers/UserList/UserList';

function Users(): JSX.Element {
  return (
    <div className="o-zone">
      <div className="o-grid">
        <div className="o-grid__row">
          <div className="o-col">
            <div className="o-cell--one">
              <UserList canEdit canDelete canAdd id="test" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Users;
