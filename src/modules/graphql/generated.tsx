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

export type CreateUserInput = {
  _id: InputMaybe<Scalars['String']>;
  created_at: InputMaybe<Scalars['Int']>;
  email: InputMaybe<Scalars['String']>;
  first_name: InputMaybe<Scalars['String']>;
  last_name: InputMaybe<Scalars['String']>;
  modified_at: InputMaybe<Scalars['Int']>;
  password: InputMaybe<Scalars['String']>;
  username: InputMaybe<Scalars['String']>;
};

export type Mutation = {
  __typename: 'Mutation';
  createUser: User;
  deleteUser: Maybe<User>;
  signin: Scalars['String'];
  signup: Scalars['String'];
  updateUser: Maybe<User>;
  updateUserPassword: User;
};


export type MutationcreateUserArgs = {
  input: CreateUserInput;
};


export type MutationdeleteUserArgs = {
  id: Scalars['String'];
};


export type MutationsigninArgs = {
  input: InputMaybe<SigninInput>;
};


export type MutationsignupArgs = {
  input: InputMaybe<SignupInput>;
};


export type MutationupdateUserArgs = {
  id: Scalars['String'];
  input: CreateUserInput;
};


export type MutationupdateUserPasswordArgs = {
  id: Scalars['String'];
  input: updateUserPasswordInput;
};

export type PageInfo = {
  __typename: 'PageInfo';
  count: Maybe<Scalars['Int']>;
  next: Maybe<Scalars['Int']>;
  pages: Maybe<Scalars['Int']>;
  prev: Maybe<Scalars['Int']>;
};

export type Query = {
  __typename: 'Query';
  getUser: Maybe<User>;
  users: Maybe<Array<Users>>;
};


export type QuerygetUserArgs = {
  id: Scalars['String'];
};


export type QueryusersArgs = {
  filters: InputMaybe<Scalars['String']>;
  page: InputMaybe<Scalars['Int']>;
  pageSize: InputMaybe<Scalars['Int']>;
};

export type SigninInput = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type SignupInput = {
  email: Scalars['String'];
  password: Scalars['String'];
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
  pageInfo: PageInfo;
  results: Maybe<Array<Maybe<User>>>;
};

export enum sortOrder {
  ASC = 'ASC',
  DESC = 'DESC'
}

export type updateUserPasswordInput = {
  old_password: Scalars['String'];
  password: Scalars['String'];
  password_again: Scalars['String'];
};

export type SigninMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
}>;


export type SigninMutation = { __typename: 'Mutation', signin: string };

export type SignupMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
}>;


export type SignupMutation = { __typename: 'Mutation', signup: string };

export type CreateUserMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
  first_name: InputMaybe<Scalars['String']>;
  last_name: InputMaybe<Scalars['String']>;
  username: InputMaybe<Scalars['String']>;
}>;


export type CreateUserMutation = { __typename: 'Mutation', createUser: { __typename: 'User', first_name: string | null, last_name: string | null, email: string | null, created_at: number | null, modified_at: number | null } };

export type UpdateUserMutationVariables = Exact<{
  id: Scalars['String'];
  email: InputMaybe<Scalars['String']>;
  first_name: InputMaybe<Scalars['String']>;
  last_name: InputMaybe<Scalars['String']>;
  username: InputMaybe<Scalars['String']>;
}>;


export type UpdateUserMutation = { __typename: 'Mutation', updateUser: { __typename: 'User', first_name: string | null, last_name: string | null, email: string | null, created_at: number | null, modified_at: number | null } | null };

export type UpdateUserPasswordMutationVariables = Exact<{
  id: Scalars['String'];
  old_password: Scalars['String'];
  password: Scalars['String'];
  password_again: Scalars['String'];
}>;


export type UpdateUserPasswordMutation = { __typename: 'Mutation', updateUserPassword: { __typename: 'User', _id: string | null } };

export type DeleteUserMutationVariables = Exact<{
  id: Scalars['String'];
}>;


export type DeleteUserMutation = { __typename: 'Mutation', deleteUser: { __typename: 'User', _id: string | null } | null };

export type GetUserListQueryVariables = Exact<{
  filters: InputMaybe<Scalars['String']>;
  pageSize: InputMaybe<Scalars['Int']>;
  page: InputMaybe<Scalars['Int']>;
}>;


export type GetUserListQuery = { __typename: 'Query', users: Array<{ __typename: 'Users', results: Array<{ __typename: 'User', _id: string | null, first_name: string | null, last_name: string | null, email: string | null, created_at: number | null, modified_at: number | null } | null> | null, pageInfo: { __typename: 'PageInfo', count: number | null, pages: number | null, next: number | null, prev: number | null } }> | null };

export type GetUserQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type GetUserQuery = { __typename: 'Query', getUser: { __typename: 'User', _id: string | null, first_name: string | null, last_name: string | null, email: string | null, created_at: number | null, modified_at: number | null, password: string | null } | null };


export const SigninDocument = gql`
    mutation Signin($email: String!, $password: String!) {
  signin(input: {email: $email, password: $password})
}
    `;
export type SigninMutationFn = ApolloReactCommon.MutationFunction<SigninMutation, SigninMutationVariables>;

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
export function useSigninMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<SigninMutation, SigninMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<SigninMutation, SigninMutationVariables>(SigninDocument, options);
      }
export type SigninMutationHookResult = ReturnType<typeof useSigninMutation>;
export type SigninMutationResult = ApolloReactCommon.MutationResult<SigninMutation>;
export type SigninMutationOptions = ApolloReactCommon.BaseMutationOptions<SigninMutation, SigninMutationVariables>;
export const SignupDocument = gql`
    mutation Signup($email: String!, $password: String!) {
  signup(input: {email: $email, password: $password})
}
    `;
export type SignupMutationFn = ApolloReactCommon.MutationFunction<SignupMutation, SignupMutationVariables>;

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
export function useSignupMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<SignupMutation, SignupMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<SignupMutation, SignupMutationVariables>(SignupDocument, options);
      }
export type SignupMutationHookResult = ReturnType<typeof useSignupMutation>;
export type SignupMutationResult = ApolloReactCommon.MutationResult<SignupMutation>;
export type SignupMutationOptions = ApolloReactCommon.BaseMutationOptions<SignupMutation, SignupMutationVariables>;
export const CreateUserDocument = gql`
    mutation CreateUser($email: String!, $password: String!, $first_name: String, $last_name: String, $username: String) {
  createUser(
    input: {email: $email, password: $password, first_name: $first_name, last_name: $last_name, username: $username}
  ) {
    first_name
    last_name
    email
    created_at
    modified_at
  }
}
    `;
export type CreateUserMutationFn = ApolloReactCommon.MutationFunction<CreateUserMutation, CreateUserMutationVariables>;

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
 *      first_name: // value for 'first_name'
 *      last_name: // value for 'last_name'
 *      username: // value for 'username'
 *   },
 * });
 */
export function useCreateUserMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<CreateUserMutation, CreateUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<CreateUserMutation, CreateUserMutationVariables>(CreateUserDocument, options);
      }
export type CreateUserMutationHookResult = ReturnType<typeof useCreateUserMutation>;
export type CreateUserMutationResult = ApolloReactCommon.MutationResult<CreateUserMutation>;
export type CreateUserMutationOptions = ApolloReactCommon.BaseMutationOptions<CreateUserMutation, CreateUserMutationVariables>;
export const UpdateUserDocument = gql`
    mutation UpdateUser($id: String!, $email: String, $first_name: String, $last_name: String, $username: String) {
  updateUser(
    id: $id
    input: {email: $email, first_name: $first_name, last_name: $last_name, username: $username}
  ) {
    first_name
    last_name
    email
    created_at
    modified_at
  }
}
    `;
export type UpdateUserMutationFn = ApolloReactCommon.MutationFunction<UpdateUserMutation, UpdateUserMutationVariables>;

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
export function useUpdateUserMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<UpdateUserMutation, UpdateUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<UpdateUserMutation, UpdateUserMutationVariables>(UpdateUserDocument, options);
      }
export type UpdateUserMutationHookResult = ReturnType<typeof useUpdateUserMutation>;
export type UpdateUserMutationResult = ApolloReactCommon.MutationResult<UpdateUserMutation>;
export type UpdateUserMutationOptions = ApolloReactCommon.BaseMutationOptions<UpdateUserMutation, UpdateUserMutationVariables>;
export const UpdateUserPasswordDocument = gql`
    mutation UpdateUserPassword($id: String!, $old_password: String!, $password: String!, $password_again: String!) {
  updateUserPassword(
    id: $id
    input: {old_password: $old_password, password: $password, password_again: $password_again}
  ) {
    _id
  }
}
    `;
export type UpdateUserPasswordMutationFn = ApolloReactCommon.MutationFunction<UpdateUserPasswordMutation, UpdateUserPasswordMutationVariables>;

/**
 * __useUpdateUserPasswordMutation__
 *
 * To run a mutation, you first call `useUpdateUserPasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateUserPasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateUserPasswordMutation, { data, loading, error }] = useUpdateUserPasswordMutation({
 *   variables: {
 *      id: // value for 'id'
 *      old_password: // value for 'old_password'
 *      password: // value for 'password'
 *      password_again: // value for 'password_again'
 *   },
 * });
 */
export function useUpdateUserPasswordMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<UpdateUserPasswordMutation, UpdateUserPasswordMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<UpdateUserPasswordMutation, UpdateUserPasswordMutationVariables>(UpdateUserPasswordDocument, options);
      }
export type UpdateUserPasswordMutationHookResult = ReturnType<typeof useUpdateUserPasswordMutation>;
export type UpdateUserPasswordMutationResult = ApolloReactCommon.MutationResult<UpdateUserPasswordMutation>;
export type UpdateUserPasswordMutationOptions = ApolloReactCommon.BaseMutationOptions<UpdateUserPasswordMutation, UpdateUserPasswordMutationVariables>;
export const DeleteUserDocument = gql`
    mutation DeleteUser($id: String!) {
  deleteUser(id: $id) {
    _id
  }
}
    `;
export type DeleteUserMutationFn = ApolloReactCommon.MutationFunction<DeleteUserMutation, DeleteUserMutationVariables>;

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
export function useDeleteUserMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<DeleteUserMutation, DeleteUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<DeleteUserMutation, DeleteUserMutationVariables>(DeleteUserDocument, options);
      }
export type DeleteUserMutationHookResult = ReturnType<typeof useDeleteUserMutation>;
export type DeleteUserMutationResult = ApolloReactCommon.MutationResult<DeleteUserMutation>;
export type DeleteUserMutationOptions = ApolloReactCommon.BaseMutationOptions<DeleteUserMutation, DeleteUserMutationVariables>;
export const GetUserListDocument = gql`
    query GetUserList($filters: String, $pageSize: Int, $page: Int) {
  users(filters: $filters, pageSize: $pageSize, page: $page) {
    results {
      _id
      first_name
      last_name
      email
      created_at
      modified_at
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
 *      filters: // value for 'filters'
 *      pageSize: // value for 'pageSize'
 *      page: // value for 'page'
 *   },
 * });
 */
export function useGetUserListQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetUserListQuery, GetUserListQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<GetUserListQuery, GetUserListQueryVariables>(GetUserListDocument, options);
      }
export function useGetUserListLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetUserListQuery, GetUserListQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<GetUserListQuery, GetUserListQueryVariables>(GetUserListDocument, options);
        }
export type GetUserListQueryHookResult = ReturnType<typeof useGetUserListQuery>;
export type GetUserListLazyQueryHookResult = ReturnType<typeof useGetUserListLazyQuery>;
export type GetUserListQueryResult = ApolloReactCommon.QueryResult<GetUserListQuery, GetUserListQueryVariables>;
export const GetUserDocument = gql`
    query GetUser($id: String!) {
  getUser(id: $id) {
    _id
    first_name
    last_name
    email
    created_at
    modified_at
    password
  }
}
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
export function useGetUserQuery(baseOptions: ApolloReactHooks.QueryHookOptions<GetUserQuery, GetUserQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<GetUserQuery, GetUserQueryVariables>(GetUserDocument, options);
      }
export function useGetUserLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetUserQuery, GetUserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<GetUserQuery, GetUserQueryVariables>(GetUserDocument, options);
        }
export type GetUserQueryHookResult = ReturnType<typeof useGetUserQuery>;
export type GetUserLazyQueryHookResult = ReturnType<typeof useGetUserLazyQuery>;
export type GetUserQueryResult = ApolloReactCommon.QueryResult<GetUserQuery, GetUserQueryVariables>;