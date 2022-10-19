/*eslint-disable*/
import { useContext } from 'react';
import { AuthContext } from 'AuthContext';
import { useCallback } from 'react';
import { useSigninMutation } from 'modules/graphql/generated';
import SiginForm from 'components/SigninForm';
import { INITIAL_VALUES } from './constants';

function Signin() {
  const { activateAuth }: any = useContext(AuthContext);
  const [signin] = useSigninMutation({
    onCompleted: ({ signin }: { signin:  string; }) => activateAuth(signin)
  } as any);

  const handleSubmit = useCallback(async (formData: any) => {
    await signin(
      {
        variables: {
          email: formData.email,
          password: formData.password,
        }
      }
    );
  }, []);

  return <SiginForm initialValues={INITIAL_VALUES} onSubmit={handleSubmit} />;
}

export default Signin;
