/*eslint-disable*/
import UserFiltersView from './UserFilters';

type UserFilters = {
  onSearchTerm: (searchTerm: string) => void;
}

function UserFilters({ onSearchTerm }: UserFilters): JSX.Element {
  return (
    <UserFiltersView onSearchTerm={onSearchTerm} />
  );
}

export default UserFilters;
