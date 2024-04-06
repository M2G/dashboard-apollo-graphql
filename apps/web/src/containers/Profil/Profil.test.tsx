import { useCallback } from 'react';
import { useAuth } from '@/AuthContext';
import ChangePasswordForm from '@/components/ChangePassordForm';
import { INITIAL_VALUES } from '@/components/ChangePassordForm/constants';
import Loading from '@/components/Loading';
import { useChangePasswordMutation } from '@/modules/graphql/generated';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

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

  if (loading) return <Loading isLoading={loading} />;

  const success = data?.changePassword?.success;
  const messageError = error?.networkError?.result?.errors?.[0]?.message;

  console.log('success success success', success);

  return (
    <ChangePasswordForm
      error={messageError}
      initialValues={INITIAL_VALUES}
      onSubmit={handleSubmit}
      success={success}
    />
  );
}

export default ChangePassword;
