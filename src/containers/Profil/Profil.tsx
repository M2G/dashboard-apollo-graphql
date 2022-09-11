/*eslint-disable*/
import { useCallback, useContext, useEffect } from 'react';
import { useLazyQuery, useMutation } from '@apollo/client';
import { USER } from 'gql/queries/users';
import ProfilForm from 'components/ProfilForm';
import { INPUT_NAME, INITIAL_VALUES }  from 'components/ProfilForm/constants';
import { AuthContext } from '../../AuthContext';
import { UPDATE_USER_MUTATION } from '../../gql/mutations/auth';

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

  const [
    getUserProfil, { loading, data: userProfil = {} }
  ] = useLazyQuery(USER,  { fetchPolicy: 'no-cache' });

  const [updateUser, { data: updateProfil = {} }] = useMutation(UPDATE_USER_MUTATION);

  useEffect(() => {
    getUserProfil({
      variables: {
        id: userData?._id
      }
    });
  }, []);

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
