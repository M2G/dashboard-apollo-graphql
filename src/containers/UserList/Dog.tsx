//import { useGetUserListLazyQuery } from 'modules/graphql/generated';
import { gql, useQuery } from '@apollo/client';

// Make sure that both the query and the component are exported
export const GET_DOG_QUERY = gql`
    query GetUserList($filters: String, $pageSize: Int, $page: Int) {
        users(filters: $filters, pageSize: $pageSize, page: $page) {
            results {
                _id
                first_name
                last_name
                email
                created_at
                modified_at
                password
            }
            pageInfo {
                count
                pages
                next
                prev
            }
        }
    }
`;

export default function Dog() {
  const { loading, error, data } = useQuery(GET_DOG_QUERY, {
    variables: {
      filters: '',
      pageSize: 5,
      page: 1
    }
  });

  console.log('------------> 2', { loading, error, data });

  console.log('------------> RES :', JSON.stringify(data))

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error.message}</p>;
  return null;
}
