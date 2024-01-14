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
  const { userData }: { userData: { id: number } } = useContext(AuthContext);

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
    async (formData: {
      email: any;
      first_name: any;
      last_name: any;
      username: any;
    }) => {
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
            __typename: 'Status',
            success: true,
          },
        },
      });
    },
    [userProfil, updateUserMutation],
  );

  if (loading && userProfil?.getUser) return null;

  return (
    <ProfilForm
      initialValues={initialValues({ ...userProfil?.getUser })}
      onSubmit={handleSubmit}
    />
  );
}

export default Profil;
