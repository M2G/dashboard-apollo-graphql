/*eslint-disable*/
import { useCallback } from 'react';
import { useMutation } from "@apollo/client";
import { INITIAL_VALUES } from './constants';
import { SIGNIN_MUTATION } from 'gql/mutations/auth';
import ChangePasswordForm from 'components/ChangePassordForm';

function ChangePassword() {
  const [changePassword] = useMutation(SIGNIN_MUTATION);

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
