/*eslint-disable*/
import { useCallback } from 'react';
import { QueryResult } from '@apollo/client';
import ProfilForm from '@/components/ProfilForm';
import { INPUT_NAME, INITIAL_VALUES } from '@/components/ProfilForm/constants';
import { useAuth } from '@/AuthContext';
import {
  Exact,
  GetUserQuery,
  useGetUserQuery,
  useUpdateUserMutation,
} from '@/modules/graphql/generated';

function initialValues(values: {
  [x: string]: string;
  id?: any;
  first_name?: any;
  last_name?: any;
  email?: any;
  created_at?: any;
  modified_at?: any;
  password?: any;
}) {
  const initialValues = { ...INITIAL_VALUES };
  if (values) {
    initialValues[INPUT_NAME.FIRST_NAME] =
      values?.[INPUT_NAME.FIRST_NAME] || '';
    initialValues[INPUT_NAME.LAST_NAME] = values?.[INPUT_NAME.LAST_NAME] || '';
    initialValues[INPUT_NAME.EMAIL] = values?.[INPUT_NAME.EMAIL] || '';
  }

  return initialValues;
}

function Profil(): JSX.Element | null {
  const { userData }: { userData: { id: number } } = useAuth();

  const {
    loading,
    data: userProfil = {
      __typename: 'Query',
      getUser: null,
    },
  }: QueryResult<GetUserQuery, Exact<{ id: number }>> = useGetUserQuery({
    fetchPolicy: 'cache-and-network',
    variables: {
      id: userData?.id,
    },
  });

  const [updateUserMutation] = useUpdateUserMutation();

  const handleSubmit: any = useCallback(
    (formData: {
      email: any;
      first_name: any;
      last_name: any;
      username: any;
    }) => {
      updateUserMutation({
        variables: {
          id: userProfil?.getUser?.id,
          input: {
            email: formData?.email,
            first_name: formData?.first_name,
            last_name: formData?.last_name,
            username: formData?.username,
          },
        },
        optimisticResponse: {
          __typename: 'Mutation',
          updateUser: {
            __typename: 'Status',
            success: true,
          },
        },
      });
    },
    [userProfil, updateUserMutation],
  );

  if (loading) return null;

  return (
    <ProfilForm
      initialValues={initialValues({ ...userProfil?.getUser })}
      onSubmit={handleSubmit}
    />
  );
}

export default Profil;
