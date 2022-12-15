/*eslint-disable*/
import { useCallback, useContext } from 'react';
import { QueryResult } from '@apollo/client';
import ProfilForm from 'components/ProfilForm';
import { INPUT_NAME, INITIAL_VALUES } from 'components/ProfilForm/constants';
import { AuthContext } from 'AuthContext';
import {
  Exact,
  GetUserQuery,
  useGetUserQuery,
  useUpdateUserMutation
} from 'modules/graphql/generated';

function initialValues(values: Record<any, any>) {
  const initialValues = { ...INITIAL_VALUES };

  console.log('values values values', values);

  if (values) {
    initialValues[INPUT_NAME.FIRST_NAME] =
      values?.[INPUT_NAME.FIRST_NAME] || '';
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
      getUser: null
    }
  }: QueryResult<GetUserQuery, Exact<{ id: string }>> = useGetUserQuery({
    fetchPolicy: 'cache-and-network',
    variables: {
      id: userData?._id
    }
  });

  const [updateUserMutation, { data: updateProfil }] = useUpdateUserMutation();

  console.log('updateProfil updateProfil', updateProfil);

  const handleSubmit: any = useCallback(
    async (formData: any) => {
      await updateUserMutation({
        variables: {
          id: userProfil?.getUser?._id || '',
          email: formData?.email,
          first_name: formData?.first_name,
          last_name: formData?.last_name,
          username: formData?.username
        },
        optimisticResponse: {
          __typename: 'Mutation',
          updateUser: {
            __typename: 'User',
            first_name: formData?.first_name,
            last_name: formData?.last_name,
            email: formData?.email,
            created_at: userProfil?.getUser?.created_at || null,
            modified_at: userProfil?.getUser?.modified_at || null
          }
        }
      });
    },
    [userProfil, updateUserMutation]
  );

  if (loading && userProfil?.getUser) return null;

  return (
    <ProfilForm
      initialValues={initialValues({
        ...userProfil?.getUser,
        ...updateProfil?.updateUser
      })}
      onSubmit={handleSubmit}
    />
  );
}

export default Profil;
