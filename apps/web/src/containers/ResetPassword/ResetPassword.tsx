/*eslint-disable*/
import { useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import { useResetPasswordMutation } from '@/modules/graphql/generated';
import { INITIAL_VALUES } from './constants';
import ResetPasswordForm from '@/components/ResetPasswordForm';
import ResetPasswordStatus from './ResetPasswordStatus';

function ResetPassword(): JSX.Element | null {
  let { search } = useLocation();
  const searchParams = new URLSearchParams(search);
  const [resetPasswordMutation, { loading, error, data }] =
    useResetPasswordMutation();

  const success: boolean | null | undefined = data?.resetPassword?.success;

  const token = searchParams.get('token') as string;
  if (!token) return null;

  const onSubmit = useCallback(
    ({ new_password }: { readonly new_password: string }) => {
      resetPasswordMutation({
        variables: {
          input: {
            password: new_password,
            token,
          },
        },
      });
    },
    [],
  );

  if (success && !loading) return <ResetPasswordStatus />;
  if (error) return <>{JSON.stringify(error?.message)}</>;

  return (
    <ResetPasswordForm initialValues={INITIAL_VALUES} onSubmit={onSubmit} />
  );
}

export default ResetPassword;
