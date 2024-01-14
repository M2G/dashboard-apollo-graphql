import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import SignupForm from 'components/SignupForm';
import { useSignupMutation } from 'modules/graphql/generated';
import ROUTER_PATH from 'constants/RouterPath';
import { INITIAL_VALUES } from './constants';

function Signup(): JSX.Element {
  const navigate = useNavigate();
  const [signup] = useSignupMutation({
    onCompleted: () => {
      navigate(ROUTER_PATH.SIGNIN);
    },
  });

  const handleSubmit = useCallback(
    async (formData: any) =>
      signup({
        variables: {
          email: formData.email,
          password: formData.password,
        },
      }),
    [signup],
  );

  return <SignupForm initialValues={INITIAL_VALUES} onSubmit={handleSubmit} />;
}

export default Signup;
