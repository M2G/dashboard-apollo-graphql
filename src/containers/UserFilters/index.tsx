/*eslint-disable*/
import { useCallback } from 'react';
import UserFiltersView from './UserFilters';
import { INITIAL_VALUES } from './constants';
import { useGetUserListLazyQuery } from 'modules/graphql/generated';

function UserFilters() {
  const [userFilter] = useGetUserListLazyQuery({ fetchPolicy: 'no-cache' });

  const searchTerms = useCallback((data: any) => {
    userFilter({
      variables: {
        filters: data?.search
      }
    });
  }, []);

  function initialValues() {
    return { ...INITIAL_VALUES };
  }

  return <UserFiltersView
      initialValues={initialValues()}
      onSubmit={searchTerms}
    />
}

export default UserFilters;
