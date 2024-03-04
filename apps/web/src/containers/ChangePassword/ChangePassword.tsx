import { useCallback } from 'react';
import { useAuth } from '@/AuthContext';
import ChangePasswordForm from '@/components/ChangePassordForm';
import { INITIAL_VALUES } from '@/components/ChangePassordForm/constants';
import { useUpdateUserMutation } from '@/modules/graphql/generated';

function ChangePassword(): JSX.Element {
  const {
    userData: { id },
  } = useAuth();
  const [changePassword] = useUpdateUserMutation();
  const handleSubmit = useCallback(
    (formData: {
      id: string;
      old_password: string;
      password: string;
      password_again: string;
    }) => {
      changePassword({
        variables: {
          id,
          ...formData,
        },
      });
    },
    [changePassword, id],
  );

  return (
    <ChangePasswordForm
      initialValues={INITIAL_VALUES}
      onSubmit={handleSubmit}
    />
  );
}

export default ChangePassword;
