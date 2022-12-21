import { gql, useQuery } from "@apollo/client";

// Make sure that both the query and the component are exported
export const GET_DOG_QUERY = gql`
    query GetDog {
        dogs {
            id
            name
            breed
        }
    }
`;

export default function Dog({ name }) {
  const { loading, error, data } = useQuery(GET_DOG_QUERY);

  console.log("------------> 2", { loading, error, data });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error.message}</p>;
  return (
    <p>
      {data?.dog?.name} is a {data?.dog?.breed}
    </p>
  );
}
