import { gql } from "@apollo/client";

const SIGNIN_MUTATION = gql`
    mutation signin(
        $email: String!
        $password: String!
    ) {
        signin(input: { email: $email, password: $password })
    }
`;

const SIGNUP_MUTATION = gql`
    mutation signup(
        $email: String!
        $password: String!
    ) {
        signup(input: { email: $email, password: $password })
    }
`;

const CREATE_USER_MUTATION = gql`
    mutation createUser(
        $email: String!
        $password: String!
        $first_name: String
        $last_name: String
        $username: String
    ) {
        createUser(input: { email: $email, password: $password, first_name: $first_name, last_name: $last_name, username: $username }) { 
          email
        }
    }
`;

export {
  SIGNIN_MUTATION,
  SIGNUP_MUTATION,
  CREATE_USER_MUTATION,
};
