/*eslint-disable*/
import { useCallback } from 'react';
import { useLazyQuery } from "@apollo/client";
import { USER } from 'gql/queries/users';
import ProfilForm from 'components/ProfilForm';
import { INPUT_NAME, INITIAL_VALUES }  from 'components/ProfilForm/constants';

function initialValues() {
  const initialValues = { ...INITIAL_VALUES };

  initialValues[INPUT_NAME.FIRST_NAME] = '';
  initialValues[INPUT_NAME.LAST_NAME] = '';
  initialValues[INPUT_NAME.EMAIL] = '';
  initialValues[INPUT_NAME.PASSWORD] = '';

  return initialValues;
}

function Profil() {
  const [user] = useLazyQuery(USER,  { fetchPolicy: 'no-cache' });

  const handleSubmit = useCallback(async (formData: any) => {
    console.log('formData', formData)
    await user(
      {
        variables: {
          ...formData
        }
      }
    );
  }, []);

  return <ProfilForm initialValues={initialValues()} onSubmit={handleSubmit} />;
}

export default Profil;
