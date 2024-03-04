import { useCallback } from 'react';
import { useForgotPasswordMutation } from '@/modules/graphql/generated';
import { INITIAL_VALUES } from './constants';
import ForgotPasswordView from '@/components/ForgotPasswordForm';
import ForgotPasswordStatus from './ForgotPasswordStatus';
import Loading from '@/components/Loading';

function ForgotPassword(): JSX.Element {
  const [forgotPasswordMutation, { loading, error, data }] =
    useForgotPasswordMutation();

  const success: boolean | null | undefined = data?.forgotPassword?.success;

  const onSubmit = useCallback(
    ({ email }: { readonly email: string }) => {
      forgotPasswordMutation({
        variables: {
          email,
        },
      });
    },
    [forgotPasswordMutation],
  );

  if (loading) return <Loading isLoading={loading} />;
  if (success) return <ForgotPasswordStatus success />;
  if (error) return <ForgotPasswordStatus />;

  return (
    <ForgotPasswordView initialValues={INITIAL_VALUES} onSubmit={onSubmit} />
  );
}

export default ForgotPassword;
