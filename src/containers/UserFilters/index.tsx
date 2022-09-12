/*eslint-disable*/
import { useCallback } from 'react';
import { useLazyQuery } from '@apollo/client';
import { LIST_ALL_USERS } from 'gql/queries/users';
import UserFiltersView from './UserFilters';
import { INITIAL_VALUES } from './constants';

function UserFilters() {
  const [userFilter] = useLazyQuery(LIST_ALL_USERS,  { fetchPolicy: 'no-cache' });

  const searchTerms = useCallback((data: any) => {
    console.log('searchTerms searchTerms searchTerms', data);

    userFilter({
      variables: {
        filters: data.search
      }
    });
    console.log('searchTerms searchTerms searchTerms', data);
    // dispatch(authGetUsersProfilAction({ ...data });
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
