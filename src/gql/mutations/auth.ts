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
        signin(input: { email: $email, password: $password })
    }
`;

export {
  SIGNIN_MUTATION,
  SIGNUP_MUTATION,
};
