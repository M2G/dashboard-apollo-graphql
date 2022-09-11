/*eslint-disable*/
import { useCallback, useContext } from 'react';
import { useMutation } from "@apollo/client";
import { UPDATE_PASSWORD_USER_MUTATION } from 'gql/mutations/auth';
import ChangePasswordForm from 'components/ChangePassordForm';
import { INITIAL_VALUES } from 'components/ChangePassordForm/constants';
import { AuthContext } from '../../AuthContext';

function ChangePassword() {
  const { userData } = useContext(AuthContext);
  const [changePassword] = useMutation(UPDATE_PASSWORD_USER_MUTATION);
  const handleSubmit = useCallback(async (formData: any) => {
    await changePassword(
      {
        variables: {
          id: userData?._id,
          ...formData
        }
      }
    );
  }, []);

  return <ChangePasswordForm initialValues={INITIAL_VALUES} onSubmit={handleSubmit} />;
}

export default ChangePassword;
