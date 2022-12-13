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

  const [updateUser, { data: updateProfil }] = useUpdateUserMutation({
    variables: {
      id: '6325166e24edff96de6bf90c',
      email: 'oliver.garcia@university.com',
      first_name: 'Oliver222',
      last_name: 'Garcia222',
      username: 'test'
    },
    optimisticResponse: {
      __typename: 'Mutation',
      updateUser: {
        __typename: 'User',
        id: '6325166e24edff96de6bf90c',
        first_name: 'Oliver222',
        last_name: 'Garcia222',
        email: 'oliver.garcia@university.com',
        created_at: 1658098356,
        modified_at: 1670890758
      }
    } as any
  });

  console.log('updateProfil updateProfil', updateProfil);

  const handleSubmit: any = useCallback(
    async (formData: any) => {
      await updateUser();

      console.log('TEST', updateProfil);
    },
    [updateUser]
  );

  if (loading && userProfil?.getUser) return null;

  return (
    <ProfilForm
      initialValues={initialValues({
        ...userProfil.getUser
        // ...updateProfil.updateUser
      })}
      onSubmit={handleSubmit}
    />
  );
}

export default Profil;
