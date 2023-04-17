/*eslint-disable*/
import { useCallback, useContext } from 'react';
import { QueryResult } from '@apollo/client';
import ProfilForm from 'components/ProfilForm';
import { INPUT_NAME, INITIAL_VALUES } from 'components/ProfilForm/constants';
import { AuthContext } from '../../AuthContext';
import {
  Exact,
  GetUserQuery,
  useGetUserQuery,
  useUpdateUserMutation,
} from 'modules/graphql/generated';

function initialValues(values: Record<any, any>) {
  const initialValues = { ...INITIAL_VALUES };
  if (values) {
    initialValues[INPUT_NAME.FIRST_NAME] = values?.[INPUT_NAME.FIRST_NAME] || '';
    initialValues[INPUT_NAME.LAST_NAME] = values?.[INPUT_NAME.LAST_NAME] || '';
    initialValues[INPUT_NAME.EMAIL] = values?.[INPUT_NAME.EMAIL] || '';
  }

  return initialValues;
}

function Profil() {
  const { userData } = useContext(AuthContext);

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

  const [updateUserMutation, { data: updateProfil }] = useUpdateUserMutation();

  console.log('updateProfil updateProfil', updateProfil);

  const handleSubmit: any = useCallback(
    async (formData: any) => {
      console.log('userProfil userProfil', userProfil);
      console.log('formData formData', formData);

      await updateUserMutation({
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
            __typename: 'User',
            first_name: formData?.first_name,
            last_name: formData?.last_name,
            email: formData?.email,
            created_at: userProfil?.getUser?.created_at || null,
            modified_at: userProfil?.getUser?.modified_at || null,
          },
        },
      });
    },
    [userProfil, updateUserMutation],
  );

  if (loading && userProfil?.getUser) return null;

  return (
    <ProfilForm initialValues={initialValues({ ...userProfil?.getUser })} onSubmit={handleSubmit} />
  );
}

export default Profil;
