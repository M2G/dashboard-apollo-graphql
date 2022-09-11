import { gql } from "@apollo/client";

const LIST_ALL_USERS = gql`
query users{
    users { 
      _id
      first_name,
      last_name,
      email
      created_at
      modified_at
   }
}
`;

const USER = gql`
query getUser(
        $id: String!
    ) {
    getUser(id: $id) {
      _id
      first_name,
      last_name,
      email
      created_at
      modified_at
      password
   }
}
`;

export {
  LIST_ALL_USERS,
  USER,
};
