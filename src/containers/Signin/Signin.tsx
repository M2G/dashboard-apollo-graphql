import { useContext, useCallback } from 'react';
import { AuthContext } from 'AuthContext';
import { useSigninMutation } from 'modules/graphql/generated';
import SiginForm from 'components/SigninForm';
import { INITIAL_VALUES } from './constants';

function Signin(): JSX.Element {
  const { activateAuth }: any = useContext(AuthContext);
  const [signin] = useSigninMutation({
    onCompleted: ({ signin: signinData }: { signin: string }) =>
      activateAuth(signinData),
  });

  const handleSubmit = useCallback(
    async (formData: any) => {
      await signin({
        variables: {
          email: formData.email,
          password: formData.password,
        },
      });
    },
    [signin],
  );

  return <SiginForm initialValues={INITIAL_VALUES} onSubmit={handleSubmit} />;
}

export default Signin;
