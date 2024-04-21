import type { JSX } from 'react';
import UserList from '@/containers/UserList/UserList';

function Users(): JSX.Element {
  return (
    <div className="o-zone">
      <div className="o-grid u-no-gutters">
        <div className="o-grid__row">
          <div className="o-col">
            <div className="o-cell--one">
              <UserList canAdd canDelete canEdit id="test" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Users;
