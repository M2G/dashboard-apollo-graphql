import { useCallback } from 'react';
import { useAuth } from '@/AuthContext';
import ChangePasswordForm from '@/components/ChangePassordForm';
import ChangePasswordStatus from '@/containers/ChangePassword/ChangePasswordStatus';
import { INITIAL_VALUES } from '@/components/ChangePassordForm/constants';
import { useChangePasswordMutation } from '@/modules/graphql/generated';
import Loading from '@/components/Loading';

function ChangePassword(): JSX.Element {
  const {
    userData: { id },
  } = useAuth();
  const [changePasswordMutation, { data, error, loading }] =
    useChangePasswordMutation();

  console.log('useAuth useAuth useAuth', id);

  const handleSubmit = useCallback(
    (formData: { id: string; oldPassword: string; password: string }) => {
      changePasswordMutation({
        variables: {
          id,
          input: {
            oldPassword: formData.oldPassword,
            password: formData.password,
          },
        },
      });
    },
    [changePasswordMutation, id],
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
