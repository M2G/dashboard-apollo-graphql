import { gql } from '@apollo/client';
import type * as ApolloReactCommon from '@apollo/client';
import * as ApolloReactHooks from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Date: any;
  DateTime: any;
};

export type Artist = {
  __typename: 'Artist';
  artist_id: Maybe<Scalars['Int']>;
  concert_id: Maybe<Scalars['Int']>;
  datetime: Maybe<Scalars['String']>;
  uri: Maybe<Scalars['String']>;
};

export type Concert = {
  __typename: 'Concert';
  artists: Maybe<Artist>;
  city: Maybe<Scalars['String']>;
  concert_id: Maybe<Scalars['Int']>;
  datetime: Maybe<Scalars['String']>;
  displayName: Maybe<Scalars['String']>;
  lat: Maybe<Scalars['Float']>;
  lng: Maybe<Scalars['Float']>;
  popularity: Maybe<Scalars['String']>;
  status: Maybe<Scalars['String']>;
  type: Maybe<Scalars['String']>;
  uri: Maybe<Scalars['String']>;
};

export type Concerts = {
  __typename: 'Concerts';
  edges: Maybe<Array<Maybe<Edge>>>;
  pageInfo: Maybe<PageInfo>;
  totalCount: Maybe<Scalars['Int']>;
};

export type CreateUserInput = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type Edge = {
  __typename: 'Edge';
  cursor: Maybe<Scalars['String']>;
  node: Maybe<Concert>;
};

export type Mutation = {
  __typename: 'Mutation';
  createUser: User;
  deleteUser: Status;
  forgotPassword: Status;
  resetPassword: Status;
  signin: Scalars['String'];
  signup: User;
  updateUser: Status;
};

export type MutationcreateUserArgs = {
  input: CreateUserInput;
};

export type MutationdeleteUserArgs = {
  id: Scalars['Int'];
};

export type MutationforgotPasswordArgs = {
  email: Scalars['String'];
};

export type MutationresetPasswordArgs = {
  input: ResetPasswordInput;
};

export type MutationsigninArgs = {
  input: SigninInput;
};

export type MutationsignupArgs = {
  input: SignupInput;
};

export type MutationupdateUserArgs = {
  id: Scalars['Int'];
  input: InputMaybe<UpdateUserInput>;
};

export type PageInfo = {
  __typename: 'PageInfo';
  count: Maybe<Scalars['Int']>;
  endCursor: Maybe<Scalars['String']>;
  hasNextPage: Maybe<Scalars['Boolean']>;
  hasPrevPage: Maybe<Scalars['Boolean']>;
  next: Maybe<Scalars['Int']>;
  pages: Maybe<Scalars['Int']>;
  prev: Maybe<Scalars['Int']>;
  startCursor: Maybe<Scalars['String']>;
};

export type Query = {
  __typename: 'Query';
  concert: Maybe<Concert>;
  concerts: Concerts;
  getUser: Maybe<User>;
  users: Users;
};

export type QueryconcertArgs = {
  id: Scalars['Int'];
};

export type QueryconcertsArgs = {
  afterCursor: InputMaybe<Scalars['String']>;
  filters: InputMaybe<Scalars['String']>;
  first: Scalars['Int'];
};

export type QuerygetUserArgs = {
  id: Scalars['Int'];
};

export type QueryusersArgs = {
  filters: InputMaybe<Scalars['String']>;
  page: InputMaybe<Scalars['Int']>;
  pageSize: InputMaybe<Scalars['Int']>;
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
  created_at: Maybe<Scalars['Date']>;
  deleted_at: Maybe<Scalars['Int']>;
  email: Maybe<Scalars['String']>;
  first_name: Maybe<Scalars['String']>;
  id: Maybe<Scalars['Int']>;
  last_connected_at: Maybe<Scalars['Int']>;
  last_name: Maybe<Scalars['String']>;
  modified_at: Maybe<Scalars['Date']>;
  password: Maybe<Scalars['String']>;
  reset_password_expires: Maybe<Scalars['Date']>;
  reset_password_token: Maybe<Scalars['String']>;
  username: Maybe<Scalars['String']>;
};

export type Users = {
  __typename: 'Users';
  pageInfo: Maybe<PageInfo>;
  results: Maybe<Array<Maybe<User>>>;
};

export enum sortOrder {
  ASC = 'ASC',
  DESC = 'DESC',
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
    created_at: any | null;
    modified_at: any | null;
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
    created_at: any | null;
    modified_at: any | null;
  };
};

export type UpdateUserMutationVariables = Exact<{
  id: Scalars['Int'];
  input: InputMaybe<UpdateUserInput>;
}>;

export type UpdateUserMutation = {
  __typename: 'Mutation';
  updateUser: { __typename: 'Status'; success: boolean | null };
};

export type DeleteUserMutationVariables = Exact<{
  id: Scalars['Int'];
}>;

export type DeleteUserMutation = {
  __typename: 'Mutation';
  deleteUser: { __typename: 'Status'; success: boolean | null };
};

export type ResetPasswordMutationVariables = Exact<{
  input: ResetPasswordInput;
}>;

export type ResetPasswordMutation = {
  __typename: 'Mutation';
  resetPassword: { __typename: 'Status'; success: boolean | null };
};

export type ForgotPasswordMutationVariables = Exact<{
  email: Scalars['String'];
}>;

export type ForgotPasswordMutation = {
  __typename: 'Mutation';
  forgotPassword: { __typename: 'Status'; success: boolean | null };
};

export type ArtistPartsFragment = {
  __typename: 'Artist';
  artist_id: number | null;
  concert_id: number | null;
  uri: string | null;
  datetime: string | null;
};

export type ConcertPartsFragment = {
  __typename: 'Concert';
  concert_id: number | null;
  type: string | null;
  uri: string | null;
  displayName: string | null;
  status: string | null;
  popularity: string | null;
  datetime: string | null;
  city: string | null;
  lng: number | null;
  lat: number | null;
  artists: {
    __typename: 'Artist';
    artist_id: number | null;
    concert_id: number | null;
    uri: string | null;
    datetime: string | null;
  } | null;
};

export type GetConcertsQueryVariables = Exact<{
  afterCursor: InputMaybe<Scalars['String']>;
  first: Scalars['Int'];
  filters: InputMaybe<Scalars['String']>;
}>;

export type GetConcertsQuery = {
  __typename: 'Query';
  concerts: {
    __typename: 'Concerts';
    totalCount: number | null;
    edges: Array<{
      __typename: 'Edge';
      cursor: string | null;
      node: {
        __typename: 'Concert';
        concert_id: number | null;
        type: string | null;
        uri: string | null;
        displayName: string | null;
        status: string | null;
        popularity: string | null;
        datetime: string | null;
        city: string | null;
        lng: number | null;
        lat: number | null;
        artists: {
          __typename: 'Artist';
          artist_id: number | null;
          concert_id: number | null;
          uri: string | null;
          datetime: string | null;
        } | null;
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

export type UserPartsFragment = {
  __typename: 'User';
  id: number | null;
  first_name: string | null;
  last_name: string | null;
  email: string | null;
  created_at: any | null;
  modified_at: any | null;
  password: string | null;
};

export type GetUsersQueryVariables = Exact<{
  filters: InputMaybe<Scalars['String']>;
  pageSize: InputMaybe<Scalars['Int']>;
  page: InputMaybe<Scalars['Int']>;
}>;

export type GetUsersQuery = {
  __typename: 'Query';
  users: {
    __typename: 'Users';
    results: Array<{
      __typename: 'User';
      id: number | null;
      first_name: string | null;
      last_name: string | null;
      email: string | null;
      created_at: any | null;
      modified_at: any | null;
      password: string | null;
    } | null> | null;
    pageInfo: {
      __typename: 'PageInfo';
      count: number | null;
      pages: number | null;
      next: number | null;
      prev: number | null;
    } | null;
  };
};

export type GetUserQueryVariables = Exact<{
  id: Scalars['Int'];
}>;

export type GetUserQuery = {
  __typename: 'Query';
  getUser: {
    __typename: 'User';
    id: number | null;
    first_name: string | null;
    last_name: string | null;
    email: string | null;
    created_at: any | null;
    modified_at: any | null;
    password: string | null;
  } | null;
};

export const ArtistPartsFragmentDoc = gql`
  fragment ArtistParts on Artist {
    artist_id
    concert_id
    uri
    datetime
  }
`;
export const ConcertPartsFragmentDoc = gql`
  fragment ConcertParts on Concert {
    concert_id
    type
    uri
    displayName
    status
    popularity
    datetime
    city
    lng
    lat
    artists {
      ...ArtistParts
    }
  }
  ${ArtistPartsFragmentDoc}
`;
export const UserPartsFragmentDoc = gql`
  fragment UserParts on User {
    id
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
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    SigninMutation,
    SigninMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return ApolloReactHooks.useMutation<SigninMutation, SigninMutationVariables>(
    SigninDocument,
    options,
  );
}
export type SigninMutationHookResult = ReturnType<typeof useSigninMutation>;
export type SigninMutationResult =
  ApolloReactCommon.MutationResult<SigninMutation>;
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
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    SignupMutation,
    SignupMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return ApolloReactHooks.useMutation<SignupMutation, SignupMutationVariables>(
    SignupDocument,
    options,
  );
}
export type SignupMutationHookResult = ReturnType<typeof useSignupMutation>;
export type SignupMutationResult =
  ApolloReactCommon.MutationResult<SignupMutation>;
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
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return ApolloReactHooks.useMutation<
    CreateUserMutation,
    CreateUserMutationVariables
  >(CreateUserDocument, options);
}
export type CreateUserMutationHookResult = ReturnType<
  typeof useCreateUserMutation
>;
export type CreateUserMutationResult =
  ApolloReactCommon.MutationResult<CreateUserMutation>;
export type CreateUserMutationOptions = ApolloReactCommon.BaseMutationOptions<
  CreateUserMutation,
  CreateUserMutationVariables
>;
export const UpdateUserDocument = gql`
  mutation UpdateUser($id: Int!, $input: UpdateUserInput) {
    updateUser(id: $id, input: $input) {
      success
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
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateUserMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    UpdateUserMutation,
    UpdateUserMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return ApolloReactHooks.useMutation<
    UpdateUserMutation,
    UpdateUserMutationVariables
  >(UpdateUserDocument, options);
}
export type UpdateUserMutationHookResult = ReturnType<
  typeof useUpdateUserMutation
>;
export type UpdateUserMutationResult =
  ApolloReactCommon.MutationResult<UpdateUserMutation>;
export type UpdateUserMutationOptions = ApolloReactCommon.BaseMutationOptions<
  UpdateUserMutation,
  UpdateUserMutationVariables
>;
export const DeleteUserDocument = gql`
  mutation DeleteUser($id: Int!) {
    deleteUser(id: $id) {
      success
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
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return ApolloReactHooks.useMutation<
    DeleteUserMutation,
    DeleteUserMutationVariables
  >(DeleteUserDocument, options);
}
export type DeleteUserMutationHookResult = ReturnType<
  typeof useDeleteUserMutation
>;
export type DeleteUserMutationResult =
  ApolloReactCommon.MutationResult<DeleteUserMutation>;
export type DeleteUserMutationOptions = ApolloReactCommon.BaseMutationOptions<
  DeleteUserMutation,
  DeleteUserMutationVariables
>;
export const ResetPasswordDocument = gql`
  mutation ResetPassword($input: ResetPasswordInput!) {
    resetPassword(input: $input) {
      success
    }
  }
`;
export type ResetPasswordMutationFn = ApolloReactCommon.MutationFunction<
  ResetPasswordMutation,
  ResetPasswordMutationVariables
>;

/**
 * __useResetPasswordMutation__
 *
 * To run a mutation, you first call `useResetPasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useResetPasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [resetPasswordMutation, { data, loading, error }] = useResetPasswordMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useResetPasswordMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    ResetPasswordMutation,
    ResetPasswordMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return ApolloReactHooks.useMutation<
    ResetPasswordMutation,
    ResetPasswordMutationVariables
  >(ResetPasswordDocument, options);
}
export type ResetPasswordMutationHookResult = ReturnType<
  typeof useResetPasswordMutation
>;
export type ResetPasswordMutationResult =
  ApolloReactCommon.MutationResult<ResetPasswordMutation>;
export type ResetPasswordMutationOptions =
  ApolloReactCommon.BaseMutationOptions<
    ResetPasswordMutation,
    ResetPasswordMutationVariables
  >;
export const ForgotPasswordDocument = gql`
  mutation ForgotPassword($email: String!) {
    forgotPassword(email: $email) {
      success
    }
  }
`;
export type ForgotPasswordMutationFn = ApolloReactCommon.MutationFunction<
  ForgotPasswordMutation,
  ForgotPasswordMutationVariables
>;

/**
 * __useForgotPasswordMutation__
 *
 * To run a mutation, you first call `useForgotPasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useForgotPasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [forgotPasswordMutation, { data, loading, error }] = useForgotPasswordMutation({
 *   variables: {
 *      email: // value for 'email'
 *   },
 * });
 */
export function useForgotPasswordMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    ForgotPasswordMutation,
    ForgotPasswordMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return ApolloReactHooks.useMutation<
    ForgotPasswordMutation,
    ForgotPasswordMutationVariables
  >(ForgotPasswordDocument, options);
}
export type ForgotPasswordMutationHookResult = ReturnType<
  typeof useForgotPasswordMutation
>;
export type ForgotPasswordMutationResult =
  ApolloReactCommon.MutationResult<ForgotPasswordMutation>;
export type ForgotPasswordMutationOptions =
  ApolloReactCommon.BaseMutationOptions<
    ForgotPasswordMutation,
    ForgotPasswordMutationVariables
  >;
export const GetConcertsDocument = gql`
  query GetConcerts($afterCursor: String, $first: Int!, $filters: String) {
    concerts(afterCursor: $afterCursor, first: $first, filters: $filters) {
      totalCount
      edges {
        node {
          ...ConcertParts
          artists {
            artist_id
            concert_id
            uri
            datetime
          }
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
  ${ConcertPartsFragmentDoc}
`;

/**
 * __useGetConcertsQuery__
 *
 * To run a query within a React component, call `useGetConcertsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetConcertsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetConcertsQuery({
 *   variables: {
 *      afterCursor: // value for 'afterCursor'
 *      first: // value for 'first'
 *      filters: // value for 'filters'
 *   },
 * });
 */
export function useGetConcertsQuery(
  baseOptions: ApolloReactHooks.QueryHookOptions<
    GetConcertsQuery,
    GetConcertsQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return ApolloReactHooks.useQuery<GetConcertsQuery, GetConcertsQueryVariables>(
    GetConcertsDocument,
    options,
  );
}
export function useGetConcertsLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    GetConcertsQuery,
    GetConcertsQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return ApolloReactHooks.useLazyQuery<
    GetConcertsQuery,
    GetConcertsQueryVariables
  >(GetConcertsDocument, options);
}
export type GetConcertsQueryHookResult = ReturnType<typeof useGetConcertsQuery>;
export type GetConcertsLazyQueryHookResult = ReturnType<
  typeof useGetConcertsLazyQuery
>;
export type GetConcertsQueryResult = ApolloReactCommon.QueryResult<
  GetConcertsQuery,
  GetConcertsQueryVariables
>;
export const GetUsersDocument = gql`
  query GetUsers($filters: String, $pageSize: Int, $page: Int) {
    users(filters: $filters, pageSize: $pageSize, page: $page) {
      results {
        ...UserParts
      }
      pageInfo {
        count
        pages
        next
        prev
      }
    }
  }
  ${UserPartsFragmentDoc}
`;

/**
 * __useGetUsersQuery__
 *
 * To run a query within a React component, call `useGetUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUsersQuery({
 *   variables: {
 *      filters: // value for 'filters'
 *      pageSize: // value for 'pageSize'
 *      page: // value for 'page'
 *   },
 * });
 */
export function useGetUsersQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<
    GetUsersQuery,
    GetUsersQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return ApolloReactHooks.useQuery<GetUsersQuery, GetUsersQueryVariables>(
    GetUsersDocument,
    options,
  );
}
export function useGetUsersLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    GetUsersQuery,
    GetUsersQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return ApolloReactHooks.useLazyQuery<GetUsersQuery, GetUsersQueryVariables>(
    GetUsersDocument,
    options,
  );
}
export type GetUsersQueryHookResult = ReturnType<typeof useGetUsersQuery>;
export type GetUsersLazyQueryHookResult = ReturnType<
  typeof useGetUsersLazyQuery
>;
export type GetUsersQueryResult = ApolloReactCommon.QueryResult<
  GetUsersQuery,
  GetUsersQueryVariables
>;
export const GetUserDocument = gql`
  query GetUser($id: Int!) {
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
  baseOptions: ApolloReactHooks.QueryHookOptions<
    GetUserQuery,
    GetUserQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return ApolloReactHooks.useQuery<GetUserQuery, GetUserQueryVariables>(
    GetUserDocument,
    options,
  );
}
export function useGetUserLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    GetUserQuery,
    GetUserQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return ApolloReactHooks.useLazyQuery<GetUserQuery, GetUserQueryVariables>(
    GetUserDocument,
    options,
  );
}
export type GetUserQueryHookResult = ReturnType<typeof useGetUserQuery>;
export type GetUserLazyQueryHookResult = ReturnType<typeof useGetUserLazyQuery>;
export type GetUserQueryResult = ApolloReactCommon.QueryResult<
  GetUserQuery,
  GetUserQueryVariables
>;
