/*eslint-disable*/
import { useCallback } from 'react';
import { gql, useMutation } from "@apollo/client";
import { useNavigate } from 'react-router-dom';
import { INITIAL_VALUES } from './constants';
import SignupView from './Signup';
import { setAuthStorage } from 'services/Storage';

const SIGNUP_MUTATION = gql`
    mutation signup(
        $email: String!
        $password: String!
    ) {
        signin(input: { email: $email, password: $password })
    }
`;

function Signup() {
  const navigate = useNavigate();
  const [signup] = useMutation(SIGNUP_MUTATION, {
    onCompleted: ({ signup }: { signup:  string; }) => {

      console.log('useMutation', signup);
      setAuthStorage(signup);
      navigate('/');
    }
  });

  const onSubmit = useCallback(async (formData: any) => {
    await signup(
      {
        variables: {
          email: formData.email,
          password: formData.password,
        }});
  }, []);

  return <SignupView initialValues={INITIAL_VALUES} onSubmit={onSubmit} />;
}

export default Signup;
