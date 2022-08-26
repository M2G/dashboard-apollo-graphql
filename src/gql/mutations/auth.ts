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
          first_name
          last_name
          email
          created_at
          modified_at
        }
    }
`;

const UPDATE_USER_MUTATION = gql`
    mutation updateUser(
        $id: String!
        $email: String
        $password: String
        $first_name: String
        $last_name: String
        $username: String
    ) {
        updateUser(id: $id, input: { email: $email, password: $password, first_name: $first_name, last_name: $last_name, username: $username }) { 
          first_name
          last_name
          email
          created_at
          modified_at
        }
    }
`;

const DELETE_USER_MUTATION = gql`
    mutation deleteUser(
        $id: String!
    ) {
        deleteUser(id: $id) { 
          _id
        }
    }
`;

export {
  SIGNIN_MUTATION,
  SIGNUP_MUTATION,
  CREATE_USER_MUTATION,
  UPDATE_USER_MUTATION,
  DELETE_USER_MUTATION,
};
