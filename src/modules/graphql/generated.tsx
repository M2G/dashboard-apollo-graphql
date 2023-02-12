import { gql } from '@apollo/client';
import type * as ApolloReactCommon from '@apollo/client';
import * as ApolloReactHooks from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Author = {
  __typename: 'Author';
  name: Scalars['String'];
};

export type Book = {
  __typename: 'Book';
  author: Author;
  title: Scalars['String'];
};

export type CreateUserInput = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type Edge = {
  __typename: 'Edge';
  cursor: Maybe<Scalars['String']>;
  node: Maybe<User>;
};

export type Library = {
  __typename: 'Library';
  books: Maybe<Array<Book>>;
  branch: Scalars['String'];
};

export type Mutation = {
  __typename: 'Mutation';
  createUser: User;
  deleteUser: Maybe<User>;
  forgotPassword: Status;
  resetPassword: Status;
  signin: Scalars['String'];
  signup: User;
  updateUser: Maybe<User>;
};

export type MutationcreateUserArgs = {
  input: CreateUserInput;
};

export type MutationdeleteUserArgs = {
  id: Scalars['String'];
};

export type MutationforgotPasswordArgs = {
  email: Scalars['String'];
};

export type MutationresetPasswordArgs = {
  input: ResetPasswordInput;
};

export type MutationsigninArgs = {
  input: InputMaybe<SigninInput>;
};

export type MutationsignupArgs = {
  input: InputMaybe<SignupInput>;
};

export type MutationupdateUserArgs = {
  id: Scalars['String'];
  input: InputMaybe<UpdateUserInput>;
};

export type PageInfo = {
  __typename: 'PageInfo';
  endCursor: Maybe<Scalars['String']>;
  hasNextPage: Maybe<Scalars['Boolean']>;
  hasPrevPage: Maybe<Scalars['Boolean']>;
  startCursor: Maybe<Scalars['String']>;
};

export type Query = {
  __typename: 'Query';
  getUser: Maybe<User>;
  libraries: Maybe<Array<Maybe<Library>>>;
  users: Users;
};

export type QuerygetUserArgs = {
  id: Scalars['String'];
};

export type QueryusersArgs = {
  afterCursor: InputMaybe<Scalars['String']>;
  filters: InputMaybe<Scalars['String']>;
  first: Scalars['Int'];
};

export type ResetPasswordInput = {
  password: Scalars['String'];
  token: Scalars['String'];
};

export type SigninInput = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type SignupInput = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type Status = {
  __typename: 'Status';
  success: Maybe<Scalars['Boolean']>;
};

export type UpdateUserInput = {
  email: InputMaybe<Scalars['String']>;
  first_name: InputMaybe<Scalars['String']>;
  last_name: InputMaybe<Scalars['String']>;
  username: InputMaybe<Scalars['String']>;
};

export type User = {
  __typename: 'User';
  _id: Maybe<Scalars['String']>;
  created_at: Maybe<Scalars['Int']>;
  deleted_at: Maybe<Scalars['Int']>;
  email: Maybe<Scalars['String']>;
  first_name: Maybe<Scalars['String']>;
  last_connected_at: Maybe<Scalars['Int']>;
  last_name: Maybe<Scalars['String']>;
  modified_at: Maybe<Scalars['Int']>;
  password: Maybe<Scalars['String']>;
  reset_password_expires: Maybe<Scalars['String']>;
  reset_password_token: Maybe<Scalars['String']>;
  username: Maybe<Scalars['String']>;
};

export type Users = {
  __typename: 'Users';
  edges: Maybe<Array<Maybe<Edge>>>;
  pageInfo: Maybe<PageInfo>;
  totalCount: Maybe<Scalars['Int']>;
};

export enum sortOrder {
  ASC = 'ASC',
  DESC = 'DESC'
}

export type SigninMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
}>;

export type SigninMutation = { __typename: 'Mutation'; signin: string };

export type SignupMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
}>;

export type SignupMutation = {
  __typename: 'Mutation';
  signup: {
    __typename: 'User';
    first_name: string | null;
    last_name: string | null;
    email: string | null;
    created_at: number | null;
    modified_at: number | null;
  };
};

export type CreateUserMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
}>;

export type CreateUserMutation = {
  __typename: 'Mutation';
  createUser: {
    __typename: 'User';
    first_name: string | null;
    last_name: string | null;
    email: string | null;
    created_at: number | null;
    modified_at: number | null;
  };
};

export type UpdateUserMutationVariables = Exact<{
  id: Scalars['String'];
  email: InputMaybe<Scalars['String']>;
  first_name: InputMaybe<Scalars['String']>;
  last_name: InputMaybe<Scalars['String']>;
  username: InputMaybe<Scalars['String']>;
}>;

export type UpdateUserMutation = {
  __typename: 'Mutation';
  updateUser: {
    __typename: 'User';
    first_name: string | null;
    last_name: string | null;
    email: string | null;
    created_at: number | null;
    modified_at: number | null;
  } | null;
};

export type DeleteUserMutationVariables = Exact<{
  id: Scalars['String'];
}>;

export type DeleteUserMutation = {
  __typename: 'Mutation';
  deleteUser: { __typename: 'User'; _id: string | null } | null;
};

export type UserPartsFragment = {
  __typename: 'User';
  _id: string | null;
  first_name: string | null;
  last_name: string | null;
  email: string | null;
  created_at: number | null;
  modified_at: number | null;
  password: string | null;
};

export type GetUserListQueryVariables = Exact<{
  afterCursor: InputMaybe<Scalars['String']>;
  first: Scalars['Int'];
  filters: InputMaybe<Scalars['String']>;
}>;

export type GetUserListQuery = {
  __typename: 'Query';
  users: {
    __typename: 'Users';
    totalCount: number | null;
    edges: Array<{
      __typename: 'Edge';
      cursor: string | null;
      node: {
        __typename: 'User';
        _id: string | null;
        first_name: string | null;
        last_name: string | null;
        email: string | null;
        created_at: number | null;
        modified_at: number | null;
        password: string | null;
      } | null;
    } | null> | null;
    pageInfo: {
      __typename: 'PageInfo';
      startCursor: string | null;
      endCursor: string | null;
      hasNextPage: boolean | null;
      hasPrevPage: boolean | null;
    } | null;
  };
};

export type GetUserQueryVariables = Exact<{
  id: Scalars['String'];
}>;

export type GetUserQuery = {
  __typename: 'Query';
  getUser: {
    __typename: 'User';
    _id: string | null;
    first_name: string | null;
    last_name: string | null;
    email: string | null;
    created_at: number | null;
    modified_at: number | null;
    password: string | null;
  } | null;
};

export const UserPartsFragmentDoc = gql`
  fragment UserParts on User {
    _id
    first_name
    last_name
    email
    created_at
    modified_at
    password
  }
`;
export const SigninDocument = gql`
  mutation Signin($email: String!, $password: String!) {
    signin(input: { email: $email, password: $password })
  }
`;
export type SigninMutationFn = ApolloReactCommon.MutationFunction<
  SigninMutation,
  SigninMutationVariables
>;

/**
 * __useSigninMutation__
 *
 * To run a mutation, you first call `useSigninMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSigninMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [signinMutation, { data, loading, error }] = useSigninMutation({
 *   variables: {
 *      email: // value for 'email'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useSigninMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<SigninMutation, SigninMutationVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return ApolloReactHooks.useMutation<SigninMutation, SigninMutationVariables>(
    SigninDocument,
    options
  );
}
export type SigninMutationHookResult = ReturnType<typeof useSigninMutation>;
export type SigninMutationResult = ApolloReactCommon.MutationResult<SigninMutation>;
export type SigninMutationOptions = ApolloReactCommon.BaseMutationOptions<
  SigninMutation,
  SigninMutationVariables
>;
export const SignupDocument = gql`
  mutation Signup($email: String!, $password: String!) {
    signup(input: { email: $email, password: $password }) {
      first_name
      last_name
      email
      created_at
      modified_at
    }
  }
`;
export type SignupMutationFn = ApolloReactCommon.MutationFunction<
  SignupMutation,
  SignupMutationVariables
>;

/**
 * __useSignupMutation__
 *
 * To run a mutation, you first call `useSignupMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSignupMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [signupMutation, { data, loading, error }] = useSignupMutation({
 *   variables: {
 *      email: // value for 'email'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useSignupMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<SignupMutation, SignupMutationVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return ApolloReactHooks.useMutation<SignupMutation, SignupMutationVariables>(
    SignupDocument,
    options
  );
}
export type SignupMutationHookResult = ReturnType<typeof useSignupMutation>;
export type SignupMutationResult = ApolloReactCommon.MutationResult<SignupMutation>;
export type SignupMutationOptions = ApolloReactCommon.BaseMutationOptions<
  SignupMutation,
  SignupMutationVariables
>;
export const CreateUserDocument = gql`
  mutation CreateUser($email: String!, $password: String!) {
    createUser(input: { email: $email, password: $password }) {
      first_name
      last_name
      email
      created_at
      modified_at
    }
  }
`;
export type CreateUserMutationFn = ApolloReactCommon.MutationFunction<
  CreateUserMutation,
  CreateUserMutationVariables
>;

/**
 * __useCreateUserMutation__
 *
 * To run a mutation, you first call `useCreateUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createUserMutation, { data, loading, error }] = useCreateUserMutation({
 *   variables: {
 *      email: // value for 'email'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useCreateUserMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    CreateUserMutation,
    CreateUserMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return ApolloReactHooks.useMutation<CreateUserMutation, CreateUserMutationVariables>(
    CreateUserDocument,
    options
  );
}
export type CreateUserMutationHookResult = ReturnType<typeof useCreateUserMutation>;
export type CreateUserMutationResult = ApolloReactCommon.MutationResult<CreateUserMutation>;
export type CreateUserMutationOptions = ApolloReactCommon.BaseMutationOptions<
  CreateUserMutation,
  CreateUserMutationVariables
>;
export const UpdateUserDocument = gql`
  mutation UpdateUser(
    $id: String!
    $email: String
    $first_name: String
    $last_name: String
    $username: String
  ) {
    updateUser(
      id: $id
      input: { email: $email, first_name: $first_name, last_name: $last_name, username: $username }
    ) {
      first_name
      last_name
      email
      created_at
      modified_at
    }
  }
`;
export type UpdateUserMutationFn = ApolloReactCommon.MutationFunction<
  UpdateUserMutation,
  UpdateUserMutationVariables
>;

/**
 * __useUpdateUserMutation__
 *
 * To run a mutation, you first call `useUpdateUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateUserMutation, { data, loading, error }] = useUpdateUserMutation({
 *   variables: {
 *      id: // value for 'id'
 *      email: // value for 'email'
 *      first_name: // value for 'first_name'
 *      last_name: // value for 'last_name'
 *      username: // value for 'username'
 *   },
 * });
 */
export function useUpdateUserMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    UpdateUserMutation,
    UpdateUserMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return ApolloReactHooks.useMutation<UpdateUserMutation, UpdateUserMutationVariables>(
    UpdateUserDocument,
    options
  );
}
export type UpdateUserMutationHookResult = ReturnType<typeof useUpdateUserMutation>;
export type UpdateUserMutationResult = ApolloReactCommon.MutationResult<UpdateUserMutation>;
export type UpdateUserMutationOptions = ApolloReactCommon.BaseMutationOptions<
  UpdateUserMutation,
  UpdateUserMutationVariables
>;
export const DeleteUserDocument = gql`
  mutation DeleteUser($id: String!) {
    deleteUser(id: $id) {
      _id
    }
  }
`;
export type DeleteUserMutationFn = ApolloReactCommon.MutationFunction<
  DeleteUserMutation,
  DeleteUserMutationVariables
>;

/**
 * __useDeleteUserMutation__
 *
 * To run a mutation, you first call `useDeleteUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteUserMutation, { data, loading, error }] = useDeleteUserMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteUserMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    DeleteUserMutation,
    DeleteUserMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return ApolloReactHooks.useMutation<DeleteUserMutation, DeleteUserMutationVariables>(
    DeleteUserDocument,
    options
  );
}
export type DeleteUserMutationHookResult = ReturnType<typeof useDeleteUserMutation>;
export type DeleteUserMutationResult = ApolloReactCommon.MutationResult<DeleteUserMutation>;
export type DeleteUserMutationOptions = ApolloReactCommon.BaseMutationOptions<
  DeleteUserMutation,
  DeleteUserMutationVariables
>;
export const GetUserListDocument = gql`
  query GetUserList($afterCursor: String, $first: Int!, $filters: String) {
    users(afterCursor: $afterCursor, first: $first, filters: $filters) {
      totalCount
      edges {
        node {
          ...UserParts
        }
        cursor
      }
      pageInfo {
        startCursor
        endCursor
        hasNextPage
        hasPrevPage
      }
    }
  }
  ${UserPartsFragmentDoc}
`;

/**
 * __useGetUserListQuery__
 *
 * To run a query within a React component, call `useGetUserListQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserListQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserListQuery({
 *   variables: {
 *      afterCursor: // value for 'afterCursor'
 *      first: // value for 'first'
 *      filters: // value for 'filters'
 *   },
 * });
 */
export function useGetUserListQuery(
  baseOptions: ApolloReactHooks.QueryHookOptions<GetUserListQuery, GetUserListQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return ApolloReactHooks.useQuery<GetUserListQuery, GetUserListQueryVariables>(
    GetUserListDocument,
    options
  );
}
export function useGetUserListLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetUserListQuery, GetUserListQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return ApolloReactHooks.useLazyQuery<GetUserListQuery, GetUserListQueryVariables>(
    GetUserListDocument,
    options
  );
}
export type GetUserListQueryHookResult = ReturnType<typeof useGetUserListQuery>;
export type GetUserListLazyQueryHookResult = ReturnType<typeof useGetUserListLazyQuery>;
export type GetUserListQueryResult = ApolloReactCommon.QueryResult<
  GetUserListQuery,
  GetUserListQueryVariables
>;
export const GetUserDocument = gql`
  query GetUser($id: String!) {
    getUser(id: $id) {
      ...UserParts
    }
  }
  ${UserPartsFragmentDoc}
`;

/**
 * __useGetUserQuery__
 *
 * To run a query within a React component, call `useGetUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetUserQuery(
  baseOptions: ApolloReactHooks.QueryHookOptions<GetUserQuery, GetUserQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return ApolloReactHooks.useQuery<GetUserQuery, GetUserQueryVariables>(GetUserDocument, options);
}
export function useGetUserLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetUserQuery, GetUserQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return ApolloReactHooks.useLazyQuery<GetUserQuery, GetUserQueryVariables>(
    GetUserDocument,
    options
  );
}
export type GetUserQueryHookResult = ReturnType<typeof useGetUserQuery>;
export type GetUserLazyQueryHookResult = ReturnType<typeof useGetUserLazyQuery>;
export type GetUserQueryResult = ApolloReactCommon.QueryResult<GetUserQuery, GetUserQueryVariables>;
