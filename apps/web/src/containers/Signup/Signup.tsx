import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import SignupForm from '@/components/SignupForm';
import { useSignupMutation } from '@/modules/graphql/generated';
import ROUTER_PATH from '@/constants/RouterPath';
import { INITIAL_VALUES } from './constants';

function Signup(): JSX.Element {
  const navigate = useNavigate();
  const [signup, { error }] = useSignupMutation({
    onCompleted: () => {
      navigate(ROUTER_PATH.SIGNIN);
    },
  });

  const handleSubmit = useCallback(
    async (formData) =>
      signup({
        variables: {
          email: formData.email,
          password: formData.password,
        },
      }),
    [signup],
  );

  const messageError = error?.networkError?.result?.errors?.[0]?.message;

  return (
    <SignupForm
      initialValues={INITIAL_VALUES}
      onSubmit={handleSubmit}
      error={messageError}
    />
  );
}

export default Signup;
