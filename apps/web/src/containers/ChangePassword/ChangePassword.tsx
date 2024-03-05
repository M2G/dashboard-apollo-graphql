import { useCallback } from 'react';
import { useAuth } from '@/AuthContext';
import ChangePasswordForm from '@/components/ChangePassordForm';
import ChangePasswordStatus from '@/containers/ChangePassword/ChangePasswordStatus';
import { INITIAL_VALUES } from '@/components/ChangePassordForm/constants';
import { useUpdateUserMutation } from '@/modules/graphql/generated';
import Loading from '@/components/Loading';

function ChangePassword(): JSX.Element {
  const {
    userData: { id },
  } = useAuth();
  const [changePassword, { data, error, loading }] = useUpdateUserMutation();
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

  console.log(
    'useUpdateUserMutation useUpdateUserMutation useUpdateUserMutation',
    data,
  );

  if (loading) return <Loading isLoading={loading} />;
  if (data) return <ChangePasswordStatus success />;
  if (error) return <ChangePasswordStatus />;

  return (
    <ChangePasswordForm
      initialValues={INITIAL_VALUES}
      onSubmit={handleSubmit}
    />
  );
}

export default ChangePassword;
