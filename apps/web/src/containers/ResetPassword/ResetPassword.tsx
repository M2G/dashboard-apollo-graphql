import { useCallback } from 'react';
import Loading from '@/components/Loading';
import ResetPasswordForm from '@/components/ResetPasswordForm';
import { useResetPasswordMutation } from '@/modules/graphql/generated';
import { useLocation } from 'react-router-dom';

import { INITIAL_VALUES } from './constants';
import ResetPasswordStatus from './ResetPasswordStatus';

function ResetPassword(): JSX.Element | null {
  const { search } = useLocation();
  const searchParams = new URLSearchParams(search);
  const [resetPasswordMutation, { data, error, loading }] =
    useResetPasswordMutation();

  const success: boolean | null | undefined = data?.resetPassword?.success;

  console.log('data data data data', data);
  console.log('success success success success', success);
  console.log('loading loading loading loading', loading);
  console.log('error error error error', error);
  const token = searchParams.get('token') as string;
  if (!token) return null;

  const onSubmit = useCallback(
    ({ new_password }: { readonly new_password: string }) => {
      console.log('onSubmit onSubmit onSubmit');
      resetPasswordMutation({
        variables: {
          input: {
            password: new_password,
            token,
          },
        },
      });
    },
    [resetPasswordMutation, token],
  );

  if (loading) return <Loading isLoading={loading} />;

  return (
    <ResetPasswordForm
      error={error}
      initialValues={INITIAL_VALUES}
      onSubmit={onSubmit}
      success={success}
    />
  );
}

export default ResetPassword;
