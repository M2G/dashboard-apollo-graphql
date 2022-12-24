import { useEffect } from 'react';
import {
  useGetUserListLazyQuery,
} from 'modules/graphql/generated';

export default function Test() {
  const [userFilter, { loading, error, data }] = useGetUserListLazyQuery();

  useEffect(() => {
    userFilter({
      variables: {
        filters: '',
        pageSize: 5,
        page: 1,
      },
    });
  }, []);

  console.log('------------> 2', { loading, error, data });

  console.log('------------> RES :', JSON.stringify(data));

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error.message}</p>;
  return null;
}
