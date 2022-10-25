/*eslint-disable*/
import { useCallback, useContext } from 'react';
import UserFiltersView from './UserFilters';
import { INITIAL_VALUES } from './constants';
import { useGetUserListLazyQuery } from 'modules/graphql/generated';
import { FilterContext } from '../../FiltersContext';

function UserFilters() {
  const { userData }: any = useContext(FilterContext);
  const [userFilter, { loading, error, data }] = useGetUserListLazyQuery(
    {
      fetchPolicy: 'no-cache',
      onCompleted: ({ ...arg }: any) => {
          console.log('onCompleted onCompleted onCompleted', arg);
        userData(arg);
        }
      },
    );

  console.log('---------------->', { loading, error, data })

  const searchTerms = useCallback(async (params: any) => {
    await userFilter({
      variables: {
        filters: params?.search
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
