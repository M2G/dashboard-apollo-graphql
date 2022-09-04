/*eslint-disable*/
import { useCallback } from 'react';
import { useMutation } from "@apollo/client";
import { INITIAL_VALUES } from './constants';
import { SIGNIN_MUTATION } from 'gql/mutations/auth';
import SignupForm from 'components/SignupForm';
import { useContext } from 'react';
import { AuthContext } from '../../AuthContext';


function Signup() {
  const { activateAuth }: any = useContext(AuthContext);
  const [signup] = useMutation(SIGNIN_MUTATION, {
    onCompleted: ({ signup }: { signup:  string; }) => activateAuth(signup)
  });

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
