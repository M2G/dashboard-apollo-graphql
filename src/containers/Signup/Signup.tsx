/*eslint-disable*/
import { useCallback } from 'react';
import { INITIAL_VALUES } from './constants';
import SignupForm from 'components/SignupForm';
import { useContext } from 'react';
import { AuthContext } from 'AuthContext';
import { useSigninMutation } from 'modules/graphql/generated';

function Signup(): JSX.Element {
  const { activateAuth }: any = useContext(AuthContext);
  const [signup] = useSigninMutation({
    onCompleted: ({ signup }: { signup:  string; }) => activateAuth(signup)
  } as any);

  const handleSubmit = useCallback(async (formData: any) => {
    await signup(
      {
        variables: {
          email: formData.email,
          password: formData.password,
        }
      }
    );
  }, []);

  return <SignupForm initialValues={INITIAL_VALUES} onSubmit={handleSubmit} />;
}

export default Signup;
