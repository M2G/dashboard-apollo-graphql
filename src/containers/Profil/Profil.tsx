/*eslint-disable*/
import { useCallback } from 'react';
import { useLazyQuery } from "@apollo/client";
import { INITIAL_VALUES } from './constants';
import { USER } from 'gql/queries/users';
import ProfilForm from 'components/ProfilForm';

function Profil() {
  const [user, { loading, error, data: userData = {}, refetch }] = useLazyQuery(USER,  { fetchPolicy: 'no-cache' });

  const handleSubmit = useCallback(async (formData: any) => {
    await user(
      {
        variables: {
          ...formData
        }
      }
    );
  }, []);

  return <ProfilForm initialValues={INITIAL_VALUES} onSubmit={handleSubmit} />;
}

export default Profil;
