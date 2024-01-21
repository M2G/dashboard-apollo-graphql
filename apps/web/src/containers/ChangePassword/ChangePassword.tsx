import { useCallback, useContext } from 'react';
import ChangePasswordForm from '@/components/ChangePassordForm';
import { INITIAL_VALUES } from '@/components/ChangePassordForm/constants';
import { useUpdateUserMutation } from '@/modules/graphql/generated';
import { AuthContext } from '@/AuthContext';

function ChangePassword(): JSX.Element {
  const {
    userData: { _id: id },
  } = useContext(AuthContext);
  const [changePassword] = useUpdateUserMutation();
  const handleSubmit = useCallback(
    async (formData: {
      id: string;
      old_password: string;
      password: string;
      password_again: string;
    }) => {
      await changePassword({
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
