import { useCallback } from 'react';
import { useForgotPasswordMutation } from 'modules/graphql/generated';
import { INITIAL_VALUES } from './constants';
import ForgotPasswordView from './ForgotPassword';
import ForgotPasswordSuccess from './ForgotPasswordSuccess';

function ForgotPassword(): JSX.Element | null {
  const [forgotPasswordMutation, { loading, error, data }] = useForgotPasswordMutation();

  console.log('ForgotPassword', { loading, error, data });

  const success: boolean | null | undefined = data?.forgotPassword?.success;

  const onSubmit = useCallback(
    ({ email }: { email: string }) => {
      forgotPasswordMutation({
        variables: {
          email
        }
      });
    },
    [forgotPasswordMutation],
  );

  if (success) {
    return <ForgotPasswordSuccess />;
  }

  return <ForgotPasswordView initialValues={INITIAL_VALUES} onSubmit={onSubmit} />;
}

export default ForgotPassword;
