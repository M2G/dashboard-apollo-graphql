import type { JSX } from 'react';

import { useCallback } from 'react';
import { useAuth } from '@/AuthContext';
import SiginForm from '@/components/SigninForm';
import { useSigninMutation } from '@/modules/graphql/generated';

import { INITIAL_VALUES } from './constants';

function Signin(): JSX.Element {
  const { activateAuth } = useAuth();

  const [signin, { error }] = useSigninMutation({
    onCompleted({ signin: signinData }: { signin: string }): void {
      console.log('signinData signinData', signinData);
      activateAuth(signinData);
    },
  });

  const handleSubmit = useCallback(
    function (formData: { email: string; password: string }) {
      signin({
        variables: {
          email: formData.email,
          password: formData.password,
        },
      });
    },
    [signin],
  );

  console.log('--------- error --------', error);

  const messageError = error?.networkError?.result?.errors?.[0]?.message;

  return (
    <SiginForm
      error={messageError}
      initialValues={INITIAL_VALUES}
      onSubmit={handleSubmit}
    />
  );
}

export default Signin;
