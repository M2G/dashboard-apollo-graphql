/*eslint-disable*/
import UserFiltersView from './UserFilters';
import { INITIAL_VALUES } from './constants';

function UserFilters({ onSubmit }: any) {
  function initialValues() {
    return { ...INITIAL_VALUES };
  }

  return <UserFiltersView
      initialValues={initialValues()}
      onSubmit={onSubmit}
    />
}

export default UserFilters;
