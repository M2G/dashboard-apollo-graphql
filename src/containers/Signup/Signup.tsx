import { useCallback, useContext } from 'react';
import SignupForm from 'components/SignupForm';
import { useSigninMutation } from 'modules/graphql/generated';
import { AuthContext } from '../../AuthContext';
import { INITIAL_VALUES } from './constants';

function Signup(): JSX.Element {
  const { activateAuth } = useContext(AuthContext);
  const [signup] = useSigninMutation({
    onCompleted: ({ signup: signupData }: { signup: string }) =>
      activateAuth(signupData),
  } as any);

  const handleSubmit = useCallback(
    async (formData: any) => {
      await signup({
        variables: {
          email: formData.email,
          password: formData.password,
        },
      });
    },
    [signup],
  );

  return <SignupForm initialValues={INITIAL_VALUES} onSubmit={handleSubmit} />;
}

export default Signup;
