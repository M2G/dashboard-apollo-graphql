import { useEffect, useRef } from 'react';
import { debounce } from 'lodash';
import { PLACEHOLDER_SEARCH, INPUT_NAME } from './constants';
import './index.scss';

type UserFiltersProps = {
  onSearchTerm: (searchTerm: string) => void;
};

function UserFilters({ onSearchTerm }: UserFiltersProps): JSX.Element {
  const debouncedSearch = useRef(
    debounce((criteria) => {
      onSearchTerm(criteria);
    }, 400),
  ).current;

  useEffect(() => () => {
      debouncedSearch.cancel();
    }, [debouncedSearch]);

  function handleChange({ target: { value = '' } }: any) {
    debouncedSearch(value);
  }

  return (
    <input
      id="floatingInput"
      name={INPUT_NAME.SEARCH}
      className="form-control my-2 c-search-input"
      type="search"
      aria-label="Search"
      onChange={handleChange}
      placeholder={PLACEHOLDER_SEARCH}
    />
  );
}

export default UserFilters;
