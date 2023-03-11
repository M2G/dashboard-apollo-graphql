import { useCallback } from 'react';
import { useForgotPasswordMutation } from 'modules/graphql/generated';
import { INITIAL_VALUES } from './constants';
import ForgotPasswordView from './ForgotPassword';
import ForgotPasswordStatus from './ForgotPasswordStatus';

function ForgotPassword(): JSX.Element | string {
  const [forgotPasswordMutation, { loading, error, data }] = useForgotPasswordMutation();

  console.log('ForgotPassword', { loading, error, data });

  const success: boolean | null | undefined = data?.forgotPassword?.success;

  const onSubmit = useCallback(
    async ({ email }: { email: string }) => {
      await forgotPasswordMutation({
        variables: {
          email,
        },
      });
    },
    [forgotPasswordMutation],
  );

  if (success) return <ForgotPasswordStatus />;
  if (error) return JSON.stringify(error?.message);

  return <ForgotPasswordView initialValues={INITIAL_VALUES} onSubmit={onSubmit} />;
}

export default ForgotPassword;
