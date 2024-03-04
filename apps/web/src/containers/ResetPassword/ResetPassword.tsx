/*eslint-disable*/
import { useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import { useResetPasswordMutation } from '@/modules/graphql/generated';
import { INITIAL_VALUES } from './constants';
import ResetPasswordForm from '@/components/ResetPasswordForm';
import ResetPasswordStatus from './ResetPasswordStatus';
import Loading from '@/components/Loading';

function ResetPassword(): JSX.Element | null {
  let { search } = useLocation();
  const searchParams = new URLSearchParams(search);
  const [resetPasswordMutation, { loading, error, data }] =
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
  if (success) return <ResetPasswordStatus success />;
  if (error) return <ResetPasswordStatus />;

  return (
    <ResetPasswordForm initialValues={INITIAL_VALUES} onSubmit={onSubmit} />
  );
}

export default ResetPassword;
