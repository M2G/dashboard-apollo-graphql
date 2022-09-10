/*eslint-disable*/
import { useCallback, useContext, useEffect } from 'react';
import { useLazyQuery } from "@apollo/client";
import { USER } from 'gql/queries/users';
import ProfilForm from 'components/ProfilForm';
import { INPUT_NAME, INITIAL_VALUES }  from 'components/ProfilForm/constants';
import { AuthContext } from '../../AuthContext';

function initialValues({ values }: Record<any, any>) {
  const initialValues = { ...INITIAL_VALUES };

  if (values) {
    initialValues[INPUT_NAME.FIRST_NAME] = values?.[INPUT_NAME.FIRST_NAME] || '';
    initialValues[INPUT_NAME.LAST_NAME] = values?.[INPUT_NAME.LAST_NAME] || '';
    initialValues[INPUT_NAME.EMAIL] = values?.[INPUT_NAME.EMAIL] || '';
    initialValues[INPUT_NAME.PASSWORD] = values?.[INPUT_NAME.PASSWORD] || '';
  }

  return initialValues;
}

function Profil() {
  const { userData } = useContext(AuthContext);
  const [getUserProfil, {
    loading,
    error,
    data: userProfil = {},
  }] = useLazyQuery(USER,  { fetchPolicy: 'no-cache' });

  console.log('loading', loading)
  console.log('error', error)
  console.log('userData', userData)

  useEffect(() => {
    getUserProfil({
      variables: {
        id: userData?._id
      }
    });
  }, []);

  const handleSubmit: any = useCallback(async (formData: any) => {
    console.log('formData', formData)
    /*await user(
      {
        variables: {
          ...formData
        }
      }
    );*/
  }, []);

  if (loading) return null;

  return <ProfilForm initialValues={initialValues(userProfil)} onSubmit={handleSubmit} />;
}

export default Profil;
