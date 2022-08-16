import { gql } from "@apollo/client";

const LIST_ALL_USERS = gql`
query users{
    users { 
      first_name,
      last_name
   }
}
`;

export {
  LIST_ALL_USERS,
};
