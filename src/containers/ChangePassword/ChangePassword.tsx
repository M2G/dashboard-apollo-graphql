/*eslint-disable*/
import { useCallback } from 'react';
import { useMutation } from "@apollo/client";
import { INITIAL_VALUES } from './constants';
import { UPDATE_PASSWORD_USER_MUTATION } from 'gql/mutations/auth';
import ChangePasswordForm from 'components/ChangePassordForm';

function ChangePassword() {
  const [changePassword] = useMutation(UPDATE_PASSWORD_USER_MUTATION);

  const handleSubmit = useCallback(async (formData: any) => {
    await changePassword(
      {
        variables: {
          password: formData.password,
          password2: formData.password2,
        }
      }
    );
  }, []);

  return <ChangePasswordForm initialValues={INITIAL_VALUES} onSubmit={handleSubmit} />;
}

export default ChangePassword;
