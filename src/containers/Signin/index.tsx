/*eslint-disable*/
import { useCallback } from 'react';
import { gql, useMutation } from "@apollo/client";
import { useNavigate } from 'react-router-dom';
import { INITIAL_VALUES } from './constants';
import SigninView from './Signin';

export const AUTH_TOKEN = 'AUTH_TOKEN';
export const LINKS_PER_PAGE = 5;

const LOGIN_MUTATION = gql`
    mutation login(
        $email: String!
        $password: String!
    ) {
        login(input: { email: $email, password: $password })
    }
`;

function Signin() {
  const navigate = useNavigate();
  const [login] = useMutation(LOGIN_MUTATION, {
    onCompleted: ({ login }: { login:  string; }) => {

      console.log('useMutation', login);

      localStorage.setItem(AUTH_TOKEN, login);
      navigate('/');
    }
  });

  const onSubmit = useCallback(async (formData: any) => {
    await login(
      {
        variables: {
        email: formData.email,
        password: formData.password,
    }});
  }, []);

  return <SigninView initialValues={INITIAL_VALUES} onSubmit={onSubmit} />;
}

export default Signin;
