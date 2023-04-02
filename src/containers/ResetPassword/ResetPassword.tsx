/*eslint-disable*/
import { useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import { useResetPasswordMutation } from 'modules/graphql/generated';
import { INITIAL_VALUES } from './constants';
import ResetPasswordView from './ResetPasswordView';
import ResetPasswordStatus from '../ResetPassword/ResetPasswordStatus';

function ResetPassword(): JSX.Element | null {
  let { search } = useLocation();
  const searchParams = new URLSearchParams(search);
  const [resetPasswordMutation, { loading, error, data }] = useResetPasswordMutation();

  const success: boolean | null | undefined = data?.resetPassword?.success;

  if (!searchParams.has('token')) return null;
  const token = searchParams.get('token') as string;

  const onSubmit = useCallback(async ({ new_password  }: { readonly new_password: string; }) => {
    await resetPasswordMutation({
      variables: {
        input: {
          password: new_password,
          token
        }
      },
    })
  }, []);

  if (success && !loading) return <ResetPasswordStatus />;
  if (error) return <>{JSON.stringify(error?.message)}</>

  return (
    <ResetPasswordView initialValues={INITIAL_VALUES} onSubmit={onSubmit} />
  );
}

export default ResetPassword;
