import { useEffect, useRef, useState } from 'react';
import { debounce } from 'lodash';
import { PLACEHOLDER_SEARCH, INPUT_NAME } from './constants';
import './index.scss';

type UserFiltersProps = {
  onSearchTerm: (searchTerm: string) => void;
  currentTerm?: string;
};

function UserFilters({ onSearchTerm, currentTerm }: UserFiltersProps): JSX.Element {
  const [term, setTerm] = useState(currentTerm);
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
    setTerm(value);
  }

  return (
    <input
      id="floatingInput"
      name={INPUT_NAME.SEARCH}
      className="form-control c-search-input"
      type="search"
      aria-label="Search"
      onChange={handleChange}
      placeholder={PLACEHOLDER_SEARCH}
      value={term}
    />
  );
}

export default UserFilters;
