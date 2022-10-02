/*eslint-disable*/
import { useCallback, useContext } from 'react';
import { QueryResult } from '@apollo/client';
import ProfilForm from 'components/ProfilForm';
import { INPUT_NAME, INITIAL_VALUES }  from 'components/ProfilForm/constants';
import { AuthContext } from 'AuthContext';
import {
  Exact,
  GetUserQuery,
  useGetUserQuery,
  useUpdateUserMutation
} from 'modules/graphql/generated';

function initialValues(values: Record<any, any>) {
  const initialValues = { ...INITIAL_VALUES };

  console.log('values values values', values)

  if (values) {
    initialValues[INPUT_NAME.FIRST_NAME] = values?.[INPUT_NAME.FIRST_NAME] || '';
    initialValues[INPUT_NAME.LAST_NAME] = values?.[INPUT_NAME.LAST_NAME] || '';
    initialValues[INPUT_NAME.EMAIL] = values?.[INPUT_NAME.EMAIL] || '';
  }

  return initialValues;
}

function Profil() {
  const { userData } = useContext(AuthContext);

  const { loading, data: userProfil = {
    __typename: 'Query',
    getUser: null,
  } }: QueryResult<GetUserQuery, Exact<{ id: string; }>> = useGetUserQuery(
    {
      fetchPolicy: 'no-cache',
      variables: {
        id: userData?._id
      }
    });

  const [updateUser, { data: updateProfil = {} }]: any = useUpdateUserMutation();

  const handleSubmit: any = useCallback(async (formData: any) => {
    await updateUser(
      {
        variables: {
          id: userData?._id,
          ...formData
        }
      }
    );
  }, []);

  if (loading && userProfil?.getUser) return null;

  return <ProfilForm initialValues={initialValues({
    ...userProfil.getUser,
    ...updateProfil.updateUser,
  })} onSubmit={handleSubmit} />;
}

export default Profil;
