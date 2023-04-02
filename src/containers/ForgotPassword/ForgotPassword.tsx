import { useCallback } from 'react';
import { useForgotPasswordMutation } from 'modules/graphql/generated';
import { INITIAL_VALUES } from './constants';
import ForgotPasswordView from './ForgotPasswordView';
import ForgotPasswordStatus from './ForgotPasswordStatus';

function ForgotPassword(): JSX.Element {
  const [forgotPasswordMutation, { loading, error, data }] = useForgotPasswordMutation();

  const success: boolean | null | undefined = data?.forgotPassword?.success;

  const onSubmit = useCallback(
    async ({ email }: { readonly email: string }) => {
      await forgotPasswordMutation({
        variables: {
          email,
        },
      });
    },
    [forgotPasswordMutation],
  );

  if (success && !loading) return <ForgotPasswordStatus />;
  if (error) return <>{JSON.stringify(error?.message)}</>;

  return <ForgotPasswordView initialValues={INITIAL_VALUES} onSubmit={onSubmit} />;
}

export default ForgotPassword;
