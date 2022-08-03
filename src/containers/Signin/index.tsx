/*eslint-disable*/
import { useCallback } from 'react';
import { gql, useMutation } from "@apollo/client";
import { useNavigate } from 'react-router-dom';
import { INITIAL_VALUES } from './constants';
import SigninView from './Signin';
import { setAuthStorage } from 'services/Storage';

const SIGNIN_MUTATION = gql`
    mutation signin(
        $email: String!
        $password: String!
    ) {
        signin(input: { email: $email, password: $password })
    }
`;

function Signin() {
  const navigate = useNavigate();
  const [signin] = useMutation(SIGNIN_MUTATION, {
    onCompleted: ({ login }: { login:  string; }) => {

      console.log('useMutation', login);
      setAuthStorage(login);
      navigate('/');
    }
  });

  const onSubmit = useCallback(async (formData: any) => {
    await signin(
      {
        variables: {
        email: formData.email,
        password: formData.password,
    }});
  }, []);

  return <SigninView initialValues={INITIAL_VALUES} onSubmit={onSubmit} />;
}

export default Signin;
