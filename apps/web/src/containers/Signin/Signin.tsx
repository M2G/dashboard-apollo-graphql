import type { JSX } from 'react';

import { useCallback } from 'react';
import SiginForm from '@/components/SigninForm';
import { useSigninMutation } from '@/modules/graphql/generated';

import { useAuth } from '@/AuthContext';
import { INITIAL_VALUES } from './constants';

function Signin(): JSX.Element {
  const { activateAuth } = useAuth();

  const [signin, { error }] = useSigninMutation({
    onCompleted: ({ signin: signinData }: { signin: string }) => {
      console.log('signinData signinData', signinData);
      activateAuth(signinData);
    },
  });

  const handleSubmit = useCallback(
    (formData: { email: string; password: string }): Promise<void> => {
      signin({
        variables: {
          email: formData.email,
          password: formData.password,
        },
      });
    },
    [signin],
  );

  const messageError = error?.networkError?.result?.errors?.[0]?.message;

  return (
    <SiginForm
      initialValues={INITIAL_VALUES}
      onSubmit={handleSubmit}
      error={messageError}
    />
  );
}

export default Signin;
