import { useCallback } from 'react';
import { useForgotPasswordMutation } from 'modules/graphql/generated';
import { INITIAL_VALUES } from './constants';
import ForgotPasswordView from './ForgotPassword';

function ForgotPassword(): JSX.Element {
  const [forgotPasswordMutation, { loading, error, data }] = useForgotPasswordMutation();

  console.log('ForgotPassword', { loading, error, data });

  const onSubmit = useCallback(
    (email: string) => {
      forgotPasswordMutation({
        variables: {
          email,
        },
      });
    },
    [forgotPasswordMutation],
  );

  return <ForgotPasswordView initialValues={INITIAL_VALUES} onSubmit={onSubmit} />;
}

export default ForgotPassword;
