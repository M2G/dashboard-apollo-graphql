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

export type Query = {
  __typename: 'Query';
  getUser: Maybe<User>;
  users: Maybe<Array<User>>;
};


export type QuerygetUserArgs = {
  id: Scalars['String'];
};


export type QueryusersArgs = {
  filters: InputMaybe<Scalars['String']>;
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

export type updateUserPasswordInput = {
  old_password: Scalars['String'];
  password: Scalars['String'];
  password_again: Scalars['String'];
};

export type GetUserListQueryVariables = Exact<{
  filters: InputMaybe<Scalars['String']>;
}>;


export type GetUserListQuery = { __typename: 'Query', users: Array<{ __typename: 'User', _id: string | null, first_name: string | null, last_name: string | null, email: string | null, created_at: number | null, modified_at: number | null }> | null };

export type GetUserQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type GetUserQuery = { __typename: 'Query', getUser: { __typename: 'User', _id: string | null, first_name: string | null, last_name: string | null, email: string | null, created_at: number | null, modified_at: number | null, password: string | null } | null };


export const GetUserListDocument = gql`
    query GetUserList($filters: String) {
  users(filters: $filters) {
    _id
    first_name
    last_name
    email
    created_at
    modified_at
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