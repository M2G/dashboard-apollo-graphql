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
export type MakeEmpty<
  T extends { [key: string]: unknown },
  K extends keyof T,
> = { [_ in K]?: never };
export type Incremental<T> =
  | T
  | {
      [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never;
    };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string };
  String: { input: string; output: string };
  Boolean: { input: boolean; output: boolean };
  Int: { input: number; output: number };
  Float: { input: number; output: number };
  Date: { input: any; output: any };
  DateTime: { input: any; output: any };
};

export type Artist = {
  __typename: 'Artist';
  artist_id: Maybe<Scalars['Int']['output']>;
  display_name: Maybe<Scalars['String']['output']>;
  uri: Maybe<Scalars['String']['output']>;
};

export type ChangePasswordInput = {
  oldPassword: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type Concert = {
  __typename: 'Concert';
  artist: Maybe<Artist>;
  artist_id: Maybe<Scalars['Int']['output']>;
  city: Maybe<Scalars['String']['output']>;
  concert_id: Maybe<Scalars['Int']['output']>;
  datetime: Maybe<Scalars['String']['output']>;
  display_name: Maybe<Scalars['String']['output']>;
  lat: Maybe<Scalars['Float']['output']>;
  lng: Maybe<Scalars['Float']['output']>;
  popularity: Maybe<Scalars['String']['output']>;
  status: Maybe<Scalars['String']['output']>;
  type: Maybe<Scalars['String']['output']>;
  uri: Maybe<Scalars['String']['output']>;
};

export type Concerts = {
  __typename: 'Concerts';
  edges: Maybe<Array<Maybe<Edge>>>;
  pageInfo: Maybe<PageInfo>;
  totalCount: Maybe<Scalars['Int']['output']>;
};

export type CreateUserInput = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type Edge = {
  __typename: 'Edge';
  cursor: Maybe<Scalars['String']['output']>;
  node: Maybe<Concert>;
};

export type Mutation = {
  __typename: 'Mutation';
  changePassword: Status;
  createUser: User;
  deleteUser: Status;
  forgotPassword: Status;
  refreshToken: Token;
  resetPassword: Status;
  signin: Token;
  signup: User;
  updateUser: Status;
};

export type MutationchangePasswordArgs = {
  id: Scalars['Int']['input'];
  input: InputMaybe<ChangePasswordInput>;
};

export type MutationcreateUserArgs = {
  input: CreateUserInput;
};

export type MutationdeleteUserArgs = {
  id: Scalars['Int']['input'];
};

export type MutationforgotPasswordArgs = {
  email: Scalars['String']['input'];
};

export type MutationrefreshTokenArgs = {
  requestToken: Scalars['String']['input'];
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
  id: Scalars['Int']['input'];
  input: InputMaybe<UpdateUserInput>;
};

export type PageInfo = {
  __typename: 'PageInfo';
  count: Maybe<Scalars['Int']['output']>;
  endCursor: Maybe<Scalars['String']['output']>;
  hasNextPage: Maybe<Scalars['Boolean']['output']>;
  hasPrevPage: Maybe<Scalars['Boolean']['output']>;
  next: Maybe<Scalars['Int']['output']>;
  pages: Maybe<Scalars['Int']['output']>;
  prev: Maybe<Scalars['Int']['output']>;
  startCursor: Maybe<Scalars['String']['output']>;
};

export type Query = {
  __typename: 'Query';
  concert: Maybe<Concert>;
  concerts: Concerts;
  getUser: Maybe<User>;
  users: Users;
};

export type QueryconcertArgs = {
  id: Scalars['Int']['input'];
};

export type QueryconcertsArgs = {
  afterCursor: InputMaybe<Scalars['String']['input']>;
  filters: InputMaybe<Scalars['String']['input']>;
  first: Scalars['Int']['input'];
};

export type QuerygetUserArgs = {
  id: Scalars['Int']['input'];
};

export type QueryusersArgs = {
  filters: InputMaybe<Scalars['String']['input']>;
  page: InputMaybe<Scalars['Int']['input']>;
  pageSize: InputMaybe<Scalars['Int']['input']>;
};

export type ResetPasswordInput = {
  password: Scalars['String']['input'];
  token: Scalars['String']['input'];
};

export type SigninInput = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type SignupInput = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type Status = {
  __typename: 'Status';
  success: Maybe<Scalars['Boolean']['output']>;
};

export type Token = {
  __typename: 'Token';
  accessToken: Maybe<Scalars['String']['output']>;
  refreshToken: Maybe<Scalars['String']['output']>;
};

export type UpdateUserInput = {
  email: InputMaybe<Scalars['String']['input']>;
  first_name: InputMaybe<Scalars['String']['input']>;
  last_name: InputMaybe<Scalars['String']['input']>;
  username: InputMaybe<Scalars['String']['input']>;
};

export type User = {
  __typename: 'User';
  created_at: Maybe<Scalars['Date']['output']>;
  deleted_at: Maybe<Scalars['Int']['output']>;
  email: Maybe<Scalars['String']['output']>;
  first_name: Maybe<Scalars['String']['output']>;
  id: Maybe<Scalars['Int']['output']>;
  last_connected_at: Maybe<Scalars['Int']['output']>;
  last_name: Maybe<Scalars['String']['output']>;
  modified_at: Maybe<Scalars['Date']['output']>;
  password: Maybe<Scalars['String']['output']>;
  reset_password_expires: Maybe<Scalars['Date']['output']>;
  reset_password_token: Maybe<Scalars['String']['output']>;
  username: Maybe<Scalars['String']['output']>;
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
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
}>;

export type SigninMutation = {
  __typename: 'Mutation';
  signin: {
    __typename: 'Token';
    accessToken: string | null;
    refreshToken: string | null;
  };
};

export type SignupMutationVariables = Exact<{
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
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
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
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
  id: Scalars['Int']['input'];
  input: InputMaybe<UpdateUserInput>;
}>;

export type UpdateUserMutation = {
  __typename: 'Mutation';
  updateUser: { __typename: 'Status'; success: boolean | null };
};

export type DeleteUserMutationVariables = Exact<{
  id: Scalars['Int']['input'];
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

export type ChangePasswordMutationVariables = Exact<{
  id: Scalars['Int']['input'];
  input: ChangePasswordInput;
}>;

export type ChangePasswordMutation = {
  __typename: 'Mutation';
  changePassword: { __typename: 'Status'; success: boolean | null };
};

export type ForgotPasswordMutationVariables = Exact<{
  email: Scalars['String']['input'];
}>;

export type ForgotPasswordMutation = {
  __typename: 'Mutation';
  forgotPassword: { __typename: 'Status'; success: boolean | null };
};

export type RefreshTokenMutationVariables = Exact<{
  token: Scalars['String']['input'];
}>;

export type RefreshTokenMutation = {
  __typename: 'Mutation';
  refreshToken: {
    __typename: 'Token';
    accessToken: string | null;
    refreshToken: string | null;
  };
};

export type ArtistPartsFragment = {
  __typename: 'Artist';
  artist_id: number | null;
  uri: string | null;
  display_name: string | null;
};

export type ConcertPartsFragment = {
  __typename: 'Concert';
  concert_id: number | null;
  type: string | null;
  uri: string | null;
  display_name: string | null;
  status: string | null;
  popularity: string | null;
  datetime: string | null;
  city: string | null;
  lng: number | null;
  lat: number | null;
  artist: {
    __typename: 'Artist';
    artist_id: number | null;
    uri: string | null;
    display_name: string | null;
  } | null;
};

export type GetConcertsQueryVariables = Exact<{
  afterCursor: InputMaybe<Scalars['String']['input']>;
  first: Scalars['Int']['input'];
  filters: InputMaybe<Scalars['String']['input']>;
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
        display_name: string | null;
        status: string | null;
        popularity: string | null;
        datetime: string | null;
        city: string | null;
        lng: number | null;
        lat: number | null;
        artist: {
          __typename: 'Artist';
          artist_id: number | null;
          uri: string | null;
          display_name: string | null;
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
  filters: InputMaybe<Scalars['String']['input']>;
  pageSize: InputMaybe<Scalars['Int']['input']>;
  page: InputMaybe<Scalars['Int']['input']>;
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
  id: Scalars['Int']['input'];
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
    uri
    display_name
  }
`;
export const ConcertPartsFragmentDoc = gql`
  fragment ConcertParts on Concert {
    concert_id
    type
    uri
    display_name
    status
    popularity
    datetime
    city
    lng
    lat
    artist {
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
    signin(input: { email: $email, password: $password }) {
      accessToken
      refreshToken
    }
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
export const ChangePasswordDocument = gql`
  mutation ChangePassword($id: Int!, $input: ChangePasswordInput!) {
    changePassword(id: $id, input: $input) {
      success
    }
  }
`;
export type ChangePasswordMutationFn = ApolloReactCommon.MutationFunction<
  ChangePasswordMutation,
  ChangePasswordMutationVariables
>;

/**
 * __useChangePasswordMutation__
 *
 * To run a mutation, you first call `useChangePasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useChangePasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [changePasswordMutation, { data, loading, error }] = useChangePasswordMutation({
 *   variables: {
 *      id: // value for 'id'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useChangePasswordMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    ChangePasswordMutation,
    ChangePasswordMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return ApolloReactHooks.useMutation<
    ChangePasswordMutation,
    ChangePasswordMutationVariables
  >(ChangePasswordDocument, options);
}
export type ChangePasswordMutationHookResult = ReturnType<
  typeof useChangePasswordMutation
>;
export type ChangePasswordMutationResult =
  ApolloReactCommon.MutationResult<ChangePasswordMutation>;
export type ChangePasswordMutationOptions =
  ApolloReactCommon.BaseMutationOptions<
    ChangePasswordMutation,
    ChangePasswordMutationVariables
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
export const RefreshTokenDocument = gql`
  mutation RefreshToken($token: String!) {
    refreshToken(requestToken: $token) {
      accessToken
      refreshToken
    }
  }
`;
export type RefreshTokenMutationFn = ApolloReactCommon.MutationFunction<
  RefreshTokenMutation,
  RefreshTokenMutationVariables
>;

/**
 * __useRefreshTokenMutation__
 *
 * To run a mutation, you first call `useRefreshTokenMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRefreshTokenMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [refreshTokenMutation, { data, loading, error }] = useRefreshTokenMutation({
 *   variables: {
 *      token: // value for 'token'
 *   },
 * });
 */
export function useRefreshTokenMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    RefreshTokenMutation,
    RefreshTokenMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return ApolloReactHooks.useMutation<
    RefreshTokenMutation,
    RefreshTokenMutationVariables
  >(RefreshTokenDocument, options);
}
export type RefreshTokenMutationHookResult = ReturnType<
  typeof useRefreshTokenMutation
>;
export type RefreshTokenMutationResult =
  ApolloReactCommon.MutationResult<RefreshTokenMutation>;
export type RefreshTokenMutationOptions = ApolloReactCommon.BaseMutationOptions<
  RefreshTokenMutation,
  RefreshTokenMutationVariables
>;
export const GetConcertsDocument = gql`
  query GetConcerts($afterCursor: String, $first: Int!, $filters: String) {
    concerts(afterCursor: $afterCursor, first: $first, filters: $filters) {
      totalCount
      edges {
        node {
          ...ConcertParts
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
  > &
    (
      | { variables: GetConcertsQueryVariables; skip?: boolean }
      | { skip: boolean }
    ),
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
export function useGetConcertsSuspenseQuery(
  baseOptions?: ApolloReactHooks.SuspenseQueryHookOptions<
    GetConcertsQuery,
    GetConcertsQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return ApolloReactHooks.useSuspenseQuery<
    GetConcertsQuery,
    GetConcertsQueryVariables
  >(GetConcertsDocument, options);
}
export type GetConcertsQueryHookResult = ReturnType<typeof useGetConcertsQuery>;
export type GetConcertsLazyQueryHookResult = ReturnType<
  typeof useGetConcertsLazyQuery
>;
export type GetConcertsSuspenseQueryHookResult = ReturnType<
  typeof useGetConcertsSuspenseQuery
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
export function useGetUsersSuspenseQuery(
  baseOptions?: ApolloReactHooks.SuspenseQueryHookOptions<
    GetUsersQuery,
    GetUsersQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return ApolloReactHooks.useSuspenseQuery<
    GetUsersQuery,
    GetUsersQueryVariables
  >(GetUsersDocument, options);
}
export type GetUsersQueryHookResult = ReturnType<typeof useGetUsersQuery>;
export type GetUsersLazyQueryHookResult = ReturnType<
  typeof useGetUsersLazyQuery
>;
export type GetUsersSuspenseQueryHookResult = ReturnType<
  typeof useGetUsersSuspenseQuery
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
  > &
    ({ variables: GetUserQueryVariables; skip?: boolean } | { skip: boolean }),
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
export function useGetUserSuspenseQuery(
  baseOptions?: ApolloReactHooks.SuspenseQueryHookOptions<
    GetUserQuery,
    GetUserQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return ApolloReactHooks.useSuspenseQuery<GetUserQuery, GetUserQueryVariables>(
    GetUserDocument,
    options,
  );
}
export type GetUserQueryHookResult = ReturnType<typeof useGetUserQuery>;
export type GetUserLazyQueryHookResult = ReturnType<typeof useGetUserLazyQuery>;
export type GetUserSuspenseQueryHookResult = ReturnType<
  typeof useGetUserSuspenseQuery
>;
export type GetUserQueryResult = ApolloReactCommon.QueryResult<
  GetUserQuery,
  GetUserQueryVariables
>;
