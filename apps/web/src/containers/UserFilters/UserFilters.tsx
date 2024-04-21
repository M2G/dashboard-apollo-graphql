import type { JSX } from 'react';

import { useEffect, useRef, useState } from 'react';
import { debounce } from 'lodash';

import { INPUT_NAME, PLACEHOLDER_SEARCH } from './constants';

interface UserFiltersProps {
  currentTerm?: string;
  onSearchTerm: (searchTerm: string) => void;
}

function UserFilters({
  currentTerm,
  onSearchTerm,
}: UserFiltersProps): JSX.Element {
  const [term, setTerm] = useState(currentTerm);
  const debouncedSearch = useRef(
    debounce((criteria): void => {
      onSearchTerm(criteria);
    }, 400),
  ).current;

  useEffect(
    () => (): void => {
      debouncedSearch.cancel();
    },
    [debouncedSearch],
  );

  function handleChange({
    target: { value = '' },
  }: {
    target: { value: string };
  }): void {
    debouncedSearch(value);
    setTerm(value);
  }

  return (
    <input
      data-testid="search-input"
      aria-label="Search"
      className="form-control c-search-input w-full"
      id="floatingInput"
      name={INPUT_NAME.SEARCH}
      onChange={handleChange}
      placeholder={PLACEHOLDER_SEARCH}
      type="search"
      value={term}
    />
  );
}

export default UserFilters;
