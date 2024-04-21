import UserFiltersView from './UserFilters';

type UserFilters = {
  onSearchTerm: (searchTerm: string) => void;
  currentTerm?: string;
};

function UserFilters({ onSearchTerm, currentTerm }: UserFilters): JSX.Element {
  return (
    <UserFiltersView onSearchTerm={onSearchTerm} currentTerm={currentTerm} />
  );
}

export default UserFilters;
